# Paragraph-level review of the semantic pass: brief

Date: 14 November 2026. An external editor reviewed the 714 changes of the semantic precision pass (docs/2027-study/semantic-changes-reviewed.csv). 95 were individually assessed and resolved. The other 619 are marked "Pending: paragraph-level review", with the instruction "Check complete paragraph before applying". They are already applied and live. This review checks each one in its complete paragraph.

Read first: H-editing-brief.md (house style, author decisions) and I-semantic-brief.md (the pass being reviewed).

## Input

docs/2027-study/review-pending-a.json or -b.json: one item per row, with the CSV row number, file, slug, location, before, after, the agent's reason, any ARGUMENT note, original_paragraph (the full string before the pass) and current_paragraph (the full string as it is now, after the pass and the editor's revisions). current_paragraph can be null where the text has since been changed again; find the current text in the file. For headings and short fields, read the surrounding entry in the file.

## For each row, check

1. **The join.** The changed sentence reads correctly in its paragraph: grammar, referents (he/she/they/it), tense, no doubled or missing words, sentences that follow still make sense.
2. **Meaning.** Compared with original_paragraph, the change says the same thing more exactly, or, where it is marked ARGUMENT, the new claim is supported by the text and its sources. No fact, figure, qualification or attribution is lost without reason.
3. **No new unsupported claim.** The external editor's main concerns were rewrites that hardened a claim: "most", "routine", "usually", "always", "never", "would have been payable under any contract", "is the cause", universal rules from one case, certainties about law, tax, insurance or causation. Qualify where needed.
4. **No new artificial phrasing.** The replacement must not swap one stock construction for another (e.g. "centre of gravity", "survive contact with", "the real", tidy aphorisms, three-part closers).
5. **House style.** British English, "percent" (not "per cent"), no em dashes, no middots, units as in the book.
6. **Headings** say plainly what follows and match the section.

## Output

1. **Verdicts:** docs/2027-study/review-verdicts-<a|b>.json, an array with one entry for every row in your input:
   `{"row": 12, "status": "Approved" | "Revised" | "Flag", "note": "<one line: what you checked or changed>", "new": "<full new wording, Revised only>"}`
   - Approved: reads correctly and keeps the meaning. Keep notes short.
   - Revised: you have fixed it; the fix is in your edits file.
   - Flag: needs the author's project files, a contributor, or legal/tax/insurance review. Say exactly what must be confirmed. Do not flag what you can settle from the text, its cited sources or a web search.
2. **Edits:** docs/2027-study/edits/review-<a|b>.json in the H format (exact unique `old` from the file as it is now, `new`, kind, reason starting with "Row N:"). Run `python3 scripts/apply-edits.py docs/2027-study/edits/review-<a|b>.json --dry-run` until it passes.
3. **Report:** docs/2027-study/reports/review-<a|b>.md, short: counts, the revised rows (old/new), the flagged rows with what is needed.

Contributor answers in guest-opinions.json are never edited. Do not edit content files directly, commit or push. Another agent reviews the other half of the rows in the same files at the same time; keep `old` strings short and within your rows' paragraphs.
