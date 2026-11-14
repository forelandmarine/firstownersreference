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
    bio: "Andrew Roch is the founder and CEO of Yacht Crew Recruitment and Training (YCRT), based in Palma, whose businesses include The Crew Academy, which he founded in 2005, The Crew Hunter and the kelp e-learning platform. He has more than 30 years’ experience in headhunting and professional training. He sits on the boards of IAMI and GUEST and co-designed the Yacht Owner Representative Programme with SYBAss.",
  },
  "Capt. Pavlos Filippakis": {
    name: "Capt. Pavlos Filippakis",
    avatar: "/images/contributors/pavlos-filippakis.jpg",
    bio: "Capt. Pavlos Filippakis is a Master Mariner (Class 1 Unlimited) and ice-class captain. He came to large-yacht command from a career in LNG shipping, which he left to lead remote expeditions. On the owner-operated yacht he now commands, he managed a complex refit and then the yacht’s pole-to-pole voyage.",
  },
  "Hein Velema": {
    name: "Hein Velema",
    avatar: "/images/contributors/hein-velema.jpg",
    bio: "Hein Velema is Secretary General of the Superyacht Alliance for Professional Standards, which administers the Yacht Owner’s Representative Register and oversees the Yacht Owner Representative Programme, and a partner at the consultancy Marstrat. He spent eleven years at Feadship, latterly as a director, before joining Fraser Yachts in 2007 and serving as its CEO from 2009. He was also the first president of SYBAss.",
  },
  "Erica Lay": {
    name: "Erica Lay",
    avatar: "/images/contributors/erica-lay.jpg",
    bio: "Erica Lay is the founder and director of EL Crew Co, the international yacht crew agency she has run in Palma since January 2013, placing senior and junior crew across the over-24 metre fleet. Before that she set up and ran the Palma crew agency of a leading brokerage. Known as The Honest Crew Agent, she is also a widely published freelance journalist and the author of several books.",
  },
  "Ella Johnson": {
    name: "Ella Johnson",
    avatar: "/images/contributors/ella-johnson.jpg",
    bio: "Ella Johnson is captain of a 34 metre Baltic Yachts performance sloop that races on the Maxi circuit. She has made four Atlantic crossings and sailed more than 30,000 nautical miles on large and smaller sailing yachts, racing and on charter. Before her current command she captained a 70 foot sailing yacht for three years.",
  },
  "Simon Roberts": {
    name: "Simon Roberts",
    avatar: "/images/contributors/simon-roberts.jpg",
    bio: "Simon Roberts is managing director of Quadrant Group, a management-owned corporate services provider in the Isle of Man that structures and administers yacht ownership and provides crew management. He has worked in shipping and yacht management for more than 20 years, including eleven years at Dominion Marine Group, and has set up two large yacht crew management companies. He is a qualified ISM auditor and QMS lead auditor.",
  },
  "Ollie Davis": {
    name: "Ollie Davis",
    avatar: "/images/contributors/ollie-davis.jpg",
    bio: "Ollie Davis is a client advisor at PIB Marine, formerly Zorab Insurance Services, which he joined in 2025. He brings almost ten years of operational and navigational experience on large motor yachts to his insurance advice. He advises yacht owners on hull and machinery, P&I and war risks cover.",
  },
  "Jack Inglis": {
    name: "Jack Inglis",
    avatar: "/images/contributors/jack-inglis.jpg",
    bio: "Jack Inglis is the founder of ULTIMAR, a SYBAss-accredited owner’s representative practice set up in 2023. He came to yachting from the Merchant Navy, working commercial vessels from the Antarctic to the Norwegian Sea, and has since commanded offshore and private yachts through new builds and refits. He is certified under the Yacht Owner Representative Programme.",
  },
  "Benjamin Maltby": {
    name: "Benjamin Maltby",
    avatar: "/images/contributors/benjamin-maltby.jpg",
    bio: "Benjamin Maltby is a partner at Keystone Law and General Secretary of The Owners Club. A barrister, formerly of Ince & Co, he advises owners, yards and finance providers on superyacht construction, refit, purchase and sale, and finance. His practice also covers the operational side of ownership, including tax, insurance and employment.",
  },
};

export function getContributorProfile(
  name: string
): ContributorProfile | undefined {
  return contributorProfiles[name];
}
