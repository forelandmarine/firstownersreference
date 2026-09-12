/*
  Print pane: the selected chapter, paginated by Chrome, shown as a PDF.

  Not an iframe of /print. Paged media applies at print time, so /print in a
  browser window is one long scroll with no pages in it. Printing the real
  chapter through Chrome is the only preview that cannot drift from the
  press output, and it costs about three and a half seconds.

  What the pane cannot show: folios, parity spacers, merged full-bleed
  plates and measured closer heights all come from the two-pass press build.
  A preview taken after an edit carries the new copy with the previous
  build's measurements, so the pane says when that is the case rather than
  quietly showing something that is a little bit false.
*/

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  chapter: string;            // "01".."09"
  /** Bumped by the shell whenever content is saved. */
  revision: number;
  /** True when there are unsaved edits, so the preview is behind. */
  dirty: boolean;
};

export function PrintPane({ chapter, revision, dirty }: Props) {
  const [url, setUrl] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "printing" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [tookMs, setTookMs] = useState<number | null>(null);
  const lastUrl = useRef<string | null>(null);

  const render = useCallback(async () => {
    setState("printing");
    setMessage(null);
    const started = performance.now();
    try {
      const res = await fetch(`/studio/api/preview?chapter=${chapter}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `preview failed (${res.status})`);
      }
      const blob = await res.blob();
      const next = URL.createObjectURL(blob);
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
      lastUrl.current = next;
      setUrl(next);
      setTookMs(Math.round(performance.now() - started));
      setState("idle");
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : String(err));
    }
  }, [chapter]);

  /* Re-print on chapter change and after a save. Deliberately not on every
     keystroke: three and a half seconds of Chrome per character would make
     the editor unusable and the machine hot. */
  useEffect(() => {
    void render();
  }, [render, revision]);

  useEffect(() => () => {
    if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex items-center gap-3 px-3 py-2 border-b border-neutral-200 text-[11px]">
        <span className="font-medium">Chapter {chapter}</span>
        <button
          onClick={() => void render()}
          disabled={state === "printing"}
          className="px-2 py-1 border border-neutral-300 rounded disabled:opacity-40"
        >
          {state === "printing" ? "Printing…" : "Re-print"}
        </button>
        {tookMs !== null && state === "idle" && (
          <span className="opacity-50 tabular-nums">{tookMs} ms</span>
        )}
        {dirty && (
          <span className="text-amber-700">
            Unsaved edits — preview is behind
          </span>
        )}
        <span className="ml-auto opacity-50">
          Folios, spacers, plates and closer heights come from the last full
          press build
        </span>
      </div>

      {state === "error" && (
        <p className="m-3 text-[12px] text-red-700">{message}</p>
      )}

      {url ? (
        <iframe
          key={url}
          src={`${url}#view=FitH`}
          title={`Chapter ${chapter} preview`}
          className="flex-1 w-full min-h-0 border-0 bg-neutral-100"
        />
      ) : (
        <div className="flex-1 grid place-items-center text-[12px] opacity-50">
          {state === "printing" ? "Printing the chapter…" : "No preview yet"}
        </div>
      )}
    </div>
  );
}
