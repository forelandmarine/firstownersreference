/*
 *               +
 *               +
 *               +
 *         +++++++++++
 *               +
 *               +
 *               +
 *               +
 *               +
 *
 *   For God so loved the world that he gave his one and only Son,
 *   that whoever believes in him shall not perish but have eternal life.
 *                                                        John 3:16, NIV
 *
 *   And the peace of God, which transcends all understanding, will
 *   guard your hearts and your minds in Christ Jesus.
 *                                                 Philippians 4:7, NIV
 */

import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionCard } from "@/components/section-card";
import { sections } from "@/lib/sections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <section className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden">
        <Image
          src="/images/stock/monaco-harbour.jpg"
          alt="A row of moored superyachts in Port Hercule, Monaco, with the Monte Carlo hillside behind"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/30 to-charcoal/40" />
        <div className="absolute inset-x-0 top-6 lg:top-10 pointer-events-none">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 flex justify-end">
            <Image
              src="/brand/foreland-lighthouse-paper.svg"
              alt="Foreland Marine lighthouse, the publisher of The First Owner's Reference"
              width={54}
              height={54}
              priority
              className="opacity-70 mix-blend-screen pointer-events-auto"
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-start">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 pt-[8dvh] lg:pt-[10dvh] w-full text-paper">
            <h1 className="font-serif font-light text-[clamp(2.75rem,5vw,5rem)] leading-[1.05] tracking-tight max-w-2xl">
              The&nbsp;First<br />
              Owner&rsquo;s<br />
              Reference
            </h1>
            <p
              className="meta mt-8"
              style={{ color: "var(--color-paper)" }}
            >
              1st Edition &middot; September 2026
            </p>
          </div>
        </div>
        <p
          className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 caption max-w-sm text-right"
          style={{ color: "var(--color-paper)" }}
        >
          Photograph: Zoe Jackson. Port Hercule, Monaco.
        </p>
      </section>

      <section className="bg-paper py-20 lg:py-28 border-t border-rule">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="meta-marine mb-3">Preface</p>
              <p className="meta">1st Edition</p>
            </div>
            <div className="lg:col-span-9 space-y-6">
              <p className="font-serif font-light text-2xl lg:text-[2rem] leading-[1.3] tracking-tight text-charcoal max-w-2xl">
                An annual editorial publication on the structural,
                financial, and operational dimensions of first-time
                superyacht acquisition, or rather, how to buy a boat.
              </p>
              <p className="font-serif text-lg lg:text-xl leading-relaxed text-charcoal-soft max-w-2xl">
                Nine chapters: cost of ownership; market structure; how
                the industry works; acquisition; new build and brokerage;
                refit; operations; motor vs.&nbsp;sail; and team to
                assemble before signing.
              </p>
              <p className="font-serif text-lg lg:text-xl leading-relaxed text-charcoal-soft max-w-2xl">
                Material drawn from named industry data, identified
                practitioner sources, and an aggregated archive of managed
                projects. Cited claims. Updated quarterly online,
                republished annually in print, so figures stay current.
                To keep in your pocket.
              </p>
              <p className="font-serif text-lg lg:text-xl leading-relaxed text-charcoal-soft max-w-2xl">
                Written and edited by industry experts. Independently
                funded. Carries no advertising, ever.
              </p>
              <p className="font-serif italic text-base leading-relaxed text-stone max-w-2xl pt-6 mt-2 border-t border-rule">
                N.B. The First Owner&rsquo;s Reference is still being
                written and contributed to, ahead of publication Q4 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="chapters"
        className="bg-paper-deep py-24 lg:py-32"
      >
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif text-headline leading-tight tracking-tight">
              Chapters
            </h2>
            <p className="meta">1st Edition, 2026</p>
          </div>
          <p className="font-serif italic text-lg lg:text-xl leading-relaxed text-charcoal-soft max-w-2xl mb-16">
            Each chapter pairs a lead essay with a data spread, a guest
            opinion from a named contributor, an anonymised case, and a
            one-page checklist to print for meeting notes and further
            reference.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-10 gap-y-12 sm:gap-y-16">
            {sections.map((section) => (
              <SectionCard key={section.slug} section={section} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="meta mb-8">From the editors</p>
            <p className="font-serif text-2xl lg:text-3xl leading-relaxed tracking-tight text-charcoal mb-8">
              A reference written from the other side of the table.
            </p>
            <div className="prose-body max-w-prose text-charcoal-soft">
              <p>
                The superyacht trade press is funded by the yards and brokers
                whose interests it covers. That structure is not a moral
                failing; it is simply how the publications fund themselves.
                The First Owner’s Reference is funded differently and written differently.
                The independence is structural rather than stylistic.
              </p>
              <p>
                It is written for the reader who has recently exited a business
                or come into liquidity, has the means to buy a yacht, and would
                like to do so with full visibility of cost, time, and the
                structure of the conversations ahead. It is published once a
                year, in print and online, by an independent consultancy that
                holds no yard affiliations and takes no broker commissions.
              </p>
              <p>
                The publication is structured in numbered chapters. Each carries
                a lead essay, a data spread, a guest opinion from a named
                contributor, an anonymised case, and a one-page checklist. The
                aim is a calm, evidence-led reference a first-time owner can
                hold alongside the conversations that matter.
              </p>
              <p>
                Read in any order. Run your own numbers through the calculator.
                The independence test, in the closing chapter, is offered for
                application to any adviser under consideration, including the
                publisher.
              </p>
            </div>
            <p className="meta mt-10">
              Jack MacNally &amp; Daniel Marks, Co-editors in Chief
            </p>
          </div>
        </div>
      </section>

      <section className="bg-charcoal text-paper py-24 lg:py-32">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="meta text-paper/60 mb-6">Tool</p>
            <h2 className="font-serif text-headline leading-tight tracking-tight mb-6">
              Run your own numbers.
            </h2>
            <p className="caption text-paper/80 max-w-md mb-8 text-base leading-relaxed">
              The running cost calculator estimates annual operating costs for
              a yacht of your size, type, region, and use intensity. Sources
              named on every assumption. Built on Foreland&rsquo;s own
              operational data alongside MYBA, Pantaenius, and Quay Crew.
            </p>
            <Link
              href="/tools/running-cost-calculator"
              className="inline-block border border-paper/40 hover:border-paper px-6 py-3 meta text-paper transition-colors"
            >
              Open the calculator
            </Link>
          </div>
          <div className="meta text-paper/60 grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 gap-x-8 lg:pl-12 lg:border-l lg:border-paper/20">
            <p>Yacht length</p>
            <p className="text-paper">24m to 60m</p>
            <p>Yacht type</p>
            <p className="text-paper">Sail / Motor</p>
            <p>Use</p>
            <p className="text-paper">Private / Charter</p>
            <p>Region</p>
            <p className="text-paper">8 operating areas</p>
            <p>Intensity</p>
            <p className="text-paper">Light / Moderate / Heavy</p>
            <p>Output</p>
            <p className="text-paper">9 cost categories</p>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="meta mb-6">Print edition</p>
            <h2 className="font-serif text-headline leading-tight tracking-tight mb-6">
              Five hundred copies. Hand numbered.
            </h2>
            <div className="prose-body text-charcoal-soft">
              <p>
                The print edition is casebound, sewn, set on Munken Pure
                eggshell stock, foil stamped on Colorplan boards. Each copy
                is hand numbered and signed on the final page. Distribution is
                curated rather than commercial. We do not sell copies.
              </p>
              <p>
                If you would like one, write to us. Tell us briefly who you
                are and why The First Owner’s Reference is useful to you. We read every
                request.
              </p>
            </div>
            <Link
              href="/request-print-edition"
              className="inline-block mt-8 border border-charcoal hover:border-marine hover:text-marine px-6 py-3 meta transition-colors"
            >
              Request a print copy
            </Link>
          </div>
          <div className="relative aspect-[3/4] bg-stone-soft">
            <Image
              src="/images/stock/explorer-sunset.jpg"
              alt="Explorer-style superyacht at sunset against a Mediterranean headland"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
