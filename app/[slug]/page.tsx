import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { sections, getSection } from "@/lib/sections";

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
            </div>
            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-2">
              <p className="meta">Coordinates</p>
              <p className="meta-marine">{section.coordinates}</p>
              <p className="meta">Guest contributor</p>
              <p className="meta text-charcoal">{section.contributor}</p>
              <p className="meta">Role</p>
              <p className="meta text-charcoal">{section.contributorRole}</p>
            </div>
          </div>
        </section>

        <section className="bg-paper py-24 lg:py-32 border-t border-rule">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <p className="meta sticky top-32">
                In this section
              </p>
            </div>
            <div className="lg:col-span-9">
              <ol className="space-y-1">
                <ContentRow
                  label="Lead essay"
                  title="The reality, written without the reverence."
                  meta="Foreland editorial &middot; 14 min read"
                  href={`/${section.slug}/lead-essay`}
                />
                <ContentRow
                  label="Data spread"
                  title={dataTitleFor(section.slug)}
                  meta="Charts and tables &middot; sources cited"
                />
                <ContentRow
                  label="Guest opinion"
                  title={guestTitleFor(section.slug)}
                  meta={`${section.contributor}, ${section.contributorRole} \u00b7 9 min read`}
                />
                <ContentRow
                  label="Case material"
                  title={caseTitleFor(section.slug)}
                  meta="Anonymised &middot; 6 min read"
                />
                <ContentRow
                  label="Checklist"
                  title="Questions to ask before signing anything."
                  meta="One page &middot; printable"
                />
              </ol>
            </div>
          </div>
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
  href,
}: {
  label: string;
  title: string;
  meta: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-baseline gap-8 py-6 border-t border-rule group-hover:border-marine transition-colors">
      <span className="meta w-32 shrink-0">{label}</span>
      <div className="flex-1">
        <p className="font-serif text-xl lg:text-2xl leading-snug tracking-tight text-charcoal group-hover:text-marine transition-colors">
          {title}
        </p>
        <p className="meta mt-2">{meta}</p>
      </div>
      <span className="meta-marine hidden sm:block">
        {href ? "Read \u2192" : "Forthcoming"}
      </span>
    </div>
  );
  return href ? (
    <li>
      <Link href={href} className="group block">
        {Inner}
      </Link>
    </li>
  ) : (
    <li className="group block opacity-60 cursor-default">{Inner}</li>
  );
}

function dataTitleFor(slug: string): string {
  const map: Record<string, string> = {
    "01-reality-of-ownership":
      "Annual operating cost as a percentage of capex, by size band.",
    "02-reading-the-market":
      "Order book and yard capacity through 2030.",
    "03-how-the-industry-works":
      "Where the money goes in a typical brokerage transaction.",
    "04-acquisition-process":
      "VAT regime and flag state comparison.",
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
    "01-reality-of-ownership":
      "What first-year owners do not see coming.",
    "02-reading-the-market":
      "What the data tells you, and what it does not.",
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
    "02-reading-the-market": "The deal that closed because someone read the market correctly.",
    "03-how-the-industry-works": "The free advice that cost \u00a3400,000.",
    "04-acquisition-process": "The pre-purchase survey that saved \u00a32m.",
    "05-new-build-versus-brokerage": "The spec change in month 18.",
    "06-refit": "The refit that doubled in scope.",
    "07-operations": "The captain hire that defined the next decade.",
    "08-decision-framework": "The buyer who walked away.",
  };
  return map[slug] ?? "Case material";
}
