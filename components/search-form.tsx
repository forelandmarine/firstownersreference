"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { searchIndex, type SearchEntry } from "@/lib/search-index";

function searchClient(query: string, index: SearchEntry[]): SearchEntry[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return [];

  return index
    .map((entry) => {
      let score = 0;
      const title = entry.title.toLowerCase();
      for (const token of tokens) {
        if (title.includes(token)) score += 10;
        const occurrences = entry.haystack.split(token).length - 1;
        score += occurrences;
      }
      return { entry, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((s) => s.entry);
}

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchClient(query, searchIndex), [query]);

  return (
    <div className="space-y-12">
      <div className="border-b border-charcoal pb-2">
        <label htmlFor="search-input" className="meta-marine block mb-2">
          Search the Reference
        </label>
        <input
          id="search-input"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a topic, yacht name, builder, or keyword"
          className="w-full bg-transparent font-serif text-3xl lg:text-5xl placeholder:text-stone-soft focus:outline-none py-4"
        />
      </div>

      {query.trim().length > 1 && (
        <div className="space-y-2">
          <p className="meta">
            {results.length === 0
              ? "No matches"
              : `${results.length} result${results.length === 1 ? "" : "s"}`}
          </p>
        </div>
      )}

      {results.length > 0 && (
        <ul className="space-y-2">
          {results.map((entry) => (
            <li key={entry.id} className="border-t border-rule">
              <Link
                href={entry.url}
                className="block py-6 group hover:bg-paper-deep -mx-4 px-4 transition-colors"
              >
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 mb-2">
                  <span className="meta-marine">
                    Chapter {entry.sectionNumber}
                  </span>
                  <span className="meta">{entry.kindLabel}</span>
                  <span className="meta text-stone-soft">
                    {entry.sectionTitle}
                  </span>
                </div>
                <p className="font-serif text-xl lg:text-2xl text-charcoal group-hover:text-marine transition-colors mb-2">
                  {entry.title}
                </p>
                <p className="caption max-w-3xl">{entry.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {query.trim().length <= 1 && (
        <div className="space-y-6 max-w-2xl">
          <p className="meta">Try</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              "operating cost",
              "depreciation",
              "owner\u2019s representative",
              "VAT",
              "Lurssen",
              "Feadship",
              "charter",
              "refit",
              "STP Palma",
              "Pantaenius",
              "Howden",
              "sail",
              "racing",
              "captain hire",
              "dual agency",
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="font-serif text-lg text-charcoal-soft hover:text-marine border-b border-rule hover:border-marine transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
