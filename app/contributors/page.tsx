import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sections } from "@/lib/sections";
import { guestOpinions } from "@/lib/guest-opinions";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contributors",
  description:
    "Named external contributors to the 1st Edition of The First Owner's Reference. Each transparent on commercial relationships.",
  alternates: {
    canonical: "https://firstownersreference.com/contributors",
  },
  openGraph: {
    title: "Contributors | The First Owner's Reference",
    description:
      "Named external contributors to the 1st Edition. Each transparent on commercial relationships.",
    url: "https://firstownersreference.com/contributors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contributors",
    description: "Named external contributors to the 1st Edition.",
  },
};

type ContributorChapter = {
  number: string;
  title: string;
  slug: string;
};

type Contributor = {
  name: string;
  role: string;
  linkedin?: string;
  chapters: ContributorChapter[];
};

function buildContributors(): Contributor[] {
  const byName = new Map<string, Contributor>();

  const upsert = (
    name: string,
    role: string,
    linkedin: string | undefined,
    chapter: ContributorChapter
  ) => {
    const existing = byName.get(name);
    if (existing) {
      if (!existing.chapters.some((c) => c.slug === chapter.slug)) {
        existing.chapters.push(chapter);
      }
      if (!existing.linkedin && linkedin) {
        existing.linkedin = linkedin;
      }
      return;
    }
    byName.set(name, { name, role, linkedin, chapters: [chapter] });
  };

  for (const s of sections) {
    if (s.contributor === "To be confirmed") continue;
    upsert(s.contributor, s.contributorRole, s.contributorLinkedIn, {
      number: s.number,
      title: s.title,
      slug: s.slug,
    });
  }

  for (const [slug, opinions] of Object.entries(guestOpinions)) {
    const section = sections.find((s) => s.slug === slug);
    if (!section) continue;
    for (const opinion of opinions) {
      upsert(opinion.contributor, opinion.contributorRole, opinion.contributorLinkedIn, {
        number: section.number,
        title: section.title,
        slug: section.slug,
      });
    }
  }

  return Array.from(byName.values()).sort((a, b) => {
    const aFirst = a.chapters[0]?.number ?? "99";
    const bFirst = b.chapters[0]?.number ?? "99";
    if (aFirst !== bFirst) return aFirst.localeCompare(bFirst);
    return a.name.localeCompare(b.name);
  });
}

export default function ContributorsPage() {
  const contributors = buildContributors();

  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <span>Contributors</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Confirmed contributors. Each transparent on commercial relationships.
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              The First Owner&rsquo;s Reference is collaborative by design. Each chapter is
              anchored by a named external contributor with deep first-hand
              knowledge of the topic, with additional voices on the record where
              their experience adds material the anchor cannot. Outreach is
              ongoing for the remaining slots; this page is updated as
              contributors confirm.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24">
          <div className="rule-marine pt-4 mb-16 max-w-2xl">
            <p className="caption">
              Disclosure: every contribution is given voluntarily. No
              contributor is paid by The First Owner&rsquo;s Reference, and
              none holds a commercial relationship with Foreland Marine.
              Where any past relationship exists, it is disclosed alongside
              the piece itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {contributors.map((c) => (
              <div key={c.name} className="border-t border-charcoal pt-6">
                <p className="font-serif text-2xl leading-tight tracking-tight text-charcoal mb-2">
                  {c.name}
                </p>
                <p className="caption mb-4 whitespace-pre-line">{c.role}</p>
                {c.linkedin && (
                  <a
                    href={c.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-marine caption inline-block mb-6"
                  >
                    LinkedIn &rarr;
                  </a>
                )}
                <ul className="space-y-2">
                  {c.chapters.map((ch) => (
                    <li key={ch.slug}>
                      <Link
                        href={`/${ch.slug}`}
                        className="meta-marine inline-block"
                      >
                        Chapter {ch.number} &middot; {ch.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-charcoal pt-10 max-w-2xl">
            <p className="meta-marine mb-4">Propose a contribution</p>
            <p className="caption leading-relaxed">
              Editorial proposals, expressions of interest, and corrections
              are welcome. Write to{" "}
              <a
                href="mailto:editors@firstownersreference.com"
                className="link-marine"
              >
                editors@firstownersreference.com
              </a>
              . We read everything.
            </p>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
