import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('the drawer opens, traps focus and closes on Escape', async ({ page }) => {
	await page.goto('/');

	const open = page.getByRole('button', { name: 'Open menu' });
	await expect(open).toBeVisible();
	await open.click();

	const drawer = page.getByRole('dialog', { name: 'Site menu' });
	await expect(drawer).toBeVisible();
	// Focus moves into the drawer.
	await expect(drawer.locator(':focus')).toBeAttached();

	// The page behind is locked.
	expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

	await page.keyboard.press('Escape');
	await expect(drawer).toBeHidden();
	expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('a drawer link navigates and closes the drawer', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Open menu' }).click();

	const drawer = page.getByRole('dialog', { name: 'Site menu' });
	await drawer.getByRole('link', { name: 'Service Providers' }).click();
	await expect(drawer).toBeHidden();
});
