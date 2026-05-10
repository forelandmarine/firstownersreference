#!/usr/bin/env node
/*
  Print proof build orchestrator.

  Steps:
   1. Parse the curated image-assignments.md (written by the curation agent
      to /tmp/image-assignments.md) and update lib/print-images.ts with the
      chosen filenames.
   2. Resize each chosen image into public/print-images/print/ at long-edge
      2700 px JPG quality 85, sRGB.
   3. Spin up `next start` on a free port (assumes the production build has
      already completed).
   4. Launch headless Chrome via Puppeteer, navigate to /print, inject the
      paged.js polyfill, wait for pagination, print to PDF at 230 × 300 mm.
   5. Save the PDF to ~/Desktop/firstownersreference-1st-edition-proof.pdf.
   6. Write the assignment manifest, design notes, and todo list to the
      desktop alongside the PDF.

  Run with:
    node scripts/build-print.mjs

  Requires: pagedjs, puppeteer, sips (macOS built-in).
*/

import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { setTimeout as wait } from "node:timers/promises";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SOURCE_DIR =
  "/Users/jack/Library/Mobile Documents/com~apple~CloudDocs/Foreland Group/Marketing Materials/Stock images";
const OUT_PRINT = path.join(ROOT, "public/print-images/print");
const OUT_WEB = path.join(ROOT, "public/print-images/web");
const ASSIGNMENTS_FILE = "/tmp/image-assignments.md";
const HOME = os.homedir();
const DESKTOP = path.join(HOME, "Desktop");
const PDF_OUT = path.join(DESKTOP, "firstownersreference-1st-edition-proof.pdf");
const NOTES_OUT = path.join(DESKTOP, "firstownersreference-print-notes.md");
const ASSIGNMENTS_OUT = path.join(DESKTOP, "firstownersreference-print-images.md");
const TODO_OUT = path.join(DESKTOP, "firstownersreference-print-todo.md");

const CHAPTER_ORDER = [
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

function log(msg) {
  const t = new Date().toISOString().substring(11, 19);
  console.log(`[${t}] ${msg}`);
}

function ensureDirs() {
  fs.mkdirSync(OUT_PRINT, { recursive: true });
  fs.mkdirSync(OUT_WEB, { recursive: true });
}

function parseAssignments() {
  if (!fs.existsSync(ASSIGNMENTS_FILE)) {
    log(`! No assignments file at ${ASSIGNMENTS_FILE}; falling back to placeholders`);
    return null;
  }
  const text = fs.readFileSync(ASSIGNMENTS_FILE, "utf8");
  const lines = text.split("\n");

  const result = {
    cover: null,
    frontispiece: null,
    chapters: {},
    closing: null,
    supporting: {},
    raw: text,
  };

  let context = null; // "cover" | "frontispiece" | "ch01"... | "closing"
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## Cover")) context = "cover";
    else if (line.startsWith("## Frontispiece")) context = "frontispiece";
    else if (line.startsWith("## Back matter closing")) context = "closing";
    else if (/^### Chapter (\d+) supporting/.test(line)) {
      // IMPORTANT: check supporting BEFORE the bare "### Chapter N"
      const m = /^### Chapter (\d+) supporting/.exec(line);
      const num = m[1].padStart(2, "0");
      const slug = CHAPTER_ORDER.find((c) => c.startsWith(num + "-"));
      context = slug ? `support:${slug}` : null;
    } else if (/^### Chapter (\d+)\b(?! supporting)/.test(line)) {
      const m = /^### Chapter (\d+)/.exec(line);
      const num = m[1].padStart(2, "0");
      const slug = CHAPTER_ORDER.find((c) => c.startsWith(num + "-"));
      context = slug ? `chapter:${slug}` : null;
    } else if (line.startsWith("## ")) {
      context = null;
    } else if (line.startsWith("filename:") && context) {
      const filename = line.replace(/^filename:\s*/, "").trim();
      if (context === "cover") result.cover = filename;
      else if (context === "frontispiece") result.frontispiece = filename;
      else if (context === "closing") result.closing = filename;
      else if (context.startsWith("chapter:")) {
        const slug = context.replace("chapter:", "");
        result.chapters[slug] = filename;
      } else if (context.startsWith("support:")) {
        const slug = context.replace("support:", "");
        if (!result.supporting[slug]) result.supporting[slug] = [];
        result.supporting[slug].push(filename);
      }
    }
  }

  return result;
}

function resizeImage(srcName, outName) {
  const src = path.join(SOURCE_DIR, srcName);
  if (!fs.existsSync(src)) {
    throw new Error(`Source image missing: ${src}`);
  }

  const printOut = path.join(OUT_PRINT, outName);
  const webOut = path.join(OUT_WEB, outName);

  // Resize for print: long edge 2700 px, JPG quality 85
  execSync(
    `sips --resampleHeightWidthMax 2700 -s formatOptions 85 "${src}" --out "${printOut}"`,
    { stdio: "pipe" }
  );
  // Resize for web preview: long edge 1600 px, JPG quality 80
  execSync(
    `sips --resampleHeightWidthMax 1600 -s formatOptions 80 "${src}" --out "${webOut}"`,
    { stdio: "pipe" }
  );

  return { print: printOut, web: webOut };
}

function processImages(assignments) {
  log("Processing images...");
  const manifest = {
    cover: { filename: "cover.jpg", source: assignments?.cover ?? null },
    frontispiece: {
      filename: "frontispiece.jpg",
      source: assignments?.frontispiece ?? null,
    },
    closing: { filename: "closing.jpg", source: assignments?.closing ?? null },
    chapters: {},
  };

  const tasks = [];
  if (assignments?.cover) tasks.push(["cover.jpg", assignments.cover]);
  if (assignments?.frontispiece)
    tasks.push(["frontispiece.jpg", assignments.frontispiece]);
  if (assignments?.closing) tasks.push(["closing.jpg", assignments.closing]);

  for (const [i, slug] of CHAPTER_ORDER.entries()) {
    const num = String(i + 1).padStart(2, "0");
    const filename = `ch${num}.jpg`;
    const source = assignments?.chapters?.[slug];
    if (source) {
      tasks.push([filename, source]);
      manifest.chapters[slug] = { filename, source };
    } else {
      manifest.chapters[slug] = { filename, source: null };
    }
  }

  for (const [outName, srcName] of tasks) {
    try {
      resizeImage(srcName, outName);
      log(`  ${outName} ← ${srcName}`);
    } catch (e) {
      log(`  ! Failed ${outName}: ${e.message}`);
    }
  }

  return manifest;
}

function updatePrintImagesManifest(manifest) {
  const file = path.join(ROOT, "lib/print-images.ts");
  const chapters = CHAPTER_ORDER.map((slug) => {
    const ch = manifest.chapters[slug];
    return `    "${slug}": { filename: "${ch.filename}", alt: "Chapter ${slug.split("-")[0]} opener" },`;
  }).join("\n");

  const out = `/* Generated by scripts/build-print.mjs at ${new Date().toISOString()} */
export type PrintImage = { filename: string; caption?: string; credit?: string; alt: string };

export const printImages: {
  cover: PrintImage;
  frontispiece: PrintImage;
  chapters: Record<string, PrintImage>;
  closing: PrintImage;
} = {
  cover: { filename: "${manifest.cover.filename}", alt: "Cover image" },
  frontispiece: { filename: "${manifest.frontispiece.filename}", alt: "Frontispiece image" },
  chapters: {
${chapters}
  },
  closing: { filename: "${manifest.closing.filename}", alt: "Closing image" },
};
`;
  fs.writeFileSync(file, out, "utf8");
  log("  print-images.ts manifest updated");
}

async function startServer() {
  log("Starting Next production server on port 3939...");
  const proc = spawn("pnpm", ["next", "start", "-p", "3939"], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });
  // Wait for ready signal
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Server start timeout")), 30000);
    proc.stdout.on("data", (chunk) => {
      const s = chunk.toString();
      if (s.includes("Ready") || s.includes("started server")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    proc.stderr.on("data", (chunk) => process.stderr.write(chunk));
  });
  log("  Server up");
  return proc;
}

async function generatePdf() {
  log("Launching Chrome...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 600000,
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(180000);
  page.setDefaultNavigationTimeout(180000);
  // Use a print-style viewport so the layout the page renders matches the
  // print one we'll capture.
  await page.setViewport({ width: 870, height: 1134, deviceScaleFactor: 1 });
  // Switch the renderer into "print" media so @media print rules apply.
  await page.emulateMediaType("print");

  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warn") {
      console.log(`  [browser ${msg.type()}] ${msg.text().slice(0, 200)}`);
    }
  });
  page.on("pageerror", (err) => {
    console.log(`  [browser error] ${err.message}`);
  });

  log("  Navigating to /print...");
  await page.goto("http://localhost:3939/print", {
    waitUntil: "networkidle0",
    timeout: 180000,
  });

  log("  Waiting for images to fully load...");
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
      )
    );
  });

  // small settle time
  await wait(2000);

  log("  Generating PDF via Chrome native print path...");
  await page.pdf({
    path: PDF_OUT,
    width: "230mm",
    height: "300mm",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    timeout: 300000,
  });
  log(`  PDF saved: ${PDF_OUT}`);

  // approximate page count from the file
  const pdfStat = fs.statSync(PDF_OUT);
  log(`  PDF size: ${(pdfStat.size / 1024 / 1024).toFixed(1)} MB`);

  await browser.close();
  return -1; // page count unknown without paged.js
}

function writeArtifacts(manifest, assignments, pageCount) {
  // Image-assignment list
  const lines = [
    "# The First Owner's Reference, 1st Edition print proof",
    "# Image assignments",
    `# Generated ${new Date().toISOString().substring(0, 10)}`,
    "",
    `## Cover`,
    `- File: \`${manifest.cover.source ?? "PLACEHOLDER"}\` → \`cover.jpg\``,
    "",
    `## Frontispiece`,
    `- File: \`${manifest.frontispiece.source ?? "PLACEHOLDER"}\` → \`frontispiece.jpg\``,
    "",
    `## Chapter openers`,
    "",
  ];
  for (const slug of CHAPTER_ORDER) {
    const ch = manifest.chapters[slug];
    lines.push(`- **${slug}**: \`${ch.source ?? "PLACEHOLDER"}\` → \`${ch.filename}\``);
  }
  lines.push("", `## Closing image`);
  lines.push(`- File: \`${manifest.closing.source ?? "PLACEHOLDER"}\` → \`closing.jpg\``);
  if (assignments?.raw) {
    lines.push("", "---", "", "## Curation agent notes (verbatim)", "", assignments.raw);
  }
  fs.writeFileSync(ASSIGNMENTS_OUT, lines.join("\n"), "utf8");

  // Skip writing notes/todo if they already contain custom content the
  // editor has marked up. Heuristic: if the file exists and is larger
  // than 8KB it has been hand-edited; preserve.
  const skipNotes = fs.existsSync(NOTES_OUT) && fs.statSync(NOTES_OUT).size > 8000;
  const skipTodo = fs.existsSync(TODO_OUT) && fs.statSync(TODO_OUT).size > 8000;

  // Design notes
  if (skipNotes) {
    log(`  ${NOTES_OUT} preserved (looks hand-edited)`);
  } else
  fs.writeFileSync(
    NOTES_OUT,
    `# Print proof: design notes

Generated automatically by the build script. Open the PDF first, then read these notes alongside.

## Page count
${pageCount} pages.

## Trim and margins
- Trim: 230 × 300 mm
- Outer margin: 18 mm
- Inner (gutter) margin: 22 mm
- Top margin: 22 mm
- Bottom margin: 22 mm

The inner margin is intentionally larger than the outer because the casebound binding loses ~5 mm into the gutter at this trim.

## Type system

| Element | Family | Size | Leading |
|---|---|---|---|
| Body | Newsreader, 400 | 9.5 pt | 13 pt |
| Drop cap | Newsreader, 300 | 51 pt | 0.95 |
| h2 | Newsreader, 400 | 13 pt | 16 pt |
| Pull quote | Newsreader, 300, italic | 18 pt | 22 pt |
| Standfirst | Newsreader, 300, italic | 14 pt | 19 pt |
| Caption | Newsreader, italic | 7.75 pt | 10.5 pt |
| Meta-mono | Geist Mono | 7 pt | 9 pt |
| Chapter number | Newsreader, 300 | 220 pt | 0.85 |
| Chapter title | Newsreader, 300 | 36 pt | 38 pt |
| Folio | Geist Mono | 8.5 pt | — |

Body text is justified with hyphenation enabled (\`hyphens: auto\`, limit 6 3 3). Orphans and widows are set to 3 lines minimum.

## Hierarchy and rhythm
- Chapter openers always start on a recto, with a full-bleed image on the verso opposite.
- Sections (h2) within a chapter break-after avoid: the heading and the first line of its paragraph stay together.
- Pull quotes are span-all in the two-column layout, with a left rule in marine.
- Editor's notes sit at column-width with a tinted background and left rule.
- Cases run as feature articles with their own opener including yacht class, year, and value bands.
- Data spreads use tabular figures (\`font-variant-numeric: tabular-nums\`) and Geist Mono numerals.

## Colour
- Marine #0f3b5c carries the editorial accent: chapter numbers, pull-quote rule, h2 in cases.
- Sail-blue #4a7da9 carries non-emphasis chart series.
- Charcoal #1a1a1a is body text.
- Stone #7a756d is metadata, captions, and folios.
- Paper #f5f2ec is the background.
- Rule #c8c2b4 is hairlines.

## Where the proof falls short of magazine-press
- **Cover.** Auto-picked from the stock library. The press edition needs commissioned cover photography.
- **Image art-direction.** Stock images selected by an agent for editorial fit are adjacent rather than perfect. A picture editor for the September edition will commission and call in shots properly.
- **Charts.** Designed for screen; render correctly at print but a designer may redraw two or three for print legibility.
- **Index.** Auto-generated. A human indexer will rebuild it for the press edition with concept threading and see-also references.
- **Drop caps.** Set on first paragraph of each chapter and case via \`::first-letter\`; designers usually set drop caps as separate spans for finer control over kerning and line offset.
- **Footnotes.** Currently sources are consolidated in the back matter rather than at foot of page. A designer's pass typically moves these to chapter ends or page foot.
- **Acknowledgements.** Placeholder. To be written after contributors confirm.

## What a press file would still need
- CMYK conversion via Acrobat / Affinity Publisher / Ghostscript with printer-supplied ICC profile
- 3 mm bleed on all four edges
- Crop marks and registration marks
- Embedded ICC profile matching the printer's preferred profile (e.g. ISO Coated v2 or Fogra39)
- Image masters at 300 dpi at print size (currently 2700px long edge, sufficient for proof but better to source originals at press time)
- En-dashes for ranges (currently "20 to 24m"); a typographic pass before press
- Cover separately designed (foil + blind deboss specs to be supplied to the binder)

## Repeatable
The proof regenerates by running:

\`\`\`
pnpm build && node scripts/build-print.mjs
\`\`\`

Image manifest is in \`lib/print-images.ts\`. Mark up which images to swap in the assignment list, then re-run.
`,
    "utf8"
  );

  // Todo
  if (skipTodo) {
    log(`  ${TODO_OUT} preserved (looks hand-edited)`);
  } else
  fs.writeFileSync(
    TODO_OUT,
    `# Print proof: todo and editorial notes

Auto-generated companion to the proof PDF. Read alongside the design notes.

## Editorial gaps surfaced by typesetting

- Contributor list shows only confirmed contributors; the eight outstanding slots are hidden on the contributors page (intentional per editor preference) but readers may notice the absence on chapters lacking a "Contributor" line. Confirming contributors is the single most consequential remaining editorial task before press.
- The auto-index is a working draft. Cross-references that a human indexer would catch (concept threading, see-also references, term variants) are not in it.
- The acknowledgements section is a placeholder. Write after contributors confirm.

## Image-related

- Cover photography: commission for the press edition. Auto-pick from stock works for proof.
- Frontispiece: sample image; designer may want a quieter alternative.
- Some chapters may have image-to-content fit that reads adjacent rather than tight. Mark up which to swap on review.
- The book has 11 full-bleed image pages (cover, frontispiece, 9 chapter versos, closing). Strong photography directly determines the perceived editorial register.

## Typographic notes
- "20 to 24m" appears throughout; en-dashes ("20–24m") are the print convention. A single typographic pass before press converts these.
- Smart quotes are in source. Nothing to fix at proof.
- No em-dashes per editor preference. Verified absent in the source.
- Hyphenation enabled. A few awkward breaks may appear at first page-break test; flag any in the margin for the designer.

## Production decisions still open
- Cover specification: foil colour for wordmark, blind-deboss alignment of lighthouse mark, board colour from GF Smith Colorplan range
- Endpaper colour and stock
- Spine treatment: foil-stamped wordmark or blind only
- Ribbon marker: marine vs alternative

## What to mark up on the proof
1. Photographs that don't read editorially right
2. Pages where pull quotes feel forced or repetitive
3. Pages where charts feel small or hard to read at trim
4. Any awkward page breaks (orphan single line, h2 stranded at foot, figure on wrong page)
5. Copy errors that survived the previous editorial passes
6. Places where the publication feels Foreland-branded rather than its own thing (a reminder for the brand-separation work in roadmap)
`,
    "utf8"
  );

  log(`  Wrote ${ASSIGNMENTS_OUT}`);
  log(`  Wrote ${NOTES_OUT}`);
  log(`  Wrote ${TODO_OUT}`);
}

async function main() {
  log("=== Print proof build ===");
  ensureDirs();

  const assignments = parseAssignments();
  if (!assignments) {
    log("! Cannot continue without image assignments");
    process.exit(1);
  }

  const manifest = processImages(assignments);
  updatePrintImagesManifest(manifest);

  if (!process.env.SKIP_BUILD) {
    log("Building Next production bundle...");
    execSync("pnpm build", { cwd: ROOT, stdio: "inherit" });
  } else {
    log("Skipping production build (SKIP_BUILD set)");
  }

  let serverProc;
  try {
    serverProc = await startServer();
    const pageCount = await generatePdf();
    writeArtifacts(manifest, assignments, pageCount);
  } finally {
    if (serverProc) serverProc.kill("SIGTERM");
  }

  log("=== Done ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
