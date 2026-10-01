<?php

/**
 * Settings for public_html/waitlist.php.
 *
 * Upload this file, unchanged, to the folder ABOVE public_html — on cPanel
 * that is your home folder, e.g. /home/youraccount/cause-config.php. It must
 * not go inside public_html: anything in there can be requested from the web.
 *
 * The signup list is written beside it, so it is just as private.
 */

return [
	// Where each new signup is emailed.
	'notify' => 'waitlist@causeafrica.co.za',

	// Who the notice comes from. Sending as an address on the site's own domain
	// is what keeps it out of spam folders.
	'from' => 'Cause Waitlist <waitlist@causeafrica.co.za>',

	// The signup list: cause-waitlist.csv in this same folder. Rate-limit data
	// is kept beside it as cause-waitlist-limits.json.
	'csv' => __DIR__ . '/cause-waitlist.csv',
];
