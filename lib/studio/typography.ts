/*
  Typography enforcement for the studio editor (docs/studio-editor-plan.md,
  step 2). House style: smart quotes and apostrophes, no em-dashes, no
  double spaces. Straight quotes convert as you type; em-dashes cannot be
  added (existing ones are surfaced as warnings until the en-dash pass).
*/

const OPEN_DQ = "“";
const CLOSE_DQ = "”";
const OPEN_SQ = "‘";
const CLOSE_SQ = "’";
const EM_DASH = "—";

/* Convert straight quotes/apostrophes to smart forms. Every replacement is
   one character for one character, so caret positions in a controlled
   textarea are preserved. */
export function smarten(text: string): string {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : "";
    if (ch === '"') {
      out +=
        prev === "" || /[\s([{‘“–-]/.test(prev)
          ? OPEN_DQ
          : CLOSE_DQ;
    } else if (ch === "'") {
      if (/[A-Za-z0-9]/.test(prev)) out += CLOSE_SQ;
      else if (prev === "" || /[\s([{“]/.test(prev)) out += OPEN_SQ;
      else out += CLOSE_SQ;
    } else {
      out += ch;
    }
  }
  return out;
}

export type LintIssue = {
  rule: "em-dash" | "double-space" | "tab" | "straight-quote";
  severity: "error" | "warning";
  path: string;
  excerpt: string;
};

function excerptAround(s: string, index: number): string {
  const start = Math.max(0, index - 30);
  const end = Math.min(s.length, index + 30);
  return (start > 0 ? "…" : "") + s.slice(start, end) + (end < s.length ? "…" : "");
}

/* Lint one string. Em-dashes are warnings here; the save gate compares the
   family-wide count against the on-load baseline so existing ones do not
   block saving but new ones do. */
export function lintString(s: string, path: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const checks: [string | RegExp, LintIssue["rule"], LintIssue["severity"]][] = [
    [EM_DASH, "em-dash", "warning"],
    ["  ", "double-space", "error"],
    ["\t", "tab", "error"],
    [/["']/, "straight-quote", "error"],
  ];
  for (const [pat, rule, severity] of checks) {
    const idx = typeof pat === "string" ? s.indexOf(pat) : s.search(pat);
    if (idx !== -1) issues.push({ rule, severity, path, excerpt: excerptAround(s, idx) });
  }
  return issues;
}

/* Walk any JSON-shaped value and lint every string in it. */
export function lintValue(value: unknown, path: string): LintIssue[] {
  if (typeof value === "string") return lintString(value, path);
  if (Array.isArray(value)) {
    return value.flatMap((v, i) => lintValue(v, `${path}[${i}]`));
  }
  if (value && typeof value === "object") {
    /* Paths, URLs and identifiers are not prose. */
    const NON_PROSE = ["src", "href", "hero", "url", "contributorLinkedIn", "chartId"];
    return Object.entries(value).flatMap(([k, v]) =>
      NON_PROSE.includes(k) ? [] : lintValue(v, path ? `${path}.${k}` : k)
    );
  }
  return [];
}

export function countEmDashes(value: unknown): number {
  if (typeof value === "string") {
    return value.split(EM_DASH).length - 1;
  }
  if (Array.isArray(value)) {
    return value.reduce((n: number, v) => n + countEmDashes(v), 0);
  }
  if (value && typeof value === "object") {
    return Object.values(value).reduce((n: number, v) => n + countEmDashes(v), 0);
  }
  return 0;
}
