import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'e2e',
	testMatch: '**/*.e2e.{ts,js}',
	webServer: {
		command: 'pnpm run build && pnpm run preview --port 4173',
		port: 4173,
		// Deliberately NOT reusing an existing server. The command above includes
		// the build, so reusing a running one silently skips it and tests then run
		// against stale output — which shows up as mysterious hydration failures
		// when the server bundle and the client chunks disagree.
		reuseExistingServer: false,
		// The command builds before serving, and the build alone now runs past
		// Playwright's 60s default as the page has grown. Without this the suite
		// fails on "Timed out waiting 60000ms" before a single test runs.
		timeout: 180_000
	},
	use: { baseURL: 'http://localhost:4173' },
	projects: [
		{
			name: 'desktop',
			use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } }
		},
		{
			// Chromium mobile emulation, so the default suite needs only one browser.
			name: 'mobile',
			use: { ...devices['Pixel 7'] }
		},
		{
			// Safari coverage for the mask-image logo and the custom range input.
			// Opt-in: run `pnpm exec playwright install webkit` first.
			name: 'safari',
			use: { ...devices['iPhone 13'] }
		}
	]
});
