import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Glossary",
  description:
    "Plain definitions of the terms that recur in superyacht acquisition, refit, and operation. Citable. Linked from every chapter of The First Owner’s Reference.",
};

const entries = [
  {
    term: "Brokerage",
    definition:
      "The sale of an existing yacht through an intermediary. The seller pays the commission, typically 10 percent of the sale price, regardless of which broker introduces the buyer.",
  },
  {
    term: "Central agency",
    definition:
      "A formal mandate by which a single broker is appointed by the seller to market the yacht. Other brokers can introduce buyers but only the central agent receives the listing-side commission.",
  },
  {
    term: "Dual agency",
    definition:
      "When a single brokerage represents both buyer and seller in a transaction. The conflict of interest is structural and may not always be disclosed in writing.",
  },
  {
    term: "Flag state",
    definition:
      "The country under whose laws a yacht is registered. Common choices for superyachts include Cayman Islands, Marshall Islands, Malta, and the Red Ensign Group jurisdictions.",
  },
  {
    term: "ISM",
    definition:
      "International Safety Management. The mandatory framework under which yachts above 500 gross tonnes operate. Compliance is documented in a Safety Management System.",
  },
  {
    term: "MLC",
    definition:
      "Maritime Labour Convention. The treaty governing crew working conditions, contracts, hours, and welfare. Applies to most commercially operated superyachts.",
  },
  {
    term: "MYBA",
    definition:
      "Mediterranean Yacht Brokers Association. Publishes the standard charter agreement used across most of the Mediterranean charter market.",
  },
  {
    term: "Owner's representative",
    definition:
      "An independent professional appointed by the buyer to oversee a new build or major refit. Paid by the owner, with no commercial relationship to the yard.",
  },
  {
    term: "Pre-purchase survey",
    definition:
      "An independent technical inspection commissioned by the buyer before contract. Distinct from the seller's most recent survey and almost always worth the cost.",
  },
  {
    term: "Refit",
    definition:
      "Major maintenance, modernisation, or rebuild work undertaken at a specialist yard. Typical scopes range from cosmetic refresh to multi-year structural rebuild.",
  },
  {
    term: "Retrocession",
    definition:
      "A commission rebate paid quietly between counterparties, often from a yard or supplier back to a referring broker, captain, or management company. Frequently undisclosed.",
  },
  {
    term: "SYBAss",
    definition:
      "Superyacht Builders Association. Membership signals an independently audited ability to deliver new builds above 40 metres.",
  },
  {
    term: "Spanish IPR",
    definition:
      "Inward Processing Relief. A customs regime allowing non-EU yachts to undergo refit work in Spain without paying import VAT, provided they are subsequently re-exported.",
  },
  {
    term: "VAT regime",
    definition:
      "The framework under which value-added tax is paid (or relieved) on a yacht's purchase, importation, and operation. Choices include Spanish IPR, French commercial exemption, Italian leasing, and Maltese.",
  },
  {
    term: "Yacht management company",
    definition:
      "A firm engaged by the owner to handle compliance, accounting, crew administration, and operational support. Distinct from a broker. Should be selected independently.",
  },
  {
    term: "YORR",
    definition:
      "Yacht Owners' Register of Representatives. The independent register on which qualifying owner's representatives are listed.",
  },
];

export default function GlossaryPage() {
  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                Edition One
              </Link>
              <span>/</span>
              <span>Glossary</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Glossary
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Plain definitions of the terms that recur in The First Owner’s Reference.
              Linked from every chapter. Citable.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="meta sticky top-32">
              {entries.length} terms &middot; A to Z
            </p>
          </div>
          <div className="lg:col-span-9 space-y-10">
            {entries.map((entry) => (
              <div
                key={entry.term}
                id={entry.term.toLowerCase().replace(/\s+/g, "-")}
                className="border-t border-rule pt-6"
              >
                <h2 className="font-serif text-2xl leading-tight tracking-tight text-charcoal mb-3">
                  {entry.term}
                </h2>
                <p className="prose-body text-charcoal-soft max-w-prose">
                  <span>{entry.definition}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
