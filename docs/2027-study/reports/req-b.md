# Required changes FOR-033 to FOR-056: report (b)

Date: 14 November 2026. Edits: docs/2027-study/edits/req-b.json (39 edits, dry run passes). Status: docs/2027-study/req-status-b.json.

## Summary

| Status | Rows |
|---|---|
| Done | 033, 036, 037, 040, 041, 042, 043, 044, 045, 046, 047, 048, 053, 054 |
| Done (qualified) | 035, 055 |
| Already fixed | 034, 038, 039, 049, 050, 051, 052, 056 |
| Rejected / Author | none |

## EU ETS (FOR-040 to 042)

Primary sources:

- The Commission FAQ (updated 24 November 2025) says the system has covered cargo and passenger ships of 5,000 GT and above since 2024, with offshore ships of 5,000 GT and above added from 2027.
- Allowances are surrendered by 30 September of the following year: 40 percent of 2024 emissions in 2025, 70 percent of 2025 emissions in 2026, and 100 percent from 2027.
- Commission Guidance Document 1, s.2.2.2, defines scope as voyages "for transporting for commercial purposes cargo or passengers", regardless of flag or class. The listed exemptions are warships, naval auxiliaries, fishing vessels, ships not propelled by mechanical means and government ships in non-commercial use. Yachts are not mentioned.

So tonnage and commercial carriage together decide coverage. Nothing in published guidance turns on yacht "classification". The reviewer's "depends on vessel classification" wording was therefore not adopted.

Fixed in the following places: the ch08 essay, chart 08.02 in lib/charts.tsx (standfirst, caption, the 110m row note, source), the ch08 data spread, the glossary eu-ets entry and the yacht-vat tool page (FAQ and section). The chart was the worst case: its caption said "Sail yachts at every size band sit below", and its standfirst gave surrender years with no emissions years.

Sailing Yacht A is 143 m and about 12,600 GT, from the builder's press release (Nobiskrug, 3 February 2017). It is now cited as the counter-example.

Not verified: the July 2026 Commission proposal (400 to 5,000 GT from 2031) is outside these rows and was left as written.

## Other points for the author

- **FOR-047.** The independence test now asks for a counterparty list "published or in writing on request". This applies the written-disclosure decision and matches the colophon's actual practice. The colophon itself said "publishes" and "on request" in the same sentence; it now says "keeps ... and provides on request". Please confirm this is the standard you want.
- **FOR-048.** The print colophon in app/print/page.tsx still carried the ITIC GBP 500,000 PI item. It has been removed to match the web colophon. The ch09 "GBP 1 million" example has been replaced with how limits are set.
- **FOR-055.** The "To be appointed" placeholders have been removed from both colophons; no names were added. Question: is a fact checker or proofreader to be named before print? The print imprint masthead also still carries dated notes ("Picture editor engaged June 2026", "External pass scheduled August 2026").
- **FOR-035.** EUR 410,000 is now described as the value of the settled claims. The text says the account does not separate cash from remedial work. Replace this with the split if the files give it.

## Sources

- https://climate.ec.europa.eu/areas-action/transport-decarbonisation/reducing-emissions-shipping-sector/faq-maritime-transport-eu-emissions-trading-system-ets_en
- https://climate.ec.europa.eu/document/download/31875b4f-39b9-4cde-a4e2-fbb8f65ee703_en?filename=policy_transport_shipping_gd1_maritime_en.pdf
- https://eur-lex.europa.eu/eli/reg/2023/957
- https://www.germannaval.com/fileadmin/user_upload/gnyk/news-press/NOBISKRUG_Press_Release_SY_A_20170203_EN.pdf
- https://neste.com/en-us/products-and-innovation/neste-my-renewable-diesel
