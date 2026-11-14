# Change register, second layout revision

Against the design agent brief of 14 November 2026. "Before" pages are PDF pages of the 208-page proof the brief was written against (230 × 300 mm, commit c9d8191, cover = p. 1). "After" pages are PDF pages of the revised proof (208 × 280 mm, 183 pages with cover), `print/1st-edition/firstownersreference-1st-edition-proof.pdf`. Representative spreads are in `comparisons/`.

No copy, figure, chart value, table, reference or disclosure was changed in this pass. The last column says whether the change needs editorial approval.

## Format and extent

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| Whole book | Trim 230 × 300 mm in the brief; 208 × 280 mm confirmed by Jack on 14 November | Built at 208 × 280 mm, 3 mm bleed, type area 172 × 238 mm, inner margin 22 mm, outer 14 mm | Whole book | Decided |
| Whole book | Proofs from May to November printed at about 70 per cent: one unbreakable URL in the sources was wider than the page and Chrome shrank every page to fit | Sources cited by domain only; the build now refuses to print if anything is wider than the type area | Whole book | Decided |
| Whole book | 208 pp | 182-page block, 183 with cover, press block padded to 184 (23 sections of eight). Every page of content retained, including all data sections and the index | Whole book | None |

## Composition and rhythm (brief section 3)

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| All text pages | Paragraphs could not break across columns, so any paragraph longer than the space left jumped whole and left the foot of the column empty | Paragraphs flow across columns and pages, with two-line widows and orphans | All | None |
| All chapters | Four full-page photographs inside every chapter, which clumped into runs of two and three | None inside chapters; the nine chapter openers are unchanged | All | None |
| Essays | Small photographs dropped between paragraphs at a fixed cadence | One picture across both columns per essay, placed before a crosshead and sized by the build to the space left on its page | All essays | None |
| 25–26, 39–40, 67–68, 113–114 | A picture at the foot of each case jumped onto a page of its own and forced a blank page before the next opener | No picture after the case. The chapter card closes the chapter | 26, 38, 52, 66 | None |
| Chapter ends | Two mostly empty close pages per chapter (a picture page and an at-a-glance page) | One card at the foot of the case: sections in the chapter, about the cases, read next. The copy is unchanged | End of each chapter | None |
| 21–24 | Data pages each carried one chart and were otherwise empty | Charts held to 92 mm, method notes set in two columns under the chart, chart headings bound to their charts. Two charts now share a page where they fit | 19–22 | None |
| 23 | A four-row table split, leaving one row on the next page | Tables of eight rows or fewer are kept whole; longer tables break between rows with the head repeated | 21 | None |

## Typography (brief section 4)

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| All running text | Essays at 9.75 pt, interviews at 11.5 pt, cases at 12.5 pt (the cases had no size of their own and inherited the page default) | One body size for all running text: Newsreader 9.25 / 13.25 pt on an 82 mm column, about 48 characters | All | None |
| All running text | Loose justification and hyphen ladders in narrow columns | `text-wrap: pretty`, hyphenation no closer than three letters from either end of a seven-letter word, no more than two hyphens in a row, a small negative word-space allowance | All | None |
| All | Paragraph indents and spacing differed between essays, cases and interviews | 4 mm indent, no space between paragraphs, flush after a heading or pull quote, in every family | All | None |
| All | Crossheads in 19 pt serif with 18 pt above | DM Sans 8 pt bold capitals, a full line above and a third of a line below, kept with the next line | All | None |
| 26, 102 (case openers) | Case title sat on the marine rule; "The spec change in month / 18." | 9 mm of air under the rule on every case and interview; balanced title lines | 23, 89 | None |
| 26 | Case facts set as spaced capital labels over values | One centred run-in line, labels in bold | 23 and all cases | None |
| Interviews | Questions in the same face as the answers | Questions in DM Sans 9 pt semi-bold, marine; answers at body size | 75 and all interviews | None |
| Pull quotes | Different sizes in essays and cases | One treatment: Newsreader italic 15 / 19 pt, 1.5 pt rule | All | None |
| Captions and sources | Source lines in 6.8 pt italic capitals | 7 pt roman in sentence case; captions 7.5 pt | All | None |
| Throughout | Eyebrow labels above headings: "Chapter 05", "Guest opinion", "Note", "Table 01.02", "Figure 01.01", "A — Reference" and others | Removed. Where the label was the page's real name it became the heading (Contents, Contributors) | All | Decided |

## Data visualisation (brief section 5)

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| 21 | Spread title and the chart title printed one above the other, word for word | Where a chart's title or standfirst repeats the spread title, the spread standfirst or the crosshead above it, the chart's copy is suppressed in print. The text still prints once | 19 | None |
| 22 | Crosshead "Where the money goes, on a typical 50 m" and chart title "Where the money goes on a typical 50 m" | Same rule, comparing words and ignoring punctuation | 19 | None |
| All charts | Axis and value labels as small as 6.4 pt (10 units on a 760-unit chart printed at 172 mm) | Labels below 11 units raised to 11 (7 pt) in print. The web charts are unchanged | All | None |
| 23 | Legend, notes and source in one long italic block under the depreciation chart | Notes and source in two columns under the chart, source in roman | 21 | None |
| All | Tailwind spacing from the web frame (6 mm between title, chart and notes) | 3 mm in print | All | None |

## Chapter architecture (brief section 6)

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| 44 | Chapter 03 opened out of sequence with the other chapters | Every opener now falls on a left-hand page with the essay opening on the facing right-hand page; the build verifies parity and inserts a blank page where needed (four in the book: before ch01, ch02, ch05 and ch07) | 15, 27, 39, 53, 67, 93, 113, 137, 153 | None |
| Openers | "Chapter 05" label above the 05 numeral | Removed; numeral, title and standfirst unchanged | All openers | Decided |
| Build | Page numbering never settled: picture fitting and opener spacers kept moving each other | Pictures are fitted on the first three passes and then held; the page map now settles at pass 4 | — | None |

## Front matter and navigation (brief section 9)

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| 10 | "Contents" label over the heading "Nine chapters." | Heading is "Contents"; "Nine chapters." follows as a subtitle | 10 | Decided |
| 12 | "Contributors" label over "Voluntary, named, and disclosed." | Heading is "Contributors"; the line follows as a subtitle | 12 | Decided |
| 4, 8, 6 | Eyebrows "In this edition", "From the editors", "Imprint & Masthead", "The publisher's frame" | Removed | 4–8 | Decided |
| Contents | Folios | Generated from the printed page map on every build | 10–11 | None |

## Photography framework (brief section 8)

| Before | Issue | Adjustment | After | Approval |
|---|---|---|---|---|
| All | Several sizes of in-flow picture, some bleeding off the trim | Four positions only: chapter opener (full bleed, standalone), essay head picture (172 mm wide, 55–130 mm deep), set-piece opener (172 × 60 mm, interviews and cases), section foot picture (172 mm wide, sized to the space left, at least 80 mm). All crops are `object-fit: cover` centred, so commissioned photography drops in without layout change | All | None |
| All | Pictures repeated across the book | One picker hands out each file once per build. Near-duplicates under different file names still occur and are outside this pass (brief section 8) | All | None |
| — | Page ground was paper-tinted (#f5f2ec) | White, to save ink; the uncoated cream stock supplies the tone | All | Decided |
