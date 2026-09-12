/*
  Full-bleed page sections shared between the flow document (/print,
  where they render as one-page placeholders) and the standalone
  single-page prints (/print-opener/[key]) that replace them in the
  final press PDF. Chrome fragments mid-document full-page boxes
  against the root page master and paints a seam, so the pressed
  full-bleed pages are always printed standalone and merged in.
*/
import { sections } from "@/lib/sections";
import { printImages } from "@/lib/print-images";
import { getLeadEssay } from "@/lib/lead-essays";

export const COVER_PATH = `/print-images/print/${printImages.cover.filename}`;
export const FRONTISPIECE_PATH = `/print-images/print/${printImages.frontispiece.filename}`;
export const CLOSING_PATH = `/print-images/print/${printImages.closing.filename}`;

export function chapterImagePath(slug: string) {
  return `/print-images/print/${printImages.chapters[slug]?.filename ?? "ch01.jpg"}`;
}

export function CoverPage() {
  return (
    <section className="cover-page">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={COVER_PATH}
        alt={printImages.cover.alt}
        className="cover-page__image"
      />
      <div className="cover-page__inner">
        <p className="cover-page__edition">1st Edition · 2026</p>
        <div className="cover-page__title-block">
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
  );
}

export function FrontispiecePage() {
  return (
    <section className="frontispiece">
      <span className="pdf-marker">[[FRONTIS]]</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FRONTISPIECE_PATH}
        alt={printImages.frontispiece.alt}
        className="frontispiece__image"
      />
    </section>
  );
}

/* A full-page plate: one photograph, full bleed, with a reversed caption in
   the lower outer corner. Two per chapter, placed at the quarter and three-
   quarter points of the essay. This is the register that moves the book from
   text-led to picture-led; the column figures alone cannot do it. */
/* Plates at these indices carry a pull quote reversed over the picture.
   This is the picture-led register: the page is a photograph and it also
   carries type, which is how Portfolio by Savills reaches 33 per cent
   picture-led pages and Forbes 13. A plate that is only a photograph
   counts as a full-page image instead. */
const QUOTE_PLATES = [1, 4];

function platePullQuote(slug: string, index: number) {
  const paras = getLeadEssay(slug)?.paragraphs ?? [];
  const quotes = paras.filter(
    (p): p is { type: "blockquote"; text: string; attribution?: string } =>
      typeof p !== "string" && p.type === "blockquote",
  );
  if (!quotes.length) return null;
  const nth = QUOTE_PLATES.indexOf(index);
  return quotes[nth % quotes.length] ?? quotes[0];
}

export function PlatePage({ slug, index }: { slug: string; index: number }) {
  const plate = printImages.plates?.[slug]?.[index];
  if (!plate) return null;
  const quote = QUOTE_PLATES.includes(index) ? platePullQuote(slug, index) : null;
  return (
    <section className={`plate-page${quote ? " plate-page--quote" : ""}`}>
      <span className="pdf-marker">{`[[PLATE-${slug}-${index}]]`}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/print-images/print/${plate.filename}`}
        alt={plate.alt}
        className="plate-page__image"
      />
      {quote && (
        <div className="plate-page__quote">
          <blockquote>{quote.text}</blockquote>
          <p className="plate-page__quote-attr">
            {quote.attribution ?? "The First Owner\u2019s Reference"}
          </p>
        </div>
      )}
      {plate.caption && !quote && (
        <p className="plate-page__caption">{plate.caption}</p>
      )}
    </section>
  );
}

export function ClosingImagePage() {
  return (
    <section className="closing-image">
      <span className="pdf-marker">[[CLOSING]]</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={CLOSING_PATH} alt={printImages.closing.alt} />
    </section>
  );
}

export function ChapterOpener({
  section,
  readingTime,
}: {
  section: (typeof sections)[number];
  readingTime?: string;
}) {
  const chNum = String(section.number).padStart(2, "0");
  return (
    <section className="chapter-opener" id={`ch-${section.number}`}>
      <span className="pdf-marker">{`[[CH${chNum}]]`}</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chapterImagePath(section.slug)}
        alt={printImages.chapters[section.slug]?.alt ?? `Chapter ${section.number}`}
        className="chapter-opener__image"
      />
      <div className="chapter-opener__inner">
        <div className="chapter-opener__num-row">
          <p className="chapter-opener__num-label">Chapter {section.number}</p>
          <h1 className="chapter-opener__num">{section.number}</h1>
        </div>
        <div className="chapter-opener__title-block">
          <h2 className="chapter-opener__title">{section.title}</h2>
          <p className="chapter-opener__standfirst">{section.standfirst}</p>
          {/* The rule-plus-labels block that used to sit here (reading time,
              contributor, coordinates) is removed. Reading time is a web
              device with no meaning on paper, and three of the nine
              coordinate lines did not resolve to the photograph above
              them. The title and standfirst carry the opener alone. */}
        </div>
      </div>
    </section>
  );
}
