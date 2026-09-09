import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Running cost calculator, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Tools, 1st Edition 2026",
    eyebrowRight: "Nine cost categories",
    title: "What does it cost to run a superyacht?",
    standfirst: "Model annual operating cost against your own size, type, region and use intensity, with the source named on every line.",
  });
}
