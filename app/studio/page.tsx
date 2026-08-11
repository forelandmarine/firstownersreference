import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StudioClient from "./studio-client";

export const metadata: Metadata = {
  title: "Studio · The First Owner’s Reference",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  /* Local-first: the studio exists only under `next dev`. Production
     builds prerender this route as a 404. */
  if (process.env.NODE_ENV !== "development") notFound();
  return <StudioClient />;
}
