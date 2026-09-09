import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 4 })).newPage();
await p.setViewportSize({ width: 700, height: 140 });
await p.goto('http://localhost:5173/');
const names = process.argv.slice(2);
await p.setContent(
	`<body style="margin:0;background:#8289A3;display:flex;gap:24px;padding:24px;align-items:flex-start">` +
	names.map((n) => `<figure style="margin:0;text-align:center;font:12px sans-serif;color:#0A1538">
	   <img src="http://localhost:5173/icons/${n}.svg" style="display:block;width:64px;height:64px;object-fit:contain">
	   <figcaption>${n}</figcaption></figure>`).join('') +
	`</body>`
);
await p.waitForTimeout(500);
await p.screenshot({ path: 'design/out-icons.png' });
console.log('design/out-icons.png');
await b.close();
