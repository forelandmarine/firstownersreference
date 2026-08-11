"use client";

/*
  Studio block editor (docs/studio-editor-plan.md, step 2). Lead essays
  first; other families follow. Blocks map one-to-one onto the content
  schema; text fields smarten quotes as you type; the save gate blocks
  structural errors and any em-dash added beyond the on-load baseline.
*/

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { LeadEssay } from "@/lib/lead-essays";
import type { Section } from "@/lib/sections";
import {
  countEmDashes,
  lintValue,
  smarten,
  type LintIssue,
} from "@/lib/studio/typography";

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

/* Smartening rewrites the field value, which would throw the caret to the
   end on every converted quote. smarten() is one-for-one on length, so the
   caret position captured at input time stays valid after the rewrite. */
function useSmartField<T extends HTMLTextAreaElement | HTMLInputElement>(
  value: string,
  onChange: (v: string) => void
) {
  const ref = useRef<T>(null);
  const caret = useRef<number | null>(null);
  const handleChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      caret.current = e.target.selectionStart;
      onChange(smarten(e.target.value));
    },
    [onChange]
  );
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && caret.current !== null && document.activeElement === el) {
      el.setSelectionRange(caret.current, caret.current);
    }
    caret.current = null;
  }, [value]);
  return { ref, handleChange };
}

/* Auto-growing textarea that smartens quotes on every change. */
function TextField({
  value,
  onChange,
  className = "",
  placeholder,
  spellCheck = true,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  spellCheck?: boolean;
}) {
  const { ref, handleChange } = useSmartField<HTMLTextAreaElement>(
    value,
    onChange
  );
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value, ref]);
  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      placeholder={placeholder}
      spellCheck={spellCheck}
      onChange={handleChange}
      className={`w-full resize-none overflow-hidden bg-transparent outline-none focus:bg-white/60 rounded-sm px-1 -mx-1 transition-colors ${className}`}
    />
  );
}

function MetaInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const { ref, handleChange } = useSmartField<HTMLInputElement>(
    value,
    onChange
  );
  return (
    <input
      ref={ref}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="w-full bg-transparent outline-none focus:bg-white/60 rounded-sm px-1 -mx-1 font-sans text-small text-charcoal-soft"
    />
  );
}

function TypeChip({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className={`inline-block font-sans text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${tone}`}
    >
      {label}
    </span>
  );
}

export default function StudioClient() {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [essays, setEssays] = useState<Record<string, LeadEssay> | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showLint, setShowLint] = useState(false);
  const [emDashBaseline, setEmDashBaseline] = useState(0);
  const dragFrom = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [insertAt, setInsertAt] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const [secRes, essayRes] = await Promise.all([
        fetch("/studio/api/content?family=sections"),
        fetch("/studio/api/content?family=lead-essays"),
      ]);
      if (!secRes.ok || !essayRes.ok) throw new Error("content API unavailable");
      const sec = (await secRes.json()).data as Section[];
      const ess = (await essayRes.json()).data as Record<string, LeadEssay>;
      setSections(sec);
      setEssays(ess);
      setSlug((s) => s ?? sec[0]?.slug ?? null);
      setEmDashBaseline(countEmDashes(ess));
      setDirty(false);
      setSaveError(null);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  useEffect(() => {
    /* Initial fetch; state updates land after the awaits inside load(). */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const essay = essays && slug ? essays[slug] : null;

  const issues = useMemo<LintIssue[]>(
    () => (essays ? lintValue(essays, "") : []),
    [essays]
  );
  const emDashCount = useMemo(
    () => (essays ? countEmDashes(essays) : 0),
    [essays]
  );
  const errors = issues.filter((i) => i.severity === "error");
  const newEmDashes = Math.max(0, emDashCount - emDashBaseline);
  const canSave = dirty && !saving && errors.length === 0 && newEmDashes === 0;

  const updateEssay = useCallback(
    (fn: (e: LeadEssay) => LeadEssay) => {
      setEssays((prev) =>
        prev && slug ? { ...prev, [slug]: fn(prev[slug]) } : prev
      );
      setDirty(true);
      setSaveError(null);
    },
    [slug]
  );

  const setBlock = (i: number, b: Block) =>
    updateEssay((e) => ({
      ...e,
      paragraphs: e.paragraphs.map((p, j) => (j === i ? b : p)),
    }));

  const insertBlock = (i: number, b: Block) => {
    updateEssay((e) => {
      const next = [...e.paragraphs];
      next.splice(i, 0, b);
      return { ...e, paragraphs: next };
    });
    setInsertAt(null);
  };

  const removeBlock = (i: number) => {
    const b = essay?.paragraphs[i];
    if (b !== undefined && blockText(b).length > 40) {
      if (!window.confirm("Delete this block? Its text will be lost.")) return;
    }
    updateEssay((e) => ({
      ...e,
      paragraphs: e.paragraphs.filter((_, j) => j !== i),
    }));
  };

  const moveBlock = (from: number, to: number) => {
    if (from === to || to < 0 || !essay || to >= essay.paragraphs.length) return;
    updateEssay((e) => {
      const next = [...e.paragraphs];
      const [b] = next.splice(from, 1);
      next.splice(to, 0, b);
      return { ...e, paragraphs: next };
    });
  };

  const save = useCallback(async () => {
    if (!essays || saving) return;
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/studio/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ family: "lead-essays", data: essays }),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(
          body.errors ? body.errors.join("; ") : body.error ?? "save failed"
        );
      }
      setDirty(false);
      setSavedAt(new Date());
      setEmDashBaseline(countEmDashes(essays));
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  }, [essays, saving]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (canSave) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canSave, save]);

  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  if (loadError) {
    return (
      <div className="p-10 font-sans text-small text-charcoal">
        Studio could not load content: {loadError}. Is this `next dev`?
      </div>
    );
  }
  if (!sections || !essays) {
    return <div className="p-10 font-sans text-small text-stone">Loading…</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-rule bg-paper-deep/60 px-4 py-6">
        <div className="font-sans text-meta uppercase tracking-widest text-stone mb-1">
          TFOR Studio
        </div>
        <div className="font-sans text-meta text-stone-soft mb-6">
          Lead essays · shared source, both editions
        </div>
        <nav className="space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSlug(s.slug)}
              className={`block w-full text-left rounded-sm px-2 py-1.5 font-sans text-small transition-colors ${
                s.slug === slug
                  ? "bg-marine text-paper"
                  : "text-charcoal-soft hover:bg-paper-deep"
              }`}
            >
              <span className="text-[10px] tabular-nums mr-2 opacity-60">
                {s.number}
              </span>
              {s.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-rule bg-paper/95 backdrop-blur px-6 py-3">
          <div className="font-sans text-small text-charcoal-soft flex-1 truncate">
            {essay ? essay.title : "—"}
            {dirty && (
              <span className="ml-2 inline-block h-2 w-2 rounded-full bg-sail align-middle" />
            )}
          </div>
          <button
            onClick={() => setShowLint((v) => !v)}
            className={`font-sans text-meta rounded-sm px-2 py-1 border ${
              errors.length > 0 || newEmDashes > 0
                ? "border-red-700 text-red-700"
                : "border-rule text-stone"
            }`}
          >
            {errors.length + newEmDashes > 0
              ? `${errors.length + newEmDashes} blocking`
              : issues.length > 0
                ? `${issues.length} warnings`
                : "clean"}
          </button>
          <button
            onClick={() => {
              if (!dirty || window.confirm("Discard unsaved changes?")) load();
            }}
            className="font-sans text-meta text-stone border border-rule rounded-sm px-2 py-1 hover:bg-paper-deep"
          >
            Revert
          </button>
          <button
            onClick={save}
            disabled={!canSave}
            className="font-sans text-meta font-medium rounded-sm px-3 py-1 bg-marine text-paper disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>

        {saveError && (
          <div className="mx-6 mt-3 rounded-sm border border-red-700/40 bg-red-50 px-3 py-2 font-sans text-small text-red-800">
            {saveError}
          </div>
        )}
        {savedAt && !dirty && !saveError && (
          <div className="mx-6 mt-3 font-sans text-meta text-stone">
            Saved to content/lead-essays.json at {savedAt.toLocaleTimeString()}
          </div>
        )}

        {/* Lint panel */}
        {showLint && (
          <div className="mx-6 mt-3 rounded-sm border border-rule bg-paper-deep/50 px-4 py-3 font-sans text-small">
            {newEmDashes > 0 && (
              <div className="text-red-800 mb-1">
                {newEmDashes} new em-dash{newEmDashes > 1 ? "es" : ""} added —
                remove before saving (house style).
              </div>
            )}
            {issues.length === 0 && newEmDashes === 0 && (
              <div className="text-stone">No typography issues.</div>
            )}
            <ul className="space-y-1">
              {issues.map((i, n) => (
                <li
                  key={n}
                  className={
                    i.severity === "error" ? "text-red-800" : "text-stone"
                  }
                >
                  <span className="font-medium">{i.rule}</span>{" "}
                  <span className="text-stone-soft">{i.path}</span> “{i.excerpt}”
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Essay */}
        {essay && (
          <div className="mx-auto max-w-2xl px-6 py-10">
            {/* Meta */}
            <div className="mb-8 border-b border-rule pb-6">
              <TextField
                value={essay.title}
                onChange={(v) => updateEssay((e) => ({ ...e, title: v }))}
                className="font-serif font-medium text-title leading-tight"
                placeholder="Title"
              />
              <TextField
                value={essay.standfirst}
                onChange={(v) => updateEssay((e) => ({ ...e, standfirst: v }))}
                className="mt-2 font-serif italic text-subhead text-charcoal-soft"
                placeholder="Standfirst"
              />
              <div className="mt-3 max-w-40">
                <MetaInput
                  value={essay.readingTime}
                  onChange={(v) => updateEssay((e) => ({ ...e, readingTime: v }))}
                  placeholder="Reading time"
                />
              </div>
            </div>

            {/* Blocks */}
            <div>
              {essay.paragraphs.map((b, i) => (
                <div key={i}>
                  <BlockRow
                    block={b}
                    index={i}
                    total={essay.paragraphs.length}
                    isDragOver={dragOver === i}
                    onChange={(nb) => setBlock(i, nb)}
                    onRemove={() => removeBlock(i)}
                    onMove={(d) => moveBlock(i, i + d)}
                    onInsertBelow={() =>
                      setInsertAt((v) => (v === i + 1 ? null : i + 1))
                    }
                    onDragStart={() => (dragFrom.current = i)}
                    onDragOverRow={(e) => {
                      e.preventDefault();
                      setDragOver(i);
                    }}
                    onDropRow={() => {
                      if (dragFrom.current !== null)
                        moveBlock(dragFrom.current, i);
                      dragFrom.current = null;
                      setDragOver(null);
                    }}
                    onDragEnd={() => {
                      dragFrom.current = null;
                      setDragOver(null);
                    }}
                  />
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
              onChange={(cn) =>
                updateEssay((e) => {
                  const next = { ...e };
                  if (cn === undefined) delete next.closingNote;
                  else next.closingNote = cn;
                  return next;
                })
              }
            />
          </div>
        )}
      </main>
    </div>
  );
}

function BlockRow({
  block,
  index,
  total,
  isDragOver,
  onChange,
  onRemove,
  onMove,
  onInsertBelow,
  onDragStart,
  onDragOverRow,
  onDropRow,
  onDragEnd,
}: {
  block: Block;
  index: number;
  total: number;
  isDragOver: boolean;
  onChange: (b: Block) => void;
  onRemove: () => void;
  onMove: (delta: number) => void;
  onInsertBelow: () => void;
  onDragStart: () => void;
  onDragOverRow: (e: React.DragEvent) => void;
  onDropRow: () => void;
  onDragEnd: () => void;
}) {
  return (
    <div
      onDragOver={onDragOverRow}
      onDrop={onDropRow}
      className={`group relative rounded-sm py-1.5 pl-2 -ml-2 ${
        isDragOver ? "border-t-2 border-marine" : ""
      }`}
    >
      {/* Gutter controls */}
      <div className="absolute -left-24 top-1 hidden w-20 justify-end gap-0.5 group-hover:flex">
        <span
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("text/plain", String(index));
            e.dataTransfer.effectAllowed = "move";
            onDragStart();
          }}
          onDragEnd={onDragEnd}
          title="Drag to reorder"
          className="cursor-grab select-none rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone"
        >
          ⠿
        </span>
        <button
          onClick={() => onMove(-1)}
          disabled={index === 0}
          title="Move up"
          className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone disabled:opacity-30"
        >
          ↑
        </button>
        <button
          onClick={() => onMove(1)}
          disabled={index === total - 1}
          title="Move down"
          className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone disabled:opacity-30"
        >
          ↓
        </button>
        <button
          onClick={onInsertBelow}
          title="Insert below"
          className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone"
        >
          +
        </button>
        <button
          onClick={onRemove}
          title="Delete block"
          className="rounded-sm border border-rule bg-paper px-1 font-sans text-meta text-stone hover:border-red-700 hover:text-red-700"
        >
          ✕
        </button>
      </div>

      <BlockBody block={block} onChange={onChange} />
    </div>
  );
}

function BlockBody({
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
                    onChange({
                      ...block,
                      paragraphs: block.paragraphs.map((x, j) =>
                        j === i ? v : x
                      ),
                    })
                  }
                  className="font-serif text-body leading-relaxed"
                  placeholder="Paragraph…"
                />
                <button
                  onClick={() => {
                    if (
                      p.length > 40 &&
                      !window.confirm("Delete this paragraph?")
                    )
                      return;
                    onChange({
                      ...block,
                      paragraphs: block.paragraphs.filter((_, j) => j !== i),
                    });
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
            if (
              closingNote.some((b) => (typeof b === "string" ? b : b.text)) &&
              !window.confirm("Remove the whole closing note?")
            )
              return;
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
                  closingNote.map((x, j) =>
                    j === i ? (typeof x === "string" ? v : { ...x, text: v }) : x
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
              onClick={() =>
                onChange(closingNote.filter((_, j) => j !== i))
              }
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
