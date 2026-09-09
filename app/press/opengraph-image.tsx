import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Press, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Press, 1st Edition 2026",
    eyebrowRight: "Masthead and assets",
    title: "For editors and journalists",
    standfirst: "Masthead, publication details, brand assets and contact.",
  });
}
