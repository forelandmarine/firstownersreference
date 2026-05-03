import { sections } from "./sections";
import { leadEssays } from "./lead-essays";
import { dataSpreads } from "./data-spreads";
import { cases } from "./cases";
import { checklists } from "./checklists";

export type SearchEntry = {
  id: string;
  kind: "section" | "essay" | "data" | "case" | "checklist";
  kindLabel: string;
  sectionNumber: string;
  sectionTitle: string;
  title: string;
  excerpt: string;
  url: string;
  haystack: string;
};

function trim(text: string, max = 240): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "\u2026";
}

function joinParagraphs(
  paragraphs: (string | { type: string; text?: string })[]
): string {
  return paragraphs
    .map((p) => {
      if (typeof p === "string") return p;
      if ("text" in p && typeof p.text === "string") return p.text;
      return "";
    })
    .join(" ");
}

export const searchIndex: SearchEntry[] = sections.flatMap((section) => {
  const entries: SearchEntry[] = [];
  const sectionUrl = `/${section.slug}`;

  entries.push({
    id: `section-${section.slug}`,
    kind: "section",
    kindLabel: "Section",
    sectionNumber: section.number,
    sectionTitle: section.title,
    title: section.title,
    excerpt: trim(section.standfirst),
    url: sectionUrl,
    haystack: `${section.title} ${section.standfirst}`.toLowerCase(),
  });

  const essay = leadEssays[section.slug];
  if (essay) {
    const essayText = joinParagraphs(essay.paragraphs);
    entries.push({
      id: `essay-${section.slug}`,
      kind: "essay",
      kindLabel: "Lead essay",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: essay.title,
      excerpt: trim(essay.standfirst || essayText),
      url: `${sectionUrl}#essay`,
      haystack: `${essay.title} ${essay.standfirst} ${essayText}`.toLowerCase(),
    });
  }

  const spread = dataSpreads[section.slug];
  if (spread) {
    const spreadText = spread.blocks
      .map((b) => {
        if (b.type === "h2") return b.text;
        if (b.type === "paragraph") return b.text;
        if (b.type === "note") return b.text;
        if (b.type === "table") {
          return `${b.caption ?? ""} ${b.head.join(" ")} ${b.rows
            .map((r) => r.join(" "))
            .join(" ")} ${b.sourceLine ?? ""}`;
        }
        if (b.type === "kv") {
          return `${b.caption ?? ""} ${b.rows
            .map((r) => `${r.label} ${r.value} ${r.note ?? ""}`)
            .join(" ")} ${b.sourceLine ?? ""}`;
        }
        return "";
      })
      .join(" ");
    const sourcesText = spread.sources
      .map((s) => `${s.label} ${s.line}`)
      .join(" ");
    entries.push({
      id: `data-${section.slug}`,
      kind: "data",
      kindLabel: "Data spread",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: spread.title,
      excerpt: trim(spread.standfirst),
      url: `${sectionUrl}#data-spread`,
      haystack:
        `${spread.title} ${spread.standfirst} ${spreadText} ${sourcesText}`.toLowerCase(),
    });
  }

  const study = cases[section.slug];
  if (study) {
    const caseText = joinParagraphs(study.paragraphs);
    const takeawaysText = study.takeaways.join(" ");
    entries.push({
      id: `case-${section.slug}`,
      kind: "case",
      kindLabel: "Case material",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: study.title,
      excerpt: trim(study.standfirst),
      url: `${sectionUrl}#case`,
      haystack:
        `${study.title} ${study.standfirst} ${caseText} ${takeawaysText}`.toLowerCase(),
    });
  }

  const list = checklists[section.slug];
  if (list) {
    const listText = list.groups
      .flatMap((g) => [
        g.heading,
        ...g.items.map((i) => `${i.question} ${i.detail ?? ""}`),
      ])
      .join(" ");
    entries.push({
      id: `checklist-${section.slug}`,
      kind: "checklist",
      kindLabel: "Checklist",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: list.title,
      excerpt: trim(list.standfirst),
      url: `${sectionUrl}#checklist`,
      haystack:
        `${list.title} ${list.standfirst} ${list.intent} ${listText}`.toLowerCase(),
    });
  }

  return entries;
});

export function searchEntries(query: string): SearchEntry[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  const scored = searchIndex
    .map((entry) => {
      let score = 0;
      const title = entry.title.toLowerCase();
      for (const token of tokens) {
        if (title.includes(token)) score += 10;
        const occurrences = entry.haystack.split(token).length - 1;
        score += occurrences;
      }
      return { entry, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((s) => s.entry);

  return scored;
}
