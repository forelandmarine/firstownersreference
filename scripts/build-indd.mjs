#!/usr/bin/env node
/*
  Drive InDesign via ExtendScript to build the magazine natively.

  1. Loads content from lib/*.ts (esbuild bundle).
  2. Serialises content into a self-contained .jsx that builds the
     document with InDesign's actual layout engine — drop caps,
     justification, frame threading, master pages, swatches and
     paragraph styles all work natively.
  3. Invokes Adobe InDesign 2026 via osascript and runs the .jsx.
  4. Output: ~/Desktop/firstownersreference.indd (native) + .idml.

  Re-run after edits to lib/*.ts to regenerate.
*/

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const REPO_ROOT = "/Users/jack/firstownersreference";
const IMG_DIR = path.join(REPO_ROOT, "public/print-images/print");
const OUT_INDD = path.join(os.homedir(), "Desktop", "firstownersreference.indd");
const OUT_IDML = path.join(os.homedir(), "Desktop", "firstownersreference.idml");
const JSX_PATH = path.join(os.tmpdir(), "build-foref.jsx");

const log = (m) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`);

async function loadContent() {
  const tmpDir = path.join(REPO_ROOT, ".tmp-indd-build");
  fs.mkdirSync(tmpDir, { recursive: true });
  const loaderPath = path.join(tmpDir, "loader.ts");
  fs.writeFileSync(loaderPath,
    `export { sections } from "${REPO_ROOT}/lib/sections";
export { leadEssays } from "${REPO_ROOT}/lib/lead-essays";
export { glossaryEntries } from "${REPO_ROOT}/lib/glossary";
export { printImages } from "${REPO_ROOT}/lib/print-images";
`);
  execSync(
    `npx --yes esbuild --bundle --platform=node --format=esm --outfile=${tmpDir}/content.mjs ${loaderPath}`,
    { stdio: "pipe" },
  );
  const mod = await import(pathToFileURL(`${tmpDir}/content.mjs`).href);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  return mod;
}

function jsonForJsx(obj) {
  // ExtendScript chokes on some unicode escapes if not careful. Standard
  // JSON.stringify produces ES5-compatible JSON that ExtendScript reads.
  return JSON.stringify(obj);
}

async function main() {
  log("Loading content from lib/...");
  const { sections, leadEssays, glossaryEntries, printImages } = await loadContent();

  // Slim the content payload: just what the .jsx needs
  const payload = {
    imgDir: IMG_DIR,
    outIndd: OUT_INDD,
    outIdml: OUT_IDML,
    sections: sections.map((s) => ({
      number: s.number,
      slug: s.slug,
      title: s.title,
      standfirst: s.standfirst,
      coordinates: s.coordinates,
      contributor: s.contributor,
      contributorRole: s.contributorRole,
    })),
    essays: Object.fromEntries(Object.entries(leadEssays).map(([slug, e]) => [slug, {
      title: e.title,
      standfirst: e.standfirst,
      readingTime: e.readingTime,
      paragraphs: (e.paragraphs || []).map((p) => {
        if (typeof p === "string") return { kind: "p", text: p };
        if (p.type === "h2") return { kind: "h2", text: p.text };
        if (p.type === "blockquote") return { kind: "quote", text: p.text, attribution: p.attribution || "" };
        if (p.type === "editorsNote") return { kind: "note", text: p.text };
        if (p.type === "figure") return { kind: "caption", text: p.caption || p.alt || "" };
        return { kind: "p", text: "" };
      }),
    }])),
    glossary: glossaryEntries.slice().sort((a, b) => a.term.localeCompare(b.term)).map((g) => ({
      term: g.term,
      definition: g.shortDefinition,
    })),
    images: {
      cover: path.join(IMG_DIR, printImages.cover.filename),
      frontispiece: path.join(IMG_DIR, printImages.frontispiece.filename),
      closing: path.join(IMG_DIR, printImages.closing.filename),
      chapters: Object.fromEntries(Object.entries(printImages.chapters).map(
        ([slug, info]) => [slug, path.join(IMG_DIR, info.filename)],
      )),
      supporting: Object.fromEntries(Object.entries(printImages.supporting || {}).map(
        ([slug, list]) => [slug, list.map((info) => path.join(IMG_DIR, info.filename))],
      )),
    },
  };

  const jsxBody = fs.readFileSync(path.join(REPO_ROOT, "scripts/build-indd.jsx"), "utf8");
  const jsx = `var PAYLOAD = ${jsonForJsx(payload)};\n` + jsxBody;
  fs.writeFileSync(JSX_PATH, jsx);
  log(`Wrote ${JSX_PATH} (${(fs.statSync(JSX_PATH).size / 1024).toFixed(1)} KB)`);

  log("Invoking InDesign...");
  execSync(
    `osascript -e 'tell application "Adobe InDesign 2026" to do script (POSIX file "${JSX_PATH}") language javascript'`,
    { stdio: "inherit" },
  );

  log(`Done. Output:\n  ${OUT_INDD}\n  ${OUT_IDML}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
