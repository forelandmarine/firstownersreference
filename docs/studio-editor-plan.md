# Studio editor plan

Written 10 August 2026. Plan for an in-browser WYSIWYG editor covering both the web and print editions, with block moves (images and paragraphs) on the print side.

## What exists today

One content source feeds both editions. `lib/lead-essays.ts`, `lib/cases.ts`, `lib/data-spreads.ts`, `lib/checklists.ts`, `lib/faqs.ts`, `lib/guest-opinions.ts` and `lib/sections.ts` are hand-authored TypeScript literals rendered by `app/[slug]/page.tsx` on the web and `app/print/page.tsx` in the press build. Print pagination is not stored anywhere: it is produced by Chrome's paged-media engine from `app/print/print.css`, and figures are placed by a counting heuristic in `ChapterBlock` (a tall figure after paragraph 3, then a supporting figure every 4 paragraphs). There is no backend, no auth, no database. Editing today means editing TypeScript by hand and re-running the build.

## Architecture

A local-first editor at `/studio` inside this repo. It runs only under `pnpm dev`; dev-only route handlers read and write the content files on disk, and the route returns 404 in production builds. No auth and no database, because git is already the database and the press build needs the local toolchain (Puppeteer, sips, Ghostscript, pypdf) anyway. A hosted editor would add an auth surface and a sync problem while still being unable to run the print pass on Vercel.

## Step 1, content store migration

Move the seven content families from TS literals to JSON files under `content/`, with each existing `lib/*.ts` becoming a thin typed loader (`import data from` plus `satisfies Record<string, T>`), so all existing imports and type checks are untouched. The editor then reads and writes JSON rather than generating TypeScript source, which avoids escape and quote-fidelity bugs entirely: smart quotes live in the strings and survive round-tripping by construction.

Verification gate before anything else proceeds: production build passes, and a text-layer diff (`pdftotext`) of the print PDF before and after migration is identical.

## Step 2, block editor for both editions

A custom block editor mapped one-to-one onto the existing union types (paragraph string, h2, blockquote, figure, editorsNote, webOnly, and the data-spread, case, checklist, FAQ and guest-opinion block shapes). No Tiptap or ProseMirror: the block model is small and typed, and a generic rich-text schema would fight it.

Text edits happen inline with contentEditable per block. On input, typed straight quotes and apostrophes convert to smart forms automatically, and em-dashes are rejected, so the style guide is enforced at the keyboard rather than at proof stage. A save-time lint also checks double spaces and range formats.

Blocks can be added, deleted and reordered by drag. Rollout by family: lead essays first, then data spreads, cases, checklists, FAQs, guest Q&As, and a plain form for section metadata.

## Step 3, web WYSIWYG

The edit surface renders chapters with the real site components, so the web pane is WYSIWYG by construction rather than by preview. Editing a paragraph is editing the paragraph as it appears on firstownersreference.com.

## Step 4, explicit print placement model

Replace the counting heuristic with placement data the editor can manipulate. Figure entries gain an optional print field:

```
{ anchor: <index of the paragraph the figure follows>,
  variant: "wide" | "feature" | "tall" | "inset" | "halfbleed" }
```

Chapters without explicit placements fall back to the current heuristic, so the book keeps building throughout the transition. A `printOnly` block type is added as the mirror of the existing `webOnly`.

## Step 5, print pane

Honest scope first: print WYSIWYG here is not free pixel positioning. The book is set by Chrome's layout engine, so position on a page is a function of content order, anchors, variants and the CSS rules. The editor manipulates exactly those inputs and then shows the real result.

The pane shows true paginated spreads. A chapter-scoped query parameter is added to `/print` (render one chapter only), the dev server runs a Puppeteer print of that chapter on a debounce after each change (a few seconds), and the resulting PDF renders in the pane via pdf.js. Interactions:

- drag a figure between paragraphs to re-anchor it, or click it to change variant
- drag paragraphs to reorder them
- a folio and parity readout from the existing marker scan, so opener parity problems are visible while editing rather than at press-build time

Because both editions share one source, moving a paragraph in the print pane moves it on the web too. Print-divergent moves are limited to figures (anchors and variants are print-only data) and to `printOnly` and `webOnly` blocks.

## Step 6, housekeeping

- Fix `updatePrintImagesManifest()` in `scripts/build-print.mjs`, which regenerates `lib/print-images.ts` from a template that silently drops the `tall` and `cases` keys.
- Save writes JSON, then a commit-and-push action in the editor records the change with a generated message.
- The editor and `build-print.mjs` both write `lib/print-images.ts` and `lib/print-folios.json`; the build remains the owner of both, and the editor treats them as read-only inputs.

## Open decisions

1. Paragraph reordering is shared between editions in this plan. If print needs a genuinely different paragraph order from web, the content forks per chapter, which doubles proof-correction effort. Recommendation: keep order shared.
2. Local-only versus hosted with auth. Recommendation: local-only, for the reasons above. A hosted read-only preview could come later if a second editor ever needs access.
3. First build scope: lead essays only, or all seven content families. Recommendation: lead essays plus figures first, since that covers the print moves, then the other families.

## Rough effort

Step 1 is one session including the verification gate. Steps 2 and 3 are two to three sessions. Steps 4 and 5 are the largest piece, roughly three to four sessions. Step 6 is small.
