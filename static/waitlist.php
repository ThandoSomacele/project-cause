<?php

/**
 * Waitlist endpoint for the static site hosted in public_html.
 *
 * Each signup is appended to a CSV and you are emailed a notice. The CSV is the
 * record: if the notice email fails the signup still counts, but if the CSV
 * cannot be written the visitor is told so instead of being told they are in.
 *
 * Settings (where to email, where the CSV lives) come from cause-config.php,
 * which sits one folder ABOVE public_html so it is never reachable from the
 * web — see deploy/cause-config.php. Nothing here needs editing.
 *
 * The form posts with fetch and expects JSON back. A visitor without
 * JavaScript gets a plain HTML confirmation page instead.
 */

declare(strict_types=1);

ini_set('display_errors', '0');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** The forms on the page, by their `source` field. Anything else is recorded as "unknown". */
const SOURCES = ['hero', 'cta', 'clients', 'client-cta'];

/** At most this many submissions per visitor per window. */
const RATE_LIMIT = 5;
const RATE_WINDOW_SECONDS = 600;

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

/**
 * End the request. JSON for the page's own fetch; a minimal page for a
 * no-JavaScript submit. Nothing the visitor sent is echoed back.
 */
function respond(int $status, bool $ok, string $error = ''): never
{
	global $wantsJson;
	http_response_code($status);

	if ($wantsJson) {
		header('Content-Type: application/json; charset=utf-8');
		echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
		exit;
	}

	header('Content-Type: text/html; charset=utf-8');
	$message = $ok
		? 'You’re on the list. We’ll be in touch before launch.'
		: 'We couldn’t add you just now. Please go back and try again.';
	echo '<!doctype html><html lang="en"><meta charset="utf-8">'
		. '<meta name="viewport" content="width=device-width, initial-scale=1">'
		. '<title>Cause waitlist</title>'
		. '<p>' . $message . '</p><p><a href="/">Back to Cause</a></p></html>';
	exit;
}

/**
 * Spreadsheet apps run any cell that starts with = + - @ as a formula. An
 * email address may legally start with some of those, so such values are
 * prefixed with an apostrophe before they reach the CSV.
 */
function csv_safe(string $value): string
{
	return preg_match('/^[=+\-@\t\r]/', $value) ? "'" . $value : $value;
}

// --- Request shape ----------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
	header('Allow: POST');
	respond(405, false, 'method');
}

// Only the site's own pages may post here. A browser always sends Origin on a
// cross-site POST; when it does, it has to match this host.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && parse_url($origin, PHP_URL_HOST) !== ($_SERVER['HTTP_HOST'] ?? '')) {
	respond(403, false, 'origin');
}

// --- Configuration ----------------------------------------------------------

$configFile = dirname(__DIR__) . '/cause-config.php';
$config = is_file($configFile) ? require $configFile : null;
if (!is_array($config) || empty($config['csv']) || empty($config['notify']) || empty($config['from'])) {
	error_log('[waitlist] cause-config.php is missing or incomplete; see deploy/cause-config.php');
	respond(500, false, 'config');
}

// --- Fields -----------------------------------------------------------------

// The honeypot: hidden from people, filled in by bots. Report success and
// keep nothing, so a bot gets no signal it was caught.
if (trim((string) ($_POST['company'] ?? '')) !== '') {
	respond(200, true);
}

$email = trim((string) ($_POST['email'] ?? ''));
if ($email === '' || strlen($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
	respond(400, false, 'invalid');
}

$source = (string) ($_POST['source'] ?? '');
if (!in_array($source, SOURCES, true)) {
	$source = 'unknown';
}

// --- Rate limit -------------------------------------------------------------

// Kept beside the CSV, outside the web root. Visitors are stored as a hash of
// their IP rather than the IP itself.
$limitsFile = dirname((string) $config['csv']) . '/cause-waitlist-limits.json';
$visitor = hash('sha256', (string) ($_SERVER['REMOTE_ADDR'] ?? ''));
$now = time();

$handle = @fopen($limitsFile, 'c+');
if ($handle !== false && flock($handle, LOCK_EX)) {
	$limits = json_decode((string) stream_get_contents($handle), true);
	$limits = is_array($limits) ? $limits : [];

	// Forget anything outside the window, for every visitor.
	foreach ($limits as $key => $times) {
		$limits[$key] = array_values(array_filter(
			is_array($times) ? $times : [],
			static fn ($t) => is_int($t) && $t > $now - RATE_WINDOW_SECONDS
		));
		if ($limits[$key] === []) {
			unset($limits[$key]);
		}
	}

	$recent = $limits[$visitor] ?? [];
	if (count($recent) >= RATE_LIMIT) {
		flock($handle, LOCK_UN);
		fclose($handle);
		respond(429, false, 'rate');
	}

	$limits[$visitor] = [...$recent, $now];
	ftruncate($handle, 0);
	rewind($handle);
	fwrite($handle, (string) json_encode($limits));
	flock($handle, LOCK_UN);
	fclose($handle);
	@chmod($limitsFile, 0600);
}

// --- Record -----------------------------------------------------------------

$csvFile = (string) $config['csv'];
$handle = @fopen($csvFile, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
	error_log('[waitlist] cannot open the CSV for writing: ' . $csvFile);
	respond(500, false, 'storage');
}

// Someone already on the list is told they are in, without a second row or a
// second email.
$alreadyListed = false;
$written = true;
$isEmpty = fstat($handle)['size'] === 0;
while (($row = fgetcsv($handle, null, ',', '"', '\\')) !== false) {
	if (isset($row[1]) && strcasecmp(ltrim($row[1], "'"), $email) === 0) {
		$alreadyListed = true;
		break;
	}
}

if (!$alreadyListed) {
	fseek($handle, 0, SEEK_END);
	if ($isEmpty) {
		fputcsv($handle, ['submitted_at_utc', 'email', 'source'], ',', '"', '\\');
	}
	$written = fputcsv($handle, [gmdate('c'), csv_safe($email), $source], ',', '"', '\\');
	fflush($handle);
}
flock($handle, LOCK_UN);
fclose($handle);
@chmod($csvFile, 0600);

if (!$alreadyListed && $written === false) {
	error_log('[waitlist] failed writing a row to the CSV');
	respond(500, false, 'storage');
}

// --- Notify -----------------------------------------------------------------

// Nothing the visitor typed goes into a mail header; the address only appears
// in the body. A failed notice is logged, not reported — the signup is saved.
if (!$alreadyListed) {
	$sent = @mail(
		(string) $config['notify'],
		'New Cause waitlist signup',
		"Email: {$email}\nForm: {$source}\nTime (UTC): " . gmdate('Y-m-d H:i:s') . "\n",
		'From: ' . $config['from'] . "\r\nContent-Type: text/plain; charset=utf-8"
	);
	if (!$sent) {
		error_log('[waitlist] signup saved, but the notification email was not sent');
	}
}

respond(200, true);
