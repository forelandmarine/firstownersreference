import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Request a print copy, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "1st Edition 2026",
    eyebrowRight: "500 hand-numbered",
    title: "Request a print copy",
    standfirst: "The 1st Edition is a hand-numbered run of 500, sent without charge to owners, advisers and the industry.",
  });
}
