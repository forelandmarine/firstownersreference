"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  searchIndex,
  extractSnippets,
  tokenise,
  type SearchEntry,
} from "@/lib/search-index";

function searchClient(query: string, index: SearchEntry[]): SearchEntry[] {
  const tokens = tokenise(query);
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

  const tokens = useMemo(() => tokenise(query), [query]);
  const results = useMemo(() => searchClient(query, searchIndex), [query]);

  return (
    <div className="space-y-12">
      <div className="space-y-3">
        <label htmlFor="search-input" className="meta-marine block">
          Search The First Owner’s Reference
        </label>
        <div className="flex items-center gap-4 border border-charcoal focus-within:border-marine transition-colors px-5 sm:px-6 py-3 sm:py-4 bg-paper">
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="text-charcoal-soft shrink-0"
            aria-hidden="true"
          >
            <circle cx="6" cy="6" r="4.5" />
            <path d="M9.5 9.5 L13 13" strokeLinecap="round" />
          </svg>
          <input
            id="search-input"
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search…"
            className="flex-1 bg-transparent font-serif text-xl sm:text-2xl lg:text-3xl placeholder:text-stone-soft focus:outline-none py-1"
          />
        </div>
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
          {results.map((entry) => {
            const snippets = extractSnippets(entry, tokens, 3, 160);
            return (
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
                  <p className="font-serif text-xl lg:text-2xl text-charcoal group-hover:text-marine transition-colors mb-3">
                    {entry.title}
                  </p>
                  {snippets.length > 0 ? (
                    <ul className="space-y-3 max-w-3xl">
                      {snippets.map((snippet, si) => (
                        <li
                          key={si}
                          className="caption leading-relaxed text-charcoal-soft border-l-2 border-rule group-hover:border-marine pl-4 transition-colors"
                        >
                          {snippet.parts.map((part, pi) =>
                            part.highlight ? (
                              <mark
                                key={pi}
                                className="bg-marine/15 text-charcoal font-serif italic px-0.5 rounded-sm"
                              >
                                {part.value}
                              </mark>
                            ) : (
                              <span key={pi}>{part.value}</span>
                            )
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="caption max-w-3xl">{entry.excerpt}</p>
                  )}
                </Link>
              </li>
            );
          })}
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
