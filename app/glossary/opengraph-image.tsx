import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Yacht glossary, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Glossary, 1st Edition 2026",
    eyebrowRight: "50 terms",
    title: "The terms, defined plainly",
    standfirst: "Brokerage, retrocession, temporary admission, ISM, MLC, flag state and forty-four more. Sourced and free to cite.",
  });
}
