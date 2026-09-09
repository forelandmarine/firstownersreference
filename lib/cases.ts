import data from "../content/cases.json";

export type CaseStudy = {
  slug: string;
  title: string;
  /** Result-listing title. The editorial title carries no query language. */
  seoTitle?: string;
  seoDescription?: string;
  standfirst: string;
  meta: { label: string; value: string }[];
  paragraphs: (
    | string
    | { type: "h2"; text: string }
    | { type: "blockquote"; text: string; attribution?: string }
  )[];
  takeaways: string[];
  disclosure: string;
};

export const cases: Record<string, CaseStudy> = data as unknown as Record<
  string,
  CaseStudy
>;

export function getCase(slug: string): CaseStudy | undefined {
  return cases[slug];
}
