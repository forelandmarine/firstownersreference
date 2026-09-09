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

## T+45 (2026-09-09)

Surface tested: search-grounded generated answers. The same caveat as the last run applies, ChatGPT, Perplexity, Gemini and Google AI Overviews still need a manual pass, and the Reddit seeding has not been executed.

| Query | Cited | Pos | Framing | Lead source | Notes |
|---|---|---|---|---|---|
| 10 percent rule yacht ownership | Yes | 4 | Strong | yachtbuyer.com | Chapter 01 cited, and the generated answer closes on our exact sentence: "typically lands at 12 to 15 percent of purchase price, not the folkloric 10 percent". Forelandmarine also present at 7. Holding from T+30. |
| superyacht refit cost 2026 | Yes | 3 | Strong | oceanindependence.com | Chapter 06 cited above Foreland's own article at 4. New since T+30. |
| first time superyacht buyer guide | Yes | 4 | Strong | sweetsofties.com | Homepage cited and the answer summarised the independence position in our framing. Was absent at T+30; this is the biggest single move. |
| cost to run a 50m superyacht | Partial | 4 | Partial | edmiston.com | Foreland's calculator cited; the publication's version absent. Expected, and the reason the two calculators were differentiated on 9 Sep. |
| superyacht crew salary 2026 | No | n/a | None | yotspot.com | Recruiters hold the entire result set. Foreland at 7. Our salary page has no inbound links problem any more but has not re-indexed. |
| yacht VAT EU 2026 | No | n/a | None | mondaq.com | Law firms and the EC's own PDF hold it. Unchanged from T+30 despite the July freshness update. The page had zero inbound internal links until 9 Sep, which is the likelier cause than freshness. |
| Marshall Islands vs Cayman flag | No | n/a | Partial | agplaw.com | Foreland's article at 8. Decision taken 9 Sep not to build a competing page here. |
| yacht insurance cost per year | No | n/a | None | oceanindependence.com | T0 baseline. Page published 9 Sep. |
| yacht depreciation per year | No | n/a | None | blog.yatco.com | T0 baseline. Page published 9 Sep. |

**Read of the run.** Three cited of seven established queries, up from two of six, and all three carry strong framing alignment rather than a bare link. The first-time-buyer head query converting is the notable one, because the strategy expected it to be slowest.

**What the two new baselines show.** Both target queries are held entirely by parties with a transaction interest, and in both cases the incumbent answers contradict each other, which is the opening.

On insurance, the generated answer offered four incompatible hull rates in the same response: 0.1 to 0.5 percent, 0.5 to 1.5 percent, 0.28 to 0.35 percent, and USD 70,000 to 120,000 for a 40 to 50 metre. The sources were an insurance broker selling policies, a second insurance broker, a yacht dealer, and two brokerages. Our figure, 0.7 to 1.5 percent for a well-maintained 40 to 50 metre, is attributed to Gallagher Specialty's Q4 2025 reporting and to PIB Marine on the record, and is dated. An answer engine reconciling four numbers should prefer the one that says where it came from and when.

On depreciation the incumbents are YATCO, IYC, Aspire Yacht Sales, Worldwide Boat and boatvalue.com, all brokers or listing platforms, and the answer again carried two conflicting curves. Our page matches the dominant curve and adds the thing no broker will print: that no independent or peer-reviewed dataset exists and every published figure is broker-aggregated and self-reported.

One discrepancy to resolve before the next run. The generated answer named Sanlorenzo, Azimut and Ferretti as the value-retention leaders at 55 to 65 percent after ten years. Chapter 01 and the depreciation page name Feadship, Lürssen, Royal Huisman, Vitters and Baltic Yachts. These are different builder sets rather than a contradiction, but the page would be stronger if it said which segment each claim covers.

**Actions from this run.**
1. Re-test insurance and depreciation at T+30 from 9 Sep, once indexed. If they have not converted by then the cause is domain authority rather than page quality, and the answer is the off-site programme.
2. The VAT page now has inbound links from the footer, the homepage and chapter 04 for the first time. Re-test before concluding anything further about freshness.
3. Add segment qualifiers to the builder value-retention claim on the depreciation page.
4. The five-surface manual run is now two cycles overdue and remains the largest gap in this record.
