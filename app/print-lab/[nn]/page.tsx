/*
  Layout spike, step 1 of docs/print/layout-implementation-plan.md.

  Sets one chapter's lead essay in the variants the plan has to choose
  between, using the press stylesheet so the type is the book's type:

    grid=wide   two text columns of 91.5mm across the 190mm type area (now)
    grid=side   a 40mm outer side column (34mm plus the 6mm gap) left empty,
                two text columns across the remaining 150mm

    head=a      each head picture starts a new page and a new multicol
                segment; the previous segment stops short
    head=b      each head picture spans inside the one flow, no forced break

    anchors=4,11,19   paragraph indices (into the essay after the intro)
                      that a head picture precedes; default is evenly
                      spaced h2s

  Dev only, like /print-chapter. Not part of the book.
*/

import { notFound } from "next/navigation";
import { sections } from "@/lib/sections";
import { getLeadEssay } from "@/lib/lead-essays";
import { printImages } from "@/lib/print-images";
import "./lab.css";

export const dynamic = "force-dynamic";

type Para = string | { type: string; text?: string; attribution?: string };

export default async function PrintLab({
  params,
  searchParams,
}: {
  params: Promise<{ nn: string }>;
  searchParams: Promise<{ grid?: string; head?: string; anchors?: string }>;
}) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { nn } = await params;
  const q = await searchParams;
  const grid = q.grid === "side" ? "side" : "wide";
  const head = q.head === "b" ? "b" : "a";

  const section = sections.find(
    (s) => String(s.number).padStart(2, "0") === nn,
  );
  if (!section) notFound();
  const essay = getLeadEssay(section.slug);
  if (!essay) notFound();

  const paras = essay.paragraphs as Para[];
  const introIdx = Math.max(0, paras.findIndex((p) => typeof p === "string"));
  const intro = paras[introIdx] as string;
  const rest = paras.filter((_, i) => i !== introIdx);

  const pool = (printImages.supporting?.[section.slug] ?? []).slice(1, 4);

  let anchors: number[];
  if (q.anchors) {
    anchors = q.anchors.split(",").map(Number).filter((n) => n > 0);
  } else {
    const h2s = rest
      .map((p, i) => (typeof p === "object" && p.type === "h2" ? i : -1))
      .filter((i) => i > 0);
    const n = Math.min(pool.length, h2s.length);
    anchors = Array.from(
      { length: n },
      (_, k) => h2s[Math.floor(((k + 1) * h2s.length) / (n + 1))],
    );
  }
  anchors = [...new Set(anchors)].sort((a, b) => a - b).slice(0, pool.length);

  const renderPara = (p: Para, i: number) => {
    if (typeof p === "string") return <p key={`p${i}`}>{p}</p>;
    if (p.type === "h2") return <h2 key={`h${i}`}>{p.text}</h2>;
    if (p.type === "blockquote")
      return (
        <blockquote key={`q${i}`} className="chapter-body__pull">
          {p.text}
        </blockquote>
      );
    if (p.type === "editorsNote")
      return (
        <aside key={`n${i}`} className="chapter-body__editors-note">
          <p className="chapter-body__editors-note-label">Note</p>
          <p className="chapter-body__editors-note-text">{p.text}</p>
        </aside>
      );
    return null;
  };

  const headFigure = (k: number) => {
    const img = pool[k];
    return (
      <figure key={`head${k}`} className={`lab-head lab-head--${head}`}>
        <span className="pdf-marker">{`[[LABFIG-${k + 1}]]`}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/print-images/print/${img.filename}`} alt={img.alt} />
        <figcaption>{img.caption ?? img.alt}</figcaption>
      </figure>
    );
  };

  const introNode = (
    <p className="chapter-body__intro-para" key="intro">
      {intro}
    </p>
  );

  let body: React.ReactNode;
  if (head === "b") {
    const out: React.ReactNode[] = [introNode];
    rest.forEach((p, i) => {
      const k = anchors.indexOf(i);
      if (k > -1) out.push(headFigure(k));
      out.push(renderPara(p, i));
    });
    body = <div className="chapter-body__cols">{out}</div>;
  } else {
    const cuts = [0, ...anchors, rest.length];
    body = cuts.slice(0, -1).map((from, s) => (
      <div key={`seg${s}`} className="lab-seg">
        {s > 0 && headFigure(s - 1)}
        <div className="chapter-body__cols">
          {s === 0 && introNode}
          {rest.slice(from, cuts[s + 1]).map((p, j) => renderPara(p, from + j))}
        </div>
      </div>
    ));
  }

  return (
    <div className={`lab lab--${grid}`}>
      <section className="chapter-body">
        <span className="pdf-marker">{`[[LAB-${grid}-${head}]]`}</span>
        {body}
        <span className="pdf-marker">[[LAB-END]]</span>
      </section>
    </div>
  );
}
