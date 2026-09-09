import { chromium, devices } from '@playwright/test';
const b = await chromium.launch();
for (const [label, opts] of [
	['desktop 1440', { viewport: { width: 1440, height: 900 } }],
	['mobile Pixel7', devices['Pixel 7']]
]) {
	const p = await (await b.newContext(opts)).newPage();
	await p.goto('http://localhost:5173/', { waitUntil: 'load' });
	await p.waitForTimeout(500);
	await p.click('[data-section="audience"] a[href="#service-providers"]');
	for (const wait of [300, 900, 1800]) {
		await p.waitForTimeout(wait === 300 ? 300 : 600);
		const v = await p.evaluate(() => {
			const t = document.getElementById('service-providers').getBoundingClientRect();
			const nav = document.querySelector('header').getBoundingClientRect();
			return { diff: +(t.top - nav.bottom).toFixed(2), navH: +nav.height.toFixed(2), top: +t.top.toFixed(2), y: Math.round(scrollY) };
		});
		console.log(`${label} @${wait}ms:`, JSON.stringify(v));
	}
	await p.close();
}
await b.close();
