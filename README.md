# Cause — Service Providers landing page

Responsive marketing page for **Cause**, a South African platform that connects
service providers to client leads with no credit system: one fixed monthly fee,
transparent processes, and payment on the provider's terms.

Built from Figma node
[`4612:24010`](https://www.figma.com/design/fOGQtQbnbrB8jyVMkRNTSK/Arcterio?node-id=4612-24010)
(Arcterio → Service Provider Section, 1425 × 9034).

## Stack

SvelteKit 2 · Svelte 5 (runes) · Tailwind CSS v4 · TypeScript · adapter-node · Playwright

## Commands

```bash
pnpm install
pnpm dev                 # dev server on :5173
pnpm build && pnpm preview
pnpm check               # svelte-check — must stay at 0 errors
pnpm exec playwright test              # full e2e suite
pnpm exec playwright test --project=desktop
./design/build-assets.sh # re-derive static/ from the raw Figma pulls
```

## Layout

```
src/
├─ routes/
│  ├─ +layout.svelte      nav + footer + skip link
│  ├─ +page.svelte        composes the nine sections
│  ├─ +page.server.ts     waitlist form action
│  └─ layout.css          Tailwind entry + design tokens
└─ lib/
   ├─ components/
   │  ├─ layout/          Navbar, MobileNav, Footer
   │  ├─ sections/        the nine page sections
   │  └─ ui/              Button, EmailCapture, Tabs, Carousel, Accordion, …
   ├─ data/               all page copy, as data
   ├─ server/             waitlist sink (server-only)
   └─ utils/              fees.ts, format.ts
design/                   Figma reference + the asset pipeline (not shipped)
```

Page copy lives in `src/lib/data/*.ts`, so wording changes never touch markup.

## Design tokens

Defined once in [`src/routes/layout.css`](src/routes/layout.css) under `@theme`.
The design uses **two typefaces**: Geist for the FAQ and fee calculator, Inter
for the marketing sections. Both are self-hosted via `@fontsource-variable`.

Two container widths mirror the design's own grid: `container-page` resolves to
1200px of content and `container-wide` to 1282px at a 1425px viewport.

## Fee calculator

The rate lives in [`src/lib/utils/fees.ts`](src/lib/utils/fees.ts) as a single
constant:

```ts
export const PLATFORM_FEE_RATE = 0.048; // 4.8% incl. VAT
```

Moving to a tiered or capped model is a one-file change. The displayed
percentage is derived from the computed fee rather than printed from the
constant, so it stays truthful if the model changes.

## Waitlist

Both forms post to the `waitlist` action in `+page.server.ts`, progressively
enhanced with `use:enhance` and working without JavaScript. They share one
action and are told apart by a `source` field. A honeypot field is included.

`src/lib/server/waitlist.ts` is a **stub** — it acknowledges signups without
persisting them, and logs a redacted address. Swap in a real provider there and
read credentials from `$env/dynamic/private`; never commit keys.

## Known gaps

See [`design/README.md`](design/README.md) for the three assets Figma's export
cap truncated, and the icons currently standing in for unavailable ones.
