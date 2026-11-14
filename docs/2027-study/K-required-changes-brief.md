# Required changes list: brief

Date: 14 November 2026. Input: docs/2027-study/required-changes.csv (56 rows, FOR-001 to FOR-056), from an external reviewer who read the live site, possibly before the latest pushes. Read H-editing-brief.md and I-semantic-brief.md first; their house style and author decisions bind.

## For each row assigned to you

1. **Find the current text.** Many rows quote wording that has since been changed (e.g. "Where the order book actually sits", the ch02 checklist price limit, the ch08 broken sentence, "none was illegal or unusual"). If the problem is already fixed, record status "Already fixed" with where and how. Check app/ pages and lib/ (charts, glossary, tools) as well as content/*.json.
2. **Research what can be researched.** Regulations, court decisions, published reports, builder specifications, standard contract forms, published depreciation figures: verify with web search, primary sources first, and cite the URL in your report. Do not leave a row "for counsel" if a published primary source settles the wording. Where the law is jurisdiction-specific, write the qualification into the text (that is the change), rather than flagging.
3. **Make the change** where the row is right, in the plainest accurate wording, consistent across every page that repeats the point (essay, case, checklist, FAQ, data spread, charts in lib/charts.tsx, glossary, tools pages under app/tools). Reviewer wording is a suggestion; match the book's voice and "percent" spelling, no em dashes.
4. **Disagree where the row is wrong**, with the reason (status "Rejected").
5. **Author-only rows.** Where only the author's project files can settle a figure (case-file figures, dates, referral agreement bases), do not invent: either reword so the text claims only what it can support (e.g. present an estimate as the case's estimate, name the unknown) and mark "Done (qualified)", or, if no honest rewording is possible, "Author" with the exact question.
6. **FOR-027 is author-protected**: chapter 05 opening paragraphs 1 to 3 were written by the author. Do not edit them. Note: the reviewer's quoted text is no longer there.

## Known context

- The publication is the 1st Edition, 2027 (print January 2027); © year may stay 2026.
- Foreland's PI: the colophon was changed earlier to remove the insurance item (author: "not relevant on this publication"). Check what the colophon now says before acting on FOR-047/048.
- The print-request page already uses email instructions and an "Email Us" button rather than a form; verify.
- The author decided disclosure is acceptable as the independence standard (H-brief).

## Output

- Edits: docs/2027-study/edits/req-<a|b>.json in the H format (files may include app/**/*.tsx, lib/*.ts(x) for this task; keep JSX intact; `old` exact and unique). Dry run with scripts/apply-edits.py until it passes.
- Status: docs/2027-study/req-status-<a|b>.json, one entry per assigned row: {"id": "FOR-001", "status": "Done" | "Done (qualified)" | "Already fixed" | "Rejected" | "Author", "note": "<what was changed and where, or why not>", "sources": ["url", ...]}.
- Report: docs/2027-study/reports/req-<a|b>.md, short.
Do not edit files directly, commit or push. Another agent handles the other rows in the same files at the same time; keep `old` strings short.
