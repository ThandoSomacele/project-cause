import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1366, height: 768 });

let reloads = 0;
p.on('load', () => reloads++);

await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(400);
const loadsAfterFirst = () => reloads - 1;

const order = await p.evaluate(() =>
	[...document.querySelectorAll('[data-section]')].slice(0, 3).map((e) => e.dataset.section)
);
const h1s = await p.evaluate(() => [...document.querySelectorAll('h1')].map((e) => e.textContent.trim().replace(/\s+/g, ' ')));

// 1. selector option
await p.click('[data-section="audience"] a[href="#service-providers"]');
await p.waitForTimeout(900);
const afterOption = await p.evaluate(() => {
	const t = document.getElementById('service-providers').getBoundingClientRect();
	const nav = document.querySelector('header').getBoundingClientRect();
	return { scrollY: Math.round(scrollY), sectionTop: Math.round(t.top), navBottom: Math.round(nav.bottom), hash: location.hash };
});

// 2. back to top, then the primary nav item
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(300);
await p.click('header nav a[href="/#service-providers"]');
await p.waitForTimeout(900);
const afterNav = await p.evaluate(() => {
	const t = document.getElementById('service-providers').getBoundingClientRect();
	return { scrollY: Math.round(scrollY), sectionTop: Math.round(t.top), hash: location.hash, path: location.pathname };
});

console.log('first three sections :', order.join(' → '));
console.log('h1 count             :', h1s.length, JSON.stringify(h1s));
console.log('after selector click :', JSON.stringify(afterOption));
console.log('after nav click      :', JSON.stringify(afterNav));
console.log('page reloads since first load:', loadsAfterFirst());
await b.close();
