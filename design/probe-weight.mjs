import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 1 })).newPage();
await p.setViewportSize({ width: 1200, height: 700 });
await p.goto('http://localhost:5173/');
await p.evaluate(() => {
	document.body.innerHTML = [200, 300, 400, 500, 600].map((w) =>
		`<div style="font-family:'Geist Variable',sans-serif;font-size:56px;letter-spacing:-0.02em;font-weight:${w};color:#0a1538;background:#fff;padding:4px 12px" data-w="${w}">A platform that simply,</div>`
	).join('');
	document.body.style.margin = '0';
	document.body.style.background = '#fff';
});
await p.waitForTimeout(400);
await p.screenshot({ path: 'design/out-weights.png', fullPage: true });
console.log(await p.evaluate(() => [...document.querySelectorAll('[data-w]')].map((e) => {
	const r = e.getBoundingClientRect();
	return { w: e.dataset.w, top: Math.round(r.top), bottom: Math.round(r.bottom) };
})).then(JSON.stringify));
await b.close();
