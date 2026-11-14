# Semantic precision pass: brief for editing agents

Date: 14 November 2026. Follows H-editing-brief.md, whose author decisions, house style, file rules and edits format all still apply. Read H first.

## Why

An external reviewer found that much of the prose sounds precise but does not say a clear thing. The example: "Where the order book actually sits, who has capacity, and what that means for a buyer entering the market in 2027." An order book does not sit anywhere. It has a size, a mix, a location and a delivery schedule. The fix: "The global order book, available shipyard capacity and what buyers can expect in 2027."

The chapter passes already fixed facts and repetition. This pass is about meaning, sentence by sentence.

## The test, applied to every editorial sentence

1. **Literal meaning.** Does the sentence describe a real event, action, fact or relationship? Do its verbs suit their subjects?
2. **False physical metaphor.** Does a number, price, contract, decision or market condition sit, land, move, hold, frame, ride, travel, flow, concentrate or occupy a position? Work out what is meant and say it.
3. **Abstract substitution.** Has a specific person, action, cost or obligation been replaced by structure, architecture, framework, frame, discipline, profile, pattern, shape, dynamic, thesis, economics, position? Name the real thing.
4. **False precision.** Does it sound exact but leave a measure, comparison, cause or conclusion undefined (e.g. "inside-price", "operational differential")?
5. **Manufactured emphasis.** A contrast ("not X but Y", "X is where Y happens"), aphorism, slogan or dramatic closer where plain explanation would be clearer. Tautologies.
6. **Repetitive cadence.** Proposition, qualification, emphatic close, paragraph after paragraph. Three-part punchy endings. Not every paragraph needs a memorable last line.
7. **Logic.** Does the conclusion follow from the evidence? Would it stand with the flourish removed? (Example: a shrinking new-build order book does not on its own mean fewer yachts to buy.)
8. **Natural speech.** Would an educated British maritime professional say this in a meeting or write it in a professional article?

Priority: factual and logical consistency first, then semantic clarity, then natural British English and cadence, then punctuation.

## Vocabulary to examine (not to ban)

sit/sits/sitting, land/landed, hold/holding (abstract uses), frame/framing, structure/structural (113 uses: keep where it means legal ownership structure or physical structure), architecture, discipline, pattern (where one event does not make a trend), profile, shape, actually, real (issue/question/test), "the X question", read/reading (for markets or figures), thesis, economics, upstream/downstream, runs hot.

Each use is judged in its sentence. "Ownership structure" for a company holding a yacht is correct. "Budget discipline" can be fine. A refit can run over budget. Do not swap one fashionable word for another ("framework" for "structure"). Do not replace artificial phrasing with a different polished construction.

## What to keep

- Dry, understated confidence close to the subject, especially on running costs, warranties and crew.
- Figures of speech that make the reader understand more. The objective is natural English, not the absence of metaphor.
- Contributor Q&A answers: untouched (published as given). Questions and intros may be edited.
- Technical meaning. The material is not to be simplified. It is to be made more exact.
- Length: replacements may be longer where that makes the meaning clear, but do not pad.

## Headings and chapter descriptions

Headings say what the section contains. "The contract is where it happens" becomes something like "Negotiating the construction contract". Provocative headings may stay only where the evidence that follows supports them (author's preference is plain; "The charter delusion" should become a plain question or statement). Chapter descriptions and standfirsts in content/sections.json are in scope.

## Case studies (content/cases.json)

- The reviewer's table of case problems (architecture/economics/structure standing in for people and payments; "the market was reading correctly"; "what the engine room found"; captain who challenges the owner turned into a universal rule; models "within bands") is in scope.
- **Composites must read as composites.** Where a case is a composite, do not present a constructed event (e.g. two buyers competing for one yacht, quoted dialogue, a precise sequence) as observed fact. Either reword so it is plainly an illustration drawn from several files ("In one of the files...", "In the other..."), or cut the invented detail. Keep the figures that come from the files; keep the disclosure lines.
- Survey "return" ratios: distinguish a negotiated price reduction from a net saving after remediation.
- **Known fixes:**
  - ch04 case: yacht built 2014, transaction 2023, is described as 11 years old. It was nine. Fix to nine. Do NOT change the "2023" or "Single Foreland project" labels (the author is checking them).
  - ch05 and ch06 cases: composites of files dated 2022 to 2024, but the "next build/refit" is "four years later", which is after 2026. Remove "four years later" (e.g. "The owner's next build was contracted..."). Do not change the date labels.
  - ch01 case: "28 percent ... well above the 10 to 20 percent first-year band" is correct arithmetic but clumsily put; make it plain.

## Reporting (mandatory)

The author must see every substantive change. In your report (docs/2027-study/reports/sem-<scope>.md), list **every** edit as a row: location (file, slug, heading or paragraph start), old wording (the phrase, not the whole paragraph), new wording, and which test number(s) it fails. Mark with **ARGUMENT** any edit that changes what is claimed rather than how it is said, and explain why. Group by chapter. No length limit on the table; keep prose commentary short.

Edits file: docs/2027-study/edits/sem-<scope>.json, same format as H. Each `old` must be unique in its file and exact. No em dashes. Do not commit or push. Do not edit content files directly.

Check your edits file is valid JSON and that each `old` occurs exactly once: `python3 scripts/apply-edits.py docs/2027-study/edits/sem-<scope>.json --dry-run`. Note edits from other agents may be applied to the same files in parallel; keep `old` strings short so they stay unique and do not overlap with other chapters' text.
