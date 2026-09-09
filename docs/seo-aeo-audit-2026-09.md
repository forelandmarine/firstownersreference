# SEO and AEO deep dive: forelandmarine.com and firstownersreference.com

Audit date 9 September 2026. Live-site crawl of both sitemaps (53 URLs on Foreland Marine, 48 on The First Owner's Reference), full head and JSON-LD extraction, internal link graph, resource weight, redirect and robots checks, and eight search-grounded query tests. Everything below was measured against the deployed sites, not the repositories.

## Where the two sites actually stand

The May 2026 strategy assumed both properties were starting close to cold. That is no longer true for either.

Foreland Marine now holds page-one positions for its core commercial terms. On "independent yacht owner's representative superyacht new build" it takes four of the nine results returned, with /insights/the-role-of-an-owners-representative, /owners-representation, /insights, and /insights/what-is-a-yacht-owners-representative all present. It also ranks for running cost, refit cost, crew salary, flag state selection, and the 10 percent rule. The only firms consistently ahead of it are ULTIMAR and superyachtnewbuild.com.

The First Owner's Reference ranks on page one for three of the six anchor queries in the original test set. On the 10 percent rule query /01-reality-of-ownership appears at position four, and the generated answer reproduces the publication's line almost word for word: "Annual running cost on a 40 to 50 metre yacht operated privately at moderate use typically lands at 12 to 15 percent of purchase price, not the folkloric 10 percent." On "first time superyacht buyer guide independent" the homepage appears at position four and the answer summarises the independence position in the publication's own framing. On refit cost /06-refit appears at position three, above Foreland's own article.

That is the wedge working. The framing is being adopted, not just the link.

The gap is narrower and more specific than the strategy anticipated. Every First Owner's Reference page that ranks is a chapter page. Every page that does not rank is one of the three purpose-built tools pages. The cause is in the next section and it is mechanical.

## Estate-level findings

### The three tools pages have no internal links at all

/tools/yacht-vat-2026, /tools/captain-and-crew-salary-2026 and /tools/order-book-tracker receive zero inbound links from any of the 48 pages in the sitemap. Nothing on the site points at them. By contrast /tools/running-cost-calculator has 79 inbound links and /glossary has 122.

None of the three appears for its target query. The VAT query is taken by Mondaq, the Sovereign Group, MamoTCV, PG Legal and the European Commission's own PDF. The crew salary query is taken by Yotspot, Flying Fish, Talent Gurus and, at position seven, Foreland Marine's own article. These are the three pages built specifically to win those queries and they are, in link terms, invisible.

This is the single highest-return fix in the audit. The pages exist, carry Dataset and FAQPage schema, and are well written. They need to be linked from the chapters whose subject matter they extend, from the glossary terms they define, and from the homepage.

### The running-cost calculator is duplicated across both domains

Both sites publish a running-cost calculator with the same H1 ("What does it actually cost to run a superyacht?"), the same four H2 headings in the same order, and the same six FAQPage question names in the same order. Two domains under the same publisher, competing on identical structured data.

Google has already chosen. Foreland's version ranks at position four for "how much does it cost to run a 50m superyacht per year". The First Owner's Reference version does not appear.

The figures also disagree. Foreland's meta description gives EUR 500,000 to EUR 1.5 million annually for a 30 to 50 metre yacht. The First Owner's Reference gives EUR 1.5 to 5 million for a 40 to 50 metre yacht. Chapter 01's FAQ schema gives EUR 4 to 6 million for a 50 metre new-build motor yacht. Across the overlapping 40 to 50 metre band those are three different answers from one publisher, and answer engines weight internal consistency heavily when deciding whether to cite a source.

A decision is needed on which domain owns the calculator. The commit history suggests the intent was already to route this to The First Owner's Reference, but the Foreland page was never retired and it is the one currently winning.

### Entity signals are fragmented

The estate uses three different LinkedIn company URLs and two different personal URLs for the same person:

- linkedin.com/company/forelandmarine (Foreland, 3 references)
- linkedin.com/company/foreland-marine-consultancy (Foreland, 2 references)
- linkedin.com/company/foreland-marine (First Owner's Reference)
- linkedin.com/in/jmacnally (Foreland, 4 references)
- linkedin.com/in/jack-macnally (First Owner's Reference)

sameAs is the primary mechanism by which search engines and language models decide that two mentions are the same entity. Five variants for two entities prevents that consolidation. Pick one company URL and one personal URL and use them identically on both domains.

Related: the Person node for Jack MacNally exists separately on each site (forelandmarine.com/#jack-macnally and firstownersreference.com#jack-macnally) with no sameAs link between them. Adding each site's Person @id to the other's sameAs array is a two-line change that merges the author entity across the estate.

### Cross-domain linking is one-way

The First Owner's Reference links to forelandmarine.com thirteen times. Foreland Marine links to firstownersreference.com once. Foreland is the older, better-ranked domain and is passing almost nothing to the publication. Given both properties now compete for the same head terms, the sensible arrangement is for Foreland's article pages to cite the publication's chapters as the deeper reference, and for the publication to keep its Foreland links confined to the colophon and the owner's-representation service link.

### No hreflang on either site

Not an issue today. It becomes one the day the EN/FR/ES/DE/IT/ZH/RU locale routes ship on The First Owner's Reference. Worth building the alternates map into generateMetadata at the same time as the locale routing rather than retrofitting.

## Foreland Marine

### Confirmed correct

Apex, www, http and https all resolve to https://www.forelandmarine.com. robots.txt and sitemap.xml serve correctly and carry genuine per-page lastmod dates ranging from January to August 2026. Every one of the 53 sitemap URLs has a self-referencing canonical, a unique title, a unique meta description, and exactly one H1. No image is missing alt text. Article, FAQPage, Service, BreadcrumbList, Person, ProfessionalService and WebSite schema are all present where they should be, and speakable is set on the article pages. TTFB is 0.12 to 0.15 seconds, HTML transfers at 16 to 35 KB compressed, JavaScript at roughly 161 KB compressed.

### The /tools title is doubled

The served title is "Digital Tools for Yacht Crews & Managers | Foreland Marine | Foreland Marine", 76 characters. src/app/tools/layout.tsx line 4 writes the brand suffix into the title string, and the root layout's `template: "%s | Foreland Marine"` appends it again. Remove the suffix from the child metadata and let the template do the work.

### Two pages are orphaned

/tools and /technical-consultancy/surveys receive zero inbound internal links from any page on the site. Surveys is declared in src/components/Nav.tsx line 9 but does not appear as an href in the served HTML on any page, so the dropdown is not rendering into the markup crawlers see. The /tools hub is not linked from anywhere at all; the six individual tool pages are linked directly from the footer, bypassing the hub.

Both are in the sitemap. A page in the sitemap with no internal links is a page the crawler is told to value and shown no reason to.

### /newsletters/may-2026 is unfinished

No H1. No JSON-LD of any type, where all 52 other pages carry at least the Organization, WebSite and Person graph. One inbound link. 1,307 words of genuine content with none of the signals attached. If The Foreland Quarter is going to be a quarterly series, this page should carry Article schema with a real datePublished, and /newsletters should carry an ItemList.

### Fourteen pages have no og:image

/about, /refit, /yacht-management, /technical-consultancy, /technical-consultancy/surveys, /contact, /insights, /tools and all six tool pages serve no og:image at all, not even the og-default.png that three other pages use. The insight articles do carry unique images. Social and messaging previews for every service page currently render as a bare link, which matters most for the pages Jack shares directly in business development.

Also, twitter:card is present on some pages and absent on others. It should be set once at the root.

### Metadata length

Sixteen titles exceed 62 characters and will be truncated. Twenty meta descriptions exceed 165 characters, the longest at 296 (/insights/carbon-composite-construction-what-owners-need-to-know). /privacy-policy has a 32-character title and a 51-character description.

Truncation is not a ranking penalty but it costs click-through on the exact commercial pages that convert. The worst offenders by commercial value are /refit (74), /contact (74), /insights/owners-representative-vs-project-manager-vs-broker (75) and /insights/owner-representation-during-yard-selection (75).

### llms.txt is excellent and undiscoverable

/llms.txt is 235 lines and genuinely good: company overview, all five services with URLs, industry statistics, credentials, tools, team, a reference list, categorised insights and an FAQ section. /llms-full.txt and /about/llms-full.txt also return 200.

None of them is referenced in robots.txt or linked from any page's HTML. Add a `Llms: https://www.forelandmarine.com/llms.txt` line to robots.txt and a `<link rel="alternate" type="text/plain" href="/llms.txt">` in the root head. The convention is still informal but discovery costs nothing.

One inconsistency: llms.txt uses non-www URLs throughout (https://forelandmarine.com/yacht-management) while the canonical host is www. They redirect correctly, but an agent following them takes an extra hop and may record the non-canonical form.

### /admin and /login are indexable

Both return HTTP 200, carry no robots meta tag, and are not disallowed in robots.txt. Both also canonicalise to the homepage, which tells a crawler that the homepage is the preferred version of an admin login screen. /pay, /link and /foreland-group are correctly noindexed; /admin, /login and /delete-account are not.

Add /admin and /login to the robots.txt Disallow list and set `robots: { index: false }` on both routes.

### Nothing has been revised since publication

dateModified equals datePublished on all 33 insight articles. The oldest, /insights/mca-large-yacht-code-requirements, is dated 8 January 2026 and covers a regulatory subject. Where an article has genuinely been updated, dateModified should say so; freshness is one of the few signals that reliably moves a cornerstone page.

### LCP images are not prioritised

Neither the homepage hero nor the article heroes carry fetchpriority="high". Both are rendered eagerly by next/image but without the priority flag, so the browser discovers them at normal priority. Adding `priority` to the above-the-fold hero on the homepage and the service pages is a one-word change per component.

## The First Owner's Reference

### Confirmed correct

firstownersreference.com, www.firstownersreference.com, thefirstownersreference.com and www.thefirstownersreference.com all resolve to https://firstownersreference.com. That closes open item 4 from the May strategy. robots.txt and sitemap.xml serve correctly. Every one of the 48 sitemap URLs has a self-referencing canonical, a unique title, a unique description, exactly one H1, and `index, follow` with max-image-preview large and max-snippet -1. No image is missing alt text. /print, /search and the individual /glossary/[slug] routes are correctly noindexed with the consolidation canonicals to /glossary#slug. /studio returns 404 in production.

The JSON-LD is properly architected. A single @graph with stable @ids, Organization as publisher, WebSite with SearchAction, Person nodes for both editors, Article referencing them by @id, BreadcrumbList and FAQPage on every chapter, Dataset on the two data tools. This is better built than most trade publications.

Chapter depth is strong: 3,663 to 7,859 words, with /07-operations the longest.

### Titles are systematically too long

Forty-seven of the 48 pages exceed 62 characters. The longest is /02-reading-the-market/case at 106 characters.

The cause is the template. `"%s | The First Owner's Reference"` costs 30 characters before the page title starts. Case, checklist and Q&A pages add a further `| Chapter 0X` segment, costing 43 characters of the roughly 60 that display. On those pages the distinctive part is also editorial prose with no query language in it:

- "The deal that closed because someone read the market correctly. | Chapter 02 | The First Owner's Reference"
- "The owner who bought twice. | Chapter 01 | The First Owner's Reference"
- "Reading any hull, before any offer. | Chapter 02 | The First Owner's Reference"

Those headlines are good editorially and useless in a result listing. Eighteen pages (nine case, nine checklist) currently have no searchable language in their titles at all.

The chapter pages themselves are fine editorially and just over-long: "Superyacht market 2026: order book, wealth growth, supply | The First Owner's Reference" at 87 characters truncates the brand, not the substance, which is the correct failure mode. The case and checklist pages are the ones to rewrite.

Suggested pattern for the sub-pages: put the query language first and drop the chapter segment. "Pre-purchase survey: what a EUR 2m finding looks like | The First Owner's Reference" reads as editorially as the current version and can actually be found.

### Descriptions are two to four times over length

Twenty-five pages exceed 165 characters. The Q&A pages are the worst: 603 characters on /09-decision-framework/qa/simon-roberts, 570 on jack-inglis, 483 on hein-velema and on the chapter 03 Filippakis piece.

These read as standfirst paragraphs, which is what they are. They are fine as page copy and wrong as meta descriptions; Google will discard them and generate its own snippet, which forfeits control of exactly the framing that is currently winning on the 10 percent rule query. Write a separate 150-character description and keep the standfirst on the page.

### Thirty-eight of 48 pages have no og:image

Only the root and the nine chapter routes have an opengraph-image handler (app/opengraph-image.tsx and app/[slug]/opengraph-image.tsx). Everything else, including all four tools pages, the glossary, /contributors, /press, /colophon, /request-print-edition and all 27 case, checklist and Q&A pages, serves nothing.

For a publication whose distribution plan is LinkedIn-led, this is the wrong 38 pages to have no card image. Adding opengraph-image.tsx at app/[slug]/case/, app/[slug]/checklist/, app/[slug]/qa/[person]/ and app/tools/ covers the great majority of it.

### The glossary structured data omits the definitions

The DefinedTermSet is correctly declared with 50 DefinedTerm entries. Every one of them carries only `name` and `url`. There is no `description` on any term.

The page itself has exactly what the schema needs. The AIS entry, for instance, carries a plain definition followed by "AIS Class A transponders are mandatory on commercial vessels above 300 GT under SOLAS Chapter V Regulation 19." That is precisely the kind of cited, regulator-anchored definition that answer engines lift, and it is currently invisible to structured data.

Adding `description` to each of the 50 DefinedTerm nodes is the cheapest large AEO gain available on either site. The glossary already has 122 inbound internal links, so the page has the authority to carry it.

### Interviewees are absent from the structured data

Eleven Q&A pages carry Article schema whose only authors are Jack MacNally and Daniel Marks. Hein Velema, Pavlos Filippakis, Jack Inglis, Erica Lay, Ollie Davis, Ella Johnson, Simon Roberts and Richard Masters appear nowhere in any JSON-LD, on any page.

Named practitioners on the record is the publication's strongest credibility asset and the hardest thing for a competitor to replicate. It is entirely undeclared. Each Q&A should carry a Person node for the interviewee with jobTitle, worksFor and a sameAs to their LinkedIn profile (the URLs are already in the repository), referenced from the Article as `mentions` or via a `QAPage` with the interviewee as `about`. The /contributors page should carry an ItemList of those same Person @ids.

This also unblocks the first of the four open editorial decisions in the May strategy. The decision needed is narrower than it looked: it is consent to a Person node with a LinkedIn sameAs, not to a byline.

### Case and checklist pages carry no article-level schema

The nine case pages (972 to 1,320 words) and nine checklist pages (325 to 516 words) carry only the site-wide Organization, WebSite and Person graph. No Article, no BreadcrumbList, no datePublished.

The checklists are also structurally isolated: one inbound link each and one outbound internal link each. They are 400-word dead ends. Either give them ItemList schema, breadcrumbs and links back into the relevant chapter sections and glossary terms, or consolidate them into the chapter pages as anchored sections and redirect. Nine thin, unlinked pages of near-identical shape is a pattern that invites a quality assessment nobody wants.

### Dates are wrong and the sitemap says everything changed at once

Every chapter and Q&A page reports datePublished 2026-05-01 and dateModified 2026-05-01. Several of the Q&A pages did not exist on 1 May; the Richard Masters material was drafted on 4 September. The VAT tool page correctly shows 2026-05-04 published and 2026-07-27 modified, so the mechanism exists and is simply not wired to the chapter and Q&A content.

Separately, all 48 sitemap URLs carry an identical lastmod of 2026-09-04T16:12:25.933Z, which is the build timestamp. Foreland's sitemap does this properly with 25 distinct real dates. A sitemap where everything changed at the same millisecond is a sitemap crawlers learn to discount, which is a poor trade for a publication that intends to ship a Q3 supplement and revise chapters between editions.

### Internal link density is below the target

The May plan set 25 to 35 internal links per chapter. Current unique internal link counts: chapter 01 has 11, chapter 02 has 15, chapter 06 has 19, chapter 05 has 21, chapter 09 has 23, chapter 04 has 33, chapter 07 has 40. Chapters 01, 02 and 06 are the ones to work on, and chapter 01 is both the thinnest-linked and the page currently ranking for the anchor query, so it has the most to gain.

The obvious link targets are the ones that are missing: the three orphaned tools pages, and deeper glossary anchors on first use of defined terms.

### No llms.txt

Foreland has one. The publication does not; /llms.txt returns 404. For a property whose entire strategy is answer-engine citation, this is an odd omission. The chapter structure, the glossary, the four tools and the contributor list map onto the format almost directly.

### The flag-state comparison page was never built

/02a-flag-state-comparison was on the May list and does not exist. The Marshall Islands versus Cayman query is currently held by AGPLAW, Superyacht Investor, Affinity, Cursorio and, at position eight, Foreland Marine's own flag-state article. The publication has four flag glossary entries but no comparison page, which is the format that query wants. Given Foreland already ranks there, this one is worth a deliberate decision about which domain takes it rather than building a second competing page.

### Fonts

177 KB of woff2 across five files on every page, the largest at 64.5 and 58.2 KB. Newsreader, Geist and Geist Mono in variable form. That is a real share of the critical path on a text-first site and neither hero image carries fetchpriority="high". Reducing to the weights actually used, or subsetting more aggressively, is worth measuring before the print edition drives traffic in September.

## Priority list

Ordered by return against effort. Items 1 to 6 are all measured in hours.

1. Link the three orphaned First Owner's Reference tools pages from the chapters, the glossary and the homepage. Three pages built to rank, currently unreachable.
2. Add `description` to all 50 glossary DefinedTerm nodes from the existing on-page copy.
3. Fix the Foreland /tools doubled title suffix, and noindex plus disallow /admin and /login.
4. Add Person schema for the eight named interviewees, with LinkedIn sameAs, and reference them from the Q&A Articles and /contributors.
5. Consolidate the LinkedIn sameAs URLs to one company and one personal profile across both domains, and cross-reference the two Jack MacNally Person @ids.
6. Reference llms.txt from Foreland's robots.txt and head, and switch its internal URLs to the www canonical form.
7. Decide which domain owns the running-cost calculator, retire or 301 the other, and reconcile the three conflicting annual cost ranges.
8. Rewrite the 18 First Owner's Reference case and checklist titles to lead with query language, and drop the chapter segment from the template on sub-pages.
9. Write separate short meta descriptions for the 25 over-length First Owner's Reference pages, starting with the eleven Q&A pages.
10. Add opengraph-image handlers for the First Owner's Reference case, checklist, Q&A and tools routes, and og:image for Foreland's fourteen bare pages.
11. Wire real datePublished and dateModified into the First Owner's Reference chapter and Q&A content, and give the sitemap per-page lastmod.
12. Decide the fate of the nine checklist pages: schema and links, or consolidation into the chapters.
13. Add llms.txt to The First Owner's Reference.
14. Bring chapters 01, 02 and 06 up to the internal link target.
15. Add Article schema and an H1 to Foreland's /newsletters/may-2026, and restore the surveys page to the rendered navigation.
16. Add `priority` to the above-the-fold heroes on both sites.

Off-site work is unchanged from the May and July lists and remains the binding constraint on the head terms: the Tier 3 legal thought-leadership pitches, Knight Frank, and Spear's. Nothing in this audit substitutes for those.

## Open questions for Jack

1. Which domain should own the running-cost calculator. The Foreland version currently ranks and The First Owner's Reference version does not, which cuts against the editorial logic of putting the tool with the publication.
2. Which of the three annual running-cost ranges is the house position, so the rest can be corrected to it.
3. Whether the nine checklist pages stay as routes or fold into their chapters.
4. Whether the flag-state comparison is built on the publication, given Foreland already ranks for that query.
5. Consent from the eight interviewees to a Person node with a LinkedIn sameAs. Narrower than the byline-level consent question in the May plan.
