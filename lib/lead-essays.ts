import data from "../content/lead-essays.json";

export type LeadEssay = {
  slug: string;
  title: string;
  standfirst: string;
  paragraphs: (
    | string
    | { type: "h2"; text: string }
    | { type: "blockquote"; text: string; attribution?: string }
    | {
        type: "figure";
        src: string;
        alt: string;
        caption: string;
        credit?: string;
      }
    | {
        type: "editorsNote";
        text: string;
        href?: string;
        linkText?: string;
      }
    | {
        type: "webOnly";
        heading?: string;
        paragraphs: string[];
      }
  )[];
  readingTime: string;
  closingNote?: (string | { type: "h2"; text: string })[];
};

export const leadEssays: Record<string, LeadEssay> = data as unknown as Record<
  string,
  LeadEssay
>;

export function getLeadEssay(slug: string): LeadEssay | undefined {
  return leadEssays[slug];
}
