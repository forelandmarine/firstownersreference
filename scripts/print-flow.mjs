/*
  print-flow.mjs — single-pass Chrome print of /print for verification diffs.

  Prints the flow document only (no full-bleed merge, no press boxes, no
  folio recompute). Mirrors the Puppeteer settings in build-print.mjs so the
  text layer is comparable with the real press build.

  Usage: node scripts/print-flow.mjs <output.pdf>   (requires a completed
  `pnpm build`; starts its own `next start` on port 3941)
*/

import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3941;
const out = process.argv[2];
if (!out) {
  console.error("Usage: node scripts/print-flow.mjs <output.pdf>");
  process.exit(1);
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function startServer() {
  const proc = spawn("pnpm", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });
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
  return proc;
}

const server = await startServer();
try {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 600000,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(180000);
  page.setDefaultNavigationTimeout(180000);
  await page.setViewport({ width: 893, height: 1157, deviceScaleFactor: 1 });
  await page.emulateMediaType("print");
  page.on("pageerror", (err) => console.log(`  [browser error] ${err.message}`));

  await page.goto(`http://localhost:${PORT}/print`, {
    waitUntil: "networkidle0",
    timeout: 180000,
  });
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
  await wait(2000);

  await page.pdf({
    path: out,
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    timeout: 300000,
  });
  console.log(`PDF saved: ${out} (${(fs.statSync(out).size / 1024 / 1024).toFixed(1)} MB)`);
  await browser.close();
} finally {
  server.kill();
}
