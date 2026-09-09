import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 2 })).newPage();
await p.setViewportSize({ width: 1425, height: 900 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(400);
const box = await p.evaluate(() => {
	const svg = document.querySelector('#fees svg[aria-hidden="true"]');
	const c = svg.querySelector('circle');
	const r = svg.getBoundingClientRect(), cr = c.getBoundingClientRect();
	return {
		svg: { x: Math.round(r.left), y: Math.round(r.top + scrollY), w: Math.round(r.width), h: Math.round(r.height) },
		dot: { x: Math.round(cr.left), r: Math.round(cr.right), y: Math.round(cr.top + scrollY), b: Math.round(cr.bottom + scrollY), w: +cr.width.toFixed(1), h: +cr.height.toFixed(1) }
	};
});
console.log(JSON.stringify(box));
await p.screenshot({ path: 'design/out-connector.png', clip: { x: box.svg.x - 30, y: box.svg.y - 30, width: box.svg.w + 70, height: 90 } });
await b.close();
