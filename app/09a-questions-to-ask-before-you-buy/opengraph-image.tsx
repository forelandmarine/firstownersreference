import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Ten questions, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "1st Edition 2026",
    eyebrowRight: "One printable page",
    title: "Ten questions to ask before you buy",
    standfirst: "Put to every adviser on the acquisition, including the publisher of this reference.",
  });
}
