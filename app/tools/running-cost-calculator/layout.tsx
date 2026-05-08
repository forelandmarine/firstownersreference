import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How Much Does It Cost to Run a Superyacht? | Running Cost Calculator",
  description:
    "Annual running costs for a 30-50m superyacht typically range from EUR 500,000 to EUR 1.5 million. Use our interactive calculator to get a full breakdown by crew, insurance, maintenance, berths, fuel, management, and compliance. Updated 2026.",
  alternates: {
    canonical:
      "https://firstownersreference.com/tools/running-cost-calculator",
  },
  openGraph: {
    title:
      "How Much Does It Cost to Run a Superyacht? | Running Cost Calculator",
    description:
      "Annual running costs for a 30-50m superyacht typically range from EUR 500,000 to EUR 1.5 million. A calculator with full breakdown by crew, insurance, maintenance, berths, fuel, management, and compliance.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
