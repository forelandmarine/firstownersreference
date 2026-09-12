/* Shares the press stylesheet, so the preview is set by the same rules. */
import type { Metadata } from "next";
import "../print/print.css";

export const metadata: Metadata = {
  title: "Chapter preview",
  robots: { index: false, follow: false, nocache: true },
};

export default function PrintChapterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="print-edition">{children}</div>;
}
