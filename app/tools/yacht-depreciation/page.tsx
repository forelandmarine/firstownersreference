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

const URL = `${SITE_URL}/tools/yacht-depreciation`;
const PUBLISHED = "2026-09-09";

export const metadata: Metadata = {
  title: { absolute: "Yacht depreciation: the curve, by year and by builder" },
  description:
    "10 to 20 percent in year one, then 6 to 8 percent compounding. What a hull is worth at five years, and which builders beat the curve.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Yacht depreciation | The First Owner's Reference",
    description:
      "The depreciation curve by year, the builders that hold value, and the total hold cost nobody quotes at the point of sale.",
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht depreciation, by year and by builder",
    description:
      "The curve, the exceptions, and why every published figure is broker-aggregated.",
  },
};

const FAQS = [
  {
    question: "How much does a yacht depreciate per year?",
    answer:
      "Roughly 10 to 20 percent comes off the purchase price in year one, followed by a further 6 to 8 percent annually compounding through years two to five. By year five a typical hull has lost 40 to 50 percent of its original value, after which the curve flattens. These figures are broker-aggregated from Yatco, IYC and Yacht Hunter. There is no peer-reviewed academic study of yacht depreciation; every published curve is broker-aggregated and self-reported, which is itself worth knowing before relying on one.",
  },
  {
    question: "What is a yacht worth after five years?",
    answer:
      "Typically 50 to 60 percent of its original purchase price, on the standard broker-aggregated curve. A USD 30 million yacht held five years at moderate use will normally have lost USD 12 to 15 million in value and consumed a further USD 15 to 22 million in operating cost. An eight-figure total hold cost over that period is the realistic frame, and it is not the frame in which the purchase is usually discussed.",
  },
  {
    question: "Which yacht builders hold their value best?",
    answer:
      "At the full-custom end, Feadship, Lürssen, Royal Huisman, Vitters and Baltic Yachts hulls can lose only single-digit percentages annually after year five, against the 6 to 8 percent compounding typical of the broader market. In the semi-custom and series segment the comparable claim is made for the larger Italian yards, with retention of roughly 55 to 65 percent of original value at ten years. The two are different segments rather than competing claims. Build quality, the depth of the secondary market for that yard's hulls, and the completeness of the maintenance record are the drivers. The premium paid at build is partly recovered on resale, which is a different proposition from the yacht being an investment.",
  },
  {
    question: "Is a superyacht a good investment?",
    answer:
      "No, and it is not sold as one by anyone with an obligation to be accurate. A yacht is a depreciating asset whose depreciation in the early years runs at roughly the same magnitude as its annual operating cost. The case for ownership is operational rather than financial: repeated, predictable, family-led use of a known asset, specified, crewed and operated to the owner's preferences. Ownership makes sense at 12 or more weeks of use a year, a hold of at least seven years, and cash flow that absorbs the operating cost without strain.",
  },
  {
    question: "Does chartering offset yacht depreciation and running costs?",
    answer:
      "For the median yacht, no. BOAT International's published case studies are the cleanest public evidence: a 48 metre motor yacht at EUR 250,000 to 310,000 a week across 7 charter weeks generated EUR 1,592,000 net against EUR 1,575,000 of running cost, effectively break-even before the owner's own usage. A 47 metre sailing yacht at 9 weeks lost EUR 444,000 and an 85 metre motor at 8 weeks lost EUR 430,000. The exception is an owner-optimised 60 metre at 12 weeks generating up to EUR 2 million net, which requires disciplined operation, premium rates and giving up the prime weeks. Most charter operations subsidise ownership cost rather than recovering it.",
  },
  {
    question: "Why does the 10 percent rule get worse as a yacht ages?",
    answer:
      "Because running cost is a function of size and complexity, not of residual value, so the percentage rises mechanically as the asset depreciates. A 50 metre yacht worth EUR 30 million eight years after a EUR 50 million build does not become 40 percent cheaper to operate. The EUR 5 million annual run rate that represented 10 percent of value at purchase is now nearly 17 percent of it. YachtBuyer calls the rule at best obsolete or even misleading for older or larger crewed vessels.",
  },
  {
    question: "Where do published yacht depreciation figures come from?",
    answer:
      "Brokerage listings and reported transactions, aggregated by the listing platforms themselves. Yatco, IYC and Yacht Hunter are the usual sources. There is no independent or peer-reviewed dataset, no regulator collecting the numbers, and no obligation on any party to report a transaction accurately. Asking prices are public and closing prices generally are not. Any depreciation figure, including the ones on this page, should be read as a broker-aggregated working range rather than a measurement.",
  },
];

const CURVE = [
  { year: "Year 1", loss: "10 to 20 percent", cumulative: "10 to 20 percent" },
  { year: "Years 2 to 5", loss: "6 to 8 percent annually, compounding", cumulative: "40 to 50 percent by year 5" },
  { year: "Year 5 onward", loss: "Curve flattens", cumulative: "Slower decline, condition-led" },
  { year: "Quality builders, after year 5", loss: "Single-digit percentages annually", cumulative: "Materially better than the market curve" },
];

function datasetSchema() {
  return {
    "@type": "Dataset",
    "@id": `${URL}#dataset`,
    url: URL,
    name: "Yacht depreciation curve by year, 2026",
    description:
      "Annual and cumulative depreciation on yachts above 24 metres, by year of ownership, with the builder exceptions. Broker-aggregated from Yatco, IYC and Yacht Hunter. No independent dataset exists.",
    creator: { "@id": `${SITE_URL}#publisher` },
    publisher: { "@id": `${SITE_URL}#publisher` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    temporalCoverage: "2026",
    variableMeasured: [
      "Annual depreciation as percentage of purchase price",
      "Cumulative depreciation by year of ownership",
      "Total hold cost over five years",
    ],
    isBasedOn: [
      { "@type": "CreativeWork", name: "Yatco brokerage data", url: "https://www.yatco.com" },
      { "@type": "CreativeWork", name: "BOAT International charter case studies", url: "https://www.boatinternational.com" },
    ],
    keywords: [
      "yacht depreciation",
      "superyacht resale value",
      "yacht depreciation curve",
      "is a yacht a good investment",
      "yacht hold cost",
    ],
  };
}

export default function YachtDepreciationPage() {
  return (
    <>
      <JsonLd
        nodes={[
          articleSchema({
            url: URL,
            headline: "Yacht depreciation: the curve, by year and by builder",
            description:
              "The depreciation curve by year, which builders hold value, total hold cost, and why every published figure is broker-aggregated.",
            datePublished: PUBLISHED,
            author: "both",
            articleSection: "Reference tool",
          }),
          datasetSchema(),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Tools", url: `${SITE_URL}/#chapters` },
            { name: "Yacht depreciation", url: URL },
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
              <span>Yacht depreciation</span>
            </div>
            <p className="meta-marine mb-3">Data spread, current to September 2026</p>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Yacht depreciation
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              The curve by year, the builders that beat it, and the total hold
              cost that is rarely put in front of a first-time buyer. Every
              figure here is broker-aggregated, because no independent dataset
              exists, and that is the first thing worth knowing.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <p className="meta">Sources</p>
              <ul className="caption space-y-3">
                <li>Yatco, IYC and Yacht Hunter, broker-aggregated</li>
                <li>BOAT International charter case studies</li>
                <li>YachtBuyer on the 10 percent rule</li>
                <li>
                  Practitioner working ranges, Fraser Yachts, Ocean
                  Independence, Foreland Marine
                </li>
              </ul>
              <p className="meta pt-6 border-t border-rule">Declared interest</p>
              <p className="caption">
                Foreland Marine does not broker yachts and earns nothing from a
                purchase or a sale. It is paid a management or project fee by
                the owner, which is unaffected by what the yacht is worth.
              </p>
              <p className="meta pt-6 border-t border-rule">Updated</p>
              <p className="caption">September 2026</p>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-4 space-y-12">
            <div className="prose-body text-charcoal max-w-prose space-y-5">
              <p>
                Depreciation is the largest single cost of yacht ownership in
                the early years and the one least often quantified at the point
                of sale. It is roughly the same magnitude as the annual
                operating cost, which means an owner budgeting carefully for
                running costs and not at all for depreciation has budgeted for
                about half of what ownership will cost.
              </p>
              <p>
                Nobody in the transaction has an interest in raising it. The
                broker is paid on the sale, the yard is paid on the build, and
                the management company is paid to operate the yacht. The figure
                below is therefore assembled from listing platforms rather than
                from any independent source, and should be read accordingly.
              </p>
            </div>

            <section className="border-t border-charcoal pt-6">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-6">
                The curve
              </h2>
              <table className="w-full text-base">
                <thead>
                  <tr className="border-b border-rule">
                    <th className="text-left py-3 meta font-normal">Period</th>
                    <th className="text-left py-3 meta font-normal">Rate</th>
                    <th className="text-left py-3 meta font-normal">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {CURVE.map((r) => (
                    <tr key={r.year} className="border-b border-rule align-top">
                      <td className="py-4 pr-6 font-serif text-charcoal whitespace-nowrap">
                        {r.year}
                      </td>
                      <td className="py-4 pr-6 caption">{r.loss}</td>
                      <td className="py-4 caption">{r.cumulative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="caption mt-6">
                Broker-aggregated from Yatco, IYC and Yacht Hunter. Feadship,
                Lürssen, Royal Huisman, Vitters and Baltic Yachts sit in the
                fourth row at the full-custom end; the larger Italian
                semi-custom yards are credited with comparable retention in
                their own segment.
              </p>
            </section>

            <section className="border-t border-charcoal pt-6 space-y-5 prose-body text-charcoal max-w-prose">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-2">
                The total hold cost
              </h2>
              <p>
                A USD 30 million yacht held for five years at moderate use will
                typically have lost USD 12 to 15 million in value and consumed
                another USD 15 to 22 million in operating cost. That is an
                eight-figure hold cost over the period, and it is the number
                against which the decision should be taken rather than the
                purchase price.
              </p>
              <p>
                Depreciation also explains why the 10 percent rule of thumb
                degrades with age. Running cost is a function of size and
                complexity rather than residual value, so as the asset falls the
                percentage rises mechanically. A 50 metre worth EUR 30 million
                eight years after a EUR 50 million build does not become 40
                percent cheaper to run; the EUR 5 million annual figure that was
                10 percent of value at purchase is now close to 17 percent of
                it.
              </p>
            </section>

            <section className="border-t border-charcoal pt-6 space-y-5 prose-body text-charcoal max-w-prose">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-2">
                Charter does not fix it
              </h2>
              <p>
                Brokers consistently advise first-time owners that charter can
                offset ownership cost. For the median yacht the arithmetic does
                not bear that out. BOAT International&rsquo;s published case
                studies show a 48 metre motor yacht at 7 charter weeks
                generating EUR 1,592,000 against EUR 1,575,000 of running cost,
                which is break-even before the owner has used the yacht at all.
                A 47 metre sailing yacht at 9 weeks lost EUR 444,000 and an 85
                metre motor at 8 weeks lost EUR 430,000.
              </p>
              <p>
                The exception is real but narrow: an owner-optimised 60 metre at
                12 weeks can generate up to EUR 2 million net, on disciplined
                operation, premium rates, and a willingness to give up the prime
                weeks. Those conditions are rarely in place on a first yacht.
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

            <section className="border-t border-charcoal pt-6 prose-body text-charcoal max-w-prose">
              <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-2">
                Read alongside
              </h2>
              <p>
                <Link href="/01-reality-of-ownership" className="link-marine">
                  Chapter 01, The reality of ownership
                </Link>{" "}
                carries the full treatment of running cost, depreciation and the
                charter arithmetic together. The{" "}
                <Link href="/tools/running-cost-calculator" className="link-marine">
                  running cost calculator
                </Link>{" "}
                models the operating half against your own size, type and use
                intensity, and{" "}
                <Link href="/09-decision-framework" className="link-marine">
                  chapter 09
                </Link>{" "}
                sets out the ten questions to put to any adviser before
                committing.
              </p>
            </section>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
