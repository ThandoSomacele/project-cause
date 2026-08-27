import { expect, test, type Page } from '@playwright/test';

const R = / /g; // en-ZA groups with non-breaking spaces
const plain = (s: string | null) => (s ?? '').replace(R, ' ').trim();

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('renders every section of the landing page', async ({ page }) => {
	for (const name of [
		'hero',
		'value',
		'comparison',
		'get-paid',
		'subscription',
		'carousel',
		'cta',
		'faq'
	]) {
		await expect(page.locator(`[data-section="${name}"]`)).toBeAttached();
	}
	await expect(page.getByRole('heading', { level: 1 })).toContainText('The only platform');
});

test('page does not scroll horizontally', async ({ page }) => {
	const { scrollWidth, clientWidth } = await page.evaluate(() => ({
		scrollWidth: document.documentElement.scrollWidth,
		clientWidth: document.documentElement.clientWidth
	}));
	expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

test.describe('fee calculator', () => {
	const slider = (page: Page) => page.locator('#fee-slider');
	const exact = (page: Page) => page.locator('#fee-exact');
	const payout = (page: Page) => page.locator('[data-section] >> text=paid out to you').locator('..');

	test('applies a flat 4.8% and derives the payout', async ({ page }) => {
		await slider(page).fill('10000');

		await expect(page.getByText('4.8 %')).toBeVisible();
		expect(plain(await exact(page).inputValue())).toBe('R 10 000.00');

		const section = page.locator('#fees');
		await expect(section).toContainText('480.00'); // deduction
		await expect(section).toContainText('9 520.00'.replace(/ /g, ' ')); // payout
	});

	test('zero invoice yields a zero fee and a 0.0% rate', async ({ page }) => {
		await slider(page).fill('0');
		await expect(page.getByText('0.0 %')).toBeVisible();
		await expect(page.locator('#fees')).toContainText('R 0.00');
	});

	test('the maximum invoice resolves correctly', async ({ page }) => {
		await slider(page).fill('20000');
		const section = page.locator('#fees');
		await expect(section).toContainText('960.00'); // 4.8% of 20 000
		await expect(section).toContainText('19 040.00'); // payout
	});

	test('quick-select, slider and text field stay in sync', async ({ page }) => {
		await page.getByRole('button', { name: /R\s?7\s?000/ }).click();
		expect(plain(await exact(page).inputValue())).toBe('R 7 000.00');
		await expect(slider(page)).toHaveValue('7000');

		await exact(page).fill('R 3 000.00');
		await expect(slider(page)).toHaveValue('3000');
	});

	test('an over-max typed amount is clamped', async ({ page }) => {
		await exact(page).fill('999999');
		await expect(slider(page)).toHaveValue('20000');
	});
});

test.describe('FAQ accordion', () => {
	test('opens and closes an answer', async ({ page }) => {
		const question = page.getByRole('button', { name: 'Can I use Cause for free?' });
		await expect(question).toHaveAttribute('aria-expanded', 'false');

		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'true');
		await expect(page.locator('#faq-panel-0')).toBeVisible();

		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'false');
		await expect(page.locator('#faq-panel-0')).toBeHidden();
	});

	test('only one answer is open at a time', async ({ page }) => {
		await page.getByRole('button', { name: 'Can I use Cause for free?' }).click();
		await page.getByRole('button', { name: 'Do I pay to chat to clients?' }).click();
		await expect(page.locator('#faq-panel-0')).toBeHidden();
		await expect(page.locator('#faq-panel-2')).toBeVisible();
	});
});

test.describe('value tabs', () => {
	test('switching tabs swaps the panel', async ({ page }) => {
		const jobs = page.getByRole('tab', { name: /Jobs/ });
		await jobs.click();
		await expect(jobs).toHaveAttribute('aria-selected', 'true');
		await expect(page.locator('#panel-jobs')).toBeVisible();
		await expect(page.locator('#panel-credits')).toBeHidden();
	});

	test('arrow keys move between tabs', async ({ page }) => {
		await page.getByRole('tab', { name: /Credits/ }).focus();
		await page.keyboard.press('ArrowRight');
		await expect(page.getByRole('tab', { name: /Jobs/ })).toHaveAttribute('aria-selected', 'true');
		await page.keyboard.press('ArrowLeft');
		await expect(page.getByRole('tab', { name: /Credits/ })).toHaveAttribute(
			'aria-selected',
			'true'
		);
	});
});

test.describe('waitlist', () => {
	test('rejects a malformed address without submitting', async ({ page }) => {
		const email = page.locator('#hero-email');
		await email.fill('not-an-address');
		await page.locator('#hero-email').press('Enter');
		// Native constraint validation blocks the post.
		expect(await email.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
	});

	test('accepts a valid address and confirms', async ({ page }) => {
		await page.locator('#hero-email').fill('nomsa@example.com');
		await page.getByRole('button', { name: 'Join Waitlist' }).first().click();
		await expect(page.locator('#hero-message')).toContainText("You're on the list");
	});

	test('the two forms report independently', async ({ page }) => {
		await page.locator('#cta-email').fill('thabo@example.com');
		await page.getByRole('button', { name: 'Join Waitlist' }).last().click();
		await expect(page.locator('#cta-message')).toContainText("You're on the list");
		await expect(page.locator('#hero-message')).toHaveText('');
	});
});

test.describe('carousel', () => {
	test('dots change the visible slide', async ({ page }) => {
		await expect(page.getByRole('group', { name: 'Slide 1 of 3' })).toBeVisible();
		await page.getByRole('button', { name: 'Show slide 2' }).click();
		await expect(page.getByRole('group', { name: 'Slide 2 of 3' })).toBeVisible();
		await expect(page.getByRole('group', { name: 'Slide 1 of 3' })).toBeHidden();
	});
});
