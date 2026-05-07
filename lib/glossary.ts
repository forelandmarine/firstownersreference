export type GlossaryEntry = {
  slug: string;
  term: string;
  shortDefinition: string;
  longDefinition?: string;
  source?: { name: string; url: string };
  relatedChapters?: string[];
  relatedTerms?: string[];
};

export const glossaryEntries: GlossaryEntry[] = [
  {
    slug: "brokerage",
    term: "Brokerage",
    shortDefinition:
      "The sale of an existing yacht through an intermediary. The seller pays the commission, typically 10 percent of the sale price, regardless of which broker introduces the buyer.",
    longDefinition:
      "Brokerage transactions account for the majority of yacht sales above 24 metres. Commission is paid by the seller from the proceeds of sale, so the buyer is not invoiced directly, but the structure means every party introduced by a brokerage is paid only on a closed transaction. The IYBA standard is a flat 10 percent of the sale price; MYBA uses a sliding scale that decreases at higher transaction values.",
    relatedChapters: ["03-how-the-industry-works", "05-new-build-versus-brokerage"],
    relatedTerms: ["central-agency", "dual-agency", "retrocession"],
  },
  {
    slug: "central-agency",
    term: "Central agency",
    shortDefinition:
      "A formal mandate by which a single broker is appointed by the seller to market the yacht. Other brokers can introduce buyers but only the central agent receives the listing-side commission.",
    longDefinition:
      "Central agency agreements are time-bounded and exclusive. Sub-agency arrangements split the commission between the central agent and any introducing broker, typically at 50/50 on the seller side. The central agent's incentive is to clear the listing, which can produce pressure for price reductions on hulls that have been listed beyond six months.",
    relatedChapters: ["03-how-the-industry-works"],
    relatedTerms: ["brokerage", "dual-agency"],
  },
  {
    slug: "dual-agency",
    term: "Dual agency",
    shortDefinition:
      "When a single brokerage represents both buyer and seller in a transaction. The conflict of interest is structural and may not always be disclosed in writing.",
    longDefinition:
      "Dual agency is permitted in most yacht-broking jurisdictions provided it is disclosed. The standard MYBA and IYBA agreements include a dual-agency clause that the buyer signs with the central agent. Disclosure beyond that boilerplate, including any retrocession arrangements with introducing parties, is typically not volunteered.",
    relatedChapters: ["03-how-the-industry-works", "04-acquisition-process"],
    relatedTerms: ["brokerage", "central-agency", "retrocession"],
  },
  {
    slug: "flag-state",
    term: "Flag state",
    shortDefinition:
      "The country under whose laws a yacht is registered. Common choices for superyachts include Cayman Islands, Marshall Islands, Malta, and the Red Ensign Group jurisdictions.",
    longDefinition:
      "The flag state determines the safety, manning, and operational rules a yacht must comply with, the access to commercial charter regimes, and the tax-and-substance treatment of the owning entity. Cayman, Marshall Islands, and Malta carry roughly 84-day commercial charter allowances under their respective YET, PYLC, and lease frameworks. Selection sits at the intersection of compliance, charter intent, financing, and owner residence.",
    source: {
      name: "Red Ensign Group",
      url: "https://www.redensigngroup.org/",
    },
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["yacht-engaged-in-trade", "red-ensign-group"],
  },
  {
    slug: "ism",
    term: "ISM Code",
    shortDefinition:
      "International Safety Management Code. The mandatory framework under which yachts above 500 gross tonnes operate. Compliance is documented in a Safety Management System.",
    longDefinition:
      "The ISM Code, adopted by the IMO in 1993, requires a documented safety management system covering vessel and shore-based operations. For yachts above 500 GT engaged in international voyages, ISM compliance is verified by the flag state or its recognised organisation, with periodic audits and a Document of Compliance held by the company.",
    source: {
      name: "International Maritime Organization",
      url: "https://www.imo.org/en/OurWork/HumanElement/Pages/ISMCode.aspx",
    },
    relatedChapters: ["07-operations"],
    relatedTerms: ["mlc", "isps"],
  },
  {
    slug: "mlc",
    term: "MLC 2006",
    shortDefinition:
      "Maritime Labour Convention 2006. The treaty governing crew working conditions, contracts, hours, and welfare. Applies to most commercially operated superyachts.",
    longDefinition:
      "MLC 2006 sets minimum standards for seafarers' working and living conditions, including employment agreements, hours of work and rest, accommodation, recreational facilities, food, medical care, and social security. Yachts above 500 GT engaged in international voyages must hold a Maritime Labour Certificate, with a five-year validity and intermediate inspection.",
    source: {
      name: "International Labour Organization",
      url: "https://www.ilo.org/global/standards/maritime-labour-convention/lang--en/index.htm",
    },
    relatedChapters: ["07-operations"],
    relatedTerms: ["ism", "eng1"],
  },
  {
    slug: "myba",
    term: "MYBA",
    shortDefinition:
      "Mediterranean Yacht Brokers Association. Publishes the standard charter agreement used across most of the Mediterranean charter market.",
    longDefinition:
      "MYBA publishes the standard charter agreement (MYBA Charter Agreement, current edition 2024), the standard memorandum of agreement for sale and purchase, the inventory form, and the central agency agreement. The MYBA forms govern the majority of charters above 24 metres in the Mediterranean and Caribbean.",
    source: {
      name: "MYBA Worldwide Yachting Association",
      url: "https://www.myba-association.com/",
    },
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["moa", "charter-vat"],
  },
  {
    slug: "owners-representative",
    term: "Owner's representative",
    shortDefinition:
      "An independent professional appointed by the buyer to oversee a new build or major refit. Paid by the owner, with no commercial relationship to the yard.",
    longDefinition:
      "The owner's representative manages the buyer's interests across yard selection, contract drafting, technical specification, build supervision, milestone inspection, snag-listing, and delivery acceptance. The independence test is whether the representative's income is contingent only on the buyer's instructions, with no yard commission, no broker referral, and no contingent-fee arrangement on closing.",
    relatedChapters: ["05-new-build-versus-brokerage", "06-refit", "09-decision-framework"],
    relatedTerms: ["yorr", "sybass"],
  },
  {
    slug: "pre-purchase-survey",
    term: "Pre-purchase survey",
    shortDefinition:
      "An independent technical inspection commissioned by the buyer before contract. Distinct from the seller's most recent survey and almost always worth the cost.",
    longDefinition:
      "A pre-purchase survey covers structural, mechanical, electrical, and operational systems, typically over four to seven days afloat plus a haul-out. Cost on a 40 to 50 metre yacht runs USD 25,000 to 60,000 inclusive of paint specialist and class-society inspector. The buyer engages the surveyor directly, and the surveyor's fee is paid by the buyer regardless of whether the deal closes.",
    relatedChapters: ["04-acquisition-process"],
    relatedTerms: ["sea-trial", "moa"],
  },
  {
    slug: "refit",
    term: "Refit",
    shortDefinition:
      "Major maintenance, modernisation, or rebuild work undertaken at a specialist yard. Typical scopes range from cosmetic refresh to multi-year structural rebuild.",
    longDefinition:
      "Refit is the umbrella term for periodic capex on a yacht above survey-and-class minimum. Mid-life refits at year five to seven typically cover paint, soft furnishings, and selective system upgrades. Full refits at year ten to fifteen include structural and propulsion work and can run 30 to 60 percent of the yacht's pre-refit market value. Overrun against initial budget runs 30 to 50 percent on the empirical opened-up-vessel pattern.",
    relatedChapters: ["06-refit"],
    relatedTerms: ["spanish-ipr", "owners-representative"],
  },
  {
    slug: "retrocession",
    term: "Retrocession",
    shortDefinition:
      "A commission rebate paid quietly between counterparties, often from a yard or supplier back to a referring broker, captain, or management company. Frequently undisclosed.",
    longDefinition:
      "Retrocession arrangements are legal in most jurisdictions provided they are disclosed. The structural problem is that disclosure is typically not volunteered. The OnboardOnline legal column has stated the position plainly: retrocession is permitted only where the recipient discloses it to the principal whose interests they represent.",
    relatedChapters: ["03-how-the-industry-works"],
    relatedTerms: ["dual-agency", "brokerage"],
  },
  {
    slug: "sybass",
    term: "SYBAss",
    shortDefinition:
      "Superyacht Builders Association. Membership signals an independently audited ability to deliver new builds above 40 metres.",
    longDefinition:
      "SYBAss membership is granted to yards that demonstrate, through independent audit, the capacity to deliver yachts above 40 metres. Membership covers Northern European custom yards (Feadship, Lurssen, Oceanco, Heesen, Royal Huisman, Vitters, Baltic) and a small number of Italian and Turkish builders. SYBAss founded the Yacht Owners' Register of Representatives jointly with the Superyacht Alliance, IAMI, and GUEST.",
    source: {
      name: "Superyacht Builders Association",
      url: "https://www.sybass.org/",
    },
    relatedChapters: ["05-new-build-versus-brokerage"],
    relatedTerms: ["yorr", "owners-representative"],
  },
  {
    slug: "spanish-ipr",
    term: "Spanish IPR",
    shortDefinition:
      "Inward Processing Relief. A customs regime allowing non-EU yachts to undergo refit work in Spain without paying import VAT, provided they are subsequently re-exported.",
    longDefinition:
      "Spanish IPR (Inward Processing Relief) is the EU customs regime under which a non-EU-flagged yacht can enter Spain for refit work without triggering EU VAT or import duty, provided the yacht is re-exported on completion. The regime is widely used at MB92 Barcelona, STP Palma, and Astilleros de Mallorca. Equivalent regimes exist in France (Commercial Exemption) and Italy.",
    relatedChapters: ["06-refit"],
    relatedTerms: ["temporary-admission", "vat-paid-status"],
  },
  {
    slug: "vat-regime",
    term: "VAT regime",
    shortDefinition:
      "The framework under which value-added tax is paid (or relieved) on a yacht's purchase, importation, and operation. Choices include Spanish IPR, French commercial exemption, Italian leasing, and Maltese.",
    longDefinition:
      "The applicable VAT regime depends on the yacht's flag state, the owner's residence, the area of operation, and whether the yacht is operated privately or commercially. EU member states harmonised their charter VAT treatment under Council pressure between 2018 and 2020; length-based reductions were withdrawn and replaced with effective-use approaches.",
    relatedChapters: ["04-acquisition-process", "06-refit", "07-operations"],
    relatedTerms: ["spanish-ipr", "temporary-admission", "charter-vat"],
  },
  {
    slug: "yacht-management-company",
    term: "Yacht management company",
    shortDefinition:
      "A firm engaged by the owner to handle compliance, accounting, crew administration, and operational support. Distinct from a broker. Should be selected independently.",
    longDefinition:
      "A yacht management company handles the day-to-day operational, regulatory, financial, and crew matters that the owner does not engage with directly. Selection should be made independently of the broker who introduced the yacht, since the management contract is recurring revenue and brokerages have established management arms or referral relationships that may not align with the owner's interest.",
    relatedChapters: ["07-operations"],
    relatedTerms: ["retrocession", "owners-representative"],
  },
  {
    slug: "yorr",
    term: "YORR",
    shortDefinition:
      "Yacht Owner's Representative Register. The cross-industry register on which qualifying owner's representatives are listed; administered by the Superyacht Alliance for Professional Standards and searchable at superyachtalliance.org/register/register-table/.",
    longDefinition:
      "YORR is the cross-industry register of vetted owner's representatives, launched at The Superyacht Forum in Amsterdam in November 2024 by SYBAss, the Superyacht Alliance for Professional Standards, IAMI, and GUEST. Inclusion requires demonstrated independence from yards, brokers, and management companies, the SYBAss-aligned YORP training (practitioners with three or more approved large refit or new build projects can register via Unit 40 alone; all other candidates complete the full 200-hour programme over four courses), a CV audit, and a documented track record on builds above 40 metres. The register is published as a public table at superyachtalliance.org/register/register-table/ and is searchable by firm and by named principal; buyers considering an owner's representative can verify the firm and the principal directly on the register before engagement.",
    source: {
      name: "Yacht Owner's Representative Register",
      url: "https://superyachtalliance.org/register/register-table/",
    },
    relatedChapters: ["05-new-build-versus-brokerage", "09-decision-framework"],
    relatedTerms: ["owners-representative", "sybass"],
  },
  {
    slug: "vat-paid-status",
    term: "VAT-paid status",
    shortDefinition:
      "Confirmation that EU VAT has been settled on the yacht's hull, attaching to the asset rather than the flag. A VAT-paid yacht can move freely within the EU customs territory.",
    longDefinition:
      "EU VAT-paid status attaches to the hull, not the flag. A Maltese-flagged yacht owned by a non-EU SPV is not automatically EU VAT-paid; conversely a Cayman-flagged hull on which import VAT was settled in Italy is EU VAT-paid. Documentary evidence is the importation declaration and VAT receipt. Loss of VAT-paid status can occur on certain ownership changes, modifications, or extended absence from EU waters under specific circumstances.",
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["importation", "temporary-admission", "vat-regime"],
  },
  {
    slug: "importation",
    term: "Importation",
    shortDefinition:
      "The customs procedure under which a yacht enters EU customs territory and Union customs status is granted, typically with VAT and any duty paid at the point of entry.",
    longDefinition:
      "Importation is the customs act by which a non-EU yacht obtains Union goods status. It involves payment of VAT on the customs value of the yacht, plus any applicable duty. Once imported, the yacht can move freely within the EU customs territory without further customs formalities, subject to retention of VAT-paid status. The importing entity must be EU-established for standard importation; non-EU buyers route through an EU representative or via Spanish IPR or French Commercial Exemption to defer the VAT trigger.",
    relatedChapters: ["04-acquisition-process", "06-refit"],
    relatedTerms: ["vat-paid-status", "spanish-ipr", "temporary-admission"],
  },
  {
    slug: "temporary-admission",
    term: "Temporary Admission",
    shortDefinition:
      "An EU customs regime under which a non-EU registered yacht with non-EU established owner and users can cruise EU waters for up to 18 months at a stretch without paying VAT or duty.",
    longDefinition:
      "Temporary Admission (TA) permits a non-EU yacht to enter EU customs territory for a maximum of 18 months in any one period, with an aggregate cap of up to 10 years cumulative. The yacht must be non-EU registered, non-EU owned, and used by non-EU established persons; commercial charter from EU ports under TA is prohibited. Sale of a yacht under TA inside the EU triggers VAT and duty. TA resets when the yacht leaves EU waters and obtains a third-country customs stamp.",
    source: {
      name: "European Commission Taxation and Customs Union",
      url: "https://taxation-customs.ec.europa.eu/document/download/fa095d6b-45dd-4c7a-94c7-bad21d0473a9_en",
    },
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["vat-paid-status", "importation", "vat-regime"],
  },
  {
    slug: "spanish-matriculation-tax",
    term: "Spanish matriculation tax",
    shortDefinition:
      "A 12 percent registration tax levied by Spain on yachts above 8 metres used for private leisure by Spanish-resident owners. Charter use is exempt under qualifying conditions.",
    longDefinition:
      "The Impuesto Especial sobre Determinados Medios de Transporte applies at 12 percent of the yacht's value when registered in Spain for private leisure use by a Spanish-resident owner or used in Spanish waters by a Spanish resident for more than 183 days. Yachts engaged in qualifying commercial charter activity, with documented charter contracts and a Spanish charter licence, are exempt. The tax is one of the structural reasons that VAT-paid yachts owned by Spanish residents are commonly held through non-Spanish SPVs operating commercially.",
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["vat-regime", "vat-paid-status", "charter-vat"],
  },
  {
    slug: "charter-vat",
    term: "Charter VAT",
    shortDefinition:
      "Value-added tax applied to commercial yacht charters, charged where the charter is enjoyed. Standard EU rates range from 8 to 22 percent depending on jurisdiction and effective use.",
    longDefinition:
      "EU charter VAT is taxed at the place of enjoyment. The historic length-based reductions (Maltese, Cypriot, Greek lease schemes) were withdrawn between 2018 and 2020 under EU Commission infringement procedures. Effective-use approaches now apply, with pro-rata reductions documented against international-waters time. Italian charters carry 22 percent standard rate; French and Spanish standard rates apply locally. Maltese charters since the 2019 reform follow effective-use rules. Charter VAT is the operator's liability; the published charter rate is typically VAT-exclusive.",
    relatedChapters: ["07-operations"],
    relatedTerms: ["vat-regime", "myba", "vat-paid-status"],
  },
  {
    slug: "yacht-engaged-in-trade",
    term: "Yacht Engaged in Trade",
    shortDefinition:
      "A flag-state regime allowing a privately registered yacht to undertake commercial charter activity for a limited period, typically 84 days per year, in defined geographies.",
    longDefinition:
      "YET frameworks exist under Cayman Islands, Marshall Islands, Isle of Man, and Bahamas registries, allowing private yachts to undertake limited commercial charter without converting to a fully commercial registration. The standard allowance is 84 days per calendar year, restricted to specified jurisdictions (typically France, Monaco, with some flags adding Croatia, Greece, or Italy). YET requires conversion to a Yacht Code Chapter II compliance standard for the duration of charter operation.",
    source: {
      name: "Cayman Shipping Registry",
      url: "https://www.cishipping.com/services/yacht/yacht-engaged-in-trade",
    },
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["flag-state", "red-ensign-group", "charter-vat"],
  },
  {
    slug: "red-ensign-group",
    term: "Red Ensign Group",
    shortDefinition:
      "The collective UK and British Crown Dependencies and Overseas Territories ship registries operating under MCA-equivalent standards. Includes Cayman, Bermuda, Gibraltar, BVI, Isle of Man, Jersey, and Guernsey.",
    longDefinition:
      "The Red Ensign Group comprises Category 1 registries (UK, Cayman Islands, Bermuda, BVI, Gibraltar, Isle of Man) which can register vessels of unlimited tonnage and type, and Category 2 registries (Anguilla, Falkland Islands, Guernsey, Jersey, Montserrat, St Helena, Turks and Caicos) which are limited to commercial ships and pleasure vessels up to 150 GT, extendable to 400 GT by agreement with the UK. All members operate to MCA-equivalent standards under the REG Yacht Code.",
    source: {
      name: "Red Ensign Group",
      url: "https://www.redensigngroup.org/",
    },
    relatedChapters: ["04-acquisition-process"],
    relatedTerms: ["flag-state", "yacht-engaged-in-trade"],
  },
  {
    slug: "moa",
    term: "MOA",
    shortDefinition:
      "Memorandum of Agreement. The binding sale and purchase contract for a yacht. The MYBA form is standard in the Mediterranean and Caribbean; the IYBA form is used in the Americas.",
    longDefinition:
      "The MOA is signed at offer-acceptance and amended through to closing. Key clauses cover title warranties, inventory, deposit handling and escrow, condition at delivery, deficiencies remediation, governing law and jurisdiction, and the closing protocol. MYBA Memorandum of Agreement (current version 2024) is the dominant form. Independent counsel review at heads of terms is the buyer's structural protection; the form's defaults often favour the seller's broker.",
    source: {
      name: "MYBA Worldwide Yachting Association",
      url: "https://www.myba-association.com/",
    },
    relatedChapters: ["04-acquisition-process"],
    relatedTerms: ["myba", "pre-purchase-survey", "sea-trial"],
  },
  {
    slug: "sea-trial",
    term: "Sea trial",
    shortDefinition:
      "An on-the-water test of the yacht under representative load, undertaken with the buyer's own captain candidate, surveyor, and chief engineer present.",
    longDefinition:
      "The sea trial is the buyer's last technical inspection before closing. Trial scope covers the failure modes the pre-purchase survey identified, plus stability, vibration, noise, electronics under load, propulsion at full power, and emergency systems. The buyer's own captain candidate (and where relevant chief engineer) should be present alongside the surveyor. Findings can support renegotiation; readiness to walk away if material issues surface is the buyer's structural lever.",
    relatedChapters: ["04-acquisition-process"],
    relatedTerms: ["pre-purchase-survey", "moa"],
  },
  {
    slug: "isps",
    term: "ISPS Code",
    shortDefinition:
      "International Ship and Port Facility Security Code. Mandatory security framework for vessels above 500 GT engaged in international voyages, including documented Ship Security Plan and certificates.",
    longDefinition:
      "Adopted by the IMO under SOLAS in 2002 following the 2001 attacks, the ISPS Code requires vessels above 500 GT engaged on international voyages to operate under an approved Ship Security Plan with a designated Ship Security Officer and Company Security Officer, with port-facility security at three escalating levels. International Ship Security Certificate validity is five years with intermediate verification.",
    source: {
      name: "International Maritime Organization",
      url: "https://www.imo.org/en/OurWork/Security/Pages/MaritimeSecurity-default.aspx",
    },
    relatedChapters: ["07-operations"],
    relatedTerms: ["ism", "mlc"],
  },
  {
    slug: "p-and-i",
    term: "P&I",
    shortDefinition:
      "Protection and Indemnity. Mutual liability insurance covering crew injury, environmental damage, third-party claims, and charter-guest exposure. Typically written by mutual clubs.",
    longDefinition:
      "P&I cover is the third-party and crew-liability layer above hull insurance. Yacht-specialist mutuals include Shipowners' Club and Steamship Mutual; commercial insurers including Pantaenius, AON, Gallagher Specialty, and Lloyd's syndicates also write yacht P&I. Standard limits for a 40 to 50 metre yacht run to EUR 500 million third-party. P&I covers MLC repatriation liability for crew, environmental damage including bunker spill, and charter-guest claims; hull insurance covers the asset itself.",
    relatedChapters: ["07-operations"],
    relatedTerms: ["hull-insurance", "mlc"],
  },
  {
    slug: "hull-insurance",
    term: "Hull insurance",
    shortDefinition:
      "Insurance on the yacht as a physical asset. Standard premium for a well-maintained 40 to 50 metre yacht is 0.7 to 1.5 percent of insured value per year.",
    longDefinition:
      "Hull insurance covers physical loss or damage to the yacht and its machinery. Premium is set by insured value, age, claims history, captain track record, navigation limits, and operational profile (private versus charter). Underwriting is typically through Pantaenius, AON Marine, Gallagher Specialty, or Lloyd's specialist syndicates. Builder's risk insurance covers the yacht during refit, with the buyer's interest noted, and should cover transit between subcontractor sites.",
    relatedChapters: ["07-operations"],
    relatedTerms: ["p-and-i"],
  },
  {
    slug: "class-society",
    term: "Class society",
    shortDefinition:
      "A recognised organisation that surveys yachts to defined construction and maintenance standards. The major IACS members are Lloyd's Register, DNV, Bureau Veritas, RINA, ABS, and ClassNK.",
    longDefinition:
      "Class societies set construction rules, conduct surveys at construction and through service, and issue and maintain class notations. Class is required for most commercial yachts and increasingly for large private yachts above 500 GT. Common notations on superyachts include LR 100A1 SSC, DNV +1A1 LC Yacht, BV I HULL MACH Yacht, RINA C+ Yacht. Class operates parallel to flag-state inspection; the class society can act as a Recognised Organisation under flag delegation.",
    relatedChapters: ["04-acquisition-process", "06-refit", "07-operations"],
    relatedTerms: ["ism", "isps"],
  },
  {
    slug: "ais",
    term: "AIS",
    shortDefinition:
      "Automatic Identification System. A continuous radio broadcast of vessel position, course, speed, identity, and dimensions, mandatory on most yachts above 300 GT.",
    longDefinition:
      "AIS Class A transponders are mandatory on commercial vessels above 300 GT under SOLAS Chapter V Regulation 19. Class B is voluntary on smaller yachts. AIS data is publicly available through MarineTraffic, VesselFinder, and similar services, which is an operational consideration for owner privacy. Owners can request flagging changes to limit publicly displayed data within the constraints of the regulation.",
    relatedChapters: ["07-operations"],
    relatedTerms: ["ecdis", "ism"],
  },
  {
    slug: "ecdis",
    term: "ECDIS",
    shortDefinition:
      "Electronic Chart Display and Information System. A computer-based navigation system using vector electronic charts, mandatory on most commercially registered yachts above 500 GT.",
    longDefinition:
      "ECDIS is mandated under SOLAS Chapter V for vessels engaged on international voyages above 500 GT. Type approval requires conformance with IMO Resolution A.817(19). Bridge officers must be ECDIS-trained per STCW Manila amendments. ECDIS replaces paper charts as the primary means of navigation; paper charts may be retained as backup at flag-state discretion.",
    relatedChapters: ["07-operations"],
    relatedTerms: ["ais", "ism"],
  },
  {
    slug: "eng1",
    term: "ENG1",
    shortDefinition:
      "MCA seafarer medical certificate. Mandatory under STCW for crew working on commercial yachts. Two-year validity; first issue requires UK-approved doctor.",
    longDefinition:
      "The ENG1 is the UK MCA's seafarer medical fitness certificate, equivalent to standards under STCW Regulation I/9. Crew on Red Ensign-flagged commercial yachts and many other flags require an ENG1 or equivalent. Validity is two years for under-18s, two years for over-18s with the next certificate due at least one month before the previous expires. Examination covers vision, hearing, cardiovascular, respiratory, mental health, and physical capacity.",
    source: {
      name: "UK Maritime and Coastguard Agency",
      url: "https://www.gov.uk/seafarer-medical-certificates",
    },
    relatedChapters: ["07-operations"],
    relatedTerms: ["mlc", "ism"],
  },
  {
    slug: "stcw",
    term: "STCW",
    shortDefinition:
      "Standards of Training, Certification, and Watchkeeping for Seafarers. The IMO convention setting global minimum standards for seafarer competency.",
    longDefinition:
      "STCW 1978 as amended (Manila amendments 2010) sets minimum standards for training, certification, and watchkeeping. All seafarers on commercially operated yachts above 500 GT require STCW Basic Safety Training as a minimum. Senior officers require STCW Certificates of Competency at deck (Master, Chief Mate, OOW), engineering (Chief Engineer, Second Engineer, EOOW), and other functional levels. Flag states issue endorsements recognising CoCs from other flags.",
    source: {
      name: "International Maritime Organization",
      url: "https://www.imo.org/en/OurWork/HumanElement/Pages/STCW-Convention.aspx",
    },
    relatedChapters: ["07-operations"],
    relatedTerms: ["mlc", "eng1"],
  },
  {
    slug: "marpol",
    term: "MARPOL Annex VI",
    shortDefinition:
      "International Convention for the Prevention of Pollution from Ships. Annex VI covers air pollution including SOx, NOx, particulate matter, and CO2 from yachts.",
    longDefinition:
      "MARPOL Annex VI sets emission limits for sulphur, nitrogen oxides, particulate matter, and CO2 from ships. The 2020 global sulphur cap reduced fuel sulphur content to 0.5 percent (0.1 percent in Emission Control Areas). NOx Tier III applies to engines on vessels constructed after 1 January 2016 operating in NOx ECAs. Yachts above 5,000 GT entering EU ports are now within EU ETS Maritime; below 5,000 GT, the cost is not yet direct.",
    relatedChapters: ["07-operations", "08-motor-versus-sail"],
    relatedTerms: ["eu-ets", "tier-iii"],
  },
  {
    slug: "eu-ets",
    term: "EU ETS Maritime",
    shortDefinition:
      "EU Emissions Trading System for shipping, in force from 2024 and phased in through 2026. Applies to commercial vessels above 5,000 GT entering EU ports.",
    longDefinition:
      "EU ETS Maritime extends the EU's carbon market to shipping, in phased application: 40 percent of verified emissions covered in 2024, 70 percent in 2025, 100 percent from 2026. The system covers vessels above 5,000 GT entering EU ports, regardless of flag. Most yachts (including 60 to 80 metre motor) sit below the 5,000 GT threshold. Above 5,000 GT, exposure runs EUR 200,000 to 400,000 per year at current carbon prices on a well-utilised vessel. Compliance requires emissions monitoring and EUA surrender.",
    relatedChapters: ["08-motor-versus-sail"],
    relatedTerms: ["marpol", "tier-iii"],
  },
  {
    slug: "tier-iii",
    term: "Tier III emissions",
    shortDefinition:
      "MARPOL Annex VI NOx emission standard for engines installed on vessels constructed after 1 January 2016 operating in designated NOx Emission Control Areas.",
    longDefinition:
      "Tier III applies to marine diesel engines on vessels constructed after 1 January 2016 operating in NOx Emission Control Areas (the North American ECA, the US Caribbean ECA, the Baltic Sea NECA, and the North Sea NECA). The standard requires roughly 75 percent reduction in NOx emissions versus Tier I, achieved through SCR (selective catalytic reduction) or EGR (exhaust gas recirculation). New build superyachts crossing into NECAs must specify Tier III propulsion at design.",
    relatedChapters: ["08-motor-versus-sail"],
    relatedTerms: ["marpol", "eu-ets"],
  },
  {
    slug: "polar-code",
    term: "Polar Code",
    shortDefinition:
      "International Code for Ships Operating in Polar Waters. Mandatory IMO framework covering vessel design, equipment, and operations in Arctic and Antarctic waters.",
    longDefinition:
      "The Polar Code (in force January 2017 for new build, July 2018 for existing) sets safety, training, and environmental standards for vessels in Arctic and Antarctic waters. Yachts intended for high-latitude cruising require Polar Ship Certification, with categories A, B, or C reflecting ice exposure. Specific build features include winterised systems, ice-strengthened hulls (Class polar notation PC1 to PC7), enhanced damage stability, and trained Polar-rated officers.",
    source: {
      name: "International Maritime Organization",
      url: "https://www.imo.org/en/OurWork/Safety/Pages/polar-default.aspx",
    },
    relatedChapters: ["08-motor-versus-sail"],
    relatedTerms: ["class-society", "marpol"],
  },
  {
    slug: "punch-list",
    term: "Punch list",
    shortDefinition:
      "The list of outstanding items, defects, or incomplete work identified at a yacht's delivery or refit redelivery, to be completed by the yard before final acceptance.",
    longDefinition:
      "The punch list (or snag list) is the buyer's record of items not at acceptance condition at delivery. A diligent owner's representative on a 40 to 50 metre new build will typically generate 800 to 1,500 items by delivery; the published Inglis case at ULTIMAR documented 1,200 items where the family office's own count was 100. Punch-list management with the yard, with a withheld retention against final closure, is the standard discipline; final payment held against punch-list closure is the buyer's lever.",
    relatedChapters: ["05-new-build-versus-brokerage", "06-refit"],
    relatedTerms: ["owners-representative", "moa"],
  },
  {
    slug: "stage-payments",
    term: "Stage payments",
    shortDefinition:
      "The payment schedule on a yacht new build, structured against build milestones. Industry-typical loading is 50 to 70 percent of contract value before delivery.",
    longDefinition:
      "Stage payment loading reflects the yard's working capital requirement against build progress. Industry-typical loading is 50 to 70 percent of contract value paid before delivery, with the balance at delivery and final acceptance. Heavier front-loading is yard-favourable and may signal yard cash-flow pressure. Each stage payment should be backed by a refund guarantee from a tier-one bank with pay-on-demand wording; surety wrappers are weaker. Payment should be tied to verified milestone completion, not calendar dates.",
    relatedChapters: ["05-new-build-versus-brokerage"],
    relatedTerms: ["punch-list", "owners-representative"],
  },
  {
    slug: "lmaa",
    term: "LMAA arbitration",
    shortDefinition:
      "London Maritime Arbitrators Association. The default arbitration forum for yacht new build and major refit contracts under English law.",
    longDefinition:
      "LMAA arbitration is the practitioner default for English-law yacht contracts. The forum is private, the awards binding, and the LMAA Terms (current 2021 edition) provide a developed procedural framework. English law plus LMAA arbitration is the standard dispute clause in SYBAss-yard new build contracts and most major refit contracts. Selection of LMAA over court litigation reflects confidentiality, speed, and the specialist arbitrator pool with shipbuilding and yacht expertise.",
    source: {
      name: "London Maritime Arbitrators Association",
      url: "https://lmaa.london/",
    },
    relatedChapters: ["05-new-build-versus-brokerage"],
    relatedTerms: ["moa"],
  },
  {
    slug: "obbba",
    term: "OBBBA bonus depreciation",
    shortDefinition:
      "United States One Big Beautiful Bill Act provision allowing up to 100 percent first-year depreciation on yachts placed in commercial service between 2025 and 2029.",
    longDefinition:
      "The One Big Beautiful Bill Act of 2025 (in force January 2025) restored 100 percent bonus depreciation on qualifying business assets including yachts placed in commercial service between 20 January 2025 and 21 December 2029. Conditions, drawn from US tax-law business-use principles, require greater than 50 percent charter use and greater than 50 percent US-waters time, with contemporaneous documentation. Identified by Stewart Campbell of BOAT International as the largest single driver of the 2025 surge that took global yacht transactions to USD 8.5 billion. Pre-transaction US yacht-tax counsel review essential.",
    relatedChapters: ["02-reading-the-market"],
    relatedTerms: ["obbba"],
  },
  {
    slug: "knight-frank-wr",
    term: "Knight Frank Wealth Report",
    shortDefinition:
      "The annual reference report on global UHNW wealth, published by Knight Frank Research. The 2026 edition includes a yacht-market spread sourced from BOAT International.",
    longDefinition:
      "The Knight Frank Wealth Report is published annually in early March. The Wealth Sizing Model uses HM Revenue and Customs UHNW data plus Capgemini, BOAT International, and proprietary research to size the global UHNW population (USD 30m+ wealth). The 2026 edition (20th anniversary) places the population at 713,626, up 162,191 over five years, with 41 percent of new UHNWIs created in the United States. The yacht spread (sourced from BOAT International) records USD 8.5 billion 2025 transactions, 70 percent year-on-year rise.",
    source: {
      name: "Knight Frank Wealth Report",
      url: "https://www.knightfrank.com/research/reports/wealthreport",
    },
    relatedChapters: ["02-reading-the-market"],
    relatedTerms: ["obbba"],
  },
  {
    slug: "global-order-book",
    term: "BOAT International Global Order Book",
    shortDefinition:
      "The annual census of yachts above 24 metres in build or on order, published by BOAT International. The 2026 edition records 1,093 yachts.",
    longDefinition:
      "The BOAT International Global Order Book is the industry reference for new build pipeline. Compiled annually from yard data, it records yachts above 24 metres in build or on order at the time of the count. The 2026 edition (1,093 yachts, down from 1,138 in 2025) marks the second consecutive annual decline by unit count. Average length on the order book has risen to 40.8 metres and 551 GT, the highest ever recorded. Italy is dominant production geography at 568 units, 52 percent of the global order book.",
    source: {
      name: "BOAT International",
      url: "https://www.boatinternational.com/boat-pro/global-order-book/global-order-book-2026-report",
    },
    relatedChapters: ["02-reading-the-market"],
  },
  {
    slug: "yet",
    term: "YET (Yacht Engaged in Trade)",
    shortDefinition:
      "Cayman Islands and other flag-state regimes for limited commercial use by privately registered yachts in defined EU jurisdictions.",
    longDefinition:
      "YET is the Cayman Shipping Registry's specific framework, replicated in similar form by Marshall Islands, Isle of Man, and Bahamas. It allows a privately registered yacht to undertake up to 84 days commercial charter per calendar year, in specified EU jurisdictions (Cayman: France, Monaco; Marshall Islands: France, Monaco, Croatia; Isle of Man: France, Monaco, Greece). Conversion requires Yacht Code Chapter II compliance for the duration of charter operation.",
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["yacht-engaged-in-trade", "flag-state", "red-ensign-group"],
  },
  {
    slug: "spv",
    term: "SPV (Special Purpose Vehicle)",
    shortDefinition:
      "A separate legal entity established to own a single yacht, providing limited liability, clean transferability, and the structural framework for charter VAT routing.",
    longDefinition:
      "Single-yacht SPV is the practitioner-default ownership structure. Common SPV jurisdictions include BVI, Cayman, Jersey, Guernsey, Isle of Man, Malta, Marshall Islands, and Luxembourg. Reasons for the structure: limited liability ringfencing per asset, clean sale execution as a share sale (preserves VAT-paid status, registration history, crew contracts), marine-lender mortgage perfection, charter VAT routing through the EU SPV when relevant, succession transfer through share movement. Burgess, Camper & Nicholsons, Y.CO, Dixcart, IQ-EQ, and Praxis all default-recommend single-yacht SPV.",
    relatedChapters: ["04-acquisition-process", "07-operations"],
    relatedTerms: ["beneficial-ownership"],
  },
  {
    slug: "beneficial-ownership",
    term: "Beneficial ownership",
    shortDefinition:
      "The natural person who ultimately owns or controls a legal entity. EU public access to UBO registers was restricted by the 2022 CJEU Sovim ruling.",
    longDefinition:
      "Beneficial ownership disclosure regimes vary by jurisdiction. EU member states post-Sovim (CJEU Joined Cases C-37/20 and C-601/20, 22 November 2022) restrict public access; legitimate-interest filters now apply under the post-2024 AML package. UK Companies House Persons with Significant Control register remains publicly searchable. Cayman Islands operates a Beneficial Ownership Transparency Act 2023 (in force July 2024) with Legitimate Interest Access Regulations 2024 (in force February 2025), restricting access to defined applicants.",
    relatedChapters: ["04-acquisition-process"],
    relatedTerms: ["spv"],
  },
];

export function getGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossaryEntries.find((entry) => entry.slug === slug);
}
