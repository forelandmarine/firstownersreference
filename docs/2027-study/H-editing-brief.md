# Chapter editing passes: brief for editing agents

Date: 14 November 2026. Source documents: F-structural-read.md (Pass One), G-selling-plan.md, and the external editorial review summarised below.

## Objective

Improve accuracy, clarity, cadence, consistency and fairness of each chapter without changing the publication's voice, independence or substance. Edit with restraint, verify with rigour. The measure of success is how little unnecessary intervention is visible.

## Author decisions (binding)

1. **Independence standard:** written disclosure is acceptable. A party paid on completion, or by commission, can be engaged if the payment and its source are disclosed in writing. Remove any statement that such a party automatically "fails" the test; replace with the disclosure standard. Keep the six-element test, but frame element 1 (contingent earnings) as "disclosed in writing".
2. **"Independent adviser" and "owner's representative" are interchangeable.** Define the role once in ch03 (first use), saying the book uses the two terms for the same role. Later chapters may use either.
3. **Reference blocks** (yard directory ch06 29 to 64, charter regimes ch07 55 to 66, lines of cover ch07 41 to 49): move the detail out of the essay into the chapter's data spread (content/data-spreads.json), leaving a short paragraph and a pointer in the essay.
4. **Units stay "50m" and "GT".** Never convert GT to tonnes. Currency codes EUR, USD, GBP stay.
5. **Never use "fail" or "failure" about yards or builders.** Use "insolvency", "financial difficulty", "became insolvent".
6. **Selling** is to be added to ch06 (see G-selling-plan.md), written only from sources already held. No new contributor questions.
7. Contributor Q&A answers (content/guest-opinions.json "answer" fields) are published as given. Do not edit them. Questions and intros are editorial and may be edited.

## House style

- British English. No em dashes; no middot separators. Full stops in preference to semicolons where that reads better. Colons sparingly.
- Sentences mostly 15 to 30 words; vary length naturally. A short sentence must earn its place.
- Reduce, do not ban: "It is not X. It is Y.", "not X but Y", "The question is...", "What matters is...", "The real issue...", closing one-line declarations, unattributed pull quotes that only repeat the essay. Not every paragraph needs a memorable last sentence.
- Prefer concrete words to framework, structure/structural, architecture, alignment, discipline, frame, profile, position, unless technically exact.
- No signposting, no summaries that restate what the reader has just read.
- Distinguish fact, attributed claim, editorial interpretation and opinion. Generalisations about whole groups (brokers, yards, managers) must be supported or qualified.
- Particulars, not maxims. No luxury-marketing language.

## Factual discipline

- Never invent a source, quotation, statistic, anecdote or technical explanation.
- Fix contradictions using arithmetic you show in the report, or by naming the measure and source for each figure. If you cannot resolve a figure from the text and its cited source, flag it; do not guess.
- You may use web search to verify a fact, citing the URL in your report. Primary sources first.
- Repetition across chapters: the established home of an argument keeps it; later chapters apply it to their situation with at most a one-sentence pointer back. Each chapter must still make sense on its own online.

## Output (per chapter)

Do not edit content files directly. Produce:

1. **An edits file** at docs/2027-study/edits/chNN.json: a JSON array of edits, each
   `{"file": "content/lead-essays.json", "old": "<exact existing text, unique in the file>", "new": "<replacement>", "kind": "fact|structure|repetition|line|selling", "reason": "<one line>"}`.
   - `old` must be copied exactly from the file as it is now (curly quotes ’ “ ” as in the file) and must occur exactly once in that file. Keep `old` as short as uniqueness allows, usually one sentence or one paragraph.
   - To delete a whole paragraph string from a paragraphs array, use `{"file": ..., "deleteParagraph": {"slug": "...", "startsWith": "<first 60 characters>"}, ...}`.
   - To insert a new paragraph, use `{"file": ..., "insertAfter": {"slug": "...", "startsWith": "<first 60 characters of the preceding paragraph>"}, "new": "<paragraph text or a JSON object such as {\"type\":\"h2\",\"text\":\"...\"}>", ...}`.
   - Files you may target: content/lead-essays.json, content/cases.json, content/checklists.json, content/faqs.json, content/data-spreads.json, content/sections.json, content/guest-opinions.json (questions and intros only), lib/glossary.ts.
2. **A chapter report** at docs/2027-study/reports/chNN.md with: overall assessment; factual concerns and status (resolved with working, or flagged); structural changes; repetition consolidated; significant line changes; outstanding questions for the author. Keep under 1,500 words.

Do not commit or push.
