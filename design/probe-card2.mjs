import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1425, height: 1000 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(400);
console.log(await p.evaluate(() => {
	const sec = document.querySelector('[data-section="subscription"]');
	const grid = sec.querySelector('.grid');
	const top = grid.getBoundingClientRect().top + scrollY;
	const paid = grid.children[0];
	const q = (s) => paid.querySelector(s);
	const rel = (e) => e ? Math.round(e.getBoundingClientRect().top + scrollY - top) : null;
	return JSON.stringify({
		cardH: Math.round(grid.getBoundingClientRect().height),
		price: rel(q('p')),
		period: rel(paid.querySelectorAll('p')[1]),
		title: rel(q('h3')),
		bullets: rel(q('ul')),
		firstIcon: rel(q('ul img')),
		note: rel(paid.querySelector('div > p:last-of-type'))
	});
}));
await b.close();
