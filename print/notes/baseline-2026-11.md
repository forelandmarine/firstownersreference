# Print baseline, 14 November 2026

Step 0 of `docs/print/layout-implementation-plan.md`. Full press build from `main` at d01544e (all editorial changes to 14 November), before any layout work. Every later step is measured against these numbers.

| Measure | Value |
|---|---|
| Proof, including cover | 208 pp |
| Press block | 207 pp + 1 spacer = 208 |
| Short pages (`audit-layout.py`) | 72 |
| Stranded headings (`audit-layout.py`) | 7, on pp. 33, 57, 76, 135, 146, 155, 195 |
| Empty columns | 1, on p. 204 |
| Pictures placed in the flow (excludes merged plates and openers) | 195 placements of 99 files |
| Files placed more than once | 37 files, 96 repeat placements; worst `ch09-sup2.jpg` 7 times |

The September proof was 199 pp. The November editorial passes added nine pages.

**These counts are at the wrong scale.** Chrome is shrinking the whole book to about 70 per cent to fit an element wider than the page, so the 9.75 pt body prints at about 6.8 pt. At the intended size the same book is about 291 pp. See `spike-ch01-2026-11.md`.

Two faults seen in the build log:

- **Folios did not settle.** Pass 4 set spacers before ch01, ch03, ch04 and ch06; pass 5 dropped the ch06 spacer. The build stopped after pass 5, so the contents folios and the opener parity from ch06 onwards should be checked by eye on this proof.
- **Plates back to back.** Chapter 01 plates 0 and 2 landed on consecutive pages (13 and 14), which register rule R5 forbids.

The print running heads still carry a middot (`\00b7`) in `chapterMastersCss()` and the recto head in `print.css`, missed by the site-wide replacement in 1bbcc67.
