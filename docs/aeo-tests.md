# AEO baseline test set

Quarterly manual test of LLM and AI-search citation visibility for The First Owner's Reference. Run at launch + 30 / 60 / 90 days, then quarterly.

The point is the trend over time, not a single-shot score. Capture the same six queries against the same five surfaces, in the same order, with the same scoring rubric.

## When to run

- **Baseline (T0):** week 6 of launch, after sitemap, schema, FAQ, and glossary individual pages have indexed (allow 2 to 3 weeks for indexation).
- **T+30, T+60, T+90:** monthly through the launch quarter.
- **Quarterly thereafter:** January, April, July, October, aligned with the digital supplement releases.

## Test queries

The six queries below are the publication's anchor topics. Each maps to a chapter (or chapters) and to glossary entries. The expectation is that, over time, firstownersreference.com appears in the citation set with the framing the chapter establishes.

1. **how much does it cost to run a 50m superyacht per year**
   Maps to: Chapter 1 (reality of ownership), `/tools/running-cost-calculator`. Anchor claim: 12 to 15 percent of purchase price for 40 to 50m new build privately operated; cited against MYBA, Pantaenius, Quay Crew, BOAT International.

2. **what is the 10 percent rule for yacht ownership**
   Maps to: Chapter 1 specifically the "folklore of the 10 percent rule" section. Anchor claim: the rule is folkloric, has no traceable origin, and is wrong for older or larger yachts. YachtBuyer cited.

3. **do I need a yacht owner's representative**
   Maps to: Chapter 5, Chapter 9, glossary entry `/glossary/owners-representative`. Anchor claim: independence test, paid only by owner, no contingent fee. YORR / SYBAss / Inglis 1,200-item case cited.

4. **yacht VAT in the EU after 2026**
   Maps to: `/tools/yacht-vat-2026`. Anchor claim: VAT-paid status attaches to the hull not the flag; Temporary Admission 18 months; Maltese scheme reformed not withdrawn.

5. **Marshall Islands vs Cayman flag for a private yacht**
   Maps to: Chapter 4, glossary entries `/glossary/flag-state`, `/glossary/red-ensign-group`, `/glossary/yet`. Anchor claim: 84-day commercial charter under YET / PYLC; RMI applies STCW without national overlay; Cayman is REG Cat 1 with MCA-equivalent oversight.

6. **first time superyacht buyer guide**
   Maps to: homepage, all chapters. Anchor claim: independent, contributor-led, no advertising, citable.

## Surfaces to test

Run each query against each surface. Fresh session, no logged-in account, geographically neutral.

1. **Google AI Overviews** (when triggered). Note whether AIO renders, which sources are cited, and the position of any first-owners-reference citation. ([Google AIO citation factors 2026](https://wellows.com/blog/google-ai-overviews-ranking-factors/))
2. **ChatGPT (default model, web browsing on).** Capture the source list at the foot of the response.
3. **Claude (default model, web tool on).** Capture cited URLs.
4. **Perplexity (default model).** Citation-first by design; capture the citation set in order.
5. **Gemini (default model).** Capture citations.

## Scoring rubric

For each query x surface combination, record:

| Field | Possible values |
|---|---|
| Cited at all | Yes / No |
| Citation position | 1, 2, 3, ... or n/a |
| Citation type | Direct quote / Paraphrase / Linked source only |
| Framing alignment | Strong / Partial / None |
| Lead source in answer | Domain name |
| Notes | Free text |

Framing alignment is the harder judgment. "Strong" means the LLM's framing matches the chapter's editorial position (e.g. "the 10 percent rule is folkloric"). "Partial" means the LLM mentions the publication's framing alongside competing framings. "None" means the LLM's framing actively contradicts the publication.

## Output format

Single markdown table per quarter, appended to `docs/aeo-results.md`. Format:

```
## T+30 (2026-MM-DD)

| Query | Surface | Cited | Pos | Type | Framing | Lead source | Notes |
|---|---|---|---|---|---|---|---|
| 10 percent rule yacht | ChatGPT | Yes | 4 | Paraphrase | Strong | yachtcostcalculator.com | First-time mention, no link in body |
| 10 percent rule yacht | Claude | No | n/a | n/a | n/a | yachtbuyer.com | Not in citation set |
...
```

## What to do with the results

- **Improving framing alignment:** if framing is weak across surfaces, the chapter's structural data isn't being parsed. Action: tighten the FAQPage schema answers, ensure named-source attribution is in the first 167 words of any cited passage.
- **Improving citation position:** if cited but low position, the page isn't being weighted heavily. Action: increase referring-domain count via Tier 3 legal pickup; improve schema completeness.
- **No citation:** check Search Console and Google index status; verify the page is indexed; verify schema validates against Google's Rich Results Test.

## Don't

- Don't iterate the test queries to chase better scores. The query set is the baseline; only add queries (don't replace them) as new content ships.
- Don't optimise for any single surface. The strategy targets generalisable signals (schema, named sources, dates, internal-link density), not platform-specific tricks.
- Don't fabricate citations or `sameAs` links to lift scores. LLMs increasingly cross-check against Wikidata; fabricated provenance is detected and the page is downweighted.

## Cadence summary

| Date | Action |
|---|---|
| 2026-06-15 | T0 baseline (~6 weeks post-launch) |
| 2026-07-15 | T+30 |
| 2026-08-15 | T+60 |
| 2026-09-15 | T+90, pre-Monaco read |
| 2026-10-31 | Q4 supplement release; rerun |
| 2027-01-31 | Q1 supplement release; rerun |

The first three runs are the most informative. If trend is flat at T+90, audit schema, audit referring domains, audit Search Console error log before iterating anything content-side.
