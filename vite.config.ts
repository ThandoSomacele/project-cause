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
			adapter: adapter({ edge: false, split: false })
		})
	]
});
