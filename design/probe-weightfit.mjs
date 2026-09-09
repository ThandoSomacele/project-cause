import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1425, height: 900 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(300);
// Design anchors on the 1:1 render, as % of width:
//   d(leads) centre 52.596 · s(leads) centre 55.754 · t(connects) ~53.3
const out = await p.evaluate(() => {
	const h1 = document.querySelector('[data-section="hero"] h1');
	const glyph = (needle, i) => {
		const w = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
		for (let n; (n = w.nextNode()); ) {
			const k = n.textContent.indexOf(needle);
			if (k < 0) continue;
			const r = document.createRange();
			r.setStart(n, k + i); r.setEnd(n, k + i + 1);
			const b = r.getBoundingClientRect();
			return ((b.left + b.right) / 2 / innerWidth) * 100;
		}
	};
	const rows = [];
	for (const wgt of ['300', '350', '400']) {
		h1.style.fontWeight = wgt;
		rows.push({ wgt, d: +glyph('leads', 3).toFixed(3), s: +glyph('leads', 4).toFixed(3), t: +glyph('connects', 6).toFixed(3) });
	}
	h1.style.fontWeight = '';
	return rows;
});
console.log('weight   d(leads)   s(leads)   t(connects)      design: d 52.596  s 55.754  t ~53.30');
for (const r of out)
	console.log(`  ${r.wgt}     ${r.d.toFixed(3)}     ${r.s.toFixed(3)}      ${r.t.toFixed(3)}      Δd ${(r.d - 52.596).toFixed(3)}  Δs ${(r.s - 55.754).toFixed(3)}`);
await b.close();
