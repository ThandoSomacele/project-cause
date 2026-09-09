import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
await p.setViewportSize({ width: 1366, height: 900 });
await p.goto('http://localhost:5173/', { waitUntil: 'load' });
await p.waitForTimeout(400);

const field = p.locator('#fee-exact');
console.log('amount     rate     fee            payout        (expected band)');
for (const [amt, band] of [['1500','Micro 5%'],['2000','Micro 5%'],['2001','Small 4.5%'],['4000','Small 4.5%'],['7000','Medium 4%'],['11000','Medium 4%'],['11001','Large 3%'],['20000','Large 3%']]) {
	await field.fill(amt);
	await p.waitForTimeout(120);
	const r = await p.evaluate(() => {
		const t = document.querySelector('#fees').innerText.replace(/ /g, ' ');
		const rate = t.match(/(\d+\.\d)\s*%/)?.[1];
		const money = [...t.matchAll(/R\s?([\d\s]+\.\d{2})/g)].map((m) => m[1].replace(/\s+/g, ' ').trim());
		return { rate, money };
	});
	console.log(`R${amt.padEnd(8)} ${String(r.rate + '%').padEnd(8)} ${(r.money[1] ?? '-').padEnd(14)} ${(r.money[2] ?? '-').padEnd(13)} ${band}`);
}

const footer = await p.evaluate(() => {
	const links = [...document.querySelectorAll('footer a')].map((a) => ({ t: a.getAttribute('aria-label') || a.textContent.trim(), h: a.getAttribute('href') }));
	return links.filter((l) => /facebook|instagram|support|mailto/i.test(l.t + l.h));
});
const support = await p.evaluate(() => {
	const a = [...document.querySelectorAll('a')].find((x) => /contact support/i.test(x.textContent));
	return a ? { text: a.textContent.trim(), href: a.getAttribute('href') } : null;
});
console.log('\nsocial links :', JSON.stringify(footer));
console.log('support link :', JSON.stringify(support));
console.log('max-fee copy :', await p.evaluate(() => {
	const el = [...document.querySelectorAll('#fees p, #fees span')].find((e) => /maximum transaction fee/i.test(e.textContent));
	return el ? el.textContent.trim() : '(not found)';
}));
await b.close();
