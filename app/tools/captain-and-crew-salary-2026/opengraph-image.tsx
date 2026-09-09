import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Crew salaries 2026, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Tools, 1st Edition 2026",
    eyebrowRight: "By position and size",
    title: "Captain and crew salaries, 2026",
    standfirst: "Benchmarks from captain to deckhand, with the recruitment-side source named on every band.",
  });
}
