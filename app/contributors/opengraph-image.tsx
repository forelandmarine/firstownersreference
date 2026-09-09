import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contributors, The First Owner's Reference";

export default async function Image() {
  return renderOgCard({
    eyebrow: "Contributors, 1st Edition 2026",
    eyebrowRight: "Named, on the record",
    title: "The people who answered",
    standfirst: "Captains, recruiters, insurance brokers, an owner's representative and a corporate services provider, each named and each declaring their interest.",
  });
}
