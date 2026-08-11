"use client";

/* Data spread editor: h2 / paragraph / note / chart / table / kv blocks
   plus the sources list. */

import type { DataSpread, DataSpreadBlock } from "@/lib/data-spreads";
import {
  AddButton,
  MetaInput,
  RowControls,
  TextField,
  TypeChip,
  confirmIf,
  moveItem,
  removeAt,
  replaceAt,
} from "./shared";

const BLOCK_FACTORIES: { label: string; make: () => DataSpreadBlock }[] = [
  { label: "Crosshead", make: () => ({ type: "h2", text: "" }) },
  { label: "Paragraph", make: () => ({ type: "paragraph", text: "" }) },
  { label: "Note", make: () => ({ type: "note", text: "" }) },
  { label: "Chart", make: () => ({ type: "chart", chartId: "" }) },
  {
    label: "Table",
    make: () => ({ type: "table", head: ["", ""], rows: [["", ""]] }),
  },
  {
    label: "Key-value",
    make: () => ({ type: "kv", rows: [{ label: "", value: "" }] }),
  },
];

function blockSummary(b: DataSpreadBlock): string {
  switch (b.type) {
    case "h2":
    case "paragraph":
    case "note":
      return b.text;
    case "chart":
      return b.chartId;
    case "table":
      return b.caption ?? `${b.rows.length} rows`;
    case "kv":
      return b.caption ?? `${b.rows.length} rows`;
  }
}

export default function DataSpreadEditor({
  spread,
  onChange,
}: {
  spread: DataSpread;
  onChange: (s: DataSpread) => void;
}) {
  const s = spread;
  const setBlock = (i: number, b: DataSpreadBlock) =>
    onChange({ ...s, blocks: replaceAt(s.blocks, i, b) });

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-6">
        <TextField
          value={s.title}
          onChange={(v) => onChange({ ...s, title: v })}
          className="font-serif font-medium text-title leading-tight"
          placeholder="Title"
        />
        <TextField
          value={s.standfirst}
          onChange={(v) => onChange({ ...s, standfirst: v })}
          className="mt-2 font-serif italic text-subhead text-charcoal-soft"
          placeholder="Standfirst"
        />
      </div>

      <div className="space-y-3">
        {s.blocks.map((b, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <SpreadBlockBody block={b} onChange={(nb) => setBlock(i, nb)} />
            </div>
            <div className="mt-1.5">
              <RowControls
                index={i}
                total={s.blocks.length}
                onMove={(d) => onChange({ ...s, blocks: moveItem(s.blocks, i, i + d) })}
                onRemove={() => {
                  if (
                    !confirmIf(
                      blockSummary(b).length <= 40 &&
                        b.type !== "table" &&
                        b.type !== "kv",
                      `Delete this ${b.type} block?`
                    )
                  )
                    return;
                  onChange({ ...s, blocks: removeAt(s.blocks, i) });
                }}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-1.5">
          {BLOCK_FACTORIES.map((f) => (
            <AddButton
              key={f.label}
              label={f.label}
              onClick={() => onChange({ ...s, blocks: [...s.blocks, f.make()] })}
            />
          ))}
        </div>
      </div>

      {/* Sources */}
      <div className="rounded-sm border border-rule bg-paper-deep/40 p-3">
        <TypeChip label="Sources" tone="bg-stone/15 text-stone" />
        <div className="mt-2 space-y-1">
          {s.sources.map((src, i) => (
            <div key={i} className="flex items-start gap-2">
              <MetaInput
                value={src.label}
                onChange={(v) =>
                  onChange({ ...s, sources: replaceAt(s.sources, i, { ...src, label: v }) })
                }
                placeholder="Label"
                className="max-w-40 font-medium"
              />
              <MetaInput
                value={src.line}
                onChange={(v) =>
                  onChange({ ...s, sources: replaceAt(s.sources, i, { ...src, line: v }) })
                }
                placeholder="Source line"
              />
              <MetaInput
                value={src.url ?? ""}
                onChange={(v) => {
                  const next = { ...src };
                  if (v === "") delete next.url;
                  else next.url = v;
                  onChange({ ...s, sources: replaceAt(s.sources, i, next) });
                }}
                placeholder="URL (optional)"
                className="max-w-56"
              />
              <RowControls
                index={i}
                total={s.sources.length}
                onMove={(d) => onChange({ ...s, sources: moveItem(s.sources, i, i + d) })}
                onRemove={() => {
                  if (!confirmIf(src.line.length <= 40, "Delete this source?")) return;
                  onChange({ ...s, sources: removeAt(s.sources, i) });
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2">
          <AddButton
            label="source"
            onClick={() =>
              onChange({ ...s, sources: [...s.sources, { label: "", line: "" }] })
            }
          />
        </div>
      </div>
    </div>
  );
}

function SpreadBlockBody({
  block,
  onChange,
}: {
  block: DataSpreadBlock;
  onChange: (b: DataSpreadBlock) => void;
}) {
  switch (block.type) {
    case "h2":
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
    case "paragraph":
      return (
        <TextField
          value={block.text}
          onChange={(v) => onChange({ ...block, text: v })}
          className="font-serif text-body leading-relaxed"
          placeholder="Paragraph…"
        />
      );
    case "note":
      return (
        <div className="rounded-sm border border-rule bg-white/50 p-2">
          <TypeChip label="Note" tone="bg-charcoal/10 text-charcoal-soft" />
          <TextField
            value={block.text}
            onChange={(v) => onChange({ ...block, text: v })}
            className="font-serif text-small"
            placeholder="Note…"
          />
        </div>
      );
    case "chart":
      return (
        <div className="rounded-sm border border-rule bg-paper-deep/40 p-2">
          <TypeChip label="Chart" tone="bg-sail/10 text-sail" />
          <MetaInput
            value={block.chartId}
            onChange={(v) => onChange({ ...block, chartId: v })}
            placeholder="chartId (see lib/charts.tsx)"
            className="font-mono"
          />
        </div>
      );
    case "table":
      return <TableBlockEditor block={block} onChange={onChange} />;
    case "kv":
      return <KvBlockEditor block={block} onChange={onChange} />;
  }
}

type TableBlock = Extract<DataSpreadBlock, { type: "table" }>;

function TableBlockEditor({
  block,
  onChange,
}: {
  block: TableBlock;
  onChange: (b: TableBlock) => void;
}) {
  const cols = block.head.length;

  const setCell = (r: number, c: number, v: string) =>
    onChange({
      ...block,
      rows: replaceAt(block.rows, r, replaceAt(block.rows[r], c, v)),
    });

  const addColumn = () =>
    onChange({
      ...block,
      head: [...block.head, ""],
      rows: block.rows.map((r) => [...r, ""]),
    });

  const removeColumn = (c: number) => {
    if (!window.confirm(`Delete column "${block.head[c] || c + 1}" from every row?`))
      return;
    onChange({
      ...block,
      head: removeAt(block.head, c),
      rows: block.rows.map((r) => removeAt(r, c)),
    });
  };

  return (
    <div className="rounded-sm border border-rule bg-paper-deep/30 p-3 overflow-x-auto">
      <TypeChip label="Table" tone="bg-marine/10 text-marine" />
      <MetaInput
        value={block.caption ?? ""}
        onChange={(v) => {
          const next = { ...block };
          if (v === "") delete next.caption;
          else next.caption = v;
          onChange(next);
        }}
        placeholder="Caption (optional)"
        className="mt-1 font-medium"
      />
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr>
            {block.head.map((h, c) => (
              <th key={c} className="border border-rule bg-paper p-1 align-top">
                <MetaInput
                  value={h}
                  onChange={(v) => onChange({ ...block, head: replaceAt(block.head, c, v) })}
                  placeholder={`Col ${c + 1}`}
                  className="font-medium"
                />
                <button
                  onClick={() => removeColumn(c)}
                  className="font-sans text-[10px] text-stone hover:text-red-700"
                  title="Delete column"
                >
                  ✕ col
                </button>
              </th>
            ))}
            <th className="p-1 align-middle">
              <button
                onClick={addColumn}
                className="font-sans text-meta text-stone"
                title="Add column"
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className="border border-rule p-1 align-top">
                  <TextField
                    value={cell}
                    onChange={(v) => setCell(r, c, v)}
                    className="font-sans text-small"
                    spellCheck={false}
                  />
                </td>
              ))}
              <td className="p-1 align-middle whitespace-nowrap">
                <RowControls
                  index={r}
                  total={block.rows.length}
                  onMove={(d) => onChange({ ...block, rows: moveItem(block.rows, r, r + d) })}
                  onRemove={() => {
                    if (!confirmIf(row.every((x) => x === ""), "Delete this row?")) return;
                    onChange({ ...block, rows: removeAt(block.rows, r) });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2 flex items-center gap-3">
        <AddButton
          label="row"
          onClick={() =>
            onChange({ ...block, rows: [...block.rows, block.head.map(() => "")] })
          }
        />
        <MetaInput
          value={block.sourceLine ?? ""}
          onChange={(v) => {
            const next = { ...block };
            if (v === "") delete next.sourceLine;
            else next.sourceLine = v;
            onChange(next);
          }}
          placeholder="Source line (optional)"
        />
      </div>
      {cols === 0 && (
        <div className="mt-1 font-sans text-meta text-red-700">
          Table has no columns.
        </div>
      )}
    </div>
  );
}

type KvBlock = Extract<DataSpreadBlock, { type: "kv" }>;

function KvBlockEditor({
  block,
  onChange,
}: {
  block: KvBlock;
  onChange: (b: KvBlock) => void;
}) {
  return (
    <div className="rounded-sm border border-rule bg-paper-deep/30 p-3">
      <TypeChip label="Key-value" tone="bg-marine/10 text-marine" />
      <MetaInput
        value={block.caption ?? ""}
        onChange={(v) => {
          const next = { ...block };
          if (v === "") delete next.caption;
          else next.caption = v;
          onChange(next);
        }}
        placeholder="Caption (optional)"
        className="mt-1 font-medium"
      />
      <div className="mt-2 space-y-1">
        {block.rows.map((r, i) => (
          <div key={i} className="flex items-start gap-2">
            <MetaInput
              value={r.label}
              onChange={(v) =>
                onChange({ ...block, rows: replaceAt(block.rows, i, { ...r, label: v }) })
              }
              placeholder="Label"
              className="max-w-56 font-medium"
            />
            <MetaInput
              value={r.value}
              onChange={(v) =>
                onChange({ ...block, rows: replaceAt(block.rows, i, { ...r, value: v }) })
              }
              placeholder="Value"
            />
            <MetaInput
              value={r.note ?? ""}
              onChange={(v) => {
                const next = { ...r };
                if (v === "") delete next.note;
                else next.note = v;
                onChange({ ...block, rows: replaceAt(block.rows, i, next) });
              }}
              placeholder="Note (optional)"
              className="max-w-56"
            />
            <RowControls
              index={i}
              total={block.rows.length}
              onMove={(d) => onChange({ ...block, rows: moveItem(block.rows, i, i + d) })}
              onRemove={() => {
                if (!confirmIf(!r.label && !r.value, "Delete this row?")) return;
                onChange({ ...block, rows: removeAt(block.rows, i) });
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <AddButton
          label="row"
          onClick={() =>
            onChange({ ...block, rows: [...block.rows, { label: "", value: "" }] })
          }
        />
        <MetaInput
          value={block.sourceLine ?? ""}
          onChange={(v) => {
            const next = { ...block };
            if (v === "") delete next.sourceLine;
            else next.sourceLine = v;
            onChange(next);
          }}
          placeholder="Source line (optional)"
        />
      </div>
    </div>
  );
}
