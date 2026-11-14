# Layout specification, 1st Edition (2027)

Written 14 November 2026 from a page-by-page study of *fly GDN*, issue 01, October 2026, the in-flight magazine of Gdańsk airport (about 150 pp, near A4, Polish). Jack chose it as the model for layout and structure: varied, easy to read, light on the page, and good use of space. This specification turns what that magazine does into rules the build can carry out. The implementation plan is in `docs/print/layout-implementation-plan.md`.

This document governs page layout. `docs/print/print-art-direction.md` still governs the editorial position, colour, production and the technical constraints of the build, and its sections 3.3, 3.9 and 8 remain in force. Where the two disagree on layout, this document wins, and the specific overrides are listed in section 11.

Photographs of the magazine are on iCloud at `Foreland Group/Marketing Materials/TFOR print reference set/flyGDN 01-2026`. They are not in the repo because the repo is public.

---

## 1. What the magazine does

**Text never fills the page.** The grid is three columns, and body text normally takes two of them. The third column holds a picture, a caption, or nothing. Text blocks often start a third or halfway down the page and finish short of the foot. The white space is planned, and it is the main reason the pages feel light.

**One large picture per page, anchored to an edge.** Pictures sit at the head of the page or fill a full column at full height. They are never dropped into the middle of a column between two paragraphs, and the magazine never uses the same photograph twice.

**Openers rotate.** Five opener patterns are used in turn: a stacked title with a picture crossing the gutter; a centred title, subtitle and standfirst above a framed picture; a full-bleed double page with the title reversed out; a portrait first with the title below; and a solid-colour section divider carrying a table of key figures, faced by a map and a strip of thumbnails. No two consecutive articles open the same way.

**Short, number-led boxes break up long text.** A picture beside a large serif figure, a short line beneath it, then three or four lines of text: "150 € 1 balon", "3000 km szlaków", "210 000 lat". They sit at the head of a page next to a picture, never inside running text.

**Every article ends with the same box in the same place.** "Kierunki regularne" sits at the foot of the last page of each destination article and gives route, airport, distance and flight time. The reader knows the article has finished and where the practical detail is.

**Three typefaces, each with one job.** A high-contrast serif for titles and box heads. A geometric sans in widely spaced capitals for the line under each title. A light sans for body text, with a medium weight of the same face for the standfirst.

**Colour comes from the photographs.** The pages are black on white. The only large area of colour is the violet section divider.

## 2. What we do not take

- **The body text.** The magazine's body is a light sans at about 8 pt in grey, and it is hard to read under lamp light. The Reference keeps Newsreader for body text at its current size and weight.
- **Narrow justified columns.** The magazine's columns are about 55 mm and the text is heavily hyphenated. Our text columns stay wider (section 3).
- **Pictures across the gutter with the subject in the fold.** A picture may cross the gutter only when nothing important sits in the middle third.
- **Titles printed over busy parts of a picture.** A title may run over a picture only where the picture is plain sky, sea or shadow.
- **The playful question-and-answer device** ("Hogwart? Eiffel? Porto?" answered "Nie. / Nie ten. / Prawie."). It does not suit the Reference's register.
- **Capitals for titles.** The Reference keeps sentence case. The scale and weight carry the effect, not the case.
- **The rotated folio and running foot.** Chrome cannot rotate content in a page-margin box reliably, and the present folios work.

## 3. Grid

Trim 230 × 300 mm, 3 mm bleed, margins as now (head 22, foot 22, outer 18, inner 22), type area 190 mm wide.

**Body pages use a side column and two text columns.** From the outer edge of the type area: a 34 mm side column, a 6 mm gap, then two text columns of 72 mm on a 6 mm gutter (34 + 6 + 72 + 6 + 72 = 190 mm). The side column is on the outer side of each page, so it mirrors between verso and recto.

The side column takes captions, photo credits, the small number notes, and white space. Body text never enters it. Pictures at the head of a page may extend across it to the type area or bleed to the outer trim.

At Newsreader 9.5 / 13 pt, a 72 mm column gives about 45 characters a line. That is longer than the magazine's measure, close to Forbes and TSR 218, and shorter than the present 91.5 mm column, which runs to about 57. Text stays justified with hyphenation at the present limits.

**Set pieces use the full type area.** Openers, plates, data pages and the closing card use the full 190 mm and are composed individually.

**Extent.** The narrower text area costs space. Text pages carry about 21 per cent less copy, which on the present proof would add roughly 20–25 pages. Removing the two thin chapter-end pages (section 8) returns 18. The implementation plan measures the real figure on one chapter before anything is committed (plan step 1). If the block grows beyond 208 pp, the fallback in section 10 applies.

## 4. Type

| Role | Face | Size / leading | Setting |
|---|---|---|---|
| Set-piece title | Newsreader 500, display | 44–60 pt / 0.95 | Sentence case, ranged left or centred by pattern |
| Line under the title | DM Sans 500 | 10 pt / 13 | Capitals, tracking 0.12 em. Only ever below a title, never above |
| Standfirst | DM Sans 500 | 11.5 / 16 pt | Ranged left, up to 70 words |
| Body | Newsreader 400 | 9.5 / 13 pt | Justified, hyphenated, as now |
| Crosshead | DM Sans 700 | 8 / 13 pt | Capitals, tracking 0.04 em, one line of space above |
| Box head | Newsreader 500 | 16 / 18 pt | Sentence case |
| Box figure | Newsreader 400 | 40–56 pt / 0.9 | Lining figures, marine |
| Box text | DM Sans 400 | 7.75 / 11 pt | Ranged left, up to 60 words |
| Pull quote | Newsreader 400 italic | 18 / 22 pt | One per spread at most, as now |
| Caption | DM Sans 400 | 7 / 9.5 pt | In the side column, ranged towards the picture |
| Photo credit | DM Sans 400 | 5.5 pt | Along the picture's outer edge, turned 90° |

The standfirst moves from Newsreader italic to DM Sans medium, and crossheads move from Newsreader 13 pt to small bold sans capitals. Those two changes give the page the magazine's second and third voices. Everything else in the type system stays as it is.

No labels above headings, anywhere. The spaced-capitals line belongs under a title and nowhere else.

## 5. Pictures

**One photograph appears once in the book.** The build fails if the same file, or a near-duplicate by perceptual hash, is placed twice. The present proof places the same pictures up to four times in a chapter (the chart-plotter photograph twice on pp. 74–75; the red-jacket deck crew four times in chapter 07).

**At most one picture on a text page, two on a spread.** The number-led box counts as a picture.

**Pictures are placed only in these positions** (the registers in section 7):

1. Across the head of a page, over the full type area, with the caption in the side column alongside.
2. At the head of a page across the side column and one text column, with text running in the other column.
3. A full column at full text height, tall and narrow (the magazine's town hall, church tower and clock tower).
4. A full page bled off three sides (a plate), facing a text page.
5. A double page, only where the middle third of the picture is clear.

A picture never starts partway down a column.

## 6. Set-piece openers

The chapter opener stays fixed so that readers learn the shape of a chapter. The four sections inside each chapter each have their own opener pattern, so a chapter passes through four different openings and the book never shows the same opener twice in a row.

| Section | Pattern | From the magazine |
|---|---|---|
| Chapter opener | Verso: full-bleed photograph with numeral and title, as now. Recto: standfirst at the head in DM Sans medium, the essay starting on the lower half of the page | Tallinn, Brussels |
| Data spread | Verso: marine full page with the chapter's key figures in a ruled table (four to six rows), title in Newsreader at display size, a two-line introduction. Recto: the main chart at full type measure | The violet "Południe" divider |
| Guest Q&A | The contributor portrait across the head of the first page, name as title beneath it, the standfirst below | Pomorskie |
| Case study | Centred title, spaced-capitals line beneath, standfirst, then a framed picture on the lower half of the page | Wilno, Amsterdam, Matera |

The marine data page uses the existing palette (marine `#0f3b5c` ground, paper type). It is printed standalone and merged, like the existing plates, because it is full-bleed.

## 7. Registers

Every page in the book is one of these. They replace the A–D list in `print-art-direction.md` section 4 for body and relief pages; the C and D data and set-piece registers carry over unchanged except as set out in section 6.

| Code | Register | Contents |
|---|---|---|
| R1 | Text page | Two text columns, side column empty or carrying a caption |
| R2 | Head picture, full | Picture across the head of the page (section 5, position 1), text below |
| R3 | Head picture and box | Picture over the side column and one text column, number-led box in the remaining column, text below |
| R4 | Tall picture | Full-height single-column picture, text in the other columns |
| R5 | Plate | Full-page picture, bled, facing a text page. A pull quote may be overprinted on plain sky or sea only |
| R6 | Double page | Picture across the spread, title or quote reversed out on a clear area |
| R7 | Chapter close | The closing card at the foot of the last text page (section 8) |

**Order inside a chapter.** No more than three R1 pages in a row. Facing pages never carry the same register, except R1 facing R1. No two plates face each other, and plates are never back to back (the September proof had 18 runs of two or three).

## 8. Number-led boxes and the closing card

**Number-led box.** A large figure in marine, a one-line head in Newsreader beneath it, and 30–60 words in DM Sans. It sits at the head of a page beside a picture (register R3), never in running text. Two to three per chapter, 18–27 in the book.

The figures come only from evidence already in the chapter: the data spread, the essay or the case. Each box carries the same source as the paragraph it draws on. Examples of the kind of figure meant: annual running cost as a share of build value; the share of five-year depreciation; months from contract to delivery; crew numbers at 40 m. The boxes are print-only content (section 9).

This replaces the B3 number page and the B6 statistic strip of the art-direction document. Both did the same job at a size that needed a page or a band of its own.

**The closing card.** Each chapter ends with one card, always in the same position: across the foot of the last text page, full type width, with a marine hairline above it. It replaces the present closer page (photograph and pull quote) and the "at a glance" page, which together take two mostly empty pages per chapter (pp. 40–41, 62–63, 80–81 and so on in the September proof).

The card holds three short blocks in plain sentence-case headings, set as text, not as a label column:

1. **In this chapter.** The chapter's sections as a short list with folios.
2. **Case provenance.** The present line about how the case was assembled.
3. **Read next.** The next chapter's number, title and one-line description.

Its height is measured to the space left on the last page, using the existing closer measurement. If less than 70 mm remains, the card takes the top of a fresh page and the rest of that page stays white, which is what the magazine does.

## 9. Content changes this needs

All of these are print-only and live in `content/`, so the web edition is untouched and paragraph order stays canonical.

- **Number boxes.** A new `printBoxes` list per chapter: figure, unit, head, text, source key, and the picture it pairs with.
- **Placements.** Each picture gets `{ anchor, register }`, where `anchor` is the paragraph it precedes. This is step 4 of `docs/studio-editor-plan.md` with the register list from section 7 in place of `wide | feature | tall | inset | halfbleed`.
- **Data-page tables.** The four to six key figures per chapter for the marine data page. Most already exist as rows in `content/data-spreads.json`; the field marks which rows.
- **Standfirsts.** Unchanged, but they will set larger in sans, so any over 70 words should be cut.

## 10. Fallback if the grid costs too many pages

If the measured extent goes beyond 208 pp, the text columns stay at the present 91.5 mm and the side column is dropped from R1 pages only. Everything else in this specification still applies: head pictures, register order, the no-repeat rule, the opener patterns, number-led boxes and the closing card. The side column is then used on R2–R4 pages only, where it holds the caption beside the head picture.

## 11. What this overrides in `print-art-direction.md`

| Section | Was | Now |
|---|---|---|
| 3.1 and 8a | Two columns of 80.5 mm, then three of 59.3, then two of 91.5 | Side column 34 mm plus two text columns of 72 mm (section 3), fallback in section 10 |
| 3.5 | Four image scales | Five fixed positions (section 5), one picture a page |
| 4 | Sixteen registers A1–D4 | R1–R7 for body and relief; C and D carry over |
| 4, B3 and B6 | Number page and statistic strip | Number-led box in R3 |
| 5 | Chapter-close page B5 | Closing card R7 at the foot of the last text page |
| 8b | Top-of-page placement not reproducible in Chrome | Reproduced by starting a new flow segment at each head picture (plan step 1) |

Section 3.3 still holds. Nothing spans the columns in the middle of a flow. Head pictures are not an exception, because each one starts a new segment and so sits at the top of a flow, which is the one place a spanning element does not strand a balanced row.
