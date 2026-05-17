import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseBody } from "@/components/case-body";
import { ReadingProgress } from "@/components/reading-progress";
import { BackToTop } from "@/components/back-to-top";
import { sections, getSection } from "@/lib/sections";
import { getCase } from "@/lib/cases";
import { SITE_URL } from "@/lib/jsonld";

export function generateStaticParams() {
  return sections
    .filter((s) => getCase(s.slug))
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const section = getSection(slug);
  const caseStudy = getCase(slug);
  if (!section || !caseStudy) return {};
  const url = `${SITE_URL}/${section.slug}/case`;
  return {
    title: `${caseStudy.title} | Chapter ${section.number}`,
    description: caseStudy.standfirst,
    alternates: { canonical: url },
    openGraph: {
      title: `${caseStudy.title} | Chapter ${section.number}, The First Owner's Reference`,
      description: caseStudy.standfirst,
      url,
      type: "article",
      publishedTime: section.datePublished,
    },
    twitter: {
      card: "summary_large_image",
      title: caseStudy.title,
      description: caseStudy.standfirst,
    },
  };
}

export default async function CaseStudyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const section = getSection(slug);
  if (!section) notFound();
  const caseStudy = getCase(slug);
  if (!caseStudy) notFound();

  const index = sections.findIndex((s) => s.slug === section.slug);
  const prev = sections[index - 1];
  const next = sections[index + 1];

  return (
    <>
      <SiteHeader />
      <ReadingProgress />

      <article>
        <header className="bg-paper border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <nav className="flex flex-wrap items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <Link href={`/${section.slug}`} className="link">
                Chapter {section.number}, {section.title}
              </Link>
              <span>/</span>
              <span>Case material</span>
            </nav>
            <p className="meta-marine mb-6">
              Chapter {section.number} &middot; Case material
            </p>
            <h1 className="font-serif font-light text-headline lg:text-[3rem] leading-[1.05] tracking-tight text-charcoal mb-8 max-w-3xl">
              {caseStudy.title}
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl">
              {caseStudy.standfirst}
            </p>
          </div>
        </header>

        <section className="bg-paper py-20 lg:py-32">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <CaseBody study={caseStudy} />
          </div>
        </section>

        <nav className="border-t border-rule bg-paper py-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <p className="meta mb-8">End of case material</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <Link
                href={`/${section.slug}`}
                className="group flex flex-col"
              >
                <span className="meta mb-2">
                  &larr; Back to chapter {section.number}
                </span>
                <span className="font-serif text-xl group-hover:text-marine transition-colors">
                  {section.title}
                </span>
              </Link>
              {prev ? (
                <Link
                  href={`/${prev.slug}`}
                  className="group flex flex-col md:text-center"
                >
                  <span className="meta mb-2">
                    Previous chapter
                  </span>
                  <span className="font-serif text-xl group-hover:text-marine transition-colors">
                    {prev.number}, {prev.title}
                  </span>
                </Link>
              ) : (
                <span className="hidden md:block" />
              )}
              {next ? (
                <Link
                  href={`/${next.slug}`}
                  className="group flex flex-col md:text-right"
                >
                  <span className="meta mb-2">
                    Next chapter
                  </span>
                  <span className="font-serif text-xl group-hover:text-marine transition-colors">
                    {next.number}, {next.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/#chapters"
                  className="group flex flex-col md:text-right"
                >
                  <span className="meta mb-2">All chapters</span>
                  <span className="font-serif text-xl group-hover:text-marine transition-colors">
                    1st Edition
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </article>

      <BackToTop />
      <SiteFooter />
    </>
  );
}
