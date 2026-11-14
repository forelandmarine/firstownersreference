# Layout implementation plan, 1st Edition (2027)

Written 14 November 2026. Puts `docs/print/layout-specification.md` into the current print build. Copy closes in mid-December 2026 and the book prints in January 2027, so the work is ordered to give the biggest improvements first and to keep the book buildable after every step.

## Where the draft stands

The last full proof is dated 14 September 2026: 199 pages including the cover, built before the November editorial passes. It does not reflect the current text.

What the proof shows against the specification:

- **Body grid.** Two text columns of 91.5 mm across the full 190 mm type area, with no side column (`--col-measure` in `app/print/print.css`).
- **Pictures.** These are placed by a counting heuristic in `ChapterBlock` (`app/print/page.tsx`, from about line 874): a tall figure after paragraph 3, then column-width figures at a computed step. Cases and Q&As reuse the chapter's supporting pool, so the same photograph appears several times in a chapter. For example, the chart-plotter picture appears twice on pp. 74–75 and the red-jacket deck crew four times in chapter 07. The explicit placement model (`{ anchor, variant }`, step 4 of `docs/studio-editor-plan.md`) has not been built; no content file carries an `anchor`.
- **Plates.** Four full-page plates per chapter are printed standalone from `/print-opener/plate-…` and merged over placeholders. This mechanism works and is kept.
- **Chapter ends.** Each chapter ends with a closer page (picture and pull quote) and an "at a glance / read next" page, both mostly empty. That is 18 thin pages across the book.
- **Openers.** Every chapter opener is identical, and the sections inside a chapter open with the same small heading treatment.
- **Section closers.** `SectionCloser` already fills the measured space at the end of each section, using heights in `lib/print-fit.json`. The closing card and the number boxes reuse that measurement.

The constraints in `print-art-direction.md` section 8 still apply. Do not reintroduce paged.js. Do not wrap the chapter opener in the chapter-scope div. Do not touch the sources section. Check the block page count and the embedded Newsreader after every build.

## Step 0. Baseline

Rebuild the proof from `main` as it stands (`pnpm build && node scripts/build-print.mjs`), then run `scripts/audit-layout.py` and `scripts/audit-headings.py` on it. Record the page count, the short-page count, stranded headings, picture repeats and the register mix in `print/notes/baseline-2026-11.md`. Every later step is measured against this.

Half a session.

## Step 1. Grid spike on chapter 01 (go or no-go)

The specification's two open technical questions are tested on one chapter, using `/print?chapter=01` and `scripts/print-flow.mjs`:

1. **The 34 + 72 + 72 mm grid.** Set the essay's multicol to 150 mm with the side column as an outer margin on chapter-scope pages, mirrored with `:left` and `:right`. Measure the page growth for chapter 01 and project it across the book.
2. **Head pictures.** Two ways to get a picture to the head of a page, tested side by side:
   - **A, new segment.** Each head picture starts a new multicol segment with a forced page break before it. The picture spans at the top of the segment, which is safe. The cost is that the previous segment ends short. That short end is the white space the magazine leaves, and it can carry a number box if the hole is big enough.
   - **B, measured anchor.** The picture spans in the middle of the flow with no forced break, and the two-pass build reads where it landed. If the balanced block above it is less than 40 mm deep, the build moves the anchor one paragraph later and prints again. This follows the magazine's Tallinn p.18 and Brussels p.28 pages: text at the head, picture below.

Output: four chapter-01 spreads rendered for Jack (grid on or off, A or B), with page counts.

**Decision for Jack** before step 5: which grid, and A or B. The September notes record that an earlier split into segments was taken out because it left part-empty pages, so this has to be seen on paper rather than argued.

One session.

## Step 2. One photograph, once

This step is independent of the grid and can start at once.

- Add a check to `scripts/build-print.mjs` that fails the build when a file appears twice anywhere in the book, or when two files match by perceptual hash (a dHash in PIL, the same method as the existing dedupe against `public/print-images`).
- Stop the case and Q&A sections drawing from the essay's pool (`supPool.slice(1, 3)` and the "back of the pool" cadence). Give each section its own allocation in `lib/print-images.ts`.
- Fix `updatePrintImagesManifest()`, which drops the `tall` and `cases` keys when it regenerates the manifest (step 6 of the studio plan). Otherwise the new allocation is lost on the next build.
- Allocation per chapter: one opener, two plates (down from four, specification section 7), two or three head pictures, one tall picture, one case picture and the contributor portrait. That is about eight a chapter and 75 in the book, against 195 files in the library. Fraser Edwards' commissions replace stock as they arrive.

One session.

## Step 3. Closing card

- Replace the closer page and the "at a glance" page with one `ChapterClose` card at the foot of the last text page (specification section 8). Reuse the `SectionCloser` measurement. When the hole is under 70 mm, the card starts a fresh page.
- The contents are already in the build: `sectionHeadings`, the case provenance line and the read-next data. They are set as three blocks with plain sentence-case headings, not a label column.
- Expected saving: about 18 pages.

One session.

## Step 4. Type

All in `app/print/print.css` (specification section 4):

- Set-piece titles: Newsreader 500, 44–60 pt.
- The spaced-capitals line goes under the title only.
- Standfirst in DM Sans 500, 11.5 / 16.
- Crossheads in DM Sans 700, 8 pt capitals. The `.keep-with-next` binding of heading to paragraph stays.
- Captions move to the side column; credits are turned along the picture edge.

Check the block page count after the change. Crossheads at 8 pt take less depth than the present 13 pt heads, so the count should fall slightly.

Half a session.

## Step 5. Placement model and registers

This is step 4 of the studio plan, carried out with the specification's registers.

- Pictures in `content/*.json` gain an optional print field `{ anchor, register }`, where `register` is one of `head-full`, `head-box`, `tall`, `plate` or `spread` (R2–R6). If a chapter has no placements, it falls back to the present heuristic, so the book builds throughout.
- `ChapterBlock`, the case section and the Q&A section render placements through one function. That replaces the three separate cadence blocks now in `page.tsx`.
- Add order checks to the build, reported per chapter in the notes file:
  - no more than three R1 pages in a row;
  - no two plates facing or back to back;
  - facing pages never carrying the same register, except R1 facing R1;
  - at most one picture on a text page.
- Write placements for all nine chapters. I draft them, and Jack adjusts in the studio pane (step 8).

Two sessions.

## Step 6. Set-piece openers

Specification section 6:

- **Chapter recto:** the standfirst at the head, the essay starting on the lower half of the page.
- **Data spread:** a marine verso with the key-figures table, printed standalone through `/print-opener/data-<slug>` and merged like the plates. The main chart sits on the recto at full measure. `content/data-spreads.json` gains a `printKeyRows` field marking the four to six rows.
- **Guest Q&A:** the portrait across the head, with the name as title.
- **Case:** a centred title, the line beneath, the standfirst and a framed picture.

The merge script (`scripts/merge-fullbleed.py`) and the folio markers need one new marker type for the data page.

Two sessions.

## Step 7. Number-led boxes

- **Content.** A `printBoxes` list per chapter in `content/sections.json`. I draft two or three per chapter from figures already in the chapter, each tied to the same source as the paragraph it draws on. The editors approve or cut them in the studio. No new facts and no new sources.
- **Component.** The R3 register: a picture over the side column and one text column, with the box in the other column, at the head of a page. With grid option A from step 1, a box can also fill the measured hole at the end of a segment.

One session for the component. Drafting the boxes is one session plus the editors' review.

## Step 8. Studio print pane

- Extend `app/studio/print-pane.tsx` so that clicking a picture lets the editor change its register, move its anchor or swap the image.
- Add number-box editing alongside the other print-only fields.
- The pane still shows the chapter printed through Chrome, and it says when folios and closers are stale.

One to two sessions.

## Step 9. Full build and review

- Run the full press build, both audits, the repeat check and the register-order report. Make contact sheets of every spread.
- Jack reviews the book by chapter in the studio pane. Corrections are made through placements and print-only fields, never by reordering text.
- Update `print-art-direction.md` (pointing sections 3.1, 3.5, 4, 5 and 8b to the specification), `docs/press-package.md` and the generated print notes, which still describe the August two-column book.

One session, plus Jack's review time.

## Sequence and timing

| Order | Step | Depends on | Sessions |
|---|---|---|---|
| 1 | 0 Baseline | none | 0.5 |
| 2 | 1 Grid spike | 0 | 1 |
| 3 | 2 No repeats | 0 | 1 |
| 4 | 3 Closing card | 0 | 1 |
| 5 | 4 Type | 1 (decision) | 0.5 |
| 6 | 5 Placements and registers | 1, 2 | 2 |
| 7 | 6 Openers | 5 | 2 |
| 8 | 7 Number boxes | 5 | 1 + review |
| 9 | 8 Studio pane | 5 | 1–2 |
| 10 | 9 Full build and review | all | 1 + review |

That is about eleven working sessions, which fits before the mid-December copy close if the step 1 decision comes back within a few days. Steps 2 and 3 do not wait for that decision and can run while Jack looks at the spike.

## Decisions needed from Jack

1. **Grid.** The 72 mm columns with a side column, or keep the 91.5 mm columns (specification section 10). Decide after seeing the step 1 spreads.
2. **Head pictures.** Option A (new segment, white space at the end of the previous one) or option B (measured anchor). Also decided after step 1.
3. **Standfirst in DM Sans.** This is the most visible change to the book's voice. The alternative is to keep Newsreader italic and take the sans only for crossheads.
4. **Number boxes.** Who signs off the figures: both editors, or Jack alone.
5. **Plates.** Down from four a chapter to two. This frees about 18 pages and around 18 photographs for head pictures.

## Risks

- **Extent.** If the grid and the head pictures together push the block past 208 pages, use the fallback in specification section 10. Step 1 measures this before anything else depends on it.
- **Print time.** The September notes record that span and break combinations once made a print run take 78 minutes. Step 1 times every variant, and any variant over ten minutes for the whole book is rejected.
- **Sources section.** Nothing in this plan touches it, but every build checks the page count, because the section has three times reflowed the book to 217 pages.
- **Photograph supply.** Eight distinct pictures per chapter is within the library, but only if the repeat check runs from step 2 onwards.
