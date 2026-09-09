import data from "../content/checklists.json";

export type ChecklistItem = {
  question: string;
  detail?: string;
};

export type ChecklistGroup = {
  heading: string;
  items: ChecklistItem[];
};

export type Checklist = {
  slug: string;
  title: string;
  /** Result-listing title. The editorial title carries no query language. */
  seoTitle?: string;
  seoDescription?: string;
  standfirst: string;
  intent: string;
  groups: ChecklistGroup[];
  printable: string;
};

export const checklists: Record<string, Checklist> = data as Record<
  string,
  Checklist
>;

export function getChecklist(slug: string): Checklist | undefined {
  return checklists[slug];
}
