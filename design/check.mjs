import { chromium } from '@playwright/test';
const widths = [390, 768, 1024, 1200, 1425, 1920];
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
const rows = [];
for (const w of widths) {
  await p.setViewportSize({ width: w, height: 900 });
  await p.goto('http://localhost:5173/', { waitUntil: 'load' });
  await p.evaluate(async () => {
    document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
    await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
    document.querySelector('[aria-label="Show slide 1"]')?.click();
  });
  await p.waitForTimeout(250);
  rows.push(await p.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const r = (e) => { if (!e) return null; const x = e.getBoundingClientRect(); return { t: Math.round(x.top + scrollY), b: Math.round(x.bottom + scrollY), l: Math.round(x.left), r: Math.round(x.right) }; };
    const hero = q('[data-section="hero"]');
    const cluster = hero.querySelector('[class*="aspect-"]');
    const fees = q('#fees');
    const svg = fees.querySelector('svg[aria-hidden="true"]');
    const calc = fees.querySelector('.font-display');
    const car = q('[data-section="carousel"]');
    const slide = [...car.querySelectorAll('[aria-roledescription="slide"]')].find((s) => !s.hidden);
    const lg = innerWidth >= 1024;
    return {
      vw: innerWidth,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heroClusterSpill: lg ? r(cluster).b - r(hero).b : null,
      connectorOvershoot: lg && svg ? r(svg).b - r(calc).t : null,
      connectorDotGap: lg && svg ? r(svg).t - r(slide.querySelector('.grid')).b : null,
      pageHeight: document.documentElement.scrollHeight
    };
  }));
}
await b.close();
console.log('vw     overflow  heroSpill  connOvershoot  connDotGap  pageH');
for (const x of rows) {
  console.log(
    String(x.vw).padEnd(6),
    String(x.overflow).padEnd(9),
    String(x.heroClusterSpill ?? '-').padEnd(10),
    String(x.connectorOvershoot ?? '-').padEnd(14),
    String(x.connectorDotGap ?? '-').padEnd(11),
    x.pageHeight
  );
}
