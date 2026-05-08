import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press: brand details, masthead, and assets | The First Owner's Reference",
  description:
    "Press resources for The First Owner's Reference. Masthead, brand assets, citation format, and contact for editorial enquiries from yachting and financial press.",
  alternates: {
    canonical: "https://firstownersreference.com/press",
  },
  openGraph: {
    title: "Press | The First Owner's Reference",
    description:
      "Press resources, masthead, brand assets, and citation format for The First Owner's Reference.",
    url: "https://firstownersreference.com/press",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press | The First Owner's Reference",
    description: "Press resources, masthead, brand assets.",
  },
};

const BRAND_COLOURS = [
  { name: "Marine", hex: "#0f3b5c", role: "Primary accent" },
  { name: "Charcoal", hex: "#1a1a1a", role: "Body text and rule" },
  { name: "Paper", hex: "#f5f2ec", role: "Page background" },
  { name: "Stone", hex: "#7a756d", role: "Secondary text" },
  { name: "Rule", hex: "#d8d2c4", role: "Hairlines and dividers" },
];

export default function PressPage() {
  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                1st Edition
              </Link>
              <span>/</span>
              <span>Press</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              Press resources.
            </h1>
            <p className="font-serif italic text-xl lg:text-2xl text-charcoal-soft mt-8 max-w-2xl">
              Masthead, brand assets, citation format, and contact for
              editorial enquiries from yachting and financial press.
            </p>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 space-y-2">
            <p className="meta sticky top-32">1st Edition &middot; 2026</p>
          </div>
          <div className="lg:col-span-9 prose-body max-w-prose">
            <h2>About the publication</h2>
            <p>
              The First Owner&rsquo;s Reference is an annual editorial
              publication on the structural, financial, and operational
              dimensions of first-time superyacht acquisition. Published
              by Foreland Marine, an independent superyacht consultancy
              headquartered in London. 1st Edition releases September
              2026, in print and at firstownersreference.com.
            </p>
            <p>
              The publication is funded by the publisher and accepts no
              advertising, advertorial, sponsored content, or paid
              placement. Contributor pieces are voluntary and named
              transparently. Editorial principles are set out in the{" "}
              <Link href="/colophon" className="link-marine">
                colophon
              </Link>
              .
            </p>

            <h2>Masthead</h2>
            <p>
              <strong>Co-editors in Chief.</strong> Jack MacNally and
              Daniel Marks.
              <br />
              <strong>Publisher.</strong> Foreland Marine Consultancy
              Limited, 7 Bell Yard, London WC2A 2JR. Companies House
              registered. SYBAss accredited. YORR registered.
              <br />
              <strong>Contact.</strong>{" "}
              <a
                href="mailto:editors@firstownersreference.com"
                className="link-marine"
              >
                editors@firstownersreference.com
              </a>
              .
            </p>

            <h2>Boilerplate</h2>
            <p>
              For press copy. May be used verbatim or paraphrased.
            </p>
            <blockquote>
              The First Owner&rsquo;s Reference is an annual editorial
              publication for first-time superyacht buyers, covering the
              structural, financial, and operational dimensions of
              acquisition, build, refit, and operation. Independent and
              non-advertising. Published by Foreland Marine, London.
              firstownersreference.com.
            </blockquote>

            <h2>Brand mark</h2>
            <p>
              The publication carries the lighthouse mark of its
              publisher, Foreland Marine, alongside its own typographic
              wordmark set in Newsreader. The lighthouse signals
              continuity with Foreland; the wordmark is the publication.
            </p>
            <div className="not-prose grid grid-cols-2 gap-6 my-8">
              <div className="border border-rule p-8 bg-paper flex flex-col items-center justify-center gap-4 min-h-[200px]">
                <Image
                  src="/brand/foreland-lighthouse-charcoal.svg"
                  alt="Foreland lighthouse mark, charcoal"
                  width={80}
                  height={80}
                />
                <p className="meta text-center">Charcoal on paper</p>
                <a
                  href="/brand/foreland-lighthouse-charcoal.svg"
                  download
                  className="meta-marine"
                >
                  Download SVG &darr;
                </a>
              </div>
              <div className="border border-rule p-8 bg-charcoal flex flex-col items-center justify-center gap-4 min-h-[200px]">
                <Image
                  src="/brand/foreland-lighthouse-paper.svg"
                  alt="Foreland lighthouse mark, paper on dark"
                  width={80}
                  height={80}
                />
                <p className="meta text-center text-paper">Paper on dark</p>
                <a
                  href="/brand/foreland-lighthouse-paper.svg"
                  download
                  className="meta-marine text-paper"
                >
                  Download SVG &darr;
                </a>
              </div>
            </div>

            <h2>Logo usage</h2>
            <ul>
              <li>
                Always reproduce the wordmark with adequate clear space.
                Minimum clear space around the lighthouse equals the
                width of the mark itself.
              </li>
              <li>
                Do not recolour the mark outside the published palette
                below. Do not stretch, rotate, or apply effects.
              </li>
              <li>
                On dark backgrounds, use the paper variant. On light
                backgrounds, use the charcoal variant.
              </li>
              <li>
                Do not place the mark or wordmark on imagery in a way
                that compromises legibility.
              </li>
            </ul>

            <h2>Typography</h2>
            <p>
              <strong>Newsreader</strong> by Production Type, used for
              headlines, body, and editorial display. Open source.
              <br />
              <strong>Geist</strong> and <strong>Geist Mono</strong> by
              Vercel, used for metadata, navigation labels, and numerals.
              Open source.
            </p>

            <h2>Colour</h2>
            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
              {BRAND_COLOURS.map((c) => (
                <div
                  key={c.hex}
                  className="flex items-center gap-4 border border-rule p-3"
                >
                  <span
                    aria-hidden
                    className="block w-12 h-12 shrink-0 border border-rule"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <p className="font-serif text-base text-charcoal">
                      {c.name}
                    </p>
                    <p className="meta">
                      {c.hex.toUpperCase()} &middot; {c.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h2>Citation format</h2>
            <p>
              Suggested citation. Use either form depending on the
              context.
            </p>
            <p>
              <em>Short form.</em> The First Owner&rsquo;s Reference,
              1st Edition, 2026.
            </p>
            <p>
              <em>Full form.</em> [Author], &ldquo;[Chapter or piece
              title],&rdquo; The First Owner&rsquo;s Reference, 1st
              Edition, 2026, published by Foreland Marine,{" "}
              <Link href="/" className="link-marine">
                firstownersreference.com
              </Link>
              .
            </p>
            <p>
              For specific chapters, please cite the chapter title and
              the URL of the chapter page.
            </p>

            <h2>Print edition</h2>
            <p>
              500 hand-numbered copies. Smyth-sewn, casebound. Munken
              Pure 120gsm uncoated text stock, GF Smith Colorplan cover
              boards. Trim 230 by 300 mm. ISSN pending. Released
              September 2026. Print copies are available to first-time
              superyacht buyers and named industry contacts on request
              via the{" "}
              <Link href="/request-print-edition" className="link-marine">
                request page
              </Link>
              .
            </p>

            <h2>Press contact</h2>
            <p>
              Editorial enquiries, review copies, interview requests,
              and corrections:{" "}
              <a
                href="mailto:editors@firstownersreference.com"
                className="link-marine"
              >
                editors@firstownersreference.com
              </a>
              . Both co-editors read and respond personally. Response
              within 48 hours during the working week.
            </p>

            <h2>Use of material</h2>
            <p>
              Quotation under fair use is welcomed with citation as set
              out above. Reproduction of complete chapters, of figures,
              or of data tables requires written permission. Editorial
              cooperation with the trade press is welcomed and is offered
              on the same terms it is sought.
            </p>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
