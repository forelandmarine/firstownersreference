import type { Metadata } from "next";
import "../print/print.css";
import "./standalone.css";

export const metadata: Metadata = {
  title: "Full-bleed page (press)",
  description: "Standalone full-bleed page print, internal use only.",
  robots: { index: false, follow: false, nocache: true },
};

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="print-edition">{children}</div>;
}
