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
          src="/images/stock/jclass-bow.jpg"
          alt="J Class yacht under sail at the St Barths Bucket regatta"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/10 to-charcoal/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 pb-20 w-full text-paper">
            <p className="meta text-paper/80 mb-6">
              An independent annual publication
            </p>
            <h1 className="font-serif font-light text-display leading-[var(--text-display-line-height)] tracking-tight max-w-4xl">
              The First<br />
              Owner&rsquo;s<br />
              Reference
            </h1>
            <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <p className="meta text-paper/80">
                Edition One &middot; September 2026
              </p>
              <p className="caption text-paper/90 max-w-sm">
                Photograph: J Class racing, St Barths Bucket. 17.8995&deg;N
                62.8333&deg;W.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 lg:py-32">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="meta mb-8">From the editor</p>
            <p className="font-serif text-2xl lg:text-3xl leading-relaxed tracking-tight text-charcoal mb-8">
              This Reference exists because the trade press does not.
            </p>
            <div className="prose-body max-w-prose text-charcoal-soft">
              <p>
                The superyacht industry has its glossy magazines. They cover
                charter destinations, owner profiles, the latest Lürssen
                delivery. They are funded by the yards and brokers whose
                interests they cannot critically examine. The Reference is
                not one of them.
              </p>
              <p>
                It is written for the reader who has just exited a business,
                has the means to buy a yacht, and would like to do so without
                being fleeced. It is published once a year, in print and
                online, by an independent consultancy that holds no yard
                affiliations and takes no broker commissions. The independence
                is structural, not stylistic.
              </p>
              <p>
                Eight sections. Each carries a lead essay, a data spread, a
                guest opinion from a named contributor, an anonymised case,
                and a one-page checklist. Together they form the field manual
                a first-time owner would benefit from holding before the
                conversations that matter.
              </p>
              <p>
                Read in any order. Run your own numbers through the calculator.
                Apply the independence test, in section 8, to any adviser
                under consideration.
              </p>
            </div>
            <p className="meta mt-10">
              Jack Norman, Editor in Chief
            </p>
          </div>
        </div>
      </section>

      <section
        id="sections"
        className="bg-paper-deep py-24 lg:py-32 border-t border-rule"
      >
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          <div className="flex items-baseline justify-between mb-16 border-b border-charcoal pb-6">
            <h2 className="font-serif text-headline leading-tight tracking-tight">
              Eight sections
            </h2>
            <p className="meta">Edition One, 2026</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {sections.map((section) => (
              <SectionCard key={section.slug} section={section} />
            ))}
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
              Open the calculator &rarr;
            </Link>
          </div>
          <div className="meta text-paper/60 grid grid-cols-2 gap-y-4 gap-x-8 lg:pl-12 lg:border-l lg:border-paper/20">
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
                are and why the Reference is useful to you. We read every
                request.
              </p>
            </div>
            <Link
              href="/request-print-edition"
              className="inline-block mt-8 border border-charcoal hover:border-marine hover:text-marine px-6 py-3 meta transition-colors"
            >
              Request a print copy &rarr;
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
