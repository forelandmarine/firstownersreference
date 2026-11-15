import { domainOf, domainsOnly } from "@/lib/print-domain";
import React from "react";
import { sections } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { getCase } from "@/lib/cases";
import { getDataSpread } from "@/lib/data-spreads";
import { glossaryEntries } from "@/lib/glossary";
import { getGuestOpinions } from "@/lib/guest-opinions";
import { printImages, type PrintImage } from "@/lib/print-images";
import { makePicker, PLATES_PER_CHAPTER, type Picker } from "@/lib/print-picker";
import { renderChartForPrint } from "@/components/print/print-chart";
import { getContributorProfile } from "@/lib/contributors";
import { buildPrintIndex } from "@/lib/print-index";
import printFolios from "@/lib/print-folios.json";
import printFit from "@/lib/print-fit.json";
import {
  FrontispiecePage,
  ClosingImagePage,
  ChapterOpener,
  PlatePage,
} from "@/components/print/full-bleed-pages";

/* Per-section fit gains in millimetres, measured by the build from the
   unused space on each section's last page and absorbed here as paragraph
   spacing and picture height. Regenerated on every build. */
const fitMap = (printFit as { fit: Record<string, number> }).fit ?? {};



const folios = printFolios as {
  chapters: Record<string, number>;
  refs: Record<string, number>;
  spacers: string[];
};

/* Chrome supports named @page masters with margin boxes but not
   string-set, so the chapter-aware verso running heads are generated
   here as per-chapter masters, kept in sync with sections.ts. */
export function chapterMastersCss() {
  return sections
    .map((s) => {
      const nn = String(s.number).padStart(2, "0");
      const title = s.title.replace(/"/g, '\\"');
      return `
@page ch${nn}:left {
  @top-left {
    content: "${nn}\\2003${title}";
    font-family: "DM Sans", "Helvetica Neue", sans-serif;
    font-size: 7pt;
    letter-spacing: 0.02em;
    color: #7a756d;
    padding-top: 11mm;
    background: #ffffff;
  }
  /* Chrome does not cascade margin boxes from @page :left into a named
     master, so the footer has to be repeated here or it vanishes on every
     chapter page. */
}
.chapter-scope[data-ch="${nn}"] { page: ch${nn}; }`;
    })
    .join("\n");
}

function tocFolio(v: number | undefined) {
  return v !== undefined ? String(v) : "";
}

/* Column-measure picture shapes, cycled so no two adjacent figures share a
   silhouette. half = half the column height, feature = 4:5 portrait,
   wide = 4:3 landscape. Nothing here spans the columns: Chrome balances
   rather than fills a fragmented multicol, so a spanner strands a row. */
/* Forbes, TSR 218 and Savills all follow the same rule on a text page:
   one picture, large, never two, and never a small one dropped between
   paragraphs. Small column figures were cutting the essay into fragments
   two or three lines deep. Only the two largest shapes survive, so a
   picture reads as a deliberate half-page block. */
/* Only the half register now. The full-column figure at 188mm is the last
   big unbreakable element left in the essay and it strands on its own page
   when it does not fit. The section closers handle the feet; the in-flow
   picture no longer has to be large to carry the page. */
const FIGURE_CYCLE = ["half"];

/* Head pictures in the lead essay: two a chapter, each placed before one of
   the essay's crossheads and spanning both columns, as fly GDN places one
   large picture per page. The build moves each one to a crosshead where it
   lands well and sizes it to the space left (see headFit in
   scripts/build-print.mjs); these are the starting values. */
const HEADS_PER_ESSAY = 1;
const HEAD_DEFAULT_MM = 100;

export const dynamic = "force-static";

function supportingImagePath(slug: string, i: number) {
  const list = printImages.supporting?.[slug] ?? [];
  if (i < list.length) return `/print-images/print/${list[i].filename}`;
  return null;
}

export default function PrintEdition() {
  const allEssays = sections.map((s) => ({
    section: s,
    essay: getLeadEssay(s.slug),
    caseStudy: getCase(s.slug),
    dataSpread: getDataSpread(s.slug),
    guestOpinions: getGuestOpinions(s.slug),
  }));

  const indexEntries = buildPrintIndex(sections, glossaryEntries);
  const pick = makePicker();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: chapterMastersCss() }} />

      {/* The cover is not part of the book block: it is printed standalone
         and prepended by the build script, so the block starts on the
         half-title recto and Chrome's left/right page alternation matches
         the bound book. */}

      {/* === HALF-TITLE === */}
      <section className="half-title">
        <p className="half-title__wordmark">
          The First Owner&rsquo;s Reference
        </p>
      </section>

      {/* === FRONTISPIECE === */}
      <FrontispiecePage />

      {/* === TITLE PAGE === */}
      <section className="title-page">
        <p className="title-page__edition">1st Edition, 2027</p>
        <h1 className="title-page__title">
          The First Owner&rsquo;s Reference
        </h1>
        <p className="title-page__strap">
          An annual editorial publication on the structural, financial, and
          operational dimensions of first-time superyacht acquisition.
          Or rather, how to buy a boat.
        </p>

        <div className="title-page__frame">
          <p className="title-page__frame-body">
            The publication is funded by an independent superyacht consultancy
            that holds no yard affiliations and takes no broker commissions.
            It is published once a year, in print and online. It carries no
            advertising. Sources are named in the back matter. The
            independence test in the closing chapter is offered for
            application to the publisher first.
          </p>
        </div>

        <div className="title-page__foot">
          <div>
            <p className="title-page__foot-label">Publisher</p>
            <p className="title-page__foot-value">Foreland Marine, London</p>
          </div>
          <div>
            <p className="title-page__foot-label">Web</p>
            <p className="title-page__foot-value">firstownersreference.com</p>
          </div>
          <div>
            <p className="title-page__foot-label">Edition</p>
            <p className="title-page__foot-value">First, January 2027</p>
          </div>
        </div>

        <div className="title-page__sections">
          <ol className="title-page__sections-list">
            {sections.map((s) => (
              <li key={s.slug}>
                <span className="title-page__sections-num">
                  {String(s.number).padStart(2, "0")}
                </span>
                <p className="title-page__sections-title">{s.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* === IMPRINT === */}
      <section className="imprint">
        <h2 className="imprint__title">
          The First Owner&rsquo;s Reference, 1st Edition, 2027.
        </h2>

        <div className="imprint__cols">
          <p>
            Published by Foreland Marine Consultancy Limited, 7 Bell Yard,
            London WC2A 2JR. ISSN pending. © 2027 Foreland Marine Consultancy
            Limited. All rights reserved. No advertising, ever.
          </p>
          <p>
            Set in Newsreader by Production Type and DM Sans by
            Indian Type Foundry. Printed on Munken Pure 120gsm uncoated
            text stock with GF Smith Colorplan cover boards. Smyth-sewn,
            casebound. Trim 208 by 280 mm. Five hundred copies, hand
            numbered.
          </p>
          <p>
            Editorial correspondence: editors@firstownersreference.com. The
            independence test that runs through this publication is applied
            to the publisher itself. The full disclosure is on the colophon
            at the back of this edition.
          </p>
        </div>

        <div className="imprint__masthead">
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Co-editors in Chief</p>
            <p className="imprint__masthead-name">Jack MacNally</p>
            <p className="imprint__masthead-name">Daniel Marks</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Publisher</p>
            <p className="imprint__masthead-name">Foreland Marine Consultancy</p>
            <p className="imprint__masthead-role">Independent superyacht consultancy, London</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Editorial board</p>
            <p className="imprint__masthead-name">To be confirmed</p>
            <p className="imprint__masthead-role">Three external advisors, named in the second edition</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Production</p>
            <p className="imprint__masthead-name">Foreland Marine in-house</p>
            <p className="imprint__masthead-role">Designer engaged for the press edition</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Photography</p>
            <p className="imprint__masthead-name">Stock for proof; commissioned for press</p>
            <p className="imprint__masthead-role">Picture editor engaged June 2026</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Web</p>
            <p className="imprint__masthead-name">firstownersreference.com</p>
            <p className="imprint__masthead-role">Updated quarterly between editions</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Indexer</p>
            <p className="imprint__masthead-name">Working draft auto-set</p>
            <p className="imprint__masthead-role">Re-set by professional indexer for the press edition</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Copy editor</p>
            <p className="imprint__masthead-name">In-house</p>
            <p className="imprint__masthead-role">External pass scheduled August 2026</p>
          </div>
          <div className="imprint__masthead-block">
            <p className="imprint__masthead-label">Bindery</p>
            <p className="imprint__masthead-name">UK fine bindery, TBC</p>
            <p className="imprint__masthead-role">Smyth-sewn, casebound, hand-numbered</p>
          </div>
        </div>

        <div className="imprint__note">
          <p className="imprint__note-label">A note on the first edition</p>
          <div className="imprint__note-cols">
            <p>
              This is the first edition. Where editorial roles are listed as
              to be confirmed, the appointment is in process and will be named
              in the colophon of the press edition. Where contributors are
              still being approached, the chapter carries a placeholder. No
              editorial line has been drawn against a contributor&rsquo;s
              eventual identity.
            </p>
            <p>
              The publication is funded by Foreland Marine Consultancy
              Limited as a working reference. It carries no advertising,
              accepts no broker commissions, and takes no editorial direction
              from yards. Sources are named in the back matter. The
              independence test in chapter nine is offered for application to
              the publisher first.
            </p>
            <p>
              Reader correspondence reaches the editors directly at
              editors@firstownersreference.com. Errata, contributor
              recommendations, and disagreements are read in full and
              acknowledged. The next edition is the 2028 edition,
              with a quarterly update published online between editions at
              firstownersreference.com.
            </p>
          </div>
        </div>
      </section>

      {/* === EDITORS' LETTER === */}
      <section className="editors-letter">
        <h2 className="editors-letter__title">
          A reference written from the other side of the table.
        </h2>

        <div className="editors-letter__body">
          <p>
            The superyacht trade press is funded by the yards and brokers
            whose interests it covers. That is not a moral failing. It is
            simply how those publications fund themselves. This one is
            funded differently, and written differently.
          </p>

          <p>
            The independence is structural rather than stylistic. The First
            Owner&rsquo;s Reference is published once a year, in print and
            online, by an independent consultancy that holds no yard
            affiliations and takes no broker commissions.
          </p>

          <p>
            It is written for the reader who has recently exited a business
            or come into liquidity, has the means to buy a yacht, and would
            like to do so with full visibility of cost, time, and the
            structure of the conversations ahead.
          </p>

          <p>
            The publication is structured in numbered chapters. Each carries
            a lead essay, a data spread, a guest opinion from a named
            contributor, an anonymised case, and a one-page checklist. The
            aim is a calm, evidence-led reference a first-time owner can
            hold alongside the conversations that matter.
          </p>

          <p>
            Read in any order. Run your own numbers through the calculator
            on the website. The independence test in the closing chapter is
            offered for application to the publisher first, and then to any
            other firm a reader is considering.
          </p>

          <p>
            Editorial correspondence reaches us at
            editors@firstownersreference.com and is read by the team
            personally. We do hope it is useful.
          </p>

          <p className="editors-letter__signature">
            Jack MacNally and Daniel Marks
            <br />
            Co-editors in Chief, London, January 2027
          </p>
        </div>

        <div className="editors-letter__keys">
          <p className="editors-letter__keys-label">How to read this edition</p>
          <ol className="editors-letter__keys-list">
            <li>
              <span>1.</span>
              <p>
                <strong>Read in any order.</strong> The chapters stand alone.
                The acquisition process in chapter four can be read before
                the market overview in chapter two if that is the live
                question.
              </p>
            </li>
            <li>
              <span>2.</span>
              <p>
                <strong>Run your own numbers.</strong> The data spread in
                each chapter cites its sources. The running cost calculator
                on the website applies the same numbers to a yacht profile.
              </p>
            </li>
            <li>
              <span>3.</span>
              <p>
                <strong>Apply the test.</strong> The independence test in
                chapter nine is offered for application to the publisher
                first, and then to any firm a reader is considering.
              </p>
            </li>
            <li>
              <span>4.</span>
              <p>
                <strong>Mark up the proof.</strong> Reader correspondence
                shapes the press edition. Disagreements, errata, and
                contributor recommendations are read in full.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* === CONTENTS === */}
      <section className="contents-page">
        <h2 className="contents-page__title">Contents</h2>
        <p className="page-subtitle">Nine chapters.</p>

        <ol className="contents-list">
          {sections.map((section) => (
            <li key={section.slug} className="contents-list__item">
              <span className="contents-list__num">CH {section.number}</span>
              <div className="contents-list__main">
                <h3 className="contents-list__title">{section.title}</h3>
                <p className="contents-list__standfirst">
                  {section.standfirst}
                </p>
              </div>
              <a
                className="contents-list__folio"
                href={`#ch-${section.number}`}
                aria-hidden
              >
                {tocFolio(folios.chapters[String(parseInt(section.number, 10))])}
              </a>
            </li>
          ))}
        </ol>

        <ol className="contents-list" style={{ marginTop: "6mm" }}>
          <li className="contents-list__item">
            <span className="contents-list__num">A</span>
            <div className="contents-list__main">
              <h3 className="contents-list__title">Glossary</h3>
              <p className="contents-list__standfirst">
                {glossaryEntries.length} terms drawn from across the chapters,
                set as a continuous reference.
              </p>
            </div>
            <a className="contents-list__folio" href="#ref-glossary" aria-hidden>
              {tocFolio(folios.refs["glossary"])}
            </a>
          </li>
          <li className="contents-list__item">
            <span className="contents-list__num">B</span>
            <div className="contents-list__main">
              <h3 className="contents-list__title">
                Index <em>(working)</em>
              </h3>
              <p className="contents-list__standfirst">
                Auto-generated from chapter section headings, glossary terms,
                and named entities. To be re-set by an indexer for the press
                edition.
              </p>
            </div>
            <a className="contents-list__folio" href="#ref-index" aria-hidden>
              {tocFolio(folios.refs["index"])}
            </a>
          </li>
          <li className="contents-list__item">
            <span className="contents-list__num">C</span>
            <div className="contents-list__main">
              <h3 className="contents-list__title">Sources</h3>
              <p className="contents-list__standfirst">
                Consolidated bibliography by chapter, with named publications,
                practitioners, and court citations.
              </p>
            </div>
            <a className="contents-list__folio" href="#ref-sources" aria-hidden>
              {tocFolio(folios.refs["sources"])}
            </a>
          </li>
          <li className="contents-list__item">
            <span className="contents-list__num">D</span>
            <div className="contents-list__main">
              <h3 className="contents-list__title">Colophon</h3>
              <p className="contents-list__standfirst">
                Editorial principles, type, paper, photography, and the
                publisher&rsquo;s own answers to the independence test.
              </p>
            </div>
            <a className="contents-list__folio" href="#ref-colophon" aria-hidden>
              {tocFolio(folios.refs["colophon"])}
            </a>
          </li>
        </ol>
      </section>

      {/* === CONTRIBUTORS === */}
      <section className="contributors-page">
        <h2 className="contributors-page__title">
          Contributors
        </h2>
        <p className="page-subtitle">Voluntary, named, and disclosed.</p>
        <p className="contributors-page__strap">
          Each chapter is anchored by a named external contributor with deep
          first-hand knowledge of the topic. No contributor is paid by The
          First Owner&rsquo;s Reference. Where a contributor holds a
          commercial relationship that bears on the chapter, it is disclosed
          alongside the piece itself.
        </p>

        <div className="contributors-grid">
          {sections.map((s) => {
            const confirmed =
              s.contributor && s.contributor !== "To be confirmed";
            return (
              <div
                key={s.slug}
                className={`contributor-entry ${
                  confirmed ? "" : "contributor-entry--pending"
                }`}
              >
                <p className="contributor-entry__chapter">
                  Chapter {s.number}&emsp;{s.title}
                </p>
                <h3 className="contributor-entry__name">
                  {confirmed ? s.contributor : "To be confirmed"}
                </h3>
                <p className="contributor-entry__role">
                  {confirmed
                    ? s.contributorRole
                    : "Approached; named in the press edition."}
                </p>
              </div>
            );
          })}
        </div>

        <p className="contributors-page__note">
          Eight chapter contributors are still being confirmed for the press
          edition. Approaches are made on the explicit basis that the
          contribution is voluntary and that the contributor&rsquo;s
          relationships are disclosed alongside the piece. Reader
          recommendations are welcomed at editors@firstownersreference.com.
        </p>
      </section>

      {/* === CHAPTERS === */}
      {allEssays.map(({ section, essay, caseStudy, dataSpread, guestOpinions }, i) => (
        <ChapterBlock
          key={section.slug}
          spacerBefore={folios.spacers.includes(
            `ch${String(section.number).padStart(2, "0")}`
          )}
          section={section}
          essay={essay}
          caseStudy={caseStudy}
          dataSpread={dataSpread}
          guestOpinions={guestOpinions}
          nextSection={allEssays[i + 1]?.section ?? null}
          pick={pick}
        />
      ))}

      {/* === GLOSSARY === */}
      <section className="glossary-section" id="ref-glossary">
        <span className="pdf-marker">[[REF-GLOSSARY]]</span>
        <h2 className="glossary-section__title">Glossary</h2>
        <p className="glossary-section__strap">
          Terms used across the chapters, set as a continuous reference. Cross-
          references appear in italic in the body of the chapter where the
          term is first defined.
        </p>
        <dl className="glossary-list">
          {glossaryEntries
            .slice()
            .sort((a, b) => a.term.localeCompare(b.term))
            .map((entry) => (
              <div key={entry.slug}>
                <dt>{entry.term}</dt>
                <dd>{entry.shortDefinition}</dd>
              </div>
            ))}
        </dl>
      </section>

      {/* === INDEX === */}
      <section className="index-section glossary-section" id="ref-index">
        <span className="pdf-marker">[[REF-INDEX]]</span>
        <h2 className="glossary-section__title">
          Index <em style={{ fontWeight: 300, fontSize: "0.6em" }}>(working)</em>
        </h2>
        <p className="glossary-section__strap">
          Auto-generated from chapter section headings, glossary terms, and
          named entities. The press edition will be re-set by an indexer.
        </p>
        <div className="index-list">
          {indexEntries.map((group) => (
            <div key={group.letter} className="index-list__group">
              <p className="index-list__letter">{group.letter}</p>
              {group.entries.map((entry) => (
                <p key={entry.term} className="index-list__entry">
                  {entry.term}{" "}
                  <span className="index-list__entry-folio">
                    {entry.refs.join(", ")}
                  </span>
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* === SOURCES === */}
      <section className="sources-section" id="ref-sources">
        <span className="pdf-marker">[[REF-SOURCES]]</span>
        <h2 className="glossary-section__title">Sources</h2>
        <p className="glossary-section__strap">
          Consolidated bibliography by chapter. Named publications,
          practitioner attributions, and court citations are listed in the
          order they appear in the chapter text.
        </p>
        {allEssays.map(({ section, dataSpread }) => (
          <div key={section.slug}>
            <h2>
              Chapter {section.number}&emsp;{section.title}
            </h2>
            {dataSpread?.sources.length ? (
              <ul>
                {dataSpread.sources.map((src, i) => (
                  <li key={i}>
                    <strong>{src.label}.</strong> {domainsOnly(src.line)}
                    {src.url ? (
                      <>
                        {" "}
                        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "7.5pt" }}>
                          {domainOf(src.url)}
                        </span>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontStyle: "italic", fontSize: "9pt", color: "var(--colour-stone)" }}>
                Sources cited inline in the chapter text.
              </p>
            )}
          </div>
        ))}
      </section>

      {/* === COLOPHON === */}
      <section className="colophon-section" id="ref-colophon">
        <span className="pdf-marker">[[REF-COLOPHON]]</span>
        <h2 className="glossary-section__title" style={{ marginBottom: "10mm" }}>
          Colophon
        </h2>

        <h2>Editorial principles</h2>
        <p>
          No advertising, ever. The First Owner&rsquo;s Reference is funded by
          the publisher and by no other commercial party. Pricing appears only
          where backed by published market data or by aggregated practitioner
          data anonymised across at least five projects. Every guest
          contribution is given voluntarily and named transparently; no
          contributor is paid.
        </p>
        <p>
          Foreland Marine project material in this Reference is anonymised
          under the firm&rsquo;s confidentiality obligations to its clients.
          Each case states whether it describes a single project, with
          identifying details changed, or is a composite illustration drawn
          from several project files.
        </p>

        <h2>Type</h2>
        <p>
          Body and display type set in <strong>Newsreader</strong> by
          Production Type. Sans and metadata in <strong>DM Sans</strong>{" "}
          by Indian Type Foundry. All
          families are open source and self-hosted on the web edition.
        </p>

        <h2>Paper and binding</h2>
        <p>
          Set on Munken Pure 120gsm uncoated text stock with cover boards in
          GF Smith Colorplan. Smyth-sewn, casebound, head and tail bands in
          marine, single ribbon marker. Foil-stamped wordmark and
          blind-debossed lighthouse mark. Trim 208 by 280 mm. Five hundred
          copies, hand numbered and signed by the editors in chief on the
          final page.
        </p>

        <h2>Photography</h2>
        <p>
          Photography for the 1st Edition is drawn from a curated stock pool
          and selected commissioned work. Full image credits appear on the
          back matter of the press edition.
        </p>

        <h2>Web</h2>
        <p>
          The web edition is permanently archived at firstownersreference.com.
          Privacy-respecting analytics. No cookies beyond session essentials.
          No tracking scripts.
        </p>

        <h2>Editorial board</h2>
        <p>
          <strong>Co-editors in Chief:</strong> Jack MacNally and Daniel Marks.
        </p>

        <h2>Publisher</h2>
        <p>
          Published by Foreland Marine Consultancy Limited, 7 Bell Yard,
          London WC2A 2JR. Companies House registered. SYBAss (Superyacht
          Builders Association) accredited. YORR (Yacht Owner&rsquo;s
          Representative Register) registered.
        </p>

        <h2>Publisher disclosure: the independence test, applied</h2>
        <p>
          The publisher of The First Owner&rsquo;s Reference is also a yacht
          consultancy and has a commercial interest in being engaged by
          readers. This is disclosed openly. The six-element independence
          test that runs through The First Owner&rsquo;s Reference applies to
          the publisher as it does to every other adviser. Its answers on
          earnings, relationships, counterparties, fees, insurance and principals are set
          out below.
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
          Foreland holds no equity in any yard, broker, supplier, management
          company, or charter operation. It accepts no referral fees. The
          directors of Foreland hold no shareholdings in any commercial
          counterparty in the yacht industry.
        </p>
        <p>
          <strong>3. Counterparty list.</strong> Foreland keeps a complete
          list of yards, brokers, lawyers, surveyors, and management companies
          engaged by clients of the firm in the past three years, and provides
          it to readers on request under standard confidentiality terms.
        </p>
        <p>
          <strong>4. Fee transparency.</strong> Fees are quoted in writing
          before any engagement. Hourly rates, fixed project fees, and
          retainer rates are published on engagement. No success fees. No
          commissions.
        </p>
        <p>
          <strong>5. Professional indemnity insurance.</strong> Foreland
          holds professional indemnity insurance. The limit, and any
          project-specific cover, are confirmed to each client in writing
          with the engagement letter and are not published here.
        </p>
        <p>
          <strong>6. Named principals.</strong> The directors of Foreland are
          Jack MacNally and Daniel Marks. Both listed at Companies House.
          Registered with the Yacht Owner&rsquo;s Representative Register.
          Resident in London.
        </p>

        <h2>Acknowledgements</h2>
        <p>
          The 1st Edition is in production. The acknowledgements section will
          be set in full after contributors are confirmed for the press
          edition.
        </p>
        <p>
          Provisional thanks: to the practitioners who agreed to read draft
          chapters on the basis that disagreement would be welcomed. To
          Erica Lay for the first confirmed guest opinion. To the readers
          who responded to the homepage&rsquo;s initial publication and
          shaped the editorial register through their questions.
        </p>
        <p>
          To the brokerage and management teams who, knowing the
          publication&rsquo;s structural position, agreed to be quoted and
          to have their commentary anonymised in the case studies. To the
          court reporters whose published rulings on the buyer-side cases
          made the chapter on industry conduct possible.
        </p>
        <p>
          To Foreland Marine&rsquo;s consulting team, whose anonymised
          project files form the practitioner archive cross-referenced
          throughout the data spreads.
        </p>
        <p>
          The publication takes editorial responsibility for any error that
          survived. Errata are corrected on the website between editions
          and reflected in the next print edition.
        </p>

        <h2>Reading the second edition</h2>
        <p>
          The second edition is the 2028 edition. It will carry
          named contributors against every chapter, a fully indexed back
          matter set by a professional indexer, commissioned photography
          throughout, and the acknowledgements written in full. The
          editorial register and the independence test do not change
          between editions.
        </p>
      </section>

      {/* === CLOSING IMAGE === */}
      <ClosingImagePage />
    </>
  );
}

/* === Chapter block === */
/* A picture across the full type area at the head of a section opener.
   It used to bleed off both side trims, but anything laid out wider than
   the type area makes Chrome shrink the whole book to fit (it was printing
   at 70 per cent), so only standalone-merged pages may bleed now. */
function BleedBand({
  slug,
  pick,
  height = 96,
}: {
  slug: string;
  pick: Picker;
  height?: number;
}) {
  const img = pick(slug);
  if (!img) return null;
  return (
    <figure
      className="bleed-band"
      style={{ ["--band-h" as string]: `${height}mm` } as React.CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/print-images/print/${img.filename}`} alt={img.alt} />
    </figure>
  );
}

/* Fills the ragged foot of a section with a picture that bleeds off the
   outer and bottom trim edges. Height comes from the build, which measures
   the hole; CSS cannot size an element to the space left on a page. */
function SectionCloser({
  slug,
  id,
  pick,
}: {
  slug: string;
  id: string;
  pick: Picker;
}) {
  const h = fitMap[id];
  if (!h) return null;
  const img = pick(slug);
  if (!img) return null;
  return (
    <figure
      className="section-closer"
      style={{ ["--closer-h" as string]: `${h}mm` } as React.CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/print-images/print/${img.filename}`} alt={img.alt} />
    </figure>
  );
}


export function ChapterBlock({
  section,
  essay,
  caseStudy,
  dataSpread,
  guestOpinions,
  nextSection,
  spacerBefore,
  pick,
}: {
  section: (typeof sections)[number];
  essay: ReturnType<typeof getLeadEssay>;
  caseStudy: ReturnType<typeof getCase>;
  dataSpread: ReturnType<typeof getDataSpread>;
  guestOpinions: ReturnType<typeof getGuestOpinions>;
  nextSection: (typeof sections)[number] | null;
  spacerBefore?: boolean;
  pick: Picker;
}) {
  const chapterRunning = `Ch ${section.number}\u2003${section.title}`;

  // Split paragraphs: first paragraph (string) becomes intro with drop cap;
  // rest go in two-column flow.
  const rawParas = essay?.paragraphs ?? [];
  /* A note panel cannot be the last element of the essay. It carries
     break-inside: avoid, so when it does not fit it jumps to a page of its
     own, and the plate after it forces a break: one panel alone on an
     otherwise empty page (folio 11 of the previous proof). */
  const paras = (() => {
    const out = [...rawParas];
    const last = out[out.length - 1];
    if (last && typeof last !== "string" && last.type === "editorsNote") {
      out.splice(out.length - 1, 1);
      const at = Math.max(0, out.length - 2);
      out.splice(at, 0, last);
    }
    return out;
  })();
  let firstStringIdx = paras.findIndex((p) => typeof p === "string");
  if (firstStringIdx < 0) firstStringIdx = 0;
  const introPara = paras[firstStringIdx];
  const restParas = paras
    .filter((_, i) => i !== firstStringIdx)
    .concat(essay?.closingNote ?? []);

  /* Head pictures for the essay. Candidate anchors are the essay's
     crossheads; the k-th picture starts at an evenly spaced crosshead and
     the build may move it later (shift) or resize it (h), recorded in
     lib/print-fit.json as "<slug>:headK:shift" and "<slug>:headK:h". A
     height of 0 means the build found no crosshead where it lands well,
     and the picture is left out. */
  const h2Positions = restParas
    .map((p, i) => (typeof p === "object" && p !== null && p.type === "h2" ? i : -1))
    .filter((i) => i > 0);
  const headAt = new Map<number, { k: number; h: number }>();
  for (let k = 1; k <= HEADS_PER_ESSAY && h2Positions.length > 0; k++) {
    const base = Math.floor((k * h2Positions.length) / (HEADS_PER_ESSAY + 1));
    const shift = fitMap[`${section.slug}:head${k}:shift`] ?? 0;
    const idx = Math.min(h2Positions.length - 1, base + shift);
    const h = fitMap[`${section.slug}:head${k}:h`] ?? HEAD_DEFAULT_MM;
    if (h > 0 && !headAt.has(h2Positions[idx])) {
      headAt.set(h2Positions[idx], { k, h });
    }
  }
  const headPictures = new Map<number, PrintImage | null>();
  for (const [at] of [...headAt.entries()].sort((a, b) => a[0] - b[0])) {
    headPictures.set(at, pick(section.slug));
  }

  // Extract chapter h2 section headings to use as the "at a glance" list at
  // the chapter close. These are the structural argument of the chapter and
  // make a useful reader summary.
  const sectionHeadings = paras
    .filter((p): p is { type: "h2"; text: string } =>
      typeof p === "object" && p !== null && p.type === "h2"
    )
    .map((p) => p.text);


  const chNum = String(section.number).padStart(2, "0");

  return (
    <>
      {spacerBefore && <div className="print-spacer" aria-hidden />}
      {/* === Image-led chapter opener === */}
      <ChapterOpener section={section} readingTime={essay?.readingTime} />

      {/* Post-opener chapter sections share the chNN page master so versos
         carry the chapter-aware running head. The opener stays outside the
         scope: wrapping it breaks Chrome's forced-break + full-bleed page. */}
      <div className="chapter-scope" data-ch={chNum}>

      {/* === Lead essay: intro paragraph (drop cap, full-width) followed by two-column body in a single column context === */}
      {essay && (
        <section className="chapter-body" data-chapter={chapterRunning}>
          <span className="pdf-marker">{`[[SEC-${section.slug}:body]]`}</span>
          {(() => {
              const out: React.ReactNode[] = [];
              /* Segment boundaries: [index into out, plate index]. A plate
                 is NOT placed inside the multicol. Chrome handles a
                 column-span element inside a fragmented multicol badly:
                 it strands a balanced row above it, and with a forced page
                 break either side the print pass collapses (a 160-page
                 book took 78 minutes and then timed out). The essay is
                 split into separate multicol blocks with the plate as a
                 plain sibling between them, which is both faster and the
                 rule this document already states. */
              /* No plates inside the essay: a full page inside a fragmented
                 multicol paints a seam. Plates sit between sections. */
              const breaks: [number, number][] = [];
              let skipNext = -1;
              for (let i = 0; i < restParas.length; i++) {
                if (i === skipNext) continue;
                const para = restParas[i];
                if (typeof para === "string") {
                  out.push(<p key={`p-${i}`}>{para}</p>);
                  continue;
                }
                const head = headAt.get(i);
                const headImg = head ? headPictures.get(i) : null;
                if (head && headImg) {
                  /* Spans both columns from inside the flow. Chrome balances
                     the text above it into two short columns, which is the
                     fly GDN text-then-picture page; the build keeps that
                     block from being a stub and sizes the picture to the
                     space left so it never jumps and leaves a hole. */
                  out.push(
                    <figure
                      key={`head-${i}`}
                      className="head-pic"
                      style={{ ["--head-h" as string]: `${head.h}mm` } as React.CSSProperties}
                    >
                      <span className="pdf-marker">{`[[HEAD-${section.slug}-${head.k}]]`}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/print-images/print/${headImg.filename}`}
                        alt={headImg.alt}
                      />
                      {headImg.caption && <figcaption>{headImg.caption}</figcaption>}
                    </figure>,
                  );
                }
                if (para.type === "h2") {
                  /* Chrome honours break-inside: avoid inside a multicol but
                     not break-after: avoid, which is why headings kept
                     landing as the last thing in a column with the rule set.
                     Bind the heading to its opening paragraph in one
                     unbreakable box, but only when that paragraph is short:
                     binding a long one would move a whole page of type and
                     trade a stranded heading for a bigger hole. */
                  const follow = restParas[i + 1];
                  const shortFollow =
                    typeof follow === "string" && follow.split(/\s+/).length <= 45;
                  if (shortFollow) {
                    out.push(
                      <div className="keep-with-next" key={`h2k-${i}`}>
                        <h2>{para.text}</h2>
                        <p>{follow as string}</p>
                      </div>,
                    );
                    skipNext = i + 1;
                    continue;
                  }
                  out.push(
                    <h2
                      key={`h2-${i}`}
                    >
                      {para.text}
                    </h2>,
                  );
                  continue;
                }
                if (para.type === "blockquote") {
                  out.push(
                    <blockquote key={`bq-${i}`} className="chapter-body__pull">
                      {para.text}
                    </blockquote>
                  );
                  continue;
                }
                if (para.type === "figure") {
                  out.push(
                    <figure key={`fig-${i}`} className="chapter-body__figure chapter-body__figure--wide">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={para.src} alt={para.alt} />
                      <figcaption>{para.caption}</figcaption>
                    </figure>
                  );
                  continue;
                }
                if (para.type === "editorsNote") {
                  out.push(
                    <aside key={`en-${i}`} className="chapter-body__editors-note">
                      <p className="chapter-body__editors-note-text">{para.text}</p>
                    </aside>
                  );
                  continue;
                }
              }
              /* Deliberately no tail dump. Unused pictures stay unused:
                 appending the remainder produced a page of orphaned images
                 with no text beside them. */
              const segments: React.ReactNode[] = [];
              let cursor = 0;
              breaks.forEach(([at, plateIdx], bi) => {
                segments.push(
                  <div className="chapter-body__cols" key={`seg-${bi}`}>
                    {bi === 0 && introPara && typeof introPara === "string" && (
                      <p className="chapter-body__intro-para">{introPara}</p>
                    )}
                    {out.slice(cursor, at)}
                  </div>,
                );
                segments.push(
                  <PlatePage
                    key={`plate-${plateIdx}`}
                    slug={section.slug}
                    index={plateIdx}
                  />,
                );
                cursor = at;
              });
              segments.push(
                <div className="chapter-body__cols" key="seg-last">
                  {breaks.length === 0 &&
                    introPara &&
                    typeof introPara === "string" && (
                      <p className="chapter-body__intro-para">{introPara}</p>
                    )}
                  {out.slice(cursor)}
                </div>,
              );
              segments.push(
                <SectionCloser
                  key="body-closer"
                  slug={section.slug}
                  id={`${section.slug}:body`}
                  pick={pick}
                />,
              );
              return segments;
            })()}
        </section>
      )}

      {/* Plate one: the breath between the argument and the evidence. */}
      {PLATES_PER_CHAPTER > 0 && <PlatePage slug={section.slug} index={0} />}

      {/* Guest opinions */}
      {guestOpinions.filter((g) => g.questions.length > 0).map((guestOpinion, gi) => (
        <section
          key={gi}
          className="guest-opinion"
          data-chapter={chapterRunning}
        >
          <span className="pdf-marker">{`[[SEC-${section.slug}:guest]]`}</span>
          <BleedBand slug={section.slug} pick={pick} height={60} />
          {(() => {
            const avatar = getContributorProfile(
              guestOpinion.contributor
            )?.avatar;
            return (
              <div className={avatar ? "guest-opinion__head" : undefined}>
                {avatar && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={avatar}
                    alt={guestOpinion.contributor}
                    className="guest-opinion__portrait"
                  />
                )}
                <div>
                  <h2 className="guest-opinion__title">
                    In conversation with {guestOpinion.contributor}
                  </h2>
                  <p className="guest-opinion__intro">
                    {guestOpinion.contributorRole.replace(/\n/g, "; ")}. {guestOpinion.intro}
                  </p>
                </div>
              </div>
            );
          })()}
          <div className="guest-opinion__body">
            {guestOpinion.questions.map((qa, i) => (
              <React.Fragment key={i}>
                <div className="guest-opinion__qa">
                  <p className="guest-opinion__q">{qa.question}</p>
                  <div className="guest-opinion__a">
                    {qa.answer.map((para, ai) => (
                      <p key={ai}>{para}</p>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            ))}
            {(() => {
              const endPull = [...guestOpinion.questions]
                .reverse()
                .find((qa) => qa.pullQuote)?.pullQuote;
              return endPull ? (
                <div className="piece-end">
                  <blockquote className="piece-end__quote">{endPull}</blockquote>
                  <p className="piece-end__mark" aria-hidden>
                    ■
                  </p>
                </div>
              ) : null;
            })()}
          </div>
                  <SectionCloser
            slug={section.slug}
            id={`${section.slug}:guest`}
            pick={pick}
          />
        </section>
      ))}


      {/* Data spread */}
      {dataSpread && (
        <section
          className="data-spread"
          data-chapter={chapterRunning}
        >
          <span className="pdf-marker">{`[[SEC-${section.slug}:data]]`}</span>
          <header className="data-spread__opener">
            <h2 className="data-spread__title">{dataSpread.title}</h2>
            <p className="data-spread__standfirst">{dataSpread.standfirst}</p>
          </header>
          {(() => {
            /* Every data section prints (content lock, design brief of
               14 November 2026). */
            const blocks = dataSpread.blocks;

            /* Rule 3.11: every dataset on the page carries a head on a rule.
               Charts already get one from ChartFrame; tables and key-value
               blocks are numbered here in a separate Table series so the
               existing Figure numbers in lib/charts.tsx are undisturbed.
               Numbering runs after the one-form-per-dataset drop, so a
               dropped table does not consume a number. */
            const chNN = String(section.number).padStart(2, "0");
            let tableSeq = 0;
            const tableLabels = blocks.map((block, i) => {
              const next = blocks[i + 1];
              const dropped =
                (block.type === "table" || block.type === "kv") &&
                next?.type === "chart";
              if (dropped) return null;
              if (block.type !== "table" && block.type !== "kv") return null;
              tableSeq += 1;
              return `Table ${chNN}.${String(tableSeq).padStart(2, "0")}`;
            });
            /* Narrow blocks (prose, notes, key-value and two-column
               tables) run in a two-column flow: a two-column table stretched
               across the full 190mm measure was leaving a canyon down the
               middle of the page and was a large part of the trapped space.
               Wide blocks (charts, tables of three columns or more) stay at
               full measure and sit between the flows as siblings, because a
               chart at column measure would drop its labels to about 3.6pt,
               and because a column-span element inside a fragmented multicol
               strands a balanced row above it. */
            const isWide = (b: { type: string; head?: string[]; printProse?: string[] }) =>
              b.type === "chart" ||
              (b.type === "table" && !b.printProse && (b.head?.length ?? 0) > 2);

            const rendered = blocks.map((block, i) => {
            // One form per dataset in print: when a chart follows a table
            // or kv of the same data, the chart is the hero and the table
            // is dropped (the web edition keeps both).
            const next = blocks[i + 1];
            if (
              (block.type === "table" || block.type === "kv") &&
              next?.type === "chart"
            ) {
              return null;
            }
            if (block.type === "h2") {
              return <h2 key={i}>{block.text}</h2>;
            }
            if (block.type === "paragraph") {
              return <p key={i}>{domainsOnly(block.text)}</p>;
            }
            if (block.type === "table" && block.printProse) {
              /* Tables the editors have written out as text (15 November
                 2026): the same figures set as running text in the flow,
                 with the source line kept. */
              return (
                <div key={i} className="data-spread__prose">
                  {block.printProse
                    .filter((t) => t.trim())
                    .map((t, pi) => (
                      <p key={pi}>{domainsOnly(t.trim())}</p>
                    ))}
                  {block.sourceLine && (
                    <p className="data-spread__source">{domainsOnly(block.sourceLine)}</p>
                  )}
                </div>
              );
            }
            if (block.type === "table") {
              /* Short tables are kept whole: split, they strand a row or
                 two on the next page. Long tables still break between rows. */
              const short = block.rows.length <= 8;
              return (
                <div
                  key={i}
                  className={`data-spread__block${short ? " data-spread__block--whole" : ""}`}
                >
                  <table className="data-spread__table">
                    <thead>
                      <tr>
                        {block.head.map((h, hi) => (
                          <th key={hi}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr key={ri}>
                          {row.map((cell, ci) => (
                            <td key={ci}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {block.caption && (
                    <p className="data-spread__caption data-spread__caption--below">
                      {domainsOnly(block.caption)}
                    </p>
                  )}
                  {block.sourceLine && (
                    <p className="data-spread__source">{domainsOnly(block.sourceLine)}</p>
                  )}
                </div>
              );
            }
            if (block.type === "kv") {
              return (
                <div key={i} className="data-spread__block">
                  <table className="data-spread__kv">
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr key={ri}>
                          <td className="data-spread__kv-label">{row.label}</td>
                          <td className="data-spread__kv-value">
                            {row.value}
                            {row.note && (
                              <em className="data-spread__kv-note">{row.note}</em>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {block.caption && (
                    <p className="data-spread__caption data-spread__caption--below">
                      {domainsOnly(block.caption)}
                    </p>
                  )}
                  {block.sourceLine && (
                    <p className="data-spread__source">{domainsOnly(block.sourceLine)}</p>
                  )}
                </div>
              );
            }
            if (block.type === "note") {
              return (
                <aside key={i} className="chapter-body__editors-note">
                  <p className="chapter-body__editors-note-text">{domainsOnly(block.text)}</p>
                </aside>
              );
            }
            if (block.type === "chart") {
              return (
                <div key={i} className="data-spread__chart">
                  {renderChartForPrint(block.chartId, {
                    omitIfSame: [
                      dataSpread.title,
                      dataSpread.standfirst,
                      // the section heading just above the chart
                      (blocks
                        .slice(0, i)
                        .reverse()
                        .find((x) => x.type === "h2") as { text?: string } | undefined)?.text,
                    ],
                  })}
                </div>
              );
            }
            return null;
            });

            /* Group runs of narrow blocks into two-column flows. */
            const nodes: React.ReactNode[] = [];
            let bucket: React.ReactNode[] = [];
            /* Type of the last block that actually rendered into the bucket.
               The block before a chart is often a table the print drops (one
               form per dataset), so looking at blocks[i - 1] missed the
               heading and left it alone in a two-column box above the chart. */
            let lastType: string | null = null;
            const flush = (key: string) => {
              lastType = null;
              if (!bucket.length) return;
              nodes.push(
                <div className="data-spread__flow" key={`flow-${key}`}>
                  {bucket}
                </div>,
              );
              bucket = [];
            };
            blocks.forEach((block, i) => {
              const node = rendered[i];
              if (node == null) return;
              if (isWide(block)) {
                /* A heading that would be the last thing in the narrow flow
                   belongs to the chart that follows it. Left where it was,
                   it sat in one container and the chart in its sibling, so
                   no selector could hold them together and the heading was
                   left floating on its own page. */
                const trailingHead = lastType === "h2" ? bucket.pop() : null;
                flush(`b${i}`);
                nodes.push(
                  <div className="data-spread__wide" key={`wide-${i}`}>
                    {trailingHead}
                    {node}
                  </div>,
                );
              } else {
                bucket.push(node);
                lastType = block.type;
              }
            });
            flush("tail");
            nodes.push(
              <SectionCloser
                key="data-closer"
                slug={section.slug}
                id={`${section.slug}:data`}
                pick={pick}
              />,
            );
            return nodes;
          })()}
        </section>
      )}

      {/* Plate two: between the outside voice and the transaction. */}
      {PLATES_PER_CHAPTER > 1 && <PlatePage slug={section.slug} index={1} />}

      {/* Case study */}
      {caseStudy && (
        <section
          className="case-section"
          data-chapter={chapterRunning}
        >
          <span className="pdf-marker">{`[[SEC-${section.slug}:case]]`}</span>
          <header className="case-section__opener">
            <h2 className="case-section__title">{caseStudy.title}</h2>
            <p className="case-section__standfirst">{caseStudy.standfirst}</p>
            {/* The case facts as one run-in line, not a panel of spaced
                capital labels each sitting over its value. */}
            <p className="case-section__facts">
              {caseStudy.meta.map((m, i) => (
                <React.Fragment key={i}>
                  {i > 0 && "\u2003"}
                  <span className="case-section__facts-label">{m.label}</span>{" "}
                  {m.value}
                </React.Fragment>
              ))}
            </p>
            <BleedBand slug={section.slug} pick={pick} height={60} />
          </header>

          <div className="case-section__body">
            {(() => {
              const out: React.ReactNode[] = [];
              caseStudy.paragraphs.forEach((p, i) => {
                if (typeof p === "string") {
                  out.push(<p key={i}>{p}</p>);
                  /* No pictures inside the case text. The case opens on a
                     picture across the head of the page and its foot is
                     filled by the closer; anything dropped between its
                     paragraphs jumped and left a hole. */
                  return;
                }
                if (p.type === "h2") {
                  out.push(<h2 key={i}>{p.text}</h2>);
                  return;
                }
                if (p.type === "blockquote") {
                  out.push(
                    <blockquote key={i} className="chapter-body__pull">
                      {p.text}
                      {p.attribution && <footer>{p.attribution}</footer>}
                    </blockquote>
                  );
                }
              });
              return out;
            })()}
            <p className="case-section__disclosure">
              <strong>Disclosure.</strong> {caseStudy.disclosure}
            </p>
            {caseStudy.takeaways?.[0] && (
              <div className="piece-end">
                <blockquote className="piece-end__quote">
                  {caseStudy.takeaways[0]}
                </blockquote>
                <p className="piece-end__mark" aria-hidden>
                  ■
                </p>
              </div>
            )}
          </div>
                  {/* Chapter close (specification section 8, register R7): one card at
              the foot of the last page, always in the same place, as fly GDN
              ends every article with the same box. It replaces a closer page and
              an at-a-glance page that together left two mostly empty pages per
              chapter. It sits inside the case section, ahead of the closer, so the
              closer picture fills whatever space the card leaves. */}
          {nextSection && (
            <aside className="chapter-card" data-chapter={chapterRunning}>
              <div className="chapter-card__col">
                <h3 className="chapter-card__head">In this chapter</h3>
                <ol className="chapter-card__list">
                  {sectionHeadings.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ol>
              </div>
              <div className="chapter-card__col">
                <h3 className="chapter-card__head">About the cases</h3>
                <p className="chapter-card__text">
                  Cases are drawn from the Foreland Marine project archive, from a
                  single engagement or a composite of closely analogous
                  engagements where anonymity demanded it. Adjusted figures
                  preserve the structural pattern of cost, decision, and outcome.
                  Cases sit alongside the chapter&rsquo;s data spread, not in
                  place of it. The arithmetic is the load-bearing argument.
                  Apply the test in chapter nine to your own
                  situation before drawing any conclusion from the case.
                </p>
                <p className="chapter-card__text">
                  Practitioners who recognise the pattern or who disagree with
                  the reading are welcome at editors@firstownersreference.com.
                  Disagreement is read in full and reflected in the next edition
                  where it holds up.
                </p>
              </div>
              <div className="chapter-card__col chapter-card__col--next">
                <h3 className="chapter-card__head">Read next</h3>
                <p className="chapter-card__next-num">Chapter {nextSection.number}</p>
                <p className="chapter-card__next-title">{nextSection.title}</p>
                <p className="chapter-card__text">{nextSection.standfirst}</p>
              </div>
            </aside>
          )}
          {/* No foot picture after the case: the chapter card ends the
              chapter. A case closer that did not fit jumped to a page of its
              own and forced a blank page before the next opener (design
              brief section 6, "treatment of deliberately blank pages"). */}
        </section>
      )}


      </div>
    </>
  );
}
