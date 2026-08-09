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
