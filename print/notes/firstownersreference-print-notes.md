# Print proof: design notes

Generated automatically by the build script. Open the PDF first, then read these notes alongside.

## Page count
198 pages.

## Trim and margins
- Trim: 230 × 300 mm
- Outer margin: 18 mm
- Inner (gutter) margin: 22 mm
- Top margin: 22 mm
- Bottom margin: 22 mm

The inner margin is intentionally larger than the outer because the casebound binding loses ~5 mm into the gutter at this trim.

## Type system

| Element | Family | Size | Leading |
|---|---|---|---|
| Body | Newsreader, 400 | 9.5 pt | 13 pt |
| Drop cap | Newsreader, 300 | 51 pt | 0.95 |
| h2 | Newsreader, 400 | 13 pt | 16 pt |
| Pull quote | Newsreader, 300, italic | 18 pt | 22 pt |
| Standfirst | Newsreader, 300, italic | 14 pt | 19 pt |
| Caption | Newsreader, italic | 7.75 pt | 10.5 pt |
| Meta-mono | Geist Mono | 7 pt | 9 pt |
| Chapter number | Newsreader, 300 | 220 pt | 0.85 |
| Chapter title | Newsreader, 300 | 36 pt | 38 pt |
| Folio | Geist Mono | 8.5 pt | — |

Body text is justified with hyphenation enabled (`hyphens: auto`, limit 6 3 3). Orphans and widows are set to 3 lines minimum.

## Hierarchy and rhythm
- Chapter openers always start on a recto, with a full-bleed image on the verso opposite.
- Sections (h2) within a chapter break-after avoid: the heading and the first line of its paragraph stay together.
- Pull quotes are span-all in the two-column layout, with a left rule in marine.
- Editor's notes sit at column-width with a tinted background and left rule.
- Cases run as feature articles with their own opener including yacht class, year, and value bands.
- Data spreads use tabular figures (`font-variant-numeric: tabular-nums`) and Geist Mono numerals.

## Colour
- Marine #0f3b5c carries the editorial accent: chapter numbers, pull-quote rule, h2 in cases.
- Sail-blue #4a7da9 carries non-emphasis chart series.
- Charcoal #1a1a1a is body text.
- Stone #7a756d is metadata, captions, and folios.
- Paper #f5f2ec is the background.
- Rule #c8c2b4 is hairlines.

## Where the proof falls short of magazine-press
- **Cover.** Auto-picked from the stock library. The press edition needs commissioned cover photography.
- **Image art-direction.** Stock images selected by an agent for editorial fit are adjacent rather than perfect. A picture editor for the September edition will commission and call in shots properly.
- **Charts.** Designed for screen; render correctly at print but a designer may redraw two or three for print legibility.
- **Index.** Auto-generated. A human indexer will rebuild it for the press edition with concept threading and see-also references.
- **Drop caps.** Set on first paragraph of each chapter and case via `::first-letter`; designers usually set drop caps as separate spans for finer control over kerning and line offset.
- **Footnotes.** Currently sources are consolidated in the back matter rather than at foot of page. A designer's pass typically moves these to chapter ends or page foot.
- **Acknowledgements.** Placeholder. To be written after contributors confirm.

## Press readiness (built into this pipeline)
- Sheet printed at 236 x 306 mm: 3 mm bleed on all edges; TrimBox/BleedBox stamped
- Chapter-aware verso running heads, native folios, computed contents folios
- Verso/recto parity enforced (chapter openers on versos via spacer pages)
- Press block file: cover dropped, padded to a multiple of 8 pages, CMYK master
- Flat case artwork for the binder (foil + blind deboss annotated)

## What still needs a human
- Printer's ICC profile confirmation (current CMYK is generic prepress; re-run with the printer's profile if supplied)
- Image masters at 300 dpi at print size (currently 2700px long edge)
- En-dashes for ranges (currently "20 to 24m"); a typographic pass before press
- Spine width, board colour, foil colour, endpapers: confirm with binder

## Repeatable
The proof regenerates by running:

```
pnpm build && node scripts/build-print.mjs
```

Image manifest is in `lib/print-images.ts`. Mark up which images to swap in the assignment list, then re-run.
