// Single source of truth for contributor bios and profile images.
//
// Bios are distilled from each contributor's own on-record intro and role
// lines elsewhere in the publication. They are not scraped from third-party
// sites.
//
// `avatar` is a path under /public (e.g. "/images/contributors/erica-lay.jpg").
// Leave it undefined until the contributor has provided a headshot for use;
// the ContributorAvatar component falls back to a monogram in the meantime.
// Do not publish a contributor's photo without their consent.

export type ContributorProfile = {
  name: string;
  bio: string;
  avatar?: string;
};

export const contributorProfiles: Record<string, ContributorProfile> = {
  "Andrew Roch": {
    name: "Andrew Roch",
    bio: "Founder and CEO of Yacht Crew Recruitment and Training, which pairs IAMI/GUEST-accredited leadership and purser training under The Crew Academy with senior-crew placement under The Crew Hunter. He sits on the IAMI board and co-architected the Yacht Owner's Representative Program with SYBAss.",
  },
  "Capt. Pavlos Filippakis": {
    name: "Capt. Pavlos Filippakis",
    bio: "A Master Mariner (Class 1 Unlimited) and ice-class captain who came to large-yacht command from a career in LNG. He has led a complex refit and a subsequent pole-to-pole voyage on the owner-operated yacht he now commands.",
  },
  "Hein Velema": {
    name: "Hein Velema",
    bio: "Secretary General of the Superyacht Alliance for Professional Standards, which administers the Yacht Owner's Representative Register and the YORP programme. The first president of SYBAss, he has held senior roles at Feadship and Fraser.",
  },
  "Erica Lay": {
    name: "Erica Lay",
    bio: "Crew recruitment specialist and founder of EL Crew Co, placing senior and junior crew across the over-24-metre fleet from Mallorca.",
  },
  "Ella Johnson": {
    name: "Ella Johnson",
    bio: "Captain of a 34-metre Baltic Yachts performance sloop, with seven years' operational experience at the top of the sailing market.",
  },
  "Simon Roberts": {
    name: "Simon Roberts",
    bio: "A corporate services provider at Quadrant Group, which has advised marine clients on yacht ownership structures from the Isle of Man for forty years.",
  },
  "Ollie Davis": {
    name: "Ollie Davis",
    bio: "A yacht insurance specialist at PIB Marine (formerly Zorab Insurance Services), the established UK specialist alternative to the multi-line yacht insurance brokers.",
  },
  "Jack Inglis": {
    name: "Jack Inglis",
    bio: "Founder of the owner's-representative practice ULTIMAR; the 1,200-item delivery snag list cited in the new-build chapter is his.",
  },
};

export function getContributorProfile(
  name: string
): ContributorProfile | undefined {
  return contributorProfiles[name];
}
