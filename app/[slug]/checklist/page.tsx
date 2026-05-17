import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sections, getSection } from "@/lib/sections";
import { getChecklist } from "@/lib/checklists";
import { PrintButton } from "@/components/print-button";
import { SITE_URL } from "@/lib/jsonld";

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const section = getSection(slug);
  const checklist = getChecklist(slug);
  if (!section || !checklist) return {};
  const url = `${SITE_URL}/${section.slug}/checklist`;
  return {
    title: `${checklist.title} | Chapter ${section.number}`,
    description: checklist.standfirst,
    alternates: { canonical: url },
    openGraph: {
      title: `${checklist.title} | One-page printable checklist`,
      description: checklist.standfirst,
      url,
      type: "article",
    },
  };
}

export default async function ChecklistPrintPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const section = getSection(slug);
  const checklist = section ? getChecklist(slug) : undefined;
  if (!section || !checklist) notFound();

  let counter = 0;

  return (
    <div className="checklist-print">
      <div className="screen-only">
        <div className="screen-toolbar">
          <Link href={`/${section.slug}`} className="meta link">
            &larr; Back to chapter {section.number}
          </Link>
          <PrintButton className="meta link-marine">
            Print this checklist
          </PrintButton>
        </div>
      </div>

      <article className="checklist-sheet">
        <header className="sheet-header">
          <p className="sheet-meta">
            The First Owner&rsquo;s Reference &middot; Chapter {section.number}{" "}
            &middot; Checklist
          </p>
          <h1 className="sheet-title">{checklist.title}</h1>
          <p className="sheet-intent">{checklist.intent}</p>
        </header>

        <div className="sheet-groups">
          {checklist.groups.map((group, gi) => (
            <section key={gi} className="sheet-group">
              <h2 className="sheet-group-heading">
                <span className="sheet-group-num">
                  Part {String(gi + 1).padStart(2, "0")}
                </span>
                {group.heading}
              </h2>
              <ol className="sheet-items">
                {group.items.map((item, ii) => {
                  counter += 1;
                  return (
                    <li key={ii} className="sheet-item">
                      <span className="sheet-item-num">
                        {String(counter).padStart(2, "0")}
                      </span>
                      <div className="sheet-item-body">
                        <p className="sheet-question">{item.question}</p>
                        {item.detail && (
                          <p className="sheet-detail">{item.detail}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>

        <footer className="sheet-footer">
          <p>
            firstownersreference.com &middot; 1st Edition, 2026 &middot;{" "}
            {section.title}
          </p>
        </footer>
      </article>
    </div>
  );
}
