import { ChartFrame } from "@/components/charts/chart-frame";
import { RangeBars } from "@/components/charts/range-bars";
import { PairedStackedBars } from "@/components/charts/paired-stacked-bars";
import { ComparisonBars } from "@/components/charts/comparison-bars";

export const charts: Record<string, () => React.ReactElement> = {
  "captain-pay-by-size": () => (
    <ChartFrame
      number="07.01"
      title="Captain monthly pay, by yacht size"
      standfirst="Senior crew pay continues to outpace inflation; junior pay has plateaued."
      caption="Average monthly pay range, in EUR thousand. Quay Crew records 7 percent year-on-year growth in the 70 to 79 m bracket; 63 percent of captains now on time-for-time rotation."
      source="Quay Crew Superyacht Captain Salary & Leave Report 2025/26."
    >
      <RangeBars
        domainMax={28}
        unit=" k"
        unitLabel="EUR per month, thousand"
        rows={[
          { label: "20 to 24 m", from: 5.5, to: 6.5 },
          { label: "30 to 40 m", from: 8, to: 12 },
          { label: "40 to 50 m", from: 10, to: 14 },
          { label: "50 to 60 m", from: 10, to: 16 },
          { label: "70 to 79 m", from: 14, to: 20, note: "Up 7 percent year on year" },
          { label: "80 m and above", from: 16, to: 23 },
          { label: "100 to 119 m", from: 25, to: 28 },
        ]}
      />
    </ChartFrame>
  ),

  "operating-cost-by-size-band": () => (
    <ChartFrame
      number="01.01"
      title="Annual operating cost as a percentage of capex, by size band"
      standfirst="The 10 percent rule is folklore. The empirical band is 8 to 22 percent. Mid-points of practitioner working ranges, moderate use intensity."
      caption="Bands widen by 2 to 4 points for charter operation. Year-1 to year-5 unless noted."
      source="Foreland Marine project archive, cross-referenced against Fraser, Ocean Independence, and YachtBuyer published guidance."
    >
      <RangeBars
        domainMax={25}
        unit="%"
        unitLabel="percent of capex per year"
        axisTicks={[0, 5, 10, 15, 20, 25]}
        rows={[
          { label: "30 to 40 m, year 1 to 5", from: 10, to: 13 },
          { label: "40 to 50 m, year 1 to 5", from: 12, to: 15 },
          { label: "50 to 60 m, year 1 to 5", from: 13, to: 16 },
          { label: "40 to 50 m, year 6 to 10", from: 14, to: 17 },
          { label: "Above 60 m, all years", from: 16, to: 19 },
        ]}
      />
    </ChartFrame>
  ),

  "operating-cost-50m-motor-vs-sail": () => (
    <ChartFrame
      number="09.01"
      title="Annual operating cost on a 50 metre, motor against sail"
      standfirst="A 50 metre sailing yacht typically runs 70 to 85 percent of the comparable motor cost. Crew, fuel, and insurance are the lines that move."
      caption="Indicative cost split, EUR million per year, moderate use (8 to 10 weeks family use). Fuel modelled at Mediterranean rates, 400 cruising hours."
      source="Foreland Marine project archive; YPI Crew 2026 salary guide; aggregated published practitioner ranges."
    >
      <PairedStackedBars
        unit="m"
        domainMax={4.5}
        groups={[
          {
            label: "50 m motor",
            total: "EUR 3.7 m total",
            segments: [
              { label: "Crew", value: 1.9 },
              { label: "Maintenance", value: 0.75 },
              { label: "Insurance", value: 0.45 },
              { label: "Berths and marina", value: 0.35 },
              { label: "Fuel", value: 0.275 },
            ],
          },
          {
            label: "50 m sail",
            total: "EUR 2.9 m total",
            segments: [
              { label: "Crew", value: 1.45 },
              { label: "Maintenance", value: 0.65 },
              { label: "Insurance", value: 0.365 },
              { label: "Berths and marina", value: 0.35 },
              { label: "Fuel", value: 0.09 },
            ],
          },
        ]}
      />
    </ChartFrame>
  ),

  "charter-cases-2025": () => (
    <ChartFrame
      number="01.02"
      title="Charter operation, four worked cases"
      standfirst="Most charter operations subsidise rather than recover ownership cost. The successful exception is owner-optimised, with disciplined release of the prime weeks."
      caption="Net charter contribution against annual running cost, EUR million, on the BOAT International published case record."
      source="BOAT International published case studies."
    >
      <ComparisonBars
        domainMin={-1}
        domainMax={2.2}
        unit=" m"
        zeroLine
        axisTicks={[-1, -0.5, 0, 0.5, 1, 1.5, 2]}
        rows={[
          {
            label: "60 m owner-optimised, 12 weeks",
            value: 2,
            display: "Up to EUR 2 m net positive",
            emphasis: true,
          },
          {
            label: "48 m motor, 7 weeks",
            value: 0.017,
            display: "Break-even",
          },
          {
            label: "47 m sail, 9 weeks",
            value: -0.444,
            display: "EUR 444 k loss",
          },
          {
            label: "85 m motor, 8 weeks",
            value: -0.43,
            display: "EUR 430 k loss",
          },
        ]}
      />
    </ChartFrame>
  ),
};

export function getChart(id: string): React.ReactElement | null {
  const fn = charts[id];
  return fn ? fn() : null;
}
