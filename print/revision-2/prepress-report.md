# Prepress report, second layout revision

State of the press files on 14 November 2026 and what remains before the book can go to a printer. Files: `print/1st-edition/` (proof, proof-CMYK, press-block, press-block-CMYK). All four parse without errors.

## Format

| Item | Now | To confirm with printer and binder |
|---|---|---|
| Trim | 208 × 280 mm portrait | Confirm the sheet and imposition for this trim |
| Bleed | 3 mm all edges; TrimBox, BleedBox and ArtBox stamped on every page | Some printers ask for 5 mm on casebound work |
| Type area | 172 × 238 mm; head 20, foot 22, inner 22, outer 14 mm (trim) | Gutter loss for Smyth-sewn casebinding at about 184 pp is normally 3–5 mm. 22 mm inner is safe; the binder should confirm |
| Safe area | Nothing but full-bleed pictures within 6 mm of the trim | Confirm |
| Extent | 182-page block; press block padded to 184 with two blank pages (23 sections of eight) | Signature size (8, 16 or 32) decides the padding. At 16-page sections the block would pad to 192 |
| Blank pages | Four blank pages inserted so every chapter opener falls on a left-hand page (before ch01, ch02, ch05, ch07), plus the two pad pages at the end | Confirm the printer wants padding pages inside the PDF rather than added at imposition |

## Fonts

**Type 3 subsets: not yet fixed, fix tested.** Chrome embeds variable fonts as Type 3. The proof carries about 80 Type 3 subsets of Newsreader and DM Sans. Many prepress workflows reject Type 3, and some RIPs render it poorly.

A static instance of Newsreader made with fontTools from the variable font embeds as CID TrueType (tested: `Newsreader 400, opsz 9`). The fix is to generate static instances for each weight and optical size the book uses and serve them to the print route only:

- Newsreader roman 300, 400, 500 and italic 300, 400, at a text optical size (about 9) and a display size (about 36);
- DM Sans 400, 500, 600, 700 at opsz 9.

This changes the letterforms slightly at display sizes, because Chrome currently picks an optical size per element, so it needs one look at a proof before it is adopted. About half a day's work.

## Images

The current photographs are placeholders and are not judged here. For planning:

| Use | Printed size | Pixels needed at 300 ppi | Placeholders now |
|---|---|---|---|
| Chapter opener, full bleed | 214 × 286 mm | 2,528 × 3,378 | 2,530 × 3,380 (meet it) |
| Essay head picture | 172 × up to 130 mm | 2,032 × 1,535 | about 1,100 px wide (≈ 160 ppi) |
| Interview and case opener | 172 × 60 mm | 2,032 × 709 | about 1,100 px wide (≈ 160 ppi) |
| Section foot picture | 172 × up to 200 mm | 2,032 × 2,362 | about 1,100 px (90–160 ppi) |

In-flow pictures are served from 1,100-pixel derivatives. The press build must point the print route at full-resolution masters before the final files are made. Commissioned photography should be delivered at least 2,600 px on the short edge, in Adobe RGB or sRGB with the profile embedded.

## Colour

| Item | Now | Needed |
|---|---|---|
| Conversion | Ghostscript generic prepress to CMYK | The printer's profile for the chosen stock. For uncoated Munken Pure that is normally PSO Uncoated v3 (FOGRA52) |
| Black text | Body text is charcoal #1a1a1a, which converts to four-colour black | Set text to 100 per cent K only, or convert with "preserve K". Four-colour text on uncoated stock misregisters and fills in at 9 pt |
| Overprint | Not set | Black text and hairlines should overprint |
| Total ink | Not limited | 300 per cent or the printer's figure for uncoated stock |
| Marine #0f3b5c | Shifts visibly in conversion | Check on the wet proof; consider a spot colour for the case foil only, as planned |
| Page ground | White (changed from #f5f2ec); no ink on empty paper | None |

## PDF standard

Chrome writes PDF 1.4 with live transparency in places (chart fills, image masks). Ask the printer whether they want PDF/X-4, which keeps transparency, or PDF/X-1a, which needs flattening. X-4 is the safer route from this pipeline. Neither is produced yet. The press block is stamped with boxes but is not a validated PDF/X file.

## Case and endpapers

The case artwork route (`/print-case`) still draws the 230 × 300 mm boards. It needs the new board sizes before the binder's template arrives: board about 211 × 286 mm (3 mm overhang top, bottom and fore-edge), and the spine width from the final extent and stock. At 184 pp on Munken Pure 150 gsm (bulk 1.13, about 0.17 mm a leaf, 92 leaves) the text block is about 16 mm, plus board allowance for the spine. The binder should confirm.

## Physical proofs (brief section 10)

Print on the specified uncoated stock: chapter opener (p. 67, chapter 05), a dense essay spread (pp. 69–70), a data spread (pp. 19–20), and a photographic page (an opener verso). These are for the type size at 9.25 pt, the chart label floor at 7 pt and the marine on uncoated stock. They need a person and the printer.

## Build notes

- The press build now refuses to print if anything lays out wider than the type area (the fault behind the 70 per cent proofs).
- Next.js font downloads fail occasionally; the build retries three times.
- An intermediate pass sometimes reads its own PDF before Chrome has finished writing it, and poppler logs syntax errors. The final files are unaffected (checked: zero errors on all four).
