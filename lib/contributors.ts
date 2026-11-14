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
    avatar: "/images/contributors/andrew-roch.jpg",
    bio: "Andrew Roch is the founder and CEO of Yacht Crew Recruitment and Training, which runs IAMI/GUEST-accredited leadership and purser training under The Crew Academy and senior-crew placement under The Crew Hunter. He sits on the IAMI board and co-designed the Yacht Owner Representative Programme with SYBAss.",
  },
  "Capt. Pavlos Filippakis": {
    name: "Capt. Pavlos Filippakis",
    avatar: "/images/contributors/pavlos-filippakis.jpg",
    bio: "Capt. Pavlos Filippakis is a Master Mariner (Class 1 Unlimited) and ice-class captain who came to large-yacht command from a career in LNG. He has led a complex refit and a subsequent pole-to-pole voyage on the owner-operated yacht he now commands.",
  },
  "Hein Velema": {
    name: "Hein Velema",
    avatar: "/images/contributors/hein-velema.jpg",
    bio: "Hein Velema is Secretary General of the Superyacht Alliance for Professional Standards, which administers the Yacht Owner’s Representative Register and oversees the Yacht Owner Representative Programme, and a partner at the consultancy Marstrat. He was the first president of SYBAss, a director of Feadship, and CEO of Fraser Yachts.",
  },
  "Erica Lay": {
    name: "Erica Lay",
    avatar: "/images/contributors/erica-lay.jpg",
    bio: "Erica Lay is the founder and director of EL Crew Co, the international yacht crew agency she has run in Palma since January 2013. It places senior and junior crew across the over-24 metre fleet. Before that she spent five years with a leading brokerage, where she set up and ran its Palma crew agency from 2008 and went on to manage its Barcelona and Antibes crew offices. Known as The Honest Crew Agent, she writes and speaks on crew welfare. She is a widely published freelance journalist and the author of several books.",
  },
  "Ella Johnson": {
    name: "Ella Johnson",
    avatar: "/images/contributors/ella-johnson.jpg",
    bio: "Ella Johnson is captain of a 34 metre Baltic Yachts performance sloop and has seven years’ operational experience at the top of the sailing market.",
  },
  "Simon Roberts": {
    name: "Simon Roberts",
    avatar: "/images/contributors/simon-roberts.jpg",
    bio: "Simon Roberts is a corporate services provider at Quadrant Group, which has advised marine clients on yacht ownership structures from the Isle of Man for forty years.",
  },
  "Ollie Davis": {
    name: "Ollie Davis",
    avatar: "/images/contributors/ollie-davis.jpg",
    bio: "Ollie Davis is a client advisor at PIB Marine, formerly Zorab Insurance Services, which he joined in 2025. He brings almost ten years of operational and navigational experience on large motor yachts to his insurance advice.",
  },
  "Jack Inglis": {
    name: "Jack Inglis",
    avatar: "/images/contributors/jack-inglis.jpg",
    bio: "Jack Inglis is the founder of ULTIMAR, an owner’s representative practice. He came to yachting from the Merchant Navy, working commercial vessels from the Antarctic to the Norwegian Sea, and joined the industry in 2012 as bosun on a 60 metre support vessel. He has since commanded offshore and private yachts through new builds and refits, and founded ULTIMAR in 2023. He is certified under the Yacht Owner Representative Programme, and ULTIMAR is SYBAss accredited.",
  },
  "Benjamin Maltby": {
    name: "Benjamin Maltby",
    avatar: "/images/contributors/benjamin-maltby.jpg",
    bio: "Benjamin Maltby is a partner at Keystone Law, General Secretary of The Owners Club, and a barrister, formerly of Ince & Co. He advises owners, yards and finance providers on superyacht construction, refit, purchase and sale, finance, and operational matters including tax, insurance and employment.",
  },
};

export function getContributorProfile(
  name: string
): ContributorProfile | undefined {
  return contributorProfiles[name];
}
