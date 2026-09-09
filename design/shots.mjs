import { chromium } from '@playwright/test';
// Capture a section by page-coordinate clip with the page at scroll 0, rather
// than element.screenshot() — that scrolls the element under the sticky navbar
// and paints it over the top ~84px, which corrupts pixel measurement.
const args = process.argv.slice(2);
const sel = args[0].startsWith('[') ? args.shift() : '[data-section="hero"]';
const tag = sel.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 1 })).newPage();
for (const w of args.map(Number)) {
	await p.setViewportSize({ width: w, height: 1000 });
	await p.goto('http://localhost:5173/', { waitUntil: 'load' });
	await p.evaluate(async () => {
		document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
		await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
	});
	await p.waitForTimeout(300);
	const clip = await p.$eval(sel, (e) => {
		const r = e.getBoundingClientRect();
		return { x: 0, y: r.top + scrollY, width: Math.round(r.width), height: Math.round(r.height) };
	});
	await p.setViewportSize({ width: w, height: Math.min(4000, Math.ceil(clip.height) + 200) });
	await p.waitForTimeout(200);
	const c2 = await p.$eval(sel, (e) => {
		const r = e.getBoundingClientRect();
		return { x: 0, y: r.top + scrollY, width: Math.round(r.width), height: Math.round(r.height) };
	});
	const out = `design/out-${tag}-${w}.png`;
	await p.screenshot({ path: out, clip: c2 });
	console.log(`${out}  ${c2.width}x${Math.round(c2.height)}`);
}
await b.close();
