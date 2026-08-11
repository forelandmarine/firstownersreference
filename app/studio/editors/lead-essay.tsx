"use client";

/* Lead essay editor: all block types, meta fields, closing note. */

import { useRef, useState } from "react";
import type { LeadEssay } from "@/lib/lead-essays";
import {
  MetaInput,
  TextField,
  TypeChip,
  confirmIf,
  moveItem,
  removeAt,
  replaceAt,
} from "./shared";

type Block = LeadEssay["paragraphs"][number];
type ClosingBlock = NonNullable<LeadEssay["closingNote"]>[number];

const BLOCK_FACTORIES: { label: string; make: () => Block }[] = [
  { label: "Paragraph", make: () => "" },
  { label: "Crosshead", make: () => ({ type: "h2", text: "" }) },
  { label: "Pull quote", make: () => ({ type: "blockquote", text: "" }) },
  {
    label: "Figure",
    make: () => ({ type: "figure", src: "", alt: "", caption: "" }),
  },
  { label: "Editor’s note", make: () => ({ type: "editorsNote", text: "" }) },
  { label: "Web only", make: () => ({ type: "webOnly", paragraphs: [""] }) },
];

function blockText(b: Block): string {
  if (typeof b === "string") return b;
  if (b.type === "webOnly") return b.paragraphs.join(" ");
  if (b.type === "figure") return b.caption;
  return b.text;
}

export default function LeadEssayEditor({
  essay,
  onChange,
}: {
  essay: LeadEssay;
  onChange: (e: LeadEssay) => void;
}) {
  const dragFrom = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [insertAt, setInsertAt] = useState<number | null>(null);

  const setBlock = (i: number, b: Block) =>
    onChange({ ...essay, paragraphs: replaceAt(essay.paragraphs, i, b) });

  const insertBlock = (i: number, b: Block) => {
    const next = [...essay.paragraphs];
    next.splice(i, 0, b);
    onChange({ ...essay, paragraphs: next });
    setInsertAt(null);
  };

  const removeBlock = (i: number) => {
    const b = essay.paragraphs[i];
    if (!confirmIf(blockText(b).length <= 40, "Delete this block? Its text will be lost."))
      return;
    onChange({ ...essay, paragraphs: removeAt(essay.paragraphs, i) });
  };

  const moveBlock = (from: number, to: number) => {
    if (from === to || to < 0 || to >= essay.paragraphs.length) return;
    onChange({ ...essay, paragraphs: moveItem(essay.paragraphs, from, to) });
  };

  return (
    <div>
      {/* Meta */}
      <div className="mb-8 border-b border-rule pb-6">
        <TextField
          value={essay.title}
          onChange={(v) => onChange({ ...essay, title: v })}
          className="font-serif font-medium text-title leading-tight"
          placeholder="Title"
        />
        <TextField
          value={essay.standfirst}
          onChange={(v) => onChange({ ...essay, standfirst: v })}
          className="mt-2 font-serif italic text-subhead text-charcoal-soft"
          placeholder="Standfirst"
        />
        <div className="mt-3 max-w-40">
          <MetaInput
            value={essay.readingTime}
            onChange={(v) => onChange({ ...essay, readingTime: v })}
            placeholder="Reading time"
          />
        </div>
      </div>

      {/* Blocks */}
      <div>
        {essay.paragraphs.map((b, i) => (
          <div key={i}>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(i);
              }}
              onDrop={() => {
                if (dragFrom.current !== null) moveBlock(dragFrom.current, i);
                dragFrom.current = null;
                setDragOver(null);
              }}
              className={`group relative rounded-sm py-1.5 pl-2 -ml-2 ${
                dragOver === i ? "border-t-2 border-marine" : ""
              }`}
            >
              <div className="absolute -left-24 top-1 hidden w-20 justify-end gap-0.5 group-hover:flex">
                <span
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/plain", String(i));
                    e.dataTransfer.effectAllowed = "move";
                    dragFrom.current = i;
                  }}
                  onDragEnd={() => {
                    dragFrom.current = null;
                    setDragOver(null);
                  }}
                  title="Drag to reorder"
                  className="cursor-grab select-none rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone"
                >
                  ⠿
                </span>
                <button
                  onClick={() => moveBlock(i, i - 1)}
                  disabled={i === 0}
                  title="Move up"
                  className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveBlock(i, i + 1)}
                  disabled={i === essay.paragraphs.length - 1}
                  title="Move down"
                  className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => setInsertAt((v) => (v === i + 1 ? null : i + 1))}
                  title="Insert below"
                  className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone"
                >
                  +
                </button>
                <button
                  onClick={() => removeBlock(i)}
                  title="Delete block"
                  className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone hover:border-red-700 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
              <EssayBlockBody block={b} onChange={(nb) => setBlock(i, nb)} />
            </div>
            {insertAt === i + 1 && (
              <div className="my-2 flex flex-wrap gap-1.5 rounded-sm border border-rule bg-paper-deep/50 p-2">
                {BLOCK_FACTORIES.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => insertBlock(i + 1, f.make())}
                    className="font-sans text-meta rounded-sm border border-rule bg-paper px-2 py-1 hover:bg-white"
                  >
                    + {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Closing note */}
      <ClosingNoteEditor
        closingNote={essay.closingNote}
        onChange={(cn) => {
          const next = { ...essay };
          if (cn === undefined) delete next.closingNote;
          else next.closingNote = cn;
          onChange(next);
        }}
      />
    </div>
  );
}

function EssayBlockBody({
  block,
  onChange,
}: {
  block: Block;
  onChange: (b: Block) => void;
}) {
  if (typeof block === "string") {
    return (
      <TextField
        value={block}
        onChange={onChange}
        className="font-serif text-body leading-relaxed"
        placeholder="Paragraph…"
      />
    );
  }
  switch (block.type) {
    case "h2":
      return (
        <div className="mt-4">
          <TypeChip label="Crosshead" tone="bg-marine/10 text-marine" />
          <TextField
            value={block.text}
            onChange={(v) => onChange({ ...block, text: v })}
            className="font-serif font-medium text-subhead"
            placeholder="Crosshead…"
          />
        </div>
      );
    case "blockquote":
      return (
        <div className="my-2 border-l-2 border-sail pl-4">
          <TypeChip label="Pull quote" tone="bg-sail/10 text-sail" />
          <TextField
            value={block.text}
            onChange={(v) => onChange({ ...block, text: v })}
            className="font-serif italic text-subhead"
            placeholder="Quote…"
          />
          <TextField
            value={block.attribution ?? ""}
            onChange={(v) =>
              onChange(
                v === ""
                  ? { type: "blockquote", text: block.text }
                  : { ...block, attribution: v }
              )
            }
            className="font-sans text-meta text-stone"
            placeholder="Attribution (optional)"
          />
        </div>
      );
    case "figure":
      return (
        <div className="my-3 rounded-sm border border-rule bg-paper-deep/40 p-3">
          <TypeChip label="Figure" tone="bg-stone/15 text-stone" />
          {block.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={block.src}
              alt={block.alt}
              className="mt-2 max-h-56 w-auto rounded-sm"
            />
          )}
          <div className="mt-2 space-y-1">
            <MetaInput
              value={block.src}
              onChange={(v) => onChange({ ...block, src: v })}
              placeholder="/images/… (src)"
            />
            <MetaInput
              value={block.alt}
              onChange={(v) => onChange({ ...block, alt: v })}
              placeholder="Alt text"
            />
            <TextField
              value={block.caption}
              onChange={(v) => onChange({ ...block, caption: v })}
              className="font-serif text-small"
              placeholder="Caption"
            />
            <MetaInput
              value={block.credit ?? ""}
              onChange={(v) => {
                const next = { ...block };
                if (v === "") delete next.credit;
                else next.credit = v;
                onChange(next);
              }}
              placeholder="Credit (optional)"
            />
          </div>
        </div>
      );
    case "editorsNote":
      return (
        <div className="my-2 rounded-sm border border-rule bg-white/50 p-3">
          <TypeChip label="Editor’s note" tone="bg-charcoal/10 text-charcoal-soft" />
          <TextField
            value={block.text}
            onChange={(v) => onChange({ ...block, text: v })}
            className="font-serif text-small"
            placeholder="Note…"
          />
          <div className="mt-1 grid grid-cols-2 gap-2">
            <MetaInput
              value={block.href ?? ""}
              onChange={(v) => {
                const next = { ...block };
                if (v === "") delete next.href;
                else next.href = v;
                onChange(next);
              }}
              placeholder="Link href (optional)"
            />
            <MetaInput
              value={block.linkText ?? ""}
              onChange={(v) => {
                const next = { ...block };
                if (v === "") delete next.linkText;
                else next.linkText = v;
                onChange(next);
              }}
              placeholder="Link text (optional)"
            />
          </div>
        </div>
      );
    case "webOnly":
      return (
        <div className="my-3 rounded-sm border border-dashed border-sail/60 bg-sail/5 p-3">
          <TypeChip label="Web only · not in print" tone="bg-sail/15 text-sail" />
          <MetaInput
            value={block.heading ?? ""}
            onChange={(v) => {
              const next = { ...block };
              if (v === "") delete next.heading;
              else next.heading = v;
              onChange(next);
            }}
            placeholder="Heading (optional)"
          />
          <div className="mt-2 space-y-2">
            {block.paragraphs.map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <TextField
                  value={p}
                  onChange={(v) =>
                    onChange({ ...block, paragraphs: replaceAt(block.paragraphs, i, v) })
                  }
                  className="font-serif text-body leading-relaxed"
                  placeholder="Paragraph…"
                />
                <button
                  onClick={() => {
                    if (!confirmIf(p.length <= 40, "Delete this paragraph?")) return;
                    onChange({ ...block, paragraphs: removeAt(block.paragraphs, i) });
                  }}
                  className="mt-1 font-sans text-meta text-stone hover:text-red-700"
                  title="Delete paragraph"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              onChange({ ...block, paragraphs: [...block.paragraphs, ""] })
            }
            className="mt-2 font-sans text-meta text-sail"
          >
            + paragraph
          </button>
        </div>
      );
  }
}

function ClosingNoteEditor({
  closingNote,
  onChange,
}: {
  closingNote: ClosingBlock[] | undefined;
  onChange: (cn: ClosingBlock[] | undefined) => void;
}) {
  if (!closingNote) {
    return (
      <div className="mt-10 border-t border-rule pt-4">
        <button
          onClick={() => onChange([""])}
          className="font-sans text-meta text-stone hover:text-charcoal"
        >
          + Add closing note
        </button>
      </div>
    );
  }
  return (
    <div className="mt-10 border-t border-rule pt-4">
      <div className="mb-2 flex items-center gap-2">
        <TypeChip label="Closing note" tone="bg-charcoal/10 text-charcoal-soft" />
        <button
          onClick={() => {
            const hasContent = closingNote.some((b) =>
              typeof b === "string" ? b : b.text
            );
            if (!confirmIf(!hasContent, "Remove the whole closing note?")) return;
            onChange(undefined);
          }}
          className="font-sans text-meta text-stone hover:text-red-700"
        >
          remove
        </button>
      </div>
      <div className="space-y-2">
        {closingNote.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <TextField
              value={typeof b === "string" ? b : b.text}
              onChange={(v) =>
                onChange(
                  replaceAt(
                    closingNote,
                    i,
                    typeof closingNote[i] === "string" ? v : { type: "h2", text: v }
                  )
                )
              }
              className={
                typeof b === "string"
                  ? "font-serif text-body leading-relaxed"
                  : "font-serif font-medium text-subhead"
              }
              placeholder={typeof b === "string" ? "Paragraph…" : "Crosshead…"}
            />
            <button
              onClick={() => onChange(removeAt(closingNote, i))}
              className="mt-1 font-sans text-meta text-stone hover:text-red-700"
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => onChange([...closingNote, ""])}
          className="font-sans text-meta text-stone"
        >
          + paragraph
        </button>
        <button
          onClick={() => onChange([...closingNote, { type: "h2", text: "" }])}
          className="font-sans text-meta text-stone"
        >
          + crosshead
        </button>
      </div>
    </div>
  );
}
