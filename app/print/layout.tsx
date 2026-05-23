import type { Metadata } from "next";
import "./print.css";

export const metadata: Metadata = {
  title: "1st Edition (proof)",
  description: "Print proof, internal use only.",
  robots: { index: false, follow: false, nocache: true },
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="print-edition">{children}</div>
  );
}
