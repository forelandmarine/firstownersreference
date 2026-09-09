import { getSection } from "@/lib/sections";
import { getChecklist } from "@/lib/checklists";
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Checklist, The First Owner's Reference";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSection(slug);
  const checklist = getChecklist(slug);

  return renderOgCard({
    eyebrow: section ? `Chapter ${section.number}, checklist` : "Checklist",
    eyebrowRight: "One printable page",
    title: checklist?.title ?? "Checklist",
    standfirst: checklist?.standfirst,
  });
}
