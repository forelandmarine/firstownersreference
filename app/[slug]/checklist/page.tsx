import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubsectionShell } from "@/components/subsection-shell";
import { sections, getSection } from "@/lib/sections";
import { getChecklist } from "@/lib/checklists";

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const section = getSection(slug);
  const list = getChecklist(slug);
  if (!section || !list) return {};
  return {
    title: `${list.title} | Section ${section.number} checklist`,
    description: list.standfirst,
  };
}

export default async function ChecklistPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const section = getSection(slug);
  const list = getChecklist(slug);
  if (!section || !list) notFound();

  let counter = 0;

  return (
    <>
      <SiteHeader />
      <SubsectionShell
        section={section}
        kind="checklist"
        title={list.title}
        standfirst={list.standfirst}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3 space-y-12">
            <p className="font-serif text-xl leading-relaxed text-charcoal max-w-prose border-l-2 border-marine pl-4">
              {list.intent}
            </p>

            {list.groups.map((group, gi) => (
              <section key={gi} className="space-y-6">
                <header className="border-t border-charcoal pt-4">
                  <p className="meta-marine mb-1">Part {String(gi + 1).padStart(2, "0")}</p>
                  <h2 className="font-serif font-light text-2xl lg:text-3xl tracking-tight text-charcoal">
                    {group.heading}
                  </h2>
                </header>
                <ol className="space-y-6">
                  {group.items.map((item, ii) => {
                    counter += 1;
                    return (
                      <li key={ii} className="flex gap-6 border-b border-rule pb-6">
                        <span className="meta-marine shrink-0 w-10">
                          {String(counter).padStart(2, "0")}
                        </span>
                        <div className="flex-1 max-w-prose space-y-2">
                          <p className="font-serif text-base lg:text-lg leading-relaxed text-charcoal">
                            {item.question}
                          </p>
                          {item.detail && (
                            <p className="caption">{item.detail}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}

            <section className="border-t border-charcoal pt-6">
              <p className="meta mb-3">Print the page</p>
              <p className="caption max-w-prose">{list.printable}</p>
            </section>
          </div>
        </div>
      </SubsectionShell>
      <SiteFooter />
    </>
  );
}
