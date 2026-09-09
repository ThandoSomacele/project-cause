import { chromium } from '@playwright/test';
const W = Number(process.argv[2] ?? 1425);
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: W, height: 900 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.evaluate(async () => {
	document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
	await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
});
await p.waitForTimeout(300);
console.log(await p.evaluate(() => {
	const vw = innerWidth;
	const hero = document.querySelector('[data-section="hero"]');
	const h1 = hero.querySelector('h1');
	const frame = hero.querySelector('img[src*="hero-frame"]');
	const f = frame.getBoundingClientRect();
	// SVG-space landmarks in the 674.66 x 730 viewBox, probed from the file:
	//   left vertical x=8 · arrow tip y=102 · top rail y=1.5 · right vertical x=644
	const sx = (u) => ((f.left + (u / 674.66) * f.width) / vw) * 100;
	const sy = (u) => f.top + scrollY + (u / 730) * f.height;
	const glyph = (needle, i) => {
		const w = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
		for (let n; (n = w.nextNode()); ) {
			const k = n.textContent.indexOf(needle);
			if (k < 0) continue;
			const r = document.createRange();
			r.setStart(n, k + i); r.setEnd(n, k + i + 1);
			const b = r.getBoundingClientRect();
			return { c: ((b.left + b.right) / 2 / vw) * 100, l: (b.left / vw) * 100, r: (b.right / vw) * 100 };
		}
	};
	const t = glyph('connects', 6), d = glyph('leads', 3);
	return JSON.stringify({
		vw,
		frame: { l: +((f.left / vw) * 100).toFixed(3), w: +((f.width / vw) * 100).toFixed(3), top: Math.round(f.top + scrollY) },
		arrowX: +sx(8).toFixed(3), arrowTipY: Math.round(sy(102)),
		railTopY: Math.round(sy(1.5)), rightVertX: +sx(644).toFixed(3),
		tGlyph: { l: +t.l.toFixed(3), c: +t.c.toFixed(3), r: +t.r.toFixed(3) },
		dGlyph: { l: +d.l.toFixed(3), c: +d.c.toFixed(3), r: +d.r.toFixed(3) }
	}, null, 1);
}));
await b.close();
