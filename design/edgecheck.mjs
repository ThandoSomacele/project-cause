import { chromium } from '@playwright/test';
// The design puts the bracket's right vertical at x=1396 of 1425 — a 29px gap
// (2.035% of width) between the line and the screen edge, with the phones
// clearing it on the inside. Verify that gap survives at every width.
const widths = [1024, 1280, 1366, 1440, 1600, 1920, 2560];
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
console.log('vw     heroH   h/w%    railGapPx  railGap%  phone→rail  ovf   (design 2.035%, phones clear)');
for (const w of widths) {
	await p.setViewportSize({ width: w, height: 900 });
	await p.goto('http://localhost:5173/', { waitUntil: 'load' });
	await p.evaluate(async () => {
		document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
		await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
	});
	await p.waitForTimeout(200);
	const m = await p.evaluate(() => {
		const vw = innerWidth;
		const hero = document.querySelector('[data-section="hero"]');
		const frame = hero.querySelector('img[src*="hero-frame"]');
		const phone = hero.querySelector('img[src*="phone-results"]');
		const f = frame.getBoundingClientRect();
		// The right vertical sits at 644/674.66 across the SVG's own box.
		const railX = f.left + f.width * (644 / 674.66);
		return {
			vw,
			heroH: Math.round(hero.getBoundingClientRect().height),
			railGap: vw - railX,
			phoneGap: railX - phone.getBoundingClientRect().right,
			ovf: document.documentElement.scrollWidth - document.documentElement.clientWidth
		};
	});
	console.log(
		String(m.vw).padEnd(6) +
			String(m.heroH).padStart(6) +
			(100 * m.heroH / m.vw).toFixed(2).padStart(8) +
			m.railGap.toFixed(1).padStart(11) +
			(100 * m.railGap / m.vw).toFixed(3).padStart(10) +
			m.phoneGap.toFixed(1).padStart(12) +
			String(m.ovf).padStart(6)
	);
}
await b.close();
