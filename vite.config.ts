import { readFileSync } from 'node:fs';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

/**
 * The `/*` block of static/_headers, as an object. That file is what Netlify
 * serves the security headers from in production; reading it here as well
 * means local preview sends exactly the same set, so the security tests check
 * real responses rather than a second copy of the list.
 */
function hostHeaders(): Record<string, string> {
	const headers: Record<string, string> = {};
	let inAllPaths = false;
	for (const line of readFileSync('static/_headers', 'utf8').split('\n')) {
		if (!line.trim() || line.trimStart().startsWith('#')) continue;
		if (!/^\s/.test(line)) {
			inAllPaths = line.trim() === '/*';
			continue;
		}
		if (!inAllPaths) continue;
		const colon = line.indexOf(':');
		if (colon > 0) headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
	}
	return headers;
}

/**
 * Applies static/_headers to every `vite preview` response. Vite's own
 * `preview.headers` option does not reach this build: SvelteKit's preview
 * serves the prerendered pages and static files through its own middleware,
 * past the point where Vite would add them. A middleware registered ahead of
 * SvelteKit's sets them first, and SvelteKit's response keeps them.
 * Preview only — `vite dev` and the build itself are untouched.
 */
function hostHeadersInPreview(): Plugin {
	const headers = hostHeaders();
	return {
		name: 'host-headers-in-preview',
		configurePreviewServer(server) {
			server.middlewares.use((_req, res, next) => {
				for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
				next();
			});
		}
	};
}

export default defineConfig({
	plugins: [
		hostHeadersInPreview(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// A fully static build: every page is prerendered (src/routes/+layout.ts)
			// into plain HTML, CSS and JS in build/, which any static host can serve.
			// There is no Node server at runtime: the waitlist posts to
			// static/waitlist.php (PHP on the host), and the security headers ship
			// in static/.htaccess for Apache and static/_headers for Netlify.
			adapter: adapter(),

			// The prerender crawl follows every link and fails the build on a 404,
			// which is worth keeping. The one known gap is the privacy page's four
			// legal PDFs: they are linked but have never been added to
			// static/documents/. Those are let through with a warning so the build
			// still ships; any other broken link still stops it.
			prerender: {
				handleHttpError: ({ path, status, message }) => {
					if (status === 404 && path.startsWith('/documents/')) {
						console.warn(`[prerender] linked but not shipped yet: ${path}`);
						return;
					}
					throw new Error(message);
				}
			},

			// Content-Security-Policy. In 'auto' mode a prerendered page gets its
			// policy as a <meta> tag carrying hashes of the inline scripts SvelteKit
			// generates — nonces are per-response and forbidden on static pages — so
			// no 'unsafe-inline' is needed. frame-ancestors is ignored in <meta>; it
			// is sent as a header from static/_headers instead.
			// The app deliberately carries no inline style attributes — see the notes
			// in src/routes/layout.css — which is what lets style-src stay strict.
			// Everything is first-party: no CDN, no analytics, self-hosted fonts.
			csp: {
				mode: 'auto',
				directives: {
					'default-src': ['self'],
					'script-src': ['self'],
					'style-src': ['self'],
					// The fee slider's fill and value bubble are positioned by writing a
					// --progress custom property through the CSSOM, which Chrome polices
					// under style-src. Everything else was moved into stylesheets, so this
					// narrow directive is all that is needed: it permits style attributes
					// and CSSOM writes, but NOT injected <style> elements or external
					// stylesheets — those stay governed by the strict 'style-src' above.
					'style-src-attr': ['unsafe-inline'],
					'img-src': ['self', 'data:'],
					'font-src': ['self'],
					'connect-src': ['self'],
					'form-action': ['self'],
					'frame-ancestors': ['self'],
					'base-uri': ['self'],
					'object-src': ['none'],
					'worker-src': ['self'],
					'manifest-src': ['self']
					// Deliberately no 'upgrade-insecure-requests'. Every subresource is
					// same-origin and relative, so it protects nothing here — and WebKit
					// applies it on http://localhost (Chromium exempts localhost), which
					// upgrades the stylesheet request to https, fails, and renders the
					// whole page unstyled under local preview and in Safari tests.
				}
			}
		})
	]
});
