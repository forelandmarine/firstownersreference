/*
  Standalone single-page renders of the publication's full-bleed pages
  (cover, frontispiece, chapter openers, closing image). Chrome prints a
  single-page margin-0 document flawlessly, so the press build prints
  each of these on its own and merges them over the flow document's
  placeholder pages. Internal use only.
*/
import { notFound } from "next/navigation";
import { sections } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import {
  CoverPage,
  FrontispiecePage,
  ClosingImagePage,
  ChapterOpener,
  PlatePage,
} from "@/components/print/full-bleed-pages";

export const dynamic = "force-static";

const CHAPTER_KEYS = sections.map(
  (s) => `ch${String(s.number).padStart(2, "0")}`
);

/* Plate keys are plate-<slug>-<index>; two per chapter. */
const PLATE_KEYS = sections.flatMap((s) => [
  `plate-${s.slug}-0`,
  `plate-${s.slug}-1`,
]);

export function generateStaticParams() {
  return [
    "cover",
    "frontispiece",
    "closing",
    ...CHAPTER_KEYS,
    ...PLATE_KEYS,
  ].map((key) => ({ key }));
}

export default async function StandaloneFullBleedPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;

  let body: React.ReactNode;
  if (key === "cover") body = <CoverPage />;
  else if (key === "frontispiece") body = <FrontispiecePage />;
  else if (key === "closing") body = <ClosingImagePage />;
  else if (CHAPTER_KEYS.includes(key)) {
    const section = sections.find(
      (s) => `ch${String(s.number).padStart(2, "0")}` === key
    )!;
    const essay = getLeadEssay(section.slug);
    body = <ChapterOpener section={section} readingTime={essay?.readingTime} />;
  } else if (key.startsWith("plate-")) {
    const rest = key.slice("plate-".length);
    const idx = Number(rest.slice(-1));
    const slug = rest.slice(0, -2);
    body = <PlatePage slug={slug} index={idx} />;
  } else notFound();

  return <div className="print-standalone">{body}</div>;
}
