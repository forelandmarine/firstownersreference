export type GuestOpinion = {
  slug: string;
  contributor: string;
  contributorRole: string;
  title: string;
  standfirst: string;
  paragraphs: string[];
  pullQuote?: string;
};

export const guestOpinions: Record<string, GuestOpinion> = {
  "07-operations": {
    slug: "07-operations",
    contributor: "Erica Lay",
    contributorRole: "Crew recruitment specialist, EL Crew Co",
    title: "Inconsistency from the top",
    standfirst:
      "The recruitment-side view of why crew leave, why owners pay for crew turnover twice, and the captain hire that defines the next ten years.",
    paragraphs: [
      "The recruitment-side view of yacht crew is more straightforward than the management-side view, because we see the candidates after they have left. Most of them have not been pushed out by the work; they have been worn down by something else.",
      "Crew can handle hard work. They can handle long hours and demanding programmes. What they cannot handle is unpredictability.",
      "The single most common reason we are placing a crew member somewhere new is inconsistency from the top. That can come from the owner, the captain, or the management structure, but it shows up the same way: changing expectations, unclear boundaries, decisions that feel reactive rather than considered, and rules applied to one person and not another. If the culture shifts depending on who is on board, the crew start looking elsewhere.",
      "The yachts that retain crew well share three things. Clear, consistent leadership. Open communication. An onboard culture that does not change overnight.",
      "For an owner approaching a first crew build, this is where the attention belongs. Do not just hire the best captain on paper. Hire the one who can manage you, because that is the part that is rarely said out loud.",
      "A technically strong captain with an impressive CV is not enough if they cannot manage the owner relationship. The best captains know how to set boundaries, communicate clearly, and guide a first-time owner through decisions they have never had to make before. Get that hire wrong and everything else becomes harder. Crew turnover increases. The onboard culture suffers. The programme becomes reactive instead of enjoyable.",
      "A good captain runs the yacht. A great captain manages the entire ecosystem around it, including the owner.",
      "That is the hire that will define the next ten years.",
    ],
    pullQuote:
      "Crew can handle hard work. They can handle long hours and demanding programmes. What they cannot handle is unpredictability.",
  },
};

export function getGuestOpinion(slug: string): GuestOpinion | undefined {
  return guestOpinions[slug];
}
