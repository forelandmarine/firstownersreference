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

const URL = `${SITE_URL}/tools/yacht-vat-2026`;
const PUBLISHED = "2026-05-04";
const MODIFIED = "2026-07-27";

export const metadata: Metadata = {
  title: "Yacht VAT 2026: EU rules, Temporary Admission, post-Brexit position",
  description:
    "A current reference on yacht VAT in the EU and UK in 2026, updated for the European Commission Guidance Note of 30 April 2026 and Italian ADM Circular 11/2026. EU VAT-paid status, Temporary Admission, Brexit, Spanish IPR, French Commercial Exemption, Italian charter VAT, the reformed Maltese scheme. Sources cited.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Yacht VAT 2026 | The First Owner's Reference",
    description:
      "A current reference on yacht VAT in the EU and UK in 2026, updated for the April 2026 EC Guidance Note and ADM Circular 11/2026. Sources cited.",
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
  },
  twitter: {
    card: "summary_large_image",
    title: "Yacht VAT 2026",
    description:
      "EU VAT-paid status, Temporary Admission, post-Brexit, Spanish IPR. Current as of July 2026.",
  },
};

const FAQS = [
  {
    question: "Does a yacht's flag determine its EU VAT status?",
    answer:
      "No. EU VAT-paid status attaches to the hull, not the flag. A Maltese-flagged yacht owned by a non-EU SPV is not automatically EU VAT-paid; conversely a Cayman-flagged hull on which import VAT was settled in Italy is EU VAT-paid. Documentary evidence is the importation declaration and VAT receipt. The flag determines the regulatory and operational regime; the customs status of the hull determines the VAT position.",
  },
  {
    question: "How does Temporary Admission work for non-EU yachts?",
    answer:
      "A non-EU registered yacht with non-EU established owner and non-EU established users may cruise EU waters for up to 18 months at a stretch under Temporary Admission, with cumulative use normally capped at 10 years. Commercial charter from EU ports under TA is prohibited. Sale of a yacht under TA inside the EU triggers VAT and duty. The procedure discharges on exit from EU territorial waters; a fresh period runs from the next entry.",
  },
  {
    question: "What did the EU's April 2026 guidance on pleasure craft change?",
    answer:
      "The European Commission Guidance Note for Pleasure Craft (30 April 2026) changes interpretation, not law. It confirms that 'VAT-paid yacht' has no legal standing and the operative concept is Union goods status; that yachts inside EU customs territory are presumed Union goods, with proof requested only on specific doubt; that flag, registration, and owner nationality do not determine VAT status; and that Temporary Admission runs 18 months per stay, normally capped at 10 years cumulative. Italian ADM Circular 11/2026 applies the same reading at national level.",
  },
  {
    question: "Does a yacht need to visit a non-EU port to reset Temporary Admission?",
    answer:
      "No. Under the 2026 guidance and Italian ADM Circular 11/2026, Temporary Admission discharges when the yacht exits EU territorial waters; reaching international waters is sufficient, evidenced by AIS data, logbook entries, or bunker receipts, without a third-country port call. A new 18-month period runs from the next entry, and no minimum time outside the EU is required between periods. The traditional token call at a non-EU port for a customs stamp remains valid evidence but is no longer necessary.",
  },
  {
    question: "What was the Maltese yacht VAT lease scheme and is it still valid?",
    answer:
      "The original Maltese scheme (effective rates as low as 5.4 percent on long-term leases of yachts above 24 metres, on the assumption that 70 percent of use was outside EU territorial waters) drew an EU Commission infringement procedure in March 2018. Malta reformed the guidelines in February 2019 to base reductions on actual use outside EU waters rather than length-based presumption. The Commission closed the Malta infringement on 30 October 2020. The scheme was reformed, not withdrawn; effective-use approaches now apply.",
  },
  {
    question: "Has Brexit changed the VAT position for UK-flag yachts?",
    answer:
      "Yes. From 1 January 2021, UK-flag yachts cruising EU waters lost EU Temporary Admission unless owner and users are non-EU established. UK yachts that were EU VAT-paid before Brexit lost that EU status on becoming non-Union goods; they retain UK VAT-paid status only. The Returned Goods Relief regime allowed re-import to the UK without UK VAT for yachts returning within three years of Brexit, subject to specific conditions. Post-2024 the UK and EU operate as separate customs territories with no automatic mutual recognition of VAT status.",
  },
  {
    question: "What is Spanish Inward Processing Relief for yachts?",
    answer:
      "Spanish IPR is the EU customs regime under which a non-EU-flagged yacht can enter Spain for refit work without triggering EU VAT or import duty, provided the yacht is re-exported on completion. The regime is widely used at MB92 Barcelona, STP Palma, and Astilleros de Mallorca, and equivalents exist in France (Commercial Exemption) and Italy. Independent counsel selects the VAT structure for the specific refit scope.",
  },
  {
    question: "What is the VAT on yacht charters in Italy in 2026?",
    answer:
      "Italian charter VAT is 22 percent standard rate, with pro-rata reduction available for documented international-waters time. From 2025, the Italian VAT representative for a commercial yacht must post a guarantee bond ranging from EUR 30,000 to EUR 2 million depending on number of clients represented. The noleggio occasionale regime, introduced 2005, allows limited commercial charter from a private registration; full commercial registration is required for unrestricted charter activity.",
  },
  {
    question: "How does the EU ETS affect yacht owners in 2026?",
    answer:
      "EU ETS Maritime extends the EU's emissions trading system to shipping. From 2026 the system covers 100 percent of intra-EU emissions and 50 percent of voyages from a non-EU port, applied to commercial vessels above 5,000 GT entering EU ports. Most yachts including 60 to 80 metre motor sit below the 5,000 GT threshold. Above 5,000 GT (110 metre plus motor) the cost runs EUR 200,000 to 400,000 per year at current carbon prices on a well-utilised vessel.",
  },
];

export default function YachtVat2026Page() {
  return (
    <>
      <JsonLd
        nodes={[
          articleSchema({
            url: URL,
            headline:
              "Yacht VAT 2026: EU rules, Temporary Admission, post-Brexit position",
            description:
              "A current reference on yacht VAT in the EU and UK in 2026. Sources cited.",
            datePublished: PUBLISHED,
            dateModified: MODIFIED,
            author: "both",
            articleSection: "Reference tool",
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Tools", url: `${SITE_URL}/#chapters` },
            { name: "Yacht VAT 2026", url: URL },
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
              <span>Yacht VAT 2026</span>
            </div>
            <p className="meta-marine mb-3">Reference, current to July 2026</p>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Yacht VAT 2026
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              A current reference on EU yacht VAT, Temporary Admission, the
              post-Brexit position, Spanish IPR, French Commercial Exemption,
              Italian charter VAT, and the reformed Maltese lease scheme.
              Sources named.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <p className="meta">Contents</p>
              <ol className="space-y-2 caption">
                <li>
                  <a href="#status" className="link">
                    <span className="meta-marine mr-1">1</span> EU VAT-paid status
                  </a>
                </li>
                <li>
                  <a href="#temporary-admission" className="link">
                    <span className="meta-marine mr-1">2</span> Temporary Admission
                  </a>
                </li>
                <li>
                  <a href="#guidance-2026" className="link">
                    <span className="meta-marine mr-1">3</span> The 2026 guidance
                  </a>
                </li>
                <li>
                  <a href="#brexit" className="link">
                    <span className="meta-marine mr-1">4</span> Post-Brexit
                  </a>
                </li>
                <li>
                  <a href="#refit-regimes" className="link">
                    <span className="meta-marine mr-1">5</span> Refit regimes
                  </a>
                </li>
                <li>
                  <a href="#charter-vat" className="link">
                    <span className="meta-marine mr-1">6</span> Charter VAT
                  </a>
                </li>
                <li>
                  <a href="#malta" className="link">
                    <span className="meta-marine mr-1">7</span> Malta reformed
                  </a>
                </li>
                <li>
                  <a href="#eu-ets" className="link">
                    <span className="meta-marine mr-1">8</span> EU ETS
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="link">
                    <span className="meta-marine mr-1">9</span> FAQ
                  </a>
                </li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-4 space-y-16">
            <section id="status" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                EU VAT-paid status attaches to the hull, not the flag
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  The single most common confusion in yacht VAT is the
                  conflation of flag and customs status. EU VAT-paid status
                  (formally Union goods status) attaches to the hull. A
                  Maltese-flagged yacht owned by a non-EU SPV is not
                  automatically EU VAT-paid. A Cayman-flagged hull on which
                  import VAT was settled in Italy is EU VAT-paid.
                </p>
                <p>
                  Documentary evidence is the importation declaration and the
                  VAT receipt. Yachts moving in EU waters without paid status
                  rely on{" "}
                  <Link href="/glossary/temporary-admission" className="link-marine">
                    Temporary Admission
                  </Link>{" "}
                  for the time-limited tax relief.
                </p>
              </div>
            </section>

            <section id="temporary-admission" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Temporary Admission, 18 months at a stretch
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  Temporary Admission permits a non-EU registered yacht with
                  non-EU established owner and users to cruise EU customs
                  territory for a maximum of 18 months in any single period.
                  Aggregate use is capped at up to 10 years cumulative across
                  multiple TA periods.
                </p>
                <p>
                  Commercial charter from EU ports while under TA is prohibited.
                  Sale of a yacht under TA inside the EU triggers VAT and any
                  duty. The procedure discharges when the yacht leaves EU
                  territorial waters; a third-country port call is not
                  required, and proof that the vessel reached international
                  waters (AIS data, log entries, bunker receipts) is
                  sufficient. A fresh 18-month period runs from the next
                  entry, with no minimum time outside the EU required between
                  periods.
                </p>
                <p className="caption">
                  Sources:{" "}
                  <a
                    href="https://taxation-customs.ec.europa.eu/document/download/fa095d6b-45dd-4c7a-94c7-bad21d0473a9_en"
                    className="link-marine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    European Commission Taxation and Customs FAQ on private
                    boats
                  </a>
                  ;{" "}
                  <a
                    href="https://taxation-customs.ec.europa.eu/document/download/8c62e3be-807f-4607-bb1e-9ff46db7d97e_en?filename=Guidance_pleasure_craft.pdf"
                    className="link-marine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    EC Guidance Note for Pleasure Craft, 30 April 2026
                  </a>
                  .
                </p>
              </div>
            </section>

            <section id="guidance-2026" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                The 2026 guidance: Brussels and Rome put it in writing
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  Two documents issued in spring 2026 turned much of the
                  practice described on this page from professional consensus
                  into stated official position. Neither creates new law; both
                  matter because member-state customs officers now have a
                  common text to point to.
                </p>
                <p>
                  The{" "}
                  <a
                    href="https://taxation-customs.ec.europa.eu/document/download/8c62e3be-807f-4607-bb1e-9ff46db7d97e_en?filename=Guidance_pleasure_craft.pdf"
                    className="link-marine"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    European Commission Guidance Note for Pleasure Craft
                  </a>{" "}
                  (DG TAXUD, finalised 30 April 2026, published 11 May 2026)
                  confirms that &ldquo;VAT-paid yacht&rdquo; is an industry
                  term with no standing in EU customs law; the operative
                  concept is Union goods status, exactly as section 1 of this
                  page has it. It states that a yacht inside EU customs
                  territory benefits from a presumption of Union status, and
                  that customs authorities should request proof only where a
                  specific doubt arises rather than systematically. It
                  restates that flag, country of registration, and the
                  owner&rsquo;s residence or nationality do not determine
                  customs or VAT status; that Union status is lost on
                  departure from the customs territory and recoverable within
                  three years under Returned Goods Relief for the same yacht,
                  in the same condition, with the same owner; and that
                  cumulative Temporary Admission use should normally not
                  exceed ten years.
                </p>
                <p>
                  Italian ADM Circular No. 11/2026 (15 May 2026) is the
                  national companion piece for the busiest cruising ground in
                  the Mediterranean. Its clarifications: crossing the
                  12-nautical-mile line places a non-EU yacht under TA without
                  any formal declaration, though lodging an oral declaration
                  on Form 71-01 fixes the entry date, and without one the
                  burden of proving entry and exit dates sits with the owner.
                  Discharge requires only proof of reaching international
                  waters. During a shipyard-held Inward Processing procedure
                  for repair work, time does not count against the 18-month
                  TA clock. A commercial yacht cannot charter under private
                  TA; it must exit EU waters and re-enter presenting the
                  charter contract. Ordinary maintenance under TA requires no
                  customs guarantee; works that alter structure or materially
                  increase value do.
                </p>
                <p>
                  The practical consequence for a first owner: the documentary
                  discipline this page recommends (importation declaration,
                  VAT receipt, log evidence of movements) is now the stated
                  basis on which status questions are resolved, and the
                  informal habit of a token third-country port call to
                  &ldquo;reset the clock&rdquo; has an official, less
                  burdensome replacement.
                </p>
              </div>
            </section>

            <section id="brexit" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                The post-Brexit position
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  From 1 January 2021, UK-flagged yachts that were EU VAT-paid
                  before Brexit lost EU Union goods status on the United
                  Kingdom's exit from the EU customs territory. UK VAT-paid
                  status was retained where applicable; Returned Goods Relief
                  on re-import to the UK was available within a three-year
                  window post-Brexit.
                </p>
                <p>
                  Post-2024, the UK and EU operate as separate customs
                  territories with no automatic mutual recognition of VAT
                  status. UK-resident owners cruising EU waters typically rely
                  on Temporary Admission, on the same terms as any other non-EU
                  yacht.
                </p>
              </div>
            </section>

            <section id="refit-regimes" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Refit regimes: Spanish IPR, French Commercial Exemption,
                Italian
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  <strong>{" "}
                    <Link href="/glossary/spanish-ipr" className="link-marine">
                      Spanish Inward Processing Relief
                    </Link>
                  </strong>{" "}
                  allows a non-EU yacht to enter Spain for refit work without
                  triggering EU VAT or import duty, provided the yacht is
                  re-exported on completion. Used heavily at MB92 Barcelona,
                  STP Palma, and Astilleros de Mallorca.
                </p>
                <p>
                  <strong>French Commercial Exemption</strong> exempts
                  qualifying commercial yachts from VAT on refit, provisioning,
                  and bunkering, subject to documented commercial use and
                  flag-state requirements. Used at Marseille, La Ciotat,
                  Cannes, and Antibes.
                </p>
                <p>
                  <strong>Italian regime</strong> applies VAT on refit at
                  standard rate, with pro-rata reduction for documented
                  international-waters operation under the commercial regime.
                </p>
              </div>
            </section>

            <section id="charter-vat" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Charter VAT: where the charter is enjoyed
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  EU charter VAT is taxed at the place of enjoyment.
                  Length-based reductions (the original Maltese, Cypriot, and
                  Greek schemes) were withdrawn between 2018 and 2020 under EU
                  Commission infringement procedures. Effective-use approaches
                  now apply.
                </p>
                <p>
                  Italian charters carry the 22 percent standard rate with
                  pro-rata reduction for documented international-waters time.
                  From 2025, the Italian VAT representative must post a
                  guarantee bond from EUR 30,000 to EUR 2 million depending on
                  number of clients represented. French and Spanish standard
                  rates apply locally. Maltese charters since the 2019 reform
                  follow effective-use rules.
                </p>
              </div>
            </section>

            <section id="malta" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Malta: reformed, not withdrawn
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  The original Maltese scheme reduced effective VAT on
                  long-term leases of yachts above 24 metres to as low as 5.4
                  percent, on the assumption that 70 percent of use was outside
                  EU territorial waters. In March 2018 the EU Commission opened
                  infringement procedures against Cyprus, Greece, and Malta.
                  Malta reformed the guidelines in February 2019 to base
                  reductions on actual use outside EU waters rather than
                  length-based presumption. The Commission closed the Malta
                  infringement on 30 October 2020.
                </p>
                <p>
                  The scheme was reformed, not withdrawn. The reformed Maltese
                  scheme remains usable; the rate paid depends on documented
                  effective use. Most secondary press still describes the
                  scheme as withdrawn; this is incorrect.
                </p>
              </div>
            </section>

            <section id="eu-ets" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                EU ETS Maritime in 2026
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  Although not strictly a VAT regime, EU ETS Maritime sits
                  alongside it in any 2026 yacht-tax review. The system extends
                  the EU's carbon market to shipping in phases: 40 percent of
                  verified emissions covered in 2024, 70 percent in 2025, 100
                  percent from 2026.
                </p>
                <p>
                  Applied to commercial vessels above 5,000 GT entering EU
                  ports, regardless of flag. Most yachts including 60 to 80
                  metre motor sit below the 5,000 GT threshold. Above 5,000 GT
                  (110 metre plus motor) the cost runs EUR 200,000 to 400,000
                  per year at current carbon prices.
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
              <p className="meta mb-3">A note on currency</p>
              <p className="caption max-w-prose">
                This page is current to July 2026, incorporating the European
                Commission Guidance Note for Pleasure Craft of 30 April 2026
                and Italian ADM Circular No. 11/2026. EU VAT, customs, and ETS
                regimes change. The First Owner&rsquo;s Reference reviews and
                updates this page on each quarterly digital supplement (January,
                April, July, October). The print edition fixes the position as
                at September 2026. Independent counsel review remains the
                practitioner discipline before any transaction.
              </p>
            </section>
          </div>
        </section>

        <SiteFooter />
      </article>
    </>
  );
}
