#!/usr/bin/env node
/*
  Print proof build orchestrator.

  Steps:
   1. Parse the curated image-assignments.md (written by the curation agent
      to /tmp/image-assignments.md) and update lib/print-images.ts with the
      chosen filenames.
   2. Resize each chosen image into public/print-images/print/ at long-edge
      2700 px JPG quality 85, sRGB.
   3. Two-pass native Chrome print of /print at the 236 × 306 mm sheet
      (230 × 300 trim + 3 mm bleed): pass one discovers where chapters
      land, feeds real contents folios and verso/recto parity spacers
      back into lib/print-folios.json, later passes verify stability.
   4. Print each full-bleed page (cover, frontispiece, chapter openers,
      closing) standalone via /print-opener/[key] and merge them over
      the flow document's placeholder pages (mid-document full-page
      boxes fragment against the root master and show a seam).
   5. Save the proof to ~/Desktop, stamp TrimBox/BleedBox, convert to
      CMYK, build the padded press block, and print the case artwork
      from /print-case.
   6. Write the assignment manifest, design notes, and todo list to the
      desktop alongside the PDF.

  Run with:
    node scripts/build-print.mjs        (SKIP_BUILD=1 to reuse .next)

  Requires: puppeteer, sips, pdftotext (poppler), gs (ghostscript),
  python3 + pypdf.
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
    supporting: {},
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

    // Supporting images per chapter (one or two from the curation agent)
    const supports = assignments?.supporting?.[slug] ?? [];
    manifest.supporting[slug] = [];
    supports.forEach((src, idx) => {
      const sfx = String(idx + 1);
      const sFilename = `ch${num}-sup${sfx}.jpg`;
      tasks.push([sFilename, src]);
      manifest.supporting[slug].push({ filename: sFilename, source: src });
    });
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

  const supporting = CHAPTER_ORDER.map((slug) => {
    const sups = manifest.supporting[slug] ?? [];
    if (sups.length === 0) return `    "${slug}": [],`;
    const items = sups
      .map(
        (s) =>
          `{ filename: "${s.filename}", alt: "Chapter ${slug.split("-")[0]} supporting" }`
      )
      .join(", ");
    return `    "${slug}": [${items}],`;
  }).join("\n");

  const out = `/* Generated by scripts/build-print.mjs at ${new Date().toISOString()} */
export type PrintImage = { filename: string; caption?: string; credit?: string; alt: string };

export const printImages: {
  cover: PrintImage;
  frontispiece: PrintImage;
  chapters: Record<string, PrintImage>;
  supporting: Record<string, PrintImage[]>;
  closing: PrintImage;
} = {
  cover: { filename: "${manifest.cover.filename}", alt: "Cover image" },
  frontispiece: { filename: "${manifest.frontispiece.filename}", alt: "Frontispiece image" },
  chapters: {
${chapters}
  },
  supporting: {
${supporting}
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
  await page.setViewport({ width: 893, height: 1157, deviceScaleFactor: 1 });
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

  log("  Generating PDF via Chrome native print (236 x 306 mm sheet)...");
  await page.pdf({
    path: PDF_OUT,
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    timeout: 300000,
  });
  log(`  PDF saved: ${PDF_OUT}`);

  const pdfStat = fs.statSync(PDF_OUT);
  log(`  PDF size: ${(pdfStat.size / 1024 / 1024).toFixed(1)} MB`);

  await browser.close();
}

/* === Two-pass page map ===================================== */

const FOLIOS_FILE = path.join(ROOT, "lib/print-folios.json");

// Parse the printed PDF's text layer for the invisible [[CH..]] and
// [[REF-..]] markers so the build knows which sheet each chapter and
// reference section landed on.
function parsePageMap(pdfPath) {
  const txt = execSync(`pdftotext "${pdfPath}" -`, {
    maxBuffer: 1024 * 1024 * 256,
  }).toString();
  const pages = txt.split("\f");
  const map = { chapters: {}, refs: {}, singles: {}, total: pages.length };
  if (pages[pages.length - 1].trim() === "") map.total -= 1;
  pages.forEach((t, i) => {
    const pdfPage = i + 1;
    for (const m of t.matchAll(/\[\[CH(\d{2})\]\]/g)) {
      const n = parseInt(m[1], 10);
      if (!(n in map.chapters)) map.chapters[n] = pdfPage;
    }
    for (const m of t.matchAll(/\[\[REF-([A-Z]+)\]\]/g)) {
      const k = m[1].toLowerCase();
      if (!(k in map.refs)) map.refs[k] = pdfPage;
    }
    for (const m of t.matchAll(/\[\[(FRONTIS|CLOSING)\]\]/g)) {
      const k = m[1].toLowerCase();
      if (!(k in map.singles)) map.singles[k] = pdfPage;
    }
  });
  return map;
}

// The flow document IS the book block (the cover is prepended at merge
// time), so block page = PDF page. Chapter openers must land on a verso
// (even block page) so body copy opens on the facing recto; a spacer page
// is inserted where parity is wrong. Folios listed in the contents are
// the opener's block page.
function computeFolios(map, currentSpacers) {
  const chapterNums = Object.keys(map.chapters)
    .map(Number)
    .sort((a, b) => a - b);

  // Strip the effect of spacers already present in this print so the
  // greedy walk below starts from the raw, spacer-free layout.
  const rawPage = {};
  for (const n of chapterNums) {
    const before = currentSpacers.filter((s) => {
      const sn = parseInt(s.replace("ch", ""), 10);
      return sn <= n;
    }).length;
    rawPage[n] = map.chapters[n] - before;
  }
  const rawRefs = {};
  for (const [k, v] of Object.entries(map.refs)) {
    rawRefs[k] = v - currentSpacers.length;
  }

  const spacers = [];
  const chapters = {};
  let shift = 0;
  for (const n of chapterNums) {
    let block = rawPage[n] + shift;
    if (block % 2 !== 0) {
      spacers.push(`ch${String(n).padStart(2, "0")}`);
      shift += 1;
      block += 1;
    }
    chapters[n] = block;
  }
  const refs = {};
  for (const [k, v] of Object.entries(rawRefs)) refs[k] = v + shift;
  return { chapters, refs, spacers };
}

function foliosEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function readFoliosFile() {
  return JSON.parse(fs.readFileSync(FOLIOS_FILE, "utf8"));
}

function writeFoliosFile(folios) {
  fs.writeFileSync(FOLIOS_FILE, JSON.stringify(folios, null, 2) + "\n");
}

/* === Standalone full-bleed pages =========================== */

// Print each full-bleed page (cover, frontispiece, chapter openers,
// closing) as its own single-page margin-0 document and merge it over
// the flow document's placeholder page. Chrome fragments mid-document
// full-page boxes against the root master; single-page prints don't.
async function printFullBleedPages(map) {
  const keys = {};
  if (map.singles.frontis) keys.frontispiece = map.singles.frontis;
  if (map.singles.closing) keys.closing = map.singles.closing;
  for (const [n, pg] of Object.entries(map.chapters)) {
    keys[`ch${String(n).padStart(2, "0")}`] = pg;
  }

  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "tfor-fullbleed-"));
  const replace = {};
  let serverProc;
  try {
    serverProc = await startServer();
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    for (const [key, pdfPage] of Object.entries(keys)) {
      const out = path.join(outDir, `${key}.pdf`);
      await page.goto(`http://localhost:3939/print-opener/${key}`, {
        waitUntil: "networkidle0",
        timeout: 120000,
      });
      await page.evaluate(async () => {
        await Promise.all(
          Array.from(document.images).map((img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((r) => {
                  img.addEventListener("load", r, { once: true });
                  img.addEventListener("error", r, { once: true });
                })
          )
        );
      });
      await page.pdf({
        path: out,
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        timeout: 120000,
      });
      replace[pdfPage] = out;
      log(`  full-bleed ${key} -> page ${pdfPage}`);
    }
    await browser.close();
  } finally {
    if (serverProc) serverProc.kill("SIGTERM");
  }

  // The cover is printed standalone too, and prepended so the proof PDF
  // reads cover-first while the block's page parity stays intact.
  const coverOut = path.join(outDir, "cover.pdf");
  {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    let serverProc2;
    try {
      serverProc2 = await startServer();
      const page = await browser.newPage();
      await page.emulateMediaType("print");
      await page.goto(`http://localhost:3939/print-opener/cover`, {
        waitUntil: "networkidle0",
        timeout: 120000,
      });
      await page.pdf({
        path: coverOut,
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        timeout: 120000,
      });
      log("  full-bleed cover -> prepended");
    } finally {
      await browser.close();
      if (serverProc2) serverProc2.kill("SIGTERM");
    }
  }

  const specFile = path.join(outDir, "merge.json");
  fs.writeFileSync(
    specFile,
    JSON.stringify({ base: PDF_OUT, out: PDF_OUT, replace, prepend: [coverOut] })
  );
  execSync(`python3 "${path.join(ROOT, "scripts/merge-fullbleed.py")}" "${specFile}"`, {
    stdio: "pipe",
  });
  log("  full-bleed pages merged into flow document");
}

// Flat case artwork for the binder, printed from /print-case.
async function printCaseArtwork() {
  const CASE_OUT = path.join(DESKTOP, "firstownersreference-1st-edition-case.pdf");
  let serverProc;
  try {
    serverProc = await startServer();
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    await page.goto("http://localhost:3939/print-case", {
      waitUntil: "networkidle0",
      timeout: 120000,
    });
    await page.pdf({
      path: CASE_OUT,
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      timeout: 120000,
    });
    await browser.close();
    log(`  Case artwork saved: ${CASE_OUT}`);
  } catch (err) {
    log(`  Case artwork failed: ${err.message}`);
  } finally {
    if (serverProc) serverProc.kill("SIGTERM");
  }
}

/* === Press post-processing ================================= */

function convertCmyk(src) {
  const CMYK_OUT = src.replace(/\.pdf$/, "-CMYK.pdf");
  try {
    log(`  Converting ${path.basename(src)} to CMYK via Ghostscript...`);
    execSync(
      `gs -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress ` +
        `-dProcessColorModel=/DeviceCMYK -sColorConversionStrategy=CMYK ` +
        `-dEmbedAllFonts=true -dSubsetFonts=true -dCompatibilityLevel=1.5 ` +
        `-dNOPAUSE -dQUIET -dBATCH ` +
        `-sOutputFile="${CMYK_OUT}" "${src}"`,
      { stdio: "ignore" }
    );
    log(`  CMYK saved: ${CMYK_OUT}`);
  } catch (err) {
    log(`  CMYK conversion skipped: ${err.message ?? "ghostscript not available"}`);
    return null;
  }
  return CMYK_OUT;
}

// The press block: cover dropped, tail padded to a signature multiple
// with paper blanks, boxes stamped. This is the file the printer gets.
function makePressBlock() {
  const PRESS_OUT = PDF_OUT.replace(/\.pdf$/, "-press-block.pdf");
  const folios = readFoliosFile();
  const spacerChapters = (folios.spacers ?? [])
    .map((s) => parseInt(s.replace("ch", ""), 10))
    .sort((a, b) => a - b);
  if (spacerChapters.length === 0) {
    log("! No spacer page available as blank template; press block skipped");
    return null;
  }
  // Spacer sits on the block page before its chapter opener; +1 converts
  // block page to proof page (the proof has the cover prepended).
  const blankProofPage = folios.chapters[spacerChapters[0]] - 1 + 1;
  try {
    const out = execSync(
      `python3 "${path.join(ROOT, "scripts/make-press-block.py")}" ` +
        `"${PDF_OUT}" "${PRESS_OUT}" ${blankProofPage}`,
      { encoding: "utf8" }
    );
    log(`  Press block: ${out.trim()} -> ${path.basename(PRESS_OUT)}`);
  } catch (err) {
    log(`  Press block failed: ${err.message}`);
    return null;
  }
  return PRESS_OUT;
}

// Stamp TrimBox/BleedBox (3mm bleed) so the press knows where to cut.
function stampBoxes(pdfPath) {
  try {
    execSync(`python3 "${path.join(ROOT, "scripts/set-press-boxes.py")}" "${pdfPath}"`, {
      stdio: "pipe",
    });
    log(`  TrimBox/BleedBox stamped: ${path.basename(pdfPath)}`);
  } catch (err) {
    log(`  Box stamping failed for ${pdfPath}: ${err.message}`);
  }
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

## Press readiness (built into this pipeline)
- Sheet printed at 236 x 306 mm: 3 mm bleed on all edges; TrimBox/BleedBox stamped
- Chapter-aware verso running heads, native folios, computed contents folios
- Verso/recto parity enforced (chapter openers on versos via spacer pages)
- Press block file: cover dropped, padded to a multiple of 8 pages, CMYK master
- Flat case artwork for the binder (foil + blind deboss annotated)

## What still needs a human
- Printer's ICC profile confirmation (current CMYK is generic prepress; re-run with the printer's profile if supplied)
- Image masters at 300 dpi at print size (currently 2700px long edge)
- En-dashes for ranges (currently "20 to 24m"); a typographic pass before press
- Spine width, board colour, foil colour, endpapers: confirm with binder

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
  let manifest;
  if (!assignments) {
    log("! No assignments file; keeping existing images and lib/print-images.ts as-is");
    manifest = {
      cover: { filename: "cover.jpg", source: null },
      frontispiece: { filename: "frontispiece.jpg", source: null },
      closing: { filename: "closing.jpg", source: null },
      chapters: Object.fromEntries(
        CHAPTER_ORDER.map((slug, i) => [
          slug,
          { filename: `ch${String(i + 1).padStart(2, "0")}.jpg`, source: null },
        ])
      ),
      supporting: Object.fromEntries(CHAPTER_ORDER.map((slug) => [slug, []])),
    };
  } else {
    manifest = processImages(assignments);
    updatePrintImagesManifest(manifest);
  }

  // Two-pass (or more) print: the first print discovers where chapters
  // land, which feeds real contents folios and verso/recto parity spacers
  // back into lib/print-folios.json; subsequent passes verify stability.
  let pageCount = -1;
  for (let pass = 1; pass <= 4; pass++) {
    if (pass === 1 && process.env.SKIP_BUILD) {
      log("Skipping production build (SKIP_BUILD set)");
    } else {
      log(`Building Next production bundle (pass ${pass})...`);
      execSync("pnpm build", { cwd: ROOT, stdio: "pipe" });
    }

    let serverProc;
    try {
      serverProc = await startServer();
      await generatePdf();
    } finally {
      if (serverProc) serverProc.kill("SIGTERM");
    }

    const map = parsePageMap(PDF_OUT);
    pageCount = map.total;
    const current = readFoliosFile();
    const desired = computeFolios(map, current.spacers ?? []);
    if (foliosEqual(current, desired)) {
      log(`  Page map stable at pass ${pass}: ${map.total} pages`);
      break;
    }
    if (pass === 4) {
      log("! Page map did not stabilise after 4 passes; keeping last print");
      break;
    }
    log(
      `  Pass ${pass}: updating folios; spacers [${desired.spacers.join(", ")}], ` +
        `${map.total} pages`
    );
    writeFoliosFile(desired);
  }

  await printFullBleedPages(parsePageMap(PDF_OUT));
  stampBoxes(PDF_OUT);
  convertCmyk(PDF_OUT);
  const pressBlock = makePressBlock();
  if (pressBlock) convertCmyk(pressBlock);
  await printCaseArtwork();
  writeArtifacts(manifest, assignments, pageCount);

  log("=== Done ===");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
