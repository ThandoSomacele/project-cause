import { chromium } from '@playwright/test';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 800, height: 900 } });
await p.setContent(`<body style="margin:0;background:#0C142F"><img src="http://localhost:4173/icons/hero-frame.svg" style="display:block;width:674.66px"></body>`);
await p.waitForTimeout(400);
await p.screenshot({ path: 'design/frame-1x.png', clip: { x: 0, y: 0, width: 700, height: 740 } });
await b.close();
