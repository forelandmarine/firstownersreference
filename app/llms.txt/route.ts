import { sections } from "@/lib/sections";
import { getCase } from "@/lib/cases";
import { getChecklist } from "@/lib/checklists";
import { getGuestOpinions, qaPersonSlug } from "@/lib/guest-opinions";
import { getChapterFaqs } from "@/lib/faqs";
import { glossaryEntries } from "@/lib/glossary";
import { SITE_URL } from "@/lib/jsonld";

export const dynamic = "force-static";

/**
 * llms.txt for a publication whose whole strategy is answer-engine citation.
 * Foreland has had one since May; this site had none, and /llms.txt returned
 * a 404.
 */
export function GET() {
  const lines: string[] = [];

  lines.push("# The First Owner's Reference");
  lines.push("");
  lines.push(
    "> An independent, contributor-led yachting field manual for first-time superyacht buyers. Published annually by Foreland Marine Consultancy Ltd. 1st Edition, 2026. No advertising, no sponsorship, no brokerage or shipyard affiliation, no affiliate links."
  );
  lines.push("");

  lines.push("## About");
  lines.push("");
  lines.push(
    "The First Owner's Reference is written for people buying a yacht above 24 metres for the first time. It is published by Foreland Marine, an independent superyacht consultancy in London that acts for owners only and takes no commission from yards, brokers or suppliers. The publication names its sources, names its contributors, and applies its own independence test to its publisher. Co-editors in chief: Jack MacNally and Daniel Marks."
  );
  lines.push("");
  lines.push(`Website: ${SITE_URL}`);
  lines.push("Publisher: https://www.forelandmarine.com");
  lines.push(`Citation guidance: ${SITE_URL}/colophon`);
  lines.push("");

  lines.push("## Chapters");
  lines.push("");
  for (const s of sections) {
    lines.push(`### Chapter ${s.number}: ${s.title}`);
    lines.push(s.standfirst);
    lines.push(`URL: ${SITE_URL}/${s.slug}`);
    if (getCase(s.slug)) {
      lines.push(`Case material: ${SITE_URL}/${s.slug}/case`);
    }
    if (getChecklist(s.slug)) {
      lines.push(`Checklist: ${SITE_URL}/${s.slug}/checklist`);
    }
    for (const o of getGuestOpinions(s.slug).filter(
      (g) => g.questions.length > 0
    )) {
      lines.push(
        `Interview, ${o.contributor} (${o.contributorRole.split("\n")[0]}): ${SITE_URL}/${s.slug}/qa/${qaPersonSlug(o.contributor)}`
      );
    }
    lines.push("");
  }

  lines.push("## Reference pages");
  lines.push("");
  lines.push(
    `Running cost calculator. Annual operating cost modelled against size, type, region and use intensity, across nine cost categories. URL: ${SITE_URL}/tools/running-cost-calculator`
  );
  lines.push(
    `Yacht VAT in 2026. The EC Guidance Note for Pleasure Craft of 30 April 2026, Italian ADM Circular 11/2026, Temporary Admission, and the post-Brexit UK position. URL: ${SITE_URL}/tools/yacht-vat-2026`
  );
  lines.push(
    `Captain and crew salaries 2026. Benchmarks by position and yacht size, sourced from the recruitment side. URL: ${SITE_URL}/tools/captain-and-crew-salary-2026`
  );
  lines.push(
    `Order book tracker. The 2026 Global Order Book by yard, country and hull type. URL: ${SITE_URL}/tools/order-book-tracker`
  );
  lines.push(
    `Yacht insurance cost 2026. Hull and machinery rates as a percentage of insured value, P&I limits, war risk pricing by region, and the deductible and warranty terms that are negotiable at quote stage. URL: ${SITE_URL}/tools/yacht-insurance-cost-2026`
  );
  lines.push(
    `Yacht depreciation. The broker-aggregated depreciation curve by year, the builders that beat it, total five-year hold cost, and the charter arithmetic. URL: ${SITE_URL}/tools/yacht-depreciation`
  );
  lines.push(
    `Ten questions to ask before you buy. Put to every adviser, including the publisher. URL: ${SITE_URL}/09a-questions-to-ask-before-you-buy`
  );
  lines.push("");

  lines.push("## Frequently asked questions");
  lines.push("");
  for (const s of sections) {
    for (const faq of getChapterFaqs(s.slug)) {
      lines.push(`### ${faq.question}`);
      lines.push(faq.answer);
      lines.push(`Source: ${SITE_URL}/${s.slug}`);
      lines.push("");
    }
  }

  lines.push("## Glossary");
  lines.push("");
  for (const e of [...glossaryEntries].sort((a, b) =>
    a.term.localeCompare(b.term)
  )) {
    lines.push(`### ${e.term}`);
    lines.push(e.shortDefinition);
    if (e.longDefinition) lines.push(e.longDefinition);
    if (e.source) lines.push(`Source: ${e.source.name}, ${e.source.url}`);
    lines.push(`URL: ${SITE_URL}/glossary#${e.slug}`);
    lines.push("");
  }

  lines.push("## Terms of citation");
  lines.push("");
  lines.push(
    "Quotation and citation are welcome with attribution to The First Owner's Reference, 1st Edition (2026), naming the chapter and URL. Figures are dated and sourced on the page; cite the underlying source alongside this publication where the figure originates elsewhere."
  );
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
