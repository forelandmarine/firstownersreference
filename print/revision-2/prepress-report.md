# Prepress report, second layout revision

State of the press files on 14 November 2026 and what remains before the book can go to a printer. Files: `print/1st-edition/` (proof, proof-CMYK, press-block, press-block-CMYK). All four parse without errors.

## Format

| Item | Now | To confirm with printer and binder |
|---|---|---|
| Trim | 208 × 280 mm portrait | Confirm the sheet and imposition for this trim |
| Bleed | 3 mm all edges; TrimBox, BleedBox and ArtBox stamped on every page | Some printers ask for 5 mm on casebound work |
| Type area | 172 × 238 mm; head 20, foot 22, inner 22, outer 14 mm (trim) | Gutter loss for Smyth-sewn casebinding at 184 pp is normally 3–5 mm. 22 mm inner is safe; the binder should confirm |
| Safe area | Nothing but full-bleed pictures within 6 mm of the trim | Confirm |
| Extent | 180-page block; press block padded to 184 with four blank pages (23 sections of eight) | Signature size (8, 16 or 32) decides the padding. At 16-page sections the block would pad to 192 |
| Blank pages | Six blank pages inserted so every chapter opener falls on a left-hand page (before ch02, ch03, ch05, ch06, ch08 and ch09) | Confirm blank pages carry no folio or running head |

## Press file (added 14 November 2026)

The build now makes the printer's file itself: `print/1st-edition/firstownersreference-1st-edition-press-block-PDFX4.pdf`, via `scripts/press/` (adapted from Littlpinguin/marketing-cockpit-template, MIT).

1. **Exact mount** at 214 × 286 mm with TrimBox 208 × 280 and BleedBox. Chrome's paper is 214.12 × 286.09 mm but it paints only the 214 × 286 page box, so every full-bleed page had an unpainted 0.17 mm strip at the foot. The mount crops the painted area and scales it by about 1.0004 to the exact sheet.
2. **PDF/X-4** with output intent PSO Uncoated v3 (FOGRA52), CMYK on that profile, images lossless (Flate) and capped at 600 ppi.
3. **Text outlined.** This removes the Type 3 font subsets Chrome writes for variable fonts; the press file contains no fonts. Text checks run on the proof, which keeps live text.
4. **Black text in K only.** Body text (charcoal #1a1a1a) and neutral greys go to black ink of the same lightness through the paper profile; marine and sail stay four-colour.
5. **Prepress check** (`verify-press.py`) on every build. Result on this proof: **OK**. 184 pages, 214 × 286 mm, CMYK FOGRA52 PDF/X-4, TrimBox 208 × 280, total ink maximum 293 per cent (limit 300), text outlined, ten blank pages (opener spacers and end padding), bleed covered on every edge.

The check found two faults that the old pipeline could not see: the hairline at the foot of every full-bleed page, fixed in the mount, and a false "RGB left" from the inherited byte search, now replaced by a check of the actual colour spaces.

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

| Item | Now | Still needed |
|---|---|---|
| Profile | PSO Uncoated v3 (FOGRA52), the ECI standard for uncoated stock such as Munken Pure | Confirm with the printer; if they specify another, the build takes `ICC=` |
| Black text | K only (see above) | None |
| Total ink | 293 per cent maximum, checked against 300 | The printer's figure for the chosen stock |
| Overprint | Black text is K only, so knockouts under it are not a registration risk; no overprint set | Ask whether the printer wants black overprint set in the file or at the RIP |
| Gradients | Ghostscript rasterises the chapter-opener title gradients at 72 ppi. Smooth, so invisible, but a printer's preflight may flag it | Pre-render the gradient as an image if the printer objects |
| Marine #0f3b5c | Four-colour | Check on the wet proof |

## PDF standard

PDF/X-4 (transparency kept). Ask the printer to confirm X-4; if they require X-1a the conversion must flatten transparency, which Ghostscript does only by rasterising affected pages, so it should be avoided.

## Case and endpapers

The case artwork route (`/print-case`) still draws the 230 × 300 mm boards. It needs the new board sizes before the binder's template arrives: board about 211 × 286 mm (3 mm overhang top, bottom and fore-edge), and the spine width from the final extent and stock. At 184 pp on Munken Pure 150 gsm (bulk 1.13, about 0.17 mm a leaf, 92 leaves) the text block is about 16 mm, plus board allowance for the spine. The binder should confirm.

## Physical proofs (brief section 10)

Print on the specified uncoated stock: chapter opener (p. 61, chapter 05), a dense essay spread (pp. 63–64), a data spread (pp. 13–14), and a photographic page (an opener verso). These are for the type size at 9.25 pt, the chart label floor at 7 pt and the marine on uncoated stock. They need a person and the printer.

## Build notes

- The press build now refuses to print if anything lays out wider than the type area (the fault behind the 70 per cent proofs).
- Next.js font downloads fail occasionally; the build retries three times.
- An intermediate pass sometimes reads its own PDF before Chrome has finished writing it, and poppler logs syntax errors. The final files are unaffected (checked: zero errors on all four).
