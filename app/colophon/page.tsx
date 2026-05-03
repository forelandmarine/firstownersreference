import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata = {
  title: "Colophon",
  description:
    "How the Reference is made. Editorial principles, type, paper, photography, sources, and the names behind the publication.",
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
                Edition One
              </Link>
              <span>/</span>
              <span>Colophon</span>
            </div>
            <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight max-w-3xl">
              How the Reference is made.
            </h1>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3 space-y-2">
            <p className="meta sticky top-32">Edition One &middot; 2026</p>
          </div>
          <div className="lg:col-span-9 prose-body max-w-prose">
            <h2>Editorial principles</h2>
            <p>
              No advertising, ever. The Reference is funded by Foreland Marine
              and by no other commercial party. We do not run advertorial,
              sponsored content, or any form of paid placement. This is the
              editorial wedge on which every other decision rests.
            </p>
            <p>
              Pricing appears only where backed by published market data
              (Quay Crew, IYBA, SuperYacht Times, MYBA) or by Foreland
              Marine&rsquo;s own operational data anonymised across at least
              five projects. Single-source anecdotal numbers do not appear.
            </p>
            <p>
              Every guest contributor is paid a flat editorial fee, named
              transparently. Every commercial relationship is disclosed
              alongside the piece. Where there is none, that is stated.
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
              Edition One photography by{" "}
              <a
                href="https://fraseredwards.vercel.app"
                className="link-marine"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fraser Edwards
              </a>
              . The yacht in the cover and several section openers is{" "}
              <em>Raven</em>, Baltic 111, photographed under sail in the
              Western Mediterranean and during the RORC Caribbean 600. Full
              image credits appear on the print edition&rsquo;s back matter.
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
              Editor in Chief: Jack Norman, Founder, Foreland Marine.
              <br />
              Editor: To be appointed.
              <br />
              Art director: To be appointed.
              <br />
              Picture editor: Fraser Edwards, partnering on Edition One.
              <br />
              Researcher and fact checker: To be appointed.
            </p>

            <h2>Publisher</h2>
            <p>
              Published by Foreland Marine Consultancy Limited. 7 Bell Yard,
              London WC2A 2JR. Companies House registered. SYBAss accredited.
              YORR registered.
            </p>

            <h2>Citation</h2>
            <p>
              The First Owner&rsquo;s Reference, Edition One, 2026. Published
              by Foreland Marine, London. ISSN pending. Citation suggested as
              author Foreland Marine, year 2026, title of essay or section,
              published in The First Owner&rsquo;s Reference Edition One, URL.
            </p>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}
