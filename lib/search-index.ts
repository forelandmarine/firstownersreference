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
  text: string;
};

export type SnippetPart = { value: string; highlight: boolean };
export type Snippet = { parts: SnippetPart[] };

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

  const sectionText = `${section.title} ${section.standfirst}`;
  entries.push({
    id: `section-${section.slug}`,
    kind: "section",
    kindLabel: "Section",
    sectionNumber: section.number,
    sectionTitle: section.title,
    title: section.title,
    excerpt: trim(section.standfirst),
    url: sectionUrl,
    haystack: sectionText.toLowerCase(),
    text: sectionText,
  });

  const essay = leadEssays[section.slug];
  if (essay) {
    const essayText = joinParagraphs(essay.paragraphs);
    const text = `${essay.title} ${essay.standfirst} ${essayText}`;
    entries.push({
      id: `essay-${section.slug}`,
      kind: "essay",
      kindLabel: "Lead essay",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: essay.title,
      excerpt: trim(essay.standfirst || essayText),
      url: `${sectionUrl}#essay`,
      haystack: text.toLowerCase(),
      text,
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
    const text = `${spread.title} ${spread.standfirst} ${spreadText} ${sourcesText}`;
    entries.push({
      id: `data-${section.slug}`,
      kind: "data",
      kindLabel: "Data spread",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: spread.title,
      excerpt: trim(spread.standfirst),
      url: `${sectionUrl}#data-spread`,
      haystack: text.toLowerCase(),
      text,
    });
  }

  const study = cases[section.slug];
  if (study) {
    const caseText = joinParagraphs(study.paragraphs);
    const takeawaysText = study.takeaways.join(" ");
    const text = `${study.title} ${study.standfirst} ${caseText} ${takeawaysText}`;
    entries.push({
      id: `case-${section.slug}`,
      kind: "case",
      kindLabel: "Case material",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: study.title,
      excerpt: trim(study.standfirst),
      url: `${sectionUrl}#case`,
      haystack: text.toLowerCase(),
      text,
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
    const text = `${list.title} ${list.standfirst} ${list.intent} ${listText}`;
    entries.push({
      id: `checklist-${section.slug}`,
      kind: "checklist",
      kindLabel: "Checklist",
      sectionNumber: section.number,
      sectionTitle: section.title,
      title: list.title,
      excerpt: trim(list.standfirst),
      url: `${sectionUrl}#checklist`,
      haystack: text.toLowerCase(),
      text,
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

export function extractSnippets(
  entry: SearchEntry,
  tokens: string[],
  maxSnippets = 3,
  windowChars = 140
): Snippet[] {
  if (tokens.length === 0) return [];
  const haystack = entry.haystack;
  const text = entry.text;

  const matches: { start: number; end: number; token: string }[] = [];
  for (const token of tokens) {
    let from = 0;
    while (true) {
      const idx = haystack.indexOf(token, from);
      if (idx === -1) break;
      matches.push({ start: idx, end: idx + token.length, token });
      from = idx + token.length;
    }
  }
  if (matches.length === 0) return [];
  matches.sort((a, b) => a.start - b.start);

  type Window = { from: number; to: number; matches: typeof matches };
  const windows: Window[] = [];
  for (const m of matches) {
    const desiredFrom = Math.max(0, m.start - Math.floor(windowChars / 2));
    const desiredTo = Math.min(text.length, m.end + Math.floor(windowChars / 2));
    const last = windows[windows.length - 1];
    if (last && desiredFrom <= last.to) {
      last.to = Math.max(last.to, desiredTo);
      last.matches.push(m);
    } else {
      windows.push({ from: desiredFrom, to: desiredTo, matches: [m] });
    }
  }

  const trimmed = windows.slice(0, maxSnippets);

  return trimmed.map((w) => {
    let from = w.from;
    let to = w.to;
    if (from > 0) {
      const space = text.indexOf(" ", from);
      if (space !== -1 && space - from < 30) from = space + 1;
    }
    if (to < text.length) {
      const space = text.lastIndexOf(" ", to);
      if (space !== -1 && to - space < 30) to = space;
    }

    const parts: SnippetPart[] = [];
    let cursor = from;
    if (from > 0) parts.push({ value: "\u2026 ", highlight: false });
    for (const m of w.matches) {
      if (m.start < cursor) continue;
      if (m.start > cursor) {
        parts.push({ value: text.slice(cursor, m.start), highlight: false });
      }
      parts.push({ value: text.slice(m.start, m.end), highlight: true });
      cursor = m.end;
    }
    if (cursor < to) parts.push({ value: text.slice(cursor, to), highlight: false });
    if (to < text.length) parts.push({ value: " \u2026", highlight: false });

    return { parts };
  });
}

export function tokenise(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
}
