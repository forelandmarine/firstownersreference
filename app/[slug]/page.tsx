import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sections, getSection } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";

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
  const index = sections.findIndex((s) => s.slug === section.slug);
  const prev = sections[index - 1];
  const next = sections[index + 1];

  return (
    <>
      <SiteHeader />

      <article>
        <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[90dvh]">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[90dvh] order-2 lg:order-1">
            <Image
              src={section.hero}
              alt={`Section ${section.number}: ${section.title}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-between bg-paper px-6 lg:px-16 py-16 lg:py-24">
            <div>
              <p className="meta mb-12">
                Edition One &middot; 2026 &middot; Section
              </p>
              <p className="numeral mb-8">{section.number}</p>
              <h1 className="font-serif font-light text-headline lg:text-[3.5rem] leading-[1.05] tracking-tight text-charcoal mb-8 max-w-xl">
                {section.title}
              </h1>
              <p className="font-serif text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-xl">
                {section.standfirst}
              </p>
              <div className="mt-10">
                <a
                  href="#essay"
                  className="inline-flex items-center gap-2 meta-marine"
                >
                  Read the essay <span aria-hidden>&darr;</span>
                </a>
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

        <section id="essay" className="bg-paper py-20 lg:py-32 border-t border-rule scroll-mt-24">
          {essay ? (
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-2">
                <div className="sticky top-32 space-y-6">
                  <p className="meta">Section {section.number}</p>
                  <p className="meta-marine">{section.coordinates}</p>
                  <div className="rule pt-4 space-y-3">
                    <p className="meta">Section anatomy</p>
                    <ol className="space-y-2 caption">
                      <li>
                        <span className="meta-marine mr-1">1</span> Lead essay
                        (you are here)
                      </li>
                      <li className="opacity-60">
                        <span className="mr-1">2</span> Data spread
                      </li>
                      <li className="opacity-60">
                        <span className="mr-1">3</span> Guest opinion
                      </li>
                      <li className="opacity-60">
                        <span className="mr-1">4</span> Case material
                      </li>
                      <li className="opacity-60">
                        <span className="mr-1">5</span> Checklist
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 lg:col-start-3">
                <div className="prose-body max-w-prose">
                  {essay.paragraphs.map((p, i) => {
                    if (typeof p === "string") {
                      return <p key={i}>{p}</p>;
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
                    return null;
                  })}
                </div>
                <div className="mt-16 rule pt-8">
                  <p className="meta mb-3">Coming up in this section</p>
                  <ul className="space-y-3">
                    <ContentRow
                      label="Data spread"
                      title={dataTitleFor(section.slug)}
                      meta="Charts and tables, sources cited"
                    />
                    <ContentRow
                      label="Guest opinion"
                      title={guestTitleFor(section.slug)}
                      meta={`${section.contributor}, ${section.contributorRole}`}
                    />
                    <ContentRow
                      label="Case material"
                      title={caseTitleFor(section.slug)}
                      meta="Anonymised"
                    />
                    <ContentRow
                      label="Checklist"
                      title="Questions to ask before signing anything."
                      meta="One page, printable"
                    />
                  </ul>
                </div>
              </div>
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32 space-y-8">
                  <div className="relative aspect-[3/4] bg-stone-soft">
                    <Image
                      src={section.hero}
                      alt="Editorial photograph"
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="caption">
                    Photograph by Fraser Edwards. {section.coordinates}.
                  </p>
                </div>
              </aside>
            </div>
          ) : (
            <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
              <p className="caption max-w-2xl">
                The lead essay for this section is in editorial. Edition One
                ships in September 2026.
              </p>
            </div>
          )}
        </section>

        <nav className="border-t border-rule bg-paper-deep py-12">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 flex justify-between items-center gap-6">
            {prev ? (
              <Link href={`/${prev.slug}`} className="group flex flex-col">
                <span className="meta mb-1">
                  &larr; Section {prev.number}
                </span>
                <span className="font-serif text-lg group-hover:text-marine transition-colors">
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
                <span className="meta mb-1">
                  Section {next.number} &rarr;
                </span>
                <span className="font-serif text-lg group-hover:text-marine transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>

      <SiteFooter />
    </>
  );
}

function ContentRow({
  label,
  title,
  meta,
}: {
  label: string;
  title: string;
  meta: string;
}) {
  return (
    <li className="flex items-baseline gap-6 py-3 border-t border-rule opacity-70">
      <span className="meta w-28 shrink-0">{label}</span>
      <div className="flex-1">
        <p className="font-serif text-base leading-snug text-charcoal">
          {title}
        </p>
        <p className="meta mt-1">{meta}</p>
      </div>
      <span className="meta hidden sm:block">Forthcoming</span>
    </li>
  );
}

function dataTitleFor(slug: string): string {
  const map: Record<string, string> = {
    "01-reality-of-ownership":
      "Annual operating cost as a percentage of capex, by size band.",
    "02-reading-the-market": "Order book and yard capacity through 2030.",
    "03-how-the-industry-works":
      "Where the money goes in a typical brokerage transaction.",
    "04-acquisition-process": "VAT regime and flag state comparison.",
    "05-new-build-versus-brokerage":
      "Cashflow and milestone payments, year by year.",
    "06-refit": "Refit yard capacity and typical overrun curve, 2026 to 2028.",
    "07-operations": "Crew salary bands and insurance market commentary.",
    "08-decision-framework":
      "From considering ownership to signing a contract.",
  };
  return map[slug] ?? "Data spread";
}

function guestTitleFor(slug: string): string {
  const map: Record<string, string> = {
    "01-reality-of-ownership": "What first-year owners do not see coming.",
    "02-reading-the-market": "What the data tells you, and what it does not.",
    "03-how-the-industry-works":
      "Dual agency, retrocessions, and disclosure.",
    "04-acquisition-process":
      "What surveys actually catch, and what they miss.",
    "05-new-build-versus-brokerage":
      "What makes a good owner, from the yard's side.",
    "06-refit": "Why refits run over, and why some still end well.",
    "07-operations": "Captain selection, from inside the wheelhouse.",
    "08-decision-framework":
      "Integrating ownership into a wider portfolio.",
  };
  return map[slug] ?? "Guest opinion";
}

function caseTitleFor(slug: string): string {
  const map: Record<string, string> = {
    "01-reality-of-ownership": "The owner who bought twice.",
    "02-reading-the-market":
      "The deal that closed because someone read the market correctly.",
    "03-how-the-industry-works": "The free advice that cost \u00a3400,000.",
    "04-acquisition-process": "The pre-purchase survey that saved \u00a32m.",
    "05-new-build-versus-brokerage": "The spec change in month 18.",
    "06-refit": "The refit that doubled in scope.",
    "07-operations": "The captain hire that defined the next decade.",
    "08-decision-framework": "The buyer who walked away.",
  };
  return map[slug] ?? "Case material";
}
