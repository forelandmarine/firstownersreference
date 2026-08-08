/* Extended 2026-08-08: heavy-imagery pass. Supporting pool grown to four
   per chapter, plus a tall (two-thirds-page) figure and a case-study
   image per chapter, curated from the Foreland stock library. */
export type PrintImage = { filename: string; caption?: string; credit?: string; alt: string };

export const printImages: {
  cover: PrintImage;
  frontispiece: PrintImage;
  chapters: Record<string, PrintImage>;
  supporting: Record<string, PrintImage[]>;
  tall: Record<string, PrintImage>;
  cases: Record<string, PrintImage>;
  closing: PrintImage;
} = {
  cover: { filename: "cover.jpg", alt: "Cover image" },
  frontispiece: { filename: "frontispiece.jpg", alt: "Frontispiece image" },
  chapters: {
    "01-reality-of-ownership": { filename: "ch01.jpg", alt: "Chapter 01 opener" },
    "02-reading-the-market": { filename: "ch02.jpg", alt: "Chapter 02 opener" },
    "03-how-the-industry-works": { filename: "ch03.jpg", alt: "Chapter 03 opener" },
    "04-acquisition-process": { filename: "ch04.jpg", alt: "Chapter 04 opener" },
    "05-new-build-versus-brokerage": { filename: "ch05.jpg", alt: "Chapter 05 opener" },
    "06-refit": { filename: "ch06.jpg", alt: "Chapter 06 opener" },
    "07-operations": { filename: "ch07.jpg", alt: "Chapter 07 opener" },
    "08-motor-versus-sail": { filename: "ch08.jpg", alt: "Chapter 08 opener" },
    "09-decision-framework": { filename: "ch09.jpg", alt: "Chapter 09 opener" },
  },
  supporting: {
    "01-reality-of-ownership": [
      { filename: "ch01-sup1.jpg", alt: "Chapter 01 supporting" },
      { filename: "ch01-sup2.jpg", alt: "Owner seated on the bow" },
      { filename: "ch01-sup3.jpg", alt: "Guest deck at anchor" },
      { filename: "ch01-sup4.jpg", alt: "Tender cockpit detail" },
    ],
    "02-reading-the-market": [
      { filename: "ch02-sup1.jpg", alt: "Chapter 02 supporting" },
      { filename: "ch02-sup2.jpg", alt: "Marina pontoons from above" },
      { filename: "ch02-sup3.jpg", alt: "Monaco marina" },
      { filename: "ch02-sup4.jpg", alt: "Harbour at dusk" },
    ],
    "03-how-the-industry-works": [
      { filename: "ch03-sup1.jpg", alt: "Chapter 03 supporting" },
      { filename: "ch03-sup2.jpg", alt: "Boat show pontoons" },
      { filename: "ch03-sup3.jpg", alt: "Brokerage quay" },
      { filename: "ch03-sup4.jpg", alt: "Superyacht in city waters" },
    ],
    "04-acquisition-process": [
      { filename: "ch04-sup1.jpg", alt: "Chapter 04 supporting" },
      { filename: "ch04-sup2.jpg", alt: "Navigation instruments" },
      { filename: "ch04-sup3.jpg", alt: "Compass binnacle" },
      { filename: "ch04-sup4.jpg", alt: "Helm and instruments" },
    ],
    "05-new-build-versus-brokerage": [
      { filename: "ch05-sup1.jpg", alt: "Chapter 05 supporting" },
      { filename: "ch05-sup2.jpg", alt: "Yard logistics" },
      { filename: "ch05-sup3.jpg", alt: "Shipyard pier" },
      { filename: "ch05-sup4.jpg", alt: "Hull planking work" },
    ],
    "06-refit": [
      { filename: "ch06-sup1.jpg", alt: "Chapter 06 supporting" },
      { filename: "ch06-sup2.jpg", alt: "Machine shop" },
      { filename: "ch06-sup3.jpg", alt: "Yachts under refit cover" },
      { filename: "ch06-sup4.jpg", alt: "Engine room" },
    ],
    "07-operations": [
      { filename: "ch07-sup1.jpg", alt: "Chapter 07 supporting" },
      { filename: "ch07-sup2.jpg", alt: "Crew at work on deck" },
      { filename: "ch07-sup3.jpg", alt: "Bridge operations" },
      { filename: "ch07-sup4.jpg", alt: "Night passage on the bridge" },
    ],
    "08-motor-versus-sail": [
      { filename: "ch08-sup1.jpg", alt: "Chapter 08 supporting" },
      { filename: "ch08-sup2.jpg", alt: "J Class yachts racing" },
      { filename: "ch08-sup3.jpg", alt: "Sailing yacht at sunset" },
      { filename: "ch08-sup4.jpg", alt: "Motor yacht under way" },
    ],
    "09-decision-framework": [
      { filename: "ch09-sup1.jpg", alt: "Chapter 09 supporting" },
      { filename: "ch09-sup2.jpg", alt: "Lone sail on open water" },
      { filename: "ch09-sup3.jpg", alt: "Yacht at anchor in a quiet bay" },
      { filename: "ch09-sup4.jpg", alt: "Yacht in monochrome" },
    ],
  },
  tall: {
    "01-reality-of-ownership": { filename: "ch01-tall.jpg", alt: "Owner and child on deck" },
    "02-reading-the-market": { filename: "ch02-tall.jpg", alt: "Marina masts at night" },
    "03-how-the-industry-works": { filename: "ch03-tall.jpg", alt: "Bow from below" },
    "04-acquisition-process": { filename: "ch04-tall.jpg", alt: "Mast against the sky" },
    "05-new-build-versus-brokerage": { filename: "ch05-tall.jpg", alt: "Yacht and yard crane" },
    "06-refit": { filename: "ch06-tall.jpg", alt: "Machinery space" },
    "07-operations": { filename: "ch07-tall.jpg", alt: "Captain portrait" },
    "08-motor-versus-sail": { filename: "ch08-tall.jpg", alt: "Sails in monochrome" },
    "09-decision-framework": { filename: "ch09-tall.jpg", alt: "Yacht from above" },
  },
  cases: {
    "01-reality-of-ownership": { filename: "ch01-case.jpg", alt: "Marina at evening" },
    "02-reading-the-market": { filename: "ch02-case.jpg", alt: "Yacht bows in a row" },
    "03-how-the-industry-works": { filename: "ch03-case.jpg", alt: "Yacht illuminated at night" },
    "04-acquisition-process": { filename: "ch04-case.jpg", alt: "Engine telegraph" },
    "05-new-build-versus-brokerage": { filename: "ch05-case.jpg", alt: "Hulls in the boat shed" },
    "06-refit": { filename: "ch06-case.jpg", alt: "Boathouses" },
    "07-operations": { filename: "ch07-case.jpg", alt: "At the helm" },
    "08-motor-versus-sail": { filename: "ch08-case.jpg", alt: "Square rig in monochrome" },
    "09-decision-framework": { filename: "ch09-case.jpg", alt: "Calm water sail" },
  },
  closing: { filename: "closing.jpg", alt: "Closing image" },
};
