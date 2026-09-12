/*
  One chapter, set exactly as the press build sets it.

  The studio print pane needs a paginated preview, and an iframe of /print
  cannot give one: paged media only applies when printing, so in a browser
  window /print is a continuous scroll with no pages in it. The pane
  therefore prints a real PDF through Chrome and displays that, which is the
  only preview that cannot drift from the output.

  Printing all 199 pages for every edit is too slow to work against, so this
  route renders a single chapter. It imports ChapterBlock from the press
  route rather than copying it, so there is one implementation and the
  preview cannot diverge from the book.

  Dev only: returns 404 in a production build, like the rest of the studio.
*/

import { notFound } from "next/navigation";
import { sections } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { getCase } from "@/lib/cases";
import { getDataSpread } from "@/lib/data-spreads";
import { getGuestOpinions } from "@/lib/guest-opinions";
import { ChapterBlock, chapterMastersCss } from "../../print/page";

export const dynamic = "force-dynamic";

export default async function PrintChapterPreview({
  params,
}: {
  params: Promise<{ nn: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { nn } = await params;
  const index = sections.findIndex(
    (s) => String(s.number).padStart(2, "0") === nn,
  );
  if (index === -1) notFound();

  const section = sections[index];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: chapterMastersCss() }} />
      <ChapterBlock
        section={section}
        essay={getLeadEssay(section.slug)}
        caseStudy={getCase(section.slug)}
        dataSpread={getDataSpread(section.slug)}
        guestOpinions={getGuestOpinions(section.slug)}
        nextSection={sections[index + 1] ?? null}
      />
    </>
  );
}
