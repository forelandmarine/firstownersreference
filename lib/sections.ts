import data from "../content/sections.json";

export type Section = {
  number: string;
  slug: string;
  title: string;
  standfirst: string;
  coordinates: string;
  hero: string;
  heroFocus?: "top" | "center" | "bottom" | "left" | "right";
  contributor: string;
  contributorRole: string;
  contributorLinkedIn?: string;
  seoTitle: string;
  seoDescription: string;
  datePublished: string;
  dateModified?: string;
};

export const sections: Section[] = data as Section[];

export function getSection(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
