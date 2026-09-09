import { chromium } from '@playwright/test';
const b = await chromium.launch({ args: ['--hide-scrollbars'] });
for (const width of [1024, 1280, 1366, 1425, 1600, 1920]) {
  const p = await b.newPage({ viewport: { width, height: 900 } });
  await p.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
  for (const sel of ['hero', 'clients']) {
    const r = await p.evaluate((sel) => {
      const sec = document.querySelector(`[data-section="${sel}"]`);
      const fr = sec.querySelector('img[src*="hero-frame"]').getBoundingClientRect();
      const st = sec.querySelector('span.bg-accent').getBoundingClientRect();
      const f = (v) => +v.toFixed(2);
      return { dTop: f(st.y - (fr.y + (472 / 730) * fr.height)), dH: f(st.height - (3 / 730) * fr.height), lap: f(fr.right - st.x) };
    }, sel);
    console.log(width, sel.padEnd(8), 'top Δ', String(r.dTop).padStart(6), ' thickness Δ', String(r.dH).padStart(6), ' overlap', r.lap);
  }
  await p.close();
}
await b.close();
