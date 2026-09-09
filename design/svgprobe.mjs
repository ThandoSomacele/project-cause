import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await (await b.newContext({ deviceScaleFactor: 1 })).newPage();
await p.setViewportSize({ width: 760, height: 800 });
await p.goto('http://localhost:5173/');
await p.setContent(
  `<body style="margin:0;background:#0A1538">
   <img id="f" src="http://localhost:5173/icons/hero-frame.svg" style="display:block;width:674.66px">
   </body>`
);
await p.waitForFunction(() => document.getElementById('f')?.complete);
await p.waitForTimeout(150);
const box = await p.$eval('#f', (e) => { const r = e.getBoundingClientRect(); return { w: r.width, h: r.height }; });
console.log('rendered box', box);
await (await p.$('#f')).screenshot({ path: 'design/svg-probe.png' });
await b.close();
