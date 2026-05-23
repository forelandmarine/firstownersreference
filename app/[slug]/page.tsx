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
import { JsonLd } from "@/components/json-ld";
import { sections, getSection } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { getDataSpread } from "@/lib/data-spreads";
import { getCase } from "@/lib/cases";
import { getChecklist } from "@/lib/checklists";
import { getChapterFaqs } from "@/lib/faqs";
import { getGuestOpinions } from "@/lib/guest-opinions";
import { glossaryEntries } from "@/lib/glossary";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  SITE_URL,
} from "@/lib/jsonld";

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
  const url = `${SITE_URL}/${section.slug}`;
  return {
    title: section.seoTitle,
    description: section.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${section.seoTitle} | The First Owner's Reference`,
      description: section.seoDescription,
      url,
      type: "article",
      publishedTime: section.datePublished,
      modifiedTime: section.dateModified ?? section.datePublished,
    },
    twitter: {
      card: "summary_large_image",
      title: section.seoTitle,
      description: section.seoDescription,
    },
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
  const faqs = getChapterFaqs(slug);
  const guestOpinions = getGuestOpinions(slug);
  const chapterGlossary = glossaryEntries.filter((entry) =>
    entry.relatedChapters?.includes(slug)
  );
  const index = sections.findIndex((s) => s.slug === section.slug);
  const prev = sections[index - 1];
  const next = sections[index + 1];
  const url = `${SITE_URL}/${section.slug}`;

  const stripSections: { id: string; label: string; href?: string }[] = [
    { id: "essay", label: "Essay" },
    ...(guestOpinions.length ? [{ id: "guest-opinion", label: "Opinion" }] : []),
    ...(dataSpread ? [{ id: "data-spread", label: "Data" }] : []),
    ...(caseStudy ? [{ id: "case", label: "Case", href: `/${section.slug}/case` }] : []),
    ...(checklist ? [{ id: "checklist", label: "Checklist" }] : []),
    ...(chapterGlossary.length ? [{ id: "terms", label: "Terms" }] : []),
    ...(faqs.length ? [{ id: "faqs", label: "FAQ" }] : []),
  ];

  const schemaNodes: object[] = [
    articleSchema({
      url,
      headline: section.seoTitle,
      description: section.seoDescription,
      datePublished: section.datePublished,
      dateModified: section.dateModified,
      author: "both",
      image: `${url}/opengraph-image`,
      articleSection: `Chapter ${section.number}`,
      chapterNumber: section.number,
      chapterTitle: section.title,
    }),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Chapters", url: `${SITE_URL}/#chapters` },
      { name: `Chapter ${section.number}: ${section.title}`, url },
    ]),
  ];
  if (faqs.length) {
    schemaNodes.push(faqPageSchema(faqs));
  }

  return (
    <>
      <JsonLd nodes={schemaNodes} />
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
              <h1 className="font-serif font-light text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-charcoal mb-8 max-w-xl">
                {section.title}
              </h1>
              <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-xl">
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
            <dl className="mt-10 lg:mt-16 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-2">
              <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-4 lg:border-0 lg:pt-0 lg:contents">
                <dt className="meta">Coordinates</dt>
                <dd className="meta-marine text-right lg:text-left">{section.coordinates}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-4 lg:border-0 lg:pt-0 lg:contents">
                <dt className="meta">Reading time</dt>
                <dd className="meta text-charcoal text-right lg:text-left">
                  {essay?.readingTime ?? "Forthcoming"}
                </dd>
              </div>
              {(() => {
                const seen = new Set<string>();
                const contributors = guestOpinions
                  .filter((g) => {
                    if (seen.has(g.contributor)) return false;
                    seen.add(g.contributor);
                    return true;
                  })
                  .map((g) => g.contributor);
                if (!contributors.length && section.contributor !== "To be confirmed") {
                  contributors.push(section.contributor);
                }
                if (!contributors.length) return null;
                return (
                  <div className="flex items-baseline justify-between gap-6 border-t border-rule pt-4 lg:border-0 lg:pt-0 lg:contents">
                    <dt className="meta">{contributors.length > 1 ? "Contributors" : "Contributor"}</dt>
                    <dd className="meta text-charcoal text-right lg:text-left">
                      {contributors.map((name) => (
                        <span key={name} className="block">{name}</span>
                      ))}
                    </dd>
                  </div>
                );
              })()}
            </dl>
          </div>
        </section>

        {essay && (
          <section
            id="essay"
            className="bg-paper py-20 lg:py-32 border-t border-rule scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="hidden lg:block lg:col-span-2">
                <div className="lg:sticky lg:top-32 space-y-6">
                  <p className="meta">Chapter {section.number}</p>
                  <p className="meta-marine">{section.coordinates}</p>
                  <div className="rule pt-4 space-y-3">
                    <p className="meta">In this chapter</p>
                    <ol className="space-y-2 caption">
                      {[
                        {
                          id: "essay",
                          label: "Lead essay",
                          present: true,
                          href: "#essay",
                          internal: false,
                        },
                        ...(guestOpinions.length
                          ? [
                              {
                                id: "guest-opinion",
                                label: "Guest opinion",
                                present: true,
                                href: "#guest-opinion",
                                internal: false,
                              },
                            ]
                          : []),
                        {
                          id: "data-spread",
                          label: "Data spread",
                          present: !!dataSpread,
                          href: "#data-spread",
                          internal: false,
                        },
                        {
                          id: "case",
                          label: "Case material",
                          present: !!caseStudy,
                          href: `/${section.slug}/case`,
                          internal: true,
                        },
                        {
                          id: "checklist",
                          label: "Checklist",
                          present: !!checklist,
                          href: "#checklist",
                          internal: false,
                        },
                      ].map((item, i) => (
                        <li
                          key={item.id}
                          className={item.present ? "" : "opacity-60"}
                        >
                          <span
                            className={
                              item.present ? "meta-marine mr-1" : "mr-1"
                            }
                          >
                            {i + 1}
                          </span>{" "}
                          {item.present ? (
                            item.internal ? (
                              <Link href={item.href} className="link">
                                {item.label}
                              </Link>
                            ) : (
                              <a href={item.href} className="link">
                                {item.label}
                              </a>
                            )
                          ) : (
                            <>{item.label}</>
                          )}
                        </li>
                      ))}
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
                    if (p.type === "editorsNote") {
                      return (
                        <aside
                          key={i}
                          className="not-prose my-12 border-l-2 border-marine pl-6"
                        >
                          <p className="meta mb-2">Editor&rsquo;s note</p>
                          <p className="font-serif italic text-charcoal-soft leading-relaxed">
                            {p.text}
                            {p.href && (
                              <>
                                {" "}
                                {/^https?:\/\//.test(p.href) ? (
                                  <a
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link-marine not-italic"
                                  >
                                    {p.linkText ?? "Read more"}
                                  </a>
                                ) : (
                                  <Link href={p.href} className="link-marine not-italic">
                                    {p.linkText ?? "Read more"}
                                  </Link>
                                )}
                                .
                              </>
                            )}
                          </p>
                        </aside>
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
                      alt={`Editorial photograph illustrating Chapter ${section.number}: ${section.title}`}
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

        {guestOpinions.length > 0 && (
          <section
            id="guest-opinion"
            className="bg-paper py-20 lg:py-32 border-t border-charcoal scroll-mt-24"
          >
            {guestOpinions.map((guestOpinion, gi) => (
              <div
                key={gi}
                className={`max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 ${gi > 0 ? "mt-24 pt-20 border-t border-charcoal" : ""}`}
              >
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-32 space-y-3">
                    <p className="meta-marine">
                      Chapter {section.number} &middot; Guest opinion
                    </p>
                    <p className="meta">In conversation with</p>
                    <p className="font-serif text-2xl leading-tight tracking-tight text-charcoal">
                      {guestOpinion.contributor}
                    </p>
                    <p className="caption whitespace-pre-line">{guestOpinion.contributorRole}</p>
                    {guestOpinion.contributorLinkedIn && (
                      <a
                        href={guestOpinion.contributorLinkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${guestOpinion.contributor} on LinkedIn`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-rule rounded-sm caption text-charcoal-soft hover:text-charcoal hover:border-charcoal transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                          className="h-3 w-3"
                        >
                          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.91 1.65-1.85 3.39-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                        </svg>
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-8 lg:col-start-4">
                  {guestOpinion.intro && (
                    <p className="font-serif italic text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl mb-16">
                      {guestOpinion.intro}
                    </p>
                  )}
                  <div className="space-y-12">
                    {guestOpinion.questions.map((qa, i) => (
                      <div
                        key={i}
                        className="border-t border-rule pt-8 first:border-t-0 first:pt-0"
                      >
                        <div className="flex gap-6 mb-6">
                          <span className="meta-marine shrink-0 pt-1">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="font-serif text-xl lg:text-2xl leading-snug tracking-tight text-charcoal max-w-2xl">
                            {qa.question}
                          </p>
                        </div>
                        <div className="prose-body max-w-prose pl-12">
                          {qa.answer.map((para, j) => (
                            <p key={j}>{para}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="meta mt-16 pt-6 border-t border-charcoal max-w-prose">
                    Answers given by {guestOpinion.contributor},{" "}
                    {guestOpinion.contributorRole}. Lightly edited for typography
                    and approved by the contributor before publication.
                  </p>
                </div>
              </div>
            ))}
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
                  Read the case study
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

        {chapterGlossary.length > 0 && (
          <section
            id="terms"
            className="bg-paper py-20 lg:py-24 border-t border-charcoal scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <p className="meta-marine mb-3">
                  Chapter {section.number}
                </p>
                <p className="meta">Terms used</p>
              </div>
              <div className="lg:col-span-8 lg:col-start-4">
                <details className="group">
                  <summary className="flex items-center justify-between gap-6 mb-2">
                    <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal group-hover:text-marine transition-colors">
                      Glossary terms in this chapter
                    </h2>
                    <svg
                      className="shrink-0 w-6 h-6 text-stone transition-transform group-open:rotate-180"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path
                        d="M3 6 L8 11 L13 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <p className="meta mt-2 mb-10">
                    {chapterGlossary.length} terms
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                    {chapterGlossary.map((entry) => (
                      <li
                        key={entry.slug}
                        className="border-t border-rule pt-4"
                      >
                        <Link
                          href={`/glossary/${entry.slug}`}
                          className="block group/term"
                        >
                          <p className="font-serif text-xl text-charcoal group-hover/term:text-marine transition-colors mb-1">
                            {entry.term}
                          </p>
                          <p className="caption max-w-prose">
                            {entry.shortDefinition}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/glossary"
                    className="meta-marine inline-flex items-center gap-2 mt-10"
                  >
                    Open the full glossary
                  </Link>
                </details>
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section
            id="faqs"
            className="bg-paper-deep py-20 lg:py-28 border-t border-charcoal scroll-mt-24"
          >
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <p className="meta-marine mb-3">
                  Chapter {section.number}
                </p>
                <p className="meta">FAQ</p>
              </div>
              <div className="lg:col-span-8 lg:col-start-4">
                <details className="group">
                  <summary className="flex items-center justify-between gap-6 mb-2 max-w-3xl">
                    <h2 className="font-serif font-light text-headline lg:text-[2.5rem] leading-tight tracking-tight text-charcoal group-hover:text-marine transition-colors">
                      Frequently asked
                    </h2>
                    <svg
                      className="shrink-0 w-6 h-6 text-stone transition-transform group-open:rotate-180"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path
                        d="M3 6 L8 11 L13 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <p className="meta mt-2 mb-12">
                    {faqs.length} questions
                  </p>
                  <dl className="space-y-10">
                    {faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="border-t border-rule pt-6"
                      >
                        <dt className="font-serif text-xl lg:text-2xl leading-snug tracking-tight text-charcoal mb-4">
                          {faq.question}
                        </dt>
                        <dd className="font-serif text-base lg:text-lg leading-relaxed text-charcoal-soft max-w-prose">
                          {faq.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-rule bg-paper py-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-3">
                <p className="meta-marine">Cite this chapter</p>
              </div>
              <div className="lg:col-span-9 max-w-prose space-y-6">
                <div>
                  <p className="meta mb-2">Short form</p>
                  <p className="font-serif text-base text-charcoal leading-relaxed">
                    &ldquo;{section.title},&rdquo; The First
                    Owner&rsquo;s Reference, 1st Edition, 2026.
                  </p>
                </div>
                <div>
                  <p className="meta mb-2">Full form</p>
                  <p className="font-serif text-base text-charcoal leading-relaxed">
                    Foreland Marine, &ldquo;{section.title},&rdquo;
                    in The First Owner&rsquo;s Reference, 1st Edition
                    (2026), Chapter {section.number},
                    https://firstownersreference.com/{section.slug}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    Next, Chapter {next.number}
                  </span>
                  <span className="font-serif text-xl group-hover:text-marine transition-colors max-w-sm">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <Link href="/#chapters" className="group flex flex-col text-right">
                  <span className="meta mb-2">
                    Return to all chapters
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
