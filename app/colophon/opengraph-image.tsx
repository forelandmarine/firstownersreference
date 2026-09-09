import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Colophon, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Colophon, 1st Edition 2026",
    eyebrowRight: "How it is made",
    title: "How this reference is made",
    standfirst: "Research, sourcing, funding and production, and the independence rules that govern all of it.",
  });
}
