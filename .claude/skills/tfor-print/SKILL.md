---
name: tfor-print
description: House rules, build and checks for The First Owner's Reference print edition (208 x 280 mm casebound book set in HTML/CSS and printed by Chrome). Use for any work on /print, app/print/*, print.css, scripts/build-print.mjs, scripts/press/*, the proof or press PDFs, page layout, typography, data pages, front matter or prepress.
---

# The First Owner's Reference: print edition

The book is set from the same `content/*.json` as the website, rendered at `/print`, printed by headless Chrome, then mounted, converted and checked for press. There is no InDesign. Read this before changing anything under `app/print`, `components/print`, `scripts/build-print.mjs` or `scripts/press`.

Canonical documents: `docs/print/layout-specification.md` (layout, from the fly GDN study), `print/revision-2/` (change, exceptions and prepress registers against the design brief of 14 November 2026), `print/icc/README.md` (paper profile).

## Rules that are not up for change

1. **Content lock.** Layout never rewrites, shortens or drops approved copy, figures, tables, references or disclosures. A layout problem that needs a cut goes in `print/revision-2/exceptions-register.md` for the editors. Paragraph order is set by the web edition.
2. **True scale.** Nothing in the flow may lay out wider than the 172 mm type area. One element past it and Chrome shrinks every page to fit: the book printed at 70 per cent from May to November 2026 because of one unbreakable URL. `build-print.mjs` refuses to print if anything overflows. Only standalone-merged pages (cover, frontispiece, openers, plates, closing) may bleed.
3. **Sources print as domains only** (`lib/print-domain.ts`: `imo.org`, not the full URL). The web keeps full links.
4. **No eyebrows**: no label above a heading, no "Figure 01.01" or "Table 01.02" over a figure, no "Chapter 05" over the numeral. Where a label was the real name, it becomes the heading.
5. **No em dashes, no middots** in anything that prints, running heads included (sentence case: "06  Refit").
6. **Never** reintroduce paged.js; never wrap a chapter opener inside `.chapter-scope`; never put a full-page or column-spanning element in the middle of a fragmented multicol except the essay head picture, which the build fits.
7. **White page ground** (ink saving; the cream stock supplies the tone).

## Geometry

Trim 208 x 280 mm, bleed 3 mm, sheet 214 x 286 mm. Trim margins: head 20, foot 22, inner 22, outer 14; type area 172 x 238 mm. Body text in two columns of about 82 mm on a 7 mm gutter. Chapter openers fall on left-hand pages, essay on the facing right; the build inserts blank spacer pages to keep that parity.

Chrome's paper is 214.12 x 286.09 mm, never exact, and it paints only the 214 x 286 @page box, offset 0.08 mm up and left, so the foot 0.17 mm of every sheet is unpainted. CSS cannot fix this. The press mount (`scripts/press/make-pdfx.py`) crops the painted area and scales it by about 1.0004 to the exact sheet; without that, every full-bleed page carries a white hairline at the foot.

## Type

| Role | Setting |
|---|---|
| Running text, every family (essay, case, interview, data prose) | Newsreader 9.25 / 13.25 pt, justified, hyphenated, `text-wrap: pretty`, 4 mm indent, no space between paragraphs |
| Crossheads | DM Sans 700, 8 pt capitals, a line above, a third of a line below |
| Standfirsts | DM Sans 500, 11 / 15.5 pt |
| Set-piece titles | Newsreader 500, about 34 pt, `text-wrap: balance` |
| Interview questions | DM Sans 600, 9 pt, marine |
| Pull quotes | Newsreader italic 15 / 19 pt, 1.5 pt rule, one per spread |
| Captions / sources | DM Sans 7.5 pt / 7 pt roman, sentence case |
| Chart labels | at least 11 units on the 760-unit viewBox (7 pt printed); raised in print CSS only |

The front matter uses the same system (title 40 pt, page heads 26 pt, letter at body size). Anything sized before 14 November 2026 was tuned at 70 per cent scale and is suspect.

## Pictures

Four positions only, all `object-fit: cover`, centred, so commissioned photography drops in: chapter opener (full bleed, standalone); one essay head picture across both columns, fitted by the build; set-piece opener band 172 x 60 mm (interviews, cases); section foot picture sized by the build to the hole, at least 80 mm, never after a case. Each file is used once per build (`lib/print-picker.ts`). No full-page plates inside chapters (`PLATES_PER_CHAPTER = 0`).

## Data pages

Every data section prints. Charts are held to 92 mm, headings stay with their charts, chart notes set in two columns, and a chart drops its own title or standfirst when it repeats the spread title, standfirst or crosshead (`components/print/print-chart.tsx`, compares words, not punctuation). Tables of eight rows or fewer stay whole. A table immediately followed by a chart of the same data is dropped in print (rule from August, listed for approval as exception E1). A table with `printProse` prints those paragraphs in the two-column flow in place of the table and caption, source line kept; the web keeps the table. Prose must carry every figure in the table and caption (exception E11). Keep as tables only what readers scan: directories, schedules, checklists.

## Building and checking

```bash
# Full press build (about 25 minutes): two-pass print, folios, merges, press block,
# PDF/X-4 press file and prepress check
printf '{\n "fit": {}\n}\n' > lib/print-fit.json   # when layout changed: stale closer heights mislead
node scripts/build-print.mjs                        # runs pnpm build itself

# Fast loop while composing (seconds): dev server with webpack (Turbopack's
# next/font fails here), then a single-pass print of /print
pnpm next dev --webpack -p 3942
# print /print or /print-chapter/NN with puppeteer at preferCSSPageSize; spacers and
# closer heights come from the last full build, so parity may be stale

# Checks
python3 scripts/audit-layout.py <proof.pdf>          # short pages, stranded heads, empty columns
python3 scripts/audit-headings.py <proof.pdf>
python3 -I scripts/press/verify-press.py <...-PDFX4.pdf> <pages>   # prepress
```

Outputs in `print/1st-edition/` (PDFs are git-ignored): `-proof.pdf` (with cover, live text, for reading and text checks), `-proof-press-block.pdf` (RGB block, boxes), `-press-block-PDFX4.pdf` (printer's file: FOGRA52, outlined text, K-only black and greys).

The press chain in `scripts/press/` (mount, Ghostscript PDF/X-4, `blacktext.py`, `verify-press.py`) is adapted from Littlpinguin/marketing-cockpit-template (MIT, licence file alongside). Text is outlined there, which removes Chrome's Type 3 subsets, so text checks run on the proof, not the press file.

After every build: block page count about 180 (far more means a font-download fallback or an overflow), `Page map stable` in the log, contents folios equal to the printed `[[CHnn]]` markers, and the prepress check's result.

## Reviewing a spread (condensed from the cockpit editorial doctrine, MIT)

1. One clear entry point per spread; facing pages share at least two alignment lines.
2. White space is placed, not left over: a hole of more than 25 mm at a page foot that holds nothing is a fault.
3. Density matches the place in the sequence: openers open, running pages dense, chapter ends quiet.
4. No widow at a column head, no orphan at a column foot, no single word on the last line of a title, standfirst, pull quote or caption.
5. Hyphenation: no more than two consecutive hyphenated lines; none in titles.
6. A pull quote never repeats a sentence visible on the same spread.
7. One dominant picture per spread; nothing important within 5 mm of the trim.
8. Folio and running head in the same place on every running page; none on blank or full-bleed pages.

## Known gaps

- No baseline grid: 13.25 pt leading with spacing in mm never aligns across columns or facing pages. Fixing it means expressing every vertical space as a multiple of the leading.
- The cockpit doctrine recommends at least 9.5 pt for continuous reading on uncoated stock; the book is at 9.25 pt by Jack's decision (14 November 2026, to reduce extent). Revisit if the wet proof reads small.
- Essay-head and opener gradients are rasterised by Ghostscript at 72 ppi; invisible on a smooth gradient but a printer's preflight may flag it.
- Placeholder photographs are below 300 ppi; final masters must be at least 2,032 px wide for in-flow use and 2,528 x 3,378 for full bleed.
- The build stops after eight passes when closer heights keep adjusting; spacers and folios settle by pass 4, so this moves no page.
