# Studio editor plan

Written 10 August 2026. Plan for an in-browser WYSIWYG editor covering both the web and print editions, with block moves (images and paragraphs) on the print side.

## What exists today

One content source feeds both editions. `lib/lead-essays.ts`, `lib/cases.ts`, `lib/data-spreads.ts`, `lib/checklists.ts`, `lib/faqs.ts`, `lib/guest-opinions.ts` and `lib/sections.ts` are hand-authored TypeScript literals rendered by `app/[slug]/page.tsx` on the web and `app/print/page.tsx` in the press build. Print pagination is not stored anywhere: it is produced by Chrome's paged-media engine from `app/print/print.css`, and figures are placed by a counting heuristic in `ChapterBlock` (a tall figure after paragraph 3, then a supporting figure every 4 paragraphs). There is no backend, no auth, no database. Editing today means editing TypeScript by hand and re-running the build.

## Architecture

A local-first editor at `/studio` inside this repo. It runs only under `pnpm dev`; dev-only route handlers read and write the content files on disk, and the route returns 404 in production builds. No auth and no database, because git is already the database and the press build needs the local toolchain (Puppeteer, sips, Ghostscript, pypdf) anyway. A hosted editor would add an auth surface and a sync problem while still being unable to run the print pass on Vercel.

## Step 1, content store migration (completed 10 August 2026)

Move the seven content families from TS literals to JSON files under `content/`, with each existing `lib/*.ts` becoming a thin typed loader (`import data from` plus `satisfies Record<string, T>`), so all existing imports and type checks are untouched. The editor then reads and writes JSON rather than generating TypeScript source, which avoids escape and quote-fidelity bugs entirely: smart quotes live in the strings and survive round-tripping by construction.

Verification gate before anything else proceeds: production build passes, and a text-layer diff (`pdftotext`) of the print PDF before and after migration is identical.

Done: content extracted to `content/*.json` by `scripts/migrate-content-to-json.mts` (generated from the live modules, not transcribed), the seven `lib/*.ts` files are now thin typed loaders, and all three gates passed: deep-equal of every family against the originals at tag `last-known-good-pre-json-migration`, clean production build, and a byte-identical print text layer via `scripts/print-flow.mjs` (single-pass flow print for verification diffs). One deviation from the plan text: JSON imports widen string literals, so the loaders cast (`as`) rather than use `satisfies`; fidelity is held by the extraction method and the diff gates, and schema validation moves to the editor's write path in step 2.

## Step 2, block editor for both editions (completed 11 August 2026)

A custom block editor mapped one-to-one onto the existing union types (paragraph string, h2, blockquote, figure, editorsNote, webOnly, and the data-spread, case, checklist, FAQ and guest-opinion block shapes). No Tiptap or ProseMirror: the block model is small and typed, and a generic rich-text schema would fight it.

Text edits happen inline with contentEditable per block. On input, typed straight quotes and apostrophes convert to smart forms automatically, and em-dashes are rejected, so the style guide is enforced at the keyboard rather than at proof stage. A save-time lint also checks double spaces and range formats.

Blocks can be added, deleted and reordered by drag. Rollout by family: lead essays first, then data spreads, cases, checklists, FAQs, guest Q&As, and a plain form for section metadata.

Status: all seven families are editable at `/studio` under `next dev`. The shell has a chapter sidebar and family tabs (Essay, Data, Case, Checklist, FAQs, Q&As, Meta); editors live in `app/studio/editors/`. Lead essays get the full block treatment (drag reorder, insert menu, closing notes). Data spreads cover all six block types including full table grid editing (cells, add and remove rows and columns with rectangularity enforced by the validator) and key-value blocks. Cases, checklists, FAQs and guest Q&As get structured list editing with move and insert and delete throughout; sections get a metadata form (hero preview, focus select, SEO fields) with the slug fixed since routes and content keys depend on it. Saves batch across dirty families, each validated server-side against its schema. The dev-only API and page return 404 in production builds, verified against a served production build. Round-trip fidelity verified on every family: an edit saved and reversed leaves all seven content files byte-identical to git. Text fields are auto-growing textareas rather than contentEditable (content is plain strings, so this loses nothing and is far sturdier); quotes smarten as you type with the caret preserved; new em-dashes beyond the on-load baseline block saving, and the 52 existing ones (8 in essays, 44 in guest Q&A transcripts, pending the en-dash pass) surface as warnings only.

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

Decided 10 August 2026: paragraph order is canonical on the web edition. The print pane never reorders body copy; it adjusts formatting and layout only. Any change to paragraph order happens in the shared block editor and flows to both editions.

The pane shows true paginated spreads. A chapter-scoped query parameter is added to `/print` (render one chapter only), the dev server runs a Puppeteer print of that chapter on a debounce after each change (a few seconds), and the resulting PDF renders in the pane via pdf.js. Interactions, all of them print-only data that never touches the web edition:

- drag a figure between paragraphs to re-anchor it, or click it to change variant
- toggle `printOnly` blocks, and see `webOnly` blocks greyed out of the flow
- per-block break hints where the paged engine needs steering (force a page or column break before an h2, keep a block with the next one)
- a folio and parity readout from the existing marker scan, so opener parity problems are visible while editing rather than at press-build time

## Step 6, housekeeping

- Fix `updatePrintImagesManifest()` in `scripts/build-print.mjs`, which regenerates `lib/print-images.ts` from a template that silently drops the `tall` and `cases` keys.
- Save writes JSON, then a commit-and-push action in the editor records the change with a generated message.
- The editor and `build-print.mjs` both write `lib/print-images.ts` and `lib/print-folios.json`; the build remains the owner of both, and the editor treats them as read-only inputs.

## Open decisions

Resolved 10 August 2026: paragraph order stays canonical on the web edition; the print pane adjusts formatting and layout only (figure anchors and variants, printOnly blocks, break hints). No print-divergent paragraph order.

Still open:

1. Local-only versus hosted with auth. Recommendation: local-only, for the reasons above. A hosted read-only preview could come later if a second editor ever needs access.
2. First build scope: lead essays only, or all seven content families. Recommendation: lead essays plus figures first, since that covers the print layout work, then the other families.

## Rough effort

Step 1 is one session including the verification gate. Steps 2 and 3 are two to three sessions. Steps 4 and 5 are the largest piece, roughly three to four sessions. Step 6 is small.

---

# Revision, 12 September 2026: the print editor

Written after a long layout session that changed the register set, added three build-time feedback loops, and established a set of constraints the editor must not let anyone violate. Steps 1 and 2 are built. This revises steps 4 and 5 and adds two things the August plan did not anticipate: a QA panel and a copy-fit tool.

## What changed under the plan

The print edition is no longer the book the August plan described. It is two columns of 91.5mm, eight devices rather than fifteen, Newsreader and DM Sans with DM Mono retired, and it carries four kinds of picture: in-flow figures, full-page plates, picture-led quote plates, and section closers sized by the build.

Three loops now run inside `build-print.mjs` and write files the editor must treat as build-owned, never hand-edited:

| file | written by | holds |
|---|---|---|
| `lib/print-folios.json` | two-pass marker scan | real contents folios, parity spacers |
| `lib/print-fit.json` | `measure-fill.py` | per-section closer heights in mm |
| `lib/print-images.ts` | `expand-print-images.mjs` | the picture manifest |

## The constraint list the editor must enforce

Every one of these was learned the hard way this session and each is a rule the editor should make unbreakable, because a person moving blocks by eye will otherwise rediscover them one at a time.

1. **Nothing spans the columns mid-flow.** Chrome balances rather than fills a fragmented multicol, so a spanner strands a short row above it. The only exception is the drop-cap opening paragraph, which sits before fragmentation begins.
2. **In-flow elements cannot bleed.** Chrome clips content to the page area in paged media. Negative margins buy nothing. The only way to put ink off the trim is a plate, printed standalone from `/print-opener` and merged. The editor must not offer "bleed this image" on an in-flow figure.
3. **Chrome does not honour `break-after: avoid` inside a multicol.** A heading will land at a column foot whatever the CSS says. The editor can offer a break hint but must not promise it works.
4. **Top-of-page space costs foot space one for one.** Tried twice, at 62mm and at 25mm correctly scoped. Nothing in an automatic flow absorbs the displacement. If a designed top margin is wanted it is paid for editorially, by cutting the section that carries it.
5. **The sources section is frozen.** Three separate perturbations there each reflowed the block from 120 to 217 pages.
6. **Check the block page count after every build.** Anything far from the expected count means a silent font-download failure or a sources reflow.

## Step 5 revised: the print pane

The August decision holds and is now better evidenced: this is not free pixel positioning, and it should not pretend to be. Position on a page is a function of content order, anchors, variants and the CSS. The editor manipulates those and shows the real result.

**Preview.** An iframe of `/print?chapter=NN` at page scale, not a re-implementation of pagination. What Chrome shows in the iframe is what Chrome prints, so the preview is correct by construction and costs about two seconds to refresh rather than the ten minutes a full press build takes. Folios, closers and merged plates come from the last full build and are shown as they stand, flagged as stale when content has changed since.

**Direct manipulation, scoped to what the model supports.**

- Click a figure: change register (tall, half, wide), re-anchor it between paragraphs, swap the image from the library, or delete it.
- Click a plate: swap the picture, convert between a plain plate and a picture-led quote plate, choose which pull quote it carries.
- Click a closer: accept the measured height, override it, or suppress it.
- Drag to reorder sections within a chapter, and chapters within the book.
- Per-block break hints, offered with an honest label that Chrome may ignore them in a multicol.

**Copy editing** stays as built in step 2, because auto-growing textareas with quote smartening and the em-dash guard are sturdier than contentEditable and the content is plain strings.

## Step 7, new: the QA panel

`scripts/audit-layout.py` and `scripts/audit-headings.py` already find empty columns, short pages and stranded headings, and both are now trustworthy after three rounds of false positives. They become a panel in the editor: run, list defects by page, click to jump the preview to that page. The book ships when the panel is clear or every remaining item has been looked at and accepted.

This matters more than the drag-and-drop. Most of what went wrong this session was invisible until measured, and measuring it by hand took a page-by-page read.

## Step 8, new: the copy-fit tool

This is the highest-value feature in the whole editor and it is the one InDesign does not give you.

Roughly thirty sections end part-way down a page. The fix is editorial: cut or add a few lines so the section lands. The tool shows, for the selected section: where its last page currently ends, how many words to remove for the section to close on the previous page, and how many to add for it to fill the current one. Then it lets the editor make that cut in place and see the page reflow.

The same panel lists the thirteen headings currently stranded at a column foot, each with the number of words that would move it.

## Hosting: the August recommendation revisited

August said local-only, because the press build needs Puppeteer, sips, Ghostscript, poppler and pypdf, none of which run on Vercel serverless, and a hosted editor would add auth and sync for no gain.

The request is now explicitly for something online. Three options:

1. **Local-first, as built.** `pnpm dev`, open localhost. Zero new infrastructure. Requires the machine with the toolchain.
2. **Hosted editor, local press build.** The editor deploys to Vercel and persists content by committing to the repo through the GitHub API. The press build still runs locally. Editing from anywhere; press output from one machine.
3. **Hosted editor, press build in CI.** As above, plus a GitHub Actions workflow that runs the full press build on an Ubuntu runner, where Chrome, Ghostscript, poppler and python are all available, and publishes the proof, press block, CMYK master and audit report as artefacts. Fully online end to end.

Recommendation: build for 1 and 2 at once, since they are the same application differing only in the persistence adapter, then add 3, which is mostly a workflow file. Option 3 also gets the press build off the laptop, and it takes ten minutes.

## Sequence

1. Print pane with live preview and page navigation. Same in every hosting option.
2. Explicit placement model (step 4 of the August plan): figures gain `{ anchor, variant }`, with the counting heuristic as the fallback so the book keeps building throughout.
3. Figure and plate manipulation.
4. QA panel.
5. Copy-fit tool.
6. Section and chapter reordering.
7. Hosting: GitHub persistence adapter, then the CI press build.

Items 1 to 3 are the editor Jack asked for. Items 4 and 5 are what will actually get the book to press.
