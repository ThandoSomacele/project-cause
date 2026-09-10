import { expect, test, type Page } from '@playwright/test';

const R = / /g; // en-ZA groups with non-breaking spaces
const plain = (s: string | null) => (s ?? '').replace(R, ' ').trim();

test.beforeEach(async ({ page }) => {
	await page.goto('/');
});

test('renders every section of the landing page', async ({ page }) => {
	for (const name of [
		'audience',
		'hero',
		'value',
		'comparison',
		'get-paid',
		'subscription',
		'carousel',
		'cta',
		'faq',
		'clients',
		'process'
	]) {
		await expect(page.locator(`[data-section="${name}"]`)).toBeAttached();
	}
	// The selector opens the page, so it owns the single h1; the service-provider
	// headline sits below it as an h2.
	await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
	await expect(page.getByRole('heading', { level: 1 })).toContainText('A Marketplace');
	await expect(page.getByRole('heading', { level: 2, name: /The only platform/ })).toBeVisible();
});

test.describe('audience selector', () => {
	test('is the first section on the page', async ({ page }) => {
		const sections = await page.locator('[data-section]').evaluateAll((els) =>
			els.map((e) => (e as HTMLElement).dataset.section)
		);
		expect(sections[0]).toBe('audience');
		expect(sections[1]).toBe('hero');
	});

	test('the service-provider option jumps down the same page, without navigating', async ({
		page
	}) => {
		let loads = 0;
		page.on('load', () => loads++);

		await page.click('[data-section="audience"] a[href="#service-providers"]');
		await expect(page).toHaveURL(/#service-providers$/);

		// The target must come to rest directly under the sticky navbar, not
		// beneath it, and the page must not have been replaced.
		await expect
			.poll(async () =>
				page.evaluate(() => {
					const t = document.getElementById('service-providers')!.getBoundingClientRect();
					const nav = document.querySelector('header')!.getBoundingClientRect();
					return Math.abs(t.top - nav.bottom);
				})
			)
			.toBeLessThan(1);
		expect(loads).toBe(0);
		expect(new URL(page.url()).pathname).toBe('/');
	});

	test('the client option jumps to the client section at the end of the page', async ({
		page
	}) => {
		let loads = 0;
		page.on('load', () => loads++);

		await page.click('[data-section="audience"] a[href="#clients"]');
		await expect(page).toHaveURL(/#clients$/);
		await expect
			.poll(async () =>
				page.evaluate(() => {
					const t = document.getElementById('clients')!.getBoundingClientRect();
					const nav = document.querySelector('header')!.getBoundingClientRect();
					return Math.abs(t.top - nav.bottom);
				})
			)
			.toBeLessThan(1);
		expect(loads).toBe(0);
	});

	test('the client half runs to the end of the page, mirroring the provider half', async ({
		page
	}) => {
		const sections = await page
			.locator('[data-section]')
			.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.section));
		expect(sections.slice(sections.indexOf('clients'))).toEqual([
			'clients',
			'process',
			'client-comparison',
			'client-benefits',
			'client-cta',
			'client-faq'
		]);
	});
});

test.describe('primary nav', () => {
	test('both audience links jump within the page', async ({ page }) => {
		// The inline nav is hidden below lg — the drawer covers that path, and
		// mobile-nav.e2e.ts exercises it there.
		test.skip((page.viewportSize()?.width ?? 0) < 1024, 'inline nav is lg and up');

		let loads = 0;
		page.on('load', () => loads++);

		for (const [label, id] of [
			['Service Providers', 'service-providers'],
			['Clients', 'clients']
		] as const) {
			await page.locator('header nav').getByRole('link', { name: label }).click();
			await expect(page).toHaveURL(new RegExp(`#${id}$`));
			await expect
				.poll(async () =>
					page.evaluate((target) => {
						const t = document.getElementById(target)!.getBoundingClientRect();
						const nav = document.querySelector('header')!.getBoundingClientRect();
						return Math.abs(t.top - nav.bottom);
					}, id)
				)
				.toBeLessThan(1);
		}

		expect(loads).toBe(0);
		expect(new URL(page.url()).pathname).toBe('/');
	});
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

	test('applies the banded rate and derives the payout', async ({ page }) => {
		await slider(page).fill('10000');

		// R10 000 sits in the Medium band (up to R11 000) at 4%.
		await expect(page.getByText('4.0 %')).toBeVisible();
		expect(plain(await exact(page).inputValue())).toBe('R 10 000.00');

		const section = page.locator('#fees');
		await expect(section).toContainText('400.00'); // deduction
		await expect(section).toContainText('9 600.00'); // payout
	});

	test('zero invoice yields a zero fee and a 0.0% rate', async ({ page }) => {
		await slider(page).fill('0');
		await expect(page.getByText('0.0 %')).toBeVisible();
		await expect(page.locator('#fees')).toContainText('R 0.00');
	});

	test('the maximum invoice resolves at the Large band', async ({ page }) => {
		await slider(page).fill('20000');
		const section = page.locator('#fees');
		await expect(page.getByText('3.0 %')).toBeVisible();
		await expect(section).toContainText('600.00'); // 3% of 20 000
		await expect(section).toContainText('19 400.00'); // payout
	});

	// Band edges are where a tiered model most easily regresses: a tier owns its
	// own upper bound, and the next rand crosses into the band below it. Driven
	// through the exact-amount field because the slider steps in hundreds and
	// cannot express a one-rand crossing.
	test('each band claims its own upper bound', async ({ page }) => {
		for (const [amount, rate] of [
			['2000', '5.0 %'],
			['2001', '4.5 %'],
			['4000', '4.5 %'],
			['4001', '4.0 %'],
			['11000', '4.0 %'],
			['11001', '3.0 %']
		] as const) {
			await exact(page).fill(amount);
			await expect(page.getByText(rate)).toBeVisible();
		}
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
	// Panels are reached through each button's own aria-controls rather than a
	// literal id: the page mounts two accordions, so the ids are per-instance.
	const panelOf = (page: Page, name: string) =>
		page
			.getByRole('button', { name })
			.getAttribute('aria-controls')
			.then((id) => page.locator(`#${id}`));

	test('opens and closes an answer', async ({ page }) => {
		const question = page.getByRole('button', { name: 'Can I use Cause for free?' });
		const panel = await panelOf(page, 'Can I use Cause for free?');
		await expect(question).toHaveAttribute('aria-expanded', 'false');

		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'true');
		await expect(panel).toBeVisible();

		await question.click();
		await expect(question).toHaveAttribute('aria-expanded', 'false');
		await expect(panel).toBeHidden();
	});

	test('only one answer is open at a time', async ({ page }) => {
		const first = await panelOf(page, 'Can I use Cause for free?');
		const third = await panelOf(page, 'Do I pay to chat to clients?');
		await page.getByRole('button', { name: 'Can I use Cause for free?' }).click();
		await page.getByRole('button', { name: 'Do I pay to chat to clients?' }).click();
		await expect(first).toBeHidden();
		await expect(third).toBeVisible();
	});

	test('every panel id on the page is unique', async ({ page }) => {
		const ids = await page
			.locator('[role="region"][aria-labelledby]')
			.evaluateAll((els) => els.map((e) => e.id));
		expect(ids.length).toBeGreaterThan(6);
		expect(new Set(ids).size).toBe(ids.length);
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

	test('the three forms report independently', async ({ page }) => {
		await page.locator('#cta-email').fill('thabo@example.com');
		await page
			.locator('[data-section="cta"]')
			.getByRole('button', { name: /Join Waitlist/i })
			.click();
		await expect(page.locator('#cta-message')).toContainText("You're on the list");
		await expect(page.locator('#hero-message')).toHaveText('');
		await expect(page.locator('#clients-message')).toHaveText('');
	});

	test('the client section carries its own waitlist form', async ({ page }) => {
		await page.locator('#clients-email').fill('lerato@example.com');
		await page
			.locator('[data-section="clients"]')
			.getByRole('button', { name: /Join Waitlist/i })
			.click();
		await expect(page.locator('#clients-message')).toContainText("You're on the list");
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
