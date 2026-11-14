/*
  print-lab.mjs: prints the layout-spike variants of /print-lab/NN to PDF.
  Step 1 of docs/print/layout-implementation-plan.md. Not part of the book.

  Usage: node scripts/print-lab.mjs <origin> <NN> <outdir> [query ...]
    e.g. node scripts/print-lab.mjs http://localhost:3942 01 /tmp/lab \
           grid=wide&head=a grid=side&head=b
  Needs a running dev server (the lab route is dev only).
*/

import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer";

const [origin, nn, outdir, ...queries] = process.argv.slice(2);
if (!origin || !nn || !outdir || queries.length === 0) {
  console.error("Usage: node scripts/print-lab.mjs <origin> <NN> <outdir> <query> ...");
  process.exit(1);
}
fs.mkdirSync(outdir, { recursive: true });

// Same Chrome as the press build, so the variants set as the book sets.
const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  protocolTimeout: 600000,
});
try {
  for (const q of queries) {
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    const started = Date.now();
    await page.goto(`${origin}/print-lab/${nn}?${q}`, {
      waitUntil: "networkidle0",
      timeout: 180000,
    });
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.decode ? img.decode().catch(() => {}) : null,
        ),
      );
    });
    const file = path.join(outdir, `lab-${nn}-${q.replace(/[^a-z0-9]+/gi, "-")}.pdf`);
    fs.writeFileSync(
      file,
      await page.pdf({
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: false,
        timeout: 300000,
      }),
    );
    console.log(`${q}  ${((Date.now() - started) / 1000).toFixed(1)}s  ${file}`);
    await page.close();
  }
} finally {
  await browser.close();
}
