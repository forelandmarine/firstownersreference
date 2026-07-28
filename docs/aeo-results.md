# AEO test results

Method, queries, and rubric in `aeo-tests.md`. Append one section per run. The point is the trend, not single-shot scores.

## T+30 (2026-07-27, run late; T0 was not captured)

Surface tested: Claude with web search enabled. ChatGPT, Perplexity, Gemini, and Google AI Overviews were not testable from this environment and still need a manual run, ideally before 2026-08-15 so the T+60 comparison holds.

| Query | Surface | Cited | Pos | Type | Framing | Lead source | Notes |
|---|---|---|---|---|---|---|---|
| cost to run 50m superyacht | Claude | Yes | 6 | Paraphrase | Partial | rightboat.com | Both the FOR calculator and the Foreland calculator surfaced. The answer used our "EUR 1.5 to 5 million for 40 to 50m in 2026" number but still repeated the 10 to 12 percent rule of thumb from broker sources. |
| 10 percent rule yacht | Claude | Yes | 2 | Paraphrase | Strong | yachtcostcalculator.com | Chapter 1 cited at position 2. The answer reproduced the chapter's framing verbatim: "folkloric figure with no traceable origin", "12 to 15 percent for a typical 40 to 50 metre new build". This is the target outcome. |
| owner's representative | Claude | No | n/a | n/a | Partial | linkedin.com (Ultimar) | forelandmarine.com cited twice (blog + insights); firstownersreference.com absent. Chapter 5 and the glossary entry are not yet outranking the Foreland pieces for this query family. |
| yacht VAT EU after 2026 | Claude | No | n/a | n/a | None | pglegal.it | Answer keyed on the EC guidance of 30 Apr 2026 and Italian ADM Circular No. 11/2026. Freshness is the ranking lever here; see action below. |
| Marshall Islands vs Cayman flag | Claude | No | n/a | n/a | Partial | affinityco.com | The YET 84-day framing (our anchor claim) appeared in the answer but was attributable to affinityco.com. The claims are winning; the attribution is not. |
| first time superyacht buyer guide | Claude | No | n/a | n/a | None | cruiseaddicts.com | Broker-first framing dominates ("hiring a yacht broker is recommended"). Structurally the hardest query; homepage not surfacing. |

**Indexation check.** A brand query returned five site pages with correct SEO titles (chapters 1, 2, 4, 6, calculator) and the answer described the publication accurately as "an independent yachting field manual for first-time superyacht buyers". Indexation and title strategy are working.

**Read of the run.** Two citations out of six queries at under three months from launch, one with strong framing alignment, is ahead of the cold-start expectation in the strategy. The cost-of-ownership family is converting first, as predicted. The gaps are the VAT page (freshness), the flag comparison (no citable comparison asset yet), and the buyer-guide head query (domain authority, expected to be slowest).

**Actions taken from this run.**
1. Update `/tools/yacht-vat-2026` to cover the European Commission pleasure-craft guidance of 30 April 2026 and Italian ADM Circular No. 11/2026, with dates in the copy. The winning pages on this query all key on those two documents.
2. Ship the flag-state glossary cluster and order-book tracker (Q3 supplement load) so the flag comparison query has a citable asset.
3. Re-run all five surfaces manually at T+60 (2026-08-15).
