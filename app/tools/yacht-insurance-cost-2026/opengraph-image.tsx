import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Yacht insurance cost 2026, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Tools, 1st Edition 2026",
    eyebrowRight: "Updated September 2026",
    title: "Yacht insurance in 2026",
    standfirst: "Hull and machinery rates, P&amp;I limits, war risk by region, and the terms that are negotiable at quote stage.",
  });
}
