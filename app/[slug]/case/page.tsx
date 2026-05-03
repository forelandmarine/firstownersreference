import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubsectionShell } from "@/components/subsection-shell";
import { sections, getSection } from "@/lib/sections";
import { getCase } from "@/lib/cases";

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const section = getSection(slug);
  const study = getCase(slug);
  if (!section || !study) return {};
  return {
    title: `${study.title} | Section ${section.number} case`,
    description: study.standfirst,
  };
}

export default async function CasePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const section = getSection(slug);
  const study = getCase(slug);
  if (!section || !study) notFound();

  return (
    <>
      <SiteHeader />
      <SubsectionShell
        section={section}
        kind="case"
        title={study.title}
        standfirst={study.standfirst}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-6">
              <p className="meta">Case file</p>
              <dl className="rule pt-4 space-y-4">
                {study.meta.map((m, i) => (
                  <div key={i}>
                    <dt className="meta">{m.label}</dt>
                    <dd className="font-serif text-base text-charcoal mt-1">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <div className="prose-body max-w-prose">
              {study.paragraphs.map((p, i) => {
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

            <section className="mt-16 border-t border-charcoal pt-8">
              <h2 className="meta mb-6">What this case shows</h2>
              <ol className="space-y-4 max-w-prose">
                {study.takeaways.map((t, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="meta-marine shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base lg:text-lg leading-relaxed text-charcoal">
                      {t}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-16 rule pt-6">
              <p className="meta mb-3">Disclosure</p>
              <p className="caption max-w-prose">{study.disclosure}</p>
            </section>
          </div>
        </div>
      </SubsectionShell>
      <SiteFooter />
    </>
  );
}
