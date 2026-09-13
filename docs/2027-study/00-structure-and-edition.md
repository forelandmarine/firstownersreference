# Structural findings (edition framing, site, print build)

## Timeline reality
- docs/marketing-plan.md planned print files to printer 21 Aug 2026 for Monaco (23 to 26 Sep 2026). That has not happened; the book is now going to press after Monaco, so first readers hold it from Q4 2026 and through most of 2027.
- print/page.tsx already promises "The next edition is scheduled for September 2027" (imprint note, line ~273) and "Reading the second edition ... September 2027" (line ~768). If this edition is badged 2027, the next becomes the 2028 edition. If it stays 2026, a reader in March 2027 is holding a book that calls itself last year's.

## Edition naming, every place it is set
Print (app/print/page.tsx): title page "1st Edition · 2026" (122); foot "First, September 2026" (155); imprint "1st Edition, 2026" (178); "© 2026" (184, correct if printed in 2026, keep); editors' letter signed "London, September 2026" (334); running head in print.css:100 "1st Edition" (no year, fine).
Web: app/page.tsx (66 "1st Edition · September 2026", 110 "ahead of publication Q4 2026", 126); app/layout.tsx 51, 61; app/opengraph-image.tsx 35; seven tools OG eyebrows "Tools, 1st Edition 2026"; colophon 38, 51, 215-218; press page 64, 73 ("releases September 2026"), 229-250; request-print-edition OG; llms.txt route 22, 111 (citation format "1st Edition (2026)").
Content: sections.json ch02 title "Reading the market in 2026", ch02 standfirst "this year", ch08 standfirst "the case for sail in 2026"; 23 "in 2026" sentences, 3 "this year", 3 "currently", 8 "as of" across content JSON (see dated_sentences.txt, 457 dated sentences in total: lead essays 197, data spreads 125, guest opinions 55, cases 29, FAQs 24, sections 24, checklists 3).

## Already-stale imprint lines (print/page.tsx)
- "External pass scheduled August 2026" (241): past.
- "Picture editor engaged June 2026" (226): reads as history, fine, but check it is true.
- "Three external advisors, named in the second edition" (216), "Designer engaged for the press edition", "Re-set by professional indexer for the press edition" (236), "The 1st Edition is in production. The acknowledgements section will be set in full..." (737): proof-stage placeholders that cannot print in a press edition.

## ISSN
"ISSN pending" in print, colophon and press page. The ISSN is issued against the title and first-issue year. Settling the edition year before the application goes in avoids a registration record that disagrees with the cover.

## Year-stamped URLs
- /tools/yacht-vat-2026, /tools/captain-and-crew-salary-2026, /tools/yacht-insurance-cost-2026.
- GSC 10 Sep 2026: salary-2026 has 452 impressions, position 8.06, 0 clicks. VAT and insurance pages have no rows. Link equity is negligible, so this is the cheapest moment to move them.
- Queries carry years ("global order book 2026" 27 impressions pos 7.5, "boat international global order book 2026", "yacht refit 2026"). Year-in-query demand is real, so the year belongs in the title and H1, not the URL.
- Recommendation: yearless slugs (/tools/yacht-vat, /tools/captain-and-crew-salary, /tools/yacht-insurance-cost) with permanent redirects from the 2026 slugs, titles and H1s carrying "2027", visible "position at" dates, dateModified updated. Then each annual update changes the title, not the URL.

## Print pipeline hazards for a content pass
- Sources section is a Chrome print tipping point (three perturbations each reflowed 120pp to 217pp). Any new source entries must keep valid url fields; A/B the page count after every batch.
- Build refuses to print without embedded Newsreader; check block page count (~120pp healthy) after each rebuild.
- Copy additions will move plates and chapter tails; expect one fit pass after the content pass, not per chapter.
- Studio blocks new em-dashes on save; use it or keep JSON edits dash-free.
