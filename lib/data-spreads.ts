export type DataSpreadBlock =
  | { type: "h2"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "table";
      caption?: string;
      head: string[];
      rows: string[][];
      sourceLine?: string;
    }
  | {
      type: "kv";
      caption?: string;
      rows: { label: string; value: string; note?: string }[];
      sourceLine?: string;
    }
  | { type: "note"; text: string }
  | { type: "chart"; chartId: string };

export type DataSpread = {
  slug: string;
  title: string;
  standfirst: string;
  blocks: DataSpreadBlock[];
  sources: { label: string; line: string; url?: string }[];
};

export const dataSpreads: Record<string, DataSpread> = {
  "01-reality-of-ownership": {
    slug: "01-reality-of-ownership",
    title: "Annual operating cost as a percentage of capex, by size band.",
    standfirst:
      "The 10 percent rule is folklore. The empirical band is 8 to 20 percent; size, age, use intensity, and charter activity set the position. Numbers aggregated from named published sources and a Foreland archive of more than 30 managed projects.",
    blocks: [
      { type: "h2", text: "The cost-of-ownership band" },
      {
        type: "table",
        caption:
          "Annual operating cost as a percentage of original capex, by size and intensity. Mid-points of practitioner working ranges; widen by 2 to 4 points for charter operation.",
        head: [
          "Size band",
          "Light use",
          "Moderate use",
          "Heavy use",
        ],
        rows: [
          ["30 to 40 m, year 1 to 5", "8 to 10 percent", "10 to 13 percent", "13 to 15 percent"],
          ["40 to 50 m, year 1 to 5", "10 to 12 percent", "12 to 15 percent", "15 to 18 percent"],
          ["50 to 60 m, year 1 to 5", "11 to 13 percent", "13 to 16 percent", "16 to 19 percent"],
          ["40 to 50 m, year 6 to 10", "12 to 14 percent", "14 to 17 percent", "17 to 20 percent"],
          ["Above 60 m, all years", "13 to 16 percent", "16 to 19 percent", "19 to 22 percent"],
        ],
        sourceLine:
          "Foreland Marine project archive, cross-referenced against Fraser, Ocean Independence, and YachtBuyer published guidance.",
      },
      { type: "chart", chartId: "operating-cost-by-size-band" },
      { type: "h2", text: "Where the money goes, on a typical 50 m" },
      {
        type: "kv",
        caption:
          "Indicative composition of annual operating cost on a 50 m motor yacht at moderate use. Crew is the largest line, not fuel.",
        rows: [
          { label: "Crew salaries and benefits", value: "30 to 40 percent" },
          { label: "Maintenance and repair", value: "14 to 18 percent" },
          { label: "Insurance", value: "10 to 14 percent" },
          { label: "Berths and marina fees", value: "8 to 12 percent" },
          { label: "Fuel", value: "8 to 12 percent", note: "Higher on charter-active hulls" },
          { label: "Management fees", value: "3 to 5 percent" },
          { label: "Class and flag compliance", value: "2 to 3 percent" },
          { label: "Provisioning, comms, owner travel, contingency", value: "10 to 15 percent" },
        ],
        sourceLine:
          "YPI Crew 2026 salary guide, Quay Crew 2025 captain survey, Pantaenius market commentary, MYBA standard cost categories.",
      },
      { type: "chart", chartId: "cost-composition-50m" },
      { type: "h2", text: "Depreciation, year by year" },
      {
        type: "table",
        caption:
          "Indicative depreciation curve for a typical hull, drawn from broker-aggregated data. Quality builders (Feadship, Lurssen, Royal Huisman, Vitters, Baltic) hold value materially better after year five.",
        head: ["Year", "Cumulative loss from purchase", "Marginal annual loss"],
        rows: [
          ["1", "10 to 20 percent", "10 to 20 percent"],
          ["2", "16 to 28 percent", "6 to 8 percent"],
          ["3", "22 to 35 percent", "6 to 8 percent"],
          ["5", "33 to 48 percent", "5 to 7 percent"],
          ["7", "40 to 55 percent", "3 to 5 percent"],
          ["10", "48 to 62 percent", "2 to 4 percent"],
        ],
        sourceLine:
          "Yatco, IYC, Yacht Hunter broker-aggregated curves. No peer-reviewed academic study exists.",
      },
      { type: "chart", chartId: "depreciation-curve" },
      { type: "h2", text: "Charter, four worked cases" },
      {
        type: "table",
        caption:
          "Net charter contribution against annual running cost for four worked cases on the published BOAT International record. Most charter operations subsidise rather than recover ownership cost.",
        head: ["Yacht", "Weekly rate", "Weeks", "Net result"],
        rows: [
          ["48 m motor", "EUR 250 to 310 k", "7", "Break-even (EUR 1.59 m income, EUR 1.58 m cost)"],
          ["47 m sail", "EUR 110 to 125 k", "9", "EUR 444 k loss"],
          ["85 m motor", "EUR 850 to 950 k", "8", "EUR 430 k loss"],
          ["60 m, owner-optimised", "EUR 220 to 260 k", "12", "Up to EUR 2 m net positive"],
        ],
        sourceLine: "BOAT International published case studies.",
      },
      { type: "chart", chartId: "charter-cases-2025" },
      {
        type: "note",
        text: "Run your own numbers using the running cost calculator. Source assumptions are named on every line.",
      },
    ],
    sources: [
      {
        label: "BOAT International, Global Order Book and case studies",
        line: "Stewart Campbell, MD, on the One Big Beautiful Bill Act as the principal driver of the 2025 transaction surge.",
      },
      {
        label: "Knight Frank Wealth Report 2026",
        line: "USD 8.5 bn 2025 transactions, 70 percent year on year rise, US 45 to 50 percent of transactions.",
        url: "https://www.knightfrank.com/wealthreport",
      },
      {
        label: "YPI Crew 2026 salary guide",
        line: "Captain pay EUR 10 to 16 k per month on 50 m; EUR 16 to 23 k on 80 m.",
      },
      {
        label: "Quay Crew Superyacht Captain Salary & Leave Report 2025/26",
        line: "367 captains surveyed; 7 percent year-on-year pay rise in the 70 to 79 m bracket; 63 percent on time-for-time rotation; 62 percent admit to working during rotational leave.",
        url: "https://quaygroup.com/blog/superyacht-captain-salary-leave-report-2025-26/",
      },
      {
        label: "YachtBuyer, How Much Does a New Yacht Cost to Run? And Why the 10 Percent Rule Doesn\u2019t Add Up",
        line: "Calls the 10 percent rule \u201cat best, obsolete or even misleading\u201d for older or larger crewed vessels.",
        url: "https://www.yachtbuyer.com/en/advice/how-much-does-a-new-yacht-cost-to-run",
      },
      {
        label: "Foreland Marine project archive",
        line: "More than 30 managed refit and operating projects, anonymised and aggregated.",
        url: "https://www.forelandmarine.com",
      },
    ],
  },

  "02-reading-the-market": {
    slug: "02-reading-the-market",
    title: "Order book and yard capacity through 2030.",
    standfirst:
      "Wealth creation has accelerated; order-book unit count has contracted for the second consecutive year; top-tier yards are sold out. The supply-side picture to hold in mind before any broker conversation.",
    blocks: [
      { type: "h2", text: "Wealth creation, five-year change" },
      {
        type: "kv",
        caption: "UHNWIs (net wealth above USD 30 m), Knight Frank Wealth Sizing Model.",
        rows: [
          { label: "Global UHNWIs, 2021", value: "551,435" },
          { label: "Global UHNWIs, 2026", value: "713,626" },
          {
            label: "New UHNWIs, 2021 to 2026",
            value: "162,191",
            note: "89 individuals per day, every day, for five years",
          },
          { label: "United States share, 2021", value: "33 percent" },
          { label: "United States share, 2026", value: "35 percent" },
          { label: "United States share, 2031 forecast", value: "41 percent" },
          { label: "India UHNWI population, 2026", value: "19,877" },
          { label: "India UHNWI population, 2031 forecast", value: "25,217" },
          { label: "Saudi Arabia billionaire growth, 5-year forecast", value: "183 percent" },
          { label: "Indonesia UHNWI growth, 5-year forecast", value: "82 percent" },
        ],
        sourceLine: "Knight Frank Wealth Report 2026, 20th edition.",
      },
      { type: "chart", chartId: "uhnwi-2021-2031" },
      { type: "h2", text: "Global order book, 24 m and above" },
      {
        type: "table",
        caption:
          "BOAT International Global Order Book, 2026 edition. Unit count has contracted for the second consecutive year. Average length and tonnage are at record highs.",
        head: ["Metric", "2025 edition", "2026 edition", "Change"],
        rows: [
          ["Yachts on order or in build", "1,138", "1,093", "Down 45 units"],
          ["Average length", "39.6 m", "40.8 m", "Up 1.2 m"],
          ["Average tonnage", "529 GT", "551 GT", "Up 22 GT"],
          ["Italy share, by units", "50 percent", "52 percent", "Up 2 points"],
        ],
        sourceLine: "BOAT International Global Order Book.",
      },
      { type: "chart", chartId: "order-book-2025-2026" },
      { type: "h2", text: "Production geography" },
      {
        type: "table",
        caption: "Top four production countries, 2026 order book.",
        head: ["Country", "Units", "Tonnage", "Note"],
        rows: [
          ["Italy", "568", "Largest by units", "Azimut Benetti ranked first for 26th consecutive year"],
          ["Netherlands", "66", "107,796 GT (second by tonnage)", "Largest average length"],
          ["Turkey", "141", "82,383 GT", "Mid-tier capacity"],
          ["Germany", "18", "78,651 GT", "Concentrated at the very top, smallest unit count"],
        ],
        sourceLine: "BOAT International Global Order Book 2026.",
      },
      { type: "h2", text: "Top-tier yard slot availability" },
      {
        type: "kv",
        caption: "Slot availability is the practical constraint for first-time buyers entering in 2026.",
        rows: [
          { label: "Lurssen", value: "Booked through mid-2027 at minimum" },
          { label: "Feadship", value: "2028 to 2029, Project Solent confirmed for 2027" },
          { label: "Oceanco", value: "Delivered 111 m DreAMBoat in 18 months, Nov 2025 (counter-example of speed)" },
          { label: "Heesen", value: "Speculative-build model since 2023, full backlog through 2025 and beyond" },
          { label: "Damen Yachting", value: "Yacht Support range booked through Q4 2028 / Q1 2029 on certain models" },
          { label: "Sanlorenzo", value: "Order book extends to Q4 2028 / Q1 2029 on SX, SD, and Steel ranges; with Nautor Swan, 4,698 m across 130 yachts" },
          { label: "Azimut Benetti", value: "5,924 m of length under construction across 163 yachts" },
        ],
        sourceLine: "BOAT International, yard published statements, trade press tracking.",
      },
      { type: "h2", text: "Brokerage 2025 in numbers" },
      {
        type: "kv",
        caption: "Brokerage market 2025, by published source.",
        rows: [
          { label: "Total transaction value (BOAT International)", value: "EUR 7.5 bn" },
          { label: "Edmiston house transactions, 2025 market review", value: "Above EUR 2.6 bn; more 40 m+ yachts sold than any other brokerage; more EUR 20 m+ yachts than any competitor" },
          { label: "Denison, 79 ft and above", value: "470 yachts" },
          { label: "Above EUR 40 m asking", value: "7 percent of volume, 52 percent of value" },
          { label: "Median days on market (Denison)", value: "277 (lowest in five-year series)" },
          { label: "Listings that did not sell, average DOM", value: "573 days" },
          { label: "Average price reductions per listing, Q1 2024 to Q1 2025", value: "1.36 down to 0.76" },
          { label: "Average reduction rate, Q1 2024 to Q1 2025", value: "Minus 12.6 to minus 8.97 percent" },
        ],
        sourceLine: "BOAT International, Edmiston Annual Review, Denison Yachting market report.",
      },
      {
        type: "note",
        text: "The Edmiston 30 m+ count of 363 and the Denison broader count of 470 are not comparable. The 30 m+ figure is the relevant one for the readership of The First Owner’s Reference.",
      },
    ],
    sources: [
      {
        label: "Knight Frank Wealth Report 2026",
        line: "20th edition; Wealth Sizing Model; geographic forecasts to 2031.",
        url: "https://www.knightfrank.com/wealthreport",
      },
      {
        label: "Capgemini World Wealth Report 2025, Sail the Great Wealth Transfer",
        line: "USD 83.5 trn inheritance by 2048; 30 percent of HNWIs receive an inheritance by end of 2030, 63 percent by 2035, 84 percent by 2040; 81 percent of next-gen HNWIs intend to switch wealth manager within 1 to 2 years of inheritance.",
        url: "https://www.capgemini.com/wp-content/uploads/2025/06/WWR_2025.pdf",
      },
      {
        label: "BOAT International Global Order Book 2026",
        line: "1,093 yachts on order or in build; second consecutive annual unit-count decline.",
      },
      {
        label: "Edmiston 2025 luxury superyacht brokerage market review",
        line: "Above EUR 2.6 bn in house transactions; more 40 m+ yachts sold than any other brokerage; more EUR 20 m+ yachts than any competitor.",
        url: "https://www.edmiston.com/2025-luxury-superyacht-brokerage-market-review/",
      },
      {
        label: "Denison Yachting market report",
        line: "Days-on-market and price-reduction discipline; 470 yachts in broader 79 ft and above count.",
      },
      {
        label: "SuperYacht Times iQ data",
        line: "Russian ownership share movement, 2022 to 2023; Asia-Pacific fleet growth.",
      },
    ],
  },

  "03-how-the-industry-works": {
    slug: "03-how-the-industry-works",
    title: "Where the money goes in a typical brokerage transaction.",
    standfirst:
      "On a EUR 28 m sale of a 40 m yacht, EUR 1.4 to 2.8 million moves in commissions depending on which of two parallel norms is applied. The buyer almost never knows which is in use. The structure, said plainly.",
    blocks: [
      { type: "h2", text: "The two parallel commission norms" },
      {
        type: "table",
        caption:
          "On a EUR 28 m sale of a 40 m yacht. Both structures are presented as \u201cthe standard\u201d by the brokers using them. They are not the same.",
        head: ["Structure", "Commission base", "Commission paid"],
        rows: [
          ["IYBA / US norm", "Flat 10 percent of gross sale price, paid by the seller", "EUR 2,800,000"],
          [
            "MYBA sliding scale",
            "10 percent on first EUR 10 m, 5 percent on second EUR 10 m, 2.5 percent above",
            "EUR 1,950,000",
          ],
          [
            "Buyer-broker share, typical",
            "4 to 5 percent of gross, paid out of the seller-side pool",
            "EUR 1,120,000 to 1,400,000",
          ],
        ],
        sourceLine:
          "IYBA standard practice; MYBA Memorandum of Agreement; published industry self-criticism (Cromwell Littlejohn, Northrop & Johnson, Palm Beach Boat Show).",
      },
      { type: "h2", text: "Brokerage ownership concentration" },
      {
        type: "kv",
        caption:
          "Independent founder-led houses are now the minority by deal volume. The roll-up is essentially complete.",
        rows: [
          { label: "Camper & Nicholsons", value: "1782 Group; Lai Sun Development; Fincantieri minority since 2015" },
          { label: "Burgess", value: "Ancient (PE, founded 2021) acquired strategic stake October 2025" },
          { label: "Fraser", value: "Inside MarineMax (NYSE: HZO) since 2019" },
          { label: "Northrop & Johnson", value: "Inside MarineMax since 2020" },
          { label: "Denison Yachting", value: "Sold to OneWater Marine (NASDAQ: ONEW) April 2022; merged into OneWater Yacht Group September 2025" },
        ],
        sourceLine: "Public filings; trade press coverage; corporate communications.",
      },
      { type: "h2", text: "Retrocession economy, indicative magnitudes" },
      {
        type: "table",
        caption:
          "Referral fees from supplier counterparties to the introducing broker are not on the broker\u2019s invoice to the owner because the broker is not invoicing the owner. The numbers are not small.",
        head: ["Service", "Typical scope", "5 to 10 percent retrocession"],
        rows: [
          ["Repaint", "EUR 4 m", "EUR 200,000 to 400,000"],
          ["Annual management contract, year one", "EUR 5 m", "EUR 250,000 to 500,000"],
          ["Charter management commission share", "EUR 2 m of charter revenue", "EUR 100,000 to 200,000"],
          ["Insurance broker introduction", "EUR 250 k premium", "EUR 12,500 to 25,000 (per year)"],
        ],
        sourceLine:
          "Practitioner working ranges; OnboardOnline legal column on disclosure rules. Particular firms are not named in this chapter because the practice is industry-wide.",
      },
      { type: "h2", text: "Regulatory coverage" },
      {
        type: "kv",
        caption:
          "There is no financial regulator anywhere in the major jurisdictions that supervises yacht brokerage conduct.",
        rows: [
          { label: "UK Financial Conduct Authority", value: "Does not regulate yacht sales (not a regulated financial instrument)" },
          { label: "UK Maritime and Coastguard Agency", value: "Does not regulate brokerage commissions" },
          { label: "California", value: "Requires explicit dual-agency disclosure" },
          { label: "Florida", value: "Transactional brokerage rules; full agency duties diluted by default" },
          { label: "IYBA Purchase and Sale Agreement", value: "Pre-emptive consent to dual agency" },
          {
            label: "Ya Mon Expeditions LLC v. IYBA et al.",
            value: "Dismissed January 2025 on procedural grounds; pleadings on file",
          },
        ],
        sourceLine: "Public filings; FCA / MCA scope statements.",
      },
    ],
    sources: [
      {
        label: "IYBA Purchase and Sale Agreement",
        line: "Standard contract, dual-agency clause, pre-emptive consent.",
      },
      {
        label: "MYBA Memorandum of Agreement",
        line: "Sliding-scale commission norm.",
      },
      {
        label: "Cromwell Littlejohn (Northrop & Johnson), Palm Beach Boat Show",
        line: "On the record: the system actively rewards opacity.",
      },
      {
        label: "OnboardOnline legal column",
        line: "On disclosure rules and undisclosed payments to captains.",
      },
      {
        label: "Ya Mon Expeditions LLC v. IYBA et al.",
        line: "US District Court for Southern District of Florida; dismissed January 2025 by Judge K. Michael Moore on procedural grounds.",
        url: "https://tradeonlytoday.com/industry-news/judge-dismisses-ya-mon-case/",
      },
    ],
  },

  "04-acquisition-process": {
    slug: "04-acquisition-process",
    title: "VAT regime and flag state comparison.",
    standfirst:
      "Two procedural choices that materially affect a decade of ownership cost, often made under time pressure at closing without proper analysis. The legitimate options on the published record.",
    blocks: [
      { type: "h2", text: "Headline VAT rates on yacht purchase" },
      {
        type: "table",
        caption: "On a EUR 4 m yacht purchased in the listed jurisdiction, default VAT bill at sale.",
        head: ["Jurisdiction", "Standard VAT rate", "VAT on EUR 4 m purchase"],
        rows: [
          ["France", "20 percent", "EUR 800,000"],
          ["Spain", "21 percent", "EUR 840,000"],
          ["Italy", "22 percent", "EUR 880,000"],
        ],
        sourceLine: "National tax authority published rates. Hill Dickinson, Watson Farley & Williams comparative analysis.",
      },
      { type: "chart", chartId: "vat-on-purchase" },
      { type: "h2", text: "Three legitimate alternatives" },
      {
        type: "table",
        caption:
          "Each option has compliance burden. None should be selected on the broker\u2019s preference. Engage your own counsel.",
        head: ["Structure", "Effect", "Conditions"],
        rows: [
          [
            "French Commercial Exemption",
            "VAT eliminated on purchase",
            "Commercial registration; full-time crew; over 15 m; over 70 percent of voyages exit French waters; under 50 percent static charter",
          ],
          [
            "Spanish Inward Processing Relief",
            "21 percent suspended on refit works for non-EU flagged yachts",
            "18 months admission window (extendable to 24); customs-site shipyard; bonded works; re-export",
          ],
          [
            "Maltese leasing scheme",
            "Effective VAT 5.4 to 6.12 percent on yachts above 24 m",
            "Maltese leasing structure; specific payment profile; substance requirements",
          ],
          [
            "Italian leasing",
            "Largely curtailed by EU infringement proceedings",
            "Rarely advisable in 2026",
          ],
        ],
        sourceLine: "Hill Dickinson, Watson Farley & Williams, Ince, Stephenson Harwood, Reed Smith published commentary.",
      },
      { type: "h2", text: "Flag state, dominant choices for 30 m+" },
      {
        type: "kv",
        caption:
          "Cayman and Marshall Islands dominate the over-30 m segment. Choice depends on owner residence, cruising area, charter intent, financing requirements, and the family office\u2019s broader structuring preferences.",
        rows: [
          { label: "Cayman Islands", value: "Red Ensign category 1; large yacht code; charter and private; widely accepted" },
          { label: "Marshall Islands", value: "Open registry; favourable cost; recognised lender jurisdiction" },
          { label: "Malta", value: "EU flag; commercial and private; competitive cost" },
          { label: "Red Ensign Group (UK, IoM, Bermuda, Jersey, Guernsey, BVI, Gibraltar, Anguilla, Montserrat, Turks and Caicos, Falkland Islands, St Helena, Pitcairn)", value: "Common-law jurisdictions; British consular protection" },
        ],
        sourceLine: "Published flag administration scopes. SuperYacht Times registry data.",
      },
      { type: "h2", text: "Annual compliance cost on a 40 m yacht" },
      {
        type: "table",
        caption:
          "Tax compliance, structuring, and flag administration. Recurring opex that does not appear in broker-quoted operating budgets.",
        head: ["Category", "Annual cost"],
        rows: [
          ["Tax compliance and structuring", "EUR 25,000 to 70,000"],
          ["Flag administration and class society fees", "EUR 15,000 to 40,000"],
          ["Owning company maintenance", "EUR 10,000 to 40,000"],
          ["Total", "EUR 50,000 to 150,000"],
        ],
        sourceLine: "Foreland Marine project archive; published yacht law firm fee guidance.",
      },
      { type: "h2", text: "Pre-purchase survey scope, indicative" },
      {
        type: "kv",
        caption: "On a 40 m yacht. The single highest-leverage piece of due diligence in the entire acquisition.",
        rows: [
          { label: "Duration", value: "4 to 7 days afloat plus haul-out" },
          { label: "Total cost", value: "USD 25,000 to 60,000" },
          { label: "Lead surveyor", value: "Independently engaged (not broker-introduced)" },
          { label: "Specialist add-ons", value: "Class society inspector, paint, electrical, mechanical" },
          { label: "Recognised firms", value: "Wolfson Marine, Ward & McKenzie, Patton Marine, Winterbothams" },
        ],
        sourceLine: "Foreland Marine project archive; published surveyor fee scales.",
      },
    ],
    sources: [
      {
        label: "Hill Dickinson",
        line: "Comparative VAT and flag commentary.",
      },
      {
        label: "Watson Farley & Williams",
        line: "Comparative VAT and flag commentary; shipbuilding commentary.",
      },
      {
        label: "Stephenson Harwood",
        line: "Yacht and shipbuilding commentary.",
      },
      {
        label: "Reed Smith",
        line: "Yacht and shipbuilding commentary.",
      },
      {
        label: "Cayman Shipping Registry",
        line: "Large yacht code, vessel registration scope.",
        url: "https://www.cishipping.com",
      },
      {
        label: "MYBA Memorandum of Agreement",
        line: "Standard closing template; deposit and balance terms.",
      },
      {
        label: "Foreland Marine project archive",
        line: "Annual compliance cost ranges across managed projects.",
        url: "https://www.forelandmarine.com",
      },
    ],
  },

  "05-new-build-versus-brokerage": {
    slug: "05-new-build-versus-brokerage",
    title: "Cashflow and milestone payments, year by year.",
    standfirst:
      "Brokerage concentrates capital at closing. New build distributes it across two to five years against milestones whose definition is the most consequential drafting work in the contract. The cashflow shape of each path.",
    blocks: [
      { type: "h2", text: "Brokerage versus new build, capital timing" },
      {
        type: "table",
        caption: "On a comparable 50 m hull. Capital commitment shape differs more than the headline numbers do.",
        head: ["Path", "Time to delivery", "Stage payment shape"],
        rows: [
          ["Brokerage", "6 to 12 weeks", "10 percent deposit, 90 percent at closing"],
          ["Semi-custom new build", "24 to 36 months", "20 to 30 percent at signature, 50 to 70 percent across build, balance at delivery"],
          ["Fully custom new build", "36 to 60 months", "Front-loaded variants common; refund guarantee credit quality material"],
        ],
        sourceLine: "Watson Farley & Williams shipbuilding commentary; Norton Rose Fulbright on refund guarantee terms.",
      },
      { type: "h2", text: "Indicative new build payment schedule, EUR 100 m yacht" },
      {
        type: "table",
        caption:
          "Industry-typical 50 to 70 percent paid before delivery. Aggressive front-loading suggests the yard is short of cash to start the build.",
        head: ["Milestone", "Typical share", "Cumulative"],
        rows: [
          ["Contract signature", "20 percent", "EUR 20 m"],
          ["Steel cutting", "10 percent", "EUR 30 m"],
          ["Keel laying", "10 percent", "EUR 40 m"],
          ["Hull plating complete", "10 percent", "EUR 50 m"],
          ["Engines installed", "10 percent", "EUR 60 m"],
          ["Launch", "10 percent", "EUR 70 m"],
          ["Sea trials passed", "20 percent", "EUR 90 m"],
          ["Delivery", "10 percent", "EUR 100 m"],
        ],
        sourceLine: "Practitioner working schedule; varies by yard and contract template.",
      },
      { type: "h2", text: "Cost premium of new build over comparable brokerage" },
      {
        type: "kv",
        caption: "The premium narrows over the hold. Quality builders hold value materially better than mid-tier brokerage acquisitions.",
        rows: [
          { label: "At entry", value: "30 to 50 percent premium over comparable brokerage hull" },
          { label: "At delivery, 24 to 36 months later", value: "15 to 25 percent premium" },
          { label: "Five years later", value: "Often comparable; quality builders ahead" },
          { label: "Ten years later", value: "Quality new build ahead on residual value" },
        ],
        sourceLine: "Foreland Marine project archive; Yatco, IYC, Yacht Hunter aggregated curves.",
      },
      { type: "h2", text: "Ten contract points where inexperience gets priced" },
      {
        type: "table",
        caption: "A single afternoon\u2019s competent legal review at heads-of-terms saves more than the owner\u2019s representative fee for the entire project.",
        head: ["Point", "Typical position", "Counsel commentary"],
        rows: [
          ["Stage payment loading", "50 to 70 percent before delivery", "Watson Farley & Williams"],
          ["Refund guarantee credit", "Tier-one bank pay-on-demand vs surety wrapper", "Norton Rose Fulbright"],
          ["Liquidated damages cap", "1 percent of contract value per week, capped at 5 to 10 percent", "Hill Dickinson; Triple Point Technology v PTT [2021] UKSC 29"],
          ["Force majeure burden", "Yard must prove \u201cbut for\u201d causation under English law", "Classic Maritime v Limbungan [2019] EWCA Civ 1102"],
          ["Change order procedure", "Defined unit rates; third-party quote rights", "Stephenson Harwood (Sean Gibbons)"],
          ["Defect notification deadlines", "Typically 14 days from discovery", "HFW"],
          ["Warranty length", "Standard 12 months; negotiable to 24", "Practitioner default"],
          ["Cancellation thresholds", "150 days post-delivery / 180 days total", "Jiangsu Guoxin v Precious Shipping [2020] EWHC 1030"],
          ["Title position during construction", "Some yards retain title until delivery", "Feadship cited as retain-title model"],
          ["Dispute forum", "English law; LMAA arbitration", "Practitioner default"],
        ],
        sourceLine: "Hannaford Turner partner Justin Turner; published English-law shipbuilding commentary.",
      },
      { type: "h2", text: "Owner\u2019s representative fee structures, indicative" },
      {
        type: "kv",
        caption:
          "On a EUR 100 m, 36-month new build. Brokers acting as owner\u2019s representatives are typically paid by yard commission of around 5 percent without disclosure to the buyer.",
        rows: [
          { label: "Independent firm, percentage", value: "1 to 3 percent of build cost" },
          { label: "Independent firm, fixed fee", value: "EUR 1 m to EUR 3 m across the build" },
          { label: "Broker acting as owner\u2019s representative", value: "Typically yard commission of around 5 percent (undisclosed to buyer)" },
          { label: "Naval architect acting as owner\u2019s representative", value: "Continuing yard relationship; structurally conflicted" },
        ],
        sourceLine:
          "Practitioner anecdotal range. Major firms (Edmiston, Burgess, Cecil Wright, Y.CO, Moran, Hill Robinson) do not publish fee structures. The lack of published fees across the entire owner\u2019s representative market is itself a finding.",
      },
    ],
    sources: [
      {
        label: "SYBAss, IAMI, GUEST: YORP launch July 2023; YORR launch November 2024",
        line: "Yacht Owner\u2019s Representative Programme and Register, administered by the Superyacht Alliance for Professional Standards. First pilot course 24 to 28 July 2023 at Benetti Yachts Livorno.",
        url: "https://sybass.org/news/raising-the-game-yacht-owner-representative-course/",
      },
      {
        label: "Watson Farley & Williams",
        line: "Published shipbuilding contract commentary.",
      },
      {
        label: "Norton Rose Fulbright",
        line: "Published shipbuilding contract commentary; refund guarantee credit quality.",
      },
      {
        label: "Hill Dickinson",
        line: "Published shipbuilding contract commentary.",
      },
      {
        label: "HFW (Holman Fenwick Willan)",
        line: "Published shipbuilding contract commentary.",
      },
      {
        label: "Stephenson Harwood",
        line: "Published shipbuilding contract commentary; Sean Gibbons on change order procedure.",
      },
      {
        label: "Triple Point Technology v PTT [2021] UKSC 29",
        line: "Liquidated damages cap behaviour.",
        url: "https://www.bailii.org/uk/cases/UKSC/2021/29.html",
      },
      {
        label: "Classic Maritime v Limbungan [2019] EWCA Civ 1102",
        line: "Force majeure causation under English law.",
        url: "https://www.bailii.org/ew/cases/EWCA/Civ/2019/1102.html",
      },
      {
        label: "Jiangsu Guoxin v Precious Shipping [2020] EWHC 1030",
        line: "Cancellation threshold behaviour.",
        url: "https://www.bailii.org/ew/cases/EWHC/Comm/2020/1030.html",
      },
      {
        label: "Jack Inglis (ULTIMAR), Superyacht Investor",
        line: "Owner\u2019s representative on risk and the cost of inadequate oversight during construction.",
        url: "https://www.superyachtinvestor.com/opinion/jack-inglis-owners-representative-risk-superyacht/",
      },
      {
        label: "Winch Design Limited v Le Souef [2025] EWHC 120 (Comm)",
        line: "UK High Court, January 2025: Carl Le Souef personally liable for GBP 733,750 in unpaid invoices on the 222 m Project Somnio.",
        url: "https://www.bailii.org/ew/cases/EWHC/Comm/2025/120.html",
      },
    ],
  },

  "06-refit": {
    slug: "06-refit",
    title: "Refit yard capacity and typical overrun curve, 2026 to 2028.",
    standfirst:
      "The 30 to 50 percent overrun is the empirical expectation, not a project management failure. Capacity at dominant yards is tightening into a sellers' market for the first time in a decade. The numbers to plan against.",
    blocks: [
      { type: "h2", text: "Refit cost benchmarks, per metre per year" },
      {
        type: "table",
        caption: "Practitioner working ranges across more than 30 managed refit projects.",
        head: ["Scope", "EUR per metre per year", "On a 50 m yacht"],
        rows: [
          ["Annual maintenance", "2,000 to 8,000", "EUR 100,000 to 400,000"],
          ["Mid-life refit", "10,000 to 30,000", "EUR 500,000 to 1.5 m"],
          ["Major structural refit", "40,000 to 100,000+", "EUR 2 m to 5 m+"],
        ],
        sourceLine: "Foreland Marine project archive. Yard rate cards (MB92, Pendennis) are not published.",
      },
      { type: "chart", chartId: "refit-cost-per-metre" },
      { type: "h2", text: "Five-year survey or major refit, indicative" },
      {
        type: "kv",
        caption: "A useful rule: if projected refit cost exceeds 30 percent of pre-refit market value, sale is usually the better decision.",
        rows: [
          { label: "Five-year survey or major refit cost band", value: "5 to 15 percent of insured hull value" },
          { label: "Mediterranean berth fees during refit, 40 m", value: "EUR 400 to 800 per day" },
          { label: "Northern Europe berth fees during refit, 40 m", value: "EUR 600 to 1,200 per day" },
          { label: "Mediterranean skilled labour", value: "EUR 45 to 75 per hour; specialists EUR 80 to 120" },
          { label: "Northern Europe skilled labour", value: "20 to 40 percent above Mediterranean" },
        ],
        sourceLine: "Foreland Marine project archive. Practitioner working ranges.",
      },
      { type: "h2", text: "The overrun pattern" },
      {
        type: "table",
        caption: "Industry consensus is that refit projects routinely run 30 to 50 percent over original quoted scope.",
        head: ["Project quality", "Typical overrun", "Notes"],
        rows: [
          ["Well-managed at competent yard, experienced rep", "10 to 20 percent", "The achievable target"],
          ["Industry typical", "30 to 50 percent", "The empirical expectation"],
          ["Poorly-managed", "60 to 100 percent or more", "Dockwalk: 600 percent overrun on a 1967 C&N refit"],
        ],
        sourceLine:
          "Industry consensus across trade press and practitioner commentary. Dockwalk documented the extreme case.",
      },
      { type: "h2", text: "Practitioner contingency reserves" },
      {
        type: "kv",
        caption: "Reserves built into refit budgets reflect the empirical overrun pattern.",
        rows: [
          { label: "Known scope", value: "10 to 15 percent contingency" },
          { label: "Opened-up vessel", value: "15 to 20 percent" },
          { label: "First-time-opened older hull", value: "20 to 25 percent" },
        ],
        sourceLine: "Foreland Marine project archive; practitioner consensus.",
      },
      { type: "h2", text: "Two yard models" },
      {
        type: "table",
        caption:
          "Full-service yards take the project as a single contract. Service yards (also called marina yards) provide the facility while the owner contracts the trades directly through the project manager. The right model depends on representation strength and project scope.",
        head: ["Model", "Examples", "Cost shape", "Best for"],
        rows: [
          [
            "Full-service",
            "MB92, Pendennis, Lusben, Astilleros de Mallorca, Amico & Co, Rybovich, Bradford Marine, Front Street Shipyard",
            "Single contract; integration risk priced in",
            "Owners with lighter representation; complex multi-trade scope",
          ],
          [
            "Service / non-full-service",
            "STP Palma, Lauderdale Marine Center (LMC), Marina Port Vell (Barcelona)",
            "Facility billed; trades contracted directly",
            "Experienced project management; line-item visibility",
          ],
        ],
        sourceLine:
          "Practitioner working knowledge; yard published service models.",
      },
      { type: "h2", text: "Dominant refit yards, by geography" },
      {
        type: "kv",
        caption:
          "Top yards typically booked 12 to 24 months ahead for major refits. Geography is concentrated in four clusters: Western Mediterranean, Northern Europe, Eastern Mediterranean, and the US Eastern Seaboard.",
        rows: [
          {
            label: "MB92 Group (Barcelona, La Ciotat)",
            value:
              "Dominant Western Med full-service operator. Owns paint specialist GYG. Acquired by Squircle Capital, late 2024.",
          },
          {
            label: "Astilleros de Mallorca (Palma)",
            value:
              "Reference Spanish full-service yard. 78,000 sq m, 1,700 t haul, 120 m outfitting quay, over 250 yachts per year.",
          },
          {
            label: "STP Palma (Servicios T\u00e9cnicos Portuarios)",
            value:
              "Largest non-full-service refit facility in the Western Mediterranean by yacht throughput. Service yard model; owners contract trades directly.",
          },
          {
            label: "Marina Port Vell (Barcelona)",
            value: "Mixed full-service and service-yard provision; OneOcean group ownership.",
          },
          {
            label: "Monaco Marine (Saint Mandrier, Beaulieu, Antibes, La Ciotat)",
            value:
              "French full-service operator across multiple sites. Strong on the 30 to 60 m segment.",
          },
          {
            label: "IMS Shipyard (La Seyne sur Mer, Toulon)",
            value: "French full-service yard, 220 m drydock, recently expanded.",
          },
          {
            label: "Lusben (Viareggio / Livorno)",
            value:
              "Reference Italian full-service yard for large hulls. 210 m dry dock, 2,000 t syncrolift, 150 t travel lift. Livorno expanded with a 2,400 t syncrolift in 2024 to 2025.",
          },
          {
            label: "Amico & Co (Genoa)",
            value:
              "Italian full-service yard; strong reputation on superyacht refit, paint, mechanical work.",
          },
          {
            label: "Cantiere Rossini (Marina di Carrara)",
            value: "Italian yard scaled into superyacht refit capability over the past decade.",
          },
          {
            label: "Pendennis Shipyard (Falmouth, UK)",
            value:
              "UK full-service yard. Around 18 projects in 2024 against annual average of 10; particularly strong on sailing yacht refit.",
          },
          {
            label: "Damen Shipyards (Vlissingen, Netherlands)",
            value: "Full-service refit alongside new build at Dutch sites.",
          },
          {
            label: "Lurssen Refit (Germany)",
            value: "German full-service refit for the largest yachts.",
          },
          {
            label: "RMK Marine (Tuzla, Istanbul)",
            value:
              "Turkish full-service yard, capacity to around 80 m. Strong practitioner reputation on cost.",
          },
          {
            label: "Bilgin Yachts (Tuzla, Istanbul)",
            value: "Builder with refit capability on its own and third-party hulls.",
          },
          {
            label: "Rybovich (West Palm Beach, Florida)",
            value:
              "Reference US full-service yard for large-yacht refit, repaint, mechanical work. Acquired by Safe Harbor Marinas.",
          },
          {
            label: "Lauderdale Marine Center (Fort Lauderdale)",
            value:
              "Largest yacht refit facility on the US East Coast by throughput. Service yard model.",
          },
          {
            label: "Bradford Marine (Fort Lauderdale, Grand Bahama)",
            value: "US full-service refit, repaint, mechanical.",
          },
          {
            label: "Derecktor Shipyards (Fort Pierce, Florida)",
            value:
              "Full-service yard expanded substantially over the past five years; large haul-out capacity on the US East Coast.",
          },
          {
            label: "Roscioli Yachting Center (Dania Beach, Florida)",
            value:
              "Mid-tier US full-service yard, particularly strong on the 30 to 50 m segment.",
          },
          {
            label: "Merrill-Stevens Dry Dock (Miami)",
            value: "Historic US full-service yard recently rebuilt and expanded.",
          },
          {
            label: "Front Street Shipyard (Belfast, Maine)",
            value:
              "Reference US Northeast yard for high-quality refit and new builds up to roughly 60 m.",
          },
          {
            label: "Newport Shipyard (Newport, Rhode Island)",
            value:
              "Full-service refit on Narragansett Bay; particularly active during the New England racing season.",
          },
          {
            label: "Lyman-Morse (Thomaston, Maine)",
            value: "Builder and refit yard; strong on sailing and composite hulls.",
          },
          {
            label: "Hodgdon Yachts (East Boothbay, Maine)",
            value: "Builder with refit capability on the largest US-built sailing yachts.",
          },
          {
            label: "Jarrett Bay Boatworks (Beaufort, North Carolina)",
            value:
              "Refit and repaint yard; strong on sportfish and motor yachts under 40 m.",
          },
        ],
        sourceLine:
          "Yard published statements; Superyacht Group 2025 expert roundtable (paywalled); BOAT International coverage; practitioner working knowledge.",
      },
      { type: "h2", text: "Quality specifications, what \u201csuperyacht standard\u201d should mean" },
      {
        type: "table",
        caption:
          "Disciplined refit specifications cite the manufacturer data sheet and the relevant ISO standard. The phrase \u201csuperyacht standard\u201d does not appear in a contract that has been written.",
        head: ["Element", "Reference standard", "Practitioner figure"],
        rows: [
          [
            "Paint dry film thickness (DFT)",
            "Awlgrip / Alexseal manufacturer data sheets",
            "Topcoat 75 to 125 microns per coat; system 200 to 450 microns",
          ],
          [
            "Paint application conditions",
            "Manufacturer data sheets, controlled atmosphere",
            "18 to 29\u00b0C ambient; RH below 80 percent; surface 3\u00b0C above dew point",
          ],
          [
            "Drying and recoat windows",
            "Awlcraft 2000, Awlgrip Awlbrite, Alexseal manufacturer tables",
            "Min and max recoat hours specified at given temp and humidity",
          ],
          [
            "Shipboard vibration",
            "ISO 6954:2000; ISO 20283-5",
            "mm/s RMS at relevant frequency band, plus engine manufacturer figures (MTU, CAT, MAN, Rolls-Royce, ZF)",
          ],
          [
            "Noise levels, master cabin underway",
            "ISO 6954; IMO MSC.337(91)",
            "45 to 50 dB(A) at design cruising speed",
          ],
          [
            "Whole-body vibration, occupied spaces",
            "ISO 2631",
            "Below 0.315 m/s\u00b2 RMS at master cabin",
          ],
          [
            "HVAC duct velocity in occupied spaces",
            "ISO 7547; Heinen & Hopman, Westmar, Drews Marine data sheets",
            "Below 2.5 to 3.0 m/s; agreed air change rates",
          ],
          [
            "Stabiliser noise and isolation",
            "Quantum, Naiad, ABT-TRAC, Veem manufacturer data sheets",
            "dB(A) at equipment; isolation mount specification agreed",
          ],
          [
            "Substrate preparation, steel",
            "ISO 8501-1 cleanliness; manufacturer profile guidance",
            "Sa 2.5 cleanliness; 50 to 75 micron surface profile",
          ],
        ],
        sourceLine:
          "Awlgrip / Alexseal published technical data sheets; ISO standards (6954:2000, 20283-5, 2631, 7547, 8501-1); IMO MSC.337(91) noise code; engine and equipment manufacturer technical data.",
      },
      { type: "h2", text: "Spanish IPR, the VAT economics of refit" },
      {
        type: "kv",
        caption:
          "On a EUR 5 m refit, the saving from properly executed Spanish Inward Processing Relief is approximately EUR 1.05 m. Available at customs-site shipyards including STP Palma, Astilleros de Mallorca, MB92, and other Spanish yards.",
        rows: [
          {
            label: "Mechanism",
            value:
              "Non-EU flagged yacht enters under temporary admission; works at customs-site shipyard; 21 percent VAT suspended; re-exported",
          },
          {
            label: "Admission window",
            value: "18 months, extendable to 24 under bonded conditions",
          },
          {
            label: "Eligible yards",
            value:
              "MB92 Barcelona, Astilleros de Mallorca, STP Palma, Marina Port Vell, several smaller Spanish yards",
          },
          {
            label: "Compliance burden",
            value: "Customs site, bonded works, documentation, re-export evidence",
          },
        ],
        sourceLine: "Spanish customs administration scope; published yacht law firm guidance.",
      },
    ],
    sources: [
      {
        label: "Future Market Insights",
        line: "Global refit market sized at USD 2.9 bn in 2025, supporting roughly 6,000 active vessels.",
      },
      {
        label: "Foreland Marine project archive",
        line: "More than 30 managed refit projects, anonymised and aggregated.",
        url: "https://www.forelandmarine.com",
      },
      {
        label: "Superyacht Group 2025 expert roundtable",
        line: "Manuel Di Tillio (Amico & Co), Gianni Paladino (Lusben), Txema Rubio (MB92). Paywalled.",
      },
      {
        label: "Dockwalk",
        line: "600 percent overrun on a 1967 Camper & Nicholsons refit (extreme case).",
      },
      {
        label: "Awlgrip technical data sheets",
        line: "Paint DFT specifications, application conditions, recoat windows.",
        url: "https://www.awlgrip.com",
      },
      {
        label: "Alexseal technical data sheets",
        line: "Paint DFT specifications, application conditions, recoat windows.",
        url: "https://www.alexseal.com",
      },
      {
        label: "International Organization for Standardization (ISO)",
        line: "ISO 6954:2000 (vibration), ISO 20283-5, ISO 2631 (whole-body vibration), ISO 7547 (HVAC), ISO 8501-1 (substrate preparation).",
        url: "https://www.iso.org",
      },
      {
        label: "IMO MSC.337(91)",
        line: "Code on Noise Levels on Board Ships.",
        url: "https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.337(91).pdf",
      },
      {
        label: "Hill Dickinson, Watson Farley & Williams",
        line: "Spanish IPR mechanism; comparative refit VAT structures.",
      },
    ],
  },

  "07-operations": {
    slug: "07-operations",
    title: "Crew salary bands and insurance market commentary.",
    standfirst:
      "Crew is 30 to 40 percent of annual operating cost on a typical 50m, the largest single line by some distance. Hull insurance has stabilised; the post-Bayesian response was tightening on crew qualifications, not blanket rate rises.",
    blocks: [
      { type: "h2", text: "Captain pay, by yacht size" },
      {
        type: "table",
        caption:
          "Captain pay rises with size. Quay Crew records 7 percent year-on-year growth in the 70 to 79 m bracket; 63 percent of captains are now on time-for-time rotation.",
        head: ["Yacht size", "Captain pay (EUR per month)"],
        rows: [
          ["20 to 24 m", "Around 6,000"],
          ["30 to 40 m", "8,000 to 12,000"],
          ["40 to 50 m", "10,000 to 14,000"],
          ["50 to 60 m", "10,000 to 16,000"],
          ["70 to 79 m", "14,000 to 20,000 (up 7 percent year on year)"],
          ["80 m and above", "16,000 to 23,000"],
          ["100 to 119 m", "Over 25,000"],
        ],
        sourceLine:
          "YPI Crew 2026 salary guide; Quay Crew 2025 captain survey; Erica Lay (EL Crew Co) on senior-captain package premiums.",
      },
      { type: "chart", chartId: "captain-pay-by-size" },
      { type: "h2", text: "Crew structure, by yacht size" },
      {
        type: "kv",
        caption: "Numbers scale roughly linearly with size to 70 m and grow faster as operational complexity expands.",
        rows: [
          { label: "40 to 50 m", value: "8 to 12 crew" },
          { label: "50 to 60 m", value: "12 to 18 crew" },
          { label: "60 to 70 m", value: "18 to 25 crew" },
          { label: "80 m and above", value: "25 to 35 crew" },
        ],
        sourceLine:
          "Practitioner standard staffing; YPI Crew, Quay Crew commentary; Erica Lay (EL Crew Co) on senior-crew specialism and rotation expectations.",
      },
      { type: "h2", text: "Compliance cost on a 40 m yacht" },
      {
        type: "kv",
        caption:
          "ISM, MLC, flag administration, class society fees, and the management company\u2019s compliance services. Recurring cost that does not appear in broker-quoted operating budgets.",
        rows: [
          { label: "Annual compliance cost band", value: "EUR 80,000 to 200,000 per year" },
          { label: "Frameworks", value: "ISM (above 500 GT); MLC (commercial operation)" },
          { label: "Recognised management firms", value: "Hill Robinson, Burgess, Y.CO, Doehle, Moran, Edmiston, C&N, Fraser" },
        ],
        sourceLine: "Foreland Marine project archive; published management company fee guidance.",
      },
      { type: "h2", text: "The five lines of cover, on a typical large yacht" },
      {
        type: "table",
        caption:
          "An over-30 m programme typically carries five distinct lines of insurance, each separately underwritten. The right broker secures the right structure on each.",
        head: ["Line", "Covers", "Typical premium", "Underwriting market"],
        rows: [
          [
            "Hull and machinery",
            "Loss or damage to the yacht itself; agreed value rebuild basis is the disciplined structure",
            "0.7 to 1.5 percent of insured value (40 to 50 m well-maintained); 2 to 5 percent for smaller yachts and hurricane-exposed regions",
            "Lloyd\u2019s syndicates (CNA Hardy, Beazley, Brit, AIG, Liberty, Tokio Marine HCC, MS Amlin); AXA, Allianz, Generali",
          ],
          [
            "P&I (protection and indemnity)",
            "Crew injury, environmental damage, third-party liability, charter guest claims",
            "Per crew member basis; cover routinely written to EUR 500 m third-party limit",
            "Shipowners\u2019 Club, Steamship Mutual",
          ],
          [
            "War risk",
            "Per-voyage cover for transit through war-risk regions",
            "0.05 to 2 percent of hull value per voyage, region-dependent",
            "Lloyd\u2019s war risk syndicates",
          ],
          [
            "Builder\u2019s risk",
            "Loss or damage during refit or new build construction",
            "Taken out by yard with owner\u2019s interest noted; cost embedded in yard contract",
            "Specialist marine builder\u2019s risk underwriters",
          ],
          [
            "Charter operation cover",
            "Uplift on hull and P&I to reflect commercial use",
            "Embedded in primary policies; charter management company co-ordinates",
            "Same hull and P&I markets, with charter rider",
          ],
        ],
        sourceLine:
          "Lloyd\u2019s of London syndicate guidance; published broker structuring commentary; practitioner working ranges.",
      },
      { type: "h2", text: "The major brokers, by relevance to over-30 m" },
      {
        type: "kv",
        caption:
          "Howden and Pantaenius are the two largest yacht-specialist brokers in the over-30 m segment globally. The trade-offs below are the structural differences buyers should understand at selection.",
        rows: [
          {
            label: "Howden",
            value:
              "London-based; consolidated significant yacht-specialist capacity through acquisitions; strong Lloyd\u2019s access; capability for complex programmes (multiple hulls, charter, aviation overlap). Best fit for sophisticated structures.",
          },
          {
            label: "Pantaenius",
            value:
              "Hamburg-founded 1899; reference European yacht-specialist broker; deep service capability and loss-management track record; yacht-only frame. Best fit for European-domiciled owners and Med-centred programmes.",
          },
          {
            label: "AON Marine",
            value:
              "Yacht practice within broader marine and corporate insurance; integrates with wider risk programmes (family office, aviation). Best fit where the principal\u2019s overall risk programme is already with AON.",
          },
          {
            label: "Gallagher Specialty",
            value:
              "Strong US East Coast yacht practice; hurricane-region underwriting; access to US syndicate markets. Best fit for US-domiciled owners and US-cruising fleets.",
          },
          {
            label: "Marsh",
            value:
              "Largest broker by global revenue; specialty marine teams handle yacht business; capability for the largest hulls (above 100 m) requiring bespoke structuring. Best fit for the very top of the segment.",
          },
          {
            label: "Specialist alternatives",
            value:
              "Norton & Co, J&H Marsh, AXA Marine, YachtSure, Northstar, and a small number of yacht-only houses. Underwriting markets accessed are similar to the larger brokers; selection at this level is mostly relationship-based.",
          },
        ],
        sourceLine:
          "Practitioner working knowledge; published broker capability statements.",
      },
      { type: "h2", text: "Underwriting structure, three points that move at claim time" },
      {
        type: "kv",
        caption:
          "The broker accesses the underwriters; the underwriting is what pays at claim time. The three points below are the most consequential drafting choices.",
        rows: [
          {
            label: "Agreed value vs actual cash value (ACV)",
            value:
              "Agreed value: insurer pays the figure agreed in advance in a total loss. ACV: insurer pays depreciated market value. Premium difference small; claim difference can be tens of millions.",
          },
          {
            label: "Rebuild basis vs market value",
            value:
              "A 50 m yacht with EUR 18 m market value may have EUR 28 m rebuild cost. Insuring at market value leaves the owner short on rebuild after a constructive total loss.",
          },
          {
            label: "Annual policy review",
            value:
              "Itinerary changes (US East Coast addition, charter introduction, new cruising area) trigger different coverage. Re-quoting prior-year policy is materially different from a proactive review.",
          },
        ],
        sourceLine:
          "Howden, Pantaenius, AON published structuring commentary; Lloyd\u2019s underwriting guidance.",
      },
      { type: "h2", text: "Hull rate movement, 2022 to 2026" },
      {
        type: "table",
        caption:
          "The hardened market that opened in 2022 reflected Lloyd\u2019s underwriting losses (GBP 232.8 m losses against GBP 150.1 m of premium in 2017; 75 percent of 69 yacht-writing syndicates unprofitable). The market remembers.",
        head: ["Period", "Hull rate movement", "Note"],
        rows: [
          ["2022 to 2023", "Up 50 to 70 percent (London market)", "AIG cited; broad hardening"],
          ["H1 2024", "Stabilised", "Most of the increase had landed by then"],
          ["Q4 2025", "Down 4 to 7.5 percent for clean fleets", "Gallagher Specialty"],
          ["Bayesian sinking, August 2024", "Selective tightening only", "Pantaenius: \u201cmore impact expected than landed\u201d"],
          ["Typical hull rate, 40 to 50 m well-maintained", "0.7 to 1.5 percent of insured value", "Mediterranean / Northern Europe"],
          ["Smaller yachts and hurricane-exposed regions", "2 to 5 percent", ""],
        ],
        sourceLine: "AIG, Gallagher Specialty published commentary; Pantaenius market notes.",
      },
      { type: "chart", chartId: "hull-rate-movement" },
      { type: "h2", text: "War risk premium, 2023 to 2026" },
      {
        type: "table",
        caption: "Per-voyage premium as a percentage of insured hull value. War risk policies are typically purchased per voyage, not annual.",
        head: ["Region", "Pre-October 2023", "Early 2024", "Peak", "Current"],
        rows: [
          ["Red Sea", "0.05 percent", "1 percent", "2 percent", "Elevated"],
          ["Black Sea (Russian ports)", "Standard", "Elevated", "1 percent+", "0.65 to 0.80 percent"],
          ["Ukrainian deep-water ports", "Standard", "Elevated", "1 percent+", "0.45 to 0.55 percent"],
        ],
        sourceLine: "Lloyd\u2019s war risk circular updates; Marsh, Gallagher published commentary.",
      },
      { type: "h2", text: "Charter, four worked cases" },
      {
        type: "table",
        caption:
          "Most charter operations subsidise rather than recover ownership cost. The successful exception depends on disciplined operation and willingness to release the prime weeks.",
        head: ["Yacht", "Weekly rate", "Weeks", "Net result"],
        rows: [
          ["48 m motor", "EUR 250 to 310 k", "7", "Break-even"],
          ["47 m sail", "EUR 110 to 125 k", "9", "EUR 444 k loss"],
          ["85 m motor", "EUR 850 to 950 k", "8", "EUR 430 k loss"],
          ["60 m, owner-optimised", "EUR 220 to 260 k", "12", "Up to EUR 2 m net positive"],
        ],
        sourceLine: "BOAT International published case studies.",
      },
    ],
    sources: [
      {
        label: "YPI Crew 2026 salary guide",
        line: "Captain and senior crew pay bands across yacht size.",
      },
      {
        label: "Quay Crew 2025 captain survey",
        line: "Time-for-time rotation share; year-on-year pay growth in 70 to 79 m bracket.",
      },
      {
        label: "Erica Lay (EL Crew Co, Mallorca)",
        line: "Recruitment-side reading on senior-captain package premiums above guide rates, rotation as price of entry to the senior-crew market, junior-crew expectation gap, and inconsistency from the top as the most common cause of turnover. Places crew across the over-24 metre fleet.",
      },
      {
        label: "Pantaenius (Michelle van der Merwe)",
        line: "On record on the Bayesian sinking and the limited insurance-market response: tighter clauses on crew qualifications and stability rather than blanket rate rises.",
        url: "https://www.boatinternational.com/yachts/news/impacts-of-bayesian-sailing-yacht-sinking-on-superyacht-industry",
      },
      {
        label: "Howden",
        line: "Published broker capability statements; structuring commentary on agreed-value rebuild basis.",
      },
      {
        label: "AON",
        line: "Marine and yacht insurance practice.",
      },
      {
        label: "Gallagher Specialty",
        line: "Published broker commentary on hull rate movement, 2022 to 2025.",
      },
      {
        label: "Marsh",
        line: "Specialty marine practice; large-yacht structuring.",
      },
      {
        label: "Lloyd\u2019s of London",
        line: "Hull and war risk underwriting markets; CNA Hardy, Beazley, Brit, Liberty, Tokio Marine HCC, MS Amlin.",
      },
      {
        label: "AIG",
        line: "On the record on 50 to 70 percent rate increases across 2022 to 2023.",
      },
      {
        label: "BOAT International",
        line: "Charter case studies.",
      },
    ],
  },

  "09-decision-framework": {
    slug: "09-decision-framework",
    title: "From considering ownership to signing a contract.",
    standfirst:
      "Building the team in the order that matters. The independence test, applied transparently. The ten questions before signing anything. The scale of the team-building decision.",
    blocks: [
      { type: "h2", text: "The reader profile, on the published record" },
      {
        type: "kv",
        caption:
          "More wealth has been created in fewer hands than at any point in recorded economic history. The reader of The First Owner’s Reference is one of two profiles.",
        rows: [
          { label: "Global UHNWIs (above USD 30 m), 2026", value: "713,626" },
          { label: "Five-year change", value: "Up 162,191 (89 individuals per day)" },
          { label: "United States share, 2026", value: "35 percent" },
          { label: "United States share, 2031 forecast", value: "41 percent" },
          { label: "Wealth transferred to next generation by 2048", value: "USD 83.5 trn" },
          { label: "Next-gen HNWIs who switch wealth manager within 1 to 2 years of inheritance", value: "81 percent" },
          { label: "Yacht references in UBS Global Family Office Report 2025", value: "Zero, across 80 pages and 317 family offices" },
        ],
        sourceLine:
          "Knight Frank Wealth Report 2026; Capgemini World Wealth Report 2025; UBS Global Family Office Report 2025.",
      },
      { type: "h2", text: "The independence test, six elements" },
      {
        type: "table",
        caption: "Apply to any adviser the reader is considering, including the publisher of The First Owner’s Reference.",
        head: ["Question", "Pass", "Fail"],
        rows: [
          ["Earn anything contingent on transaction closing?", "No", "Yes"],
          ["Equity, employment, or referral relationship with yards, brokers, suppliers, management or charter operations?", "No", "Yes"],
          ["Publish a complete list of every counterparty worked with in the past three years, with relationship?", "Yes", "No"],
          ["Fees transparent and quoted in writing in advance?", "Yes", "No"],
          ["Hold professional indemnity insurance appropriate to the transaction?", "Yes", "No"],
          ["Principals named, traceable, and accountable?", "Yes", "No"],
        ],
        sourceLine: "The First Owner’s Reference. Publisher\u2019s own answers are set out on the colophon.",
      },
      { type: "h2", text: "Building the team, in priority order" },
      {
        type: "table",
        caption:
          "The order in which the buyer hires the team determines the quality of every subsequent decision. Most first-time buyers hire in the wrong order.",
        head: ["Order", "Role", "Priority engagement"],
        rows: [
          ["1", "Independent adviser", "Before any broker, captain, or management company"],
          ["2", "Yacht lawyer", "Specialist shipbuilding and yacht counsel; Hill Dickinson, WFW, Ince, Stephenson Harwood, Reed Smith, HFW, Norton Rose Fulbright"],
          ["3", "Surveyor", "Per-deal once a shortlist exists; Wolfson Marine, Ward & McKenzie, Patton Marine, Winterbothams"],
          ["4", "Captain candidate (or build captain on new build)", "Hired through routes independent of the broker"],
          ["5", "Yacht management company", "Engaged on acquisition decision; independent of the broker"],
          ["6", "Insurance broker", "Once flag and operating profile determined; Pantaenius, AON, Gallagher"],
        ],
        sourceLine: "Foreland Marine practitioner framework.",
      },
      { type: "h2", text: "Cost of the team, on a USD 30 to 50 m acquisition" },
      {
        type: "kv",
        caption:
          "On a transaction of this size, this is a rounding error. Owners who economise on it save tenths of a percentage point to lose multiples of a percentage point in the asset itself.",
        rows: [
          { label: "Independent adviser, year one", value: "USD 80,000 to 250,000" },
          { label: "Yacht lawyer, acquisition only", value: "USD 50,000 to 200,000" },
          { label: "Pre-purchase survey", value: "USD 25,000 to 60,000" },
          { label: "Captain hire process", value: "USD 5,000 to 25,000 (recruitment fees)" },
          { label: "Management company onboarding, year one", value: "USD 30,000 to 80,000" },
          { label: "Insurance broker fee structure", value: "Brokerage embedded in premium; typically no separate fee" },
          { label: "Total team cost, year one", value: "USD 200,000 to 600,000" },
        ],
        sourceLine: "Foreland Marine practitioner working ranges.",
      },
    ],
    sources: [
      {
        label: "UBS Global Family Office Report 2025",
        line: "317 family offices; USD 1.1 bn AUM average; no yacht references across 80 pages.",
        url: "https://www.ubs.com/content/dam/assets/wma/static/documents/ubs-gfo-report.pdf",
      },
      {
        label: "Capgemini World Wealth Report 2025",
        line: "USD 83.5 trn inheritance by 2048; 81 percent next-gen switch wealth manager within 1 to 2 years.",
        url: "https://www.capgemini.com/insights/research-library/world-wealth-report",
      },
      {
        label: "Knight Frank Wealth Report 2026 / Family Office Survey 2026",
        line: "First reference to superyachts in the family office portfolio architecture.",
        url: "https://www.knightfrank.com/wealthreport",
      },
      {
        label: "Foreland Marine project archive",
        line: "Team-cost ranges across managed projects.",
        url: "https://www.forelandmarine.com",
      },
    ],
  },

  "08-motor-versus-sail": {
    slug: "08-motor-versus-sail",
    title: "Motor versus sail, by the numbers.",
    standfirst:
      "Trade press treats the choice as taste; the data treats it as structural. Market share, operating cost, environmental footprint, and the racing market that supports value retention at the top of the segment.",
    blocks: [
      { type: "h2", text: "Market share, on the published record" },
      {
        type: "kv",
        caption:
          "Sail is a smaller share of the market by every published count. Skewed by Italian volume yards (motor-dominant) and the strong American 30 to 50 m motor market.",
        rows: [
          {
            label: "BOAT International Global Order Book 2026",
            value: "Sail roughly 12 percent of units, motor roughly 88 percent",
          },
          {
            label: "Active over-30 m fleet (C&N / SuperYacht Times)",
            value: "Sail roughly 18 percent",
          },
          {
            label: "Major sail builders",
            value: "Royal Huisman, Vitters, Baltic Yachts, Perini Navi, Wally, Pendennis, Nautor Swan",
          },
          {
            label: "Major motor builders",
            value: "Lurssen, Feadship, Oceanco, Heesen, Sanlorenzo, Azimut Benetti, Codecasa, CRN",
          },
        ],
        sourceLine:
          "BOAT International Global Order Book 2026; SuperYacht Times iQ data.",
      },
      { type: "h2", text: "Operating cost, 50 m comparable" },
      {
        type: "table",
        caption:
          "Indicative annual operating cost, 50 m at moderate use (8 to 10 weeks family use). Practitioner working ranges; motor figure on Mediterranean operation, 400 cruising hours.",
        head: ["Cost line", "50 m motor", "50 m sail"],
        rows: [
          ["Fuel", "EUR 200 to 350 k", "EUR 60 to 120 k"],
          ["Crew (12 to 16 motor / 9 to 12 sail)", "EUR 1.6 to 2.2 m", "EUR 1.2 to 1.7 m"],
          [
            "Maintenance and repair",
            "EUR 600 to 900 k",
            "EUR 500 to 800 k (plus rigging / sail wardrobe)",
          ],
          ["Insurance", "EUR 350 to 550 k", "EUR 280 to 450 k"],
          ["Berths and marina fees", "EUR 280 to 420 k", "EUR 280 to 420 k"],
          ["Total annual operating cost", "EUR 3.0 to 4.5 m", "EUR 2.3 to 3.5 m"],
        ],
        sourceLine:
          "Foreland Marine project archive; YPI Crew 2026 salary guide; aggregated published practitioner ranges.",
      },
      { type: "chart", chartId: "operating-cost-50m-motor-vs-sail" },
      { type: "h2", text: "Capital and depreciation, 35 m comparable" },
      {
        type: "kv",
        caption:
          "On a new build 35 m hull from a quality builder. The cost differential at entry is 20 to 35 percent in favour of sail. Depreciation curves favour quality sail hulls after year five.",
        rows: [
          { label: "New build 35 m sail (Pendennis, Vitters, Baltic)", value: "EUR 12 to 22 m" },
          { label: "New build 35 m motor (top tier comparable)", value: "EUR 18 to 30 m" },
          { label: "Sail capital differential at entry", value: "20 to 35 percent" },
          {
            label: "Sail depreciation, top builders, after year 5",
            value: "Single-digit percent annually",
          },
          {
            label: "Motor depreciation, top builders, after year 5",
            value: "5 to 8 percent annually",
          },
        ],
        sourceLine:
          "Foreland Marine project archive; Yatco, IYC, Yacht Hunter aggregated curves.",
      },
      { type: "h2", text: "Environmental footprint and EU ETS exposure" },
      {
        type: "table",
        caption:
          "EU Emissions Trading System Maritime extension, in force from 1 January 2024, applies to ships of and above 5,000 gross tonnage calling at EEA ports. Compliance is phased: 40 percent of 2024 emissions paid in 2025, 70 percent of 2025 emissions paid in 2026, 100 percent from 2027. Methane and nitrous oxide added from 2026.",
        head: ["Yacht profile", "Typical GT", "EU ETS exposure"],
        rows: [
          ["60 m motor", "700 to 1,200 GT", "Below threshold"],
          ["80 m motor", "2,000 to 2,800 GT", "Below threshold"],
          ["90 m motor", "Around 5,000 GT", "Borderline; some inside"],
          ["110 m+ motor", "Above 5,000 GT", "Inside, EUR 200 to 400 k per year on current carbon prices"],
          ["50 m sail", "300 to 600 GT", "Below threshold"],
          [
            "Annual carbon footprint, 50 m sail vs 50 m motor",
            "Comparable use",
            "Sail roughly 60 to 70 percent below motor",
          ],
        ],
        sourceLine:
          "EU Commission FAQ on EU ETS for maritime transport; Royal Huisman published sustainability commentary; IMO 2023 GHG Strategy (MEPC 80).",
      },
      { type: "chart", chartId: "eu-ets-exposure" },
      { type: "h2", text: "Brokerage market, sail vs motor" },
      {
        type: "kv",
        caption:
          "2025 brokerage market data. Sail yachts in the 25 to 45 m band move at meaningfully shorter days-on-market than comparable motor.",
        rows: [
          {
            label: "Median days on market, sail 25 to 45 m, 2025",
            value: "Approximately 220 days",
          },
          {
            label: "Median days on market, motor 25 to 45 m, 2025",
            value: "277 days (Denison series)",
          },
          {
            label: "Racing-pedigree premium on RORC-podium sail hulls",
            value: "10 to 25 percent over comparable cruising hull",
          },
          {
            label: "J Class hold value pattern",
            value: "Hold-forever asset; closed-class racing supports residuals",
          },
        ],
        sourceLine:
          "Denison Yachting market report 2025; broker-aggregated practitioner commentary.",
      },
      { type: "chart", chartId: "days-on-market-sail-vs-motor" },
      { type: "h2", text: "Two 2025 reference points in the segment" },
      {
        type: "kv",
        caption:
          "Reference points on the published trade press record, cited as markers of segment health rather than as specific market signals.",
        rows: [
          {
            label: "Edmiston / Nautor Swan partnership, Palm Beach, March 2025",
            value:
              "New alloy sailing yacht range designed by Malcolm McKeon Yacht Design; Edmiston Newport, Rhode Island, as the operational hub.",
          },
          {
            label: "33 metre Nautor Swan commission, ordered February 2025",
            value:
              "33 metre carbon-fibre racing-capable sailing yacht under construction at Nautor Swan, Jakobstad, Finland; estimated total cost above USD 30 million.",
          },
          {
            label: "MMYD-designed Feadship 830 \u201cProject Solent\u201d",
            value:
              "83 metre Feadship hull with Cecil Wright as owner\u2019s representative; technical launch from NMC Alblasserdam; delivery summer 2027.",
          },
        ],
        sourceLine:
          "Nautor Swan and Edmiston press statements; Robb Report; BoatInternational; Feadship and Cecil Wright press statements.",
      },
      { type: "h2", text: "Aggregate effect, 35 m hold over seven years" },
      {
        type: "kv",
        caption:
          "Total cost of ownership comparison: capex plus opex minus residual at year seven. On the practitioner working ranges for quality builders.",
        rows: [
          {
            label: "Sail programme",
            value: "25 to 40 percent below motor on total seven-year cost",
          },
          {
            label: "Cruising days per EUR 1.5 m operating budget",
            value: "16 to 20 weeks (sail) vs 12 to 14 weeks (motor)",
          },
          {
            label: "Carbon footprint, comparable use",
            value: "60 to 70 percent below motor",
          },
        ],
        sourceLine:
          "Foreland Marine project archive; aggregated practitioner ranges across published sources.",
      },
    ],
    sources: [
      {
        label: "BOAT International Global Order Book 2026",
        line: "Sail share of order book; major sail and motor builders.",
      },
      {
        label: "EU Commission FAQ, EU ETS for maritime transport",
        line: "Carbon market extension to maritime, in force from 1 January 2024; compliance phased 40 / 70 / 100 percent across 2025 to 2027.",
        url: "https://climate.ec.europa.eu/eu-action/transport-decarbonisation/reducing-emissions-shipping-sector/faq-maritime-transport-eu-emissions-trading-system-ets_en",
      },
      {
        label: "IMO 2023 Strategy on Reduction of GHG Emissions from Ships",
        line: "Resolution MEPC.377(80), adopted at MEPC 80, July 2023. Targets: 20 percent (striving for 30 percent) by 2030, 70 percent (striving for 80 percent) by 2040, net zero by/around 2050.",
        url: "https://www.imo.org/en/ourwork/environment/pages/2023-imo-strategy-on-reduction-of-ghg-emissions-from-ships.aspx",
      },
      {
        label: "Capgemini World Wealth Report 2024",
        line: "Sustainability identified as a top-three concern for next-generation HNWIs.",
        url: "https://www.capgemini.com/insights/research-library/world-wealth-report",
      },
      {
        label: "Royal Huisman published sustainability commentary",
        line: "Sail vs motor carbon footprint comparison; HVO and methanol-ready new builds.",
      },
      {
        label: "Denison Yachting market report 2025",
        line: "Days-on-market series across motor and sail brokerage.",
      },
      {
        label: "Foreland Marine project archive",
        line: "Operating cost ranges across managed sail and motor projects.",
        url: "https://www.forelandmarine.com",
      },
    ],
  },
};

export function getDataSpread(slug: string): DataSpread | undefined {
  return dataSpreads[slug];
}
