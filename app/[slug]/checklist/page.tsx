import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sections, getSection } from "@/lib/sections";
import { getChecklist } from "@/lib/checklists";
import { PrintButton } from "@/components/print-button";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdString,
  SITE_URL,
} from "@/lib/jsonld";

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
    title: { absolute: checklist.seoTitle ?? checklist.title },
    description: checklist.seoDescription ?? checklist.standfirst,
    alternates: { canonical: url },
    openGraph: {
      title: `${checklist.title} | One-page printable checklist`,
      description: checklist.seoDescription ?? checklist.standfirst,
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

  const url = `${SITE_URL}/${section.slug}/checklist`;
  const allItems = checklist.groups.flatMap((g) => g.items);

  // These pages carried only the site-wide organisation graph: no article
  // schema, no breadcrumb, no dates, and one inbound and one outbound link
  // each. Nine near-identical 400-word dead ends is a pattern worth not
  // having.
  const schema = jsonLdString(
    articleSchema({
      url,
      headline: checklist.seoTitle ?? checklist.title,
      description: checklist.seoDescription ?? checklist.standfirst,
      datePublished: section.datePublished,
      dateModified: section.dateModified,
      author: "both",
      image: `${SITE_URL}/${section.slug}/opengraph-image`,
      articleSection: `Chapter ${section.number}`,
    }),
    {
      "@type": "ItemList",
      "@id": `${url}#checklist`,
      name: checklist.seoTitle ?? checklist.title,
      description: checklist.intent,
      numberOfItems: allItems.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: allItems.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.question,
        ...(item.detail ? { description: item.detail } : {}),
      })),
    },
    breadcrumbSchema([
      { name: "1st Edition", url: SITE_URL },
      {
        name: `Chapter ${section.number}, ${section.title}`,
        url: `${SITE_URL}/${section.slug}`,
      },
      { name: "Checklist", url },
    ])
  );

  const otherChecklists = sections
    .filter((s) => s.slug !== section.slug)
    .slice(0, 4);

  return (
    <div className="checklist-print">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <div className="screen-only">
        <div className="screen-toolbar">
          <Link href={`/${section.slug}`} className="meta link">
            Back to chapter {section.number}
          </Link>
          <PrintButton className="meta link-marine">
            Print this checklist
          </PrintButton>
        </div>
      </div>

      <article className="checklist-sheet">
        <header className="sheet-header">
          <p className="sheet-meta">
            The First Owner&rsquo;s Reference, chapter {section.number},
            checklist
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
            firstownersreference.com, 1st Edition 2026, {section.title}
          </p>
        </footer>
      </article>

      <div className="screen-only">
        <nav className="max-w-[46rem] mx-auto px-6 pb-24 pt-4">
          <p className="meta mb-4">Alongside this checklist</p>
          <ul className="space-y-2 caption">
            <li>
              <Link href={`/${section.slug}`} className="link">
                Chapter {section.number}, {section.title}
              </Link>
            </li>
            <li>
              <Link href={`/${section.slug}/case`} className="link">
                The case material for chapter {section.number}
              </Link>
            </li>
            <li>
              <Link href="/glossary" className="link">
                Glossary, 50 defined terms
              </Link>
            </li>
            <li>
              <Link href="/09a-questions-to-ask-before-you-buy" className="link">
                The ten questions to ask before you buy
              </Link>
            </li>
          </ul>

          <p className="meta mb-4 mt-10">Other checklists</p>
          <ul className="space-y-2 caption">
            {otherChecklists.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/checklist`} className="link">
                  Chapter {s.number}, {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
