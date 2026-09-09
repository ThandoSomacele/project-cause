import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1425, height: 1000 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(400);
console.log(await p.evaluate(() => {
	const sec = document.querySelector('[data-section="subscription"]');
	const grid = sec.querySelector('.grid');
	const panels = [...grid.children];
	const r = (e) => { const b = e.getBoundingClientRect(); return { l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width), t: Math.round(b.top + scrollY), h: Math.round(b.height) }; };
	const out = { grid: r(grid), panels: panels.map((e) => {
		const cs = getComputedStyle(e);
		return { ...r(e), padL: cs.paddingLeft, padT: cs.paddingTop };
	}) };
	out.prices = panels.map((e) => { const q = e.querySelector('p'); return { ...r(q), fs: getComputedStyle(q).fontSize }; });
	out.inner = panels.map((e) => { const q = e.querySelector('div'); return { ...r(q), padL: getComputedStyle(q).paddingLeft }; });
	return JSON.stringify(out, null, 1);
}));
await b.close();
