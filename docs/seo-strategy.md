# SEO and AEO strategy

Research deliverable, May 2026. Drafted for the 1st Edition launch and the first 90 days post-launch. Constraint: independence guardrails are non-negotiable. No paid links, no broker/yard partnerships, no sponsored content, no affiliate links, no thin pages, no keyword-stuffed landing pages. The editorial integrity is the wedge.

## Live site audit

Findings from raw HTML inspection of firstownersreference.com on 2026-05-04.

**What is in place.**
- Stack signals are clean. Vercel edge with `x-nextjs-prerender: 1` and `x-vercel-cache: HIT` on the homepage. Static generation working at the infrastructure layer.
- Self-hosted fonts via `next/font`. Four `.woff2` files preloaded with `crossorigin` and `as="font"`. Newsreader, Geist, Geist Mono bundled. No external Google Fonts request.
- Image optimisation via `next/image`. Hero images use proper `srcSet` ladders 384w to 3840w with `q=75`. Image preloads on homepage and chapters use `imageSrcSet` and `imageSizes`. Correct LCP shape.
- HTML lang and locale set consistently: `<html lang="en">` and `og:locale="en_GB"`.
- The calculator page is the only page that does the SEO job properly: unique meta description, `<link rel="canonical">`, FAQPage JSON-LD with five Q&A pairs, OG/Twitter title and description tuned to query intent.

**What is missing or wrong.**
- **No sitemap.xml.** `https://firstownersreference.com/sitemap.xml` returns 404 and is being caught by the dynamic `[slug]` route. There is no `app/sitemap.ts`.
- **No robots.txt.** Same 404, same `[slug]` interception.
- **No JSON-LD on homepage, on chapter pages, or on the glossary.** Only the calculator FAQPage shipped.
- **No `<link rel="canonical">` on homepage, chapters, or glossary.** Only the calculator has one.
- **No `og:image` anywhere.** Verified across all four pages. Social shares and LLM previews fall back to nothing.
- **No `og:url` and no `twitter:image`.** Twitter is set to `summary` not `summary_large_image`.
- **OG title and description are identical across pages.** Per-page OG was the calculator's edge.
- **No author markup, no publisher Organization, no Article schema on chapters.** Chapter 1 is a 4,200-word essay with citable claims and no Article + author + publisher graph.
- **Title pattern is inconsistent.** Homepage is just `The First Owner's Reference`. Chapter title is `The reality of ownership | The First Owner's Reference`. Calculator stacks the SEO title properly. Chapter titles leave the primary query off the page.
- **Meta descriptions on chapters are too short and too elegant for SEO.** Chapter 1 description does not contain "superyacht", "running cost", "10 percent rule", or any of the queries the chapter answers.
- **Internal linking is thin.** Chapter 1 has 11 internal links; three of those are nav. The chapter does not deep-link into the glossary on any of the named terms.
- **Heading structure is sound** (one h1, h2 sections, h3 sub-blocks). That part is editorial and strong.
- **Image alt text is missing on chapter hero and brand SVG.**
- **No `<meta name="robots">`.** Relies on default. Should be explicit once supplements roll.
- **No hreflang.** i18n plan is not yet actioned. Confirmed live: no `<link rel="alternate" hreflang>` tags.

## Query landscape

Drawn from Google SERPs, autosuggest, and PAA observed for these queries in May 2026.

**Cost of ownership family** (informational, very high value).
- "how much does it cost to run a superyacht" — top 10 dominated by Ocean Independence, Fraser, MBY, Yacht Cost Calculator, Rightboat, West Nautical, BARNES, Yachttrading. All commission-funded brokers or trade press.
- "10 percent rule yacht" — broker blogs and yachtcostcalculator.com hold the SERP. Editorial gap: nobody is honest that the rule is wrong on the assumption it is anchored to.
- "yacht running costs by size", "annual cost 30m yacht", "annual cost 50m yacht", "what does it cost to run a 100ft yacht" — long-tail variants where the calculator's per-size output should rank.
- "yacht depreciation rate first year", "do yachts hold value" — chapter 1 owns the data.

**Buying-process family** (informational then commercial).
- "how to buy a superyacht" — Burgess, Y.CO, Northrop & Johnson, BOAT International, Edmiston. Every page is a pitch dressed as a guide.
- "yacht broker commission who pays" — YATCO, Windward, YachtWorld. SERP is broker-friendly framing of a structurally conflicted question.
- "do I need a yacht broker", "broker vs adviser yacht", "buyer's broker yacht" — clean editorial gap.
- "yacht surveyor pre-purchase", "MOA yacht", "yacht sea trial", "P&S agreement yacht", "yacht escrow account" — process queries that chapter 4 answers.

**Comparison family.**
- "new build vs brokerage superyacht" — Edmiston, BOAT International, SuperYachtsMonaco.
- "motor vs sail yacht ownership cost" — calculator can carry this directly with two presets shown side by side.
- "charter vs own yacht 2026" — yatco, vitalcharters, Sunreef. The "charter delusion" framing in chapter 1 is the wedge.
- "Feadship vs Lurssen", "Benetti vs Sanlorenzo" — only worth competing where independence allows fair comment.

**Flag and VAT family** (informational, lawyer-dominated SERP).
- "Marshall Islands yacht flag", "Cayman yacht flag", "Red Ensign yacht", "best flag for private yacht", "best flag for charter yacht" — currently NauticAll, yachtcostcalculator.com, Edmiston, Rosemont, AGPLAW.
- "yacht VAT EU 2026", "temporary admission yacht 18 months", "yacht VAT Brexit", "Spanish IPR yacht" — fragmented across customs consultancies and one EU Commission PDF. Editorial gap is real because rules changed materially in 2025-2026 and most pages predate the changes.

**Crew and operations family.**
- "superyacht captain salary 2026" — YPI Crew, Flying Fish, Lighthouse Careers. Recruiter-published.
- "yacht crew cost per year", "MLC compliance yacht", "yacht crew rotation 2:2", "ENG1 medical" — recruiter-dominated.

**Refit family.**
- "superyacht refit cost", "refit overrun typical", "best refit yards Mediterranean" — Foreland's own piece ranks for refit cost; BOAT International, Dockwalk, KRM, Yatco share the rest.

**Ownership-structure family** (legal, low volume, very high value).
- "yacht SPV structure", "BVI yacht ownership", "beneficial ownership yacht 2026" — Harneys, Conyers, Mourant, Ogier, Rosemont. Law-firm thought leadership, often dense and date-locked.

**Decision-stage queries.**
- "questions to ask before buying a yacht", "owner's representative yacht", "do I need an owner's rep" — Foreland already ranks for the last one; the publication's chapter 9 should anchor an editorial canonical.

## Competitive SERP analysis

Twelve priority queries, ranked 1-10 inspected.

| Query | Top 10 dominated by | Page format | Structural weakness | Publication's shot |
|---|---|---|---|---|
| how much to run a superyacht | Ocean Independence, Fraser, MBY, BARNES, West Nautical | Ultimate-guide essays, 1,500-3,500 words | Brokerage-funded; numbers typically pre-2024; little FAQ schema | Strong |
| 10 percent rule yacht | Wsyachtbrokers, yachtcostcalculator.com, 212-yachts, Yachtbuyer | Listicle/explainer, 800-1,500 words | Premise is wrong and almost no page says so cleanly | Strong |
| how to buy a superyacht | Burgess, Y.CO, Northrop & Johnson, BOAT International | Sales-funnel guides, 1,500-4,000 words | Every page sells brokerage as the answer | Medium |
| superyacht refit cost | BOAT International, Foreland Marine, Dockwalk, KRM, Yatco | Editorial + service-page hybrids | Mixed; Foreland piece is well-positioned but commercial | Strong |
| superyacht captain salary 2026 | YPI Crew, Flying Fish, Lighthouse Careers, Yotspot | Salary guide, tables | Recruiter-aligned; numbers refresh annually | Medium |
| yacht VAT EU 2026 | Mathez, Sentient, Praxis, EC PDF, Oceanskies | Customs-consultant explainers | Most pages predate 2025 rule changes; fragmented | Strong |
| Marshall Islands flag yacht | Yacht Cost Calculator, NauticAll, Nomad Capitalist, Rosemont | Flag-by-flag tables | Numbers and procedural detail vary; no single trusted reference | Strong |
| broker commission who pays | YATCO, YachtWorld, Windward | FAQ blogs | Broker-written; conflict-of-interest framing absent | Strong |
| new build vs brokerage | Edmiston, BOAT International, Northrop & Johnson | Comparison essays | Sales-conflicted | Strong |
| owner's representative yacht | Megayacht News, Maritime Training Academy, Foreland Marine, SuperyachtNews | Mixed | SERP fragmented, no clean reference | Strong |
| BVI yacht SPV | Harneys, Conyers, Mourant, Ogier | Law-firm articles | Dense, lawyer-prose, often 2022-2024 dated | Medium |
| superyacht order book 2026 | BOAT International, Ita Yachts Canada, Lumenautica | Annual report + listicles | BOATPro is paywalled; secondary sources scrape | Medium |

The structural pattern: the top 10 of every commercial query is held by entities whose income depends on the answer being commercial. The publication's positioning is the strongest editorial wedge available in this SERP.

## AEO baseline and tactics

**Baseline visibility, May 2026.**
- `firstownersreference.com` returns zero indexed mentions in any major LLM training set or live index. Expected for a May 2026 launch.
- Foreland is in the live index with topical authority on owner's-rep queries.
- The publication is at zero on AEO. Every recommendation below assumes a cold start.

**How LLMs choose citations in 2026.**
- ChatGPT (Bing-fronted), Claude (training data plus retrieval), Perplexity (live web, citation-first), Gemini (Google index plus AI Overviews), and Google AI Overviews use different retrieval pipelines and rarely overlap. Only ~11% of cited domains are shared between ChatGPT and Perplexity for the same query.
- Common signals across all of them: structured data (FAQPage, Article, Person, Organization, DefinedTerm), explicit author and publisher entities with `sameAs`, last-updated timestamps, semantically-complete passages of 134-167 words, and domain authority via referring-domain count.
- Google's own data: 47% of AI Overview citations now come from pages ranking below position 5. Traditional rank is a weaker signal than it was; structured semantics matter more.
- For Perplexity: freshness and citation-density weighted higher. For ChatGPT: Wikipedia presence and Bing index depth dominate. For Claude: training-data inclusion is the binding constraint, which means becoming the page that lawyers and trade press cite.

**Schema rollout, in priority order.**
1. **Article + author Person + publisher Organization on every chapter.** With `headline`, `datePublished`, `dateModified`, `author` as Person with `sameAs` (LinkedIn, ORCID where applicable, Wikidata once an item exists), `publisher` as Organization with logo and `sameAs` to forelandmarine.com plus the LinkedIn page. `mainEntityOfPage` pointed at the canonical URL. Article and Person nodes connected by matching `@id`.
2. **FAQPage on every chapter section landing.** Three to seven Q&A pairs per chapter, drawn from PAA and Reddit thread mining. Answers must be 50-100 words and self-contained.
3. **DefinedTerm + DefinedTermSet on /glossary and on individual entries.** With 16 terms today and a planned expansion, the glossary becomes a citation magnet only with this schema and individual-page URLs (`/glossary/temporary-admission` etc).
4. **BreadcrumbList on every nested page.**
5. **WebSite + SearchAction on the root.**
6. **Dataset schema on calculator outputs** when those outputs are static reference numbers. Plus `SoftwareApplication` for the calculator UI itself.
7. **ClaimReview (cautious).** Only on pages where the publication explicitly debunks an industry claim ("the 10 percent rule", "charter pays for ownership"). Do not use as a generic SEO tool.

**Tests at launch + 30 / 60 / 90 days.** Manual queries against ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews using:
- "how much does it cost to run a 50m superyacht per year"
- "what is the 10 percent rule for yacht ownership"
- "do I need a yacht owner's representative"
- "yacht VAT in the EU after 2026"
- "Marshall Islands vs Cayman flag for a private yacht"
- "first time superyacht buyer guide"

Capture: which sources appear in the citation set, where in the answer they appear, whether firstownersreference.com appears, and whether the framing the LLM uses matches the publication's editorial line. Repeat quarterly. The point is the trend, not single-shot scores.

**What not to do.**
- No fabricated source lists. No AI-generated FAQ stuffing. No inflated author bios.
- No paraphrase of paywalled work (FT, Bloomberg, Knight Frank Wealth Report behind the form). Cite, link, quote the publishable extract only.
- No "ultimate guide" formatting just to chase length. Bloating chapters loses the wedge.

## Technical SEO for Next.js 16.2

**Mandatory file additions.**
- `app/sitemap.ts` returning a typed `MetadataRoute.Sitemap`. Include homepage, all nine chapters, every chapter sub-route (case material, checklist), `/tools/running-cost-calculator`, `/glossary`, every individual `/glossary/[slug]`, `/contributors`, `/colophon`. Set `lastModified` from the chapter's `dateModified`. Once supplements ship, use `generateSitemaps()` to split per-edition.
- `app/robots.ts` returning a `MetadataRoute.Robots` object. Allow all, declare the sitemap.

**generateMetadata per route.**
- Replace static `metadata` exports on chapter and glossary routes with `generateMetadata` so each chapter, each glossary entry, and each calculator-result variant has bespoke `title`, `description`, `openGraph`, `twitter`, `alternates.canonical`. The calculator already proves the pattern.

**Dynamic OG images via `next/og`.**
- Add `app/opengraph-image.tsx` at the root and one per chapter. Use the brand SVG, the chapter title, the chapter coordinate ("Chapter 01"), and a short standfirst. 1200x630, declared in metadata.
- Twitter card upgrade from `summary` to `summary_large_image`.

**Canonical and alternates.**
- Add `alternates.canonical` for every page in `generateMetadata`.
- Review the `[slug]` matcher to ensure it does not also catch reserved metadata files.
- When the i18n plan ships, add `alternates.languages` for the seven planned locales.

**Structured data implementation.**
- Use a typed helper (e.g. `lib/jsonld.ts`) that produces the JSON-LD graph with cross-referenced `@id` values, then render via `<script type="application/ld+json">` from the layout or page server component.

**Performance signals to verify.**
- LCP candidate is the homepage hero `monaco-harbour.jpg`; preload is correctly declared. Verify CWV with PageSpeed Insights post-launch.
- Run `next build` analyse to confirm initial JS budget under ~150 KB on chapter pages.
- Confirm `font-display: swap` on the four `.woff2` preloads. Flash of invisible text on a serif-heavy editorial site is conspicuous.

**What is good and should be left alone.** Static generation, font hosting, image optimisation, page-level CSS bundling. Do not introduce middleware, edge config, or experimental flags for SEO. The win is filling missing metadata, not changing infrastructure.

## Backlink and citation strategy

The constraint is severe. No broker, yard, or commercial-yacht-industry partnerships. The acceptable list is wealth/finance editorial, law firms, official-source citations, and trade press where the publication is cited rather than reciprocating. Path is editorial pitch or being the page worth citing, never a link-trade.

**Tier 1: data-source citations** (highest leverage, slowest).
- **Knight Frank Wealth Report.** Path: provide them with original yacht-market data they cannot get anywhere else for the 2027 edition. Methodology-aligned data partnership pitch goes to their Wealth Sizing team, not their press office.
- **Capgemini World Wealth Report.** Same logic, similar timeline.
- **BOAT International (citation-side only).** Pitch the editorial team for a quote ("Foreland Marine, in The First Owner's Reference, finds...") on stories where the publication has a defensible independent number. The pitch is a quote, not a link.

**Tier 2: family-office and wealth editorial.**
- **Spear's Magazine.** Yacht-adjacent rankings, family-office audience, independent editorial. Pitch the editor with one specific essay, not a relationship.
- **Citywealth, Campden Wealth (Family Wealth Report), RBC Wealth Insights, UBS CIO content, Family Office Exchange.** Realistic path is being the public-domain reference cited inside their yacht-related content rather than getting a feature.
- **FT Weekend's How To Spend It / HTSI.** Editorial, infrequently a clean cite. Only pitch when there is a specific data point that maps to a planned issue.

**Tier 3: legal thought-leadership** (most realistic near-term).
- **Stephenson Harwood superyachts.** Send the published 1st Edition to the partners (Roland Foord, Kiersten Lucas, Ezio Dal Maso) with a specific note on which chapter cites which legal framework.
- **HFW, Hill Dickinson, Ince, Bargate Murray.** Same approach.
- **Harneys, Conyers, Mourant, Ogier (BVI/Cayman).** When the ownership-structure chapter ships, send them a copy.

**Tier 4: official-source linkage** (slow, durable).
- **MCA, REG, EU Commission Taxation and Customs Union.** Path is participating in their consultations under the publication's name.
- **University research.** Cass Business School, Maritime Greenwich, Plymouth, Strathclyde naval architecture. Path: offer the calculator's anonymised dataset for academic use under attribution.

**Tier 5: general financial press.**
- **FT, Bloomberg, WSJ, The Times, Telegraph.** Quote sourcing rather than backlink farming.

**Path summary.** Tier 3 first (legal pickup realistic in 6-9 months from launch). Tier 1 second (12-18 months to land a Knight Frank cite). Tier 2 in parallel. Tier 4 and 5 opportunistic.

## Content architecture

**New pages and chapters that close gap queries.**
- `/tools/yacht-vat-2026` — date-stamped explainer covering EU VAT, Temporary Admission, post-Brexit UK position, Spanish IPR. FAQPage schema. Linked from chapters 3, 4, 7.
- `/tools/captain-and-crew-salary-2026` — data spread of salary bands by yacht length and role, sourced from MLC, Quay Crew published material, YPI Crew published material with attribution, plus the publication's own consultation. Dataset schema. Annual refresh.
- `/tools/order-book-tracker` — free, slim version of what BOATPro is paywalled. Even ten data points refreshed quarterly becomes the only free public reference. Cite BOAT International where their numbers appear. Strict editorial line: tracker is descriptive, not promotional.
- `/02a-flag-state-comparison` (or chapter 3 sub-route) — comparison table covering Marshall Islands, Cayman, Red Ensign (Isle of Man, Gibraltar, BVI, Cayman), Malta, St Vincent. DefinedTerm-tagged.
- `/05a-decoding-the-yard-order-book` — independent essay on how to read a yard's pipeline.
- `/09a-questions-to-ask-before-you-buy` — long-tail page tied to chapter 9, FAQ-schema'd, with most-asked PAA questions as h2s.

**Glossary expansion.** Current 16 terms is a starting set. Priority additions, all with high search demand and clean editorial answers: VAT-paid status, Importation, Spanish Matriculation Tax, Charter VAT, Crew NI/social, Annex VI (MARPOL), Polar Code, Tier III emissions, Hull and machinery insurance, P&I, Class society, Period in service, Refit specification, Memorandum of Agreement, Sea trial protocol, Master 3000, ENG1, MLC 2006, ISM Code, ISPS Code, AIS, ECDIS, Yacht Engineer Y4/Y3/Y2/Y1, Reflagging, Spec book, Punch list, Builder's certificate, Statement of compliance, Class notation, Naval architect's deliverables, Tank certificate, Owner's supply, Tender garage, Stabilisation, Hybrid propulsion, Tier IV equivalent, Bunkering, Charter agreement, MYBA terms.

Each as an individual `/glossary/[slug]` route with DefinedTerm schema, in-content citations to the chapter that defines it, and one to two named external citations (regulator or law firm) per term.

**FAQ pages tied to chapters.** Five to seven Q&A pairs at the foot of each chapter, FAQPage schema, drawn from PAA and Reddit thread mining.

**Internal linking patterns.**
- Calculator links inward to chapters 1, 4, 6, 7. Already good.
- Chapters need to link outward to the calculator on every cost reference and inward to the glossary on every defined term's first appearance. Currently chapter 1 has 11 internal links; target 25-35 on a 4,200-word chapter, half of them deep glossary links.
- Glossary entries link back to the chapter where the term is defined (one each) and to the calculator where it affects cost.
- Supplements (Jan/Apr/Jul/Oct) each pick one chapter to update and one new tool/data spread to ship; the supplement linked in two places — relevant chapter footer and homepage "from the editors" block.

**Quarterly digital supplements: SEO loading.** Each supplement should ship one of: a new data spread page (Dataset schema), a new long-form chapter sub-route (Article schema), or a new glossary cluster (DefinedTermSet). Over four quarters that compounds to twelve new indexed entities by the first anniversary.

## 90-day priority list

May to August 2026, sequenced by leverage and dependency.

**Week 1-2 (technical foundation).**
1. Add `app/sitemap.ts` listing every current route. Verify `/sitemap.xml` returns 200.
2. Add `app/robots.ts`. Verify `/robots.txt` returns 200 and references the sitemap.
3. Add per-page `generateMetadata` with `alternates.canonical` on homepage, every chapter, glossary, glossary entries, tools.
4. Upgrade Twitter card to `summary_large_image` everywhere.
5. Ship one root `opengraph-image.tsx` and one per chapter via `next/og`.
6. Audit and fix every `next/image` alt on hero and editorial images.

**Week 3-4 (schema rollout).**
7. Article + Person + Organization JSON-LD on every chapter, with cross-referenced `@id`.
8. FAQPage JSON-LD on every chapter.
9. DefinedTerm + DefinedTermSet on `/glossary`. Build individual `/glossary/[slug]` pages.
10. BreadcrumbList on every nested page.

**Week 5-6 (chapter-level on-page).**
11. Rewrite chapter `<title>` and meta description tags to contain the lead query.
12. Add 25-35 internal links per chapter, half deep-linked to glossary.
13. AEO baseline test run (six queries x five LLMs/AI surfaces). Record results.

**Week 7-9 (new pages targeting gap queries).**
14. Ship `/tools/yacht-vat-2026`.
15. Ship `/tools/captain-and-crew-salary-2026`.
16. Expand glossary by 30 terms with full schema.

**Week 10-13 (citation pitches and supplement prep).**
17. Print copies plus digital reference card to Stephenson Harwood (Foord, Lucas, Dal Maso), HFW, Hill Dickinson, Harneys, Conyers, Mourant.
18. Knight Frank Wealth Sizing team — methodology-aligned pitch for 2027 edition data partnership.
19. Spear's editor — one specific essay pitch ("the folklore of the 10 percent rule").
20. AEO 30-day re-run. Compare deltas.

**End of week 13 (90-day mark).**
21. AEO 90-day re-run. Decide whether the trend is moving and which schema or content lever produced it.
22. Q3 supplement (July) loaded with a new data spread (order-book tracker) and a glossary cluster on flag states.

## What we will not do

- No paid backlinks. No PBNs. No reciprocal-link arrangements with brokers, yards, or commission-funded trade press.
- No sponsored content, no sponsored chapters, no advertising slot of any kind on the site.
- No affiliate links to brokers, charter platforms, or yacht financing products.
- No "ultimate guide" inflation. Word count is a function of editorial need.
- No keyword-stuffed meta descriptions.
- No fabricated author credentials, fabricated `sameAs` links, fake testimonials, or fake review schema.
- No ClaimReview schema on opinion pages, only on fact-check passages.
- No JavaScript-rendered editorial content; everything editorially load-bearing must be in the SSG HTML.
- No partnership with broker brands for distribution, even at zero cash.
- No translation of editorial copy into non-English locales until the editorial line in those locales has a named editor.

## Confidence and verification points

**High confidence.**
- Live-site audit findings (missing sitemap/robots, missing JSON-LD on three of four audited pages, missing canonical and og:image, identical OG across pages). Verified directly against served HTML.
- Next.js 16 metadata API surface (sitemap.ts, robots.ts, generateMetadata, opengraph-image, generateSitemaps).
- Competitive SERP composition in the cost-of-ownership and refit-cost families. Directly observed.
- The structural-conflict point. Every commercial yacht-buying SERP is held by entities whose income depends on the answer being commercial.

**Medium confidence — needs verification.**
- Specific LLM citation behaviour numbers (the 11% domain overlap between ChatGPT and Perplexity; the 47% of AIO citations from below position 5) come from third-party SEO research published in early 2026. Treat as directional. Re-test quarterly with the publication's own queries.
- The data partnership path with Knight Frank, Capgemini is realistic but timeline-dependent on their editorial cycles. The 2027 Wealth Report editorial close is approximately Q4 2026.
- Captain-salary-by-size numbers vary by ±25% across recruiter publications. The data spread should not pretend to a precision the underlying market does not have.

**Needs editorial input before action.**
- Which interviewees are confirmed for the 1st Edition. Person schema on chapters needs at minimum the named in-house editor and any contributing author who has consented to byline-level Person schema with `sameAs`.
- Whether the calculator is to expose its anonymised aggregate data for academic citation. That decision drives Tier 4 backlinks.
- Whether the publication will publish a public methodology page (recommended). Lifts AEO citation odds and pre-empts the "where do these numbers come from" question.
- Whether `thefirstownersreference.com` is strictly 301'd to the primary domain at the apex.

## Sources

- [Next.js sitemap reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js robots reference](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Next.js generateMetadata reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js metadata files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata)
- [Ocean Independence — superyacht ownership costs](https://www.oceanindependence.com/yacht-management/operational-yacht-management/how-much-does-it-cost-to-own-a-superyacht/)
- [Burgess — buy a yacht](https://www.burgessyachts.com/en/buy-a-yacht)
- [BOAT International — first yacht buying tips](https://www.boatinternational.com/luxury-yacht-life/owners-experiences/tips-for-buying-your-first-yacht)
- [Edmiston — new vs pre-owned yachts](https://www.edmiston.com/superyacht-buying-guide-new-vs-pre-owned-yachts/)
- [NauticAll — flag state guide](https://nauticall.com/choosing-flag-state-for-yacht-registration/)
- [European Commission — private boats VAT FAQ](https://taxation-customs.ec.europa.eu/document/download/fa095d6b-45dd-4c7a-94c7-bad21d0473a9_en)
- [YPI Crew — 2026 salary guide](https://www.ypicrew.com/yacht-crew-salary-guide)
- [Lighthouse Careers — captain salary 2026](https://www.lighthouse-careers.com/blog/yacht-captain-salary-2026-complete-guide-to-market-rates-benefits/)
- [Foreland Marine — owner's representative insights](https://forelandmarine.com/insights/what-is-a-yacht-owners-representative)
- [Foreland Marine — refit cost insights](https://forelandmarine.com/insights/how-much-does-a-superyacht-refit-cost)
- [Harneys — BVI/Cayman SPV structuring](https://www.harneysfiduciary.com/insights/structuring-special-purpose-vehicles-spvs-in-bvi-and-cayman/)
- [Knight Frank Wealth Report 2026](https://www.knightfrank.com/research/reports/wealthreport)
- [BOAT International — Global Order Book 2026](https://www.boatinternational.com/boat-pro/global-order-book/global-order-book-2026-report)
- [Stephenson Harwood superyachts insights](https://www.shlegal-superyachts.com/insights)
- [Spear's about](https://spearswms.com/about/)
- [Discovered Labs — AI citation patterns](https://discoveredlabs.com/blog/ai-citation-patterns-how-chatgpt-claude-and-perplexity-choose-sources)
- [Beamtrace — LLM ranking factors 2026](https://beamtrace.com/blog/llm-ranking-factors-how-llms-rank-content-2026)
- [Wellows — Google AI Overviews ranking factors](https://wellows.com/blog/google-ai-overviews-ranking-factors/)
- [ALM Corp — AIO citation drop from top-10](https://almcorp.com/blog/google-ai-overview-citations-drop-top-ranking-pages-2026/)
- [Positional — author schema](https://www.positional.com/blog/author-schema)
- [AISO Hub — article schema 2026](https://aiso-hub.com/insights/article-schema-markup/)
