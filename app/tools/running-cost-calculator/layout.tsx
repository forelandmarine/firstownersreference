import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Can you afford to run a superyacht? Calculator" },
  description:
    "Before you commit, model what the yacht will cost every year: crew, insurance, maintenance, berths, fuel, management and compliance.",
  alternates: {
    canonical:
      "https://firstownersreference.com/tools/running-cost-calculator",
  },
  openGraph: {
    title: "Can you afford to run a superyacht?",
    // The old copy said EUR 1.5 to 5 million for a 40-50 metre, which sat
    // against Chapter 01's 12 to 15 percent of purchase price and the page's
    // own FAQ. One publisher, one figure.
    description:
      "A new 40 to 50 metre at moderate use runs 12 to 15 percent of purchase price a year. Model your own, category by category, against named sources.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
