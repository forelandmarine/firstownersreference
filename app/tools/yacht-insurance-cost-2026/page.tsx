import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  SITE_URL,
} from "@/lib/jsonld";

const URL = `${SITE_URL}/tools/yacht-insurance-cost-2026`;
const PUBLISHED = "2026-09-09";

export const metadata: Metadata = {
  title: { absolute: "Yacht insurance cost 2026: rates and what drives them" },
  description:
    "Hull and machinery rates, P&I limits, war risk pricing and the deductibles that are negotiable. Sourced, dated, and written by nobody selling the policy.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Yacht insurance cost 2026 | The First Owner's Reference",
    description:
      "Hull rates of 0.7 to 1.5 percent, P&I to USD 500 million, war risk by region, and the four terms worth negotiating at quote stage.",
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht insurance cost 2026",
    description:
      "Hull and machinery rates, P&I limits, war risk pricing, and what is negotiable.",
  },
};

const FAQS = [
  {
    question: "How much does yacht insurance cost per year?",
    answer:
      "Hull and machinery cover on a well-maintained 40 to 50 metre yacht runs 0.7 to 1.5 percent of insured value annually. Smaller yachts and those based in hurricane-exposed regions pay 2 to 5 percent. On a EUR 20 million hull that is roughly EUR 140,000 to EUR 300,000 for the hull line alone, before P&I, war risk, and any charter uplift. Insurance accounts for 10 to 14 percent of total annual operating cost on a typical privately operated yacht.",
  },
  {
    question: "What is a typical hull and machinery rate for a superyacht in 2026?",
    answer:
      "0.7 to 1.5 percent of insured value for a well-maintained 40 to 50 metre yacht. Rates hardened sharply in 2022, with AIG citing 50 to 70 percent increases, after the Lloyd's yacht line ran loss ratios above 100 percent for several consecutive years. Rates stabilised by the first half of 2024. By the fourth quarter of 2025 Gallagher Specialty reported softening of 4 to 7.5 percent for fleets with good loss records. 2026 reads as stable: hull and machinery flat or rising with inflation, and P&I clubs continuing routine 5 percent general increases.",
  },
  {
    question: "Should a yacht be insured on agreed value or actual cash value?",
    answer:
      "Agreed value, and the agreed figure should reflect rebuild cost rather than market value. On an agreed-value policy the sum paid in a total loss is fixed in advance. On actual cash value the insurer pays depreciated market value, which is typically far less. The premium difference is small; the claim difference can run to tens of millions on a large hull. A 50 metre yacht with a EUR 18 million market value may carry a EUR 28 million rebuild cost, and insuring at market value leaves the owner short after a constructive total loss. Verify the figure against a current yard quote.",
  },
  {
    question: "What P&I limit does a superyacht carry?",
    answer:
      "Protection and indemnity cover on the over-30 metre segment is routinely written to a USD 500 million third-party limit. The figure aligns with IMO conventions and the reinsurance market the International Group of P&I Clubs accesses rather than being arbitrary. Shipowners' Club and Steamship Mutual dominate the segment. Claims testing that limit are extremely rare on yachts; the plausible scenarios are major reef damage and significant pollution. One club now offers a USD 1 billion limit as standard, and some offer reduced limits to 25 to 35 metre vessels at premiums reflecting realistic exposure.",
  },
  {
    question: "What does war risk insurance actually cover?",
    answer:
      "Not what most owners assume. War risk cover does not protect the vessel inside designated war risk areas. It covers unexpected damage from riots, uprisings, vandalism or political incident while the yacht is outside high-risk zones. MY Kaos vandalised alongside in Barcelona, and damage during the 2016 Turkish coup attempt, are the reference incidents. Cover is priced per voyage rather than annually. Red Sea transits ran at 0.05 percent of hull value before October 2023, reached 1 percent by early 2024 and peaked at 2 percent. Black Sea Russian ports currently price at 0.65 to 0.80 percent and Ukrainian deep-water ports at 0.45 to 0.55.",
  },
  {
    question: "Which yacht insurance terms are negotiable at quote stage?",
    answer:
      "Four are worth pushing on, per Ollie Davis of PIB Marine. Actual cash value clauses on machinery, increasingly added to yachts five years and older, where documented maintenance logs, oil sample results and manufacturer inspections at prescribed intervals can often persuade underwriters to remove the separate machinery deductible. No claims discounts offered upfront, which are repayable on non-renewal or claim and not normally worth taking. Mast, spars, sails and rigging deductibles, along with inner deductibles on fixtures, emergency towing, tenders and personal effects, most of which are reviewable against the vessel's actual risk profile. And tender-towing terms, where standard templates are often more restrictive than current monitoring technology supports.",
  },
  {
    question: "Did the Bayesian sinking increase yacht insurance rates?",
    answer:
      "Less than expected. The August 2024 loss was insured at USD 150 million and prompted speculation of a fresh hardening cycle that did not materialise. Michelle van der Merwe of Pantaenius, on the record: “I think everyone thought it was going to have more of an impact than it did.” PIB Marine reports no significant rating increases across its large sailing yacht book. The market response landed at survey level rather than rate level, with underwriters requesting risk management surveys that assess crew procedures, training and onboard management rather than fire risk and watertight integrity alone. The contingent risk is whether the investigation attributes fault to the designer or builder, which would reassess underwriter appetite for vessels of the same provenance.",
  },
  {
    question: "Does yacht liability insurance cover sexual misconduct claims?",
    answer:
      "Routinely not. Yacht liability policies commonly exclude sexual misconduct claims, and where the exclusion is enforceable the owner is personally exposed to both the claim and the defence. A 2025 case in which a crew member assaulted in English Harbour, Antigua, aboard a Marshall Islands LLC-owned and St Vincent-flagged yacht, had the vessel arrested at a Fort Lauderdale berth on a US maritime lien, shows the structure: the lien attaches at injury, travels with the vessel, and is exposed the first time she touches a US port. Foreign flag and an offshore holding company do not defeat an in rem arrest. Supplemental cover is available and is arranged with the broker before an incident, not after.",
  },
];

const LINES = [
  {
    line: "Hull and machinery",
    basis: "Annual, percentage of insured value",
    rate: "0.7 to 1.5 percent on a well-maintained 40 to 50m; 2 to 5 percent on smaller yachts and in hurricane-exposed regions",
  },
  {
    line: "Protection and indemnity",
    basis: "Annual",
    rate: "Routinely written to a USD 500 million third-party limit; one club now offers USD 1 billion as standard",
  },
  {
    line: "War risk",
    basis: "Per voyage",
    rate: "Black Sea Russian ports 0.65 to 0.80 percent of hull value; Ukrainian deep-water ports 0.45 to 0.55; Red Sea peaked at 2 percent in 2024",
  },
  {
    line: "Builder's risk",
    basis: "Duration of refit or new build",
    rate: "Normally placed by the yard with the owner's interest noted; verify named-insured status and cover for transit between subcontractor sites",
  },
  {
    line: "Charter operation uplift",
    basis: "Annual, where applicable",
    rate: "Uplift on both hull and P&I; normally coordinated by the charter management company and confirmed by the owner's broker",
  },
];

function datasetSchema() {
  return {
    "@type": "Dataset",
    "@id": `${URL}#dataset`,
    url: URL,
    name: "Yacht insurance rates and cover lines, 2026",
    description:
      "Hull and machinery rates as a percentage of insured value, P&I limits, war risk pricing by region, and the five cover lines carried on a typical over-30 metre yacht. Sourced from named market participants and published market reporting.",
    creator: { "@id": `${SITE_URL}#publisher` },
    publisher: { "@id": `${SITE_URL}#publisher` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    temporalCoverage: "2026",
    variableMeasured: [
      "Hull and machinery rate as percentage of insured value",
      "P&I third-party limit",
      "War risk premium as percentage of hull value per voyage",
    ],
    isBasedOn: [
      { "@type": "CreativeWork", name: "Gallagher Specialty market reporting, Q4 2025", url: "https://www.ajg.com" },
      { "@type": "CreativeWork", name: "PIB Marine, on the record", url: "https://www.pib-insurance.com" },
      { "@type": "CreativeWork", name: "Pantaenius, on the record", url: "https://www.pantaenius.com" },
    ],
    keywords: [
      "yacht insurance cost",
      "superyacht hull and machinery rate",
      "yacht P&I limit",
      "war risk yacht",
      "agreed value yacht insurance",
    ],
  };
}

export default function YachtInsurancePage() {
  return (
    <>
      <JsonLd
        nodes={[
          articleSchema({
            url: URL,
            headline: "Yacht insurance cost 2026: rates and what drives them",
            description:
              "Hull and machinery rates, P&I limits, war risk pricing and the deductibles that are negotiable at quote stage.",
            datePublished: PUBLISHED,
            author: "both",
            articleSection: "Reference tool",
          }),
          datasetSchema(),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Tools", url: `${SITE_URL}/#chapters` },
            { name: "Yacht insurance cost 2026", url: URL },
          ]),
          faqPageSchema(FAQS),
        ]}
      />
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta flex-wrap">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <span>Tools</span>
              <span>/</span>
              <span>Yacht insurance cost 2026</span>
            </div>
            <p className="meta-marine mb-3">Data spread, current to September 2026</p>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Yacht insurance cost in 2026
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Hull and machinery rates, P&amp;I limits, war risk pricing by
              region, and the terms that are negotiable at quote stage. Every
              figure below is dated and attributed, and none of it is published
              by anyone selling the policy.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <p className="meta">Sources</p>
              <ul className="caption space-y-3">
                <li>Gallagher Specialty market reporting, Q4 2025</li>
                <li>Ollie Davis, PIB Marine, on the record</li>
                <li>Michelle van der Merwe, Pantaenius, on the record</li>
                <li>AIG rate commentary, 2022</li>
                <li>Lloyd&rsquo;s marine portfolio reporting</li>
                <li>
                  Adria Notari and Ryan Melogy in{" "}
                  <span className="italic">The Superyacht Report</span>, Q2 2026
                </li>
              </ul>
              <p className="meta pt-6 border-t border-rule">Declared interest</p>
              <p className="caption">
                Foreland Marine takes no commission from any insurance broker or
                underwriter and places no cover. Ollie Davis of PIB Marine is a
                contributor to this edition.
              </p>
              <p className="meta pt-6 border-t border-rule">Updated</p>
              <p className="caption">September 2026</p>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-4 space-y-12">
            <div className="prose-body text-charcoal max-w-prose space-y-5">
              <p>
                Insurance is the most consequential operational decision after
                the captain hire and tends to be taken with the least attention.
                The hull policy alone covers an asset typically worth EUR 10
                million to EUR 200 million, and the broker and the underwriting
                structure behind them determine, at claim time, whether the
                owner is made whole. Insurance accounts for 10 to 14 percent of
                total annual operating cost.
              </p>
              <p>
                The rate a yacht pays is the least interesting number on the
                policy. What matters is the basis of settlement, the limits, and
                the deductible and warranty terms, all of which are set at quote
                stage and are considerably harder to change afterwards.
              </p>
            </div>

            <section className="border-t border-charcoal pt-6">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-6">
                The five lines of cover
              </h2>
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="text-left py-3 meta font-normal">Line</th>
                    <th className="text-left py-3 meta font-normal">Basis</th>
                    <th className="text-left py-3 meta font-normal">Rate or limit</th>
                  </tr>
                </thead>
                <tbody>
                  {LINES.map((l) => (
                    <tr key={l.line} className="border-b border-rule align-top">
                      <td className="py-4 pr-6 font-serif text-charcoal whitespace-nowrap">
                        {l.line}
                      </td>
                      <td className="py-4 pr-6 caption">{l.basis}</td>
                      <td className="py-4 caption">{l.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="border-t border-charcoal pt-6 space-y-5 prose-body text-charcoal max-w-prose">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-2">
                Where the market sits
              </h2>
              <p>
                The hardened market of 2022, with AIG citing 50 to 70 percent
                rate increases, followed sustained Lloyd&rsquo;s marine
                underwriting losses through the mid-2010s. The yacht line ran
                loss ratios above 100 percent for several consecutive years, and
                only around 5 percent of yacht premium written between 2011 and
                2017 returned a profit. Yacht is widely identified as the
                worst-performing segment in the Lloyd&rsquo;s marine portfolio.
              </p>
              <p>
                Rates stabilised by the first half of 2024. By the fourth
                quarter of 2025 Gallagher Specialty reported softening of 4 to
                7.5 percent for fleets with good loss records, and 2026 reads as
                stable. The softening creates one trap for buyers: a yacht
                remarketed by different brokers three or more years running can
                find underwriters declining to quote at all, because the file
                looks shopped.
              </p>
            </section>

            <section className="border-t border-charcoal pt-6 space-y-5 prose-body text-charcoal max-w-prose">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-2">
                The four things worth getting right
              </h2>
              <p>
                Write the hull and machinery policy on agreed value rather than
                actual cash value, and set the agreed figure against rebuild
                cost rather than market value. The premium difference is small
                and the claim difference is measured in tens of millions.
              </p>
              <p>
                Review the policy annually for coverage drift. A change of
                itinerary, the introduction of charter, or a new cruising area
                each trigger different requirements, and a broker who reviews
                proactively at renewal is doing materially different work from
                one who re-quotes last year.
              </p>
              <p>
                Take three quotes from firms with genuine over-30 metre depth.
                Howden and Pantaenius are the two largest brokers in the
                segment; AON Marine, Gallagher Specialty and Marsh are the other
                substantial players, and PIB Insurance Brokers is the
                established UK specialist alternative. The point is the
                discipline of three quotes rather than any particular name.
              </p>
              <p>
                Push back on the deductible and warranty terms, which are
                negotiable more often than templates suggest. The fee
                differential between a yacht-specialist broker and a generalist
                is small; the claim differential can run into eight figures.
              </p>
            </section>

            <section className="border-t border-charcoal pt-6">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-6">
                Questions owners ask
              </h2>
              <div className="space-y-8">
                {FAQS.map((f) => (
                  <div key={f.question}>
                    <h3 className="font-serif text-lg lg:text-xl text-charcoal mb-2">
                      {f.question}
                    </h3>
                    <p className="caption leading-relaxed">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-charcoal pt-6 prose-body text-charcoal max-w-prose space-y-5">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-2">
                Read alongside
              </h2>
              <p>
                <Link href="/07-operations" className="link-marine">
                  Chapter 07, Operations
                </Link>{" "}
                carries the full treatment, including the underwriting that sits
                behind the broker and the five cover lines in detail.{" "}
                <Link href="/07-operations/qa/ollie-davis" className="link-marine">
                  Ollie Davis of PIB Marine
                </Link>{" "}
                answers five questions on the post-Bayesian market on the
                record. The{" "}
                <Link href="/tools/running-cost-calculator" className="link-marine">
                  running cost calculator
                </Link>{" "}
                carries insurance as a line against your own size, type and
                region.
              </p>
            </section>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
