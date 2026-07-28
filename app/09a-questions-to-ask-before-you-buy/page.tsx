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

const URL = `${SITE_URL}/09a-questions-to-ask-before-you-buy`;
const PUBLISHED = "2026-07-28";

export const metadata: Metadata = {
  title: "Questions to ask before buying a yacht: the ten-question checklist",
  description:
    "The ten questions to put to anyone involved in a superyacht purchase before signing anything, who to hire first, and how to test any adviser for independence. A one-page companion to chapter 9 of The First Owner's Reference.",
  alternates: { canonical: URL },
  openGraph: {
    title:
      "Questions to ask before buying a yacht | The First Owner's Reference",
    description:
      "The ten questions to put to anyone involved in a superyacht purchase before signing anything, and the order in which to hire the team.",
    url: URL,
    type: "article",
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: "summary_large_image",
    title: "Questions to ask before buying a yacht",
    description:
      "The ten-question checklist, the hiring order, and the independence test.",
  },
};

const FAQS = [
  {
    question: "What questions should I ask before buying a yacht?",
    answer:
      "Ten questions, applied to every party in the transaction before signing anything: who introduced the yacht and who pays them; who recommended the lawyer, the surveyor, and the management company, and who pays each; whether any party has offered services at no cost and who is actually paying them; whether every party has disclosed commercial relationships in writing, including referral fees, retrocessions, and equity holdings; whether counsel, surveyor, and owner's representative are each independent and paid directly by the buyer; and whether each party would walk away from a deal that did not benefit the buyer.",
  },
  {
    question: "Who should I hire first when buying a superyacht?",
    answer:
      "An independent adviser, engaged before any broker, captain, or management company. Then, in order: specialist yacht counsel before any contract is reviewed; an independent surveyor once a shortlist exists; the captain candidate through routes independent of the broker; the yacht management company once the acquisition decision is taken; and the insurance broker once flag and operating profile are set. Total team cost on a USD 30 to 50 million acquisition runs USD 200,000 to 600,000 in the first year. Most first-time buyers hire in the reverse order.",
  },
  {
    question: "How can I tell if a yacht adviser is independent?",
    answer:
      "Six tests: no income contingent on a transaction closing; no equity, employment, or referral relationship with any yard, broker, supplier, management company, or charter operation; a published counterparty list for the past three years; fees quoted transparently in writing in advance; professional indemnity insurance at a level appropriate to the transaction; and named, traceable, accountable principals. A firm can fail these tests and still provide value, but it should not be relied on for independence.",
  },
  {
    question: "Is a free yacht advisory service really free?",
    answer:
      "No party in a yacht transaction works without payment. A service offered at no cost to the buyer is being paid by someone else in the transaction, typically through commission, referral fees, or retrocessions, and the adviser's structural loyalty follows the payment. The question to ask is not whether the service is good but who is paying for it, in writing. If the answer is anyone other than the buyer, weight the advice accordingly.",
  },
  {
    question: "What is the walk-away test for a yacht adviser?",
    answer:
      "Ask whether the party would walk away from a deal that did not benefit the buyer. A party paid only by the buyer, with no contingent fee, can afford to advise against proceeding; a party paid on closing cannot. Firms able to point to engagements they declined or terminated, because the right advice was not to proceed, have been tested. The willingness to walk is the truest signal of alignment with the buyer.",
  },
];

const TEN_QUESTIONS = [
  "Who introduced the yacht (or yard) to me, and who pays them?",
  "Who recommended the lawyer, and who pays them?",
  "Who recommended the surveyor, and who pays them?",
  "Who recommended the management company, and who pays them?",
  "Has any party offered to provide their services “at no cost,” and if so, who is paying them?",
  "Has every party I am working with disclosed their commercial relationships in writing, including referral fees, retrocessions, and equity holdings in counterparties?",
  "Is my legal counsel independent of the broker, the yard, and the management company, and is their fee paid by me directly?",
  "Is my surveyor independent of the seller and of the broker, and is their fee paid by me directly?",
  "If I am building, is my owner’s representative paid solely by me, with no contingent fee, no yard commission, and no referral relationship?",
  "If I asked any of these parties to walk away from a deal that would not benefit me, would they?",
];

export default function QuestionsToAskPage() {
  return (
    <>
      <JsonLd
        nodes={[
          articleSchema({
            url: URL,
            headline:
              "Questions to ask before buying a yacht: the ten-question checklist",
            description:
              "The ten questions to put to anyone involved in a superyacht purchase before signing anything, who to hire first, and how to test any adviser for independence.",
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            author: "both",
            articleSection: "Chapter 09 companion",
          }),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            {
              name: "The decision framework",
              url: `${SITE_URL}/09-decision-framework`,
            },
            { name: "Questions to ask before you buy", url: URL },
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
              <Link href="/09-decision-framework" className="link">
                Chapter 09
              </Link>
              <span>/</span>
              <span>Questions to ask</span>
            </div>
            <p className="meta-marine mb-3">Companion to chapter 09</p>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              The questions to ask before you buy
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Ten questions to put to every party in the transaction before
              signing anything, the order in which to hire the team, and the
              test to apply to anyone proposing to advise. Including us.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32 space-y-4">
              <p className="meta">Contents</p>
              <ol className="space-y-2 caption">
                <li>
                  <a href="#ten-questions" className="link">
                    <span className="meta-marine mr-1">1</span> The ten questions
                  </a>
                </li>
                <li>
                  <a href="#why" className="link">
                    <span className="meta-marine mr-1">2</span> Why they work
                  </a>
                </li>
                <li>
                  <a href="#hiring-order" className="link">
                    <span className="meta-marine mr-1">3</span> The hiring order
                  </a>
                </li>
                <li>
                  <a href="#independence" className="link">
                    <span className="meta-marine mr-1">4</span> The independence test
                  </a>
                </li>
                <li>
                  <a href="#faqs" className="link">
                    <span className="meta-marine mr-1">5</span> FAQ
                  </a>
                </li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-4 space-y-16">
            <section id="ten-questions" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                The ten questions
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  A one-page checklist to apply before signing anything. Every
                  question has the same shape: it asks who pays whom, because
                  in this industry the payment structure, not the
                  relationship, is what predicts the advice.
                </p>
                <ol className="list-decimal pl-6 space-y-3 font-serif text-lg leading-relaxed">
                  {TEN_QUESTIONS.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}
                </ol>
                <p>
                  A buyer who can answer all ten clearly, with documentary
                  evidence, is exceptionally well-protected. The buyer who
                  cannot is, by industry default, operating inside the
                  structure described in{" "}
                  <Link href="/03-how-the-industry-works" className="link-marine">
                    chapter 3
                  </Link>
                  . That is information rather than judgment.
                </p>
              </div>
            </section>

            <section id="why" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                Why these questions work
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  The commission structures that fund the yacht industry are
                  lawful and disclosed in outline, but rarely disclosed in
                  full. The seller pays the{" "}
                  <Link href="/glossary#brokerage" className="link-marine">
                    brokerage
                  </Link>{" "}
                  commission;{" "}
                  <Link href="/glossary#retrocession" className="link-marine">
                    retrocessions
                  </Link>{" "}
                  and referral fees move between parties the buyer never
                  invoices; and{" "}
                  <Link href="/glossary#dual-agency" className="link-marine">
                    dual agency
                  </Link>{" "}
                  places one firm on both sides of the table. None of the ten
                  questions accuses anyone of anything. They convert
                  undisclosed structure into disclosed structure, in writing,
                  which is the single cheapest protection available to a
                  first-time buyer.
                </p>
                <p>
                  The questions are drawn from{" "}
                  <Link href="/09-decision-framework" className="link-marine">
                    chapter 9, the decision framework
                  </Link>
                  , where each is developed in full alongside the suitability
                  test for matching a firm to a specific project. The{" "}
                  <Link
                    href="/09-decision-framework/checklist"
                    className="link-marine"
                  >
                    chapter checklist
                  </Link>{" "}
                  is the printable version.
                </p>
              </div>
            </section>

            <section id="hiring-order" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                The hiring order
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  The order in which the buyer hires determines the quality of
                  every subsequent decision, because each early hire selects
                  the later ones. The right order:
                </p>
                <ol className="list-decimal pl-6 space-y-3 font-serif text-lg leading-relaxed">
                  <li>
                    Independent adviser, engaged before any broker, captain,
                    or management company, to scope the acquisition and build
                    the rest of the team.
                  </li>
                  <li>
                    Specialist yacht counsel, engaged before any contract is
                    reviewed.
                  </li>
                  <li>
                    Independent surveyor, engaged per deal once a shortlist
                    exists, paid by the buyer.
                  </li>
                  <li>
                    Captain candidate, hired through routes independent of the
                    broker and involved in survey,{" "}
                    <Link href="/glossary#sea-trial" className="link-marine">
                      sea trial
                    </Link>
                    , and acceptance.
                  </li>
                  <li>
                    <Link
                      href="/glossary#yacht-management-company"
                      className="link-marine"
                    >
                      Yacht management company
                    </Link>
                    , engaged once the acquisition decision is taken.
                  </li>
                  <li>
                    Insurance broker, engaged once{" "}
                    <Link href="/glossary#flag-state" className="link-marine">
                      flag state
                    </Link>{" "}
                    and operating profile are determined.
                  </li>
                </ol>
                <p>
                  Total team cost on a USD 30 to 50 million acquisition runs
                  USD 200,000 to 600,000 across the first year, a rounding
                  error against the transaction. Owners who economise here
                  save tenths of a percentage point and lose multiples in the
                  asset itself. The{" "}
                  <Link href="/04-acquisition-process" className="link-marine">
                    acquisition process in chapter 4
                  </Link>{" "}
                  shows where each hire enters the 12 to 24 week sequence.
                </p>
              </div>
            </section>

            <section id="independence" className="scroll-mt-24">
              <h2 className="font-serif font-light text-3xl lg:text-4xl leading-tight tracking-tight text-charcoal mb-6">
                The independence test, in brief
              </h2>
              <div className="prose-body text-charcoal max-w-prose space-y-4">
                <p>
                  Six elements, applied to any adviser: no income contingent
                  on a closed transaction; no equity, employment, or referral
                  relationship with yards, brokers, suppliers, or management
                  companies; a published counterparty list; fees quoted in
                  writing in advance; professional indemnity insurance at
                  transaction scale; and named, accountable principals. For
                  an{" "}
                  <Link
                    href="/glossary#owners-representative"
                    className="link-marine"
                  >
                    owner&rsquo;s representative
                  </Link>
                  , the{" "}
                  <Link href="/glossary#yorr" className="link-marine">
                    Yacht Owners&rsquo; Register of Representatives
                  </Link>{" "}
                  is the cross-industry vetting filter to apply alongside the
                  test.
                </p>
                <p>
                  The test applies to the publisher of The First
                  Owner&rsquo;s Reference like anyone else; the
                  publisher&rsquo;s own answers are on the{" "}
                  <Link href="/colophon" className="link-marine">
                    colophon
                  </Link>
                  .
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
              <p className="meta mb-3">Where this page sits</p>
              <p className="caption max-w-prose">
                This page is the one-page companion to{" "}
                <Link href="/09-decision-framework" className="link-marine">
                  chapter 9 of The First Owner&rsquo;s Reference
                </Link>
                , where the ten questions, the independence test, and the
                suitability test are developed in full. Cost questions run
                through the{" "}
                <Link
                  href="/tools/running-cost-calculator"
                  className="link-marine"
                >
                  running cost calculator
                </Link>
                .
              </p>
            </section>
          </div>
        </section>

        <SiteFooter />
      </article>
    </>
  );
}
