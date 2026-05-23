# Brief for the September designer

The proof at `~/Desktop/firstownersreference-1st-edition-proof.pdf` is generated from a Next.js print route using Chrome's headless print path. It is a working object, not a press file. This brief documents the deltas between the proof and a press-ready file. The designer's job is to close those deltas in InDesign.

## What the proof gets right

- Editorial register, voice, and copy are locked.
- Trim (230 by 300 mm), grid (two-column, 9 mm gutter, 24 to 26 mm side margins), and type system are set.
- Type system: Newsreader 300/400 for body and display, Geist Mono for labels and table column heads, Geist for everything else.
- Colour palette: marine `#0f3b5c`, sail `#4a7da9`, charcoal `#1a1a1a`, soft `#4a4a4a`, stone `#7a756d`, paper `#f5f2ec`, rule `#c8c2b4`.
- All chapter content, data spreads, case studies, glossary, index, sources, and colophon are present and editorially locked.

## What the proof does not have, and what the designer must build

### 1. Running heads

Chrome's headless print does not support `string-set` or `content: string()`. The proof therefore uses static running heads (`1st Edition` on the verso top-left, `The First Owner's Reference` on the recto top-right). In InDesign, set chapter-aware running heads:

- Verso top-left: `Chapter NN · Chapter title`
- Recto top-right: `The First Owner's Reference · 1st Edition`

Both in Geist Mono 7pt at the left for the verso, Newsreader italic 8pt for the recto. Stone `#7a756d`. 8 mm from the trim.

### 2. Folios

Currently set in Newsreader oldstyle tabular figures at 9.5 pt. Position 8 mm from the trim, bottom outer corner. Suppress on the cover, frontispiece, title page, imprint, editor's letter, contents, contributors, chapter image openers, closing image, and the colophon. All other pages carry a folio.

### 3. Contents page folios

Currently shown as a placeholder `·` because the proof cannot compute final page numbers cleanly. Replace with the computed folio of the chapter opener on each row, set right-aligned in Newsreader oldstyle tabular figures, with a dot leader from the chapter title.

### 4. Bleed, crop marks, registration marks

The proof has no bleed and no marks. For press:

- 3 mm bleed on all four edges. Full-bleed images and the cover must extend 3 mm past trim.
- Crop marks at the four corners, 3 mm offset from trim.
- Registration crosses outside the trim area.
- Colour bar strip on the trim margin for press inspection.

### 5. CMYK conversion and ICC profile

The proof is RGB. Convert to CMYK using ISO Coated v2 (Fogra39) for sheet-fed offset. Soft-proof every spread. The marine `#0f3b5c` will shift visibly; supply a Pantone equivalent (PMS 5395 C or 539 C) for the cover wordmark and chapter numbers if treating as a spot colour.

### 6. Cover

The proof cover uses stock photography. Commission a cover photograph that does narrative work, not wallpaper (see `cover-photography-brief.md`). Cover construction:

- Wordmark in Newsreader 300 at 96 pt, paper colour, foil-stamped on the case.
- Strap in Newsreader 300 italic at 16 pt, paper colour, foil or blind.
- Edition mark in Geist Mono at 9 pt, top-left.
- Publisher line at bottom-left in Geist Mono at 8.5 pt.
- Case: Colorplan board, foil-stamped wordmark, blind-debossed lighthouse mark. Foil colour and board colour to be decided in consultation with the binder.
- Spine: foil-stamped wordmark plus edition mark on a clean spine. Spine width depends on final page count and stock thickness (Munken Pure 120 gsm, 100 sheets ≈ 14 to 15 mm).
- Ribbon marker: marine or stone, to be specified.

### 7. Image art-direction

The proof uses curated stock images. For the press edition:

- Commission cover photography (see brief).
- Commission three to four chapter opener images where stock is currently weak: ch 03 (industry), ch 05 (new build), ch 09 (decision framework). Ch 02 (La Ciotat gantry), ch 06 (Hamburg drydock), ch 08 (J-class under sail) are strong stock picks.
- Brief a picture editor to source supporting images for each chapter that do editorial work, not wallpaper.

### 8. Image layout variety

The proof uses two image registers: full-bleed (chapter openers, frontispiece, closing image) and column-contained (supporting images). Add at least two more registers:

- Half-bleed: image runs to the outer trim edge, text in the inner column. Use for chapter mid-points where the image bridges sections.
- Gutter-jumping spread: a single image crosses both pages of a verso-recto spread. Use for the most consequential chapter image, once per chapter at most.
- Quarter-page inset: small image set into a column with text wrapping around. Use sparingly for technical figures and product details.

### 9. Footnotes

Currently sources are consolidated in the back matter rather than at the foot of each chapter. The designer's pass should consider moving primary citations to page foot using InDesign's footnote feature, with the consolidated back-matter bibliography remaining for cross-reference.

### 10. Drop caps

Currently set via `::first-letter` in CSS. Press edition should set each drop cap as a separate text frame with optical kerning against the following text, hand-tuned for each chapter intro.

### 11. Index

The proof index is auto-generated from chapter section headings, glossary terms, and named entities. The press edition needs a professional indexer pass to add concept threading, cross-references (see-also), and term variants.

### 12. Acknowledgements

Currently a placeholder block in the colophon. Write in full once contributors are confirmed.

### 13. Tables and charts

Tables currently rendered in a stripped style for the proof. Press edition: redraw tables with finer rule weights, vertical separators where helpful, and proper tabular figure alignment. Charts currently rendered as inline SVG and may benefit from a designer pass for legibility at print size.

### 14. Hyphenation

The proof uses `hyphenate-limit-chars: 9 4 4` to avoid short-word breaks. InDesign should set its hyphenation dictionary to UK English (Oxford), with a no-break exception list for proper nouns:

- Yard names: Feadship, Lürssen, Royal Huisman, Vitters, Baltic, Heesen, Oceanco, Damen, Sanlorenzo, Azimut, Benetti, Wally, Camper & Nicholsons.
- Person names: all editorial board members, all named contributors, all named practitioners.
- Court citations: every case reference (e.g. `Winch Design Limited v Le Souef [2025] EWHC 120`).
- Currency strings: `EUR 80,000`, `USD 1.5 m`, `GBP 110,000`.
- Compound model names: `MARPOL Annex VI`, `MLC 2006`, `ISO 6954`, `STCW`, `ENG1`.

### 15. Page architecture and spread design

The proof treats each page as an independent unit. The press edition should design key moments as facing-page spreads, in particular:

- Chapter openers: image-verso, body-recto spread.
- Data spreads: span both pages of a verso-recto where content allows.
- Case studies: title block on verso, body running across both pages.

## What survives from the proof

- All editorial copy
- The data and tables
- The case study structure
- The independence test and the publisher disclosure
- The chapter close architecture (§ mark, Read next block, At a glance, pull quote, chapter number watermark)
- The glossary, index draft, sources, colophon

## Timeline

- June 2026: brief and engage the designer
- Mid-June 2026: picture editor commissioned, cover photography brief issued
- July 2026: contributors confirmed, copy locked, designer's first layout
- Early August 2026: designer's second layout, picture review
- Mid-August 2026: copy editor pass, indexer pass, designer's final
- Late August 2026: press file (CMYK, bleed, crop marks, packaged), printer's proof
- September 2026: print run of 500, hand-numbered, casebound, distributed
