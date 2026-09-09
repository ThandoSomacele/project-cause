import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1425, height: 900 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(400);
console.log(await p.evaluate(() => {
	const sec = document.querySelector('[data-section="carousel"]');
	const h2 = sec.querySelector('h2');
	const lines = [...h2.children];
	const dots = [...sec.querySelectorAll('span.rounded-full')];
	const dot = dots[dots.length - 1];
	const rule = sec.querySelector('div[aria-hidden="true"]');
	const R = (e) => { const b = e.getBoundingClientRect(); return { l: Math.round(b.left), r: Math.round(b.right), t: Math.round(b.top + scrollY), b: Math.round(b.bottom + scrollY) }; };
	// exact glyph box for the final "s" of "clients"
	const walk = document.createTreeWalker(h2, NodeFilter.SHOW_TEXT);
	let sBox = null;
	for (let n; (n = walk.nextNode()); ) {
		const i = n.textContent.indexOf('clients');
		if (i < 0) continue;
		const rg = document.createRange();
		rg.setStart(n, i + 6); rg.setEnd(n, i + 7);
		const r = rg.getBoundingClientRect();
		sBox = { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top + scrollY), b: Math.round(r.bottom + scrollY) };
	}
	// ink box of the 's', not its line box
	return JSON.stringify({ nDots: dots.length, line3: R(lines[2]), sGlyph: sBox, trailingDot: R(dot), rule: R(rule) }, null, 1);
}));
await b.close();
