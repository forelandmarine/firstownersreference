import data from "../content/faqs.json";

export type FaqItem = {
  question: string;
  answer: string;
};

export const chapterFaqs: Record<string, FaqItem[]> = data as Record<
  string,
  FaqItem[]
>;

export function getChapterFaqs(slug: string): FaqItem[] {
  return chapterFaqs[slug] ?? [];
}
