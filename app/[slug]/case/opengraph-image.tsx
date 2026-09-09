import { getSection } from "@/lib/sections";
import { getCase } from "@/lib/cases";
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case material, The First Owner's Reference";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const section = getSection(slug);
  const caseStudy = getCase(slug);

  return renderOgCard({
    eyebrow: section
      ? `Chapter ${section.number}, case material`
      : "Case material",
    eyebrowRight: section?.coordinates,
    title: caseStudy?.title ?? "Case material",
    standfirst: caseStudy?.standfirst,
  });
}
