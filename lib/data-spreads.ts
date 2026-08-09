import data from "../content/data-spreads.json";

export type DataSpreadBlock =
  | { type: "h2"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "table";
      caption?: string;
      head: string[];
      rows: string[][];
      sourceLine?: string;
    }
  | {
      type: "kv";
      caption?: string;
      rows: { label: string; value: string; note?: string }[];
      sourceLine?: string;
    }
  | { type: "note"; text: string }
  | { type: "chart"; chartId: string };

export type DataSpread = {
  slug: string;
  title: string;
  standfirst: string;
  blocks: DataSpreadBlock[];
  sources: { label: string; line: string; url?: string }[];
};

export const dataSpreads: Record<string, DataSpread> = data as unknown as Record<
  string,
  DataSpread
>;

export function getDataSpread(slug: string): DataSpread | undefined {
  return dataSpreads[slug];
}
