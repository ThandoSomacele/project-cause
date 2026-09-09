import { chromium } from '@playwright/test';
const w = Number(process.argv[2] ?? 1425);
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 1 })).newPage();
await p.setViewportSize({ width: w, height: 1200 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.evaluate(async () => {
	document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
	window.scrollTo(0, document.body.scrollHeight);
	await new Promise((r) => setTimeout(r, 600));
	window.scrollTo(0, 0);
	await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
});
await p.waitForTimeout(600);
await p.screenshot({ path: `design/out-page-${w}.png`, fullPage: true });
const secs = await p.evaluate(() =>
	[...document.querySelectorAll('[data-section]')].map((e) => {
		const r = e.getBoundingClientRect();
		return { n: e.dataset.section, t: Math.round(r.top + scrollY), h: Math.round(r.height) };
	})
);
console.log(`design/out-page-${w}.png`, await p.evaluate(() => document.documentElement.scrollHeight));
for (const s of secs) console.log(`   ${String(s.t).padStart(5)} h=${String(s.h).padStart(4)}  ${s.n}`);
await b.close();
