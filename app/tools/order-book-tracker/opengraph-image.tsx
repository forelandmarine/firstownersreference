import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Order book tracker, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Tools, 1st Edition 2026",
    eyebrowRight: "Refreshed quarterly",
    title: "The order book, 2026",
    standfirst: "1,093 yachts above 24 metres by yard, country and hull type, with delivery years and a named source for every figure.",
  });
}
