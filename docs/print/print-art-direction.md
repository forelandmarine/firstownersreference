# The First Owner's Reference in print

Art direction, layout rules and production strategy for the 1st Edition. Written 10 September 2026 against the 8 August proof.

Read with `docs/print/layout-registers.pdf`, which draws every page architecture described here. This document supersedes `docs/print-designer-brief.md`, which was written for an InDesign handoff that is no longer happening; the deltas it listed as designer work are now either closed in the build or restated below as editorial and production tasks.

---

## 1. What the comparison set actually looks like

Five titles, all measured from files in hand rather than described. Page counts and word counts are counted page by page; trims are taken from the PDF page geometry or the publisher's own ad specification.

| | Trim | Pages | Relief pages | Median words per text page | Heaviest page | Where relief comes from |
|---|---|---|---|---|---|---|
| The First Owner's Reference, Aug proof | 230 × 300 mm | 120 | 15 (12%) | 551 | 1,276 | Chapter openers |
| The Superyacht Report 222 | 210 × 265 mm | 120 | 30 (25%) | 446 | 879 | Full-page advertising |
| Knight Frank, The Wealth Report 2025 | 215 × 275 mm | 88 | 10 (11%) | 427 | 1,025 | Number pages, section openers |
| BOAT International, Global Order Book 2026 | 230 × 290 mm | 8 (extract) | 1 | 1,100 | 1,656 | Boxed panels, stat strips, full-bleed openers |
| Portfolio by Savills, Volume 9 | ≈ 220 × 295 mm | 172 | high | low | — | Image scale, white space, drawn material, typographic dividers |

A relief page is one carrying fewer than 45 words: an opener, a full-bleed image, a closing device, an advertisement.

**The Reference is not set too small or too tight.** Per square millimetre of page, the Reference, The Superyacht Report and the Wealth Report all sit at roughly eight words per thousand square millimetres. The type system is competitive with the trade set as it stands.

**The Reference has no rhythm.** Between the chapter 05 opener and the chapter 06 opener a reader crosses fourteen consecutive pages with no relief of any kind. Between 06 and 07 it is sixteen. Between the last chapter close and the colophon it is eighteen. No book in the comparison set asks that of a reader, and the two that avoid it most comfortably avoid it by selling advertising.

The publication has ruled out advertising permanently and that decision is the whole editorial wedge, so it is not up for revision. What follows from it is that every pause in the book has to be manufactured editorially. That is the central design problem of the 1st Edition and everything below is downstream of it.

**Density is not the fault, and the BOAT material proves it.** The Global Order Book feature is BOAT International's data journalism, set at 230 × 290 mm, ten millimetres shorter than the Reference and otherwise directly comparable. It runs a median of 1,100 words per page and peaks at 1,656, which is double the Reference's median and a third above its worst page. It is entirely readable, because every element on those pages is boxed, headed and hierarchied: panel heads in small caps on a rule, reversed callout boxes, sidebars with their own internal columns, tables with ruled heads, figures with captions and source lines.

The Reference's 1,276-word page fails where BOAT's 1,656-word page succeeds, and the difference is not word count. It is that the Reference's heavy pages are two columns of undifferentiated justified text with nothing on them a reader can navigate by. That changes the rule, and the change is set out at 3.4.

## 2. Which shelf the book is competing on

The comparison set splits cleanly.

BOAT International, Robb Report and Portfolio by Savills are advertising-funded lifestyle titles. Their relief is bought, their photography is commissioned at a budget the Reference will not match in its first edition, and their register is aspirational. Competing with them photographically is not winnable and not worth attempting.

One qualification, and it matters. BOAT International's Global Order Book feature is not lifestyle work. It is dense, structured data journalism in the same trim as the Reference, and it is the single best worked example available of how to build a page that carries a great deal of evidence without exhausting the reader. Take the mechanics of those pages, at 3.11, and leave the colour, the photography budget and the register alone.

The Superyacht Report and the Knight Frank Wealth Report are analytical. Their authority comes from data presentation, sourcing and structure. The Wealth Report in particular is the closest working model: a research publication that is also a designed object, no advertising, an annual, distributed to a curated list rather than sold on a newsstand, and cited by people who never read it cover to cover.

So the target is the Wealth Report's editorial register in a book's physical form. Analytical inside, casebound outside. Not a yacht magazine with more integrity, but a reference annual that happens to be about yachts.

That has a practical consequence for pictures. The Reference should stop competing on photography and start competing on *drawn* material: charts, tables, comparison matrices, number pages, diagrams of deal structures and yard geography. The yacht press is entirely photographic. Nobody in it publishes a good diagram. That is an unoccupied position and it is also cheaper, more defensible and more citable than photography the publication cannot afford to commission.

## 3. Visual rules

### 3.1 The grid holds

Trim 230 × 300 mm. Sheet 236 × 306 with 3 mm bleed. Head 22, foot 22, outer 18, inner 22. Two columns of 80.5 mm on a 9 mm gutter. Baseline 13 pt, twenty lines to the column. None of this changes.

### 3.2 The page is the unit, the spread is the composition

The proof composes page by page and it shows: facing pages routinely carry two images of the same size, or two pull quotes, or a chart on one side and nothing on the other. From here, every chapter is designed as a sequence of spreads. Facing pages never carry the same device twice.

### 3.3 Nothing spans the columns

Chrome balances rather than fills a fragmented multicol, so any element spanning both columns strands a short balanced row above it. Crossheads, pull quotes, images, notes and case furniture are all column measure. Only the drop-cap intro at the top of the flow spans. This is a technical constraint of the build, not a preference, and it is the reason the August galley pass took eight pages out of the block.

### 3.4 The page ceilings, revised

The first draft of this document set a hard ceiling of 850 words. The BOAT comparison shows that ceiling is measuring the wrong thing. The rule is structural instead:

- No page above 850 words unless it carries at least two structural elements: a panel, a boxed sidebar, a statistic strip, or a figure with a head on a rule. Twenty pages are currently over 850 and none of them carry anything.
- No more than four consecutive full-text pages anywhere in the block.
- One furniture item per page, two per spread, on ordinary text pages.
- One pull quote per spread. Folio 29 of the proof carries three.

### 3.5 Images work at four scales, not two

The proof has full-bleed and column-width and nothing else, which is why the supporting pictures read as drop-ins. The four scales are: full bleed, gutter-crossing spread, half-bleed to the outer trim, and column-contained at either a third or two-thirds of page height. Every chapter uses at least three of the four.

### 3.6 Captions carry findings

Present captions describe. "Figure 01.01: annual operating cost as a percentage of capex, by size band" tells a reader nothing the chart has not already told them. The caption should state what the figure proves: *the working range is 8 to 20 per cent, and every practitioner source lands inside it.* Same for photographs. A caption is the second most-read thing on a page after the headline and the publication is currently wasting all of them.

### 3.7 Charts get promoted, tables get demoted

Across the nine data spreads there are 32 tables and 14 charts. That ratio is backwards for a printed annual. A table is a lookup device and nobody looks anything up in a printed book; they are shown a shape. Convert until the two are near parity.

Charts print at full type measure and at least 40 per cent of page height. Figure 01.03 in the proof occupies 22 per cent of its page and leaves 45 per cent of that page empty below it. Axis and series labels currently set at around 5 pt; the floor is 7 pt.

Tables keep a 0.5 mm marine rule under the head row and hairlines at head and foot, nothing else. No vertical rules, no zebra striping. Tabular oldstyle figures, decimal aligned, ranges on en-dashes.

One form per dataset. Where a table is followed by a chart of the same numbers, the build drops the table; that rule exists and should be enforced harder.

### 3.8 Colour does not grow

Marine `#0f3b5c`, sail `#4a7da9`, charcoal `#1a1a1a`, stone `#7a756d`, paper `#f5f2ec`, rule `#c8c2b4`. One addition only: marine at 8 per cent as a panel ground for editor's notes and number panels. No per-chapter colour, no second accent, no tinted photographs.

### 3.9 Typographic house rules

En-dashes for ranges, closed up: `20–24 m`, not `20 to 24 m`. This is the single most visible remaining tell that the book was set from web copy, and it runs throughout. Em-dashes never, anywhere, captions included. Oldstyle figures in running text, tabular oldstyle in tables and charts. Yacht names italic. Oxford hyphenation with the exception list for yards, contributors and citations. Widows and orphans at three lines, subheads keep-with-next.

### 3.11 Everything on a heavy page is boxed and headed

This is the lesson of the Global Order Book pages and it is the one rule in this document taken wholesale from a competitor.

Every element on a BOAT data page announces itself: a panel head set in small caps on a rule above the panel, a boxed sidebar with its own internal columns and its own head, a reversed callout in condensed caps, a table with a ruled head row, a figure with a caption and a source line beneath. A reader scanning the page can enter it at any of eight points. The Reference's data pages float two or three elements in a lot of empty paper and its heavy text pages offer no entry point at all.

So, on any page carrying more than 850 words or more than one dataset:

- Panel and figure heads set in Geist Mono 7 pt, letterspaced, on a 0.4 pt rule, in stone.
- Sidebars sit in a marine 8 per cent panel with 4 mm internal padding, set at column measure.
- Every figure carries a caption below and a source line below that.
- No element sits on the page without a head, a caption or a rule tying it to the grid.

### 3.10 Kill anything that is decorative and wrong

The coordinates line on each chapter opener is a borrowed device and three of the nine are wrong: Portsmouth coordinates under a La Ciotat photograph, Barcelona under Hamburg, Dutch farmland under chapter 05. Either every one is verified against its actual photograph or the line comes out. In a publication whose entire claim is evidentiary accuracy, a decorative coordinate that does not resolve is worse than no coordinate.

## 4. The sixteen layout registers

Drawn in `docs/print/layout-registers.pdf`. Every page in the book is one of these and nothing else.

**A, body.** A1 two-column text spread. A2 text page with column furniture. A3 tall figure. A4 half-bleed.

**B, relief.** B1 full-bleed image page. B2 gutter-crossing image spread. B3 number page. B4 quiet page. B5 chapter close. B6 statistic strip. B7 typographic divider.

**C, data.** C1 full-measure figure. C2 table page.

**D, set pieces.** D1 chapter opener spread. D2 case study. D3 guest Q&A. D4 checklist and back matter.

Four of these are new and they carry most of the work.

**B3, the number page.** Three to five figures set in Newsreader 300 at 96 to 120 pt in marine, each with an italic gloss of no more than fifteen words, on a page shared with a photograph or a short text column. This is the device the Wealth Report leans on hardest and the Reference does not use at all. It is the cheapest relief available in publishing: no photograph, no permission, no commission, only a fact the publication already owns and has already sourced. Nine of these, one per chapter, is nine pages of rhythm at zero acquisition cost.

**B4, the quiet page.** One sentence on an otherwise empty page, attributed, with the chapter numeral watermarked at seven per cent. Four or five in the book, placed where a chapter turns rather than where it ends, because B5 already handles the ending.

**B6, the statistic strip.** A horizontal band at the foot of an otherwise ordinary text page carrying three figures in large type on a marine ground, each with a six-word gloss. BOAT runs two of these inside eight pages and they are the most efficient device in the whole comparison set: they cost a fifth of a page and they break a text page without needing a picture, a permission or a page of their own. Where a chapter cannot afford a full B3 number page, it takes a B6 instead.

**B7, the typographic divider.** A full page of type alone on a tinted ground announcing a section: no image, no body copy, one line set very large. Portfolio by Savills uses one at the hinge between its editorial half and its property catalogue, and a further one at the head of each regional section inside the catalogue. This is what makes back matter feel designed rather than dumped, and the Reference's back matter needs exactly that: a divider each for *Questions to ask*, the glossary, the sources and the index.

The three chapters with no confirmed contributor take a B3 in place of the D3 Q&A. That solves an editorial embarrassment with a design device rather than with a placeholder.

## 5. Chapter architecture

Sixteen pages, one signature, the same shape every time, so that a reader learns the shape by chapter two and can navigate without the contents page.

| Folio | Register | Content |
|---|---|---|
| 1 verso | D1 | Full-bleed opener, numeral reversed |
| 2 recto | D1 | Title, standfirst, reading time, contributor credit |
| 3–6 | A1, A2 | Lead essay, first movement; tall figure on 4, pull on 6 |
| 7 | B3 | Number page |
| 8–9 | A4 or B2 | Half-bleed, or the chapter's one gutter-crossing picture |
| 10–11 | A1, A2 | Lead essay, second movement |
| 12–13 | C1, C2 | Data spread: chart verso, table recto |
| 14 | D3 | Guest opinion, or B3 where no contributor is confirmed |
| 15 | D2 | Case study |
| 16 | B5 | Chapter close |

Chapter 09 is a decision framework rather than an argument with evidence; it takes no case and no data spread and runs eight pages. Chapters 05 and 07 are the two longest in the manuscript and take twenty to twenty-four, which buys a second data spread and a second number page rather than longer runs of text.

The checklists move out of the chapters and gather into a single back-matter section, *Questions to ask*. On the web they belong in the chapter, because a reader arrives at one chapter from search. In the book they belong together, because a reader who has finished the book wants the apparatus in one place, and because a section of checklists is the part of the object that gets used rather than read. Design them to be photographed and sent to a lawyer: one column at 60 per cent measure, numbered in marine, 18 pt leading, ranged left, two lines maximum per item.

**Extent.** The registers add roughly 24 pages and take the block from 120 to 144: eighteen signatures of eight, or nine of sixteen. That also fixes the object. At 120 pages on 120 gsm the spine is about 11 mm, which is thin for a casebound annual at 230 × 300. At 144 pages on 150 gsm it is closer to 17 mm, which reads as a book. The pages the design needs and the pages the object needs are the same pages.

## 6. Web to print

The studio editor decision holds: web paragraph order is canonical, print adjusts layout only. Print never re-orders an argument. What follows is the mapping.

### 6.1 What carries across unchanged

Lead essays, cases, guest opinions, data spread blocks, glossary, sources, checklists. All of it comes from the same JSON in `content/`. Print is a different rendering of one manuscript, not a second manuscript, and that is the discipline that makes an annual edition sustainable.

### 6.2 What changes shape

| Web | Print | Rule |
|---|---|---|
| Single column, one measure, long scroll | Two columns, 80.5 mm, justified | Print measure is set by the grid, not by the source |
| Chart as responsive SVG with frame header and footer | Titled figure, header and footer suppressed, caption below | `print.css` already hides ChartFrame furniture; never re-hide the figure title |
| Table with sticky head, horizontal scroll | Table at full type measure, or dropped where a chart of the same data follows | One form per dataset |
| Checklist inside the chapter | Gathered into back-matter *Questions to ask* | Web serves arrival from search, print serves the finished reader |
| Case study on its own route | D2 spread inside the chapter | The case is the argument's proof and belongs beside it in a linear read |
| Glossary autolinks inline | Plain text, term listed in the back-matter glossary | No link furniture in print |
| "Read next" navigation | The Read next line on the B5 chapter close | Same content, different job |
| Contributor card with LinkedIn | Portrait plus byline on the D3 opener | No URLs in body copy |

### 6.3 What is web-only

The running-cost calculator, search, share, the studio editor, quarterly digital supplements, and every live market figure that will be wrong within six months.

### 6.4 What is print-only, and why anyone should want the object

This matters more than it looks. If the book is the web edition on paper then the print run is a marketing cost with no reason to exist. Four things should exist only in print:

1. **The hand-numbered plate.** Copy *n* of 500, signed by the editors. Already planned; it should be a designed page, not a line in the colophon.
2. **The physical apparatus.** *Questions to ask* as a gathered, indexed, photographable section.
3. **A print-only opening essay from the editors** that does not appear on the web, dated, on the state of the market at the moment of going to press. It is what makes the object an edition rather than a snapshot.
4. **The picture edit.** The web carries hero images per chapter. The book carries a sequence, and a sequence is a thing a website structurally cannot do.

### 6.5 The perishability problem

An annual printed in Q4 2026 carries market numbers that will be stale by Q2 2027. Every data spread should carry a short live URL at the foot, in Geist Mono, in the form `firstownersreference.com/01/data`, pointing at the maintained version of that spread. The print figure is the position at going to press; the web figure is current. Saying so on the page turns the book's one structural weakness into a demonstration of the publication's discipline, and it drives print readers to the site, which is where the citation and AEO value accrues.

No QR codes. They date a page instantly and the audience does not need them.

## 7. Production

| | |
|---|---|
| Extent | 144 pp, eighteen signatures of eight |
| Text stock | Munken Pure 150 gsm, uncoated, cream |
| Endpapers | Colorplan 135 gsm, marine |
| Case | Colorplan over 3 mm board, foil-stamped wordmark, blind-debossed lighthouse |
| Spine | ≈ 17 mm at 144 pp on 150 gsm; confirm with the binder before the case artwork is final |
| Colour | 4/4 CMYK, ISO Coated v2 or the printer's own profile |
| Cover spot | PMS 5395 C, foil only |
| Ribbon | Marine |
| Run | 500, hand numbered |

**Image resolution is the binding constraint.** Masters currently resize to 2,700 px on the long edge. At the 236 mm bleed width that is 291 dpi, which is acceptable on a single page and not acceptable anywhere else. A gutter-crossing spread needs 5,600 px and the cover needs the same across the full case. Every full-bleed and every spread image has to be re-sourced at higher resolution or commissioned.

**Stock photography is the weakest link against the comparison set.** The library is 195 Unsplash files and 66 are in use. It is competent and it is not distinctive, and a reader who reads BOAT International will recognise the register instantly. Three routes, in order of cost:

1. Commission Fraser Edwards for the cover, the frontispiece, the closing image and three chapter openers. Six commissioned images set the perceived register of the whole book.
2. Draw the rest. Deal-structure diagrams, yard geography, the flag-state comparison, the refit timeline. Nobody in the yacht press does this and it is the visual language the publication should own.
3. Keep stock only where it is genuinely documentary and caption it honestly.

**Colour proofing.** Marine `#0f3b5c` will shift visibly into Fogra39. Soft-proof every spread and check the chapter numerals and the chart series against a wet proof before the run, not after.

## 8. Sequence of work

**Blockers, editorial.** The A and B lists in `docs/proof-corrections-1st-edition.md` are unchanged and nothing ships until they clear. A1, A2, A4 and the index decision are still open; the six legal items are still with counsel.

**Then, in order:**

1. **Copy-fit pass.** Break the twenty pages over 850 words. This is editorial work, not layout work, and it is the prerequisite for everything else. It also delivers the 20 to 30 per cent copy reduction already on the roadmap.
2. **En-dash pass.** Ranges throughout, in `content/` not in `print.css`, so the web gets it too.
3. **Build B3 and B4** as print components, plus the nine number sets from evidence already in the manuscript.
4. **Chart promotion.** Convert the tables that should be charts, raise every chart to the size and label floors, rewrite every figure caption to carry its finding.
5. **Move the checklists** to back matter in the print route only.
6. **Picture edit.** Commission the six, draw the diagrams, re-source or cut every image that cannot supply 2,800 px.
7. **Index decision.** Commission a real one or cut it. The auto-index cannot print.
8. **Printer selection.** Stock dummies from Park, Pureprint and Generation Press at 144 pp on 150 gsm, with their ICC profiles, before the CMYK master is rebuilt.
9. **Rebuild, wet proof, run.**

**Do not, at any point,** reintroduce paged.js, wrap a chapter opener inside the chapter-scope div, or touch the sources section. The last of these sits on a Chrome print-layout tipping point that has three times reflowed the block from 120 to 217 pages. Check the block page count after every build; anything far above 120 means either that or a silent font-download failure.

## 8a. What changed on 10 September, and why

The reference set Jack named (Portfolio by Savills v9, Forbes Peru, The Superyacht Report 218, Moravia Charter Annual, IYC Horizons 14) is five three-column magazines. The August proof was a two-column, single-serif book. Measured the same way, on the share of pages that are full image, picture-led, balanced and text-led:

| | full img | pic-led | balanced | text-led |
|---|---|---|---|---|
| Savills Portfolio v9 | 9% | 33% | 53% | 5% |
| Forbes Peru | 26% | 13% | 42% | 19% |
| TSR 218 | 31% | 13% | 30% | 27% |
| Moravia | 23% | 23% | 49% | 4% |
| IYC Horizons 14 | 13% | 54% | 29% | 4% |
| TFOR, August proof | 8% | 0% | 21% | 71% |

Jack approved the three-column move and lifted the photography constraint on 10 September, with stock as the drafting stand-in. The following is now built.

**Grid.** Three columns of 59.3 mm on a 190 mm type area, 6 mm gutters carrying a 0.3 pt hairline rule. Outer margin 16 mm against 24 mm inner, mirrored, as in every title in the set. Body Newsreader 9.25 / 12.75 pt, about 36 characters, the measure Forbes and TSR both run. Drop cap three lines.

**Type.** DM Sans becomes the furniture face: captions, panel copy, table heads, source lines, note panels. Newsreader keeps display and body. DM Mono is retained only for the small letterspaced markers and folios, which stay as the publication's signature.

**Section chip.** A 9 mm marine square carrying a glyph, with a two-line label alongside, opening each editorial section. Taken from TSR 218, where it is the device that lets a reader place any page at a glance.

**Pictures.** The supporting pool went from 4 per chapter to 22, drawn from the stock library by `scripts/expand-print-images.mjs`. Column figures now cycle through four silhouettes at half, portrait and landscape proportions, on a cadence computed from each essay's own length rather than a fixed interval. Cases and guest Q&As, previously the largest block of unbroken text in the book, now carry the same cadence from the back of the chapter pool.

**Plates.** Two full-page bleed plates per chapter, eighteen in all, printed standalone from `/print-opener/plate-<slug>-<n>` and merged over a flow placeholder. This is the same proven mechanism as the chapter openers, and it exists because Chrome fragments a mid-document full-page box against the root master and paints a seam.

**Extent.** 122 pp to 146 pp, press block 152.

**Where it stands.** Full-page images moved from 8 to 18 per cent, which is inside the range of the set. Text-led pages have barely moved, from 71 to 66 per cent, against a set that runs 4 to 27. The essay pages are now right; the remaining text-led pages are the data spreads, the checklists and the back matter, none of which carry a picture at all. That is the next block of work, and it is the difference between a better-organised version of the old book and a book that competes on the shelf.

## 9. The reference set

What was examined, so that a later edition can check the working rather than take it on trust. Copies of everything below are in the session working directory; the two that matter most should be kept in the repo or on iCloud.

**Measured in full, page by page**

- *The Superyacht Report* 222, Monaco Yacht Show edition, September 2024. 120 pp, 210 × 265 mm, InDesign 19. Counted for relief pages and word density. Referenced for the portrait cut-in with a full-depth serif pull quote, and for chart sizing.
- *The Wealth Report 2025*, Knight Frank, 19th edition. 88 pp, 215 × 275 mm, InDesign 20.1. The main structural reference. Specific pages: p40 "Keeping it real" is the source for the B3 number page; p26 "Digital nomad detox" for restarting a section mid-page; p56 "PIRI 100" for the half-bleed; its foot furniture throughout.
- *Global Order Book 2026*, BOAT International, January 2026 issue extract. 8 pp, 230 × 290 mm, InDesign 20.5, published on the BOAT CDN. The source for rule 3.11 and for the B6 statistic strip. Median 1,100 words per page against the Reference's 551.
- *The First Owner's Reference*, 8 August 2026 proof. 121 pp with cover, 230 × 300 mm.

**Examined by contact sheet and sampled spreads**

- *Portfolio by Savills*, Volumes 8 and 9, designed by Uncommonly. 172 pp each, aspect 1:1.34, so roughly 220 × 295 mm. **Volume 9, published 1 September 2026, is the current edition and the one to work from.** Structurally both are a 70-page magazine bolted to a 95-page property catalogue, hinged on a full-page typographic divider and sub-divided by region inside the catalogue. Advertising is negligible: two display advertisers across 172 pages. Referenced for the B7 divider, for image scale and asymmetry, for the serif body against grotesque display pairing, and for the two devices below.

  - **p40, "London decoded".** A scanned period map tinted in the house accent, carrying cut-out photographs in circular frames with italic glosses, and a boxed label panel keyed to the region. Drawn material doing the work of a photograph, in a title that can plainly afford photography. This is the strongest single argument for section 2's position, and the direct analogue for the Reference is an annotated map: refit yard geography, Mediterranean berth capacity, or the shape of a new-build contract chain.
  - **p56, the city panels.** Square images with the place name overprinted in large display type, cropped and hyphenated to fit the square, a short finding beneath in the accent colour, then a rule. Modular, repeatable, and interleaved with running text rather than given a page. A more flexible relative of the B6 statistic strip, and the right form for the Reference's yard and flag-state comparisons.

**Publisher specifications, not design references**

- BOAT International UK ad specification: trim 230 × 290 mm, type area 210 × 270, 3 mm bleed, 6 mm gutter allowance, perfect bound, PDF/X-1a:2001, text to ISO Coated v2 300% (ECI) FOGRA39L, covers to PSO Uncoated FOGRA47L. The Reference should adopt the same colour profiles unless its printer specifies otherwise; they are what the trade actually prints to.
- BOAT International US ad specification: trim 205 × 275 mm, type area 195 × 255.
- BOAT International US media kit 2026, for audience composition.

**Deliberately not used**

- The Foreland document design system v2.1. Canonical for Foreland client documents and it should not govern the Reference, because separating the publication's identity from the Foreland brand is already on the roadmap.
- Robb Report. Studio Last's German redesign is published as a project with no design detail, and no examinable copy was available. Left out of the comparison rather than asserted.
- Any photographic register from the yacht press, per section 2.

**Still worth acquiring**

A physical copy of *Portfolio by Savills* and one recent *BOAT International*. Screen renders understate stock, ink weight and the behaviour of an uncoated sheet, and those are the three things the printer conversation turns on.

---

*Generated artefacts: `docs/print/layout-registers.pdf` via `node scripts/build-layout-registers.mjs`. Proof set and design notes in `print/1st-edition` and `print/notes`.*
