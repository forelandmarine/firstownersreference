import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import { glossaryEntries, type GlossaryEntry } from "@/lib/glossary";
import { sections } from "@/lib/sections";
import {
  breadcrumbSchema,
  definedTermSetSchema,
  SITE_URL,
} from "@/lib/jsonld";

const URL = `${SITE_URL}/glossary`;

export const metadata: Metadata = {
  title: "Yacht industry glossary: definitions for first-time buyers",
  description:
    "Plain definitions of the terms that recur in superyacht acquisition, refit, and operation. Brokerage, dual agency, MLC, ISM, retrocession, Spanish IPR, owner's representative, and more. Citable. Linked from every chapter.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Yacht industry glossary | The First Owner's Reference",
    description:
      "Plain definitions of the terms that recur in superyacht acquisition, refit, and operation. Citable, sourced, linked from every chapter.",
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht industry glossary",
    description:
      "Plain definitions of the terms that recur in superyacht acquisition, refit, and operation.",
  },
};

function relatedChapters(entry: GlossaryEntry) {
  if (!entry.relatedChapters?.length) return [];
  return entry.relatedChapters
    .map((slug) => sections.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
}

function relatedTerms(entry: GlossaryEntry, all: GlossaryEntry[]) {
  if (!entry.relatedTerms?.length) return [];
  return entry.relatedTerms
    .map((slug) => all.find((e) => e.slug === slug))
    .filter((e): e is GlossaryEntry => Boolean(e));
}

export default function GlossaryPage() {
  const sorted = [...glossaryEntries].sort((a, b) =>
    a.term.localeCompare(b.term, "en")
  );

  return (
    <>
      <JsonLd
        nodes={[
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Glossary", url: URL },
          ]),
          definedTermSetSchema({
            url: URL,
            name: "The First Owner's Reference Glossary",
            description:
              "Plain definitions of the terms that recur in superyacht acquisition, refit, and operation. Curated by Foreland Marine.",
            hasDefinedTerm: sorted.map((e) => ({
              url: `${SITE_URL}/glossary#${e.slug}`,
              name: e.term,
            })),
          }),
        ]}
      />
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <span>Glossary</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Glossary
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Plain definitions of the terms that recur in The First Owner&rsquo;s Reference.
              Linked from every chapter. Citable.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="meta sticky top-32">
              {sorted.length} terms &middot; A to Z
            </p>
          </div>
          <div className="lg:col-span-9 space-y-12">
            {sorted.map((entry) => {
              const chapters = relatedChapters(entry);
              const related = relatedTerms(entry, sorted);
              return (
                <div
                  key={entry.slug}
                  id={entry.slug}
                  className="border-t border-rule pt-6 scroll-mt-32"
                >
                  <h2 className="font-serif text-2xl leading-tight tracking-tight text-charcoal mb-3">
                    <a
                      href={`#${entry.slug}`}
                      className="hover:text-marine transition-colors"
                    >
                      {entry.term}
                    </a>
                  </h2>
                  <p className="font-serif text-base lg:text-lg leading-relaxed text-charcoal-soft max-w-prose">
                    {entry.shortDefinition}
                  </p>
                  {entry.longDefinition && (
                    <p className="font-serif text-base lg:text-lg leading-relaxed text-charcoal max-w-prose mt-4">
                      {entry.longDefinition}
                    </p>
                  )}
                  {(entry.source || chapters.length > 0 || related.length > 0) && (
                    <div className="mt-5 space-y-2 text-sm">
                      {entry.source && (
                        <p className="caption">
                          <span className="meta mr-2">Source</span>
                          <a
                            href={entry.source.url}
                            className="link-marine"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {entry.source.name}
                          </a>
                        </p>
                      )}
                      {chapters.length > 0 && (
                        <p className="caption">
                          <span className="meta mr-2">Discussed in</span>
                          {chapters.map((chapter, i) => (
                            <span key={chapter.slug}>
                              {i > 0 && <span>, </span>}
                              <Link href={`/${chapter.slug}`} className="link-marine">
                                Chapter {chapter.number}
                              </Link>
                            </span>
                          ))}
                        </p>
                      )}
                      {related.length > 0 && (
                        <p className="caption">
                          <span className="meta mr-2">See also</span>
                          {related.map((r, i) => (
                            <span key={r.slug}>
                              {i > 0 && <span>, </span>}
                              <a href={`#${r.slug}`} className="link-marine">
                                {r.term}
                              </a>
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
