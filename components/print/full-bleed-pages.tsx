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
          <div className="chapter-opener__meta">
            <div className="chapter-opener__meta-item">
              <p className="chapter-opener__meta-label">Reading time</p>
              <p className="chapter-opener__meta-value">{readingTime ?? "—"}</p>
            </div>
            {section.contributor !== "To be confirmed" && (
              <div className="chapter-opener__meta-item">
                <p className="chapter-opener__meta-label">Contributor</p>
                <p className="chapter-opener__meta-value">
                  {section.contributor}
                </p>
              </div>
            )}
            <div className="chapter-opener__meta-item">
              <p className="chapter-opener__meta-label">Coordinates</p>
              <p className="chapter-opener__meta-value">
                {section.coordinates}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
