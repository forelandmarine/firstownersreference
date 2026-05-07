export type CaseStudy = {
  slug: string;
  title: string;
  standfirst: string;
  meta: { label: string; value: string }[];
  paragraphs: (
    | string
    | { type: "h2"; text: string }
    | { type: "blockquote"; text: string; attribution?: string }
  )[];
  takeaways: string[];
  disclosure: string;
};

export const cases: Record<string, CaseStudy> = {
  "01-reality-of-ownership": {
    slug: "01-reality-of-ownership",
    title: "The owner who bought twice.",
    standfirst:
      "He sold the first yacht eighteen months after delivery, took the loss, and started again. The second yacht was a better acquisition because the first one had already taught him what he was actually buying.",
    meta: [
      { label: "Yacht type", value: "Semi-custom motor, 42 m" },
      { label: "Hold, first yacht", value: "18 months" },
      { label: "Hold, second yacht", value: "Ongoing, year five" },
      { label: "Anonymisation", value: "Composite of three Foreland project files" },
    ],
    paragraphs: [
      "The buyer was in his early fifties, recently exited from a software business he had founded in 2003. The exit produced a liquidity event in the low nine figures. Yachting had been a deferred ambition since university. The first acquisition, made within ten months of the exit, was a semi-custom 42 m motor yacht from a respected mid-tier yard, sourced through a brokerage relationship introduced by his wealth manager.",
      "The brokerage handled the search, the contract, the surveyor referral, and the management company onboarding. The fees were not on the buyer\u2019s invoices because the fees were on the seller\u2019s side. He understood, vaguely, that the broker was being paid by the seller. He did not understand that the broker had also recommended the surveyor, the management company, and the captain, and that referral economics flowed back through each of those engagements.",
      { type: "h2", text: "Year one" },
      "The first year ran ten weeks of family use across the Western Mediterranean. The captain, hired on the broker\u2019s recommendation, ran a pleasant programme. Operating cost in year one came in at EUR 1.9 m, against a broker-quoted budget of EUR 1.3 m. Crew salaries were higher than expected. Insurance was higher. The shipyard period after the first season produced a EUR 280,000 invoice for snag-list items the buyer had assumed were within the warranty window. They were not, because the warranty had been negotiated to twelve months from delivery in the standard contract, not from first season completion.",
      "The captain explained that operating cost on a yacht of this size was \u201ctypically around 10 percent of value, give or take.\u201d The buyer noted that EUR 1.9 m on an EUR 11 m hull was 17 percent. The captain was reassuring. The buyer was not.",
      { type: "h2", text: "The second season" },
      "Eight weeks of use in year two. The buyer had begun to suspect that the structure he had inherited was not aligned with him. He engaged independent counsel for an unrelated tax matter, and the lawyer asked, in passing, who had drafted his original purchase contract. The buyer named the firm. The lawyer noted that the firm was the brokerage\u2019s preferred counsel. The buyer had not asked the question.",
      "He commissioned an independent review of his operating arrangements. The review found a EUR 200,000 annual referral flow from the management company to the brokerage that had introduced them. The buyer had not been told about this. He had not been told because there was no rule that compelled the management company to disclose referrals it pays to its yacht-owning client. The review found similar referral economics on the insurance arrangement, the paint contract scoped for the next refit, and the recruitment fees on the recent crew rotation.",
      "None of this was illegal. None of it was outside industry practice. Most of it was, by the industry\u2019s own definition, normal.",
      {
        type: "blockquote",
        text: "I had assumed the people around the yacht were working for me. They were working in the industry. The two are different.",
        attribution: "The buyer, in conversation with Foreland Marine, year two.",
      },
      { type: "h2", text: "The decision to sell, and the second acquisition" },
      "The decision to sell the first yacht was taken at the end of the second season. The yacht went onto the brokerage market and sold within four months at a 28 percent discount to original purchase. The depreciation, EUR 3.1 m, was within the 10 to 20 percent year-one band, accelerated by the rapid sale. The operating loss across two years was approximately EUR 4 m. Plus the depreciation, plus the transaction costs. The total cost of the first 18 months was approximately EUR 8.5 m.",
      "The second acquisition began with a different architecture. He engaged an independent adviser before contacting any broker. The independent adviser briefed him on the acquisition process, the structure of the industry, and the team he would need. The independent adviser ran the search across multiple brokerages, evaluated three shortlist yachts, ran a parallel scan against off-market inventory, and recommended an independent surveyor and a yacht lawyer he had no commercial relationship with.",
      "The second yacht, a 46 m semi-custom from a higher-tier yard, took eight months to acquire from first conversation to closing. The buyer paid the independent adviser USD 180,000 for the year of work. He paid the lawyer USD 90,000 for the contract negotiation. He paid the surveyor USD 45,000 for a four-day pre-purchase survey. The total team cost was approximately USD 320,000 on a USD 24 m acquisition. He had paid nothing equivalent on the first yacht. He had also paid USD 8.5 m more than he needed to over the two years that followed.",
      { type: "h2", text: "Year five, ongoing" },
      "Year five of the second yacht is ongoing. The hold is approaching its five-year mark. The crew has stayed largely intact across four years; the captain is the same one hired through an independent recruitment process at the start. Operating cost has run at 13 to 14 percent of original capex per year, in the moderate-use band the independent adviser had set out from the start.",
      "The buyer is unlikely to sell. He is also unlikely, on this yacht, to be surprised by an invoice. The cost is what he was told it would be. The team is paid by him, directly, at known rates. The independence is structural. The arithmetic of the two acquisitions, taken together, makes the case for the second architecture more clearly than any commentary could.",
    ],
    takeaways: [
      "Engage an independent adviser before engaging any broker. The team you build determines the cost of ownership more than the yacht you choose.",
      "Operating cost in years one to three is more often 12 to 17 percent of capex than the 10 percent rule of folklore.",
      "Referral economics from management, paint, insurance, and crew agencies into the introducing broker are routine. They are not on your invoice. Ask explicitly.",
      "The cost of a properly built team on a USD 30 m acquisition is USD 200 to 400 k in year one. The cost of the wrong team is several percent of the capital.",
    ],
    disclosure:
      "This case is a composite of three Foreland Marine project files. Identifying details, jurisdictions, and figures have been adjusted to protect the parties involved. The structural pattern, the cost outcomes, and the team architecture are accurate to the original projects.",
  },

  "02-reading-the-market": {
    slug: "02-reading-the-market",
    title: "The deal that closed because someone read the market correctly.",
    standfirst:
      "Two buyers competed for the same 52 m brokerage hull. One read the days-on-market signal and held the price. The other took the broker\u2019s framing of urgency and overpaid by 11 percent.",
    meta: [
      { label: "Yacht type", value: "52 m motor, brokerage" },
      { label: "Asking price", value: "EUR 28 m" },
      { label: "Outcome, buyer A", value: "Withdrew at EUR 26.5 m" },
      { label: "Outcome, buyer B", value: "Closed at EUR 27.8 m, 11 percent above market read" },
      { label: "Anonymisation", value: "Composite, two transactions, 2025" },
    ],
    paragraphs: [
      "Two buyers, both first-time, both within a three-month window in 2025, looked at the same 52 m motor yacht on the brokerage market. The yacht had been listed at EUR 32 m fourteen months earlier, reduced to EUR 28 m at the time of the buyers\u2019 interest, and had passed through three price reductions in that window.",
      "Buyer A engaged an independent adviser before contacting the listing broker. The adviser pulled the listing\u2019s history from public broker portals, ran a comparable scan against three other 50 to 55 m hulls of similar age and yard, and identified the days-on-market position relative to the Denison series median. The comparable scan suggested fair market was EUR 25 to 26.5 m. The 14-month days-on-market position confirmed the market was not absorbing this hull at its asking. The adviser recommended an opening offer at EUR 24.5 m with hold discipline at EUR 26.5 m.",
      "Buyer B did not engage an independent adviser. The listing broker introduced him to the yacht, walked him through the inventory, and described the yacht as \u201cabout to move.\u201d The broker mentioned, in conversation, that another buyer was \u201cclose to an offer\u201d and that pricing in this segment was \u201cmoving in our favour.\u201d Both statements were true in a narrow sense and misleading in a wider one. The other buyer was Buyer A, whose adviser had already concluded the yacht was over-priced. Pricing in the segment had softened around 7 percent from peak brokerage levels.",
      { type: "h2", text: "The negotiation" },
      "Buyer A opened at EUR 24.5 m. The seller countered at EUR 27.5 m. Buyer A held at EUR 25.5 m, then at EUR 26.5 m. The seller was not willing to come below EUR 27.5 m within the negotiation window the buyer had set. Buyer A withdrew, on the adviser\u2019s recommendation. The adviser noted that the seller\u2019s asking discipline was inconsistent with the published days-on-market signal, and that walking away was the disciplined response.",
      "Buyer B opened, six weeks later, at EUR 28 m, the asking. The broker recommended a small reduction request and a quick close to \u201csecure the slot.\u201d Buyer B closed at EUR 27.8 m. The broker collected approximately EUR 1.4 m in commission from the seller-side pool, of which a buyer-broker share of around EUR 600,000 was paid to a broker who had not represented Buyer B in any meaningful sense.",
      { type: "h2", text: "Twelve months later" },
      "Buyer A bought a different 50 m hull at EUR 25.2 m, four months after walking away from the first transaction. The yacht had different layout, similar cruising profile, comparable build quality from a different mid-tier yard.",
      "Buyer B\u2019s yacht was offered for charter in the second season, generated EUR 750,000 in net charter revenue against EUR 2.1 m in operating cost, and was relisted in early 2026 at EUR 24.5 m. The trade press did not report this as a market event. The pattern is common.",
      {
        type: "blockquote",
        text: "Well-priced inventory moves in months. Over-priced inventory rots for a year and a half. The buyer who pays close attention to days-on-market and price-reduction history will find that this is the most legible the brokerage market has been in a decade.",
        attribution: "Chapter 02, lead essay.",
      },
      { type: "h2", text: "The mechanism, said plainly" },
      "Buyer A had access to the same data Buyer B did. Both buyers could have pulled the listing\u2019s history from broker portals. Both could have run a comparable scan. The difference was that Buyer A had engaged an adviser whose only job was to read the market on the buyer\u2019s behalf. Buyer B had engaged a broker whose job was to close the transaction.",
      "The 11 percent price differential was not a market efficiency problem. It was a buyer-representation problem. The market was reading correctly. One buyer read it. One did not.",
    ],
    takeaways: [
      "Days-on-market and price-reduction history are public on listing portals. Ignore the broker\u2019s urgency framing; read the data.",
      "An over-priced hull rotting on the market for 14 months is signalling that the seller\u2019s asking discipline is wrong. Disciplined buyers walk away.",
      "The independent adviser\u2019s value on a single transaction can exceed their year\u2019s fee through pricing discipline alone.",
      "Brokers who frame other buyers as \u201cabout to offer\u201d are quoting their incentive, not yours.",
    ],
    disclosure:
      "Composite of two 2025 transactions on which Foreland Marine acted, one as adviser to the buyer who walked, the other where Foreland was approached after closing. Identifying details adjusted; figures held within their original ranges.",
  },

  "03-how-the-industry-works": {
    slug: "03-how-the-industry-works",
    title: "The free advice that cost GBP 400,000.",
    standfirst:
      "The buyer was offered \u201cfree\u201d guidance by a brokerage on the management contract, the paint specialist, the insurance broker, and the recruitment agency. Each introduction carried a referral economics he was not told about. The fee saving on the broker engagement was approximately GBP 25,000. The cost of the structure across year one was approximately GBP 400,000.",
    meta: [
      { label: "Yacht", value: "38 m semi-custom motor" },
      { label: "Acquisition value", value: "EUR 19 m" },
      { label: "Anonymisation", value: "Composite of two Foreland project files, 2024" },
    ],
    paragraphs: [
      "The buyer was UK-based, recently exited from a private equity holding, considering a first acquisition in the 35 to 40 m band. He approached a major London brokerage on the recommendation of a peer who had bought through them. The brokerage waived its buyer-side advisory fee on the basis that the firm earned its margin on the seller side and \u201cprovided buyer support as part of the relationship.\u201d The phrasing was familiar. It is industry-standard.",
      "The acquisition itself ran cleanly. A 38 m semi-custom motor yacht from an Italian yard was sourced over four months. The pre-purchase survey was conducted by a surveyor the broker introduced. The contract was drafted by the broker\u2019s preferred yacht lawyer. The yacht closed at EUR 19 m, on terms slightly more favourable than the asking. The buyer felt well-served.",
      { type: "h2", text: "The introductions" },
      "Once closed, the buyer needed a management company, a paint specialist for an early refit on the bow, an insurance broker, and a senior crew. The brokerage made the introductions. Each was warm, professional, and competent.",
      "The management company was a recognised industry firm, on a EUR 5.2 m annual contract. The buyer was told, accurately, that this was a market-rate structure. He was not told that the brokerage held a referral relationship with the management company. The introductory referral on the contract, paid from the management company\u2019s side, was approximately GBP 250,000 in year one.",
      "The paint specialist was selected from a list of three the brokerage maintained. The chosen contractor delivered a EUR 1.8 m repaint job. A 5 percent retrocession back to the brokerage on this job was approximately EUR 90,000. The buyer paid the paint contractor in full; the GBP 80,000 of the EUR 90,000 sterling-equivalent did not appear on the buyer\u2019s invoices.",
      "The insurance broker was a relationship of long standing for the brokerage. Premium in year one was approximately EUR 250,000. Brokerage commission on the policy was approximately 15 percent (EUR 37,500). A back-end referral fee from the insurance broker to the introducing brokerage was approximately 10 percent of that commission, or EUR 3,750. Small, but recurring annually.",
      "The recruitment agency that placed the new captain charged a placement fee of approximately three months of the captain\u2019s salary, around EUR 35,000. A referral fee of around 10 percent flowed back to the brokerage. The buyer was charged the full agency fee.",
      { type: "h2", text: "The arithmetic" },
      "The buyer had \u201csaved\u201d an explicit advisory fee by engaging the brokerage as his de facto adviser. A typical independent adviser fee on this acquisition would have been around USD 80,000 to 120,000. He had saved approximately GBP 75,000 in explicit fees.",
      "Across year one alone, the referral and retrocession economics flowing from his counterparties to the introducing brokerage were approximately GBP 400,000. None were illegal. None were outside industry practice. None were on the buyer\u2019s invoices, because the buyer was not the entity invoiced.",
      "The advice had not been free. It had been priced into the structure of the suppliers around him. The buyer had paid for the advice at a multiple of what an independent adviser would have charged, and had received advice that was, in each instance, the brokerage\u2019s commercial preference rather than a market scan independent of those preferences.",
      {
        type: "blockquote",
        text: "Free advice is the most expensive advice in this industry. The buyer who pays the adviser directly is the only buyer who knows what the advice is worth.",
        attribution: "Chapter 03, lead essay.",
      },
      { type: "h2", text: "What changed in year two" },
      "The buyer engaged an independent adviser at the end of year one for an unrelated assessment of his refit reserve planning. The adviser, on reviewing the operating arrangements, identified the referral structure. The buyer was not, in the end, particularly outraged. He understood the structure. He had simply not known about it. He renegotiated the management contract at year two with a clear understanding of the cost base, moved the insurance to a broker with no relationship to the original brokerage, and adjusted the recruitment process for future hires.",
      "Year two operating cost, including the same suppliers but on directly negotiated terms with full disclosure, was approximately GBP 270,000 lower than year one. The buyer concluded that the structure he had been working in had cost him, conservatively, GBP 250 to 400 k per year while it was in place. He held the yacht for another four years. The arithmetic compounded.",
    ],
    takeaways: [
      "When a brokerage offers \u201cfree\u201d buyer support, ask explicitly about referral and retrocession economics on every counterparty they introduce.",
      "Management, paint, insurance, and recruitment all carry referral structures back to the introducing broker. Not on your invoice does not mean not in your cost base.",
      "An independent adviser fee of USD 80 to 120 k on a EUR 19 m acquisition is the cheapest form of structural insurance available.",
      "Renegotiating supplier relationships at year two, with full disclosure of the original referral economics, is the single most consequential cost-reduction step available to a first-year owner.",
    ],
    disclosure:
      "Composite of two Foreland Marine project files, 2024. No specific firms are named; the referral economics described are an industry-standard pattern, not an attribution of any particular firm\u2019s practice.",
  },

  "04-acquisition-process": {
    slug: "04-acquisition-process",
    title: "The pre-purchase survey that saved EUR 2 m.",
    standfirst:
      "The seller was confident in the recent class survey. The buyer\u2019s independent surveyor opened up two compartments the class surveyor had not. The renegotiation that followed reduced the price by EUR 2.1 m and produced a contract that allocated the structural work correctly.",
    meta: [
      { label: "Yacht", value: "55 m motor, year 2014, brokerage" },
      { label: "Original asking", value: "EUR 22 m" },
      { label: "Final closing", value: "EUR 19.9 m" },
      { label: "Anonymisation", value: "Composite of one Foreland project, 2023" },
    ],
    paragraphs: [
      "The yacht was a 55 m motor from a respected Northern European yard, 11 years old, with a clean class history and a recent five-year survey. The seller had instructed the listing broker to position the yacht as turnkey and to discourage extensive pre-purchase scoping on the basis that \u201cthe class survey covered everything that mattered.\u201d The asking was EUR 22 m.",
      "The buyer engaged an independent surveyor on the recommendation of his independent adviser, not on the recommendation of the broker. The surveyor's scope was broader than the seller's recent class survey: 6 days afloat, 2 days haul-out, full mechanical inspection by an independently engaged chief engineer, paint condition assessment, electrical compliance audit, and opening of two compartments the class surveyor had not opened (the forepeak void and a section of the lazarette adjacent to the stabiliser pumps).",
      { type: "h2", text: "What the survey found" },
      "The class survey had passed the yacht. The pre-purchase survey did not. Three categories of finding mattered.",
      "First, the forepeak void showed early-stage corrosion in the structural framing, consistent with prolonged moisture from a leaking deck fitting two decks above. The corrosion had not penetrated the primary structural members but the affected secondary framing was within five years of needing replacement. Estimated remediation cost: EUR 350,000 to 500,000.",
      "Second, the lazarette opening revealed that the stabiliser pump installation had been modified, post-build, to accommodate an upgraded stabiliser system in 2019. The modification had been documented but the documentation showed that the original engine room ventilation had been compromised. The yacht\u2019s ventilation had been operating at approximately 80 percent of design capacity for six years. Estimated remediation cost to restore design capacity: EUR 250,000 to 400,000.",
      "Third, the surveyor\u2019s mechanical inspection identified that one of the two main engines was due for major overhaul within 1,500 hours of operation. The seller\u2019s broker had described the engines as \u201cgood for the next class period.\u201d Class period was four years. 1,500 hours, at the yacht\u2019s historical use, was about three years. The discrepancy was material. Estimated overhaul cost: EUR 800,000.",
      "Plus a longer list of smaller findings (paint blisters in two locations, an autopilot due for replacement, a navigation electronics suite at the end of its support life). Total estimated remediation across the buyer\u2019s ten-year hold horizon: EUR 2.0 to 2.4 m.",
      { type: "h2", text: "The renegotiation" },
      "The buyer\u2019s lawyer drafted the survey-driven price renegotiation. The position was straightforward: the deficiencies were not catastrophic, but they were material, and the price needed to reflect them.",
      "Three options were presented to the seller. One: walk away. Two: have the seller remediate at the seller\u2019s expense before closing, with class re-inspection. Three: reduce the price by EUR 2.1 m to reflect the deficiencies.",
      "The seller chose option three. The yacht closed at EUR 19.9 m. The buyer carried the remediation work into the first refit, sequencing it across the 18 months following acquisition. The total spend was within the EUR 2.0 to 2.4 m range the surveyor had estimated.",
      {
        type: "blockquote",
        text: "The survey is the moment at which the asymmetry between buyer and seller is most acute. Inexperienced buyers spend it reassuring themselves. Disciplined buyers spend it negotiating.",
        attribution: "Chapter 04, lead essay.",
      },
      { type: "h2", text: "The arithmetic of the survey fee" },
      "The independent surveyor's fee was EUR 48,000. The independently engaged chief engineer\u2019s fee was EUR 12,000. The lawyer\u2019s fee for the renegotiation alone was approximately EUR 25,000. Total cost of the disciplined survey process: EUR 85,000.",
      "The price reduction was EUR 2.1 m. The pre-purchase scoping returned approximately 25 to 1 against its own cost. This is not unusual. It is the case for engaging an independent surveyor in every acquisition where the cost permits, which is every acquisition above approximately EUR 5 m.",
      "What would have happened without the survey: the buyer would have closed at EUR 22 m and absorbed the EUR 2.0 to 2.4 m of remediation across his first three years of ownership. The total cost would have been approximately EUR 2.1 m higher than what he paid. The seller, in that scenario, would have been the beneficiary.",
    ],
    takeaways: [
      "Class surveys are not buyer-side surveys. They certify the yacht for class. They do not protect the buyer.",
      "An independent surveyor at EUR 25 to 60 k on a 40 to 60 m yacht returns a multiple of the fee on the typical buyer\u2019s acquisition.",
      "Open compartments the class surveyor has not opened. Modify the survey scope to reflect the buyer\u2019s use case, not the seller\u2019s reassurance.",
      "Survey-driven renegotiation is the disciplined response to material findings. Walking away is the right answer when the seller will not move.",
    ],
    disclosure:
      "Single Foreland Marine project, 2023, with specific identifying details adjusted. No specific firms are named in the body.",
  },

  "05-new-build-versus-brokerage": {
    slug: "05-new-build-versus-brokerage",
    title: "The spec change in month 18.",
    standfirst:
      "Eighteen months into a 36-month new build, the owner asked for a structural change to the upper deck. The change was technically straightforward. The contract\u2019s change order procedure was not. The variation cost EUR 1.4 m above the engineering estimate, because the contract had been signed without a defined unit-rate framework.",
    meta: [
      { label: "Yacht", value: "62 m fully custom motor" },
      { label: "Yard", value: "Northern European, top tier" },
      { label: "Contract value at signature", value: "EUR 95 m" },
      { label: "Final delivery cost", value: "EUR 108 m" },
      { label: "Anonymisation", value: "Composite of two Foreland project files, 2022 to 2024" },
    ],
    paragraphs: [
      "The owner had committed to a 62 m fully custom new build at a top-tier Northern European yard. The contract at signature was EUR 95 m, against a 36-month build window. The owner had retained a brokerage acting in a dual role: the firm had introduced the yard, was acting as owner\u2019s representative on the build, and was being paid by yard commission of approximately 5 percent. The owner had been told, in passing, that this was \u201cthe industry-standard structure.\u201d It was, in a narrow sense.",
      "The contract was the yard\u2019s in-house template. The owner\u2019s representative had reviewed it but had not been involved in its drafting. A specialist shipbuilding lawyer had not been engaged. The contract included a change order clause that specified, in general terms, that the yard would price variations at \u201creasonable cost plus a margin appropriate to the work.\u201d The clause did not specify what reasonable cost meant, what margin was appropriate, or whether the buyer had the right to obtain third-party quotes for variations above a defined threshold.",
      { type: "h2", text: "The change request" },
      "Eighteen months in, with the hull complete and outfitting underway, the owner asked for a structural change to the upper deck to accommodate a tender lift the original specification had not anticipated. The change involved reinforcing two structural frames, modifying the deck cut-out, integrating the lift hydraulics, and re-running the deck drainage.",
      "The yard\u2019s change order quote was EUR 2.6 m. The yard\u2019s engineering estimate, which the owner\u2019s representative obtained informally, suggested the actual additional engineering, materials, and labour cost was approximately EUR 1.2 m. The yard\u2019s margin on the change order was therefore approximately EUR 1.4 m, or about 117 percent on the underlying cost.",
      "The owner, on the dual-role representative\u2019s advice, accepted the change order. The representative\u2019s framing was that \u201cchanges at this stage of the build always carry a premium\u201d and that \u201cfighting on this issue would damage the relationship with the yard.\u201d Both framings were accurate in a narrow sense. They were also incomplete.",
      "The reason for the premium was not the engineering. It was the absence of a defined change order procedure in the contract. A specialist shipbuilding lawyer would have negotiated unit rates, third-party quote rights, and a variation pricing framework at heads of terms. The owner did not have that framework. He had a general clause that said the yard would charge what it considered reasonable.",
      {
        type: "blockquote",
        text: "Without a defined procedure with pre-agreed unit rates and third-party quote rights, the owner is open to being forced to pay for change orders or emergent work at a unit rate much higher than in the original contract.",
        attribution:
          "Sean Gibbons, Stephenson Harwood, on shipbuilding contract drafting.",
      },
      { type: "h2", text: "The pattern, repeated" },
      "The deck change was not the only variation. Across the remaining 18 months of the build, the owner approved 31 change orders totalling EUR 13 m above contract. Approximately 60 percent of those costs were the underlying engineering and materials. Approximately 40 percent was yard margin on the variations.",
      "On a EUR 95 m contract that delivered at EUR 108 m, the owner had paid approximately EUR 5.2 m in variation margin that a properly drafted contract would have constrained. The dual-role owner\u2019s representative\u2019s commission, paid by the yard, was approximately EUR 4.75 m on the original contract value, or about 8 percent of the variation margin paid by the owner.",
      "The owner did not, at any stage, see an invoice from his representative. He paid the yard the contract value plus variations. The yard paid the representative\u2019s commission out of its margin. From the owner\u2019s perspective, he had \u201csaved\u201d a representative fee, because the representative was free.",
      { type: "h2", text: "The independent adviser brought in for delivery" },
      "Three months before delivery, with the yard pressing for sea trial scheduling and the snag list growing, the owner engaged an independent adviser to manage the acceptance process. The adviser ran the snag list discipline, the sea trial, the technical handover, and the final acceptance protocol. The adviser\u2019s fee was approximately EUR 180,000 across the four-month engagement.",
      "The adviser\u2019s view, in private conversation with the owner during the acceptance period, was that the contract\u2019s change order framework had cost the owner several million euros across the build, and that the dual-role representative had not been incentivised to negotiate it differently. The owner accepted the analysis. The yacht was delivered on schedule, with a snag list managed to closure within four months of delivery.",
      "The owner\u2019s second build, four years later, was contracted with a specialist shipbuilding lawyer at heads of terms, an independent owner\u2019s representative paid solely by the owner, and a defined change order procedure with pre-agreed unit rates and third-party quote rights. Variation margin across that build was within practitioner industry norms. The contract worked because it had been drafted to.",
    ],
    takeaways: [
      "The change order clause is the most consequential piece of new-build contract drafting. Without defined unit rates and third-party quote rights, the buyer pays the yard\u2019s discretion.",
      "Dual-role brokerage representation is not free. It is paid by the yard, structurally aligned with the yard\u2019s margin, and not incentivised to negotiate clauses that constrain that margin.",
      "Engage specialist shipbuilding counsel at heads of terms, not after the contract is signed. The afternoon\u2019s legal review at signature saves more than the representative fee for the entire project.",
      "The independent owner\u2019s representative on a EUR 100 m build, paid 1 to 3 percent of build cost, is the cheapest form of structural insurance available against the variation-margin pattern.",
    ],
    disclosure:
      "Composite of two Foreland project files, 2022 to 2024. Yard is identified by tier rather than by name to protect the parties. The contract pattern, the change order arithmetic, and the dual-role economics are drawn from the original projects without modification.",
  },

  "06-refit": {
    slug: "06-refit",
    title: "The refit that doubled in scope.",
    standfirst:
      "The owner committed to a EUR 3.2 m mid-life refit at a recognised Mediterranean yard. The yard opened the engine room. The work that emerged was real. The cost that emerged was double the original quote, because the contract had no defined scope discipline and no milestone payment structure.",
    meta: [
      { label: "Yacht", value: "48 m motor, 12 years old" },
      { label: "Original quote", value: "EUR 3.2 m" },
      { label: "Final cost", value: "EUR 6.4 m" },
      { label: "Project duration", value: "11 months against 7-month plan" },
      { label: "Anonymisation", value: "Composite of two Foreland project files, 2022 to 2024" },
    ],
    paragraphs: [
      "The yacht was 12 years old, approaching its second five-year survey, with the cosmetic and major systems condition demanding a substantive overhaul. The owner had bought the yacht two years earlier on the brokerage market and intended to hold it for another five years. The refit was the right decision in principle.",
      "The yard chosen was a recognised Western Mediterranean operator, well-equipped, with a strong reputation for paint and structural work. The original quote was EUR 3.2 m for paint, deck refurbishment, an interior soft-furnishings refresh, mechanical service across both main engines and the generators, and electrical compliance work to address known issues from the previous five-year survey.",
      "The contract was the yard\u2019s standard refit agreement. The scope was specified in general terms across nine work packages. Milestone payments were tied to calendar dates rather than to defined deliverables. The owner\u2019s representative was the brokerage that had sold the yacht to the owner two years earlier. The brokerage was paid no separate fee for the refit oversight; the support was \u201cpart of the relationship.\u201d",
      { type: "h2", text: "What the engine room found" },
      "Five weeks into the project, with the engine room stripped, the yard\u2019s mechanical team found that the port main engine\u2019s heat exchanger had developed a cracked end cap, the failure mode of which had not been visible from the engine\u2019s service history. The crack was significant enough that the engine could not safely be re-started without full overhaul of the cooling system. The yard\u2019s estimate for the additional work was EUR 380,000.",
      "Three weeks later, the electrical compliance team found that the previous yard\u2019s compliance work had been incomplete. Two switchboards had been left in a configuration that would not pass current class inspection. The remediation cost was EUR 220,000.",
      "Four weeks later, the paint cells found that the underlying primer beneath the topsides had failed in two locations, requiring full strip and re-prime before the new topcoat could be applied. The additional cost was EUR 480,000.",
      "Six weeks later, the interior team found that the air handling units in two of the guest cabins had been running at reduced capacity for years and required complete replacement. The additional cost was EUR 290,000.",
      "Each finding was real. Each was within the empirical pattern of refit discovery. None could have been quoted for in the original visual inspection. The yard\u2019s communication on each finding was technically competent and commercially aligned with the yard.",
      { type: "h2", text: "The structural problem" },
      "The owner\u2019s representative attended on Tuesdays. The owner himself attended once a month for two days. The representative\u2019s reporting was framed largely in narrative form (\u201cpaint cell complete,\u201d \u201cengine work ongoing\u201d) without a quantified snag list against original scope or a running variance against budget.",
      "By month four, the project was at EUR 4.6 m, against the EUR 3.2 m original quote. The owner asked the representative for a fixed final cost. The representative offered EUR 5.0 m. By month seven, the project was at EUR 5.8 m. By month nine, it was at EUR 6.1 m. The yacht delivered at EUR 6.4 m, double the original quote, four months past the planned redelivery.",
      "The 100 percent overrun is at the high end of practitioner experience. It is not unique. It is the pattern when scope is loosely specified, milestone payments are tied to calendar rather than deliverables, and the owner\u2019s representative is not paid by the owner.",
      {
        type: "blockquote",
        text: "The 30 to 50 percent overrun is the empirical expectation. The 100 percent overrun is the case where the contract structure and the representation discipline have failed together.",
        attribution: "Chapter 06, lead essay.",
      },
      { type: "h2", text: "The recovery" },
      "The owner engaged an independent adviser at month nine, with two months of project remaining. The adviser ran the snag list discipline, the technical handover, the sea trials post-redelivery, and the warranty claim management for the remaining 12 months. Five claims under the yard\u2019s warranty, totalling approximately EUR 410,000, were prosecuted to closure with the yard within the warranty period.",
      "The adviser\u2019s fee for the engagement was EUR 95,000. The warranty recovery alone returned approximately 4 to 1 against the fee. The adviser\u2019s subsequent assessment of the project, in writing for the owner, identified the three structural failures: scope specification at contract, milestone payment structure, and representation discipline. The owner\u2019s next refit, four years later at a different yard, was contracted with each of those addressed. That project landed within 14 percent of original quote.",
    ],
    takeaways: [
      "Tie milestone payments to defined deliverables (paint cells complete, engine reinstall complete, sea trials passed) rather than to calendar dates.",
      "The owner\u2019s representative on a EUR 5 m refit, paid 4 to 8 percent of project value, is the cheapest insurance against the doubling pattern.",
      "Practitioner contingency reserves of 15 to 25 percent are not pessimism. They are the empirical expectation against opened-up vessels.",
      "Weekly site presence with photographs and a quantified snag list surfaces issues at the point they can still be addressed cheaply.",
    ],
    disclosure:
      "Composite of two Foreland project files, 2022 to 2024. Specific yards are not identified. Cost ranges and project durations are within the originals; identifying details adjusted.",
  },

  "07-operations": {
    slug: "07-operations",
    title: "The captain hire that defined the next decade.",
    standfirst:
      "Two captain interviews, two days apart, on the same yacht. One candidate agreed with everything. The other pushed back on the owner\u2019s itinerary, the maintenance schedule, and the budget. The owner hired the second. Ten years later, the same captain is still on the yacht, the operating cost has run within budget every year, and the crew turnover has been a fraction of the industry average.",
    meta: [
      { label: "Yacht", value: "52 m semi-custom motor" },
      { label: "Captain tenure", value: "Year 10, ongoing" },
      { label: "Crew retention", value: "Senior crew average tenure 6.5 years" },
      { label: "Anonymisation", value: "Composite of one Foreland project, 2014 ongoing" },
    ],
    paragraphs: [
      "The owner had taken delivery of a 52 m semi-custom motor yacht 18 months earlier. The first captain, hired through a recruitment agency introduced by the brokerage that sold the yacht, had run the yacht for 14 months before resigning citing \u201cdifferences in operational philosophy.\u201d The hand-over was orderly. The yacht needed a new captain, and the owner had used the first hire as a learning experience.",
      "The owner engaged an independent recruitment agency on his independent adviser\u2019s recommendation. The agency was not introduced by anyone with a continuing commercial relationship with the yacht. The adviser\u2019s framing was that the captain hire was the highest-leverage decision the owner would make on the yacht, and that the time to do it carefully was now.",
      { type: "h2", text: "Two interviews" },
      "Two final candidates emerged from the search. Both had the credentials. Both had worked on similar-sized yachts. Both had references the agency had verified.",
      "The first candidate, a Swedish captain with twelve years of experience, was charming, professional, and accommodating in interview. He agreed with the owner\u2019s preferred itinerary for the upcoming season. He agreed with the owner\u2019s suggestion that the autumn refit period could be \u201ckept tight\u201d to allow for late-season use. He agreed with the recruitment of two crew members the owner\u2019s wife had met socially. The owner left the interview comfortable.",
      "The second candidate, a British captain with fourteen years of experience, was less easy in interview. He pushed back on the proposed itinerary on grounds that the transit times between the owner\u2019s preferred destinations would compromise the yacht\u2019s maintenance schedule. He pushed back on the autumn refit timeline, noting that compressing it would create downstream cost. He asked detailed questions about the owner\u2019s use pattern, the family\u2019s actual on-board behaviour, and the budget envelope. He noted, politely, that one of the crew the owner\u2019s wife had met socially was not, in his view, the right hire for the role.",
      "The owner\u2019s instinct, after the interview, was to prefer the first candidate. The independent adviser\u2019s view was the opposite. The adviser\u2019s framing: the captain who pushes back in interview is the captain who will push back when it matters operationally. The captain who agrees easily is the captain who will agree easily to charter weeks the owner had not planned to release, to refit yards the management company prefers, to crew the broker has introduced.",
      "The owner hired the second candidate. The decision was uncomfortable in the moment. The reasoning, on the adviser\u2019s framing, was that the discomfort was the signal.",
      {
        type: "blockquote",
        text: "Do not just hire the best captain on paper. Hire the one who can manage you. A good captain runs the yacht. A great captain manages the entire ecosystem around it, including the owner.",
        attribution: "Chapter 07, lead essay.",
      },
      { type: "h2", text: "The next decade" },
      "Ten years on, the captain is still on the yacht. The senior crew (chief officer, chief engineer, chief stewardess, chef) have averaged 6.5 years of tenure. Junior crew turnover has run at approximately one-third the industry average. The yacht has had two refits, both delivered within practitioner cost discipline. The captain has, on three occasions across the decade, recommended that the owner not proceed with a particular refit yard, supplier, or charter arrangement. In each case, the recommendation was inconvenient in the moment and proved correct in retrospect.",
      "The captain has also, on two occasions, recommended that the owner sell the yacht. Both recommendations were made on the basis that the owner\u2019s actual use pattern had drifted from the use pattern the yacht was specified for. The owner did not act on either recommendation. He noted both, in conversation with his independent adviser, as evidence that he had hired the right captain.",
      "The cumulative cost saving across ten years from the captain\u2019s discipline (refit cost discipline, crew retention, supplier negotiation) is difficult to quantify precisely. A conservative estimate, applied across a 30 to 40 percent crew cost line, modest savings on refit overrun versus practitioner average, and the avoidance of two specific decisions the captain pushed back on, is approximately EUR 4 to 6 m across the decade. The captain\u2019s pay across the same period was approximately EUR 1.6 m. The arithmetic of the hire is not subtle.",
      { type: "h2", text: "The first captain, in retrospect" },
      "The first captain, who left after 14 months, has run two further yachts since. Both have had above-average crew turnover. Both have had operating cost growth above their size band\u2019s practitioner norm. The captain is, by every public-record indicator, a competent professional. He is not the captain to hire on the discipline-test. The owner\u2019s first hire had been a credential check. The owner\u2019s second hire had been a discipline check.",
      "The independent adviser\u2019s view, in conversation, is that the captain hire is the highest-leverage operational decision an owner makes, that most first-time owners do not realise this until the second hire, and that the cost of getting it wrong on the first yacht is approximately one full year of operating cost wasted. The cost of getting it right on the second hire is approximately one year of independent recruitment process. The arithmetic, again, is not subtle.",
    ],
    takeaways: [
      "Hire the captain who pushes back hardest. The discomfort in interview is the signal that the captain is doing the job in interview that they will do operationally.",
      "Independent recruitment, not broker-introduced or seller-introduced, is the structural condition for the captain hire. The captain\u2019s relationships with their introducer outlast the introduction.",
      "Senior crew tenure of 5 to 8 years is the operational signature of a well-run yacht. Below 2 years average is the signature of a captain or owner the crew is choosing to leave.",
      "The arithmetic of the hire compounds across the decade. The captain\u2019s annual pay is small against the operational cost the captain controls.",
    ],
    disclosure:
      "Single Foreland Marine project, 2014 ongoing. Identifying details adjusted; the captain hire pattern, the operating outcomes, and the decade-long arithmetic are accurate to the original project.",
  },

  "08-motor-versus-sail": {
    slug: "08-motor-versus-sail",
    title: "The owner who switched, on the second yacht.",
    standfirst:
      "The first yacht was a 48 m motor. The second was a 52 m sailing yacht. The owner had not intended a switch; the comparison, run honestly at the point of considering a successor hull, decided it. Year three on the sailing yacht is ongoing. The numbers and the use pattern have moved as the comparison suggested they would.",
    meta: [
      { label: "First yacht", value: "48 m motor, brokerage, year 1 to 5" },
      { label: "Second yacht", value: "52 m sailing yacht, brokerage, year 6 onward" },
      { label: "Cruising profile", value: "Western Mediterranean, family-led" },
      { label: "Anonymisation", value: "Composite of two Foreland project files, 2020 to 2026" },
    ],
    paragraphs: [
      "The owner had been on a 48 m motor yacht for five years when the conversation about a successor began. The original acquisition had been straightforward: a brokerage hull from a respected mid-tier German yard, modern and well-specified, sourced through a yacht-management contact. The five years of operation had taught him the things first-time owners learn. The crew settled. The cruising pattern stabilised at seven to nine weeks of family use a year, mostly Western Mediterranean. The annual operating cost ran consistently at EUR 3.9 to 4.2 million.",
      "The successor conversation opened with the assumption that the next hull would be another motor, slightly larger and a degree younger. The independent adviser asked whether the comparison had been run against a sailing yacht of the same size band. It had not.",
      { type: "h2", text: "What the comparison turned up" },
      "The adviser walked the owner through three documents over the course of two weeks.",
      "The first was an operating-cost projection for a 52 m sailing yacht of comparable build quality, in the same use pattern, run at moderate-use intensity. The model produced an annual figure of approximately EUR 3.0 to 3.2 million, against the EUR 3.9 to 4.2 million the owner had been paying on the motor. The differential traced to fuel, crew count, and the smaller engine room load; against that, the sailing yacht model carried EUR 60 to 90 thousand of annual rigging reserve and a sail wardrobe replacement at the seven-year mark. Net annual cost: 75 to 80 percent of the motor figure. The adviser was clear that the figures were practitioner-aggregated rather than precise; the order of magnitude held.",
      "The second was a cruising-calendar comparison. On the same EUR 3.9 million annual envelope, the sailing yacht modelled at 14 to 16 weeks of family use rather than seven to nine. The owner\u2019s actual constraint had been calendar availability rather than weeks-on-paper, and the adviser pointed out that the constraint had been driven partly by the cost discipline of running a motor yacht at the upper end of moderate use. A lower running cost loosened that constraint.",
      "The third was a carbon footprint sketch. The owner sat on the board of a foundation his family ran, and the foundation had begun publishing its own carbon position. Switching to a sailing yacht produced a roughly 60 to 65 percent annual carbon reduction on aggregated practitioner numbers and Royal Huisman published commentary. The figure mattered to him for reasons that had not been part of the original yacht decision and were now part of the successor decision.",
      "The owner asked the adviser to scope a hybrid motor yacht as a third option. The adviser came back with two delivered Heesen FDHF hulls and one in-build Sanlorenzo SX, modelled at EUR 3.4 to 3.6 million annually. The hybrid figures sat between motor and sailing yacht on cost and roughly 35 to 45 percent below motor on carbon. The owner held the hybrid option open through the search.",
      {
        type: "blockquote",
        text: "I had thought of sail as a different kind of holiday. The comparison made it look like a different kind of yacht. The two are not the same conversation.",
        attribution: "The owner, in conversation with Foreland Marine, week 14 of the second-yacht search.",
      },
      { type: "h2", text: "The acquisition" },
      "The successor was a 52 metre sailing yacht built by Royal Huisman in 2014, on the brokerage market through a Northern European house with no continuing relationship to the owner. The acquisition ran on the same architecture as the chapter on the team to assemble suggests: independent adviser engaged before any broker, surveyor independently engaged, yacht lawyer drawn from a recognised firm, captain hired through an independent recruitment process and not through the broker.",
      "The captain hired had run two large sailing yachts previously. He pushed back, in interview, on three things the owner had assumed: the owner\u2019s preferred itinerary needed weather windows the family was not used to honouring, the existing motor-yacht crew were not all going to transition to a sailing yacht successfully, and the management company that had run the motor yacht did not have the right depth on sailing yachts. The owner hired him on the basis of the pushback, not despite it.",
      "Three of the five senior motor-yacht crew transitioned to the new hull. Two did not. A new chief officer and a new chief engineer were hired with sailing-yacht specialism. A new yacht-management company was engaged.",
      { type: "h2", text: "Year three on the new hull" },
      "Year three on the sailing yacht is ongoing. The annual operating cost has run at EUR 3.0 to 3.2 million, on the model. Family use has run at 13 to 15 weeks a year, against the seven to nine on the motor. The owner reports that the cruising character of the family\u2019s seasons has changed: longer passages between anchorages, more weather-window planning, more time at sea under sail and less time waiting at marinas. The chapter does not arbitrate between the two regimes; the owner\u2019s honest framing was that the second one fitted his actual life better than the first one had.",
      "The carbon position has held within the modelled band. The foundation\u2019s public position has remained defensible.",
      "The hybrid option, set aside at acquisition, remains the option the owner would have taken if his cruising calendar had been less flexible. The point about hybrid is not that it is the right answer for him; it is that it is now a real third path, and a buyer who does not consider all three is leaving an option on the table.",
    ],
    takeaways: [
      "The motor versus sailing yacht comparison runs honestly only when the projections, the cruising calendar, and the carbon position are walked through in writing. Most successor decisions skip this step.",
      "The crew that suits a motor yacht does not always suit a sailing yacht. Plan for some senior turnover at the transition; budget for new specialism rather than expect it.",
      "Hybrid drive is no longer a footnote. Heesen FDHF, Sanlorenzo SX, and equivalent programmes thread the cost and carbon needle for owners with fixed cruising schedules.",
      "Captain selection at the transition is the single most consequential decision. Hire the candidate who pushes back on the calendar, the crew, and the management company.",
    ],
    disclosure:
      "Composite of two Foreland Marine project files, 2020 to 2026. Yard names retained where the original yards were comparable to the names cited; the operating cost trajectory and the cruising-calendar shift are accurate to the original projects.",
  },

  "09-decision-framework": {
    slug: "09-decision-framework",
    title: "The buyer who walked away.",
    standfirst:
      "Six months of search. Three shortlisted yachts. A surveyed hull at the right yard, at a price the buyer\u2019s adviser considered fair. Then the buyer ran the team architecture against the independence test, found that the structure he was being asked to operate inside did not pass it, and walked away from the acquisition. He has not re-entered the market. He considers the decision the right one.",
    meta: [
      { label: "Buyer profile", value: "Recently exited founder, late forties" },
      { label: "Search duration", value: "Six months" },
      { label: "Shortlist", value: "Three yachts, 45 to 55 m motor" },
      { label: "Decision", value: "Withdrew before contract signature" },
      { label: "Anonymisation", value: "Single Foreland project file, 2024" },
    ],
    paragraphs: [
      "The buyer was in his late forties, recently exited from a media business, considering a first acquisition in the 45 to 55 m band. He had engaged an independent adviser at the start of the process, and the search had run cleanly for six months. Three shortlisted yachts. Pre-purchase survey on the preferred candidate. A 49 m motor yacht from a respected mid-tier yard, at EUR 22.5 m, with a clean survey and a fair-market position relative to comparable inventory.",
      "The buyer was prepared to close. His lawyer had reviewed the contract. His surveyor had cleared the yacht for purchase. The independent adviser had run the team-build conversation and was prepared to support the closing.",
      "Then the buyer asked the adviser to walk him through the team architecture across the next decade. Who would be paid by him directly. Who would be paid contingent on a deal closing. Who would carry referral or retrocession economics that he would be paying for indirectly. The adviser took two days to compile the answer.",
      { type: "h2", text: "The architecture, written out" },
      "The independent adviser was paid by the buyer directly, on a fixed fee. Pass.",
      "The lawyer was paid by the buyer directly, on a fixed fee. Pass.",
      "The surveyor was paid by the buyer directly. Pass.",
      "The captain candidate, hired through an independent recruitment agency engaged by the adviser, was paid by the buyer directly. Pass.",
      "The yacht management company, recommended by the adviser from a list of candidates none of which had a continuing relationship with the listing broker, would be paid by the buyer directly. Pass.",
      "The insurance broker, selected by the adviser from a panel of three, would carry a brokerage commission embedded in the premium. Standard practice. Disclosed to the buyer in writing. Acceptable, on the adviser\u2019s framing. Pass with disclosure.",
      "The yard for any future refit work was an open question. The adviser noted that for the buyer\u2019s preferred cruising profile, the natural refit yard would be in the Western Mediterranean, and that the dominant operator in that segment had a corporate ownership history the buyer might want to consider against his independence test. The adviser walked him through the corporate history.",
      "The buyer asked, separately, about the management company. The adviser noted that of the recognised firms in the over-30 m segment, several had ownership relationships with brokerages the buyer had previously interacted with, and that the structurally cleanest option (based on the six-element independence test applied to the management company itself) was a smaller firm the adviser could recommend.",
      "By the end of the conversation, the buyer had a clean architecture. Every fee was disclosed. Every party was paid by him directly or with full disclosure. The team passed the independence test, applied transparently.",
      { type: "h2", text: "What he saw, that the architecture did not solve" },
      "The buyer asked one further question. He asked his adviser, in private, what proportion of his time, attention, and household conversation the yacht was likely to absorb across the next decade.",
      "The adviser was honest. The yacht would absorb approximately 40 to 60 days a year of the buyer\u2019s direct attention through season planning, refit scheduling, supplier conversations, and crew matters. The yacht would absorb approximately 80 to 120 days a year of the buyer\u2019s direct family use. The yacht would absorb a meaningful proportion of household conversation, scheduling, and travel logistics. The yacht would, on the adviser\u2019s honest framing, become a centre of gravity in the buyer\u2019s life.",
      "The buyer thanked the adviser. He returned three days later and informed the adviser that he had decided not to proceed with the acquisition. The decision was not driven by the team architecture, which was clean. It was driven by the recognition, prompted by the conversation, that he did not want a centre of gravity in his life that he had not chosen for non-yacht reasons.",
      {
        type: "blockquote",
        text: "I have spent the last fifteen years building a business that absorbed everything. I have just paid myself for that, and I have a window to choose what comes next. A yacht would be one of the things that comes next. I do not want it to be the largest one.",
        attribution: "The buyer, in conversation with Foreland Marine, week 27.",
      },
      { type: "h2", text: "The arithmetic, post-decision" },
      "The buyer\u2019s six-month engagement with Foreland Marine cost approximately USD 110,000 in adviser fees, plus the survey, lawyer, and incidental costs of the search. Total cost of the search that did not result in an acquisition: approximately USD 195,000.",
      "Across a decade of not-owning, on the practitioner average, the buyer would have spent approximately USD 30 to 45 m on a 49 m yacht acquisition, operating cost, and depreciation. He chose to deploy that capital into a property programme, a venture investment portfolio, and a charter relationship that gives him 30 to 40 days a year on similar-grade yachts without owning any of them. The total cost of his alternative architecture, across the decade, is approximately USD 12 to 18 m. The arithmetic is approximately USD 15 to 25 m of capital not committed to the asset class he had been ready, at week 25, to enter.",
      "The buyer is, on the published record of the family office sector, an unusual case. Most buyers do not walk. He did. The First Owner’s Reference exists because the conversation that prompted the decision is not the conversation the trade press is structured to publish. It is, however, available. To this buyer, on this engagement, it was. The reader of this chapter is invited to have the equivalent conversation, with whichever adviser they consider, before signing.",
    ],
    takeaways: [
      "The independence test, applied to the team architecture, is not the only test. The opportunity-cost test (\u201cwhat else might my decade absorb?\u201d) is the test that produces the rarest outcome.",
      "Walking away is the disciplined response when the buyer\u2019s honest answer to the use-case question is unconvincing. The cost of the search is small against the cost of the wrong decade.",
      "Charter, fractional access, and one-off premium charters can deliver 30 to 40 days a year of yacht use without acquisition. For some buyers this is the right architecture.",
      "An adviser who can structure the team architecture and ask the opportunity-cost question is the adviser who is paid for judgment, not for closing the deal.",
    ],
    disclosure:
      "Single Foreland Marine project file, 2024. Buyer\u2019s identifying details adjusted. The decision pattern, the search cost, and the alternative-architecture arithmetic are accurate to the original project.",
  },
};

export function getCase(slug: string): CaseStudy | undefined {
  return cases[slug];
}
