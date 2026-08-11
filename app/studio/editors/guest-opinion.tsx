"use client";

/* Guest opinion editor: contributor Q&As per chapter. */

import type { GuestOpinion } from "@/lib/guest-opinions";
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

export default function GuestOpinionEditor({
  chapterSlug,
  opinions,
  onChange,
}: {
  chapterSlug: string;
  opinions: GuestOpinion[];
  onChange: (o: GuestOpinion[]) => void;
}) {
  return (
    <div className="space-y-6">
      {opinions.length === 0 && (
        <div className="font-sans text-small text-stone">
          No guest Q&As for this chapter yet.
        </div>
      )}
      {opinions.map((o, oi) => (
        <div key={oi} className="rounded-sm border border-rule p-4">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0 grid grid-cols-2 gap-3">
              <Labeled label="Contributor">
                <MetaInput
                  value={o.contributor}
                  onChange={(v) =>
                    onChange(replaceAt(opinions, oi, { ...o, contributor: v }))
                  }
                />
              </Labeled>
              <Labeled label="Role">
                <MetaInput
                  value={o.contributorRole}
                  onChange={(v) =>
                    onChange(replaceAt(opinions, oi, { ...o, contributorRole: v }))
                  }
                />
              </Labeled>
            </div>
            <RowControls
              index={oi}
              total={opinions.length}
              onMove={(d) => onChange(moveItem(opinions, oi, oi + d))}
              onRemove={() => {
                if (
                  !confirmIf(
                    o.questions.length === 0,
                    `Delete ${o.contributor || "this contributor"}’s Q&A (${o.questions.length} questions)?`
                  )
                )
                  return;
                onChange(removeAt(opinions, oi));
              }}
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Labeled label="LinkedIn (optional)">
              <MetaInput
                value={o.contributorLinkedIn ?? ""}
                onChange={(v) => {
                  const next = { ...o };
                  if (v === "") delete next.contributorLinkedIn;
                  else next.contributorLinkedIn = v;
                  onChange(replaceAt(opinions, oi, next));
                }}
              />
            </Labeled>
            <Labeled label="Intro (optional)">
              <MetaInput
                value={o.intro ?? ""}
                onChange={(v) => {
                  const next = { ...o };
                  if (v === "") delete next.intro;
                  else next.intro = v;
                  onChange(replaceAt(opinions, oi, next));
                }}
              />
            </Labeled>
          </div>

          <div className="mt-4 space-y-4">
            {o.questions.map((q, qi) => (
              <div
                key={qi}
                className="rounded-sm border border-rule bg-paper-deep/30 p-3"
              >
                <div className="flex items-start gap-2">
                  <TextField
                    value={q.question}
                    onChange={(v) =>
                      onChange(
                        replaceAt(opinions, oi, {
                          ...o,
                          questions: replaceAt(o.questions, qi, { ...q, question: v }),
                        })
                      )
                    }
                    className="font-serif font-medium text-body"
                    placeholder="Question…"
                  />
                  <RowControls
                    index={qi}
                    total={o.questions.length}
                    onMove={(d) =>
                      onChange(
                        replaceAt(opinions, oi, {
                          ...o,
                          questions: moveItem(o.questions, qi, qi + d),
                        })
                      )
                    }
                    onRemove={() => {
                      if (!confirmIf(q.question.length <= 40, "Delete this question?"))
                        return;
                      onChange(
                        replaceAt(opinions, oi, {
                          ...o,
                          questions: removeAt(o.questions, qi),
                        })
                      );
                    }}
                  />
                </div>
                <div className="mt-1 space-y-1">
                  {q.answer.map((a, ai) => (
                    <div key={ai} className="flex items-start gap-2">
                      <TextField
                        value={a}
                        onChange={(v) =>
                          onChange(
                            replaceAt(opinions, oi, {
                              ...o,
                              questions: replaceAt(o.questions, qi, {
                                ...q,
                                answer: replaceAt(q.answer, ai, v),
                              }),
                            })
                          )
                        }
                        className="font-serif text-body leading-relaxed"
                        placeholder="Answer paragraph…"
                      />
                      <button
                        onClick={() => {
                          if (!confirmIf(a.length <= 40, "Delete this paragraph?"))
                            return;
                          onChange(
                            replaceAt(opinions, oi, {
                              ...o,
                              questions: replaceAt(o.questions, qi, {
                                ...q,
                                answer: removeAt(q.answer, ai),
                              }),
                            })
                          );
                        }}
                        className="mt-1 font-sans text-meta text-stone hover:text-red-700"
                        title="Delete paragraph"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      onChange(
                        replaceAt(opinions, oi, {
                          ...o,
                          questions: replaceAt(o.questions, qi, {
                            ...q,
                            answer: [...q.answer, ""],
                          }),
                        })
                      )
                    }
                    className="font-sans text-meta text-stone"
                  >
                    + answer paragraph
                  </button>
                </div>
                <div className="mt-2">
                  <TypeChip label="Pull quote" tone="bg-sail/10 text-sail" />
                  <MetaInput
                    value={q.pullQuote ?? ""}
                    onChange={(v) => {
                      const next = { ...q };
                      if (v === "") delete next.pullQuote;
                      else next.pullQuote = v;
                      onChange(
                        replaceAt(opinions, oi, {
                          ...o,
                          questions: replaceAt(o.questions, qi, next),
                        })
                      );
                    }}
                    placeholder="Pull quote (optional)"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <AddButton
              label="question"
              onClick={() =>
                onChange(
                  replaceAt(opinions, oi, {
                    ...o,
                    questions: [...o.questions, { question: "", answer: [""] }],
                  })
                )
              }
            />
          </div>
        </div>
      ))}
      <AddButton
        label="contributor Q&A"
        onClick={() =>
          onChange([
            ...opinions,
            {
              slug: chapterSlug,
              contributor: "",
              contributorRole: "",
              questions: [],
            },
          ])
        }
      />
    </div>
  );
}
