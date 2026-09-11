#!/usr/bin/env node
/*
  Grows lib/print-images.ts from the stock library so the print edition can
  run picture-led rather than text-led.

  Background: the August proof carried four supporting images per chapter,
  which put the book at 71 per cent text-led pages against a reference set
  (Portfolio by Savills, Forbes, TSR 218, Moravia, IYC Horizons) that runs
  4 to 27 per cent. Closing that gap needs roughly four times the picture
  volume. Photography is to be commissioned; these are draft stand-ins.

  What it does:
   1. Reads the stock library.
   2. Keeps every image already assigned, so existing curation is not lost.
   3. Deals the unused remainder round-robin across the nine chapters until
      each has TARGET supporting images.
   4. Resizes anything new into public/print-images/print. Column-measure
      supporting pictures go in at 1100px on the long edge, which is 300dpi
      at the 59.3mm column; only the full-bleed plates, openers and cover
      need 2700px. Loading 220 full-size masters on one page pushed a single
      Chrome print pass past 75 minutes.
   5. Rewrites the supporting block of lib/print-images.ts in place.

    node scripts/expand-print-images.mjs [--target 16]
*/

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SOURCE_DIR =
  "/Users/jack/Library/Mobile Documents/com~apple~CloudDocs/Foreland Group/Marketing Materials/Stock images";
const OUT_PRINT = path.join(ROOT, "public/print-images/print");
const MANIFEST = path.join(ROOT, "lib/print-images.ts");

/* 1100px is 300dpi at the 59.3mm column measure plus headroom. Press
   masters for anything that runs full-bleed are handled separately. */
const LONG_EDGE = 1100;

const targetArg = process.argv.indexOf("--target");
const TARGET = targetArg > -1 ? Number(process.argv[targetArg + 1]) : 16;

const CHAPTERS = [
  "01-reality-of-ownership",
  "02-reading-the-market",
  "03-how-the-industry-works",
  "04-acquisition-process",
  "05-new-build-versus-brokerage",
  "06-refit",
  "07-operations",
  "08-motor-versus-sail",
  "09-decision-framework",
];

const src = fs.readFileSync(MANIFEST, "utf8");

/* Every filename already referenced anywhere in the manifest, so the cover,
   frontispiece, openers, talls and case pictures are never re-dealt. */
const claimed = new Set(
  [...src.matchAll(/filename:\s*"([^"]+)"/g)].map((m) => m[1]),
);

/* Existing per-chapter supporting lists, preserved in order. */
const supportingBlock = src.match(/supporting: \{([\s\S]*?)\n {2}\},/);
if (!supportingBlock) throw new Error("Could not find the supporting block");

const existing = {};
for (const ch of CHAPTERS) {
  const re = new RegExp(`"${ch}":\\s*\\[([\\s\\S]*?)\\]`, "m");
  const m = supportingBlock[1].match(re);
  existing[ch] = m
    ? [...m[1].matchAll(/\{[^}]*filename:\s*"([^"]+)"[^}]*alt:\s*"([^"]*)"[^}]*\}/g)].map(
        (x) => ({ filename: x[1], alt: x[2] }),
      )
    : [];
}

const pool = fs
  .readdirSync(SOURCE_DIR)
  .filter((f) => /\.(jpe?g|png)$/i.test(f))
  .filter((f) => !claimed.has(f.replace(/\.[^.]+$/, ".jpg")) && !claimed.has(f))
  .sort();

console.log(
  `${pool.length} unclaimed images in the library; target ${TARGET} per chapter`,
);

/* Trim first. The script used to only ever add, so lowering the target did
   nothing. Keeping the head of each list preserves whatever curation order
   is already there. */
for (const ch of CHAPTERS) {
  if (existing[ch].length > TARGET) existing[ch] = existing[ch].slice(0, TARGET);
}

/* Deal round-robin so adjacent chapters do not get visually adjacent stock. */
let pi = 0;
const added = [];
for (let pass = 0; pass < TARGET; pass++) {
  for (const ch of CHAPTERS) {
    if (existing[ch].length >= TARGET) continue;
    /* Wrap the pool once exhausted. Reuse across distant chapters is
       acceptable for a draft; the commissioned shoot replaces all of it. */
    const file = pool[pi++ % pool.length];
    const out = file.replace(/\.[^.]+$/, ".jpg");
    existing[ch].push({
      filename: out,
      alt: `Supporting photograph, chapter ${ch.slice(0, 2)}`,
    });
    added.push([file, out]);
  }
}

/* Resize the new ones to the print master size. */
fs.mkdirSync(OUT_PRINT, { recursive: true });
let resized = 0;
for (const [srcName, outName] of added) {
  const dest = path.join(OUT_PRINT, outName);
  if (fs.existsSync(dest)) continue;
  execFileSync("sips", [
    "-Z", String(LONG_EDGE),
    "-s", "format", "jpeg",
    "-s", "formatOptions", "85",
    path.join(SOURCE_DIR, srcName),
    "--out", dest,
  ], { stdio: "ignore" });
  resized++;
}
console.log(`resized ${resized} new masters into public/print-images/print`);

/* Rewrite the supporting block. */
const rendered =
  "supporting: {\n" +
  CHAPTERS.map((ch) => {
    const items = existing[ch]
      .map(
        (i) =>
          `      { filename: "${i.filename}", alt: "${i.alt.replace(/"/g, '\\"')}" },`,
      )
      .join("\n");
    return `    "${ch}": [\n${items}\n    ],`;
  }).join("\n") +
  "\n  },";

const next = src.replace(/supporting: \{[\s\S]*?\n {2}\},/, rendered);
fs.writeFileSync(MANIFEST, next);

console.log("per chapter:", CHAPTERS.map((c) => existing[c].length).join(", "));
console.log("wrote lib/print-images.ts");
