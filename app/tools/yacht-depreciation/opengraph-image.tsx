import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Yacht depreciation, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Tools, 1st Edition 2026",
    eyebrowRight: "Broker-aggregated",
    title: "Yacht depreciation",
    standfirst: "10 to 20 percent in year one, then 6 to 8 percent compounding. What a hull is worth at five years, and which builders beat the curve.",
  });
}
