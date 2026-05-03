import Link from "next/link";
import type { Section } from "@/lib/sections";

export type SubsectionKind = "lead-essay" | "data-spread" | "guest-opinion" | "case" | "checklist";

const ORDER: { kind: SubsectionKind; label: string; path: string }[] = [
  { kind: "lead-essay", label: "Lead essay", path: "" },
  { kind: "data-spread", label: "Data spread", path: "/data-spread" },
  { kind: "guest-opinion", label: "Guest opinion", path: "/guest-opinion" },
  { kind: "case", label: "Case material", path: "/case" },
  { kind: "checklist", label: "Checklist", path: "/checklist" },
];

const AVAILABLE: SubsectionKind[] = ["lead-essay", "data-spread", "case", "checklist"];

export function SubsectionShell({
  section,
  kind,
  title,
  standfirst,
  children,
}: {
  section: Section;
  kind: SubsectionKind;
  title: string;
  standfirst: string;
  children: React.ReactNode;
}) {
  const currentIndex = ORDER.findIndex((s) => s.kind === kind);
  const previousAvailable = ORDER.slice(0, currentIndex)
    .reverse()
    .find((s) => AVAILABLE.includes(s.kind));
  const nextAvailable = ORDER.slice(currentIndex + 1).find((s) =>
    AVAILABLE.includes(s.kind)
  );

  const sectionPath = `/${section.slug}`;

  return (
    <article>
      <header className="bg-paper border-b border-rule">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-10">
            <Link href={sectionPath} className="meta hover:text-marine transition-colors">
              &larr; Section {section.number} &middot; {section.title}
            </Link>
            <span className="meta-marine">
              {ORDER.find((s) => s.kind === kind)?.label}
            </span>
          </div>
          <h1 className="font-serif font-light text-headline lg:text-[2.75rem] leading-[1.1] tracking-tight text-charcoal max-w-3xl mb-8">
            {title}
          </h1>
          <p className="font-serif text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl">
            {standfirst}
          </p>
        </div>
      </header>

      <div className="bg-paper">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          {children}
        </div>
      </div>

      <nav className="border-t border-rule bg-paper-deep py-12">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 flex justify-between items-center gap-6">
          {previousAvailable ? (
            <Link
              href={`${sectionPath}${previousAvailable.path}`}
              className="group flex flex-col"
            >
              <span className="meta mb-1">
                &larr; Previous in section
              </span>
              <span className="font-serif text-lg group-hover:text-marine transition-colors">
                {previousAvailable.label}
              </span>
            </Link>
          ) : (
            <Link href={sectionPath} className="group flex flex-col">
              <span className="meta mb-1">&larr; Section landing</span>
              <span className="font-serif text-lg group-hover:text-marine transition-colors">
                {section.title}
              </span>
            </Link>
          )}
          {nextAvailable ? (
            <Link
              href={`${sectionPath}${nextAvailable.path}`}
              className="group flex flex-col text-right"
            >
              <span className="meta mb-1">Next in section &rarr;</span>
              <span className="font-serif text-lg group-hover:text-marine transition-colors">
                {nextAvailable.label}
              </span>
            </Link>
          ) : (
            <Link href={sectionPath} className="group flex flex-col text-right">
              <span className="meta mb-1">Back to section &rarr;</span>
              <span className="font-serif text-lg group-hover:text-marine transition-colors">
                {section.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
