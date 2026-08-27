# Design reference

Pulled from Figma node `4612:24010` (Arcterio → Service Provider Section, 1425 × 9034).

- `raw/exports/page-full.png` — the entire page at 1:1. Primary visual reference.
- `raw/exports/hero.png` — hero section at 1:1.
- `raw/page/` — source bitmaps + vector assets for the page (first 20 of each; Figma truncates).
- `raw/hero/` — source bitmaps + vector assets for the hero.
- `crop.sh x y w h out.png` — crop a region out of the full-page render for inspection.

Nothing here ships. Curated, optimised copies live in `static/`.

## Assets still needed from Figma

The Figma MCP caps `download_assets` at 20 images + 20 SVGs per node, and this
page has more than that, so three assets were never returned. They are currently
**1x crops lifted from `raw/exports/page-full.png`** — correct in content but soft
on high-DPI screens. Replace with 2x exports:

| file | Figma node | what it is |
|---|---|---|
| `static/images/tab-credits.webp` | inside `4612:24216` | woman in blue hard hat with clipboard |
| `static/images/mascot-thumbsup.webp` | inside `4612:24184` | elephant giving a thumbs-up in an amber disc |
| `static/images/mascot-wave.webp` | inside `4612:24292` | waving elephant on the dark carousel card |

The two mascots were cropped from the 1x render and had their backgrounds
removed with a corner flood-fill (`key.html`), so they do composite correctly —
they are just 1x. The tab photo is a plain 1x crop.

## Icons standing in for unavailable ones

The same 20-asset cap meant several icons never came back. These are the closest
available substitutes, not the design's own artwork:

| used | should be | where |
|---|---|---|
| `wrench.svg` | a list/document icon | "The Alternatives" panel |
| `jobs.svg` (house) | a trophy | "How We're Better" panel |
| `banknote.svg` | distinct per-benefit icons | "Choose how you get paid" rows |

## Rebuilding

`./design/build-assets.sh` re-derives everything in `static/` from `raw/`. Drop
better exports into `raw/` (or straight into `static/`) and re-run it.

Helpers: `crop.sh` (pull a region out of the full-page render at 1:1),
`measure.py` (compare landmark positions between the design and a build
screenshot), `bbox.py` (find an image's opaque bounding box), `compare.html`
(side-by-side + difference blend), `key.html` (flood-fill background removal).
