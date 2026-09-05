import type { Handle } from '@sveltejs/kit';

/**
 * Security headers.
 *
 * Set here rather than in netlify.toml because host-level header rules only
 * reliably cover statically-served files — the HTML comes from the serverless
 * function and was missing them. Doing it in the hook also means the headers
 * travel with the app if it ever moves off Netlify.
 *
 * The Content-Security-Policy is NOT set here — it is configured under
 * `kit.csp` in vite.config.ts, because SvelteKit has to inject a per-response
 * nonce into the script tags it generates. These are the headers it does not
 * manage.
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
