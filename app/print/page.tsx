import { sections } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { getCase } from "@/lib/cases";
import { getDataSpread } from "@/lib/data-spreads";
import { glossaryEntries } from "@/lib/glossary";
import { getGuestOpinion } from "@/lib/guest-opinions";
import { printImages } from "@/lib/print-images";
import { renderChartForPrint } from "@/components/print/print-chart";
import { buildPrintIndex } from "@/lib/print-index";

export const dynamic = "force-static";

const COVER_PATH = `/print-images/print/${printImages.cover.filename}`;
const FRONTISPIECE_PATH = `/print-images/print/${printImages.frontispiece.filename}`;
const CLOSING_PATH = `/print-images/print/${printImages.closing.filename}`;

function chapterImagePath(slug: string) {
  return `/print-images/print/${printImages.chapters[slug]?.filename ?? "ch01.jpg"}`;
}

export default function PrintEdition() {
  const allEssays = sections.map((s) => ({
    section: s,
    essay: getLeadEssay(s.slug),
    caseStudy: getCase(s.slug),
    dataSpread: getDataSpread(s.slug),
    guestOpinion: getGuestOpinion(s.slug),
  }));

  const indexEntries = buildPrintIndex(sections, glossaryEntries);

  return (
    <>
      {/* === COVER === */}
      <section className="cover-page">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={COVER_PATH}
          alt={printImages.cover.alt}
          className="cover-page__image"
        />
        <div className="cover-page__inner">
          <p className="cover-page__edition">1st Edition · 2026</p>
          <div>
            <h1 className="cover-page__wordmark">
              The First Owner&rsquo;s Reference
            </h1>
            <p className="cover-page__strap">
              An annual editorial publication for first-time superyacht buyers.
            </p>
          </div>
          <p className="cover-page__publisher">Foreland Marine · London</p>
        </div>
      </section>

      {/* === HALF TITLE === */}
      <section className="half-title">
        <p className="half-title__wordmark">The First Owner&rsquo;s Reference</p>
      </section>

      {/* === FRONTISPIECE (verso) === */}
      <section className="frontispiece">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FRONTISPIECE_PATH}
          alt={printImages.frontispiece.alt}
          className="frontispiece__image"
        />
      </section>

      {/* === TITLE PAGE (recto) === */}
      <section className="title-page">
        <div>
          <p className="title-page__edition">1st Edition · 2026</p>
          <h1 className="title-page__title">
            The First Owner&rsquo;s Reference
          </h1>
          <p className="title-page__strap">
            An annual editorial publication on the structural, financial, and
            operational dimensions of first-time superyacht acquisition. Or
            rather, how to buy a boat.
          </p>
        </div>
        <p className="title-page__publisher">
          Foreland Marine, London &nbsp;&middot;&nbsp; firstownersreference.com
        </p>
      </section>

      {/* === IMPRINT === */}
      <section className="imprint">
        <p>
          <strong>The First Owner&rsquo;s Reference</strong>, 1st Edition, 2026.
          Published by Foreland Marine Consultancy Limited, 7 Bell Yard,
          London WC2A 2JR.
        </p>
        <p>
          Edited by Jack MacNally and Daniel Marks. Editorial correspondence:
          editors@firstownersreference.com.
        </p>
        <p>
          Set in Newsreader by Production Type, Geist and Geist Mono by Vercel.
          Printed on Munken Pure 120gsm uncoated text stock with GF Smith
          Colorplan cover boards. Smyth-sewn, casebound. Trim 230 by 300 mm.
          Five hundred copies, hand numbered.
        </p>
        <p>
          ISSN pending. © 2026 Foreland Marine Consultancy Limited.
          All rights reserved. No advertising, ever.
        </p>
        <p>
          The independence test that runs through this publication is
          applied to the publisher itself. The full disclosure is on the
          colophon at the back of this edition.
        </p>
      </section>

      {/* === EDITORS' LETTER === */}
      <section className="editors-letter">
        <p className="editors-letter__label">From the editors</p>
        <h2 className="editors-letter__title">
          A reference written from the other side of the table.
        </h2>

        <p>
          The superyacht trade press is funded by the yards and brokers
          whose interests it covers. That structure is not a moral
          failing; it is simply how those publications fund themselves.
          The First Owner&rsquo;s Reference is funded differently, and
          written differently. The independence is structural rather
          than stylistic.
        </p>

        <p>
          It is written for the reader who has recently exited a business
          or come into liquidity, has the means to buy a yacht, and would
          like to do so with full visibility of cost, time, and the
          structure of the conversations ahead. It is published once a
          year, in print and online, by an independent consultancy that
          holds no yard affiliations and takes no broker commissions.
        </p>

        <p>
          The publication is structured in numbered chapters. Each
          carries a lead essay, a data spread, a guest opinion from a
          named contributor, an anonymised case, and a one-page
          checklist. The aim is a calm, evidence-led reference a
          first-time owner can hold alongside the conversations that
          matter.
        </p>

        <p>
          Read in any order. Run your own numbers through the calculator
          on the website. The independence test in the closing chapter
          is offered for application to the publisher first, and then to
          any other firm a reader is considering. Editorial
          correspondence reaches us at editors@firstownersreference.com
          and is read by the team personally.
        </p>

        <p>
          We do hope it is useful.
        </p>

        <p className="editors-letter__signature">
          Jack MacNally and Daniel Marks
          <br />
          Co-editors in Chief, London, September 2026
        </p>
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
              <span className="contents-list__folio" aria-hidden>
                ·
              </span>
            </li>
          ))}
        </ol>

        <ol className="contents-list" style={{ marginTop: "10mm" }}>
          <li className="contents-list__item">
            <span className="contents-list__num">A</span>
            <div className="contents-list__main">
              <h3 className="contents-list__title">Glossary</h3>
              <p className="contents-list__standfirst">
                {glossaryEntries.length} terms drawn from across the chapters,
                set as a continuous reference.
              </p>
            </div>
            <span className="contents-list__folio">·</span>
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
            <span className="contents-list__folio">·</span>
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
            <span className="contents-list__folio">·</span>
          </li>
          <li className="contents-list__item">
            <span className="contents-list__num">D</span>
            <div className="contents-list__main">
              <h3 className="contents-list__title">Colophon</h3>
              <p className="contents-list__standfirst">
                Editorial principles, type, paper, photography, and the
                publisher&rsquo;s own answers to the independence test in
                chapter 09.
              </p>
            </div>
            <span className="contents-list__folio">·</span>
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
          {sections
            .filter((s) => s.contributor && s.contributor !== "To be confirmed")
            .map((s) => (
              <div key={s.slug} className="contributor-entry">
                <p className="contributor-entry__chapter">
                  Chapter {s.number} · {s.title}
                </p>
                <h3 className="contributor-entry__name">{s.contributor}</h3>
                <p className="contributor-entry__role">{s.contributorRole}</p>
              </div>
            ))}
        </div>
      </section>

      {/* === CHAPTERS === */}
      {allEssays.map(({ section, essay, caseStudy, dataSpread, guestOpinion }) => (
        <ChapterBlock
          key={section.slug}
          section={section}
          essay={essay}
          caseStudy={caseStudy}
          dataSpread={dataSpread}
          guestOpinion={guestOpinion}
        />
      ))}

      {/* === GLOSSARY === */}
      <section className="glossary-section">
        <p className="glossary-section__label">A — Reference</p>
        <h2 className="glossary-section__title">Glossary</h2>
        <p className="glossary-section__strap">
          Terms used across the chapters, set as a continuous reference. Cross-
          references appear in italic in the body of the chapter where the term
          is first defined.
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
      <section className="index-section glossary-section">
        <p className="glossary-section__label">B — Reference</p>
        <h2 className="glossary-section__title">
          Index <em style={{ fontWeight: 300, fontSize: "0.65em" }}>(working)</em>
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
      <section className="sources-section">
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
                        <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "7pt" }}>
                          {src.url}
                        </span>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p
                style={{
                  fontStyle: "italic",
                  fontSize: "8pt",
                  color: "var(--colour-stone)",
                }}
              >
                Sources cited inline in the chapter text.
              </p>
            )}
          </div>
        ))}
      </section>

      {/* === COLOPHON === */}
      <section className="colophon-section">
        <p className="glossary-section__label">D — Reference</p>
        <h2
          className="glossary-section__title"
          style={{ marginBottom: "8mm" }}
        >
          Colophon
        </h2>

        <h2>Editorial principles</h2>
        <p>
          No advertising, ever. The First Owner&rsquo;s Reference is funded
          by the publisher and by no other commercial party. Pricing appears
          only where backed by published market data or by aggregated
          practitioner data anonymised across at least five projects. Every
          guest contribution is given voluntarily and named transparently;
          no contributor is paid.
        </p>

        <h2>Type</h2>
        <p>
          Body and display type set in <strong>Newsreader</strong> by Production
          Type. Sans and metadata in <strong>Geist</strong> and{" "}
          <strong>Geist Mono</strong> by Vercel. All families are open source
          and self-hosted on the web edition.
        </p>

        <h2>Paper and binding</h2>
        <p>
          Set on Munken Pure 120gsm uncoated text stock with cover boards in
          GF Smith Colorplan. Smyth-sewn, casebound, head and tail bands in
          marine, single ribbon marker. Foil-stamped wordmark and
          blind-debossed lighthouse mark. Trim 230 by 300 mm. Five hundred
          copies, hand numbered and signed by the editors in chief on
          page 128.
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
          professional indemnity at GBP 5 million per claim, written through
          a Lloyd&rsquo;s syndicate.
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
          be set after contributors are confirmed. To the editors, to
          contributors named and forthcoming, and to the readers whose
          questions shaped the publication: thank you.
        </p>
      </section>

      {/* === CLOSING IMAGE === */}
      <section className="closing-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CLOSING_PATH}
          alt={printImages.closing.alt}
          className=""
        />
      </section>

    </>
  );
}

/* === Chapter block component === */
function ChapterBlock({
  section,
  essay,
  caseStudy,
  dataSpread,
  guestOpinion,
}: {
  section: (typeof sections)[number];
  essay: ReturnType<typeof getLeadEssay>;
  caseStudy: ReturnType<typeof getCase>;
  dataSpread: ReturnType<typeof getDataSpread>;
  guestOpinion: ReturnType<typeof getGuestOpinion>;
}) {
  const chapterRunning = `Ch ${section.number} · ${section.title}`;

  return (
    <>
      {/* Chapter opener: image verso, title recto */}
      <section className="chapter-opener-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chapterImagePath(section.slug)}
          alt={printImages.chapters[section.slug]?.alt ?? `Chapter ${section.number}`}
        />
      </section>
      <section className="chapter-opener-text">
        <div>
          <p className="chapter-opener-text__num-label">
            Chapter {section.number}
          </p>
          <h1 className="chapter-opener-text__num">{section.number}</h1>
          <h2 className="chapter-opener-text__title">{section.title}</h2>
          <p className="chapter-opener-text__standfirst">{section.standfirst}</p>
        </div>
        <div className="chapter-opener-text__meta">
          <div className="chapter-opener-text__meta-item">
            <p className="chapter-opener-text__meta-label">Reading time</p>
            <p className="chapter-opener-text__meta-value">
              {essay?.readingTime ?? "—"}
            </p>
          </div>
          {section.contributor !== "To be confirmed" && (
            <div className="chapter-opener-text__meta-item">
              <p className="chapter-opener-text__meta-label">Contributor</p>
              <p className="chapter-opener-text__meta-value">
                {section.contributor}
              </p>
            </div>
          )}
          <div className="chapter-opener-text__meta-item">
            <p className="chapter-opener-text__meta-label">Coordinates</p>
            <p className="chapter-opener-text__meta-value">
              {section.coordinates}
            </p>
          </div>
        </div>
      </section>

      {/* Lead essay */}
      {essay && (
        <section className="chapter-body" data-chapter={chapterRunning}>
          {essay.paragraphs.map((para, i) => {
            if (typeof para === "string") {
              return <p key={i}>{para}</p>;
            }
            if (para.type === "h2") {
              return <h2 key={i}>{para.text}</h2>;
            }
            if (para.type === "blockquote") {
              return (
                <blockquote key={i} className="chapter-body__pull">
                  {para.text}
                </blockquote>
              );
            }
            if (para.type === "figure") {
              return (
                <figure key={i} className="chapter-body__figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={para.src} alt={para.alt} />
                  <figcaption>{para.caption}</figcaption>
                </figure>
              );
            }
            if (para.type === "editorsNote") {
              return (
                <aside key={i} className="chapter-body__editors-note">
                  {para.text}
                </aside>
              );
            }
            return null;
          })}
        </section>
      )}

      {/* Guest opinion */}
      {guestOpinion && (
        <section className="case-section" data-chapter={chapterRunning}>
          <header className="case-section__opener">
            <p className="case-section__label">Guest opinion</p>
            <h2 className="case-section__title">
              In conversation with {guestOpinion.contributor}
            </h2>
            <p className="case-section__standfirst">
              {guestOpinion.contributorRole}.{" "}
              {guestOpinion.intro}
            </p>
          </header>
          {guestOpinion.questions.map((qa, i) => (
            <div key={i} style={{ marginBottom: "8mm", breakInside: "avoid" }}>
              <p
                style={{
                  fontFamily: "Newsreader, Georgia, serif",
                  fontWeight: 600,
                  fontSize: "10pt",
                  lineHeight: "14pt",
                  margin: "0 0 4pt 0",
                  color: "var(--colour-marine)",
                }}
              >
                {qa.question}
              </p>
              {qa.answer.map((para, ai) => (
                <p key={ai} style={{ margin: "0 0 8pt 0" }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Data spread */}
      {dataSpread && (
        <section className="data-spread" data-chapter={chapterRunning}>
          <p className="data-spread__label">Data</p>
          <h2 className="data-spread__title">{dataSpread.title}</h2>
          <p className="data-spread__standfirst">{dataSpread.standfirst}</p>
          {dataSpread.blocks.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i}>{block.text}</h2>;
            }
            if (block.type === "paragraph") {
              return <p key={i}>{block.text}</p>;
            }
            if (block.type === "table") {
              return (
                <div key={i}>
                  {block.caption && (
                    <p className="data-spread__caption">{block.caption}</p>
                  )}
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
                  {block.sourceLine && (
                    <p className="data-spread__source">{block.sourceLine}</p>
                  )}
                </div>
              );
            }
            if (block.type === "kv") {
              return (
                <div key={i}>
                  {block.caption && (
                    <p className="data-spread__caption">{block.caption}</p>
                  )}
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
                  {block.sourceLine && (
                    <p className="data-spread__source">{block.sourceLine}</p>
                  )}
                </div>
              );
            }
            if (block.type === "note") {
              return (
                <p key={i} className="chapter-body__editors-note">
                  {block.text}
                </p>
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
          })}
        </section>
      )}

      {/* Case study */}
      {caseStudy && (
        <section className="case-section" data-chapter={chapterRunning}>
          <header className="case-section__opener">
            <p className="case-section__label">Case study</p>
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
          {caseStudy.paragraphs.map((p, i) => {
            if (typeof p === "string") {
              return (
                <p key={i} style={{ margin: "0 0 11pt 0" }}>
                  {p}
                </p>
              );
            }
            if (p.type === "h2") {
              return (
                <h2
                  key={i}
                  style={{
                    fontFamily: "Newsreader, Georgia, serif",
                    fontWeight: 400,
                    fontSize: "12pt",
                    lineHeight: "16pt",
                    margin: "14pt 0 6pt 0",
                    color: "var(--colour-marine)",
                  }}
                >
                  {p.text}
                </h2>
              );
            }
            if (p.type === "blockquote") {
              return (
                <blockquote key={i} className="chapter-body__pull">
                  {p.text}
                  {p.attribution && (
                    <footer
                      style={{
                        fontFamily: "Geist Mono, monospace",
                        fontSize: "7pt",
                        fontStyle: "normal",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--colour-stone)",
                        marginTop: "4pt",
                      }}
                    >
                      {p.attribution}
                    </footer>
                  )}
                </blockquote>
              );
            }
            return null;
          })}
          <p className="case-section__disclosure">
            <strong>Disclosure.</strong> {caseStudy.disclosure}
          </p>
        </section>
      )}
    </>
  );
}
