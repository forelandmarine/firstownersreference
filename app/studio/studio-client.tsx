"use client";

/*
  Studio shell (docs/studio-editor-plan.md, step 2). Chapter sidebar,
  family tabs, shared load/save/lint plumbing. Family editors live in
  ./editors/. The save gate blocks structural lint errors and any em-dash
  added beyond the on-load baseline across the whole store.
*/

import { useCallback, useEffect, useMemo, useState } from "react";
import { PrintPane } from "./print-pane";
import type { LeadEssay } from "@/lib/lead-essays";
import type { Section } from "@/lib/sections";
import type { CaseStudy } from "@/lib/cases";
import type { DataSpread } from "@/lib/data-spreads";
import type { Checklist } from "@/lib/checklists";
import type { FaqItem } from "@/lib/faqs";
import type { GuestOpinion } from "@/lib/guest-opinions";
import {
  countEmDashes,
  lintValue,
  type LintIssue,
} from "@/lib/studio/typography";
import LeadEssayEditor from "./editors/lead-essay";
import DataSpreadEditor from "./editors/data-spread";
import CaseStudyEditor from "./editors/case-study";
import ChecklistEditor from "./editors/checklist";
import FaqEditor from "./editors/faq";
import GuestOpinionEditor from "./editors/guest-opinion";
import SectionMetaEditor from "./editors/section-meta";

type Store = {
  sections: Section[];
  "lead-essays": Record<string, LeadEssay>;
  cases: Record<string, CaseStudy>;
  "data-spreads": Record<string, DataSpread>;
  checklists: Record<string, Checklist>;
  faqs: Record<string, FaqItem[]>;
  "guest-opinions": Record<string, GuestOpinion[]>;
};

type FamilyKey = keyof Store;

/* The Print tab is not a content family: it edits nothing and saves
   nothing, it shows the chapter as Chrome will print it. */
type TabKey = FamilyKey | "print";

const FAMILIES: FamilyKey[] = [
  "sections",
  "lead-essays",
  "cases",
  "data-spreads",
  "checklists",
  "faqs",
  "guest-opinions",
];

const TABS: { key: TabKey; label: string }[] = [
  { key: "lead-essays", label: "Essay" },
  { key: "data-spreads", label: "Data" },
  { key: "cases", label: "Case" },
  { key: "checklists", label: "Checklist" },
  { key: "faqs", label: "FAQs" },
  { key: "guest-opinions", label: "Q&As" },
  { key: "sections", label: "Meta" },
  { key: "print", label: "Print" },
];

export default function StudioClient() {
  const [store, setStore] = useState<Store | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("lead-essays");
  /* Bumped on every successful save so the print pane re-prints. */
  const [revision, setRevision] = useState(0);
  const [dirty, setDirty] = useState<FamilyKey[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showLint, setShowLint] = useState(false);
  const [emDashBaseline, setEmDashBaseline] = useState(0);

  const load = useCallback(async () => {
    try {
      const responses = await Promise.all(
        FAMILIES.map((f) => fetch(`/studio/api/content?family=${f}`))
      );
      if (responses.some((r) => !r.ok)) throw new Error("content API unavailable");
      const bodies = await Promise.all(responses.map((r) => r.json()));
      const next = Object.fromEntries(
        FAMILIES.map((f, i) => [f, bodies[i].data])
      ) as Store;
      setStore(next);
      setSlug((s) => s ?? next.sections[0]?.slug ?? null);
      setEmDashBaseline(countEmDashes(next));
      setDirty([]);
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

  const issues = useMemo<LintIssue[]>(
    () => (store ? lintValue(store, "") : []),
    [store]
  );
  const emDashCount = useMemo(() => (store ? countEmDashes(store) : 0), [store]);
  const errors = issues.filter((i) => i.severity === "error");
  const newEmDashes = Math.max(0, emDashCount - emDashBaseline);
  const canSave =
    dirty.length > 0 && !saving && errors.length === 0 && newEmDashes === 0;

  const update = useCallback(
    <F extends FamilyKey>(family: F, data: Store[F]) => {
      setStore((prev) => (prev ? { ...prev, [family]: data } : prev));
      setDirty((prev) => (prev.includes(family) ? prev : [...prev, family]));
      setSaveError(null);
    },
    []
  );

  const save = useCallback(async () => {
    if (!store || saving || dirty.length === 0) return;
    setSaving(true);
    setSaveError(null);
    const failed: FamilyKey[] = [];
    const messages: string[] = [];
    for (const family of dirty) {
      try {
        const res = await fetch("/studio/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ family, data: store[family] }),
        });
        const body = await res.json();
        if (!res.ok) {
          failed.push(family);
          messages.push(
            `${family}: ${body.errors ? body.errors.join("; ") : body.error ?? "save failed"}`
          );
        }
      } catch (e) {
        failed.push(family);
        messages.push(`${family}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    setDirty(failed);
    if (messages.length > 0) setSaveError(messages.join(" · "));
    if (failed.length === 0) {
      setSavedAt(new Date());
      setRevision((r) => r + 1);   // re-print the pane against saved content
      setEmDashBaseline(countEmDashes(store));
    }
    setSaving(false);
  }, [store, saving, dirty]);

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
      if (dirty.length > 0) e.preventDefault();
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
  if (!store) {
    return <div className="p-10 font-sans text-small text-stone">Loading…</div>;
  }

  const section = store.sections.find((s) => s.slug === slug) ?? null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-rule bg-paper-deep/60 px-4 py-6">
        <div className="font-sans text-meta uppercase tracking-widest text-stone mb-1">
          TFOR Studio
        </div>
        <div className="font-sans text-meta text-stone-soft mb-6">
          Shared source · both editions
        </div>
        <nav className="space-y-0.5">
          {store.sections.map((s) => (
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
        <div className="sticky top-0 z-10 border-b border-rule bg-paper/95 backdrop-blur px-6 pt-3">
          <div className="flex items-center gap-3 pb-2">
            <div className="font-sans text-small text-charcoal-soft flex-1 truncate">
              {section ? section.title : "—"}
              {dirty.length > 0 && (
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
                if (dirty.length === 0 || window.confirm("Discard unsaved changes?"))
                  load();
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
              {saving ? "Saving…" : dirty.length > 1 ? `Save (${dirty.length})` : "Save"}
            </button>
          </div>
          {/* Family tabs */}
          <div className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`font-sans text-small rounded-t-sm px-3 py-1.5 border-b-2 transition-colors ${
                  tab === t.key
                    ? "border-marine text-marine font-medium"
                    : "border-transparent text-stone hover:text-charcoal-soft"
                }`}
              >
                {t.label}
                {t.key !== "print" && dirty.includes(t.key) && (
                  <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-sail align-middle" />
                )}
              </button>
            ))}
          </div>
        </div>

        {saveError && (
          <div className="mx-6 mt-3 rounded-sm border border-red-700/40 bg-red-50 px-3 py-2 font-sans text-small text-red-800">
            {saveError}
          </div>
        )}
        {savedAt && dirty.length === 0 && !saveError && (
          <div className="mx-6 mt-3 font-sans text-meta text-stone">
            Saved to content/ at {savedAt.toLocaleTimeString()}
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
                  className={i.severity === "error" ? "text-red-800" : "text-stone"}
                >
                  <span className="font-medium">{i.rule}</span>{" "}
                  <span className="text-stone-soft">{i.path}</span> “{i.excerpt}”
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "print" && slug && (
          <div className="flex-1 min-h-0 h-[calc(100vh-9rem)]">
            <PrintPane
              chapter={slug.slice(0, 2)}
              revision={revision}
              dirty={dirty.length > 0}
            />
          </div>
        )}

        {/* Family editor */}
        <div
          hidden={tab === "print"}
          className={`mx-auto px-6 py-10 ${
            tab === "data-spreads" ? "max-w-4xl" : "max-w-2xl"
          }`}
        >
          {slug && tab === "lead-essays" && store["lead-essays"][slug] && (
            <LeadEssayEditor
              essay={store["lead-essays"][slug]}
              onChange={(e) =>
                update("lead-essays", { ...store["lead-essays"], [slug]: e })
              }
            />
          )}
          {slug && tab === "data-spreads" && store["data-spreads"][slug] && (
            <DataSpreadEditor
              spread={store["data-spreads"][slug]}
              onChange={(s) =>
                update("data-spreads", { ...store["data-spreads"], [slug]: s })
              }
            />
          )}
          {slug && tab === "cases" && store.cases[slug] && (
            <CaseStudyEditor
              caseStudy={store.cases[slug]}
              onChange={(c) => update("cases", { ...store.cases, [slug]: c })}
            />
          )}
          {slug && tab === "checklists" && store.checklists[slug] && (
            <ChecklistEditor
              checklist={store.checklists[slug]}
              onChange={(c) => update("checklists", { ...store.checklists, [slug]: c })}
            />
          )}
          {slug && tab === "faqs" && (
            <FaqEditor
              faqs={store.faqs[slug] ?? []}
              onChange={(f) => update("faqs", { ...store.faqs, [slug]: f })}
            />
          )}
          {slug && tab === "guest-opinions" && (
            <GuestOpinionEditor
              chapterSlug={slug}
              opinions={store["guest-opinions"][slug] ?? []}
              onChange={(o) => {
                const next = { ...store["guest-opinions"] };
                /* Chapters without Q&As have no key in the file; keep it
                   that way when the list is emptied. */
                if (o.length === 0 && !(slug in store["guest-opinions"])) {
                  delete next[slug];
                } else {
                  next[slug] = o;
                }
                update("guest-opinions", next);
              }}
            />
          )}
          {tab === "sections" && section && (
            <SectionMetaEditor
              section={section}
              onChange={(s) =>
                update(
                  "sections",
                  store.sections.map((x) => (x.slug === s.slug ? s : x))
                )
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}
