import { chromium } from '@playwright/test';

// The design frame is 1425 wide. Every desktop measurement below is expressed
// as a fraction of the viewport and compared against the same fraction taken
// off the 1:1 Figma render, so a width is "correct" when it holds the design's
// proportion — not when it matches a pixel count.
const D = 1425;
const design = {
	wideBox: 1346 / D,       // container-wide padding box
	wideContent: 1282 / D,   // ...and its content box
	pageBox: 1264 / D,
	pageContent: 1200 / D,
	cluster: 717 / D,
	heroFont: 75.6 / D
};

const widths = [390, 768, 1024, 1280, 1366, 1440, 1600, 1920, 2560];
const b = await chromium.launch();
const p = await (await b.newContext()).newPage();
const rows = [];

for (const w of widths) {
	await p.setViewportSize({ width: w, height: 768 });
	await p.goto('http://localhost:5173/', { waitUntil: 'load' });
	await p.evaluate(async () => {
		document.querySelectorAll('img').forEach((i) => (i.loading = 'eager'));
		await Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => {}))));
	});
	await p.waitForTimeout(200);

	rows.push(await p.evaluate(() => {
		const vw = innerWidth;
		const hero = document.querySelector('[data-section="hero"]');
		const wide = hero.querySelector('.container-wide');
		const page = document.querySelector('.container-page');
		const cluster = hero.querySelector('[class*="aspect-"]');
		const mascot = hero.querySelector('img[src*="mascot-pole"]');
		const frame = hero.querySelector('img[src*="hero-frame"]');
		const h1 = hero.querySelector('h1');

		const cs = (e) => getComputedStyle(e);
		const box = (e) => e.getBoundingClientRect();
		const inner = (e) => {
			const s = cs(e), r = box(e);
			return r.width - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
		};

		// Locate a single glyph by walking the text node with a Range.
		const glyph = (root, needle, offsetInNeedle) => {
			const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
			for (let n; (n = walk.nextNode()); ) {
				const i = n.textContent.indexOf(needle);
				if (i < 0) continue;
				const rg = document.createRange();
				rg.setStart(n, i + offsetInNeedle);
				rg.setEnd(n, i + offsetInNeedle + 1);
				const r = rg.getBoundingClientRect();
				if (r.width) return { l: r.left, r: r.right, c: (r.left + r.right) / 2 };
			}
			return null;
		};

		const lg = vw >= 1024;
		// "leads" — the final d; "connects" — the leading t is the 5th char.
		const dGlyph = glyph(h1, 'leads', 4);
		const tGlyph = glyph(h1, 'connects', 4);

		return {
			vw,
			overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
			wideBox: box(wide).width / vw,
			wideContent: inner(wide) / vw,
			pageBox: page ? box(page).width / vw : null,
			pageContent: page ? inner(page) / vw : null,
			cluster: lg ? box(cluster).width / vw : null,
			heroFont: parseFloat(cs(h1).fontSize) / vw,
			// Glyph and artwork positions, as fractions of the viewport.
			dCenter: dGlyph ? dGlyph.c / vw : null,
			tCenter: tGlyph ? tGlyph.c / vw : null,
			mascotL: lg && mascot ? box(mascot).left / vw : null,
			mascotW: lg && mascot ? box(mascot).width / vw : null,
			frameL: lg && frame ? box(frame).left / vw : null,
			frameW: lg && frame ? box(frame).width / vw : null
		};
	}));
}
await b.close();

const pct = (v) => (v == null ? '   —  ' : (v * 100).toFixed(2).padStart(6));
const dev = (v, d) => (v == null ? '  — ' : (((v - d) / d) * 100).toFixed(1).padStart(5) + '%');

console.log('\n== Container & type, as % of viewport (design target in header) ==');
console.log(
	'vw     ovf  wideBox        wideCont       pageBox        pageCont       cluster        heroFont'
);
console.log(
	'                ' +
		[design.wideBox, design.wideContent, design.pageBox, design.pageContent, design.cluster, design.heroFont]
			.map((d) => (pct(d) + '        ').slice(0, 15))
			.join('')
);
for (const r of rows) {
	console.log(
		String(r.vw).padEnd(6) +
			String(r.overflow).padStart(3) +
			'  ' +
			[
				[r.wideBox, design.wideBox],
				[r.wideContent, design.wideContent],
				[r.pageBox, design.pageBox],
				[r.pageContent, design.pageContent],
				[r.cluster, design.cluster],
				[r.heroFont, design.heroFont]
			]
				.map(([v, d]) => (r.vw >= 1024 ? pct(v) + dev(v, d) + '  ' : pct(v) + '        '))
				.join('')
	);
}

console.log('\n== Hero glyph / artwork registration, as % of viewport ==');
console.log('vw      d(leads)  t(connects)  mascotL  mascotW  frameL  frameW');
for (const r of rows) {
	console.log(
		String(r.vw).padEnd(7) +
			[r.dCenter, r.tCenter, r.mascotL, r.mascotW, r.frameL, r.frameW].map(pct).join('   ')
	);
}

// Every desktop row must agree with the 1425-equivalent row. Anything that
// drifts here is an element that is not scaling with the rest of the page.
const ref = rows.find((r) => r.vw === 1440) ?? rows.at(-1);
console.log('\n== Drift vs 1440 reference (desktop only; >0.15% = visible) ==');
for (const r of rows.filter((x) => x.vw >= 1024)) {
	const keys = ['dCenter', 'tCenter', 'mascotL', 'mascotW', 'frameL', 'frameW', 'cluster', 'heroFont'];
	const worst = keys
		.map((k) => [k, Math.abs((r[k] - ref[k]) / ref[k]) * 100])
		.sort((a, b) => b[1] - a[1])[0];
	console.log(
		String(r.vw).padEnd(7) + 'worst: ' + worst[0].padEnd(10) + worst[1].toFixed(3) + '%'
	);
}
