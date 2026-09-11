/* Extended 2026-08-08: heavy-imagery pass. Supporting pool grown to four
   per chapter, plus a tall (two-thirds-page) figure and a case-study
   image per chapter, curated from the Foreland stock library. */
export type PrintImage = { filename: string; caption?: string; credit?: string; alt: string };

export const printImages: {
  cover: PrintImage;
  frontispiece: PrintImage;
  chapters: Record<string, PrintImage>;
  supporting: Record<string, PrintImage[]>;
  /* Full-page plates. Printed standalone and merged over a placeholder in
     the flow, the same mechanism as the chapter openers, because Chrome
     fragments a mid-document full-page box against the root master and
     paints a seam. Two per chapter. */
  plates: Record<string, PrintImage[]>;
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
      { filename: "40023942-edbc-4252-a8aa-43d36b870752.jpg", alt: "Supporting photograph, chapter 01" },
      { filename: "aleksandr-skvortsov-ykSc4VaRtBQ-unsplash.jpg", alt: "Supporting photograph, chapter 01" },
      { filename: "aristos-aristidou-Rj3gpDWNnAQ-unsplash.jpg", alt: "Supporting photograph, chapter 01" },
    ],
    "02-reading-the-market": [
      { filename: "ch02-sup1.jpg", alt: "Chapter 02 supporting" },
      { filename: "ch02-sup2.jpg", alt: "Marina pontoons from above" },
      { filename: "ch02-sup3.jpg", alt: "Monaco marina" },
      { filename: "ch02-sup4.jpg", alt: "Harbour at dusk" },
      { filename: "50m-above-bWiocb-XhyA-unsplash.jpg", alt: "Supporting photograph, chapter 02" },
      { filename: "alexander-mils-l4-oK4lbKQ0-unsplash.jpg", alt: "Supporting photograph, chapter 02" },
      { filename: "armin-pfarr-lXwXqgIUFTg-unsplash.jpg", alt: "Supporting photograph, chapter 02" },
    ],
    "03-how-the-industry-works": [
      { filename: "ch03-sup1.jpg", alt: "Chapter 03 supporting" },
      { filename: "ch03-sup2.jpg", alt: "Boat show pontoons" },
      { filename: "ch03-sup3.jpg", alt: "Brokerage quay" },
      { filename: "ch03-sup4.jpg", alt: "Superyacht in city waters" },
      { filename: "IMG_0263.jpg", alt: "Supporting photograph, chapter 03" },
      { filename: "alexandros-giannakakis-kGdAphiYwy4-unsplash.jpg", alt: "Supporting photograph, chapter 03" },
      { filename: "arno-senoner-1q7RE0CXstU-unsplash.jpg", alt: "Supporting photograph, chapter 03" },
    ],
    "04-acquisition-process": [
      { filename: "ch04-sup1.jpg", alt: "Chapter 04 supporting" },
      { filename: "ch04-sup2.jpg", alt: "Navigation instruments" },
      { filename: "ch04-sup3.jpg", alt: "Compass binnacle" },
      { filename: "ch04-sup4.jpg", alt: "Helm and instruments" },
      { filename: "IMG_0646.jpg", alt: "Supporting photograph, chapter 04" },
      { filename: "alexandros-giannakakis-z5lGREDnrCY-unsplash.jpg", alt: "Supporting photograph, chapter 04" },
      { filename: "arno-senoner-iOmFn_anJvA-unsplash.jpg", alt: "Supporting photograph, chapter 04" },
    ],
    "05-new-build-versus-brokerage": [
      { filename: "ch05-sup1.jpg", alt: "Chapter 05 supporting" },
      { filename: "ch05-sup2.jpg", alt: "Yard logistics" },
      { filename: "ch05-sup3.jpg", alt: "Shipyard pier" },
      { filename: "ch05-sup4.jpg", alt: "Hull planking work" },
      { filename: "IMG_9616.jpg", alt: "Supporting photograph, chapter 05" },
      { filename: "alexandros-sarakasidis-iXUx8yyE8J0-unsplash.jpg", alt: "Supporting photograph, chapter 05" },
      { filename: "arno-senoner-loU_6fwdPRc-unsplash.jpg", alt: "Supporting photograph, chapter 05" },
    ],
    "06-refit": [
      { filename: "ch06-sup1.jpg", alt: "Chapter 06 supporting" },
      { filename: "ch06-sup2.jpg", alt: "Machine shop" },
      { filename: "ch06-sup3.jpg", alt: "Yachts under refit cover" },
      { filename: "ch06-sup4.jpg", alt: "Engine room" },
      { filename: "YAW275.ssw_jclass.st_barths_bucket17cb_06172_retouch.jpg", alt: "Supporting photograph, chapter 06" },
      { filename: "amit-adler-o-GUkfq0tlE-unsplash.jpg", alt: "Supporting photograph, chapter 06" },
      { filename: "atul-ajit-Lvr-U5Bpdqs-unsplash.jpg", alt: "Supporting photograph, chapter 06" },
    ],
    "07-operations": [
      { filename: "ch07-sup1.jpg", alt: "Chapter 07 supporting" },
      { filename: "ch07-sup2.jpg", alt: "Crew at work on deck" },
      { filename: "ch07-sup3.jpg", alt: "Bridge operations" },
      { filename: "ch07-sup4.jpg", alt: "Night passage on the bridge" },
      { filename: "aaron-burden-oHNzEstWRec-unsplash.jpg", alt: "Supporting photograph, chapter 07" },
      { filename: "andras-joo-5LK8T0pjPZc-unsplash.jpg", alt: "Supporting photograph, chapter 07" },
      { filename: "ben-elliott-qdrmRHrCmTk-unsplash.jpg", alt: "Supporting photograph, chapter 07" },
    ],
    "08-motor-versus-sail": [
      { filename: "ch08-sup1.jpg", alt: "Chapter 08 supporting" },
      { filename: "ch08-sup2.jpg", alt: "J Class yachts racing" },
      { filename: "ch08-sup3.jpg", alt: "Sailing yacht at sunset" },
      { filename: "ch08-sup4.jpg", alt: "Motor yacht under way" },
      { filename: "adam-bignell-YRXjbaQAJso-unsplash.jpg", alt: "Supporting photograph, chapter 08" },
      { filename: "andre-tan-4DRfdkajOq8-unsplash.jpg", alt: "Supporting photograph, chapter 08" },
      { filename: "boris-misevic-ZUlV60gfNJI-unsplash.jpg", alt: "Supporting photograph, chapter 08" },
    ],
    "09-decision-framework": [
      { filename: "ch09-sup1.jpg", alt: "Chapter 09 supporting" },
      { filename: "ch09-sup2.jpg", alt: "Lone sail on open water" },
      { filename: "ch09-sup3.jpg", alt: "Yacht at anchor in a quiet bay" },
      { filename: "ch09-sup4.jpg", alt: "Yacht in monochrome" },
      { filename: "alberto-bianchini-qLfaGkKqY-E-unsplash.jpg", alt: "Supporting photograph, chapter 09" },
      { filename: "andrea-zignin-Us8dszDXx28-unsplash.jpg", alt: "Supporting photograph, chapter 09" },
      { filename: "boris-misevic-q_8cRkqTWNk-unsplash.jpg", alt: "Supporting photograph, chapter 09" },
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
  plates: {
    "01-reality-of-ownership": [
      { filename: "ch01-sup2.jpg", alt: "Chapter 01 plate" },
      { filename: "ch01-sup3.jpg", alt: "Chapter 01 plate" },
      { filename: "ch01-sup4.jpg", alt: "Chapter 01 plate" },
      { filename: "40023942-edbc-4252-a8aa-43d36b870752.jpg", alt: "Chapter 01 plate" },
    ],
    "02-reading-the-market": [
      { filename: "ch02-sup2.jpg", alt: "Chapter 02 plate" },
      { filename: "ch02-sup3.jpg", alt: "Chapter 02 plate" },
      { filename: "ch02-sup4.jpg", alt: "Chapter 02 plate" },
      { filename: "50m-above-bWiocb-XhyA-unsplash.jpg", alt: "Chapter 02 plate" },
    ],
    "03-how-the-industry-works": [
      { filename: "ch03-sup2.jpg", alt: "Chapter 03 plate" },
      { filename: "ch03-sup3.jpg", alt: "Chapter 03 plate" },
      { filename: "ch03-sup4.jpg", alt: "Chapter 03 plate" },
      { filename: "IMG_0263.jpg", alt: "Chapter 03 plate" },
    ],
    "04-acquisition-process": [
      { filename: "ch04-sup2.jpg", alt: "Chapter 04 plate" },
      { filename: "ch04-sup3.jpg", alt: "Chapter 04 plate" },
      { filename: "ch04-sup4.jpg", alt: "Chapter 04 plate" },
      { filename: "IMG_0646.jpg", alt: "Chapter 04 plate" },
    ],
    "05-new-build-versus-brokerage": [
      { filename: "ch05-sup2.jpg", alt: "Chapter 05 plate" },
      { filename: "ch05-sup3.jpg", alt: "Chapter 05 plate" },
      { filename: "ch05-sup4.jpg", alt: "Chapter 05 plate" },
      { filename: "IMG_9616.jpg", alt: "Chapter 05 plate" },
    ],
    "06-refit": [
      { filename: "ch06-sup2.jpg", alt: "Chapter 06 plate" },
      { filename: "ch06-sup3.jpg", alt: "Chapter 06 plate" },
      { filename: "ch06-sup4.jpg", alt: "Chapter 06 plate" },
      { filename: "YAW275.ssw_jclass.st_barths_bucket17cb_06172_retouch.jpg", alt: "Chapter 06 plate" },
    ],
    "07-operations": [
      { filename: "ch07-sup2.jpg", alt: "Chapter 07 plate" },
      { filename: "ch07-sup3.jpg", alt: "Chapter 07 plate" },
      { filename: "ch07-sup4.jpg", alt: "Chapter 07 plate" },
      { filename: "aaron-burden-oHNzEstWRec-unsplash.jpg", alt: "Chapter 07 plate" },
    ],
    "08-motor-versus-sail": [
      { filename: "ch08-sup2.jpg", alt: "Chapter 08 plate" },
      { filename: "ch08-sup3.jpg", alt: "Chapter 08 plate" },
      { filename: "ch08-sup4.jpg", alt: "Chapter 08 plate" },
      { filename: "adam-bignell-YRXjbaQAJso-unsplash.jpg", alt: "Chapter 08 plate" },
    ],
    "09-decision-framework": [
      { filename: "ch09-sup2.jpg", alt: "Chapter 09 plate" },
      { filename: "ch09-sup3.jpg", alt: "Chapter 09 plate" },
      { filename: "ch09-sup4.jpg", alt: "Chapter 09 plate" },
      { filename: "alberto-bianchini-qLfaGkKqY-E-unsplash.jpg", alt: "Chapter 09 plate" },
    ],
  },
  closing: { filename: "closing.jpg", alt: "Closing image" },
};
