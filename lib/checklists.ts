export type ChecklistItem = {
  question: string;
  detail?: string;
};

export type ChecklistGroup = {
  heading: string;
  items: ChecklistItem[];
};

export type Checklist = {
  slug: string;
  title: string;
  standfirst: string;
  intent: string;
  groups: ChecklistGroup[];
  printable: string;
};

export const checklists: Record<string, Checklist> = {
  "01-reality-of-ownership": {
    slug: "01-reality-of-ownership",
    title: "Questions to ask before signing anything.",
    standfirst:
      "A one-page checklist for testing the cost picture against the folklore. Apply before any term sheet, with any adviser whose income depends on the deal closing.",
    intent:
      "If the answer to any item below is \u201cthe broker said,\u201d \u201cthe captain said,\u201d or \u201cwe will sort it out after closing,\u201d the answer is wrong.",
    groups: [
      {
        heading: "The numbers",
        items: [
          {
            question:
              "Do I have a written annual operating-cost projection that names every assumption (crew salary, insurance, berths, fuel, refit reserve, compliance, contingency)?",
            detail:
              "If not, what you have is a 10 percent rule applied to a number, not a budget.",
          },
          {
            question:
              "Has my projection been benchmarked against named published sources (YPI Crew, Quay Crew, Pantaenius, MYBA)?",
          },
          {
            question:
              "Have I run the running cost calculator on this site, with my own size, type, region, and intensity inputs?",
          },
          {
            question:
              "Do I have a depreciation projection across my intended hold period, against broker-aggregated data?",
          },
        ],
      },
      {
        heading: "The use case",
        items: [
          {
            question:
              "Have I committed, on paper, to the number of weeks per year I intend to use the yacht?",
            detail: "Below 12 weeks of intended use, ownership economics are unfavourable for most operations.",
          },
          {
            question:
              "Is my hold horizon at least seven years, on paper?",
          },
          {
            question:
              "Have I tested the use-case against my actual calendar, household, and family availability for the next five years?",
          },
        ],
      },
      {
        heading: "The charter question",
        items: [
          {
            question:
              "If I am being told that charter will offset ownership cost, has anyone shown me a worked case based on my yacht size, charter rate, and weeks?",
          },
          {
            question:
              "Am I prepared to release prime-season weeks (mid-July to mid-August in the Med, December to early January in the Caribbean) to charter?",
          },
          {
            question:
              "Has the charter projection been pressure-tested against the published BOAT International case studies for break-even, loss, and exception cases?",
          },
        ],
      },
      {
        heading: "The decision",
        items: [
          {
            question:
              "Has any party I am working with offered to help me think through the case for not buying?",
            detail: "Parties paid contingent on a sale closing rarely raise this.",
          },
          {
            question:
              "Have I committed, in writing, to a maximum hold cost across years one to three that I am prepared to absorb?",
          },
          {
            question:
              "If my honest answer to any of the above is uncertain, am I prepared to delay the acquisition by six months to clarify it?",
          },
        ],
      },
    ],
    printable:
      "Print this page; sit with it; answer in writing. The cost of working through twelve questions on paper is approximately one hour. The cost of failing to is the subject of the rest of this Reference.",
  },

  "02-reading-the-market": {
    slug: "02-reading-the-market",
    title: "Tests to run before any offer.",
    standfirst:
      "Twelve questions to apply to any shortlist hull, with the data that is publicly available before the broker tells the buyer the data. The market is more legible than the trade press makes it look.",
    intent:
      "The brokerage market in 2026 is the most legible it has been in a decade. Days-on-market and price-reduction history are public. Use them.",
    groups: [
      {
        heading: "The hull, on the published record",
        items: [
          {
            question:
              "How long has this listing been on the market, in days, on the original broker portal?",
            detail: "Compare against the Denison median of 277 days for 2025.",
          },
          {
            question:
              "What is the listing\u2019s price-reduction history, by date and amount?",
            detail: "A listing reduced more than twice signals seller asking is wrong.",
          },
          {
            question:
              "What are three comparable hulls (size, age, yard tier, propulsion) currently on market, and how do their asking, days, and reductions compare?",
          },
        ],
      },
      {
        heading: "The supply context",
        items: [
          {
            question:
              "Where does this hull sit in the wider supply picture, against the BOAT International Global Order Book and the over-30 m brokerage inventory?",
          },
          {
            question:
              "If the buyer is considering new build alternatives, what is the slot availability at the relevant yard tier (Lurssen, Feadship, Oceanco, Heesen, Sanlorenzo)?",
          },
          {
            question:
              "Is the buyer competing with US capital under the One Big Beautiful Bill Act 100 percent depreciation provision, and how does that change the negotiation dynamic?",
          },
        ],
      },
      {
        heading: "The broker\u2019s framing",
        items: [
          {
            question:
              "Has the broker described another buyer as \u201cabout to offer\u201d, the price as \u201cabout to move\u201d, or the market as \u201ctightening\u201d?",
            detail: "All three are negotiation framings. None constitute market evidence.",
          },
          {
            question:
              "Has the broker offered to introduce surveyor, lawyer, captain, or management company?",
            detail: "Each introduction is a referral relationship; ask, in writing, about the economics.",
          },
          {
            question:
              "Has the broker put the comparable scan in writing, with named comparables and reasoning, or has the framing been verbal?",
          },
        ],
      },
      {
        heading: "The discipline",
        items: [
          {
            question:
              "Have I committed, in advance and in writing, to a hold price below which I will walk away?",
          },
          {
            question:
              "Have I run the comparable scan independently of the listing broker, through my own adviser?",
          },
          {
            question:
              "If I walk away from this hull, do I have two further candidates, or am I committed to this one because the search has run for too long?",
          },
        ],
      },
    ],
    printable:
      "Print this page; complete in writing alongside the comparable scan; hand to the lawyer at heads of terms.",
  },

  "03-how-the-industry-works": {
    slug: "03-how-the-industry-works",
    title: "Disclosures to require, in writing.",
    standfirst:
      "A checklist of the structural questions to ask of any party introduced into the acquisition. The list is short. The disclosures are not always offered. Asking is the discipline.",
    intent:
      "When a brokerage offers \u201cfree\u201d buyer support, the support is paid for somewhere in the structure. The questions below identify where.",
    groups: [
      {
        heading: "The brokerage",
        items: [
          {
            question:
              "Which commission structure (IYBA flat 10 percent, MYBA sliding scale) is being applied, and what is the resulting fee?",
          },
          {
            question:
              "Is the brokerage acting in dual agency on this transaction, and if so, has consent been documented in writing beyond the standard form clause?",
          },
          {
            question:
              "What is the brokerage\u2019s ownership structure?",
            detail: "PE-backed, public-parent, founder-led, yard-tied? Each carries different incentives.",
          },
        ],
      },
      {
        heading: "Counterparty introductions",
        items: [
          {
            question:
              "For each party the brokerage has introduced (lawyer, surveyor, management company, paint specialist, insurance broker, recruitment agency), is there a referral or retrocession arrangement, and at what rate?",
          },
          {
            question:
              "Is the brokerage prepared to disclose, in writing, every referral relationship and retrocession arrangement on every introduction?",
            detail: "The OnboardOnline legal column states clearly: referral fees are legal only if disclosed.",
          },
          {
            question:
              "If the brokerage will not disclose, am I prepared to engage a parallel adviser whose only role is to scan for and document the relationships?",
          },
        ],
      },
      {
        heading: "The captain",
        items: [
          {
            question:
              "Was the captain candidate introduced by the brokerage, the seller, or by an independent recruitment agency engaged by me?",
          },
          {
            question:
              "Has the captain disclosed any prior commercial relationships with brokers, yards, suppliers, or management companies that might continue into employment?",
          },
          {
            question:
              "Is the captain\u2019s pay structure straight salary, or are there bonus, charter share, or referral-related elements that could affect operational decisions?",
          },
        ],
      },
      {
        heading: "The structural test",
        items: [
          {
            question:
              "If I asked any party in this transaction to walk away from a deal that did not benefit me, would they?",
            detail: "If the answer is no, the party is not aligned with me.",
          },
          {
            question:
              "Do I have one party in this transaction whose income is contingent only on the quality of advice they give me, and not on the deal closing?",
          },
        ],
      },
    ],
    printable:
      "Print this page; require written answers from each counterparty; file with the closing documents.",
  },

  "04-acquisition-process": {
    slug: "04-acquisition-process",
    title: "The acquisition discipline, in fifteen items.",
    standfirst:
      "A checklist tracking the five most common pitfalls plus the procedural disciplines that defeat them. Apply across the 12 to 24 week acquisition window. Tick each item before progressing to the next phase.",
    intent:
      "Most consequential acquisition errors are upstream of closing. By closing, the buyer has either negotiated the right contract or has not. The window for the right work is the first ten weeks.",
    groups: [
      {
        heading: "Shortlist",
        items: [
          {
            question:
              "Is my shortlist drawn from at least two brokerages, plus an independent off-market scan?",
          },
          {
            question:
              "Have I disclosed budget only to the independent adviser, not to any party paid contingent on a sale?",
          },
          {
            question:
              "Have I walked the shortlisted yachts in the company of the independent adviser as well as the broker?",
          },
        ],
      },
      {
        heading: "Pre-purchase survey",
        items: [
          {
            question:
              "Is my surveyor independently engaged, with no relationship to the broker?",
            detail: "Wolfson Marine, Ward & McKenzie, Patton Marine are recognised firms.",
          },
          {
            question:
              "Is the survey scope sufficient (4 to 7 days afloat plus haul-out, USD 25 to 60 k, full mechanical and electrical scope, paint specialist, class society inspector)?",
          },
          {
            question:
              "Am I prepared to renegotiate price on every material deficiency the survey finds?",
          },
        ],
      },
      {
        heading: "Sea trial",
        items: [
          {
            question:
              "Is my own captain candidate, my surveyor, and (where relevant) a chief engineer present at the sea trial?",
          },
          {
            question:
              "Has the sea trial scope tested the failure modes the survey identified, plus stability, vibration, noise, and electronics under representative load?",
          },
          {
            question:
              "If the sea trial reveals issues, am I prepared to renegotiate or walk away rather than close on time?",
          },
        ],
      },
      {
        heading: "VAT, flag, registration",
        items: [
          {
            question:
              "Have I had a separate written legal opinion from independent counsel on the VAT structure, not the broker\u2019s preferred lawyer?",
            detail: "Hill Dickinson, WFW, Ince, Stephenson Harwood, Reed Smith are recognised firms.",
          },
          {
            question:
              "Has the flag-state choice been analysed against my owner residence, cruising area, charter intent, financing, and family-office structuring?",
          },
          {
            question:
              "Is the projected annual compliance cost (EUR 50 to 150 k on a 40 m yacht) included in my operating budget?",
          },
        ],
      },
      {
        heading: "Closing",
        items: [
          {
            question:
              "Does the contract include clean title warranties, an inventory matching the sale, agreed deficiencies remediated or priced, an acceptance protocol with adequate time, and a governing law clause that is not the seller\u2019s home jurisdiction?",
          },
          {
            question:
              "Is a 3 to 5 day technical handover with the seller\u2019s captain, my captain, and the chief engineer scheduled?",
          },
          {
            question:
              "Have I resisted any pressure to compress the closing schedule, on the basis that closing acceleration is almost always the seller\u2019s interest?",
          },
        ],
      },
    ],
    printable:
      "Print this page; tick items in writing as the process progresses; file with the closing documents.",
  },

  "05-new-build-versus-brokerage": {
    slug: "05-new-build-versus-brokerage",
    title: "The new build threshold tests, and what to require in the contract.",
    standfirst:
      "Three threshold tests for whether new build is the right path. Ten contract points to negotiate at heads of terms. Apply before signing anything; signing without doing so is the central failure pattern in the published record.",
    intent:
      "The new build contract is where inexperience gets priced. The cost overrun appears later, but it was paid for at signature.",
    groups: [
      {
        heading: "The threshold tests",
        items: [
          {
            question:
              "Is my hold horizon at least seven to ten years, on paper?",
            detail: "Below seven years, the new build cost premium does not amortise.",
          },
          {
            question:
              "Is my intended use pattern materially specific to the yacht (size, layout, propulsion, range, operational profile) such that no brokerage hull within a reasonable search window delivers 80 percent of the use case?",
            detail: "Custom is for the residual 20 percent that genuinely matters.",
          },
          {
            question:
              "Am I prepared to commit to independent owner\u2019s representative engaged before contract, specialist shipbuilding counsel from a top firm, technical due diligence on the yard\u2019s order book and financial condition, and a willingness to push back on every point of the yard\u2019s first-draft contract?",
            detail: "If the answer to any of these is no, brokerage is the right path.",
          },
        ],
      },
      {
        heading: "Contract drafting at heads of terms",
        items: [
          {
            question:
              "Stage payment loading: is the schedule front-loaded above industry-typical 50 to 70 percent before delivery?",
            detail: "Aggressive front-loading suggests yard cash-flow weakness.",
          },
          {
            question:
              "Refund guarantee: is it tier-one bank pay-on-demand, or a surety wrapper or weaker guarantee?",
          },
          {
            question:
              "Liquidated damages cap: is the cap defined, and at what level?",
            detail: "Industry typical: 1 percent of contract value per week, capped at 5 to 10 percent.",
          },
          {
            question:
              "Force majeure: is the burden on the yard to prove \u201cbut for\u201d causation, per English law?",
          },
          {
            question:
              "Change order procedure: are unit rates pre-agreed, with third-party quote rights for variations above a defined threshold?",
            detail: "Without this, the yard prices variations at its discretion.",
          },
          {
            question:
              "Defect notification deadlines: how long does the buyer have from discovery, and what is the consequence of late notification?",
          },
          {
            question:
              "Warranty length: 12 months standard, negotiable to 24. Has it been negotiated?",
          },
          {
            question:
              "Cancellation thresholds: 150 days post-delivery date / 180 days total delay are practitioner defaults; is the contract within or beyond these?",
          },
          {
            question:
              "Title position during construction: does the yard retain title until delivery, or transfer progressively? Who carries insolvency risk?",
          },
          {
            question:
              "Dispute forum: English law plus LMAA arbitration is the practitioner default. Is the contract on this footing?",
          },
        ],
      },
      {
        heading: "Owner\u2019s representative",
        items: [
          {
            question:
              "Is my owner\u2019s representative paid only by me, with no yard commission and no broker commission?",
          },
          {
            question:
              "Has my representative shown me their fee structure in writing, before contract signature?",
          },
          {
            question:
              "Is my representative present on site weekly through the build, with quantified snag list reporting against original scope?",
          },
        ],
      },
    ],
    printable:
      "Print this page; complete in writing with specialist shipbuilding counsel before signing the heads of terms.",
  },

  "06-refit": {
    slug: "06-refit",
    title: "The refit checklist.",
    standfirst:
      "A checklist for the three disciplines that distinguish well-managed refits from disasters: scope, milestone payments, and weekly site presence. Plus the threshold tests for whether to refit at all.",
    intent:
      "If the projected refit cost exceeds 30 percent of the yacht\u2019s pre-refit market value, sale is usually the better decision. Below 30 percent, refit is normally better. The disciplines below contain the overrun within reason.",
    groups: [
      {
        heading: "Refit or sell",
        items: [
          {
            question:
              "What is the projected refit cost as a percentage of the yacht\u2019s pre-refit market value?",
            detail: "Above 30 percent, the threshold tilts toward sale.",
          },
          {
            question:
              "Have I tested the strategic fit of the post-refit yacht against my actual continued use case, on paper?",
          },
          {
            question:
              "Have I run the alternative arithmetic (sale, reacquisition of comparable hull, depreciation, transaction cost, crew continuity loss) against the refit case?",
          },
        ],
      },
      {
        heading: "Yard selection",
        items: [
          {
            question:
              "Is the chosen yard appropriate for the scope (paint, structural, mechanical, interior) and tonnage of the work?",
          },
          {
            question:
              "Has the yard been booked 12 to 18 months ahead of the work itself, in line with current top-yard lead times?",
          },
          {
            question:
              "Has the yard been selected on track record, alignment, and project manager experience, not on cheapest quote?",
          },
        ],
      },
      {
        heading: "Scope discipline",
        items: [
          {
            question:
              "Is the scope defined in writing, with specific deliverables, materials, and finishes, before the contract is signed?",
          },
          {
            question:
              "Has my owner\u2019s representative reviewed and edited the scope, with line-by-line deliverables?",
          },
          {
            question:
              "Is a contingency reserve of 15 to 25 percent included in my budget, against the empirical opened-up-vessel pattern?",
          },
        ],
      },
      {
        heading: "Milestone payments",
        items: [
          {
            question:
              "Are payments tied to defined deliverables (paint cells complete, engine reinstall complete, sea trials passed) rather than calendar dates?",
          },
          {
            question:
              "Is there a final payment held against snag list closure, after redelivery, to incentivise warranty discipline?",
          },
        ],
      },
      {
        heading: "Site presence and reporting",
        items: [
          {
            question:
              "Is my owner\u2019s representative on site at least one day per week, with photographic snag list and quantified variance against budget?",
          },
          {
            question:
              "Has the VAT structure (Spanish IPR if applicable, French Commercial Exemption, Maltese leasing) been analysed and selected by independent counsel?",
          },
          {
            question:
              "Is the builder\u2019s risk insurance verified, with my interest noted and the policy covering transit between subcontractor sites?",
          },
        ],
      },
    ],
    printable:
      "Print this page; complete in writing with the owner\u2019s representative; revisit at each milestone.",
  },

  "07-operations": {
    slug: "07-operations",
    title: "The five operational decisions of year one.",
    standfirst:
      "A checklist for the operational pillars that compound across a hold period. Apply in year one, revisit annually thereafter. Captain hire is the highest-leverage; refit reserve is the most overlooked.",
    intent:
      "The captain hire alone determines whether the yacht is a pleasure or a chronic source of friction. The other four decisions compound with it across the decade.",
    groups: [
      {
        heading: "Captain hire",
        items: [
          {
            question:
              "Have I interviewed at least five captain candidates, all sourced through routes outside the broker\u2019s relationship?",
          },
          {
            question:
              "Have I hired the candidate who pushed back hardest in interview on itinerary, maintenance, budget, and crew?",
            detail: "Captains who agree easily are pleasant in interview and expensive in year two.",
          },
          {
            question:
              "Has the captain disclosed prior commercial relationships with brokers, yards, suppliers, or management companies that might continue into employment?",
          },
        ],
      },
      {
        heading: "Yacht management company",
        items: [
          {
            question:
              "Was the management company introduced by my independent adviser, not by the broker?",
          },
          {
            question:
              "Has the management company disclosed referral economics from suppliers (paint, refit yards, insurance, recruitment) in writing?",
          },
          {
            question:
              "Is the management contract structured to protect my interests in flag-state interactions, ISM and MLC compliance, and audit cycles?",
          },
        ],
      },
      {
        heading: "Insurance",
        items: [
          {
            question:
              "Have I taken competitive quotes from at least three of Pantaenius, AON, and Gallagher Specialty?",
          },
          {
            question:
              "Is hull insurance at the practitioner band of 0.7 to 1.5 percent of insured value (well-maintained 40 to 50 m), with explanations for any deviation?",
          },
          {
            question:
              "Is P&I cover (crew injury, environmental, third-party, charter guest claims) at EUR 500 m third-party limit through Shipowners\u2019 Club or Steamship Mutual?",
          },
        ],
      },
      {
        heading: "Charter or private",
        items: [
          {
            question:
              "Have I committed to private operation for years one to three, with a deliberate decision in year four whether to introduce charter?",
          },
          {
            question:
              "If considering charter from year one, have I run a worked case based on yacht size, weekly rate, and weeks against the BOAT International published cases?",
          },
          {
            question:
              "Am I prepared to release prime-season weeks to charter, recognising that charter does not pay for ownership for the median operator?",
          },
        ],
      },
      {
        heading: "Refit reserve and capex planning",
        items: [
          {
            question:
              "Have I built a refit reserve from year one, sized at 5 to 15 percent of insured hull value across the five-year cycle?",
          },
          {
            question:
              "Has the reserve been tested against the empirical 30 to 50 percent overrun pattern?",
          },
          {
            question:
              "Is the capex plan revisited annually, with the captain and owner\u2019s representative present?",
          },
        ],
      },
    ],
    printable:
      "Print this page; complete with the captain and owner\u2019s representative in year one; revisit annually thereafter.",
  },

  "08-decision-framework": {
    slug: "08-decision-framework",
    title: "The ten questions to ask before signing anything.",
    standfirst:
      "A one-page checklist applying the independence test to the team architecture. Apply to every adviser the buyer is considering, including the publisher of this Reference. The publisher\u2019s own answers are set out on the colophon.",
    intent:
      "A buyer who can answer all ten questions clearly, with documentary evidence, is exceptionally well-protected. A buyer who cannot is, by industry default, working in the structure this Reference has spent its previous seven sections describing.",
    groups: [
      {
        heading: "The introductions",
        items: [
          {
            question:
              "Who introduced the yacht (or yard) to me, and who pays them?",
          },
          {
            question:
              "Who recommended the lawyer, and who pays them?",
          },
          {
            question:
              "Who recommended the surveyor, and who pays them?",
          },
          {
            question:
              "Who recommended the management company, and who pays them?",
          },
        ],
      },
      {
        heading: "The disclosures",
        items: [
          {
            question:
              "Has any party offered to provide their services \u201cat no cost,\u201d and if so, who is paying them?",
          },
          {
            question:
              "Has every party I am working with disclosed their commercial relationships in writing, including referral fees, retrocessions, and equity holdings in counterparties?",
          },
        ],
      },
      {
        heading: "The structural alignment",
        items: [
          {
            question:
              "Is my legal counsel independent of the broker, the yard, and the management company, and is their fee paid by me directly?",
          },
          {
            question:
              "Is my surveyor independent of the seller and of the broker, and is their fee paid by me directly?",
          },
          {
            question:
              "If I am building, is my owner\u2019s representative paid solely by me, with no contingent fee, no yard commission, and no referral relationship?",
          },
        ],
      },
      {
        heading: "The structural test",
        items: [
          {
            question:
              "If I asked any of these parties to walk away from a deal that would not benefit me, would they?",
            detail:
              "If the answer is no for any party, the relationship is not structurally aligned with the buyer.",
          },
        ],
      },
    ],
    printable:
      "Print this page; require written answers from every party in the team architecture; file with the closing documents and revisit annually.",
  },
};

export function getChecklist(slug: string): Checklist | undefined {
  return checklists[slug];
}
