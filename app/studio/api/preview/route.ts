/*
  Dev-only chapter preview. Prints /print-chapter/NN through Chrome at the
  press sheet size and returns the PDF.

  This is the only honest way to preview a paginated document in a browser.
  An iframe of the print route shows a continuous scroll, because paged
  media applies at print time and not before; and re-paginating in
  JavaScript was tried in this project with paged.js and removed, because
  its fragmentation differs from Chrome's and stranded pull quotes and
  half-filled pages. Printing the real thing costs a couple of seconds a
  chapter and cannot drift from the press output.

  The press build owns folios, closer heights and merged plates. Those come
  from the last full build, so a preview taken after a content edit shows
  the new copy with the previous pass's measurements. The pane says so.

  GET /studio/api/preview?chapter=03
*/

import puppeteer from "puppeteer";
import fs from "node:fs";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const DEV = process.env.NODE_ENV === "development";

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function GET(request: Request) {
  if (!DEV) return new Response("Not found", { status: 404 });

  const chapter = new URL(request.url).searchParams.get("chapter") ?? "";
  if (!/^\d{2}$/.test(chapter)) {
    return Response.json({ error: "chapter must be two digits" }, { status: 400 });
  }
  if (!fs.existsSync(CHROME)) {
    return Response.json(
      { error: `no Chrome at ${CHROME}; set CHROME_PATH` },
      { status: 500 },
    );
  }

  const origin = new URL(request.url).origin;
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 120000,
  });

  try {
    const page = await browser.newPage();
    await page.emulateMediaType("print");
    await page.goto(`${origin}/print-chapter/${chapter}`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    // Decode every picture before printing, or a half-loaded image prints blank.
    await page.evaluate(async () => {
      await Promise.all(
        Array.from(document.images).map((img) =>
          img.decode ? img.decode().catch(() => {}) : null,
        ),
      );
    });
    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      timeout: 120000,
    });
    return new Response(new Uint8Array(pdf), {
      headers: {
        "content-type": "application/pdf",
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  } finally {
    await browser.close();
  }
}
