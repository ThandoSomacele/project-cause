import { chromium } from '@playwright/test';
// The design's two axes, measured on the 1:1 render:
//   arrowhead centre == ink centre of the "t" of "connects"  (offset +0.0px)
//   pipe centre      == ink centre of the "d" of "leads" + 8.5px at 1425
// Both are expressed below as a % of viewport width so they can be compared
// across breakpoints: +8.5px/1425 = 0.596%.
const widths = [1024, 1152, 1280, 1366, 1440, 1600, 1920, 2560];
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
console.log('vw     arrow−t(%)   pole−d(%)   target 0.000 / 0.596   railGap%   ovf');
for (const w of widths) {
	await p.setViewportSize({ width: w, height: 900 });
	await p.goto('http://localhost:5173/', { waitUntil: 'load' });
	await p.evaluate(async () => {
		document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
		await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
	});
	await p.waitForTimeout(200);
	const m = await p.evaluate(() => {
		const vw = innerWidth;
		const hero = document.querySelector('[data-section="hero"]');
		const h1 = hero.querySelector('h1');
		const frame = hero.querySelector('img[src*="hero-frame"]');
		const mascot = hero.querySelector('img[src*="mascot-pole"]');
		const f = frame.getBoundingClientRect(), mb = mascot.getBoundingClientRect();
		// arrowhead centre sits at SVG x=8.66 of 674.66; the mirrored pipe centre
		// centre sits at 10.04% across the mirrored mascot box (derived from pixels).
		const arrow = f.left + (8.66 / 674.66) * f.width;
		const pipe = mb.left + 0.1004 * mb.width;
		const ink = (needle, i) => {
			const w = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
			for (let n; (n = w.nextNode()); ) {
				const k = n.textContent.indexOf(needle);
				if (k < 0) continue;
				const r = document.createRange(); r.setStart(n, k + i); r.setEnd(n, k + i + 1);
				const b = r.getBoundingClientRect();
				return (b.left + b.right) / 2;
			}
		};
		return {
			vw,
			at: ((arrow - ink('connects', 6)) / vw) * 100,
			pd: ((pipe - ink('leads', 3)) / vw) * 100,
			gap: ((vw - (f.left + (644 / 674.66) * f.width)) / vw) * 100,
			ovf: document.documentElement.scrollWidth - document.documentElement.clientWidth
		};
	});
	console.log(
		String(m.vw).padEnd(6) + m.at.toFixed(3).padStart(9) + m.pd.toFixed(3).padStart(12) +
		'                       ' + m.gap.toFixed(3).padStart(7) + String(m.ovf).padStart(6)
	);
}
await b.close();
