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
    title: "The cost picture, on paper.",
    standfirst:
      "A one-page reference to keep alongside any acquisition conversation. The items below are the things most worth having in writing before signing. The work is an afternoon. The conversations afterwards tend to be cleaner for it.",
    intent:
      "Most experienced buyers do this naturally. For a first acquisition, putting the picture on paper is the calmest way to enter the negotiations. The numbers do not need to be perfect. They need to be written down.",
    groups: [
      {
        heading: "The numbers",
        items: [
          {
            question:
              "An annual operating-cost projection in writing, with each line named (crew salary, insurance, berths, fuel, refit reserve, compliance, contingency).",
            detail:
              "The folkloric percentages are reasonable starting points. A written line-by-line projection is materially more useful than any single-figure estimate.",
          },
          {
            question:
              "The projection benchmarked against named published sources (YPI Crew, Quay Crew, Pantaenius, MYBA).",
            detail:
              "Each of those publishes data that can be cited rather than inferred from a conversation.",
          },
          {
            question:
              "The running cost calculator on this site, run with the buyer\u2019s own size, type, region, and intensity.",
            detail:
              "Source assumptions are named on every line; the output is a starting point for the conversation, not a final number.",
          },
          {
            question:
              "A depreciation projection across the intended hold period, against broker-aggregated data.",
            detail:
              "Quality builders hold value materially better; the curve is well-documented in published series.",
          },
        ],
      },
      {
        heading: "The use case",
        items: [
          {
            question:
              "An honest estimate of the number of weeks per year the yacht will be used.",
            detail:
              "Below 12 weeks of intended use, the ownership economics are unfavourable for most operations. Above 12, ownership is the natural answer; below, charter and fractional access are worth considering.",
          },
          {
            question:
              "An intended hold horizon, ideally seven years or more.",
            detail:
              "Shorter holds amplify the depreciation curve. Seven years is the practitioner threshold at which the arithmetic settles.",
          },
          {
            question:
              "The use case tested against the buyer\u2019s actual calendar, household, and family availability for the next five years.",
            detail:
              "The yacht will absorb 40 to 60 days a year of attention. This is best treated as a chosen commitment, not a discovered one.",
          },
        ],
      },
      {
        heading: "The charter question",
        items: [
          {
            question:
              "If charter has been proposed as an offset to ownership cost, a worked case based on yacht size, weekly rate, and weeks.",
            detail:
              "The published BOAT International cases are the cleanest reference; most operations break even or run at a loss.",
          },
          {
            question:
              "A clear position, in advance, on whether the prime-season weeks (mid-July to mid-August in the Med, December to early January in the Caribbean) are available for charter.",
            detail:
              "Releasing prime weeks is the discipline that makes charter economics work. Holding them back is fine; it just means the charter case is structurally smaller.",
          },
          {
            question:
              "The charter projection pressure-tested against the published case studies for break-even, loss, and exception cases.",
          },
        ],
      },
      {
        heading: "The decision",
        items: [
          {
            question:
              "A conversation, with someone whose income is not contingent on the deal, about the case for not buying.",
            detail:
              "Parties paid contingent on a sale rarely raise this. It is worth having on its own.",
          },
          {
            question:
              "A maximum hold cost across years one to three that the buyer is comfortable absorbing, written down.",
            detail:
              "Cost discipline starts with a number agreed in advance, not derived under pressure.",
          },
          {
            question:
              "An option to delay the acquisition by six months if any of the items above remain uncertain.",
            detail:
              "Delay rarely costs anything beyond opportunity. Acquiring without clarity tends to cost more.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Sit with it for an hour. Bring it to the conversations that follow.",
  },

  "02-reading-the-market": {
    slug: "02-reading-the-market",
    title: "Reading any hull, before any offer.",
    standfirst:
      "Twelve items to keep alongside any shortlist conversation. The brokerage market in 2026 is the most legible it has been in a decade; the items below are simply what the data already shows, written down in the order it helps to look.",
    intent:
      "Days-on-market and price-reduction history are public on the listing portals. The items below are what to look at before the broker frames it. None of them require specialist skill; they require a quiet hour with the data.",
    groups: [
      {
        heading: "The hull, on the published record",
        items: [
          {
            question:
              "Days-on-market, from the listing\u2019s original entry, on the broker portal.",
            detail: "Compare against the Denison median of 277 days for 2025.",
          },
          {
            question:
              "Price-reduction history by date and amount.",
            detail:
              "More than two reductions usually signals that the seller\u2019s asking discipline is wrong, not the market\u2019s.",
          },
          {
            question:
              "Three comparable hulls (size, age, yard tier, propulsion) currently on market, with their asking, days, and reductions.",
          },
        ],
      },
      {
        heading: "The supply context",
        items: [
          {
            question:
              "The hull\u2019s position in the wider supply picture, against the BOAT International Global Order Book and the over-30 m brokerage inventory.",
          },
          {
            question:
              "If new build is also under consideration: slot availability at the relevant yard tier (Lurssen, Feadship, Oceanco, Heesen, Sanlorenzo).",
          },
          {
            question:
              "An understanding of the US-capital dynamic in the relevant size band, given the One Big Beautiful Bill Act 100 percent depreciation provision.",
            detail:
              "It varies by segment rather than across the whole market. The independent adviser can speak to it for the specific hull.",
          },
        ],
      },
      {
        heading: "The broker\u2019s framing",
        items: [
          {
            question:
              "Awareness that negotiation framings (\u201cabout to offer\u201d, \u201cabout to move\u201d, \u201ctightening\u201d) are not, on their own, market evidence.",
            detail:
              "They may be true. They are also what a broker would say in either case. The data is the better reference.",
          },
          {
            question:
              "A note, in writing, of any introductions the broker is offering (surveyor, lawyer, captain, management company), and the relationships behind them.",
            detail:
              "Each introduction tends to carry referral economics. Asking is normal; the broker is not always the one who has to volunteer.",
          },
          {
            question:
              "The comparable scan, in writing, with named comparables and reasoning.",
            detail:
              "Verbal comparisons are common. Written ones are rarer and tend to make the negotiation easier.",
          },
        ],
      },
      {
        heading: "The discipline",
        items: [
          {
            question:
              "A hold price, agreed in advance and in writing, below which the buyer is comfortable walking away.",
            detail:
              "Walking is a normal outcome on at least one hull before closing on another.",
          },
          {
            question:
              "The comparable scan run independently of the listing broker, through the buyer\u2019s own adviser.",
            detail:
              "A second scan rarely contradicts the first dramatically. Where it does, it is usually decisive.",
          },
          {
            question:
              "Two further candidates on the shortlist, in case this hull does not close.",
            detail:
              "Single-candidate searches concentrate negotiation pressure on the buyer; multi-candidate searches do the opposite.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Complete in writing alongside the comparable scan. Hand to the lawyer at heads of terms.",
  },

  "03-how-the-industry-works": {
    slug: "03-how-the-industry-works",
    title: "Disclosures worth having in writing.",
    standfirst:
      "A short reference list of the structural questions worth asking of any party introduced into the acquisition. Disclosure is sometimes offered, often not. The items below are what to ask, calmly, and what to expect in answer.",
    intent:
      "When a brokerage offers buyer support without an explicit fee, the work is paid for somewhere in the structure. The items below identify where, and they are usually answered helpfully when the question is asked plainly.",
    groups: [
      {
        heading: "The brokerage",
        items: [
          {
            question:
              "The commission structure being applied (IYBA flat 10 percent, MYBA sliding scale), and the resulting fee.",
          },
          {
            question:
              "Any dual agency on the transaction, documented in writing beyond the standard form clause.",
          },
          {
            question:
              "The brokerage\u2019s ownership structure (PE-backed, public-parent, founder-led, yard-tied).",
            detail:
              "Each ownership pattern carries different incentives; awareness is the first step.",
          },
        ],
      },
      {
        heading: "Counterparty introductions",
        items: [
          {
            question:
              "For each party the brokerage has introduced (lawyer, surveyor, management company, paint specialist, insurance broker, recruitment agency): the referral or retrocession arrangement, if any, and at what rate.",
          },
          {
            question:
              "Written disclosure of every referral relationship and retrocession arrangement on every introduction.",
            detail:
              "The OnboardOnline legal column is clear: referral fees are legal only if disclosed. Asking is the discipline.",
          },
          {
            question:
              "If disclosure is declined, a parallel adviser whose only role is to scan for and document the relationships.",
            detail:
              "Independent advisers do this routinely; the work is straightforward and inexpensive.",
          },
        ],
      },
      {
        heading: "The captain",
        items: [
          {
            question:
              "The candidate\u2019s introduction route (broker, seller, or independent agency engaged by the buyer).",
          },
          {
            question:
              "Any prior commercial relationships with brokers, yards, suppliers, or management companies that might continue into employment.",
          },
          {
            question:
              "The captain\u2019s pay structure (straight salary, or any bonus, charter share, or referral-related elements).",
          },
        ],
      },
      {
        heading: "The structural test",
        items: [
          {
            question:
              "An understanding of which parties in the transaction would walk away from a deal that did not benefit the buyer.",
            detail:
              "The independent adviser is the party for whom this is structurally true. Knowing where the alignment sits is the point.",
          },
          {
            question:
              "At least one party in the transaction whose income is contingent only on the quality of advice given, not on the deal closing.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Require written answers from each counterparty. File with the closing documents.",
  },

  "04-acquisition-process": {
    slug: "04-acquisition-process",
    title: "The acquisition discipline, in fifteen items.",
    standfirst:
      "A reference list across the 12 to 24 week acquisition window. The items below are the disciplines that defeat the most common pitfalls. Most of the work is upstream of closing.",
    intent:
      "By closing, the buyer has either negotiated the right contract or has not. The window for the right work is the first ten weeks; the items below are what to do in it. None require specialist knowledge; they require sequence.",
    groups: [
      {
        heading: "Shortlist",
        items: [
          {
            question:
              "A shortlist drawn from at least two brokerages, plus an independent off-market scan.",
          },
          {
            question:
              "Budget shared only with the independent adviser, not with parties paid contingent on a sale.",
            detail:
              "Budget conversations belong with the adviser. Broker conversations go better when shaped by use case rather than by budget.",
          },
          {
            question:
              "Shortlisted yachts walked in the company of the independent adviser as well as the broker.",
          },
        ],
      },
      {
        heading: "Pre-purchase survey",
        items: [
          {
            question:
              "An independently engaged surveyor, with no relationship to the broker.",
            detail:
              "Wolfson Marine, Ward & McKenzie, Patton Marine, and Winterbothams are recognised firms.",
          },
          {
            question:
              "Survey scope sufficient for the yacht (4 to 7 days afloat plus haul-out, USD 25 to 60 k, full mechanical and electrical, paint specialist, class society inspector).",
          },
          {
            question:
              "A renegotiation, on every material deficiency the survey finds.",
            detail:
              "This is the disciplined response, not an aggressive one. Sellers expect it on a proper survey.",
          },
        ],
      },
      {
        heading: "Sea trial",
        items: [
          {
            question:
              "The buyer\u2019s own captain candidate, surveyor, and (where relevant) chief engineer present.",
          },
          {
            question:
              "Trial scope covering the failure modes the survey identified, plus stability, vibration, noise, and electronics under representative load.",
          },
          {
            question:
              "Readiness to renegotiate or walk away if the trial reveals issues, rather than closing on schedule.",
          },
        ],
      },
      {
        heading: "VAT, flag, registration",
        items: [
          {
            question:
              "A separate written legal opinion from independent counsel on the VAT structure.",
            detail:
              "Hill Dickinson, WFW, Ince, Stephenson Harwood, Reed Smith are recognised firms.",
          },
          {
            question:
              "Flag-state choice analysed against owner residence, cruising area, charter intent, financing, and family-office structuring.",
          },
          {
            question:
              "Projected annual compliance cost (EUR 50 to 150 k on a 40 m yacht) included in the operating budget.",
          },
        ],
      },
      {
        heading: "Closing",
        items: [
          {
            question:
              "A contract with clean title warranties, an inventory matching the sale, agreed deficiencies remediated or priced, an acceptance protocol with adequate time, and a governing law clause that is not the seller\u2019s home jurisdiction.",
          },
          {
            question:
              "A 3 to 5 day technical handover with the seller\u2019s captain, the buyer\u2019s captain, and the chief engineer.",
          },
          {
            question:
              "A closing schedule resistant to acceleration.",
            detail:
              "Closing acceleration is almost always the seller\u2019s interest. Three weeks of additional due diligence costs nothing and tends to save significantly.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Tick items in writing as the process progresses. File with the closing documents.",
  },

  "05-new-build-versus-brokerage": {
    slug: "05-new-build-versus-brokerage",
    title: "What to settle, before signing the new build contract.",
    standfirst:
      "Three threshold tests for whether new build is the right path. Ten contract points worth settling at heads of terms. The items below are what specialist counsel would normally walk through; having them in writing first tends to make the conversation faster.",
    intent:
      "An afternoon\u2019s work at heads of terms is the cheapest insurance available against the variation-margin pattern. The items below are the points specialist counsel and the owner\u2019s representative settle as a matter of routine; settling them in advance is the thing.",
    groups: [
      {
        heading: "The threshold tests",
        items: [
          {
            question:
              "A hold horizon of seven to ten years, on paper.",
            detail:
              "Below seven years, the new build cost premium does not amortise.",
          },
          {
            question:
              "An intended use pattern materially specific to the yacht (size, layout, propulsion, range, operational profile).",
            detail:
              "If a brokerage hull within a reasonable search window delivers 80 percent of the use case, brokerage is normally the right path. Custom is for the residual 20 percent that genuinely matters.",
          },
          {
            question:
              "Commitment to four disciplines: independent owner\u2019s representative engaged before contract, specialist shipbuilding counsel from a top firm, technical due diligence on the yard\u2019s order book and financial condition, and willingness to push back on the yard\u2019s first-draft contract.",
            detail:
              "If any of these is uncertain, brokerage tends to be the calmer path. New build with weak representation tends to be among the more costly ways to acquire a yacht.",
          },
        ],
      },
      {
        heading: "Contract drafting at heads of terms",
        items: [
          {
            question:
              "Stage payment loading reviewed against the industry-typical 50 to 70 percent before delivery.",
            detail:
              "Aggressive front-loading sometimes signals yard cash-flow weakness; counsel can identify this from the schedule.",
          },
          {
            question:
              "Refund guarantee credit quality (tier-one bank pay-on-demand vs surety wrapper).",
          },
          {
            question:
              "Liquidated damages cap defined and at a level that reflects the project.",
            detail:
              "Industry typical: 1 percent of contract value per week of delay, capped at 5 to 10 percent.",
          },
          {
            question:
              "Force majeure burden on the yard to prove \u201cbut for\u201d causation, per English law.",
          },
          {
            question:
              "Change order procedure with pre-agreed unit rates and third-party quote rights for variations above a defined threshold.",
            detail:
              "Without this, the yard prices variations at its discretion. With it, the cost of changes during the build is constrained.",
          },
          {
            question:
              "Defect notification deadlines understood, with the consequences of late notification clear.",
          },
          {
            question:
              "Warranty length negotiated (12 months standard, 24 months achievable).",
          },
          {
            question:
              "Cancellation thresholds (150 days post-delivery / 180 days total) understood and within the project\u2019s tolerance.",
          },
          {
            question:
              "Title position during construction clarified (yard-retained until delivery, or progressive transfer).",
          },
          {
            question:
              "Dispute forum on English law plus LMAA arbitration, the practitioner default.",
          },
        ],
      },
      {
        heading: "Owner\u2019s representative",
        items: [
          {
            question:
              "Owner\u2019s representative paid only by the buyer, with no yard commission and no broker commission.",
          },
          {
            question:
              "Fee structure shown in writing before contract signature.",
          },
          {
            question:
              "Representative present on site weekly through the build, with quantified snag list reporting against original scope.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Walk through with specialist shipbuilding counsel before signing the heads of terms.",
  },

  "06-refit": {
    slug: "06-refit",
    title: "What to settle, before the refit contract.",
    standfirst:
      "A reference list across the four refit disciplines: whether to refit at all, yard selection, scope, and on-site discipline. The empirical overrun pattern is well-documented; the items below are what contains it.",
    intent:
      "If the projected refit cost exceeds 30 percent of the yacht\u2019s pre-refit market value, sale is usually the better decision. Below that threshold, refit is normally the right answer. The items below are the disciplines that contain the overrun within reason.",
    groups: [
      {
        heading: "Refit or sell",
        items: [
          {
            question:
              "Projected refit cost as a percentage of the yacht\u2019s pre-refit market value.",
            detail:
              "Above 30 percent, the threshold tilts toward sale. Below, refit is usually the right call. The threshold is rough; the calculation is bespoke.",
          },
          {
            question:
              "Strategic fit of the post-refit yacht against the actual continued use case, on paper.",
          },
          {
            question:
              "The alternative arithmetic (sale, reacquisition of comparable hull, depreciation, transaction cost, crew continuity loss) tested against the refit case.",
          },
        ],
      },
      {
        heading: "Yard selection",
        items: [
          {
            question:
              "A yard appropriate for the scope (paint, structural, mechanical, interior) and tonnage.",
          },
          {
            question:
              "Yard slot booked 12 to 18 months ahead of the work itself, in line with current top-yard lead times.",
          },
          {
            question:
              "Selection on track record, alignment, and project manager experience, rather than cheapest quote.",
          },
        ],
      },
      {
        heading: "Scope discipline",
        items: [
          {
            question:
              "Scope defined in writing, with specific deliverables, materials, and finishes, before the contract is signed.",
          },
          {
            question:
              "Owner\u2019s representative review and edit of the scope, line by line.",
          },
          {
            question:
              "A contingency reserve of 15 to 25 percent included in the budget.",
            detail:
              "This is the empirical opened-up-vessel pattern. Reserving for it is calm planning rather than pessimism.",
          },
        ],
      },
      {
        heading: "Milestone payments",
        items: [
          {
            question:
              "Payments tied to defined deliverables (paint cells complete, engine reinstall complete, sea trials passed) rather than calendar dates.",
          },
          {
            question:
              "A final payment held against snag list closure, after redelivery, to incentivise warranty discipline.",
          },
        ],
      },
      {
        heading: "Site presence and reporting",
        items: [
          {
            question:
              "Owner\u2019s representative on site at least one day per week, with photographic snag list and quantified variance against budget.",
          },
          {
            question:
              "VAT structure (Spanish IPR if applicable, French Commercial Exemption, Maltese leasing) analysed and selected by independent counsel.",
          },
          {
            question:
              "Builder\u2019s risk insurance verified, with the buyer\u2019s interest noted and the policy covering transit between subcontractor sites.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Complete with the owner\u2019s representative. Revisit at each milestone.",
  },

  "07-operations": {
    slug: "07-operations",
    title: "The operational pillars, in year one.",
    standfirst:
      "Five decisions that compound across a hold period. The captain hire is the highest-leverage; the refit reserve is the most overlooked. The list below is what to take time on in year one and revisit annually.",
    intent:
      "The captain hire alone determines whether the yacht is a pleasure or a chronic source of friction. The other four decisions compound with it across the decade. The items below are the operational pillars; getting them set up well in year one is the work.",
    groups: [
      {
        heading: "Captain hire",
        items: [
          {
            question:
              "At least five captain candidates, all sourced through routes outside the broker\u2019s relationship.",
          },
          {
            question:
              "The candidate hired having pushed back hardest on itinerary, maintenance, budget, and crew.",
            detail:
              "Captains who agree easily are pleasant in interview. The disciplined candidate is the one who asks the difficult questions; that is the captain to hire.",
          },
          {
            question:
              "Disclosure of the captain\u2019s prior commercial relationships with brokers, yards, suppliers, or management companies that might continue into employment.",
          },
        ],
      },
      {
        heading: "Yacht management company",
        items: [
          {
            question:
              "Management company introduced by the independent adviser, not by the broker.",
          },
          {
            question:
              "Written disclosure of any referral economics from suppliers (paint, refit yards, insurance, recruitment).",
          },
          {
            question:
              "Contract structured to protect the buyer\u2019s interests in flag-state interactions, ISM and MLC compliance, and audit cycles.",
          },
        ],
      },
      {
        heading: "Insurance",
        items: [
          {
            question:
              "Competitive quotes from at least three of Pantaenius, AON, and Gallagher Specialty.",
          },
          {
            question:
              "Hull insurance at the practitioner band of 0.7 to 1.5 percent of insured value (well-maintained 40 to 50 m), with explanations for any deviation.",
          },
          {
            question:
              "P&I cover (crew injury, environmental, third-party, charter guest claims) at EUR 500 m third-party limit through Shipowners\u2019 Club or Steamship Mutual.",
          },
        ],
      },
      {
        heading: "Charter or private",
        items: [
          {
            question:
              "Private operation across years one to three, with a deliberate decision in year four whether to introduce charter.",
            detail:
              "First-year owners benefit from a season or two of private operation before the charter discipline is added. The data of actual use makes the year-four decision much cleaner.",
          },
          {
            question:
              "If charter is being considered from year one, a worked case based on yacht size, weekly rate, and weeks against the BOAT International published cases.",
          },
          {
            question:
              "A clear position on releasing prime-season weeks, given that charter does not pay for ownership for the median operator.",
          },
        ],
      },
      {
        heading: "Refit reserve and capex planning",
        items: [
          {
            question:
              "A refit reserve from year one, sized at 5 to 15 percent of insured hull value across the five-year cycle.",
          },
          {
            question:
              "The reserve tested against the empirical 30 to 50 percent overrun pattern.",
          },
          {
            question:
              "An annual capex plan revisited with the captain and owner\u2019s representative present.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Complete with the captain and owner\u2019s representative in year one. Revisit annually.",
  },

  "08-motor-versus-sail": {
    slug: "08-motor-versus-sail",
    title: "Running the comparison, before defaulting to motor.",
    standfirst:
      "A reference for the buyer at the point of choosing between motor, sailing yacht, and hybrid drive. The work below tends to be an afternoon. The comparison rarely changes the decision against, but it often refines it.",
    intent:
      "Most first-time buyers default to motor without running the comparison. Some are right to. Others have skipped a useful exercise. The items below are the variables on which the decision actually moves.",
    groups: [
      {
        heading: "The threshold tests",
        items: [
          {
            question:
              "An honest read of the cruising calendar. Are the buyer\u2019s seasons fixed-date and inflexible, or is there room for weather-window planning of 36 to 60 hours on transatlantics?",
            detail:
              "Fixed-schedule cruising tilts toward motor or hybrid. A flexible season opens the sailing yacht and hybrid options.",
          },
          {
            question:
              "A clear position on the carbon question. Is the principal\u2019s family office, foundation, or public profile likely to ask the question over the next decade?",
            detail:
              "If the question is coming, the answer is easier to give from a sailing yacht or a hybrid programme than from a conventional motor yacht.",
          },
          {
            question:
              "The seven-year arithmetic, run on paper, across capex, opex, depreciation, and residual.",
            detail:
              "Quality sailing yacht builders typically come in 25 to 40 percent below the equivalent motor programme on total seven-year cost.",
          },
        ],
      },
      {
        heading: "Operating cost comparison, on a 50 m",
        items: [
          {
            question:
              "Annual fuel projection, sailing yacht against motor. EUR 60 to 120 k for the sailing yacht, EUR 200 to 350 k for the motor at 400 cruising hours.",
          },
          {
            question:
              "Crew complement and pay, sailing yacht against motor. 9 to 12 crew on a 50 m sailing yacht, 12 to 16 on a comparable motor.",
          },
          {
            question:
              "Maintenance shape: rigging and sail wardrobe reserves on the sailing yacht set against engine wear and stabiliser systems on the motor. Net annual maintenance is broadly comparable; the cost shape differs.",
          },
          {
            question:
              "Total annual operating cost. Sailing yacht typically 70 to 85 percent of the motor figure on equivalent length and use.",
          },
        ],
      },
      {
        heading: "Carbon and regulation",
        items: [
          {
            question:
              "EU ETS Maritime exposure. Below 5,000 GT, the system does not apply. Most yachts (including 60 to 80 m motor) sit below the threshold.",
            detail:
              "Above 5,000 GT (110 m+ motor) the cost is now real: EUR 200 to 400 k per year on current carbon prices.",
          },
          {
            question:
              "HVO availability at the buyer\u2019s home cruising port. HVO is a drop-in diesel replacement at 85 to 90 percent lifecycle CO2 reduction; bunker availability is strongest in the Mediterranean.",
          },
          {
            question:
              "If new build, the 2026 IMO 2023 GHG Strategy trajectory and any methanol-ready specification. Available from the larger Northern European yards on request.",
          },
        ],
      },
      {
        heading: "The hybrid third path",
        items: [
          {
            question:
              "Whether hybrid drive (Heesen FDHF, Sanlorenzo SX, and equivalent programmes) has been priced into the comparison alongside motor and sailing yacht.",
            detail:
              "Hybrid threads the cost and carbon needle for owners with fixed cruising schedules and a real carbon position.",
          },
          {
            question:
              "Battery hotel-load capability on the relevant new build candidates. Royal Huisman\u2019s 580 kWh installation on Aquarius II is the published reference; equivalent capacity is appearing across the larger builders.",
          },
        ],
      },
      {
        heading: "The decision",
        items: [
          {
            question:
              "A written summary of the comparison, signed off by the buyer and the independent adviser before any broker engagement on the chosen path.",
          },
          {
            question:
              "Acceptance, on paper, of the residual case for whichever path is chosen. The chapter does not arbitrate between motor, sailing yacht, and hybrid; it asks the comparison to be run on the variables that move.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Complete in writing before approaching any broker on the chosen path.",
  },

  "09-decision-framework": {
    slug: "09-decision-framework",
    title: "The ten questions, applied to every adviser.",
    standfirst:
      "The ten questions are designed to be put to anyone proposing to advise on the acquisition, including the publisher of The First Owner’s Reference. The publisher\u2019s own answers are on the colophon. They are kind to ask. They tend to be answered helpfully.",
    intent:
      "The questions below are the device of chapter nine: a calm reference for testing whether any adviser is structurally aligned with the buyer. They are designed to be put to people, not to be answered alone. Asking is the discipline; the answers are usually informative.",
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
              "If the answer is no for any party, the relationship is not structurally aligned with the buyer. This is information, not judgment.",
          },
        ],
      },
    ],
    printable:
      "The page is designed to print onto a single A4. Use it to open the conversation with each adviser. The publisher\u2019s answers are on the colophon.",
  },
};

export function getChecklist(slug: string): Checklist | undefined {
  return checklists[slug];
}
