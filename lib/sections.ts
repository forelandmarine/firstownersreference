export type Section = {
  number: string;
  slug: string;
  title: string;
  standfirst: string;
  coordinates: string;
  hero: string;
  heroFocus?: "top" | "center" | "bottom" | "left" | "right";
  contributor: string;
  contributorRole: string;
  seoTitle: string;
  seoDescription: string;
  datePublished: string;
  dateModified?: string;
};

export const sections: Section[] = [
  {
    number: "01",
    slug: "01-reality-of-ownership",
    title: "The reality of ownership",
    standfirst:
      "What the first three years of yacht ownership actually look like, in time and in money.",
    coordinates: "39.5696°N 2.6502°E",
    hero: "/images/stock/overwater-deck.jpg",
    contributor: "To be confirmed",
    contributorRole: "Yacht management head",
    seoTitle: "Superyacht running costs and the 10 percent rule",
    seoDescription:
      "Annual running costs, the folkloric 10 percent rule, depreciation reality, and the charter delusion. What the first three years of superyacht ownership actually cost. Sourced from Knight Frank, BOAT International, Quay Crew, and aggregated practitioner data.",
    datePublished: "2026-05-01",
  },
  {
    number: "02",
    slug: "02-reading-the-market",
    title: "Reading the market in 2026",
    standfirst:
      "Where the order book actually sits, who has capacity, and what that means for a buyer entering this year.",
    coordinates: "50.7601°N 1.2982°W",
    hero: "/images/stock/monaco-fleet.jpg",
    contributor: "To be confirmed",
    contributorRole: "Market intelligence head",
    seoTitle: "Superyacht market 2026: order book, wealth growth, supply",
    seoDescription:
      "The 2026 superyacht market: BOAT International Global Order Book at 1,093 yachts, Knight Frank UHNW growth, Italian yard dominance, and what the structural narrowing means for a first-time buyer.",
    datePublished: "2026-05-01",
  },
  {
    number: "03",
    slug: "03-how-the-industry-works",
    title: "How the industry actually works",
    standfirst:
      "Conflicts, commissions, retrocessions, and the captain's role at the centre of it. Said plainly.",
    coordinates: "43.5528°N 7.0174°E",
    hero: "/images/stock/cap-cove-tenders.jpg",
    contributor: "To be confirmed",
    contributorRole: "Yacht lawyer",
    seoTitle:
      "Yacht broker commissions, retrocessions, and conflicts of interest",
    seoDescription:
      "The structural conflicts in superyacht acquisition: who pays the broker commission, how dual agency works in practice, what retrocession arrangements look like, and the captain's role at the centre of the structure.",
    datePublished: "2026-05-01",
  },
  {
    number: "04",
    slug: "04-acquisition-process",
    title: "The acquisition process",
    standfirst:
      "From shortlist to closing. Surveys, sea trials, VAT regimes, flag choice, and the five most common pitfalls.",
    coordinates: "35.8989°N 14.5146°E",
    hero: "/images/stock/bridge-radar.jpg",
    contributor: "To be confirmed",
    contributorRole: "Senior surveyor",
    seoTitle: "How to buy a superyacht: the 12 to 24 week acquisition process",
    seoDescription:
      "The yacht acquisition process from shortlist to closing: pre-purchase survey, sea trial, MOA, VAT and flag-state choice, and the disciplines that defeat the most common pitfalls.",
    datePublished: "2026-05-01",
  },
  {
    number: "05",
    slug: "05-new-build-versus-brokerage",
    title: "New build versus brokerage",
    standfirst:
      "The 24 to 36 month commitment of a new build, against the immediacy of brokerage. Trade-offs and the cases for each.",
    coordinates: "53.0040°N 5.6603°E",
    hero: "/images/stock/red-hull-launch.jpg",
    heroFocus: "bottom",
    contributor: "Hein Velema",
    contributorRole:
      "Secretary General, Superyacht Alliance for Professional Standards",
    seoTitle:
      "New build vs brokerage superyacht: contract, owner's rep, costs",
    seoDescription:
      "Yacht new build versus brokerage. Threshold tests, contract drafting at heads of terms, the owner's representative role, and the variation-margin overrun pattern documented across SYBAss yards.",
    datePublished: "2026-05-01",
  },
  {
    number: "06",
    slug: "06-refit",
    title: "Refit",
    standfirst:
      "When to refit and when to sell. Yard selection, scope discipline, and the budget overrun pattern that defines the market.",
    coordinates: "41.3381°N 2.1647°E",
    hero: "/images/stock/boatshed-cradles.jpg",
    heroFocus: "bottom",
    contributor: "To be confirmed",
    contributorRole: "Refit yard CEO",
    seoTitle: "Superyacht refit cost: when to refit, when to sell",
    seoDescription:
      "Superyacht refit cost, yard selection, scope discipline, and the 30 to 50 percent overrun pattern. The 30 percent of pre-refit value threshold for refit-or-sell. Spanish IPR, French Commercial Exemption, and Maltese leasing.",
    datePublished: "2026-05-01",
  },
  {
    number: "07",
    slug: "07-operations",
    title: "Operations",
    standfirst:
      "The captain hire, the crew structure, the compliance reality, the insurance market, and the charter economics that almost never work.",
    coordinates: "17.0608°N 61.7964°W",
    hero: "/images/stock/captain-uniform.jpg",
    heroFocus: "top",
    contributor: "Erica Lay",
    contributorRole: "Crew recruitment specialist, EL Crew Co",
    seoTitle:
      "Yacht operations: captain salary, crew, insurance, charter economics",
    seoDescription:
      "Yacht operations year one: captain hire discipline, crew structure and salary 2026, MLC and ISM compliance, insurance market, and the charter economics for the median programme. Sources named.",
    datePublished: "2026-05-01",
  },
  {
    number: "08",
    slug: "08-motor-versus-sail",
    title: "Motor versus sail",
    standfirst:
      "The structural decision few first-time buyers spend enough time on. Operating cost, environmental footprint, racing pedigree, and the case for sail in 2026.",
    coordinates: "41.4901°N 71.3128°W",
    hero: "/images/stock/cannes-sail-motor.jpg",
    contributor: "To be confirmed",
    contributorRole: "Sailing yacht captain",
    seoTitle:
      "Motor vs sail superyacht: cost, carbon, hybrid drive comparison",
    seoDescription:
      "Motor versus sail versus hybrid drive on a 50 metre yacht. Annual operating cost comparison, EU ETS exposure, HVO availability, and the hybrid third path. Quality sailing builders typically 25 to 40 percent below the equivalent motor programme.",
    datePublished: "2026-05-01",
  },
  {
    number: "09",
    slug: "09-decision-framework",
    title: "The decision framework",
    standfirst:
      "Building your team. The ten questions to ask before signing anything. The independence test, applied transparently.",
    coordinates: "51.5114°N 0.1126°W",
    hero: "/images/stock/brass-compass.jpg",
    contributor: "To be confirmed",
    contributorRole: "Family office principal",
    seoTitle:
      "Questions to ask before buying a yacht: the independence test",
    seoDescription:
      "The ten questions to put to anyone proposing to advise on a superyacht acquisition, including the publisher of The First Owner's Reference. The independence test for owner's representatives, lawyers, surveyors, and management companies.",
    datePublished: "2026-05-01",
  },
];

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
