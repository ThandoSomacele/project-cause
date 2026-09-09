import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1425, height: 900 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.evaluate(async () => {
	document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
	await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
});
await p.waitForTimeout(400);
const out = await p.evaluate(() =>
	[...document.querySelectorAll('[data-section], section')].map((e) => {
		const r = e.getBoundingClientRect();
		return {
			name: e.dataset.section || e.id || e.className.split(' ')[0],
			top: Math.round(r.top + scrollY),
			h: Math.round(r.height)
		};
	})
);
console.log('page height', await p.evaluate(() => document.documentElement.scrollHeight), '(design 9034)');
for (const s of out) console.log(`  ${String(s.top).padStart(5)}  h=${String(s.h).padStart(4)}  ${s.name}`);
await b.close();
