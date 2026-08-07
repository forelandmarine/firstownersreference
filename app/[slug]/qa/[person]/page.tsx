import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ReadingProgress } from "@/components/reading-progress";
import { BackToTop } from "@/components/back-to-top";
import { ContributorAvatar } from "@/components/contributor-avatar";
import { getContributorProfile } from "@/lib/contributors";
import { sections, getSection } from "@/lib/sections";
import {
  allPublishedQAs,
  getGuestOpinionByPerson,
  qaPersonSlug,
} from "@/lib/guest-opinions";
import {
  articleSchema,
  breadcrumbSchema,
  jsonLdString,
  SITE_URL,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return allPublishedQAs().map(({ chapterSlug, person }) => ({
    slug: chapterSlug,
    person,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; person: string }>;
}): Promise<Metadata> {
  const { slug, person } = await props.params;
  const section = getSection(slug);
  const opinion = getGuestOpinionByPerson(slug, person);
  if (!section || !opinion) return {};
  const url = `${SITE_URL}/${section.slug}/qa/${person}`;
  const title = `In conversation with ${opinion.contributor} | Chapter ${section.number}`;
  const description =
    opinion.intro ??
    `${opinion.contributor}, ${opinion.contributorRole}, in conversation with The First Owner's Reference.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `In conversation with ${opinion.contributor}, The First Owner's Reference`,
      description,
      url,
      type: "article",
      publishedTime: section.datePublished,
    },
    twitter: {
      card: "summary_large_image",
      title: `In conversation with ${opinion.contributor}`,
      description,
    },
  };
}

export default async function GuestQAPage(props: {
  params: Promise<{ slug: string; person: string }>;
}) {
  const { slug, person } = await props.params;
  const section = getSection(slug);
  if (!section) notFound();
  const opinion = getGuestOpinionByPerson(slug, person);
  if (!opinion) notFound();

  const url = `${SITE_URL}/${section.slug}/qa/${person}`;
  const otherQAs = allPublishedQAs().filter(
    (qa) => !(qa.chapterSlug === slug && qa.person === person)
  );
  const profile = getContributorProfile(opinion.contributor);

  const schema = jsonLdString(
    articleSchema({
      url,
      headline: `In conversation with ${opinion.contributor}`,
      description:
        opinion.intro ??
        `${opinion.contributor}, ${opinion.contributorRole}, in conversation with The First Owner's Reference.`,
      datePublished: section.datePublished,
      dateModified: section.dateModified,
      author: "both",
      image: `${SITE_URL}/${section.slug}/opengraph-image`,
      articleSection: `Chapter ${section.number}`,
    }),
    breadcrumbSchema([
      { name: "1st Edition", url: SITE_URL },
      {
        name: `Chapter ${section.number}, ${section.title}`,
        url: `${SITE_URL}/${section.slug}`,
      },
      { name: `In conversation with ${opinion.contributor}`, url },
    ])
  );

  return (
    <>
      <SiteHeader />
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

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
              <span>Guest opinion</span>
            </nav>
            <p className="meta-marine mb-6">
              Chapter {section.number} &middot; Guest opinion
            </p>
            <h1 className="font-serif font-light text-headline lg:text-[3rem] leading-[1.05] tracking-tight text-charcoal mb-8 max-w-3xl">
              In conversation with {opinion.contributor}
            </h1>
            {opinion.intro && (
              <p className="font-serif italic text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl">
                {opinion.intro}
              </p>
            )}
          </div>
        </header>

        <section className="bg-paper py-20 lg:py-32">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 space-y-3">
                <ContributorAvatar
                  name={opinion.contributor}
                  avatar={profile?.avatar}
                  size={80}
                />
                <p className="meta">In conversation with</p>
                <p className="font-serif text-2xl leading-tight tracking-tight text-charcoal">
                  {opinion.contributor}
                </p>
                <p className="caption whitespace-pre-line">
                  {opinion.contributorRole}
                </p>
                {opinion.contributorLinkedIn && (
                  <a
                    href={opinion.contributorLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${opinion.contributor} on LinkedIn`}
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
              <div className="space-y-12">
                {opinion.questions.map((qa, i) => (
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
                    {qa.pullQuote && (
                      <blockquote className="mt-10 pl-12">
                        <p className="font-serif text-2xl lg:text-3xl leading-tight tracking-tight text-marine max-w-2xl">
                          {qa.pullQuote}
                        </p>
                      </blockquote>
                    )}
                  </div>
                ))}
              </div>
              <p className="meta mt-16 pt-6 border-t border-charcoal max-w-prose">
                Answers given by {opinion.contributor},{" "}
                {opinion.contributorRole}. Lightly edited for typography and
                approved by the contributor before publication.
              </p>
            </div>
          </div>
        </section>

        <nav className="border-t border-rule bg-paper py-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <p className="meta mb-8">More conversations</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-16">
              {otherQAs.map(({ chapterSlug, person: p, opinion: o }) => {
                const s = sections.find((sec) => sec.slug === chapterSlug)!;
                return (
                  <Link
                    key={`${chapterSlug}-${p}`}
                    href={`/${chapterSlug}/qa/${p}`}
                    className="group flex flex-col"
                  >
                    <span className="meta mb-2">
                      Chapter {s.number}, {s.title}
                    </span>
                    <span className="font-serif text-xl group-hover:text-marine transition-colors">
                      {o.contributor}
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              href={`/${section.slug}`}
              className="group flex flex-col"
            >
              <span className="meta mb-2">
                Back to chapter {section.number}
              </span>
              <span className="font-serif text-xl group-hover:text-marine transition-colors">
                {section.title}
              </span>
            </Link>
          </div>
        </nav>
      </article>

      <BackToTop />
      <SiteFooter />
    </>
  );
}
