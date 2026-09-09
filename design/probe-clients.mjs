import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.evaluate(async () => {
	document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
	await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
});
await p.waitForTimeout(500);
await p.click('[data-section="audience"] a[href="#clients"]');
await p.waitForTimeout(1500);
console.log(await p.evaluate(() => {
	const c = document.getElementById('clients').getBoundingClientRect();
	const nav = document.querySelector('header').getBoundingClientRect();
	const foot = document.querySelector('footer').getBoundingClientRect();
	const de = document.documentElement;
	return JSON.stringify({
		diffFromNav: +(c.top - nav.bottom).toFixed(1),
		clientsHeight: Math.round(c.height),
		footerHeight: Math.round(foot.height),
		belowClientsTop: Math.round(de.scrollHeight - (c.top + scrollY)),
		viewport: innerHeight,
		scrollY: Math.round(scrollY),
		maxScroll: Math.round(de.scrollHeight - de.clientHeight)
	}, null, 1);
}));
await b.close();
