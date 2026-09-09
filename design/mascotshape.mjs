import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const files = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 } });
for (const f of files) {
  const svg = readFileSync(f, 'utf8');
  await p.setContent(
    `<body style="margin:0;background:#0C142F"><div style="width:1300px">${svg.replace('<svg', '<svg style="width:100%;height:auto;display:block"')}</div></body>`
  );
  const el = await p.locator('svg').first();
  const bb = await el.boundingBox();
  const out = `design/render-${basename(f, '.svg').replace(/\s+/g, '')}.png`;
  await p.screenshot({ path: out, clip: bb });
  console.log(basename(f), '->', out, JSON.stringify(bb));
}
await b.close();
