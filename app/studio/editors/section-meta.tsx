"use client";

/* Section metadata form: chapter frontmatter, hero, contributor, SEO. */

import type { Section } from "@/lib/sections";
import { Labeled, MetaInput, TextField } from "./shared";

const HERO_FOCUS = ["top", "center", "bottom", "left", "right"] as const;

export default function SectionMetaEditor({
  section,
  onChange,
}: {
  section: Section;
  onChange: (s: Section) => void;
}) {
  const set = (patch: Partial<Section>) => onChange({ ...section, ...patch });
  const setOptional = (key: "contributorLinkedIn" | "dateModified" | "heroFocus", v: string) => {
    const next = { ...section };
    if (v === "") delete next[key];
    else (next[key] as string) = v;
    onChange(next);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        <Labeled label="Number">
          <MetaInput value={section.number} onChange={(v) => set({ number: v })} />
        </Labeled>
        <Labeled label="Slug (fixed — routes and content keys depend on it)">
          <div className="font-mono text-small text-stone px-1">{section.slug}</div>
        </Labeled>
        <Labeled label="Coordinates">
          <MetaInput
            value={section.coordinates}
            onChange={(v) => set({ coordinates: v })}
          />
        </Labeled>
      </div>

      <Labeled label="Title">
        <TextField
          value={section.title}
          onChange={(v) => set({ title: v })}
          className="font-serif font-medium text-title leading-tight"
        />
      </Labeled>
      <Labeled label="Standfirst">
        <TextField
          value={section.standfirst}
          onChange={(v) => set({ standfirst: v })}
          className="font-serif italic text-subhead text-charcoal-soft"
        />
      </Labeled>

      <div className="rounded-sm border border-rule bg-paper-deep/40 p-3">
        {section.hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={section.hero}
            alt=""
            className="mb-2 max-h-48 w-auto rounded-sm"
          />
        )}
        <div className="grid grid-cols-[1fr_10rem] gap-4">
          <Labeled label="Hero image">
            <MetaInput value={section.hero} onChange={(v) => set({ hero: v })} />
          </Labeled>
          <Labeled label="Hero focus">
            <select
              value={section.heroFocus ?? ""}
              onChange={(e) => setOptional("heroFocus", e.target.value)}
              className="w-full bg-transparent font-sans text-small text-charcoal-soft outline-none"
            >
              <option value="">default (center)</option>
              {HERO_FOCUS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </Labeled>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Labeled label="Contributor">
          <MetaInput
            value={section.contributor}
            onChange={(v) => set({ contributor: v })}
          />
        </Labeled>
        <Labeled label="Contributor role">
          <MetaInput
            value={section.contributorRole}
            onChange={(v) => set({ contributorRole: v })}
          />
        </Labeled>
      </div>
      <Labeled label="Contributor LinkedIn (optional)">
        <MetaInput
          value={section.contributorLinkedIn ?? ""}
          onChange={(v) => setOptional("contributorLinkedIn", v)}
        />
      </Labeled>

      <div className="border-t border-rule pt-4 space-y-4">
        <Labeled label="SEO title">
          <TextField
            value={section.seoTitle}
            onChange={(v) => set({ seoTitle: v })}
            className="font-sans text-small"
          />
        </Labeled>
        <Labeled label="SEO description">
          <TextField
            value={section.seoDescription}
            onChange={(v) => set({ seoDescription: v })}
            className="font-sans text-small"
          />
        </Labeled>
        <div className="grid grid-cols-2 gap-4">
          <Labeled label="Date published">
            <MetaInput
              value={section.datePublished}
              onChange={(v) => set({ datePublished: v })}
            />
          </Labeled>
          <Labeled label="Date modified (optional)">
            <MetaInput
              value={section.dateModified ?? ""}
              onChange={(v) => setOptional("dateModified", v)}
            />
          </Labeled>
        </div>
      </div>
    </div>
  );
}
