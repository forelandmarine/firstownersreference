export type Section = {
  number: string;
  slug: string;
  title: string;
  standfirst: string;
  coordinates: string;
  hero: string;
  contributor: string;
  contributorRole: string;
};

export const sections: Section[] = [
  {
    number: "01",
    slug: "01-reality-of-ownership",
    title: "The reality of ownership",
    standfirst:
      "What the first three years of yacht ownership actually look like, in time and in money.",
    coordinates: "39.5696°N 2.6502°E",
    hero: "/images/raven-side.jpg",
    contributor: "To be confirmed",
    contributorRole: "Charter management CEO",
  },
  {
    number: "02",
    slug: "02-reading-the-market",
    title: "Reading the market in 2026",
    standfirst:
      "Where the order book actually sits, who has capacity, and what that means for a buyer entering this year.",
    coordinates: "53.4129°N 5.2569°E",
    hero: "/images/raven-drone-368.jpg",
    contributor: "To be confirmed",
    contributorRole: "Market intelligence head",
  },
  {
    number: "03",
    slug: "03-how-the-industry-works",
    title: "How the industry actually works",
    standfirst:
      "Conflicts, commissions, retrocessions, and the captain's loyalty problem. Said plainly.",
    coordinates: "43.5528°N 7.0174°E",
    hero: "/images/raven-rorc-side.jpg",
    contributor: "Sarah Linton",
    contributorRole: "Yacht lawyer, Hill Dickinson",
  },
  {
    number: "04",
    slug: "04-acquisition-process",
    title: "The acquisition process",
    standfirst:
      "From shortlist to closing. Surveys, sea trials, VAT regimes, flag choice, and the five most common pitfalls.",
    coordinates: "43.7037°N 7.2680°E",
    hero: "/images/raven-cockpit.jpg",
    contributor: "To be confirmed",
    contributorRole: "Senior surveyor",
  },
  {
    number: "05",
    slug: "05-new-build-versus-brokerage",
    title: "New build versus brokerage",
    standfirst:
      "The 24 to 36 month commitment of a new build, against the immediacy of brokerage. Trade-offs and the cases for each.",
    coordinates: "53.0040°N 5.6603°E",
    hero: "/images/raven-bow.jpg",
    contributor: "To be confirmed",
    contributorRole: "Yard CEO",
  },
  {
    number: "06",
    slug: "06-refit",
    title: "Refit",
    standfirst:
      "When to refit and when to sell. Yard selection, scope discipline, and the budget overrun pattern that defines the market.",
    coordinates: "41.3381°N 2.1647°E",
    hero: "/images/raven-drone-453.jpg",
    contributor: "To be confirmed",
    contributorRole: "Refit yard CEO",
  },
  {
    number: "07",
    slug: "07-operations",
    title: "Operations",
    standfirst:
      "The captain hire, the crew structure, the compliance reality, the insurance market, and the charter economics that almost never work.",
    coordinates: "17.0608°N 61.7964°W",
    hero: "/images/raven-drone-23.jpg",
    contributor: "To be confirmed",
    contributorRole: "Captain and insurance broker",
  },
  {
    number: "08",
    slug: "08-decision-framework",
    title: "The decision framework",
    standfirst:
      "Building your team. The ten questions to ask before signing anything. The independence test, applied transparently.",
    coordinates: "51.5114°N 0.1126°W",
    hero: "/images/hero-aerial.jpg",
    contributor: "To be confirmed",
    contributorRole: "Family office principal",
  },
];

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
