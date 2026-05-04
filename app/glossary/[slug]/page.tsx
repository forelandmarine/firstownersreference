import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import {
  glossaryEntries,
  getGlossaryEntry,
  type GlossaryEntry,
} from "@/lib/glossary";
import { sections } from "@/lib/sections";
import {
  breadcrumbSchema,
  definedTermSchema,
  SITE_URL,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return glossaryEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getGlossaryEntry(slug);
  if (!entry) return {};
  const url = `${SITE_URL}/glossary/${slug}`;
  return {
    title: `${entry.term} — Yacht industry definition`,
    description: entry.shortDefinition,
    alternates: { canonical: url },
    openGraph: {
      title: `${entry.term} | The First Owner's Reference`,
      description: entry.shortDefinition,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: entry.term,
      description: entry.shortDefinition,
    },
  };
}

function relatedTerms(entry: GlossaryEntry) {
  if (!entry.relatedTerms?.length) return [];
  return entry.relatedTerms
    .map((slug) => getGlossaryEntry(slug))
    .filter((e): e is GlossaryEntry => Boolean(e));
}

function relatedChapters(entry: GlossaryEntry) {
  if (!entry.relatedChapters?.length) return [];
  return entry.relatedChapters
    .map((slug) => sections.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

export default async function GlossaryEntryPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();

  const url = `${SITE_URL}/glossary/${slug}`;
  const setUrl = `${SITE_URL}/glossary`;

  const chapters = relatedChapters(entry);
  const related = relatedTerms(entry);

  return (
    <>
      <JsonLd
        nodes={[
          definedTermSchema({
            url,
            termSetUrl: setUrl,
            name: entry.term,
            description: entry.longDefinition ?? entry.shortDefinition,
            source: entry.source,
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Glossary", url: setUrl },
            { name: entry.term, url },
          ]),
        ]}
      />
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta flex-wrap">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <Link href="/glossary" className="link">
                Glossary
              </Link>
              <span>/</span>
              <span>{entry.term}</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              {entry.term}
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              {entry.shortDefinition}
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="meta sticky top-32">Definition</p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            {entry.longDefinition && (
              <div className="prose-body text-charcoal max-w-prose">
                <p>{entry.longDefinition}</p>
              </div>
            )}

            {entry.source && (
              <div className="border-t border-rule pt-6">
                <p className="meta mb-2">Source</p>
                <p className="caption">
                  <a
                    href={entry.source.url}
                    className="link-marine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {entry.source.name}
                  </a>
                </p>
              </div>
            )}

            {chapters.length > 0 && (
              <div className="border-t border-rule pt-6">
                <p className="meta mb-3">Discussed in</p>
                <ul className="space-y-2">
                  {chapters.map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        href={`/${chapter.slug}`}
                        className="font-serif text-lg link"
                      >
                        Chapter {chapter.number}: {chapter.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {related.length > 0 && (
              <div className="border-t border-rule pt-6">
                <p className="meta mb-3">Related terms</p>
                <ul className="space-y-2">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/glossary/${r.slug}`}
                        className="font-serif text-lg link"
                      >
                        {r.term}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        <nav className="border-t border-rule bg-paper py-12">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <Link
              href="/glossary"
              className="meta-marine inline-flex items-center gap-2"
            >
              <span aria-hidden>&larr;</span> All terms
            </Link>
          </div>
        </nav>
      </article>

      <SiteFooter />
    </>
  );
}
