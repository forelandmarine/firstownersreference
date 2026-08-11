"use client";

/* Case study editor: meta rows, body blocks, takeaways, disclosure. */

import type { CaseStudy } from "@/lib/cases";
import {
  AddButton,
  Labeled,
  MetaInput,
  RowControls,
  TextField,
  TypeChip,
  confirmIf,
  moveItem,
  removeAt,
  replaceAt,
} from "./shared";

type CaseBlock = CaseStudy["paragraphs"][number];

export default function CaseStudyEditor({
  caseStudy,
  onChange,
}: {
  caseStudy: CaseStudy;
  onChange: (c: CaseStudy) => void;
}) {
  const c = caseStudy;

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-6">
        <TextField
          value={c.title}
          onChange={(v) => onChange({ ...c, title: v })}
          className="font-serif font-medium text-title leading-tight"
          placeholder="Title"
        />
        <TextField
          value={c.standfirst}
          onChange={(v) => onChange({ ...c, standfirst: v })}
          className="mt-2 font-serif italic text-subhead text-charcoal-soft"
          placeholder="Standfirst"
        />
      </div>

      {/* Meta rows */}
      <div className="rounded-sm border border-rule bg-paper-deep/40 p-3">
        <TypeChip label="Case meta" tone="bg-stone/15 text-stone" />
        <div className="mt-2 space-y-1">
          {c.meta.map((m, i) => (
            <div key={i} className="flex items-start gap-2">
              <MetaInput
                value={m.label}
                onChange={(v) =>
                  onChange({ ...c, meta: replaceAt(c.meta, i, { ...m, label: v }) })
                }
                placeholder="Label"
                className="max-w-48 font-medium"
              />
              <MetaInput
                value={m.value}
                onChange={(v) =>
                  onChange({ ...c, meta: replaceAt(c.meta, i, { ...m, value: v }) })
                }
                placeholder="Value"
              />
              <RowControls
                index={i}
                total={c.meta.length}
                onMove={(d) => onChange({ ...c, meta: moveItem(c.meta, i, i + d) })}
                onRemove={() => onChange({ ...c, meta: removeAt(c.meta, i) })}
                confirmRemove={m.label || m.value ? "Delete this meta row?" : undefined}
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <AddButton
            label="meta row"
            onClick={() =>
              onChange({ ...c, meta: [...c.meta, { label: "", value: "" }] })
            }
          />
        </div>
      </div>

      {/* Body blocks */}
      <div className="space-y-2">
        {c.paragraphs.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <CaseBlockBody
                block={b}
                onChange={(nb) =>
                  onChange({ ...c, paragraphs: replaceAt(c.paragraphs, i, nb) })
                }
              />
            </div>
            <div className="mt-1.5">
              <RowControls
                index={i}
                total={c.paragraphs.length}
                onMove={(d) =>
                  onChange({ ...c, paragraphs: moveItem(c.paragraphs, i, i + d) })
                }
                onRemove={() => {
                  const text = typeof b === "string" ? b : b.text;
                  if (!confirmIf(text.length <= 40, "Delete this block?")) return;
                  onChange({ ...c, paragraphs: removeAt(c.paragraphs, i) });
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex gap-1.5">
          <AddButton
            label="paragraph"
            onClick={() => onChange({ ...c, paragraphs: [...c.paragraphs, ""] })}
          />
          <AddButton
            label="crosshead"
            onClick={() =>
              onChange({
                ...c,
                paragraphs: [...c.paragraphs, { type: "h2", text: "" }],
              })
            }
          />
          <AddButton
            label="pull quote"
            onClick={() =>
              onChange({
                ...c,
                paragraphs: [...c.paragraphs, { type: "blockquote", text: "" }],
              })
            }
          />
        </div>
      </div>

      {/* Takeaways */}
      <div className="rounded-sm border border-rule bg-paper-deep/40 p-3">
        <TypeChip label="Takeaways" tone="bg-marine/10 text-marine" />
        <div className="mt-2 space-y-1">
          {c.takeaways.map((t, i) => (
            <div key={i} className="flex items-start gap-2">
              <TextField
                value={t}
                onChange={(v) =>
                  onChange({ ...c, takeaways: replaceAt(c.takeaways, i, v) })
                }
                className="font-serif text-small"
                placeholder="Takeaway…"
              />
              <RowControls
                index={i}
                total={c.takeaways.length}
                onMove={(d) =>
                  onChange({ ...c, takeaways: moveItem(c.takeaways, i, i + d) })
                }
                onRemove={() => {
                  if (!confirmIf(t.length <= 40, "Delete this takeaway?")) return;
                  onChange({ ...c, takeaways: removeAt(c.takeaways, i) });
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <AddButton
            label="takeaway"
            onClick={() => onChange({ ...c, takeaways: [...c.takeaways, ""] })}
          />
        </div>
      </div>

      <Labeled label="Disclosure">
        <TextField
          value={c.disclosure}
          onChange={(v) => onChange({ ...c, disclosure: v })}
          className="font-serif text-small text-stone"
        />
      </Labeled>
    </div>
  );
}

function CaseBlockBody({
  block,
  onChange,
}: {
  block: CaseBlock;
  onChange: (b: CaseBlock) => void;
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
  if (block.type === "h2") {
    return (
      <div className="mt-3">
        <TypeChip label="Crosshead" tone="bg-marine/10 text-marine" />
        <TextField
          value={block.text}
          onChange={(v) => onChange({ ...block, text: v })}
          className="font-serif font-medium text-subhead"
          placeholder="Crosshead…"
        />
      </div>
    );
  }
  return (
    <div className="border-l-2 border-sail pl-4">
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
}
