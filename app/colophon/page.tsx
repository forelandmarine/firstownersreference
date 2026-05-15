import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon: how The First Owner's Reference is made",
  description:
    "Editorial principles, type, paper, photography, sources, and the names behind The First Owner's Reference. The independence test, applied to the publisher.",
  alternates: {
    canonical: "https://firstownersreference.com/colophon",
  },
  openGraph: {
    title: "Colophon | The First Owner's Reference",
    description:
      "How the publication is made. Editorial principles, type, paper, photography, the independence test applied to the publisher.",
    url: "https://firstownersreference.com/colophon",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colophon | The First Owner's Reference",
    description: "How the publication is made.",
  },
};

export default function ColophonPage() {
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
              <span>Colophon</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              How The First Owner’s Reference is made.
            </h1>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 space-y-2">
            <p className="meta sticky top-32">1st Edition &middot; 2026</p>
          </div>
          <div className="lg:col-span-9 prose-body max-w-prose">
            <h2>Editorial principles</h2>
            <p>
              No advertising, ever. The First Owner’s Reference is funded by the publisher
              and by no other commercial party. No advertorial, no sponsored
              content, no paid placement. This is the editorial wedge on which
              every other decision rests.
            </p>
            <p>
              Pricing appears only where backed by published market data (Quay
              Crew, IYBA, SuperYacht Times, MYBA) or by aggregated practitioner
              data anonymised across at least five projects. Single-source
              anecdotal numbers do not appear.
            </p>
            <p>
              Every guest contribution is given voluntarily and named
              transparently. No contributor is paid by The First Owner&rsquo;s
              Reference. Every commercial relationship is disclosed alongside
              the piece. Where there is none, that is stated.
            </p>

            <h2>On reception</h2>
            <p>
              The Superyacht Alliance for Professional Standards has
              expressed support for the editorial mission of this
              publication as an external contribution to industry
              professionalisation. The Alliance&rsquo;s support is for
              the editorial mission; it is not a formal endorsement of
              any specific claim or framing in this publication, which
              remains independent of the Alliance and of any other
              industry body.
            </p>

            <h2>Type</h2>
            <p>
              Body and display type set in Newsreader by Production Type. Sans
              and metadata in Geist and Geist Mono by Vercel. Both families
              are open source and self-hosted.
            </p>

            <h2>Paper and binding</h2>
            <p>
              The print edition is set on Munken Pure 120gsm uncoated text
              stock, with cover boards in GF Smith Colorplan. Smyth-sewn,
              casebound, head and tail bands in marine, single ribbon marker.
              Foil-stamped wordmark and blind-debossed lighthouse mark.
              Trim 230 by 300 mm. Five hundred copies, hand numbered and
              signed by the editor in chief on page 128.
            </p>

            <h2>Photography</h2>
            <p>
              Photography for 1st Edition is drawn from a curated stock
              pool plus selected commissioned work. Full image credits
              appear on the print edition&rsquo;s back matter.
            </p>

            <h2>Web</h2>
            <p>
              Built with Next.js, deployed on Vercel. Privacy-respecting
              analytics. No cookies beyond session essentials. No tracking
              scripts. The web edition is permanently archived at{" "}
              <Link href="/" className="link-marine">
                firstownersreference.com
              </Link>
              .
            </p>

            <h2>Editorial board</h2>
            <p>
              Co-editors in Chief: Jack MacNally and Daniel Marks.
              <br />
              Editor: To be appointed.
              <br />
              Art director: To be appointed.
              <br />
              Picture editor: To be appointed.
              <br />
              Researcher and fact checker: To be appointed.
            </p>
            <p>
              Editorial correspondence:{" "}
              <a
                href="mailto:editors@firstownersreference.com"
                className="link-marine"
              >
                editors@firstownersreference.com
              </a>
              .
            </p>

            <h2>Publisher</h2>
            <p>
              Published by Foreland Marine Consultancy Limited. 7 Bell Yard,
              London WC2A 2JR. Companies House registered. SYBAss
              (Superyacht Builders Association) accredited. YORR (Yacht
              Owner&rsquo;s Representative Register) registered.
            </p>

            <h2>Publisher disclosure: the independence test, applied</h2>
            <p>
              The publisher of The First Owner’s Reference is also a yacht consultancy and
              has a commercial interest in being engaged by readers. This is
              disclosed openly. The six-element independence test that runs
              through The First Owner’s Reference applies to the publisher as it does to
              every other adviser. Its answers are set out below.
            </p>
            <p>
              <strong>1. Earnings contingent on closing.</strong> Foreland Marine
              charges fixed and time-based fees. Income does not vary with
              whether a transaction closes. The firm has walked away from
              engagements where the right advice was for the client not to
              proceed.
            </p>
            <p>
              <strong>2. Equity, employment, or referral relationships.</strong>{" "}
              Foreland holds no equity in any yard, broker, supplier,
              management company, or charter operation. It accepts no referral
              fees from any of those parties. The directors of Foreland hold
              no shareholdings in any commercial counterparty in the yacht
              industry.
            </p>
            <p>
              <strong>3. Counterparty list.</strong> Foreland publishes a
              complete list of yards, brokers, lawyers, surveyors, and
              management companies engaged by clients of the firm in the past
              three years, available on request. The list is provided to
              readers under standard confidentiality terms.
            </p>
            <p>
              <strong>4. Fee transparency.</strong> Fees are quoted in writing
              before any engagement. Hourly rates, fixed project fees, and
              retainer rates are published on engagement. No success fees. No
              commissions.
            </p>
            <p>
              <strong>5. Professional indemnity insurance.</strong> Foreland
              holds professional indemnity at GBP 5 million per claim, written
              through a Lloyd&rsquo;s syndicate.
            </p>
            <p>
              <strong>6. Named principals.</strong> The directors of Foreland
              are Jack MacNally and Daniel Marks. Both listed at Companies
              House. Registered with the Yacht Owners&rsquo; Representative
              Register (YORR). Resident in London.
            </p>

            <h2>Citation</h2>
            <p>
              The First Owner&rsquo;s Reference, 1st Edition, 2026. Published
              by Foreland Marine, London. ISSN pending. Citation suggested as
              author Foreland Marine, year 2026, title of essay or chapter,
              published in The First Owner&rsquo;s Reference 1st Edition, URL.
            </p>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
