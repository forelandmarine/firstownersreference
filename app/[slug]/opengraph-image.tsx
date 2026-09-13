import { getSection } from "@/lib/sections";
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "The First Owner's Reference";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSection(slug);

  return renderOgCard({
    eyebrow: section
      ? `Chapter ${section.number}, 1st Edition 2027`
      : "1st Edition 2027",
    eyebrowRight: section?.coordinates,
    title: section?.title ?? "The First Owner's Reference",
    standfirst: section?.standfirst,
  });
}
