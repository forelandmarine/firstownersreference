/* Layout spike. Shares the press stylesheet, so the variants are set by the same rules. */
import type { Metadata } from "next";
import "../print/print.css";

export const metadata: Metadata = {
  title: "Layout lab",
  robots: { index: false, follow: false, nocache: true },
};

export default function PrintLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="print-edition">{children}</div>;
}
