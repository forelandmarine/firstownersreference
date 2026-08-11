/*
  Dev-only content API for the studio editor. Reads and writes the JSON
  files in content/. Returns 404 outside `next dev` — the editor is
  local-first and never ships to production (docs/studio-editor-plan.md).
*/

import fs from "node:fs";
import path from "node:path";
import {
  READABLE_FAMILIES,
  WRITABLE_FAMILIES,
  validateFamily,
} from "@/lib/studio/validate";

export const dynamic = "force-dynamic";

const DEV = process.env.NODE_ENV === "development";

function familyPath(family: string): string {
  return path.join(process.cwd(), "content", `${family}.json`);
}

export async function GET(request: Request) {
  if (!DEV) return new Response("Not found", { status: 404 });
  const family = new URL(request.url).searchParams.get("family") ?? "";
  if (!(READABLE_FAMILIES as readonly string[]).includes(family)) {
    return Response.json({ error: `unknown family "${family}"` }, { status: 400 });
  }
  const data = JSON.parse(fs.readFileSync(familyPath(family), "utf8"));
  return Response.json({ family, data });
}

export async function POST(request: Request) {
  if (!DEV) return new Response("Not found", { status: 404 });
  let body: { family?: string; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid JSON body" }, { status: 400 });
  }
  const family = body.family ?? "";
  if (!(WRITABLE_FAMILIES as readonly string[]).includes(family)) {
    return Response.json(
      { error: `family "${family}" is not writable` },
      { status: 400 }
    );
  }
  const errors = validateFamily(family, body.data);
  if (errors.length > 0) {
    return Response.json({ error: "schema validation failed", errors }, { status: 422 });
  }
  /* Match the existing file format exactly: two-space indent, trailing
     newline, so git diffs stay minimal. */
  fs.writeFileSync(
    familyPath(family),
    JSON.stringify(body.data, null, 2) + "\n",
    "utf8"
  );
  return Response.json({ ok: true });
}
