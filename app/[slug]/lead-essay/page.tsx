import Link from "next/link";
import Image from "next/image";
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
  const essay = getLeadEssay(slug);
  if (!section) return {};
  return {
    title: essay ? essay.title : `${section.title} \u00b7 Lead essay`,
    description: essay?.standfirst ?? section.standfirst,
  };
}

export default async function LeadEssayPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const section = getSection(slug);
  if (!section) notFound();
  const essay = getLeadEssay(slug);

  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-20">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-12 meta">
              <Link href={`/${section.slug}`} className="link">
                Section {section.number} &middot; {section.title}
              </Link>
              <span>/</span>
              <span>Lead essay</span>
            </div>
            <div className="max-w-3xl">
              <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight text-charcoal mb-8">
                {essay?.title ?? section.title}
              </h1>
              <p className="font-serif italic text-xl lg:text-2xl leading-relaxed text-charcoal-soft max-w-2xl mb-10">
                {essay?.standfirst ?? section.standfirst}
              </p>
              <div className="flex items-center gap-6 meta">
                <span>By Foreland Marine</span>
                <span className="text-stone">&middot;</span>
                <span>{essay?.readingTime ?? "12 min read"}</span>
                <span className="text-stone">&middot;</span>
                <span className="meta-marine">{section.coordinates}</span>
              </div>
            </div>
          </div>
        </header>

        {!essay ? (
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-24">
            <p className="caption max-w-2xl">
              The lead essay for this section is in editorial. Edition One
              ships in September 2026. Section 03, How the industry actually
              works, is the live pilot. <Link href="/03-how-the-industry-works/lead-essay" className="link-marine">Read it.</Link>
            </p>
          </div>
        ) : (
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-6">
                <p className="meta">
                  Section {section.number}
                </p>
                <p className="meta-marine">
                  {section.coordinates}
                </p>
                <div className="rule pt-4 space-y-3">
                  <p className="meta">Sources cited</p>
                  <ol className="space-y-2 caption">
                    <li>
                      <span className="meta-marine mr-1">1</span> MYBA Charter
                      Agreement, 2025 edition.
                    </li>
                    <li>
                      <span className="meta-marine mr-1">2</span> IYBA Yacht
                      Sales Report, Q4 2025.
                    </li>
                    <li>
                      <span className="meta-marine mr-1">3</span> Foreland
                      Marine, aggregated transaction data, 2018 to 2025.
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
                <p className="meta mb-3">Editorial note</p>
                <p className="caption max-w-prose">
                  This essay is the lead piece for section 03 of Edition One.
                  It is followed by a data spread on commission flow, a guest
                  opinion by a yacht lawyer, an anonymised case, and a
                  one-page checklist. Read{" "}
                  <Link href={`/${section.slug}`} className="link-marine">
                    the full section
                  </Link>
                  .
                </p>
              </div>
            </div>
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div className="relative aspect-[3/4] bg-stone-soft">
                  <Image
                    src="/images/raven-cockpit.jpg"
                    alt="Editorial photograph"
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <p className="caption">
                  Photograph: <em>Raven</em>, Baltic 111, on deck.
                  43.5528&deg;N 7.0174&deg;E. Fraser Edwards.
                </p>
                <div className="rule pt-6">
                  <p className="meta mb-3">Continue reading</p>
                  <Link
                    href={`/${section.slug}`}
                    className="font-serif text-lg leading-tight tracking-tight link"
                  >
                    Section index &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </article>

      <SiteFooter />
    </>
  );
}
