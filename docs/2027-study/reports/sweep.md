# Pass Six: consistency sweep

Date: 14 November 2026. Edits: docs/2027-study/edits/sweep.json (134 edits, dry run clean). The edits are not applied and not committed. They were also applied to a scratch copy: all JSON parses, and every edited .tsx/.ts file transpiles without errors.

## What was checked

All nine chapters were checked against their corrected essays: the case (figures, arithmetic, terms, pull quotes), the checklist, both standfirsts, the sections.json SEO fields, the FAQs and the data spread. I also checked lib/charts.tsx, lib/glossary.ts (all 60 entries), the six tool pages, 09a, app/page.tsx and the colophon. A search for "fail"/"failure" about yards found nothing to change; the only hits are mechanical failures in the ch06 case. app/page.tsx, the crew salary page and the order book tracker needed no change.

## Cases

- **ch03 (arithmetic, C26).** The items came to about GBP 336k, not GBP 400k. "EUR 5.2 m annual contract" also could not stand on a EUR 19m, 38m yacht: as a budget it is 27 percent of value, against 12 to 15 percent in ch01. It is now a managed budget of EUR 2.8m (14.7 percent), and the referral is 10 percent of that budget (ch03 para 19 basis). Working at EUR 1 = GBP 0.85: EUR 280k = GBP 238k; EUR 90k = GBP 76k; EUR 3,750 = GBP 3.2k; 10 percent of EUR 35k = EUR 3.5k = GBP 3.0k. That gives about GBP 320k in year one and about GBP 240k recurring once the one-off repaint is excluded. The title, standfirst, SEO title, paras 4, 5, 10 and 15 and one takeaway were updated. The pull quote attributed to "Chapter 03, lead essay" is not in the essay and was removed.
- **ch09 (decade arithmetic).** The old text double-counted the purchase and treated investments as costs. The price is EUR 22.5m, about USD 25m. Operating cost at 12 to 15 percent for 10 years is USD 30 to 38m. Depreciation to year ten, at 48 to 62 percent on the ch01 curve, is USD 12 to 15.5m. Ownership therefore totals USD 42 to 53m. The charter alternative is USD 12 to 18m: 30 to 40 days is 4.3 to 5.7 weeks a year, at the ch01 48m rate of EUR 250 to 310k a week. The difference is USD 24 to 41m (42 − 18, 53 − 12).
- **ch04.** "Class period was four years" contradicted the case's own five-year survey, so it now says five years. The remediation is spread over the following years, not "three years". The unattributed pull quote was removed because its essay source was cut.
- **ch05.** The Gibbons blockquote is trimmed to the words the essay itself puts in quotation marks. The source page was not found online, so the opening clause stays as the essay's paraphrase. The other figures check out: margin 1.4/1.2 = 117 percent, 40 percent of EUR 13m = EUR 5.2m, and EUR 4.75m is about 90 percent of that.
- **ch02:** the charter "second season" is now "first season under his ownership" (bought in 2025, relisted early 2026). **ch06:** the contingency takeaway now uses the 10 to 25 percent bands. **ch07:** the narrative is untouched. ch01 and ch08 arithmetic checks out (e.g. ch08 cost per week: 3.9 to 4.2m over 7 to 9 weeks gives EUR 433 to 600k).

## Standfirsts and SEO

- ch02: the essay standfirst's "harder to buy correctly, not easier" was replaced by scarce slots and pricing evidence.
- ch03 (sections): now names the written-disclosure standard, and "Said plainly" is cut.
- ch07 (sections): "charter economics that almost never work" now reads "for most yachts it does not".
- ch08 (sections): the unsupported "few first-time buyers" claim was replaced. "Honestly" was dropped from the seoDescription.

ch06 and ch09 already matched their essays. Neither set of standfirsts now contradicts its essay.

## FAQs, checklists, glossary

- **Depreciation** is now 30 to 50 percent by year five, per Yatco and IYC. This is applied in the ch01 FAQ, the ch08 essay (para 45, which still said 30 to 43) and the ch01 essay. The ch01 essay's USD 9 to 13m became 9 to 15m, which is 30 to 50 percent of USD 30m.
- **Stage payments** are now "40 percent or more (WFW); custom well over half, up to 90" in the glossary and the ch05 spread table.
- **Spanish IPR:** the glossary "VAT regime" entry no longer lists it as a purchase route, and the yard list now follows ch06 para 45.
- **Disclosure standard:** applied to the glossary entries for owner's representative, dual agency, retrocession and YORR (where commission is permitted if disclosed). Also applied in the ch03 and ch09 FAQs.
- **"Owner's representative"** is now defined as the same role as the independent adviser.
- **Other glossary fixes:** the "MYBA and IYBA" dual-agency claim now refers to IYBA only (per ch03), the SYBAss eligibility rule and member list are corrected, the OBBBA dates were self-contradictory and are fixed, and the 1,200 snag figure is corrected.
- **Checklists:** six one-line items were corrected (Yacht Hunter, the 40 to 60 day figure, the ch04 intent line, ISM/MLC "where they apply", "empirical", and the HVO figure). None got longer, and ch05 and ch06 are untouched.

## Spreads and charts

- **Lloyd's (ch07).** The 2015 figure is sourced: about GBP 150m of premium, a 140 percent loss ratio and about GBP 210m of claims (SuperyachtNews, 10 Aug 2018, https://superyachtnews.com/business/lloyds-superyacht-insurance-market-shakeup-underway). The essay now attributes it and adds the 2017 figure from the BOAT International piece already cited. "5 percent of premium profitable 2011 to 2017" appears only in an index teaser on russell.co.uk that I could not open, and it may describe marine business as a whole. It was cut from the essay and the insurance page. The spread caption had dated the 2017 losses to the 2022 hardening; it now places them before the 2018 to 2019 hardening.
- **Hull-rate chart cut.** The chart showed 0.7 to 1.25 percent, a 79 percent rise, with no published basis, so it is removed from the spread and from charts.tsx. The table already gives the cycle from named sources.
- **Depreciation chart.** The unsourced "quality builder" line is removed.
- **Other chart captions.** The captain chart's "7 percent year on year" is corrected to "since 2023". The UHNWI chart's standfirst no longer makes the narrowing-supply argument. The ch08 50m cost chart and table totals are relabelled "lines shown", because they exclude management, compliance and contingency. Without that, crew read as about half of the budget, against 30 to 40 percent in ch01.
- **Spread fixes:**
  - ch07 US charter regime: the passenger rule is the Passenger Vessel Services Act (46 U.S.C. 55103), not the Jones Act.
  - ch06: the roundtable source is BOAT International's February 2026 roundtable, not The Superyacht Group's.
  - ch08: Perini Navi is removed from the builders list, and Capgemini's "top-three" is now "major".
  - ch03: the regulator caption, the Littlejohn line, and "Most" changed to "Many" family offices.
  - ch09: the unsourced superlative is cut, and the 2026 UBS count is 307.

## App pages

- **Depreciation tool:** curve, FAQs, share card and sources rewritten to Yatco/IYC; the 60m charter case is now the Hill Robinson concept; the unsourced 55 to 65 percent Italian retention claim is cut.
- **Insurance tool:**
  - The AIG figure is now dated 2019.
  - Gallagher's 4 to 7.5 percent is removed, because it is not a yacht figure.
  - The broker wording follows ch07, with commission disclosed.
- **Running-cost calculator:**
  - Crew share corrected from 40 to 50 percent to 30 to 40.
  - Contingency corrected to 6 to 10 percent.
  - Sail saving corrected to 15 to 30 percent.
  - The FAQ hull rate is now the book's 0.7 to 1.5 percent.
  - The model hull rate, which sat below that band at 0.5 to 0.6 percent, is now 0.7/0.8. This changes calculator output by roughly EUR 40 to 70k a year at 50m.
  - The calculator's own 50m figure (EUR 2.3 to 2.8m) is labelled as the Christie-calibrated model.
- **VAT tool:** the Maltese guidelines are dated 12 March 2020, not February 2019 (KPMG Malta, Ganado).
- **09a:** element 1 now follows the disclosure standard, "rounding error" became 0.4 to 2 percent, and the closing generalisation is cut.
- **Register name** corrected in 09a and the colophon. **Glossary share card** count corrected: 60 entries.

## Left for the author

The colophon answers five of the six independence elements. Element 5, professional indemnity, is missing. Whether to publish the publisher's PI level is a disclosure decision, not a research question, so I have not drafted it.
