import { sections } from "@/lib/sections";
import { printImages, type PrintImage } from "@/lib/print-images";

/* One photograph, once (docs/print/layout-specification.md section 5).
   The September proof placed 99 files 195 times: closers, bands and case
   pictures all drew from the same small pool by index. Every picture in the
   chapters now comes through one picker per render, which hands out each
   file once and returns null when a chapter's pool is spent, so a missing
   picture leaves text rather than a repeat. Openers, the two plates per
   chapter and the cover set are claimed before anything else. */
export type Picker = (slug: string) => PrintImage | null;

export function makePicker(): Picker {
  const used = new Set<string>();
  for (const s of sections) {
    const opener = printImages.chapters?.[s.slug];
    if (opener) used.add(opener.filename);
    (printImages.plates?.[s.slug] ?? [])
      .slice(0, PLATES_PER_CHAPTER)
      .forEach((p) => used.add(p.filename));
  }
  [printImages.cover, printImages.frontispiece, printImages.closing].forEach(
    (i) => i && used.add(i.filename),
  );
  return (slug) => {
    const pool = [
      ...(printImages.supporting?.[slug] ?? []),
      ...(printImages.tall?.[slug] ? [printImages.tall[slug]] : []),
      ...(printImages.cases?.[slug] ? [printImages.cases[slug]] : []),
      ...(printImages.plates?.[slug] ?? []).slice(PLATES_PER_CHAPTER),
    ];
    const img = pool.find((p) => !used.has(p.filename)) ?? null;
    if (img) used.add(img.filename);
    return img;
  };
}

/* Two full-page plates a chapter, down from four: one after the essay, one
   (with its pull quote) before the case. Four clumped into runs of two and
   three full pages. */
export const PLATES_PER_CHAPTER = 2;

