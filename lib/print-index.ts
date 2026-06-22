/*
  Auto-index generator for the print proof. Walks every chapter's content
  and pulls out:
   - h2 headings within lead essays
   - glossary terms
   - named yards, brokers, lawyers, regulators, and individuals from a
     curated allow-list

  Outputs a list grouped by first letter, with chapter references. The
  press edition will be re-set by an indexer; this is a working draft that
  surfaces the cross-references the publication already supports.
*/

import type { Section } from "@/lib/sections";
import type { GlossaryEntry } from "@/lib/glossary";
import { getLeadEssay } from "@/lib/lead-essays";

const NAMED_ENTITIES = [
  // Yards (SYBAss member yards + key refit yards)
  "Lürssen",
  "Feadship",
  "Oceanco",
  "Heesen",
  "Royal Huisman",
  "Vitters",
  "Baltic Yachts",
  "Abeking & Rasmussen",
  "Codecasa",
  "CRN",
  "Benetti",
  "Sanlorenzo",
  "Azimut Benetti",
  "Damen",
  "Pendennis",
  "MB92",
  "Astilleros de Mallorca",
  "STP Palma",
  "Lusben",
  "Amico & Co",
  "Rybovich",
  "Lauderdale Marine Center",
  "Derecktor",
  "RMK Marine",
  "Bilgin",
  "Sirena Marine",
  "Nobiskrug",
  "Italian Sea Group",
  "Nautor Swan",

  // Brokerages
  "Edmiston",
  "Burgess",
  "Y.CO",
  "Ocean Independence",
  "Camper & Nicholsons",
  "Fraser",
  "Cecil Wright",
  "Moran",
  "Northrop & Johnson",
  "Denison",

  // Independent owner's reps
  "Foreland Marine",
  "ULTIMAR",
  "A2B Marine Projects",
  "Divergent Yachting",
  "Mariner Technical Services",
  "Praxis Marine",
  "JMS Yachting",
  "ABL Yachts",
  "KRM Yacht",
  "Saor Alba",
  "Occam",

  // Lawyers
  "Hill Dickinson",
  "Watson Farley & Williams",
  "Stephenson Harwood",
  "HFW",
  "Reed Smith",
  "Norton Rose Fulbright",
  "Ince",

  // Surveyors
  "Wolfson Marine",
  "Ward & McKenzie",
  "Patton Marine",
  "Winterbothams",

  // Management companies
  "Hill Robinson",
  "Döhle Yachts",
  "Wright Maritime Group",

  // Insurers
  "Pantaenius",
  "AIG",
  "Howden",
  "AON",
  "Gallagher",
  "Marsh",

  // Institutions
  "SYBAss",
  "YORP",
  "YORR",
  "Superyacht Alliance",
  "IAMI",
  "GUEST",
  "IYBA",
  "MYBA",
  "BOAT International",
  "Knight Frank",
  "Capgemini",
  "Quay Crew",
  "YPI Crew",
  "EL Crew Co",
  "Yacht Crew Recruitment and Training",
  "The Crew Academy",
  "MCA",
  "FCA",
  "IMO",
  "Lloyd's Register",
  "DNV",
  "ABS",
  "RINA",

  // Named individuals
  "Jack Inglis",
  "Hein Velema",
  "Theo Hooning",
  "Cromwell Littlejohn",
  "Michelle van der Merwe",
  "Erica Lay",
  "Andrew Roch",
  "Kevin Laverty",
  "Tony Gale",
  "Stewart Campbell",

  // Concepts
  "independence test",
  "suitability test",
  "ten questions",
  "10 percent rule",
  "30 to 50 percent overrun",
  "EU ETS",
  "HVO",
  "IPR",
  "Spanish Inward Processing Relief",
  "French Commercial Exemption",
  "Maltese leasing scheme",
  "dual agency",
  "retrocession",
  "refund guarantee",
  "stage payment loading",
  "liquidated damages",
  "force majeure",
  "change order",
  "warranty period",
  "punch list",
  "snag list",
  "sea trial",
  "bayesian",
];

export type IndexEntry = {
  term: string;
  refs: string[];
};

export type IndexGroup = {
  letter: string;
  entries: IndexEntry[];
};

function essayContains(slug: string, term: string): boolean {
  const essay = getLeadEssay(slug);
  if (!essay) return false;
  const re = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  for (const para of essay.paragraphs) {
    if (typeof para === "string" && re.test(para)) return true;
    if (
      typeof para === "object" &&
      "text" in para &&
      typeof para.text === "string" &&
      re.test(para.text)
    ) {
      return true;
    }
  }
  return false;
}

export function buildPrintIndex(
  sections: Section[],
  glossaryEntries: GlossaryEntry[]
): IndexGroup[] {
  const map = new Map<string, Set<string>>();

  function add(term: string, ref: string) {
    const key = term.trim();
    if (!map.has(key)) map.set(key, new Set());
    map.get(key)!.add(ref);
  }

  // Glossary terms become index entries pointing to their related chapters.
  for (const g of glossaryEntries) {
    for (const slug of g.relatedChapters ?? []) {
      const section = sections.find((s) => s.slug === slug);
      if (section) add(g.term, `Ch ${section.number}`);
    }
  }

  // Named entities walked across all chapters.
  for (const term of NAMED_ENTITIES) {
    for (const section of sections) {
      if (essayContains(section.slug, term)) {
        add(term, `Ch ${section.number}`);
      }
    }
  }

  // h2 headings from each chapter's lead essay become index entries.
  for (const section of sections) {
    const essay = getLeadEssay(section.slug);
    if (!essay) continue;
    for (const para of essay.paragraphs) {
      if (typeof para === "object" && para.type === "h2") {
        add(para.text, `Ch ${section.number}`);
      }
    }
  }

  const sorted = Array.from(map.entries()).sort((a, b) =>
    a[0].localeCompare(b[0], "en", { sensitivity: "base" })
  );

  const groups = new Map<string, IndexEntry[]>();
  for (const [term, refSet] of sorted) {
    const refs = Array.from(refSet).sort();
    const first = term[0]?.toUpperCase() ?? "#";
    const letter = /[A-Z]/.test(first) ? first : "Other";
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push({ term, refs });
  }

  return Array.from(groups.entries())
    .map(([letter, entries]) => ({ letter, entries }))
    .sort((a, b) => a.letter.localeCompare(b.letter));
}
