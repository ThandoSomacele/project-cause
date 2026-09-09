import { chromium } from '@playwright/test';
const b = await chromium.launch();
for (const w of [390, 768, 1024, 1366, 1440, 1920]) {
	const p = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage();
	await p.goto('http://localhost:5173/', { waitUntil: 'load' });
	await p.evaluate(async () => {
		document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
		await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
	});
	await p.waitForTimeout(300);
	const r = await p.evaluate(() => {
		const de = document.documentElement;
		return {
			order: [...document.querySelectorAll('[data-section]')].map((e) => e.dataset.section).join(' → '),
			ovf: de.scrollWidth - de.clientWidth,
			h1: document.querySelectorAll('h1').length
		};
	});
	console.log(`${String(w).padEnd(5)} overflow=${String(r.ovf).padStart(3)}  h1=${r.h1}  ${w === 390 ? r.order : ''}`);
	await p.close();
}
await b.close();
