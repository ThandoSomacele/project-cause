import { chromium } from '@playwright/test';
const URL = process.env.URL || 'http://localhost:4173/';
const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: 1425, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await p.goto(URL, { waitUntil: 'networkidle' });
const r = await p.evaluate(() => {
  const sec = document.querySelector('[data-section="audience"]');
  const s = sec.getBoundingClientRect();
  const rel = (e) => { const b = e.getBoundingClientRect(); return { x: +(b.x - s.x).toFixed(1), y: +(b.y - s.y).toFixed(1), r: +(b.right - s.x).toFixed(1), b: +(b.bottom - s.y).toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) }; };
  // per-line ink via Range on each heading line span
  const lines = [...sec.querySelectorAll('h1 > span')].map((el) => {
    const rg = document.createRange(); rg.selectNodeContents(el);
    const b = rg.getBoundingClientRect();
    return { x: +(b.x - s.x).toFixed(1), r: +(b.right - s.x).toFixed(1) };
  });
  const sub = sec.querySelector('p');
  const rg = document.createRange(); rg.selectNodeContents(sub);
  const sb = rg.getBoundingClientRect();
  const chips = [...sec.querySelectorAll('ul li')].map((li) => ({
    icon: rel(li.querySelector('svg,img')),
    box: rel(li)
  }));
  const mascot = sec.querySelector('img[src*="mascot"]');
  return {
    section: { w: +s.width.toFixed(1), h: +s.height.toFixed(1) },
    h1: rel(sec.querySelector('h1')), lines,
    sub: { x: +(sb.x - s.x).toFixed(1), r: +(sb.right - s.x).toFixed(1), y: +(sb.y - s.y).toFixed(1), h: +sb.height.toFixed(1) },
    subFont: getComputedStyle(sub).fontSize,
    h1Font: getComputedStyle(sec.querySelector('h1')).fontSize,
    chips, mascot: rel(mascot),
    panel: rel(sec.querySelector('a[href="#service-providers"]'))
  };
});
console.log(JSON.stringify(r, null, 1));
await p.screenshot({ path: 'design/build-top.png', clip: { x: 0, y: 84, width: 1056 / 1.4286, height: 759 } });
await b.close();
