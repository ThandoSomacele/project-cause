import { chromium } from '@playwright/test';
const b = await chromium.launch({ args: ['--hide-scrollbars'] });
for (const width of [1024, 1200, 1425, 1920]) {
  const p = await b.newPage({ viewport: { width, height: 900 } });
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const sec = document.querySelector('[data-section="hero"]');
    const s = sec.getBoundingClientRect();
    const cluster = sec.querySelector('img[src*="hero-frame"]').parentElement;
    const cb = cluster.getBoundingClientRect();
    const fr = sec.querySelector('img[src*="hero-frame"]').getBoundingClientRect();
    const st = sec.querySelector('span.bg-accent').getBoundingClientRect();
    const f = (v) => +v.toFixed(2);
    return {
      cluster: { w: f(cb.width), h: f(cb.height), x: f(cb.x - s.x), y: f(cb.y - s.y) },
      frame: { w: f(fr.width), h: f(fr.height), x: f(fr.x - cb.x), y: f(fr.y - cb.y), r: f(fr.right - cb.x) },
      stub: { x: f(st.x - cb.x), y: f(st.y - cb.y), h: f(st.height) },
      svgLineTop: f(fr.y - cb.y + (472 / 730) * fr.height),
      svgLineH: f((3 / 730) * fr.height),
      svgLineRight: f(fr.right - cb.x)
    };
  });
  console.log(width, JSON.stringify(r));
  await p.close();
}
await b.close();
