/*
  Print-side chart wrapper. Renders the same <ChartFrame> as the web edition.

  omitIfSame: text already set on the page just above the chart (the data
  spread's own title and standfirst). Where the chart's title or standfirst
  repeats it word for word, the chart drops its copy so the page does not
  print the same line twice (design brief, 14 November 2026, section 5).
  Nothing is deleted: the text still prints once, in the spread opener.
*/
import { cloneElement, type ReactElement } from "react";
import { charts } from "@/lib/charts";

type FrameProps = { title: string; standfirst?: string };

/* Compare words only: "Where the money goes, on a typical 50 m" and "Where
   the money goes on a typical 50 m" are the same line on the page. */
const norm = (t?: string) =>
  (t ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function renderChartForPrint(
  chartId: string,
  opts: { omitIfSame?: (string | undefined)[] } = {},
) {
  const factory = charts[chartId];
  if (!factory) return null;
  const el = factory() as ReactElement<FrameProps>;
  const seen = (opts.omitIfSame ?? []).map(norm).filter(Boolean);
  if (!seen.length) return el;
  const dupTitle = seen.includes(norm(el.props.title));
  const dupStand = seen.includes(norm(el.props.standfirst));
  if (!dupTitle && !dupStand) return el;
  return cloneElement(el, {
    title: dupTitle ? "" : el.props.title,
    standfirst: dupStand ? undefined : el.props.standfirst,
  });
}
