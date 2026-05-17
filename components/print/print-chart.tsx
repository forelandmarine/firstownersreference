/*
  Print-side chart wrapper. The web edition wraps charts in a <ChartFrame>
  with title, standfirst, caption, and source. For the print proof we want
  the chart inside the data spread layout that already provides those
  contextual elements via tables and source lines, so we render the chart
  itself without the on-page frame.
*/
import { charts } from "@/lib/charts";

export function renderChartForPrint(chartId: string) {
  const factory = charts[chartId];
  if (!factory) return null;
  return factory();
}
