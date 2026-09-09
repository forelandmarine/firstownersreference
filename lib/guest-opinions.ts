import data from "../content/guest-opinions.json";

export type GuestOpinionQA = {
  question: string;
  answer: string[];
  pullQuote?: string;
};

export type GuestOpinion = {
  slug: string;
  contributor: string;
  contributorRole: string;
  contributorLinkedIn?: string;
  intro?: string;
  /**
   * Result-listing description. The intro is a standfirst and runs to 300-600
   * characters, which a search engine discards and rewrites.
   */
  seoDescription?: string;
  /** The interview's own date, not the chapter's. */
  datePublished?: string;
  dateModified?: string;
  questions: GuestOpinionQA[];
};

export const guestOpinions: Record<string, GuestOpinion[]> = data as Record<
  string,
  GuestOpinion[]
>;

export function getGuestOpinions(slug: string): GuestOpinion[] {
  return guestOpinions[slug] ?? [];
}

/* URL slug for a contributor’s standalone Q&A page: lower-case,
   punctuation stripped, honorifics dropped. */
export function qaPersonSlug(contributor: string): string {
  return contributor
    .replace(/\b(Capt|Captain|Dr|Mr|Mrs|Ms)\.?\s+/gi, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getGuestOpinionByPerson(
  slug: string,
  person: string
): GuestOpinion | undefined {
  return getGuestOpinions(slug).find(
    (g) => g.questions.length > 0 && qaPersonSlug(g.contributor) === person
  );
}

export function allPublishedQAs(): {
  chapterSlug: string;
  person: string;
  opinion: GuestOpinion;
}[] {
  return Object.entries(guestOpinions).flatMap(([chapterSlug, list]) =>
    list
      .filter((g) => g.questions.length > 0)
      .map((opinion) => ({
        chapterSlug,
        person: qaPersonSlug(opinion.contributor),
        opinion,
      }))
  );
}
