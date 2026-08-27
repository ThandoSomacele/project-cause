import type { Handle } from '@sveltejs/kit';

/**
 * Security headers.
 *
 * Set here rather than in netlify.toml because host-level header rules only
 * reliably cover statically-served files — the HTML comes from the serverless
 * function and was missing them. Doing it in the hook also means the headers
 * travel with the app if it ever moves off Netlify.
 *
 * No Content-Security-Policy yet: the page uses inline `style` attributes for
 * the hero gradient and the positioned device cluster, so a strict policy needs
 * either SvelteKit's `kit.csp` nonce support or those styles moved into classes.
 * Shipping a broken CSP would be worse than shipping none.
 */
const SECURITY_HEADERS: Record<string, string> = {
	'x-content-type-options': 'nosniff',
	'referrer-policy': 'strict-origin-when-cross-origin',
	'x-frame-options': 'SAMEORIGIN',
	'permissions-policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
};

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
		response.headers.set(header, value);
	}

	return response;
};
