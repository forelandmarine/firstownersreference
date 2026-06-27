export type FaqItem = {
  question: string;
  answer: string;
};

export const chapterFaqs: Record<string, FaqItem[]> = {
  "01-reality-of-ownership": [
    {
      question: "How much does it cost to run a superyacht per year?",
      answer:
        "Annual running cost on a 40 to 50 metre yacht operated privately at moderate use typically lands at 12 to 15 percent of purchase price, not the folkloric 10 percent. On a 50 metre new-build motor yacht that runs to roughly EUR 4 to 6 million per year. Crew is the dominant line at 30 to 40 percent of total operating cost. Maintenance, insurance, berths, fuel, management, and compliance fill the rest. Charter operation, larger size, and older age all push the figure higher. The running cost calculator on this site sizes the picture against MYBA, Pantaenius, and Quay Crew published data.",
    },
    {
      question: "Is the 10 percent rule for yacht ownership accurate?",
      answer:
        "The 10 percent rule, that annual operating cost equals roughly 10 percent of purchase price, is a folkloric figure with no traceable origin. It is roughly correct for new, mid-sized, lightly used yachts, but wrong for most readers of The First Owner's Reference. As the asset depreciates the percentage rises mechanically, since running cost is a function of size and complexity, not residual value. YachtBuyer in published analysis calls the rule at best obsolete or even misleading for older or larger crewed vessels. The honest budgetary figure is 12 to 15 percent for a typical 40 to 50 metre new build privately operated at moderate use.",
    },
    {
      question: "How much does a superyacht depreciate?",
      answer:
        "Year one typically sees 10 to 20 percent decline from purchase price. Years two to five show a further 6 to 8 percent annually, compounding. By year five a typical hull has lost 40 to 50 percent of its original value. The curve flattens after year five. Quality builders such as Feadship, Lurssen, Royal Huisman, Vitters, and Baltic Yachts hold value materially better, with single-digit percentage losses possible after year five. There is no peer-reviewed academic study of yacht depreciation; all published curves are broker-aggregated and self-reported, which is itself a finding.",
    },
    {
      question: "Can charter income offset yacht ownership cost?",
      answer:
        "For the median yacht in the median programme, the arithmetic does not bear out the broker line. BOAT International published case studies show a 48 metre motor yacht at 7 charter weeks per year breaking roughly even on running cost; a 47 metre sailing yacht at 9 weeks losing EUR 444,000; an 85 metre motor yacht at 8 weeks losing EUR 430,000. The successful exception is the disciplined owner-optimised programme willing to release prime-season weeks. Most charter operations subsidise rather than recover ownership cost.",
    },
    {
      question: "How many weeks per year does a yacht owner typically use the boat?",
      answer:
        "Ocean Independence's owner-usage data places typical use at 4 to 8 weeks per year. Committed users reach 12 to 16 weeks. Above that, charter operation is the only economically rational frame, and even charter does not solve the depreciation and fixed-cost problem on its own. The first task before any acquisition is an honest estimate of intended use, tested against the buyer's actual calendar for the next five years. Below 12 weeks of intended use, charter and fractional access cover the same calendar at lower fixed cost.",
    },
  ],

  "02-reading-the-market": [
    {
      question: "How big is the superyacht market in 2026?",
      answer:
        "Knight Frank's Wealth Report 2026 records USD 8.5 billion of yacht transactions in 2025, a 70 percent rise on the prior year. The 2026 BOAT International Global Order Book lists 1,093 yachts of 24 metres and above on order or in build, down from 1,138 in 2025, the second consecutive annual decline by unit count. Average length on the order book has risen to 40.8 metres and 551 GT, the highest ever recorded. Italy is now the dominant production geography at 568 units, 52 percent of the global order book by units.",
    },
    {
      question: "Which yards are sold out for new build superyachts?",
      answer:
        "Top-tier yards are at capacity. Lurssen books extend through mid-2027 at minimum and have absorbed Nobiskrug capacity in 2024 and 2025. Feadship slot availability is openly discussed in trade press as extending to 2028 to 2029. Oceanco delivered the 111 metre DreAMBoat in 18 months in November 2025 as a counter-example. Heesen has run a speculative-build model since 2023 with full backlog through 2025 and beyond. Mid-tier yards have varying capacity. The major decision for a 2026 buyer is whether to take a brokerage hull now, take a slot at a mid-tier yard with capacity, or wait three to four years for a top-tier delivery.",
    },
    {
      question: "Why is the United States driving the 2026 yacht market?",
      answer:
        "Stewart Campbell, Managing Director of BOAT International, identifies the 100 percent depreciation provision in the United States' One Big Beautiful Bill Act as the largest single driver of the 2025 surge. The Knight Frank Wealth Report 2026 places 41 percent of new UHNWIs created in the United States and forecasts the US share rising to 41 percent of the world's UHNW population by 2031. Knight Frank picks up BOAT International's data: US buyers account for up to 50 percent of all yacht transactions and yachts over 70 metres rose 60 percent year on year.",
    },
    {
      question: "How is wealth being created and transferred for yacht buyers?",
      answer:
        "The Knight Frank Wealth Sizing Model places the global UHNWI population (above USD 30 million) at 713,626 in 2026, up 162,191 over five years. Capgemini's World Wealth Report 2025 records USD 83.5 trillion of wealth being inherited by Gen X, millennials, and Gen Z by 2048, with 81 percent of next-generation HNWIs intending to switch from their parents' wealth management firm within one to two years of inheritance. The reader of The First Owner's Reference is therefore typically a newly liquidated principal, or an heir whose first action is to fire the parents' adviser.",
    },
  ],

  "03-how-the-industry-works": [
    {
      question: "Who pays the yacht broker commission?",
      answer:
        "On a brokerage transaction, the seller pays the commission from the sale proceeds, regardless of which broker introduces the buyer. The buyer is not invoiced. The IYBA standard is a flat 10 percent of the sale price; MYBA uses a sliding scale. The structural consequence is that every party introduced through a brokerage is paid contingent on a closed transaction, which shapes incentives. The buyer's structural counterweight is an independent adviser whose income is not contingent on closing.",
    },
    {
      question: "What is dual agency in a yacht transaction?",
      answer:
        "Dual agency is when a single brokerage represents both the buyer and the seller. It is permitted in most jurisdictions provided it is disclosed. The standard MYBA and IYBA agreements include a dual-agency clause that the buyer signs with the central agent. Disclosure beyond that boilerplate, including any retrocession arrangements with introducing parties, is typically not volunteered. Asking is the discipline. Buyers who want clean alignment engage a buyer-side adviser whose only role is the buyer's interest.",
    },
    {
      question: "What is a retrocession in yacht industry?",
      answer:
        "A retrocession is a commission rebate paid quietly between counterparties, typically from a yard, supplier, or management company back to a referring broker, captain, or adviser. Retrocessions are legal in most jurisdictions provided they are disclosed. The structural problem is that disclosure is typically not volunteered. The OnboardOnline legal column has stated the position plainly. Asking each introduced party for written disclosure of every referral relationship and retrocession arrangement is the buyer's protection.",
    },
    {
      question: "Should I trust the captain's recommendation on broker, surveyor, or yard?",
      answer:
        "A captain's recommendation merits the same disclosure question as any other. The captain may have prior commercial relationships with brokers, yards, suppliers, and management companies that continue into employment. The candidate's introduction route, prior commercial relationships, and pay structure (straight salary versus bonus, charter share, or referral-related elements) are all worth establishing in writing before the captain is hired. Captains who agree easily are pleasant in interview; the disciplined candidate asks the difficult questions.",
    },
  ],

  "04-acquisition-process": [
    {
      question: "How long does it take to buy a superyacht?",
      answer:
        "The acquisition window for a brokerage hull is typically 12 to 24 weeks from offer to closing. The right work is done in the first ten weeks: shortlisting from at least two brokerages plus an independent off-market scan, pre-purchase survey by an independently engaged surveyor, sea trial with the buyer's own captain candidate present, and contract drafting under independent counsel. Closing acceleration is the seller's interest, not the buyer's; three weeks of additional due diligence costs nothing and tends to surface issues that save significantly.",
    },
    {
      question: "Do I need a pre-purchase survey before buying a yacht?",
      answer:
        "Yes. A pre-purchase survey by an independently engaged surveyor is a non-negotiable acquisition discipline. Cost on a 40 to 50 metre yacht runs USD 25,000 to 60,000 inclusive of paint specialist and class-society inspector, over four to seven days afloat plus haul-out. Recognised firms include Wolfson Marine, Ward & McKenzie, Patton Marine, and Winterbothams. Renegotiation on every material deficiency the survey finds is standard practice. The seller's most recent survey is not a substitute.",
    },
    {
      question: "What is a Memorandum of Agreement on a yacht sale?",
      answer:
        "The MOA is the binding sale and purchase contract. The MYBA Memorandum of Agreement is the most common form across the Mediterranean and Caribbean markets; the IYBA form is used in the Americas. Key clauses to settle with independent counsel: title warranties, inventory matching the sale, deficiencies remediated or priced, an acceptance protocol with adequate time, governing law clause not the seller's home jurisdiction, and a closing schedule resistant to acceleration. Stephenson Harwood, HFW, Hill Dickinson, Watson Farley, Reed Smith are recognised firms.",
    },
    {
      question: "What flag should I register a private yacht under?",
      answer:
        "Selection depends on four things in combination: compliance, charter intent, financing, and owner residence. Cayman Islands carries the highest reputational weight, REG Category 1 with MCA-equivalent oversight. Marshall Islands offers an open registry with 84 days commercial use under Yacht Engaged in Trade or Private Yacht Limited Charter regimes. Malta is the EU flag of choice for owners who want unrestricted EU charter operation through the reformed lease scheme. Red Ensign Group includes Isle of Man, Bermuda, Gibraltar, BVI, and Cayman in Category 1; Jersey and Guernsey are Category 2 with a 400 GT cap.",
    },
  ],

  "05-new-build-versus-brokerage": [
    {
      question: "Should I buy a new yacht or a brokerage yacht?",
      answer:
        "The threshold tests are: a hold horizon of seven to ten years on paper, an intended use pattern materially specific to the yacht, and commitment to four disciplines (independent owner's representative engaged before contract, specialist shipbuilding counsel, technical due diligence on the yard's order book and financial condition, willingness to push back on the yard's first-draft contract). If a brokerage hull within the search window delivers most of the use case, custom is for the residual that does not match. Below seven years' hold, the new build cost premium does not amortise.",
    },
    {
      question: "What does an owner's representative do on a yacht new build?",
      answer:
        "The owner's representative manages the buyer's interests across yard selection, contract drafting, technical specification, build supervision, milestone inspection, snag-listing, and delivery acceptance. The independence test is whether the representative's income is contingent only on the buyer's instructions, with no yard commission, no broker referral, and no contingent-fee arrangement on closing. SYBAss, the Superyacht Alliance for Professional Standards, IAMI, and GUEST jointly founded the Yacht Owners' Register of Representatives in June 2023 to vet practitioners.",
    },
    {
      question: "What stage payment schedule is typical on a yacht new build?",
      answer:
        "Industry-typical stage payment loading is 50 to 70 percent of contract value before delivery, with the balance paid at delivery and final acceptance. Stage payment loading above 70 percent before delivery sits outside the industry-typical range. Refund guarantee credit quality is the buyer's structural protection: tier-one bank pay-on-demand is the discipline; surety wrappers are weaker. Liquidated damages are typically 1 percent of contract value per week of delay, capped at 5 to 10 percent. Force majeure burden on the yard to prove but-for causation per English law is the practitioner standard.",
    },
    {
      question: "Why is owner-side representation quality a market problem?",
      answer:
        "SYBAss founded the Yacht Owners' Register of Representatives jointly with the Superyacht Alliance, IAMI, and GUEST in June 2023 because owner-side representation quality was structurally inadequate at the world's top yards. Jack Inglis of ULTIMAR has published a case in which a family office CFO acted as deputised owner's representative; the deficiency snag list at delivery ran to 1,200 items against the 100 the family office reported. The structural problem is that brokers, yards, and management companies have established relationships with each other; the unconflicted independent representative is the structural counterweight.",
    },
    {
      question: "How do I check if an owner's representative is on the YOR Register?",
      answer:
        "The Yacht Owner's Representative Register (YORR) is the cross-industry list of vetted owner's representatives. The register table is published by the Superyacht Alliance for Professional Standards at https://superyachtalliance.org/register/register-table/ and is searchable by firm and by named principal. Inclusion requires demonstrated independence from yards, brokers, and management companies; the SYBAss-aligned YORP training, taken either as Unit 40 alone (for practitioners with three or more approved large refit or new build projects) or as the full 200-hour, four-course programme; a CV audit; and a documented track record on builds above 40 metres. Buyers considering an owner's representative can look up the firm and its principals on the register table directly before signing any engagement letter.",
    },
  ],

  "06-refit": [
    {
      question: "How much does a superyacht refit cost?",
      answer:
        "Refit cost runs from 10 to 60 percent of pre-refit market value depending on scope. Mid-life refits at year five to seven typically cover paint, soft furnishings, and selective system upgrades. Full refits at year ten to fifteen include structural and propulsion work and can run 30 to 60 percent of pre-refit value. Empirical overrun against initial budget runs 30 to 50 percent on the opened-up-vessel pattern. A contingency reserve of 15 to 25 percent included in the budget is calm planning. Above 30 percent of pre-refit market value, sale is the standard alternative.",
    },
    {
      question: "When should I refit a yacht versus selling it?",
      answer:
        "If the projected refit cost exceeds 30 percent of the yacht's pre-refit market value, sale is the standard alternative. Below that threshold, refit is the standard path. The calculation is bespoke: strategic fit of the post-refit yacht against the actual continued use case must be tested on paper, alongside the alternative arithmetic of sale, reacquisition of comparable hull, depreciation, transaction cost, and crew continuity loss. The threshold is rough; the decision is the owner's, taken with the independent adviser.",
    },
    {
      question: "Which are the best refit yards for superyachts?",
      answer:
        "Northern European refit specialists include Pendennis (Falmouth), Damen Vlissingen, Royal Huisman (Vollenhove), Lurssen Bremen, and Amico (Genoa). Mediterranean refit yards include MB92 Group (Barcelona and La Ciotat), STP and Astilleros de Mallorca (Palma), Lusben (Viareggio), and Compositeworks (Marseille). Yard slot booking 12 to 18 months ahead is now standard given top-yard demand. Selection is on track record, alignment, and project manager experience, not cheapest quote.",
    },
    {
      question: "What is Spanish Inward Processing Relief for yachts?",
      answer:
        "Spanish IPR (Inward Processing Relief) is the EU customs regime under which a non-EU-flagged yacht can enter Spain for refit work without triggering EU VAT or import duty, provided the yacht is re-exported on completion. The regime is widely used at MB92 Barcelona, STP Palma, and Astilleros de Mallorca. Equivalent regimes exist in France (Commercial Exemption) and Italy. Independent counsel should select the VAT structure for the specific refit scope. Builder's risk insurance with the buyer's interest noted should cover transit between subcontractor sites.",
    },
  ],

  "07-operations": [
    {
      question: "What does a superyacht captain earn in 2026?",
      answer:
        "Per the YPI Crew 2026 salary guide, a captain on a 50 metre yacht earns EUR 10,000 to 16,000 per month. A captain on an 80 metre runs EUR 16,000 to 23,000. Quay Crew's 2025 captain survey records a 7 percent year-on-year increase in the 70 to 79 metre bracket and confirms 63 percent of captains are now on time-for-time rotation. Senior crew are the bottleneck of the industry; their pay continues to rise where junior crew has plateaued. Crew accounts for 30 to 40 percent of total annual operating cost.",
    },
    {
      question: "How many crew does a 50m superyacht need?",
      answer:
        "A 50 metre motor yacht typically carries 12 to 16 crew. A 50 metre sailing yacht carries 9 to 12. Manning levels are set by the flag state's Minimum Safe Manning Certificate, with senior officers requiring Certificates of Competency and STCW endorsements. MLC 2006 governs working hours, accommodation, and contracts. The captain hire compounds with the other operational decisions across the hold period; the candidate hired having pushed back on itinerary, maintenance, budget, and crew during interview is typically the disciplined hire.",
    },
    {
      question: "What insurance does a superyacht need?",
      answer:
        "Hull insurance at 0.7 to 1.5 percent of insured value for a well-maintained 40 to 50 metre yacht. P&I cover for crew injury, environmental liability, third-party, and charter guest claims at EUR 500 million third-party limit through Shipowners' Club or Steamship Mutual. Competitive quotes from at least three of Pantaenius, AON Marine, and Gallagher Specialty before binding. Builder's risk insurance during refit, with the buyer's interest noted and policy covering transit between subcontractor sites.",
    },
    {
      question: "Should I operate my yacht as a charter yacht?",
      answer:
        "Most charter operations subsidise rather than recover ownership cost. The first-year owner benefits from a season or two of private operation before introducing charter. Year four is the practitioner threshold for converting a private-operated yacht to charter; the data of actual use is then in hand. If charter is being considered from year one, work a case based on yacht size, weekly rate, and weeks against the BOAT International published cases. A position on releasing prime-season weeks (mid-July to mid-August in the Mediterranean) is what the published case-study yields rest on.",
    },
  ],

  "08-motor-versus-sail": [
    {
      question: "Is it cheaper to own a sailing yacht than a motor yacht?",
      answer:
        "On a 50 metre yacht at 400 cruising hours per year, the sailing yacht runs EUR 60,000 to 120,000 on annual fuel against EUR 200,000 to 350,000 for the equivalent motor yacht. Crew complement is 9 to 12 on the sailing yacht against 12 to 16 on the motor. Quality sailing yacht builders such as Royal Huisman, Vitters, Baltic, and Perini Navi typically come in 25 to 40 percent below the equivalent motor programme on total seven-year cost (capex plus opex plus depreciation plus residual). The cost shape differs but net annual maintenance is broadly comparable.",
    },
    {
      question: "What is a hybrid superyacht?",
      answer:
        "Hybrid drive combines diesel power with electric motors and a battery hotel-load capability, allowing the yacht to operate at low load on battery power and dock without the generator running. Heesen's FDHF (Fast Displacement Hybrid Format), Sanlorenzo's SX line, and equivalent programmes from Lurssen and Royal Huisman are the production references. Royal Huisman's 580 kWh installation on the sailing yacht Aquarius II is the published battery reference. Hybrid drive sits between motor and sailing on cost and carbon profile.",
    },
    {
      question: "Does the EU ETS apply to private superyachts?",
      answer:
        "EU ETS Maritime applies to commercial vessels above 5,000 GT entering EU ports. Most yachts, including 60 to 80 metre motor, sit below the threshold. Above 5,000 GT (110 metre plus motor) the cost is EUR 200,000 to 400,000 per year at current carbon prices. From 2026 the system covers 100 percent of intra-EU emissions and 50 percent of voyages from a non-EU port. HVO (hydrotreated vegetable oil) is a drop-in diesel replacement at 85 to 90 percent lifecycle CO2 reduction; bunker availability is strongest in the Mediterranean.",
    },
  ],

  "09-decision-framework": [
    {
      question: "What questions should I ask before buying a yacht?",
      answer:
        "The ten questions in chapter nine of The First Owner's Reference are the structural test. Who introduced the yacht and who pays them. Who recommended the lawyer, the surveyor, the management company, and who pays them. Has any party offered services at no cost, and who is paying them. Has every party disclosed their commercial relationships in writing including referral fees, retrocessions, and equity holdings. Is legal counsel independent of the broker, the yard, and the management company. Is the surveyor independent of the seller and broker. Is the owner's representative paid solely by the owner with no contingent fee.",
    },
    {
      question: "How do I find an independent yacht owner's representative?",
      answer:
        "The structural test is independence from yards, brokers, and management companies, with income paid only by the owner and not contingent on a closed transaction. Genuinely independent firms include Foreland Marine, A2B Marine Projects, ULTIMAR, Divergent Yachting, Mariner Technical Services, JMS Yachting, ABL Yachts, KRM Yacht, Saor Alba, and Occam Naval Architecture and Project Management. The Yacht Owners' Register of Representatives, founded 2023 by SYBAss, the Superyacht Alliance, IAMI, and GUEST, is the cross-industry vetting register.",
    },
    {
      question: "How do I know if a yacht adviser is conflicted?",
      answer:
        "If a party in the transaction would walk away from a deal that did not benefit the buyer, they are structurally aligned. If they would not, the relationship is not aligned. The independent adviser, paid only by the buyer, is the party for whom this is structurally true. Brokerages with new build arms (Edmiston, Burgess, Y.CO, Ocean Independence, Camper & Nicholsons, Fraser, Cecil Wright, Moran), yacht management firms extending into new build, and naval architects acting as owner's representatives all carry structural conflicts. Disclosure of the conflict is required; the buyer's response is to weight the advice accordingly.",
    },
  ],
};

export function getChapterFaqs(slug: string): FaqItem[] {
  return chapterFaqs[slug] ?? [];
}
