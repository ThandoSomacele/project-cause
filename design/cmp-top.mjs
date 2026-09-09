import { chromium } from '@playwright/test';
const b = await chromium.launch({ args: ['--hide-scrollbars'] });
const p = await (await b.newContext({ viewport: { width: 1425, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
const box = await p.evaluate(() => { const s = document.querySelector('[data-section="audience"]').getBoundingClientRect(); return { x: s.x + scrollX, y: s.y + scrollY, width: s.width, height: s.height }; });
await p.screenshot({ path: 'design/build-top.png', clip: box, scale: 'css' });
console.log('section', JSON.stringify(box));
await b.close();
