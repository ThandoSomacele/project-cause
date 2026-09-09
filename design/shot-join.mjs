import { chromium } from '@playwright/test';
const b = await chromium.launch({ args: ['--hide-scrollbars'] });
const out = [];
for (const width of [1024, 1366, 1425, 1920]) {
  const p = await b.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 3 });
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const clip = await p.evaluate(() => {
    const sec = document.querySelector('[data-section="hero"]');
    const fr = sec.querySelector('img[src*="hero-frame"]').getBoundingClientRect();
    const y = fr.y + (472 / 730) * fr.height + scrollY;
    return { x: fr.right - 90 + scrollX, y: y - 45, width: 130, height: 90 };
  });
  const f = `design/join-${width}.png`;
  await p.screenshot({ path: f, clip, fullPage: true });
  out.push([width, f]);
  await p.close();
}
await b.close();
console.log(out.map((o) => o.join(' ')).join('\n'));
