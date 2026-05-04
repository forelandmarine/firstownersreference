import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DataSpreadBody } from "@/components/data-spread-body";
import { ChecklistBody } from "@/components/checklist-body";
import { ReadingProgress } from "@/components/reading-progress";
import { BackToTop } from "@/components/back-to-top";
import { ChapterStrip } from "@/components/chapter-strip";
import { ShareChapter } from "@/components/share-chapter";
import { sections, getSection } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { getDataSpread } from "@/lib/data-spreads";
import { getCase } from "@/lib/cases";
import { getChecklist } from "@/lib/checklists";

function linkifyEmails(text: string): React.ReactNode[] {
  const emailRegex = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = emailRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a key={`email-${key++}`} href={`mailto:${match[0]}`} className="link-marine">
        {match[0]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : [text];
}

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const section = getSection(slug);
  if (!section) return {};
  return {
    title: section.title,
    description: section.standfirst,
  };
}

export default async function SectionPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const section = getSection(slug);
  if (!section) notFound();

  const essay = getLeadEssay(slug);
  const dataSpread = getDataSpread(slug);
  const caseStudy = getCase(slug);
  const checklist = getChecklist(slug);
  const index = sections.findIndex((s) => s.slug === section.slug);
  const prev = sections[index - 1];
  const next = sections[index + 1];

  const stripSections: { id: string; label: string; href?: string }[] = [
    { id: "essay", label: "Essay" },
    ...(dataSpread ? [{ id: "data-spread", label: "Data" }] : []),
    ...(caseStudy ? [{ id: "case", label: "Case", href: `/${section.slug}/case` }] : []),
    ...(checklist ? [{ id: "checklist", label: "Checklist" }] : []),
  ];

  return (
    <>
      <SiteHeader />
      <ReadingProgress />
      <ChapterStrip
        number={section.number}
        title={section.title}
        sections={stripSections}
      />

      <article>
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80dvh] lg:min-h-[90dvh]">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[90dvh] order-2 lg:order-1">
            <Image
              src={section.hero}
              alt={`Chapter ${section.number}: ${section.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover ${
                section.heroFocus === "bottom"
                  ? "object-bottom"
                  : section.heroFocus === "top"
                  ? "object-top"
                  : section.heroFocus === "left"
                  ? "object-left"
                  : section.heroFocus === "right"
                  ? "object-right"
                  : "object-center"
              }`}
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-between bg-paper px-6 lg:px-16 py-16 lg:py-24">
            <div>
              <p className="meta mb-12">
                1st Edition &middot; 2026 &middot; Chapter
              </p>
              <p className="numeral mb-8">{section.number}</p>
              <h1 className="font-serif font-light text-headline lg:text-[3.5rem] leading-[1.05] tracking-tight text-charcoal mb-8 max-w-xl">
                {section.title}
              </h1>
              <p className="font-serif text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-xl">
                {section.standfirst}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <a
                  href="#essay"
                  className="inline-flex items-center gap-2 meta-marine"
                >
                  Begin the chapter <span aria-hidden>&darr;</span>
                </a>
                <ShareChapter title={section.title} slug={section.slug} />
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-2">
              <p className="meta">Coordinates</p>
              <p className="meta-marine">{section.coordinates}</p>
              <p className="meta">Reading time</p>
              <p className="meta text-charcoal">
                {essay?.readingTime ?? "Forthcoming"}
              </p>
              <p className="meta">Author</p>
              <p className="meta text-charcoal">Foreland Marine</p>
            </div>
          </div>
        </section>

        {essay && (
          <section
            id="essay"
            className="bg-paper py-20 lg:py-32 border-t border-rule scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-32 space-y-6">
                  <p className="meta">Chapter {section.number}</p>
                  <p className="meta-marine">{section.coordinates}</p>
                  <div className="rule pt-4 space-y-3">
                    <p className="meta">In this chapter</p>
                    <ol className="space-y-2 caption">
                      <li>
                        <a href="#essay" className="link">
                          <span className="meta-marine mr-1">1</span> Lead essay
                        </a>
                      </li>
                      <li className={dataSpread ? "" : "opacity-60"}>
                        <span
                          className={
                            dataSpread ? "meta-marine mr-1" : "mr-1"
                          }
                        >
                          2
                        </span>{" "}
                        {dataSpread ? (
                          <a href="#data-spread" className="link">
                            Data spread
                          </a>
                        ) : (
                          <>Data spread</>
                        )}
                      </li>
                      <li className="opacity-60">
                        <span className="mr-1">3</span> Guest opinion
                      </li>
                      <li className={caseStudy ? "" : "opacity-60"}>
                        <span
                          className={
                            caseStudy ? "meta-marine mr-1" : "mr-1"
                          }
                        >
                          4
                        </span>{" "}
                        {caseStudy ? (
                          <Link href={`/${section.slug}/case`} className="link">
                            Case material
                          </Link>
                        ) : (
                          <>Case material</>
                        )}
                      </li>
                      <li className={checklist ? "" : "opacity-60"}>
                        <span
                          className={
                            checklist ? "meta-marine mr-1" : "mr-1"
                          }
                        >
                          5
                        </span>{" "}
                        {checklist ? (
                          <a href="#checklist" className="link">
                            Checklist
                          </a>
                        ) : (
                          <>Checklist</>
                        )}
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 lg:col-start-3">
                <div className="prose-body max-w-prose">
                  {essay.paragraphs.map((p, i) => {
                    if (typeof p === "string") {
                      return <p key={i}>{linkifyEmails(p)}</p>;
                    }
                    if (p.type === "h2") {
                      return <h2 key={i}>{p.text}</h2>;
                    }
                    if (p.type === "blockquote") {
                      return (
                        <blockquote key={i}>
                          {p.text}
                          {p.attribution && (
                            <footer className="meta mt-3 not-italic">
                              {p.attribution}
                            </footer>
                          )}
                        </blockquote>
                      );
                    }
                    if (p.type === "figure") {
                      return (
                        <figure
                          key={i}
                          className="my-12 -mx-6 lg:mx-0"
                        >
                          <div className="relative aspect-[3/2] bg-stone-soft overflow-hidden">
                            <Image
                              src={p.src}
                              alt={p.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 70vw"
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="caption mt-3 px-6 lg:px-0 max-w-prose">
                            {p.caption}
                            {p.credit && (
                              <span className="meta block mt-1">
                                {p.credit}
                              </span>
                            )}
                          </figcaption>
                        </figure>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              <aside className="hidden lg:block lg:col-span-3">
                <div className="lg:sticky lg:top-32 space-y-8">
                  <div className="relative aspect-[3/4] bg-stone-soft">
                    <Image
                      src={section.hero}
                      alt="Editorial photograph"
                      fill
                      sizes="25vw"
                      className={`object-cover ${
                        section.heroFocus === "bottom"
                          ? "object-bottom"
                          : section.heroFocus === "top"
                          ? "object-top"
                          : section.heroFocus === "left"
                          ? "object-left"
                          : section.heroFocus === "right"
                          ? "object-right"
                          : "object-center"
                      }`}
                    />
                  </div>
                  <p className="caption">{section.coordinates}.</p>
                </div>
              </aside>
            </div>
          </section>
        )}

        {dataSpread && (
          <section
            id="data-spread"
            className="bg-paper-deep py-20 lg:py-32 border-t border-charcoal scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
              <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div className="lg:col-span-8 lg:col-start-3">
                  <p className="meta-marine mb-4">
                    Chapter {section.number} &middot; Data spread
                  </p>
                  <h2 className="font-serif font-light text-headline lg:text-[2.75rem] leading-[1.1] tracking-tight text-charcoal mb-8 max-w-3xl">
                    {dataSpread.title}
                  </h2>
                  <p className="font-serif text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl">
                    {dataSpread.standfirst}
                  </p>
                </div>
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 lg:col-start-3">
                  <DataSpreadBody spread={dataSpread} />
                </div>
              </div>
            </div>
          </section>
        )}

        {caseStudy && (
          <section
            id="case"
            className="bg-paper py-20 lg:py-32 border-t border-charcoal scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
              <Link
                href={`/${section.slug}/case`}
                className="group block border-t border-charcoal pt-10 transition-colors hover:border-marine"
              >
                <p className="meta-marine mb-6">
                  Chapter {section.number} &middot; Case material
                </p>
                <h2 className="font-serif font-light text-headline lg:text-[2.75rem] leading-[1.1] tracking-tight text-charcoal mb-8 max-w-3xl group-hover:text-marine transition-colors">
                  {caseStudy.title}
                </h2>
                <p className="font-serif text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl mb-10">
                  {caseStudy.standfirst}
                </p>
                <span className="meta-marine inline-flex items-center gap-2">
                  Read the case study <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </div>
          </section>
        )}

        {checklist && (
          <section
            id="checklist"
            className="bg-paper-deep py-20 lg:py-32 border-t border-charcoal scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
              <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div className="lg:col-span-8 lg:col-start-3">
                  <p className="meta-marine mb-4">
                    Chapter {section.number} &middot; Checklist
                  </p>
                  <h2 className="font-serif font-light text-headline lg:text-[2.75rem] leading-[1.1] tracking-tight text-charcoal mb-8 max-w-3xl">
                    {checklist.title}
                  </h2>
                  <p className="font-serif text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl">
                    {checklist.standfirst}
                  </p>
                </div>
              </header>
              <ChecklistBody list={checklist} />
            </div>
          </section>
        )}

        <nav className="border-t border-rule bg-paper py-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <p className="meta mb-8">End of Chapter {section.number}</p>
            <div className="flex justify-between items-start gap-6">
              {prev ? (
                <Link href={`/${prev.slug}`} className="group flex flex-col">
                  <span className="meta mb-2">
                    &larr; Previous, Chapter {prev.number}
                  </span>
                  <span className="font-serif text-xl group-hover:text-marine transition-colors max-w-sm">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/${next.slug}`}
                  className="group flex flex-col text-right"
                >
                  <span className="meta mb-2">
                    Next, Chapter {next.number} &rarr;
                  </span>
                  <span className="font-serif text-xl group-hover:text-marine transition-colors max-w-sm">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <Link href="/#chapters" className="group flex flex-col text-right">
                  <span className="meta mb-2">
                    Return to all chapters &rarr;
                  </span>
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
