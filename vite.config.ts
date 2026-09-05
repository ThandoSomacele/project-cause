import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-netlify';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Netlify. The waitlist form action needs a server runtime, so this
			// deploys as a Node serverless function rather than a static site.
			// `edge: true` would run it on Deno at the edge — not used because the
			// function is trivial and Node keeps parity with local dev.
			adapter: adapter({ edge: false, split: false }),

			// Content-Security-Policy. SvelteKit adds a per-response nonce to the
			// script and style elements it generates, so no 'unsafe-inline' is needed.
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
