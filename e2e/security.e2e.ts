import { expect, test } from '@playwright/test';

test.describe('security headers', () => {
	test('sends a strict CSP with a script nonce and no unsafe-inline scripts', async ({ page }) => {
		const response = await page.goto('/');
		const csp = response?.headers()['content-security-policy'] ?? '';

		expect(csp).toContain("default-src 'self'");
		expect(csp).toContain("object-src 'none'");
		expect(csp).toContain("base-uri 'self'");
		expect(csp).toContain("form-action 'self'");
		expect(csp).toMatch(/script-src 'self' 'nonce-[^']+'/);

		// style-src itself must stay strict — only the attribute variant is relaxed,
		// which cannot be used to inject a <style> element or an external sheet.
		expect(csp).toContain("style-src 'self'");
		expect(csp).not.toMatch(/style-src 'self'[^;]*unsafe-inline/);
		expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
	});

	test('sends the non-CSP security headers', async ({ page }) => {
		const response = await page.goto('/');
		const h = response?.headers() ?? {};

		expect(h['x-content-type-options']).toBe('nosniff');
		expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
		expect(h['x-frame-options']).toBe('SAMEORIGIN');
		expect(h['permissions-policy']).toContain('camera=()');
	});

	test('the page produces no CSP violations while being used', async ({ page }) => {
		const violations: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error' && /Content Security Policy/i.test(msg.text())) {
				violations.push(msg.text());
			}
		});

		await page.goto('/');

		// Exercise every path that touches styling at runtime.
		await page.locator('#fee-slider').fill('15000');
		await page.getByRole('button', { name: /R\s?3\s?000/ }).click();
		await page.getByRole('tab', { name: /Jobs/ }).click();
		await page.getByRole('button', { name: 'Can I use Cause for free?' }).click();
		await page.getByRole('button', { name: 'Show slide 2' }).click();

		expect(violations).toEqual([]);
	});

	test('the slider fill is driven by a custom property, not a style attribute in markup', async ({
		page
	}) => {
		await page.goto('/');
		const scope = page.locator('.fee-scope');

		// Server-rendered default, so the first paint is already correct.
		await expect(scope).toHaveCSS('--progress', '50%');

		await page.locator('#fee-slider').fill('15000');
		await expect(scope).toHaveCSS('--progress', '75%');
	});
});
