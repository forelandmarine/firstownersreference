# Press package, 1st Edition

Written 7 August 2026. The print edition is produced in-house from this
repo; the InDesign handoff route (`print-designer-brief.md`,
`build-idml.mjs`) is retained as a fallback but is no longer the plan of
record.

## How it builds

```
pnpm build && node scripts/build-print.mjs     # SKIP_BUILD=1 to reuse .next
```

The build is a two-pass native Chrome print of `/print` at the
236 × 306 mm sheet (230 × 300 trim plus 3 mm bleed). Pass one discovers
where every chapter lands; real contents folios and verso/recto parity
spacers are written to `lib/print-folios.json`; later passes verify the
map is stable. Full-bleed pages (cover, frontispiece, nine chapter
openers, closing) are printed as standalone single-page documents from
`/print-opener/[key]` and merged over their placeholder pages, which
sidesteps Chrome's mid-document fragmentation seam. The case artwork
prints from `/print-case`.

Chapter-aware verso running heads are native `@page` masters generated
per chapter in `app/print/page.tsx`. Folios are native
`counter(page)` margin boxes; suppression uses the `no-folio` master.
The book block starts at the half-title recto; the cover is prepended to
the proof only, so recto/verso alternation matches the bound book.

## Artifacts (Desktop + iCloud Marketing Materials)

| File | What it is |
|---|---|
| `…-proof.pdf` | Reading proof, cover first, RGB |
| `…-proof-CMYK.pdf` | Soft-proofing CMYK of the above |
| `…-proof-press-block.pdf` | Book block: no cover, padded to 152 pp (multiple of 8), TrimBox/BleedBox stamped |
| `…-proof-press-block-CMYK.pdf` | The file the printer gets |
| `…-case.pdf` | Flat case artwork for the binder, foil and blind deboss annotated |

Current block: 146 content pages + 6 signature blanks = 152 pp
(9 × 16 + 1 × 8 signatures). Chapter openers all fall on versos with
body copy opening recto.

## Printer confirmations still needed

- ICC profile: current CMYK is generic prepress (Ghostscript). If Park /
  Pureprint / Generation Press supply a profile, re-run conversion with it.
- Spine width: artwork assumes 17 mm (152 pp Munken Pure 120 gsm, bulk
  1.13, plus boards and round). Binder to confirm before tooling.
- Board colour, foil colour, endpapers, ribbon, head/tail bands: TBC
  with binder; the case artwork carries a finishing legend.
- Stock samples and imposition scheme from the chosen printer.

## Editorial items still open before press

- Acknowledgements: placeholder in the colophon; write once contributors
  are final.
- En-dash pass for ranges ("20 to 24 m" style is house voice in prose,
  but tables may want en-dashes).
- Image masters at 300 dpi at print size (current: 2700 px long edge,
  acceptable at this trim but originals preferred).
- Professional indexer pass over the auto-generated index (working draft
  is labelled as such).
- ISSN (imprint currently reads "ISSN pending").
