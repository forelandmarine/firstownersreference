import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sections } from "@/lib/sections";

export const metadata = {
  title: "Contributors",
  description:
    "Named external contributors to Edition One of The First Owner's Reference. Yacht lawyers, surveyors, yard CEOs, captains, family office principals.",
};

export default function ContributorsPage() {
  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                Edition One
              </Link>
              <span>/</span>
              <span>Contributors</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Eight guest contributors. Each transparent on commercial relationships.
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              The First Owner’s Reference is collaborative by design. Every chapter carries
              an opinion piece by a named external contributor with deep
              first-hand knowledge of the topic.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24">
          <div className="rule-marine pt-4 mb-16 max-w-2xl">
            <p className="caption">
              Disclosure: every contributor is paid a flat editorial fee for
              their piece. None hold a commercial relationship with Foreland
              Marine. Where any past relationship exists, it is disclosed
              alongside the piece itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {sections.map((s) => (
              <div key={s.slug} className="border-t border-charcoal pt-6">
                <p className="meta mb-3">
                  Chapter {s.number} &middot; {s.title}
                </p>
                <p className="font-serif text-2xl leading-tight tracking-tight text-charcoal mb-2">
                  {s.contributor}
                </p>
                <p className="caption mb-6">{s.contributorRole}</p>
                <p className="caption max-w-md">
                  Bio and headshot to be added once contributor confirms.
                  Editorial outreach in progress.
                </p>
                <Link
                  href={`/${s.slug}`}
                  className="inline-block mt-6 meta-marine"
                >
                  Read chapter &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
