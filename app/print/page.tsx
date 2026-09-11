import React from "react";
import { sections } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { getCase } from "@/lib/cases";
import { getDataSpread } from "@/lib/data-spreads";
import { glossaryEntries } from "@/lib/glossary";
import { getGuestOpinions } from "@/lib/guest-opinions";
import { printImages } from "@/lib/print-images";
import { renderChartForPrint } from "@/components/print/print-chart";
import { getContributorProfile } from "@/lib/contributors";
import { buildPrintIndex } from "@/lib/print-index";
import printFolios from "@/lib/print-folios.json";
import {
  FrontispiecePage,
  ClosingImagePage,
  ChapterOpener,
  PlatePage,
} from "@/components/print/full-bleed-pages";

const folios = printFolios as {
  chapters: Record<string, number>;
  refs: Record<string, number>;
  spacers: string[];
};

/* Chrome supports named @page masters with margin boxes but not
   string-set, so the chapter-aware verso running heads are generated
   here as per-chapter masters, kept in sync with sections.ts. */
function chapterMastersCss() {
  return sections
    .map((s) => {
      const nn = String(s.number).padStart(2, "0");
      const title = s.title.replace(/"/g, '\\"');
      return `
@page ch${nn}:left {
  @top-left {
    content: "Ch ${nn} \\00b7\\0020${title}";
    font-family: "DM Sans", "Helvetica Neue", sans-serif;
    font-size: 7pt;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #7a756d;
    padding-top: 11mm;
    background: #f5f2ec;
  }
}
.chapter-scope[data-ch="${nn}"] { page: ch${nn}; }`;
    })
    .join("\n");
}

function tocFolio(v: number | undefined) {
  return v !== undefined ? String(v) : "·";
}

/* Column-measure picture shapes, cycled so no two adjacent figures share a
   silhouette. half = half the column height, feature = 4:5 portrait,
   wide = 4:3 landscape. Nothing here spans the columns: Chrome balances
   rather than fills a fragmented multicol, so a spanner strands a row. */
const FIGURE_CYCLE = ["half", "feature", "half", "wide", "feature", "half"];

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
        <p className="title-page__edition">1st Edition · 2026</p>
        <h1 className="title-page__title">
          The First Owner&rsquo;s Reference
        </h1>
        <p className="title-page__strap">
          An annual editorial publication on the structural, financial, and
          operational dimensions of first-time superyacht acquisition.
          Or rather, how to buy a boat.
        </p>

        <div className="title-page__frame">
          <p className="title-page__frame-label">The publisher&rsquo;s frame</p>
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
            <p className="title-page__foot-value">First, September 2026</p>
          </div>
        </div>

        <div className="title-page__sections">
          <p className="title-page__sections-label">In this edition</p>
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
        <p className="imprint__label">Imprint &amp; Masthead</p>
        <h2 className="imprint__title">
          The First Owner&rsquo;s Reference, 1st Edition, 2026.
        </h2>

        <div className="imprint__cols">
          <p>
            Published by Foreland Marine Consultancy Limited, 7 Bell Yard,
            London WC2A 2JR. ISSN pending. © 2026 Foreland Marine Consultancy
            Limited. All rights reserved. No advertising, ever.
          </p>
          <p>
            Set in Newsreader by Production Type, DM Sans and DM Mono by
            Indian Type Foundry. Printed on Munken Pure 120gsm uncoated
            text stock with GF Smith Colorplan cover boards. Smyth-sewn,
            casebound. Trim 230 by 300 mm. Five hundred copies, hand
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
              acknowledged. The next edition is scheduled for September 2027,
              with a quarterly update published online between editions at
              firstownersreference.com.
            </p>
          </div>
        </div>
      </section>

      {/* === EDITORS' LETTER === */}
      <section className="editors-letter">
        <p className="editors-letter__label">From the editors</p>
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
            Co-editors in Chief, London, September 2026
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
        <p className="contents-page__label">Contents</p>
        <h2 className="contents-page__title">Nine chapters.</h2>

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
        <p className="contributors-page__label">Contributors</p>
        <h2 className="contributors-page__title">
          Voluntary, named, and disclosed.
        </h2>
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
                  Chapter {s.number} · {s.title}
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
        />
      ))}

      {/* === GLOSSARY === */}
      <section className="glossary-section" id="ref-glossary">
        <span className="pdf-marker">[[REF-GLOSSARY]]</span>
        <p className="glossary-section__label">A — Reference</p>
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
        <p className="glossary-section__label">B — Reference</p>
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
        <p className="glossary-section__label">C — Reference</p>
        <h2 className="glossary-section__title">Sources</h2>
        <p className="glossary-section__strap">
          Consolidated bibliography by chapter. Named publications,
          practitioner attributions, and court citations are listed in the
          order they appear in the chapter text.
        </p>
        {allEssays.map(({ section, dataSpread }) => (
          <div key={section.slug}>
            <h2>
              Chapter {section.number} · {section.title}
            </h2>
            {dataSpread?.sources.length ? (
              <ul>
                {dataSpread.sources.map((src, i) => (
                  <li key={i}>
                    <strong>{src.label}.</strong> {src.line}
                    {src.url ? (
                      <>
                        {" "}
                        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "7.5pt" }}>
                          {src.url}
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
        <p className="glossary-section__label">D — Reference</p>
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

        <h2>Type</h2>
        <p>
          Body and display type set in <strong>Newsreader</strong> by
          Production Type. Sans and metadata in <strong>DM Sans</strong>{" "}
          and <strong>DM Mono</strong> by Indian Type Foundry. All
          families are open source and self-hosted on the web edition.
        </p>

        <h2>Paper and binding</h2>
        <p>
          Set on Munken Pure 120gsm uncoated text stock with cover boards in
          GF Smith Colorplan. Smyth-sewn, casebound, head and tail bands in
          marine, single ribbon marker. Foil-stamped wordmark and
          blind-debossed lighthouse mark. Trim 230 by 300 mm. Five hundred
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
          <br />
          Editor: To be appointed. Art director: To be appointed. Picture
          editor: To be appointed. Researcher and fact checker: To be
          appointed.
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
          the publisher as it does to every other adviser. Its answers are
          set out below.
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
          <strong>3. Counterparty list.</strong> Foreland publishes a complete
          list of yards, brokers, lawyers, surveyors, and management companies
          engaged by clients of the firm in the past three years, available
          on request.
        </p>
        <p>
          <strong>4. Fee transparency.</strong> Fees are quoted in writing
          before any engagement. Hourly rates, fixed project fees, and
          retainer rates are published on engagement. No success fees. No
          commissions.
        </p>
        <p>
          <strong>5. Professional indemnity insurance.</strong> Foreland holds
          professional indemnity cover with ITIC, the marine professional
          indemnity mutual, at GBP 500,000 per claim. Project-specific excess
          cover is placed where an engagement requires it.
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
          The second edition is scheduled for September 2027. It will carry
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
/* Section marker chip. Glyph choices read at 9mm: a paragraph mark for the
   essay, a bar-chart block for data, a section mark for the case, a quote
   mark for the guest voice. */
function SectionChip({
  glyph,
  title,
  sub,
}: {
  glyph: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="section-chip">
      <div className="section-chip__mark">{glyph}</div>
      <p className="section-chip__label">
        {title}
        <span>{sub}</span>
      </p>
    </div>
  );
}

function ChapterBlock({
  section,
  essay,
  caseStudy,
  dataSpread,
  guestOpinions,
  nextSection,
  spacerBefore,
}: {
  section: (typeof sections)[number];
  essay: ReturnType<typeof getLeadEssay>;
  caseStudy: ReturnType<typeof getCase>;
  dataSpread: ReturnType<typeof getDataSpread>;
  guestOpinions: ReturnType<typeof getGuestOpinions>;
  nextSection: (typeof sections)[number] | null;
  spacerBefore?: boolean;
}) {
  const chapterRunning = `Ch ${section.number} · ${section.title}`;

  // Split paragraphs: first paragraph (string) becomes intro with drop cap;
  // rest go in two-column flow.
  const paras = essay?.paragraphs ?? [];
  let firstStringIdx = paras.findIndex((p) => typeof p === "string");
  if (firstStringIdx < 0) firstStringIdx = 0;
  const introPara = paras[firstStringIdx];
  const restParas = paras
    .filter((_, i) => i !== firstStringIdx)
    .concat(essay?.closingNote ?? []);

  // Identify positions to insert supporting images. Place after every 4th
  // string paragraph in the rest flow.
  const supList = printImages.supporting?.[section.slug] ?? [];
  /* The essay consumes the front of the pool; the case and the guest Q&A
     draw from the back so no picture appears twice in one chapter. */
  const caseExtras = supList.slice(-6);
  const tallImage = printImages.tall?.[section.slug];
  const caseImage = printImages.cases?.[section.slug];

  // Extract chapter h2 section headings to use as the "at a glance" list at
  // the chapter close. These are the structural argument of the chapter and
  // make a useful reader summary.
  const sectionHeadings = paras
    .filter((p): p is { type: "h2"; text: string } =>
      typeof p === "object" && p !== null && p.type === "h2"
    )
    .map((p) => p.text);

  // Pull the first blockquote in the essay for use as the chapter-close
  // pull quote. Falls back to the chapter standfirst if no quote exists.
  const firstQuote = paras.find(
    (p): p is { type: "blockquote"; text: string; attribution?: string } =>
      typeof p === "object" && p !== null && p.type === "blockquote"
  );

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
          <div className="chapter-body__cols">
            {introPara && typeof introPara === "string" && (
              <p className="chapter-body__intro-para">{introPara}</p>
            )}
            {(() => {
              const out: React.ReactNode[] = [];
              let stringCount = 0;
              let supIdx = 0;
              /* Spread the pictures evenly across however many paragraphs
                 this essay actually has, rather than firing on a fixed
                 interval and dumping the remainder at the end. Step of at
                 least 2 keeps two consecutive figures from colliding in
                 one column. */
              const paraCount = restParas.filter(
                (x) => typeof x === "string",
              ).length;
              const figureStep = Math.max(
                2,
                Math.floor((paraCount - 3) / Math.max(1, supList.length)),
              );
              /* Full-page plates at the quarter and three-quarter points.
                 They render here as placeholders and are replaced at merge
                 time by the standalone print. */
              const plateAt = [
                Math.round(paraCount * 0.28),
                Math.round(paraCount * 0.72),
              ];
              for (let i = 0; i < restParas.length; i++) {
                const para = restParas[i];
                if (typeof para === "string") {
                  out.push(<p key={`p-${i}`}>{para}</p>);
                  stringCount++;
                  const plateIdx = plateAt.indexOf(stringCount);
                  if (plateIdx > -1) {
                    out.push(
                      <PlatePage
                        key={`plate-${plateIdx}`}
                        slug={section.slug}
                        index={plateIdx}
                      />,
                    );
                  }
                  // Picture cadence. The August proof injected one figure
                  // every four paragraphs, which left the book 71 per cent
                  // text-led against a reference set running 4 to 27. The
                  // cadence is now every second paragraph, cycling through
                  // four column-measure shapes so the page never repeats a
                  // silhouette, with the tall figure opening the essay.
                  if (stringCount === 3 && tallImage) {
                    out.push(
                      <figure
                        key={`tall-${i}`}
                        className="chapter-body__figure chapter-body__figure--tall"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/print-images/print/${tallImage.filename}`}
                          alt={tallImage.alt}
                        />
                      </figure>
                    );
                  }
                  if (
                    stringCount > 3 &&
                    (stringCount - 3) % figureStep === 0 &&
                    supIdx < supList.length
                  ) {
                    const sup = supList[supIdx];
                    const shape = FIGURE_CYCLE[supIdx % FIGURE_CYCLE.length];
                    out.push(
                      <figure
                        key={`sup-${i}`}
                        className={`chapter-body__figure chapter-body__figure--${shape}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/print-images/print/${sup.filename}`}
                          alt={sup.alt}
                        />
                        {sup.caption && <figcaption>{sup.caption}</figcaption>}
                      </figure>
                    );
                    supIdx++;
                  }
                  continue;
                }
                if (para.type === "h2") {
                  out.push(<h2 key={`h2-${i}`}>{para.text}</h2>);
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
                      <p className="chapter-body__editors-note-label">Note</p>
                      <p className="chapter-body__editors-note-text">{para.text}</p>
                    </aside>
                  );
                  continue;
                }
              }
              /* Deliberately no tail dump. Unused pictures stay unused:
                 appending the remainder produced a page of orphaned images
                 with no text beside them. */
              return out;
            })()}
          </div>
        </section>
      )}

      {/* Guest opinions */}
      {guestOpinions.filter((g) => g.questions.length > 0).map((guestOpinion, gi) => (
        <section
          key={gi}
          className="guest-opinion"
          data-chapter={chapterRunning}
        >
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
                  <p className="guest-opinion__label">Guest opinion</p>
                  <h2 className="guest-opinion__title">
                    In conversation with {guestOpinion.contributor}
                  </h2>
                  <p className="guest-opinion__intro">
                    {guestOpinion.contributorRole}. {guestOpinion.intro}
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
                {/* A picture between every second answer, from the back of
                    the chapter pool. The Q&As ran as unbroken grey columns
                    across three or four pages before this. */}
                {i % 2 === 1 && caseExtras[((i - 1) / 2) % Math.max(1, caseExtras.length)] && (
                  <figure
                    className={`chapter-body__figure chapter-body__figure--${
                      FIGURE_CYCLE[(i + 2) % FIGURE_CYCLE.length]
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/print-images/print/${
                        caseExtras[((i - 1) / 2) % Math.max(1, caseExtras.length)].filename
                      }`}
                      alt={caseExtras[((i - 1) / 2) % Math.max(1, caseExtras.length)].alt}
                    />
                  </figure>
                )}
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
        </section>
      ))}

      {/* Data spread */}
      {dataSpread && (
        <section className="data-spread" data-chapter={chapterRunning}>
          <header className="data-spread__opener">
            <SectionChip
              glyph="\u2590\u2588"
              title="The evidence"
              sub={`Chapter ${chNum} data`}
            />
            <h2 className="data-spread__title">{dataSpread.title}</h2>
            <p className="data-spread__standfirst">{dataSpread.standfirst}</p>
          </header>
          {(() => {
            /* Rule 3.11: every dataset on the page carries a head on a rule.
               Charts already get one from ChartFrame; tables and key-value
               blocks are numbered here in a separate Table series so the
               existing Figure numbers in lib/charts.tsx are undisturbed.
               Numbering runs after the one-form-per-dataset drop, so a
               dropped table does not consume a number. */
            const chNN = String(section.number).padStart(2, "0");
            let tableSeq = 0;
            const tableLabels = dataSpread.blocks.map((block, i) => {
              const next = dataSpread.blocks[i + 1];
              const dropped =
                (block.type === "table" || block.type === "kv") &&
                next?.type === "chart";
              if (dropped) return null;
              if (block.type !== "table" && block.type !== "kv") return null;
              tableSeq += 1;
              return `Table ${chNN}.${String(tableSeq).padStart(2, "0")}`;
            });
            return dataSpread.blocks.map((block, i) => {
            // One form per dataset in print: when a chart follows a table
            // or kv of the same data, the chart is the hero and the table
            // is dropped (the web edition keeps both).
            const next = dataSpread.blocks[i + 1];
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
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === "table") {
              return (
                <div key={i} className="data-spread__block">
                  <p className="data-spread__fig-label">{tableLabels[i]}</p>
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
                      {block.caption}
                    </p>
                  )}
                  {block.sourceLine && (
                    <p className="data-spread__source">{block.sourceLine}</p>
                  )}
                </div>
              );
            }
            if (block.type === "kv") {
              return (
                <div key={i} className="data-spread__block">
                  <p className="data-spread__fig-label">{tableLabels[i]}</p>
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
                      {block.caption}
                    </p>
                  )}
                  {block.sourceLine && (
                    <p className="data-spread__source">{block.sourceLine}</p>
                  )}
                </div>
              );
            }
            if (block.type === "note") {
              return (
                <aside key={i} className="chapter-body__editors-note">
                  <p className="chapter-body__editors-note-label">Note</p>
                  <p className="chapter-body__editors-note-text">{block.text}</p>
                </aside>
              );
            }
            if (block.type === "chart") {
              return (
                <div key={i} className="data-spread__chart">
                  {renderChartForPrint(block.chartId)}
                </div>
              );
            }
            return null;
            });
          })()}
        </section>
      )}

      {/* Case study */}
      {caseStudy && (
        <section className="case-section" data-chapter={chapterRunning}>
          <header className="case-section__opener">
            <SectionChip
              glyph="\u00a7"
              title="One transaction"
              sub={`Chapter ${chNum} case study`}
            />
            <h2 className="case-section__title">{caseStudy.title}</h2>
            <p className="case-section__standfirst">{caseStudy.standfirst}</p>
            <div className="case-section__meta">
              {caseStudy.meta.map((m, i) => (
                <div key={i} className="case-section__meta-item">
                  <p className="case-section__meta-label">{m.label}</p>
                  <p className="case-section__meta-value">{m.value}</p>
                </div>
              ))}
            </div>
          </header>

          <div className="case-section__body">
            {(() => {
              const out: React.ReactNode[] = [];
              let strings = 0;
              caseStudy.paragraphs.forEach((p, i) => {
                if (typeof p === "string") {
                  out.push(<p key={i}>{p}</p>);
                  strings++;
                  /* Same picture cadence as the lead essay. The case pages
                     were the largest block of text-led pages in the book:
                     one image across four to six pages. They now draw from
                     the back of the chapter's supporting pool, which the
                     essay does not reach. */
                  if (strings === 3 && caseImage) {
                    out.push(
                      <figure key={`case-fig-${i}`} className="case-section__figure">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/print-images/print/${caseImage.filename}`}
                          alt={caseImage.alt}
                        />
                      </figure>
                    );
                  }
                  if (strings > 3 && (strings - 3) % 2 === 0) {
                    const pick = caseExtras[(strings - 5) / 2 % Math.max(1, caseExtras.length)];
                    if (pick) {
                      out.push(
                        <figure
                          key={`case-sup-${i}`}
                          className={`chapter-body__figure chapter-body__figure--${
                            FIGURE_CYCLE[strings % FIGURE_CYCLE.length]
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/print-images/print/${pick.filename}`}
                            alt={pick.alt}
                          />
                        </figure>
                      );
                    }
                  }
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
        </section>
      )}

      {/* Chapter close: a full-page typographic moment that ends the chapter.
          Top half is a large pull quote echoing the chapter argument. Bottom
          half is a structural foot with Read next and the at-a-glance list of
          the chapter's section headings. A giant chapter number sits behind
          the composition as architecture, not decoration. */}
      {nextSection && (
        <aside className="chapter-close" data-chapter={chapterRunning}>
          <div className="chapter-close__big-num" aria-hidden>
            {String(section.number).padStart(2, "0")}
          </div>
          <div className="chapter-close__head">
            <p className="chapter-close__end-label">
              Chapter {String(section.number).padStart(2, "0")} closes
            </p>
            <h3 className="chapter-close__section-title">{section.title}</h3>
          </div>
          {firstQuote && (
            <blockquote className="chapter-close__quote">
              {firstQuote.text}
              <footer>
                {firstQuote.attribution ?? `Chapter ${String(section.number).padStart(2, "0")} · ${section.title}`}
              </footer>
            </blockquote>
          )}
          <div className="chapter-close__bottom">
          <div className="chapter-close__method">
            <div className="chapter-close__method-block">
              <p className="chapter-close__method-label">Case provenance</p>
              <p className="chapter-close__method-body">
                Cases are drawn from the Foreland Marine project archive,
                from a single engagement or a composite of closely analogous
                engagements where anonymity demanded it. Adjusted figures
                preserve the structural pattern of cost, decision, and
                outcome.
              </p>
            </div>
            <div className="chapter-close__method-block">
              <p className="chapter-close__method-label">How to read</p>
              <p className="chapter-close__method-body">
                Cases sit alongside the chapter&rsquo;s data spread, not in
                place of it. The arithmetic is the load-bearing argument.
                Apply the test in chapter nine to your own situation before
                drawing any conclusion from the case.
              </p>
            </div>
            <div className="chapter-close__method-block">
              <p className="chapter-close__method-label">Correspondence</p>
              <p className="chapter-close__method-body">
                Practitioners who recognise the pattern or who disagree with
                the reading are welcome at editors@firstownersreference.com.
                Disagreement is read in full and reflected in the next
                edition where it holds up.
              </p>
            </div>
          </div>

          <div className="chapter-close__foot">
            <div className="chapter-close__foot-col chapter-close__foot-col--next">
              <p className="chapter-close__label">Read next</p>
              <p className="chapter-close__num">
                Chapter {nextSection.number}
              </p>
              <h3 className="chapter-close__title">{nextSection.title}</h3>
              <p className="chapter-close__standfirst">
                {nextSection.standfirst}
              </p>
            </div>
            {sectionHeadings.length > 0 && (
              <div className="chapter-close__foot-col chapter-close__foot-col--glance">
                <p className="chapter-close__glance-label">
                  Chapter {section.number} at a glance
                </p>
                <ol className="chapter-close__glance-list">
                  {sectionHeadings.map((h, i) => (
                    <li key={i}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <p>{h}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          </div>
        </aside>
      )}
      </div>
    </>
  );
}
