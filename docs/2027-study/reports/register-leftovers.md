# Register leftovers: items settled by research or arithmetic

14 November 2026. Edits: docs/2027-study/edits/register-leftovers.json (20 edits; `apply-edits.py --dry-run` passes). Nothing applied, committed or pushed. Guest answers and ch05 essay paragraphs 1 to 3 are untouched.

## 1. Hein Velema, "first president of SYBAss"

**Decision: changed to "founding president of SYBAss" in all five places.**

Velema's own published bios use "founding president". His consultancy profile at Marstrat says he was "founding president of the international Super Yacht Builders Association (SYBAss)". Worth Avenue Yachts' release of 2 June 2015 also calls him "founding president of Super Yacht Builders Association". The contemporary report of the launch lists a different president. Sail-World (26 September 2007) says that at the first formal general assembly of SYBAss as a registered association, held in Monaco on 18 September 2007, Michael Breman of Lürssen was President. The same report says the association had then been active for more than a year. Hooning Association Managers says it wrote the business case for a group of shipyards in 2006.

The two accounts fit if Velema led the group before it was registered in 2007 and Breman was the first president elected after registration. That makes "founding president" supported and "first president" unsafe. The register's earlier finding ("not supported; board member only") came from the METSTRADE profile, which now returns a 404 error. It is superseded.

Edits: ch05 essay ("the third risk"), the sections.json contributorRole, the guest-opinions.json contributorRole and intro, and lib/contributors.ts.

Sources:
- https://www.marstrat.nl/people/hein-velema/
- https://www.24-7pressrelease.com/press-release/407580/industry-icon-hein-velema-joins-worth-avenue-yachts
- https://www.sail-world.com/-37834
- https://hooning.nl/our-portfolio/

## 2. The Italian Sea Group

**Decision: corrected the debt figure and added the outcome.**

"Debts of around EUR 400 million" appears in no source. The text now gives two figures, each with its measure and date:
- Overdue liabilities of EUR 266.8 million at 31 May 2026, from the disclosure made at the 1 July filing. That total covers suppliers EUR 77.7m, factoring EUR 99m, banks EUR 42.7m, tax EUR 29.4m and social security EUR 18.2m.
- Negative equity of EUR 392.3 million at 30 June 2026, from the first monthly report to the court (preliminary and unaudited).

Added outcome: on 2 November 2026 the board compared five binding offers. It chose Sri Group Global's EUR 220 million offer for the whole business as the basis of the concordato preventivo (indirect continuity) plan it filed with the Court of Florence. The offer still needs the court's authorisation and faces a further round of bidding. The company expects to sign a lease of the business with the buyer in the first week of December. The court hearing was set for 11 November, and I found no report of its outcome. **Recheck before print.**

Sources:
- https://www.pressmare.it/en/media/press-mare/2026-07-01/tisg-numbers-exposed-eur266-million-debt-reckoning-approaches-91091
- https://www.milanofinanza.it/news/the-italian-sea-group-patrimonio-negativo-per-392-milioni-ma-avanza-la-partita-del-salvataggio-202608051152488168
- https://www.teleborsa.it/News/2026/11/02/tisg-ok-cda-a-concordato-preventivo-in-continuita-aziendale-indiretta-257.html
- https://forbes.it/2026/11/03/the-italian-sea-group-concordato-preventivo-azioni-sospese-sri-group/

## 3. Ya Mon v IYBA

**Decision: replaced "has since resumed" with the dated step.**

MLex reported on 21 July 2026 that Ya Mon Expeditions and the other plaintiffs had filed a second amended complaint against IYBA, YBAA and others. The case is therefore active again in the district court. The ch03 essay now says "in July 2026 the plaintiffs filed a second amended complaint in the district court". The ch03 data-spread row has the same correction. I found no ruling on the second amended complaint.

Sources:
- https://www.mlex.com/mlex/articles/2504086
- https://ktslaw.com/blog/classaction/2026/6/eleventh-circuit-affirms-denial-of-motion-to-compel-arbitration-in-yacht-brokerage-antitrust-class-action
- https://www.brownsims.com/newsroom/news/july-2026-longshore-maritime-update-no-326

## 4. MarineMax / Safe Harbor and Denison / OceanWorld

**MarineMax: updated, still pending.** All required regulatory clearances had been obtained by 31 October (8-K signed 3 November), and closing may not take place before 7 December 2026 without the buyer's consent. Shareholders approved the merger on 11 November 2026 (16,266,303 for, 18,751 against; 8-K of 12 November). Completion is expected by the end of 2026. The essay and the Fraser row of the data spread now state the shareholder approval, and the essay also states the regulatory clearances. **Recheck completion before print.** If the sale has completed by then, both passages should say "was sold".

**Denison: completed.** Denison's own announcement of 13 October 2026 refers to "the completion of its strategic partnership with OceanWorld Group", which is now the majority shareholder. BOAT International (14 October 2026) says OceanWorld became majority shareholder the previous month. The essay and the data spread now read "sold" in place of "agreed to sell".

Sources:
- https://www.sec.gov/Archives/edgar/data/0001057060/000119312526445327/d156320d8k.htm
- https://www.sec.gov/Archives/edgar/data/0001057060/000119312526456673/d138095d8k.htm
- https://www.denisonyachtsales.com/news/patrick-coote-appointed-president-denison-yachting
- https://www.boatinternational.com/denison-yachting-oceanworld-patrick-coote-president
- https://secure.businesswire.com/news/home/20260909660740/en/OneWater-Marine-Inc.-Announces-Strategic-Partnership-with-OceanWorld-Group-and-Denison-Yachting

## 5. ch09 FAQ firm list

**Decision: aligned with ch05 para 55. Removed JMS Yachting, ABL Yachts, KRM Yacht and Saor Alba.**

- **KRM Yacht** is a superyacht refit and rebuild yard in Tuzla, Istanbul, and it is not an owner's representative.
- **JMS Yachting** describes itself as an independent yacht management company that also supervises new builds and refits. The FAQ's own test is independence from management companies, so the description does not fit.
- **ABL Yachts** (ABL Group) lists owner's representation among its survey services. It does not say it is paid only by the owner.
- **Saor Alba**: I found no published material.

None of the four has material that supports "paid only by the owner". "Occam Naval Architecture and Project Management" keeps its longer FAQ name. lib/print-index.ts still lists the four names, but the index only picks up names that appear in the essays, so no change is needed there.

Sources:
- https://www.superyachttimes.com/companies/krm-yacht-refit-repair
- https://www.icomia.org/?p=40549
- https://www.marinebusinessworld.com/news/286724/JMS-Yachting-celebrates-10-years-in-business
- https://marineindustrynews.co.uk/yacht-management-company-expands-to-usa/
- https://abl-group.com/?p=15724

## 6. Numbers

**ch01 "USD 15 to 22 million over five years" (fixed).** The chapter's band is 12 to 15 percent a year: 30 x 0.12 x 5 = 18 and 30 x 0.15 x 5 = 22.5. The old lower bound of 15 was 10 percent a year. The text now reads "USD 18 to 22 million ... at the chapter's 12 to 15 percent a year". The same figure appears twice on the depreciation tool page (FAQ and body), and both are corrected. The USD 9 to 18 million depreciation (30 to 60 percent) already matched the chapter.

**Calculator FAQ, 30 m crew (fixed to the model).** I ran calculateCosts as coded for a 30 m motor yacht in private use in the Western Mediterranean, established age: 5 crew x EUR 56,000 = EUR 280,000 base. Total crew cost:

| Use | One season (EUR) | Two seasons (EUR) |
|---|---|---|
| Light | 389,950 | 460,860 |
| Moderate | 409,448 | 483,233 |
| Heavy | 448,442 | 527,979 |

The FAQ now reads: "In this calculator's model, a 30-metre motor yacht with 5 crew spends about EUR 390,000 to 530,000 a year on total crew costs, from light use on one season to heavy use on two; base salaries are about EUR 280,000 of that." The 50 m figures already in that FAQ check out: EUR 1.04m to 1.40m, 11 crew.

**ch01 cost-composition source line (fixed).** The ch01 data spread and the matching chart (lib/charts.tsx) cited YPI Crew, Quay Crew, Pantaenius and MYBA as if they were the source of the percentage shares. None of them publishes shares. The line now reads: "Practitioner working allocation. The published sources supply inputs, not these shares: crew pay from the YPI Crew 2026 salary guide and the Quay Crew 2025/26 captain survey, insurance market commentary from Pantaenius, and cost categories following MYBA practice." It no longer claims that the shares come from the Foreland archive, because nothing in the text establishes that.

**ch07 role list against "up to 16 crew" (for the author).** The text cannot settle this. The ch07 list covers 40 to 50 m and reaches 14, or 15 with the second engineer it adds above 50 m. Ch08, the ch08 checklist and FAQ, the crew FAQ, the calculator FAQ and the salary page all give 12 to 16 for a 50 m motor yacht in private use, "on the archive figures". Rotation does not explain the gap, because rotating crew are not aboard at the same time and the salary page counts rotation cover separately from its 14 crew. No passage names a 16th post. **Question for the author:** what is the 16th post on a 50 m motor yacht in your archive (for example a second officer, a sous-chef or a seventh interior crew member)? If none, can ch08 and the other pages read 12 to 15?

## Left for the author (as instructed)

- **Crew share 30 to 40 percent (ch01, ch07, salary page).** The book's own figures do not settle it. The ch08 table implies 37 to 45 percent and the calculator 46 to 48 percent, while ch01 is an unsourced practitioner allocation. **Question:** does your archive support 30 to 40 percent, or should it read 30 to 45 percent?
- **ch06 "5 to 15 percent of insured hull value".** This cannot be checked against the per-metre ranges without an insured value, and the book gives none for the refit examples. **Question:** what insured value, or what size and age of yacht, is the range based on?
