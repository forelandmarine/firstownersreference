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

const URL = `${SITE_URL}/tools/captain-and-crew-salary-2026`;
const PUBLISHED = "2026-05-04";

export const metadata: Metadata = {
  title: "Yacht captain and crew salary 2026 by yacht size",
  description:
    "Yacht captain salary 2026, plus chief officer, chief engineer, ETO, purser, chef, stew, deckhand, by yacht length band. Sourced from YPI Crew, Quay Crew, MLC. Updated May 2026.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Yacht captain and crew salary 2026 | The First Owner's Reference",
    description:
      "Captain and crew salary 2026 by yacht size. Sourced from YPI Crew, Quay Crew, MLC. Updated May 2026.",
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht captain and crew salary 2026",
    description: "Sourced from YPI Crew, Quay Crew, MLC. Updated May 2026.",
  },
};

const FAQS = [
  {
    question: "What does a 50m yacht captain earn in 2026?",
    answer:
      "Per the YPI Crew 2026 salary guide, a captain on a 50 metre yacht earns EUR 10,000 to 16,000 per month (EUR 120,000 to 192,000 per year). The range reflects experience, flag, charter activity, and rotation arrangement. Quay Crew's 2025 captain survey records a 7 percent year-on-year increase across the 70 to 79 metre bracket and confirms 63 percent of captains are now on time-for-time rotation. Senior officers are the bottleneck of the industry; their pay continues to rise where junior crew has plateaued.",
  },
  {
    question: "How many crew does a 50m yacht need?",
    answer:
      "A 50 metre motor yacht typically carries 12 to 16 crew. A 50 metre sailing yacht carries 9 to 12. Manning levels are set by the flag state's Minimum Safe Manning Certificate, which considers tonnage, crew accommodation, propulsion, and operational profile. Senior officers require Certificates of Competency and STCW endorsements; all crew require STCW Basic Safety Training. Charter operation typically increases the crew count.",
  },
  {
    question: "What does a yacht crew cost per year?",
    answer:
      "On a 50 metre motor yacht with 14 crew operated privately at moderate use, total annual crew cost typically runs EUR 1.5 to 2.4 million inclusive of salaries, training, social costs, uniforms, recruitment, and rotation cover. Crew accounts for 30 to 40 percent of total annual operating cost. Charter operation, larger yacht size, and time-for-time rotation arrangements push the figure higher.",
  },
  {
    question: "What is time-for-time rotation in yacht crew?",
    answer:
      "Time-for-time (or 1:1) rotation is the arrangement under which a crew member works for a defined period (typically two months) and is off for an equivalent period. It requires hiring a rotation counterpart for the same role. Quay Crew's 2025 captain survey records 63 percent of captains on rotation, up materially from 2020. Rotation has become standard for senior crew on yachts above 50 metres. The economic effect is roughly two crew salaries for the equivalent of one full-time post.",
  },
  {
    question: "Are yacht crew salaries rising in 2026?",
    answer:
      "Senior crew salaries are rising; junior crew salaries have plateaued. Quay Crew records a 7 percent year-on-year increase in captain pay in the 70 to 79 metre bracket. The structural cause is the bottleneck at senior level: experienced captains, chief engineers, and chief officers are scarce relative to the order book delivering through 2027 to 2029. Junior deck and interior crew are increasingly trained to a baseline standard that is widely available.",
  },
];

const ROLES = [
  {
    role: "Captain",
    bands: [
      { length: "30m", monthly: "EUR 7,000 to 10,000" },
      { length: "40m", monthly: "EUR 9,000 to 13,000" },
      { length: "50m", monthly: "EUR 10,000 to 16,000" },
      { length: "60m", monthly: "EUR 12,000 to 18,000" },
      { length: "70m", monthly: "EUR 14,000 to 21,000" },
      { length: "80m", monthly: "EUR 16,000 to 23,000" },
      { length: "100m+", monthly: "EUR 22,000 to 30,000+" },
    ],
  },
  {
    role: "Chief Officer",
    bands: [
      { length: "30m", monthly: "EUR 5,000 to 7,000" },
      { length: "40m", monthly: "EUR 6,000 to 8,500" },
      { length: "50m", monthly: "EUR 7,500 to 10,000" },
      { length: "60m", monthly: "EUR 8,500 to 11,500" },
      { length: "70m", monthly: "EUR 9,500 to 12,500" },
      { length: "80m+", monthly: "EUR 10,500 to 14,000" },
    ],
  },
  {
    role: "Chief Engineer (Y4 to Y1)",
    bands: [
      { length: "30m", monthly: "EUR 6,000 to 8,500" },
      { length: "40m", monthly: "EUR 7,500 to 10,500" },
      { length: "50m", monthly: "EUR 9,000 to 13,000" },
      { length: "60m", monthly: "EUR 11,000 to 15,000" },
      { length: "70m", monthly: "EUR 13,000 to 17,500" },
      { length: "80m+", monthly: "EUR 15,000 to 20,000" },
    ],
  },
  {
    role: "ETO (Electrotechnical Officer)",
    bands: [
      { length: "50m", monthly: "EUR 6,000 to 8,500" },
      { length: "60m", monthly: "EUR 7,000 to 9,500" },
      { length: "70m+", monthly: "EUR 8,000 to 11,000" },
    ],
  },
  {
    role: "Purser",
    bands: [
      { length: "50m", monthly: "EUR 6,000 to 8,500" },
      { length: "60m", monthly: "EUR 7,000 to 9,500" },
      { length: "70m+", monthly: "EUR 8,500 to 11,500" },
    ],
  },
  {
    role: "Head Chef",
    bands: [
      { length: "30m", monthly: "EUR 5,500 to 7,500" },
      { length: "40m", monthly: "EUR 6,500 to 9,000" },
      { length: "50m", monthly: "EUR 7,500 to 11,000" },
      { length: "60m+", monthly: "EUR 9,000 to 14,000" },
    ],
  },
  {
    role: "Chief Stewardess",
    bands: [
      { length: "30m", monthly: "EUR 4,500 to 6,500" },
      { length: "40m", monthly: "EUR 5,500 to 7,500" },
      { length: "50m", monthly: "EUR 6,500 to 9,000" },
      { length: "60m+", monthly: "EUR 7,500 to 10,500" },
    ],
  },
  {
    role: "Bosun",
    bands: [
      { length: "40m", monthly: "EUR 4,500 to 6,000" },
      { length: "50m", monthly: "EUR 5,000 to 6,500" },
      { length: "60m+", monthly: "EUR 5,500 to 7,500" },
    ],
  },
  {
    role: "Deckhand",
    bands: [
      { length: "30m+", monthly: "EUR 3,000 to 4,500" },
      { length: "60m+", monthly: "EUR 3,500 to 5,000" },
    ],
  },
  {
    role: "Junior Stewardess",
    bands: [
      { length: "30m+", monthly: "EUR 3,000 to 4,500" },
      { length: "60m+", monthly: "EUR 3,500 to 5,000" },
    ],
  },
];

function datasetSchema() {
  return {
    "@type": "Dataset",
    "@id": `${URL}#dataset`,
    url: URL,
    name: "Yacht captain and crew salary bands by yacht length, 2026",
    description:
      "Monthly salary bands by role and yacht length, sourced from YPI Crew 2026 salary guide and Quay Crew 2025 captain survey. Aggregated and triangulated against Foreland Marine practitioner data.",
    creator: { "@id": `${SITE_URL}#publisher` },
    publisher: { "@id": `${SITE_URL}#publisher` },
    license: "https://creativecommons.org/licenses/by/4.0/",
    isAccessibleForFree: true,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    spatialCoverage: "Mediterranean and Caribbean charter regions",
    temporalCoverage: "2026",
    keywords: [
      "yacht captain salary",
      "superyacht crew salary",
      "yacht crew cost",
      "MLC compliance",
      "Quay Crew",
      "YPI Crew",
    ],
  };
}

export default function CaptainSalaryPage() {
  return (
    <>
      <JsonLd
        nodes={[
          articleSchema({
            url: URL,
            headline: "Yacht captain and crew salary 2026 by yacht size",
            description:
              "Captain and crew salary by role and yacht length. Sourced from YPI Crew 2026 and Quay Crew 2025.",
            datePublished: PUBLISHED,
            author: "both",
            articleSection: "Reference tool",
          }),
          datasetSchema(),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Tools", url: `${SITE_URL}/#chapters` },
            { name: "Captain and crew salary 2026", url: URL },
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
              <span>Captain and crew salary 2026</span>
            </div>
            <p className="meta-marine mb-3">Data spread, current to May 2026</p>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Yacht captain and crew salary 2026
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Monthly salary bands by role and yacht length. Sourced from YPI
              Crew 2026 salary guide and Quay Crew 2025 captain survey,
              triangulated against aggregated Foreland Marine practitioner data
              across managed projects.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <p className="meta">Sources</p>
              <ul className="caption space-y-3">
                <li>
                  <a
                    href="https://www.ypicrew.com/yacht-crew-salary-guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-marine"
                  >
                    YPI Crew Salary Guide 2026
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.quaycrew.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-marine"
                  >
                    Quay Crew Captain Survey 2025
                  </a>
                </li>
                <li>MLC 2006 manning provisions</li>
                <li>Foreland Marine practitioner data, anonymised</li>
              </ul>
              <p className="meta pt-6 border-t border-rule">Updated</p>
              <p className="caption">May 2026</p>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-4 space-y-12">
            <div className="prose-body text-charcoal max-w-prose">
              <p>
                Salary bands below reflect monthly gross pay, exclusive of
                social costs, recruitment fees, training, uniforms, and
                rotation cover. Total annual crew cost on a 50 metre motor
                yacht with 14 crew, including all on-costs, typically runs EUR
                1.5 to 2.4 million.
              </p>
              <p>
                Senior officers (captain, chief engineer, chief officer) are
                the bottleneck of the 2026 industry. Quay Crew records a 7
                percent year-on-year rise in captain pay in the 70 to 79 metre
                band, and 63 percent of captains are now on time-for-time
                rotation. Junior crew pay has plateaued.
              </p>
            </div>

            {ROLES.map((role) => (
              <section key={role.role} className="border-t border-charcoal pt-6">
                <h2 className="font-serif text-2xl lg:text-3xl tracking-tight text-charcoal mb-6">
                  {role.role}
                </h2>
                <table className="w-full text-base">
                  <thead>
                    <tr className="meta border-b border-rule">
                      <th className="text-left pb-2 pr-4">Yacht length</th>
                      <th className="text-left pb-2">Monthly gross</th>
                    </tr>
                  </thead>
                  <tbody>
                    {role.bands.map((band, i) => (
                      <tr key={i} className="border-b border-rule">
                        <td className="py-3 pr-4 font-mono text-sm text-charcoal">
                          {band.length}
                        </td>
                        <td className="py-3 font-serif text-charcoal-soft">
                          {band.monthly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}

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
              <p className="meta mb-3">Methodology</p>
              <p className="caption max-w-prose">
                Bands triangulated across YPI Crew 2026 salary guide, Quay Crew
                2025 captain survey, and Foreland Marine&rsquo;s aggregated
                project data anonymised across at least five projects per
                length band. Bands reflect typical Mediterranean and Caribbean
                charter-region private programmes; charter operation,
                rotation, and unusually demanding itineraries push the upper
                end of each band. Updated quarterly. Print edition fixes the
                2026 position as at September 2026.
              </p>
            </section>
          </div>
        </section>

        <SiteFooter />
      </article>
    </>
  );
}
