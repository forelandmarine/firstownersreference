import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Yacht VAT 2026, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Tools, 1st Edition 2026",
    eyebrowRight: "Updated July 2026",
    title: "Yacht VAT in 2026",
    standfirst: "What the EC Guidance Note of 30 April and Italian ADM Circular 11/2026 changed, Temporary Admission, and the UK position.",
  });
}
