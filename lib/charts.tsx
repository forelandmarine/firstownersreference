import { ChartFrame } from "@/components/charts/chart-frame";
import { RangeBars } from "@/components/charts/range-bars";
import { PairedStackedBars } from "@/components/charts/paired-stacked-bars";
import { ComparisonBars } from "@/components/charts/comparison-bars";
import { LineChart } from "@/components/charts/line-chart";
import { SlopeGraph } from "@/components/charts/slope-graph";
import { CompositionBar } from "@/components/charts/composition-bar";

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
      number="08.01"
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

  "cost-composition-50m": () => (
    <ChartFrame
      number="01.03"
      title="Where the money goes on a typical 50 m"
      standfirst="Crew is the largest single line, not fuel. The shape holds across the over-30 m motor segment at moderate use."
      caption="Indicative composition of annual operating cost on a 50 m motor yacht at moderate use."
      source="YPI Crew 2026 salary guide; Quay Crew 2025/26 captain survey; Pantaenius market commentary; MYBA standard cost categories."
    >
      <CompositionBar
        unit="%"
        segments={[
          { label: "Crew salaries and benefits", value: 35, display: "30 to 40%" },
          { label: "Maintenance and repair", value: 16, display: "14 to 18%" },
          { label: "Insurance", value: 12, display: "10 to 14%" },
          { label: "Berths and marina fees", value: 10, display: "8 to 12%" },
          { label: "Fuel", value: 10, display: "8 to 12%" },
          { label: "Management fees", value: 4, display: "3 to 5%" },
          { label: "Class and flag compliance", value: 2.5, display: "2 to 3%" },
          { label: "Provisioning, contingency, other", value: 10.5, display: "10 to 15%" },
        ]}
      />
    </ChartFrame>
  ),

  "depreciation-curve": () => (
    <ChartFrame
      number="01.04"
      title="Depreciation curve, year 1 to 10"
      standfirst="Cumulative loss from purchase price. Quality builders hold value materially better after year five; the band below is the broker-aggregated typical curve."
      caption="Indicative; broker-aggregated curves are not peer-reviewed. The band shows the range across Yatco, IYC, and Yacht Hunter aggregations."
      source="Yatco, IYC, Yacht Hunter broker-aggregated curves."
    >
      <LineChart
        xDomain={[1, 10]}
        yDomain={[0, 70]}
        xTicks={[1, 2, 3, 5, 7, 10]}
        yTicks={[0, 20, 40, 60]}
        yUnit="%"
        yUnitLabel="cumulative loss from purchase, percent"
        band={{
          values: [
            { x: 1, yLow: 10, yHigh: 20 },
            { x: 2, yLow: 16, yHigh: 28 },
            { x: 3, yLow: 22, yHigh: 35 },
            { x: 5, yLow: 33, yHigh: 48 },
            { x: 7, yLow: 40, yHigh: 55 },
            { x: 10, yLow: 48, yHigh: 62 },
          ],
        }}
        series={[
          {
            name: "Typical hull",
            values: [
              { x: 1, y: 15 },
              { x: 2, y: 22 },
              { x: 3, y: 28 },
              { x: 5, y: 40 },
              { x: 7, y: 47 },
              { x: 10, y: 55 },
            ],
          },
          {
            name: "Quality builder",
            emphasis: true,
            values: [
              { x: 1, y: 10 },
              { x: 2, y: 14 },
              { x: 3, y: 18 },
              { x: 5, y: 26 },
              { x: 7, y: 30 },
              { x: 10, y: 36 },
            ],
          },
        ]}
      />
    </ChartFrame>
  ),

  "uhnwi-2021-2031": () => (
    <ChartFrame
      number="02.01"
      title="UHNWI population, 2021 to 2031, by region share"
      standfirst="The United States accounts for an increasing share. The structural narrowing of supply against an expanding demand pool is the supply story behind the 2025 brokerage record."
      caption="UHNWI defined as net wealth above USD 30 m. Regional shares of the global UHNWI population. 2031 figure is the Knight Frank forecast."
      source="Knight Frank Wealth Sizing Model, 2026 Wealth Report."
    >
      <SlopeGraph
        columns={["2021", "2026", "2031"]}
        yDomain={[0, 50]}
        yUnit="%"
        series={[
          {
            name: "United States",
            emphasis: true,
            values: [
              { x: "2021", y: 33, display: "33%" },
              { x: "2026", y: 35, display: "35%" },
              { x: "2031", y: 41, display: "41%" },
            ],
          },
          {
            name: "Asia-Pacific",
            values: [
              { x: "2021", y: 31, display: "31%" },
              { x: "2026", y: 31, display: "31%" },
              { x: "2031", y: 28, display: "28%" },
            ],
          },
          {
            name: "Europe",
            values: [
              { x: "2021", y: 27, display: "27%" },
              { x: "2026", y: 25, display: "25%" },
              { x: "2031", y: 22, display: "22%" },
            ],
          },
          {
            name: "Rest of the world",
            values: [
              { x: "2021", y: 9, display: "9%" },
              { x: "2026", y: 9, display: "9%" },
              { x: "2031", y: 9, display: "9%" },
            ],
          },
        ]}
      />
    </ChartFrame>
  ),

  "order-book-2025-2026": () => (
    <ChartFrame
      number="02.02"
      title="Global order book, 24 m and above, 2025 against 2026"
      standfirst="Unit count has contracted for the second consecutive year. Average length and tonnage are at record highs."
      caption="BOAT International Global Order Book, by edition."
      source="BOAT International Global Order Book."
    >
      <ComparisonBars
        domainMax={1200}
        rows={[
          {
            label: "Yachts on order, 2025 edition",
            value: 1138,
            display: "1,138 units",
          },
          {
            label: "Yachts on order, 2026 edition",
            value: 1093,
            display: "1,093 units",
            emphasis: true,
          },
        ]}
      />
    </ChartFrame>
  ),

  "vat-on-purchase": () => (
    <ChartFrame
      number="04.01"
      title="VAT on a EUR 4 m yacht purchase, default jurisdictions"
      standfirst="Three legitimate alternatives reduce or eliminate this exposure: French Commercial Exemption, Spanish Inward Processing Relief, Maltese leasing scheme."
      caption="On a EUR 4 m yacht purchased in the listed jurisdiction, default VAT bill at sale."
      source="National tax authority published rates; Hill Dickinson, Watson Farley & Williams comparative analysis."
    >
      <ComparisonBars
        domainMax={1000}
        rows={[
          {
            label: "France, 20 percent VAT",
            value: 800,
            display: "EUR 800 k",
          },
          {
            label: "Spain, 21 percent VAT",
            value: 840,
            display: "EUR 840 k",
          },
          {
            label: "Italy, 22 percent VAT",
            value: 880,
            display: "EUR 880 k",
            emphasis: true,
          },
        ]}
      />
    </ChartFrame>
  ),

  "refit-cost-per-metre": () => (
    <ChartFrame
      number="06.01"
      title="Refit cost per metre per year, by scope"
      standfirst="Practitioner working ranges across more than 30 managed projects. Yard rate cards (MB92, Pendennis) are not published."
      caption="EUR per metre per year. On a 50 m yacht the major-structural band is approximately EUR 2 m to 5 m."
      source="Foreland Marine project archive; practitioner working knowledge."
    >
      <RangeBars
        domainMax={100}
        unit=" k"
        unitLabel="EUR thousand per metre per year"
        axisTicks={[0, 20, 40, 60, 80, 100]}
        rows={[
          { label: "Annual maintenance", from: 2, to: 8 },
          { label: "Mid-life refit", from: 10, to: 30 },
          { label: "Major structural refit", from: 40, to: 100 },
        ]}
      />
    </ChartFrame>
  ),

  "hull-rate-movement": () => (
    <ChartFrame
      number="07.02"
      title="Hull insurance rate movement, 2022 to 2026"
      standfirst="The hardened market that opened in 2022 stabilised in H1 2024. Bayesian sinking, August 2024, prompted selective tightening rather than blanket rate rises."
      caption="Indicative hull rate trajectory, well-maintained 40 to 50 m yacht. Vertical reference marks the Bayesian event."
      source="AIG, Gallagher Specialty published commentary; Pantaenius market notes."
    >
      <LineChart
        xDomain={[2022, 2026]}
        yDomain={[0, 2]}
        xTicks={[2022, 2023, 2024, 2025, 2026]}
        yTicks={[0, 0.5, 1, 1.5, 2]}
        yUnit="%"
        yUnitLabel="hull rate, percent of insured value"
        annotations={[
          { x: 2024.6, label: "Bayesian sinking", align: "above" },
        ]}
        series={[
          {
            name: "Hull rate, well-maintained 40 to 50 m",
            emphasis: true,
            values: [
              { x: 2022, y: 0.7 },
              { x: 2023, y: 1.15 },
              { x: 2024, y: 1.25 },
              { x: 2025, y: 1.15 },
              { x: 2026, y: 1.05 },
            ],
          },
        ]}
      />
    </ChartFrame>
  ),

  "eu-ets-exposure": () => (
    <ChartFrame
      number="08.02"
      title="EU ETS Maritime exposure, by yacht profile"
      standfirst="The EU ETS extension from 1 January 2024 applies to ships of and above 5,000 GT. Compliance phased 40 percent in 2025, 70 percent in 2026, 100 percent from 2027."
      caption="Most yachts sit below the threshold. Very large motor yachts now sit inside it. Sail yachts at every size band sit below."
      source="EU Commission FAQ on EU ETS for maritime transport; practitioner working ranges for tonnage."
    >
      <RangeBars
        domainMax={6000}
        unit=" GT"
        unitLabel="gross tonnage"
        axisTicks={[0, 1500, 3000, 4500, 6000]}
        rows={[
          { label: "60 m motor", from: 700, to: 1200 },
          { label: "80 m motor", from: 2000, to: 2800 },
          { label: "90 m motor", from: 4500, to: 5500, note: "Borderline" },
          { label: "110 m+ motor", from: 5500, to: 6000, note: "Inside, EUR 200 to 400 k per year" },
          { label: "50 m sail", from: 300, to: 600 },
        ]}
      />
    </ChartFrame>
  ),

};

export function getChart(id: string): React.ReactElement | null {
  const fn = charts[id];
  return fn ? fn() : null;
}
