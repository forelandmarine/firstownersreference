/*
  One-off extraction for the studio editor content migration (docs/
  studio-editor-plan.md, step 1). Imports the seven content modules and
  writes their data exports to content/*.json verbatim, so the JSON is
  generated from the canonical TS literals rather than transcribed.

  Run with: pnpm dlx tsx scripts/migrate-content-to-json.mts
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { sections } from "../lib/sections";
import { leadEssays } from "../lib/lead-essays";
import { cases } from "../lib/cases";
import { dataSpreads } from "../lib/data-spreads";
import { checklists } from "../lib/checklists";
import { chapterFaqs } from "../lib/faqs";
import { guestOpinions } from "../lib/guest-opinions";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIR = path.join(ROOT, "content");
fs.mkdirSync(DIR, { recursive: true });

const families: [string, unknown][] = [
  ["sections", sections],
  ["lead-essays", leadEssays],
  ["cases", cases],
  ["data-spreads", dataSpreads],
  ["checklists", checklists],
  ["faqs", chapterFaqs],
  ["guest-opinions", guestOpinions],
];

for (const [name, data] of families) {
  const file = path.join(DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`${file} (${fs.statSync(file).size} bytes)`);
}
