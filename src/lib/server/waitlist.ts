/**
 * Waitlist sink.
 *
 * Deliberately a stub: signups are acknowledged, not persisted. Swapping in a
 * real provider (Supabase, Mailchimp, an internal API) should only mean
 * rewriting the body of `recordSignup` and reading credentials from
 * `$env/dynamic/private` — never from a committed file.
 */

export interface Signup {
	email: string;
	source: string;
	at: string;
}

/**
 * Addresses are personal data, so the stub logs a redacted form rather than the
 * address itself. Keep it that way when a real sink replaces this.
 */
function redact(email: string): string {
	const [local, domain] = email.split('@');
	if (!domain) return '***';
	return `${local.slice(0, 2)}***@${domain}`;
}

export async function recordSignup(signup: Signup): Promise<void> {
	console.log('[waitlist] signup', {
		email: redact(signup.email),
		source: signup.source,
		at: signup.at
	});
}
