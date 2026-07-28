import Link from "next/link";
import type { ReactNode } from "react";

/**
 * First-occurrence glossary autolinking for chapter essay bodies.
 *
 * Links the first appearance of a curated set of glossary terms in each
 * chapter's plain paragraphs to the consolidated /glossary page anchor.
 * Headings, blockquotes, figures, and editor's notes never pass through
 * this function, so quoted speech and display copy are never linked.
 * The alias list is curated by hand: acronyms match case-sensitively so
 * that prose words like "aim" never match "AIS"; phrases match
 * case-insensitively and tolerate straight and curly apostrophes.
 */

type TermAlias = {
  slug: string;
  alias: string;
  caseSensitive?: boolean;
};

const TERM_ALIASES: TermAlias[] = [
  // Phrases, case-insensitive. Longer aliases must precede shorter
  // prefixes of themselves so the scanner prefers the specific form.
  { slug: "owners-representative", alias: "owner’s representative" },
  { slug: "owners-representative", alias: "owner's representative" },
  { slug: "flag-state", alias: "flag state" },
  { slug: "temporary-admission", alias: "temporary admission" },
  { slug: "vat-paid-status", alias: "VAT-paid status" },
  { slug: "spanish-ipr", alias: "Spanish Inward Processing Relief" },
  { slug: "spanish-ipr", alias: "Spanish IPR" },
  { slug: "spanish-matriculation-tax", alias: "Spanish Matriculation Tax" },
  { slug: "yacht-engaged-in-trade", alias: "Yacht Engaged in Trade" },
  { slug: "red-ensign-group", alias: "Red Ensign Group" },
  { slug: "polar-code", alias: "Polar Code" },
  { slug: "class-society", alias: "classification society" },
  { slug: "class-society", alias: "class society" },
  { slug: "hull-insurance", alias: "hull and machinery" },
  { slug: "moa", alias: "Memorandum of Agreement" },
  { slug: "sea-trial", alias: "sea trial" },
  { slug: "pre-purchase-survey", alias: "pre-purchase survey" },
  { slug: "central-agency", alias: "central agency" },
  { slug: "central-agency", alias: "central agent" },
  { slug: "dual-agency", alias: "dual agency" },
  { slug: "retrocession", alias: "retrocessions" },
  { slug: "retrocession", alias: "retrocession" },
  { slug: "yacht-management-company", alias: "yacht management company" },
  { slug: "yacht-management-company", alias: "management company" },
  { slug: "yorr", alias: "Yacht Owners' Register of Representatives" },
  { slug: "yorr", alias: "Yacht Owner's Representative Register" },
  { slug: "yorr", alias: "Yacht Owner’s Representative Register" },
  { slug: "beneficial-ownership", alias: "beneficial-ownership" },
  { slug: "beneficial-ownership", alias: "beneficial ownership" },
  { slug: "stage-payments", alias: "stage payment schedule" },
  { slug: "stage-payments", alias: "stage payments" },
  { slug: "punch-list", alias: "punch list" },
  { slug: "obbba", alias: "One Big Beautiful Bill Act" },
  { slug: "knight-frank-wr", alias: "Knight Frank Wealth Report" },
  { slug: "global-order-book", alias: "Global Order Book" },
  { slug: "charter-vat", alias: "charter VAT" },
  { slug: "brokerage", alias: "brokerage" },
  { slug: "refit", alias: "refit" },

  // Acronyms, case-sensitive, word-bounded. "ISM Code" before "ISM".
  { slug: "ism", alias: "ISM Code", caseSensitive: true },
  { slug: "ism", alias: "ISM", caseSensitive: true },
  { slug: "isps", alias: "ISPS Code", caseSensitive: true },
  { slug: "isps", alias: "ISPS", caseSensitive: true },
  { slug: "mlc", alias: "MLC 2006", caseSensitive: true },
  { slug: "mlc", alias: "MLC", caseSensitive: true },
  { slug: "myba", alias: "MYBA", caseSensitive: true },
  { slug: "stcw", alias: "STCW", caseSensitive: true },
  { slug: "eng1", alias: "ENG1", caseSensitive: true },
  { slug: "marpol", alias: "MARPOL", caseSensitive: true },
  { slug: "eu-ets", alias: "EU ETS", caseSensitive: true },
  { slug: "tier-iii", alias: "Tier III", caseSensitive: true },
  { slug: "p-and-i", alias: "P&I", caseSensitive: true },
  { slug: "ais", alias: "AIS", caseSensitive: true },
  { slug: "ecdis", alias: "ECDIS", caseSensitive: true },
  { slug: "yacht-engaged-in-trade", alias: "YET", caseSensitive: true },
  { slug: "yorr", alias: "YORR", caseSensitive: true },
  { slug: "sybass", alias: "SYBAss", caseSensitive: true },
  { slug: "spv", alias: "SPV", caseSensitive: true },
  { slug: "moa", alias: "MOA", caseSensitive: true },
  { slug: "lmaa", alias: "LMAA", caseSensitive: true },
];

const BOUNDARY_BEFORE = /[A-Za-z0-9’'&-]/;
const BOUNDARY_AFTER = /[A-Za-z0-9&]/;

function findMatch(
  text: string,
  fromIndex: number,
  linked: Set<string>
): { index: number; length: number; slug: string } | null {
  let best: { index: number; length: number; slug: string } | null = null;
  for (const { slug, alias, caseSensitive } of TERM_ALIASES) {
    if (linked.has(slug)) continue;
    const haystack = caseSensitive ? text : text.toLowerCase();
    const needle = caseSensitive ? alias : alias.toLowerCase();
    let i = haystack.indexOf(needle, fromIndex);
    while (i !== -1) {
      const before = i === 0 ? "" : text[i - 1];
      const after =
        i + needle.length >= text.length ? "" : text[i + needle.length];
      const bounded =
        (before === "" || !BOUNDARY_BEFORE.test(before)) &&
        (after === "" || !BOUNDARY_AFTER.test(after));
      if (bounded) break;
      i = haystack.indexOf(needle, i + 1);
    }
    if (i === -1) continue;
    if (
      best === null ||
      i < best.index ||
      (i === best.index && needle.length > best.length)
    ) {
      best = { index: i, length: alias.length, slug };
    }
  }
  return best;
}

function linkifyEmailsInto(
  text: string,
  parts: ReactNode[],
  keyPrefix: string
): void {
  const emailRegex = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = emailRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`${keyPrefix}-email-${key++}`}
        href={`mailto:${match[0]}`}
        className="link-marine"
      >
        {match[0]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
}

/**
 * Render a plain essay paragraph with first-occurrence glossary links
 * and mailto links. `linked` carries state across the paragraphs of one
 * chapter so each term links at most once per chapter.
 */
export function linkifyEssayText(
  text: string,
  linked: Set<string>,
  keyPrefix: string
): ReactNode[] {
  const parts: ReactNode[] = [];
  let cursor = 0;
  let key = 0;
  for (;;) {
    const match = findMatch(text, cursor, linked);
    if (!match) break;
    if (match.index > cursor) {
      linkifyEmailsInto(text.slice(cursor, match.index), parts, `${keyPrefix}-${key}`);
    }
    const shown = text.slice(match.index, match.index + match.length);
    parts.push(
      <Link
        key={`${keyPrefix}-term-${key++}`}
        href={`/glossary#${match.slug}`}
        className="link-marine"
      >
        {shown}
      </Link>
    );
    linked.add(match.slug);
    cursor = match.index + match.length;
  }
  if (cursor < text.length) {
    linkifyEmailsInto(text.slice(cursor), parts, `${keyPrefix}-tail`);
  }
  return parts.length > 0 ? parts : [text];
}
