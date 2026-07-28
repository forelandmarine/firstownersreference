import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd } from "@/components/json-ld";
import {
  articleSchema,
  breadcrumbSchema,
  datasetSchema,
  faqPageSchema,
  SITE_URL,
} from "@/lib/jsonld";

const URL = `${SITE_URL}/tools/order-book-tracker`;
const PUBLISHED = "2026-07-27";
const QUARTER = "Q3 2026";

export const metadata: Metadata = {
  title: "Superyacht order book tracker: 2026 numbers, quarterly refresh",
  description:
    "A free reference on the global superyacht order book, 24 metres and above. 1,093 yachts on order or in build in the 2026 edition, hull-type composition, production geography, builder rankings, and top-tier slot availability. Refreshed quarterly. Sources cited.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Superyacht order book tracker | The First Owner's Reference",
    description:
      "The global order book in numbers: units, average length and tonnage, hull types, production geography, slot availability. Refreshed quarterly. Sources cited.",
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: "summary_large_image",
    title: "Superyacht order book tracker",
    description:
      "1,093 yachts on order or in build. Units, lengths, hull types, geography, slot availability. Q3 2026.",
  },
};

const FAQS = [
  {
    question: "How many superyachts are on order in 2026?",
    answer:
      "The 2026 BOAT International Global Order Book records 1,093 yachts of 24 metres and above on order or in build, down from 1,138 in the 2025 edition and the second consecutive annual decline by unit count. Average length has risen to 40.8 metres and average tonnage to 551 GT, both the highest ever recorded. The order book is contracting in units while growing in size per yacht.",
  },
  {
    question: "Which country builds the most superyachts?",
    answer:
      "Italy, by a wide margin: 568 units in the 2026 order book, 52 percent of the global total by unit count. Azimut Benetti is ranked first among builders for the 26th consecutive year with 5,924 metres across 163 yachts. The Netherlands is second by tonnage (107,796 GT across 66 units, reflecting much larger average yachts), Turkey third (82,383 GT across 141 units), and Germany fourth by tonnage (78,651 GT across just 18 units, concentrated at the very top of the market).",
  },
  {
    question: "What share of the superyacht order book is sailing yachts?",
    answer:
      "Sailing yachts account for 69 of the 1,093 yachts in the 2026 order book, roughly six percent. Motor yachts dominate at 837 units. The second-largest single category is now the explorer yacht at 101 units, around nine percent of the order book, a compositional shift that receives less coverage than it merits.",
  },
  {
    question: "How long is the wait for a new build slot at a top-tier yard?",
    answer:
      "At the top tier, current published positions run: Lurssen booked through mid-2027 at minimum; Feadship quoting 2028 to 2029; Damen Yachting booked through Q4 2028 or Q1 2029 on certain Yacht Support models; Sanlorenzo extending to Q4 2028 or Q1 2029 on its SX, SD, and Steel ranges. Heesen operates a speculative-build model, which can shorten the wait where a hull in build matches the requirement. Slot availability, not price, is the practical constraint for a buyer entering in 2026.",
  },
];

export default function OrderBookTrackerPage() {
  return (
    <>
      <JsonLd
        nodes={[
          articleSchema({
            url: URL,
            headline:
              "Superyacht order book tracker: 2026 numbers, quarterly refresh",
            description:
              "A free reference on the global superyacht order book, 24 metres and above. Sources cited.",
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            author: "both",
            articleSection: "Reference tool",
          }),
          datasetSchema({
            url: URL,
            name: "Global superyacht order book, headline figures",
            description:
              "Headline figures for the global order book of yachts 24 metres and above: total units, average length and tonnage, hull-type composition, and production geography by country. Compiled from the BOAT International Global Order Book with attribution, refreshed quarterly.",
            dateModified: PUBLISHED,
            temporalCoverage: "2025/2026",
            basedOn: [
              {
                name: "BOAT International Global Order Book 2026",
                url: "https://www.boatinternational.com/boat-pro/global-order-book/global-order-book-2026-report",
              },
            ],
            variablesMeasured: [
              "Yachts on order or in build, 24m+",
              "Average length (m)",
              "Average tonnage (GT)",
              "Units by hull type",
              "Units and tonnage by production country",
            ],
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Tools", url: `${SITE_URL}/#chapters` },
            { name: "Order book tracker", url: URL },
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
              <span>Order book tracker</span>
            </div>
            <p className="meta-marine mb-3">Reference, {QUARTER} refresh</p>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              The order book in numbers
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              A free reference on the global order book for yachts of 24
              metres and above: units, sizes, hull types, production
              geography, and what a delivery slot actually looks like in
              2026. Descriptive, not promotional. Sources named.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <p className="meta">Contents</p>
              <ol className="space-y-2 caption">
                <li>
                  <a href="#headline" className="link">
                    <span className="meta-marine mr-1">1</span> Headline figures
                  </a>
                </li>
                <li>
                  <a href="#composition" className="link">
                    <span className="meta-marine mr-1">2</span> Hull types
                  </a>
                </li>
                <li>
                  <a href="#geography" className="link">
                    <span className="meta-marine mr-1">3</span> Production geography
                  </a>
                </li>
                <li>
                  <a href="#slots" className="link">
                    <span className="meta-marine mr-1">4</span> Slot availability
                  </a>
                </li>
                <li>
                  <a href="#reading" className="link">
                    <span className="meta-marine mr-1">5</span> Reading an order book
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="link">
                    <span className="meta-marine mr-1">6</span> FAQ
                  </a>
                </li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-4 space-y-16">
            <section id="headline" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Fewer yachts, larger yachts
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  The{" "}
                  <Link href="/glossary#global-order-book" className="link-marine">
                    Global Order Book
                  </Link>{" "}
                  compiled annually by BOAT International records 1,093 yachts
                  of 24 metres and above on order or in build in its 2026
                  edition, down from 1,138 in 2025. That is the second
                  consecutive annual decline by unit count. Average length and
                  tonnage moved the other way, to 40.8 metres and 551 GT, the
                  highest recorded. The trade-press claim of a record order
                  book is true only by length and tonnage, not by units.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full caption border-collapse">
                    <caption className="meta text-left mb-3">
                      Headline figures, 24 m and above. Source: BOAT
                      International Global Order Book, 2025 and 2026 editions.
                    </caption>
                    <thead>
                      <tr className="border-b border-charcoal text-left">
                        <th className="py-2 pr-4 font-normal">Metric</th>
                        <th className="py-2 pr-4 font-normal">2025 edition</th>
                        <th className="py-2 pr-4 font-normal">2026 edition</th>
                        <th className="py-2 font-normal">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Yachts on order or in build</td>
                        <td className="py-2 pr-4">1,138</td>
                        <td className="py-2 pr-4">1,093</td>
                        <td className="py-2">Down 45 units</td>
                      </tr>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Average length</td>
                        <td className="py-2 pr-4">39.6 m</td>
                        <td className="py-2 pr-4">40.8 m</td>
                        <td className="py-2">Up 1.2 m</td>
                      </tr>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Average tonnage</td>
                        <td className="py-2 pr-4">529 GT</td>
                        <td className="py-2 pr-4">551 GT</td>
                        <td className="py-2">Up 22 GT</td>
                      </tr>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Italy share, by units</td>
                        <td className="py-2 pr-4">50 percent</td>
                        <td className="py-2 pr-4">52 percent</td>
                        <td className="py-2">Up 2 points</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section id="composition" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Hull types: the quiet rise of the explorer
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  The 2026 order book breaks down as 837 motor yachts, 101
                  explorers, 69 sailing yachts, 63 open yachts, and 23
                  sportfish. The explorer category has consolidated as the
                  second-largest single type at roughly nine percent of the
                  order book, an undercovered shift in composition. Sailing
                  remains around six percent of units.
                </p>
                <p className="caption">
                  Source: BOAT International Global Order Book 2026, hull-type
                  breakdown via BOATPro.
                </p>
              </div>
            </section>

            <section id="geography" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Production geography: Italy by units, the Netherlands by size
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  Italy now accounts for 568 units, 52 percent of the global
                  order book. Azimut Benetti is ranked first among builders
                  for the 26th consecutive year, with 5,924 metres across 163
                  yachts; Sanlorenzo, with Nautor Swan, is second at 4,698
                  metres across 130. The Netherlands is second by tonnage at
                  107,796 GT across only 66 units, which is the statistical
                  signature of the Dutch yards' position at the large custom
                  end. Turkey holds 82,383 GT across 141 units. Germany builds
                  the fewest hulls in the top four, 18 units, for 78,651 GT,
                  output concentrated at the very top of the size range.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full caption border-collapse">
                    <caption className="meta text-left mb-3">
                      Top four production countries, 2026 order book. Source:
                      BOAT International Global Order Book 2026.
                    </caption>
                    <thead>
                      <tr className="border-b border-charcoal text-left">
                        <th className="py-2 pr-4 font-normal">Country</th>
                        <th className="py-2 pr-4 font-normal">Units</th>
                        <th className="py-2 pr-4 font-normal">Tonnage</th>
                        <th className="py-2 font-normal">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Italy</td>
                        <td className="py-2 pr-4">568</td>
                        <td className="py-2 pr-4">Largest by units</td>
                        <td className="py-2">Azimut Benetti first for the 26th consecutive year</td>
                      </tr>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Netherlands</td>
                        <td className="py-2 pr-4">66</td>
                        <td className="py-2 pr-4">107,796 GT</td>
                        <td className="py-2">Second by tonnage, largest average length</td>
                      </tr>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Turkey</td>
                        <td className="py-2 pr-4">141</td>
                        <td className="py-2 pr-4">82,383 GT</td>
                        <td className="py-2">Mid-tier capacity</td>
                      </tr>
                      <tr className="border-b border-rule">
                        <td className="py-2 pr-4">Germany</td>
                        <td className="py-2 pr-4">18</td>
                        <td className="py-2 pr-4">78,651 GT</td>
                        <td className="py-2">Concentrated at the very top</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section id="slots" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Slot availability: the constraint that prices cannot show
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  For a buyer entering in 2026, the practical constraint is
                  not price but the delivery slot. Current published
                  positions: Lurssen is booked through mid-2027 at minimum.
                  Feadship is quoting 2028 to 2029. Damen Yachting's Yacht
                  Support range is booked through Q4 2028 or Q1 2029 on
                  certain models, and Sanlorenzo's SX, SD, and Steel ranges
                  extend to the same horizon. Heesen has operated a
                  speculative-build model since 2023, which can shorten the
                  wait where a hull already in build matches the requirement.
                  Oceanco's delivery of the 111-metre DreAMBoat in 18 months
                  stands as the counter-example of what compressed timelines
                  look like when a yard clears the path.
                </p>
                <p>
                  These positions move quarter by quarter and are exactly the
                  kind of claim a buyer should re-verify directly with the
                  yard.{" "}
                  <Link href="/02-reading-the-market" className="link-marine">
                    Chapter 2
                  </Link>{" "}
                  sets out what the order book means for market timing, and{" "}
                  <Link href="/05-new-build-versus-brokerage" className="link-marine">
                    Chapter 5
                  </Link>{" "}
                  covers how to read a specific yard's pipeline before
                  contracting.
                </p>
              </div>
            </section>

            <section id="reading" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                How to read an order book number
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  Three cautions apply to any order-book figure, including the
                  ones on this page. First, "on order or in build" spans
                  everything from a signed letter of intent to a hull in
                  final outfitting; the number says nothing about how many
                  yachts will deliver on time or at all. Second, unit counts
                  and tonnage tell different stories, as the Italy and
                  Netherlands rows above show; quote one without the other
                  and the picture distorts. Third, a yard's published backlog
                  is a sales instrument as well as a fact, and due diligence
                  on a specific yard's pipeline and financial condition is a
                  contract-stage discipline, not a press-release read.
                </p>
              </div>
            </section>

            <section
              id="faqs"
              className="scroll-mt-24 border-t border-charcoal pt-16"
            >
              <p className="meta-marine mb-3">FAQ</p>
              <details className="group">
                <summary className="flex items-center justify-between gap-6 mb-2 max-w-3xl">
                  <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal group-hover:text-marine transition-colors">
                    Frequently asked
                  </h2>
                  <svg
                    className="shrink-0 w-6 h-6 text-stone transition-transform group-open:rotate-180"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path
                      d="M3 6 L8 11 L13 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </summary>
                <p className="meta mt-2 mb-12">{FAQS.length} questions</p>
                <dl className="space-y-10">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border-t border-rule pt-6">
                      <dt className="font-serif text-xl lg:text-2xl leading-snug tracking-tight text-charcoal mb-4">
                        {faq.question}
                      </dt>
                      <dd className="font-serif text-base lg:text-lg leading-relaxed text-charcoal-soft max-w-prose">
                        {faq.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            </section>

            <section className="border-t border-charcoal pt-10">
              <p className="meta mb-3">A note on currency and attribution</p>
              <p className="caption max-w-prose">
                This tracker is refreshed on each quarterly digital supplement
                (January, April, July, October); this is the {QUARTER}{" "}
                refresh. Order-book unit counts, averages, hull-type and
                country breakdowns are drawn from the{" "}
                <a
                  href="https://www.boatinternational.com/boat-pro/global-order-book/global-order-book-2026-report"
                  className="link-marine"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BOAT International Global Order Book 2026
                </a>
                , which remains the primary compilation for the sector; slot
                positions reflect yard statements published to July 2026. This
                page is descriptive. The First Owner&rsquo;s Reference takes no
                advertising and holds no commercial relationship with any yard
                listed.
              </p>
            </section>
          </div>
        </section>

        <SiteFooter />
      </article>
    </>
  );
}
