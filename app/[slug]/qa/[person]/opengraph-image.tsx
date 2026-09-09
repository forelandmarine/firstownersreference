import { getSection } from "@/lib/sections";
import { getGuestOpinionByPerson } from "@/lib/guest-opinions";
import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "In conversation, The First Owner's Reference";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; person: string }>;
}) {
  const { slug, person } = await params;
  const section = getSection(slug);
  const opinion = getGuestOpinionByPerson(slug, person);

  return renderOgCard({
    eyebrow: section
      ? `Chapter ${section.number}, in conversation`
      : "In conversation",
    eyebrowRight: opinion?.contributorRole?.split("\n")[0],
    title: opinion?.contributor ?? "In conversation",
    standfirst: opinion?.seoDescription,
  });
}
