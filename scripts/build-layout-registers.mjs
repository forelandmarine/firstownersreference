#!/usr/bin/env node
/*
  Renders docs/print/layout-registers.html to docs/print/layout-registers.pdf.

  The register sheet is the art-direction specimen for the print edition: one
  diagram per page architecture, at 230 x 300 proportion, with the rule that
  governs each. It is a standalone document with no dependency on the Next.js
  build, so it renders straight from the file with the system Chrome.

    node scripts/build-layout-registers.mjs
*/

import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const SRC = path.join(ROOT, "docs/print/layout-registers.html");
const OUT = path.join(ROOT, "docs/print/layout-registers.pdf");

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!fs.existsSync(CHROME)) {
  throw new Error(
    `No Chrome at ${CHROME}. Set CHROME_PATH, or run npx puppeteer browsers install chrome.`,
  );
}

const browser = await puppeteer.launch({
  headless: "new",
  executablePath: CHROME,
});
const page = await browser.newPage();
await page.goto("file://" + SRC, { waitUntil: "networkidle0" });
await page.pdf({
  path: OUT,
  width: "297mm",
  height: "210mm",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
await browser.close();

console.log("wrote", path.relative(ROOT, OUT));
