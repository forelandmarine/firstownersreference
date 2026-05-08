import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "How Much Does It Cost to Run a Superyacht? | Running Cost Calculator",
  description:
    "Annual running costs for a 40-50 metre superyacht run EUR 1.5 to 5 million in 2026, scaling with size, age, and use intensity. Use the interactive calculator to get the breakdown by crew, insurance, maintenance, berths, fuel, management, and compliance against your own size and operating profile.",
  alternates: {
    canonical:
      "https://firstownersreference.com/tools/running-cost-calculator",
  },
  openGraph: {
    title:
      "How Much Does It Cost to Run a Superyacht? | Running Cost Calculator",
    description:
      "Annual running costs for a 40-50 metre superyacht run EUR 1.5 to 5 million in 2026. A calculator with full breakdown by crew, insurance, maintenance, berths, fuel, management, and compliance.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
