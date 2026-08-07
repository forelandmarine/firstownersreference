import type { Metadata } from "next";
import "./case.css";

export const metadata: Metadata = {
  title: "Case artwork (press)",
  description: "Casebound cover artwork for the binder, internal use only.",
  robots: { index: false, follow: false, nocache: true },
};

export default function CaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
