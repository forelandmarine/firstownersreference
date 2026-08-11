"use client";

/* Checklist editor: intent, grouped questions, printable note. */

import type { Checklist } from "@/lib/checklists";
import {
  AddButton,
  Labeled,
  RowControls,
  TextField,
  TypeChip,
  confirmIf,
  moveItem,
  removeAt,
  replaceAt,
} from "./shared";

export default function ChecklistEditor({
  checklist,
  onChange,
}: {
  checklist: Checklist;
  onChange: (c: Checklist) => void;
}) {
  const c = checklist;

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

      <Labeled label="Intent">
        <TextField
          value={c.intent}
          onChange={(v) => onChange({ ...c, intent: v })}
          className="font-serif text-body"
        />
      </Labeled>

      {c.groups.map((g, gi) => (
        <div key={gi} className="rounded-sm border border-rule bg-paper-deep/30 p-3">
          <div className="flex items-start gap-2">
            <TextField
              value={g.heading}
              onChange={(v) =>
                onChange({
                  ...c,
                  groups: replaceAt(c.groups, gi, { ...g, heading: v }),
                })
              }
              className="font-serif font-medium text-subhead"
              placeholder="Group heading…"
            />
            <RowControls
              index={gi}
              total={c.groups.length}
              onMove={(d) =>
                onChange({ ...c, groups: moveItem(c.groups, gi, gi + d) })
              }
              onRemove={() => {
                if (
                  !confirmIf(
                    g.items.length === 0 && g.heading.length === 0,
                    `Delete the group "${g.heading}" and its ${g.items.length} questions?`
                  )
                )
                  return;
                onChange({ ...c, groups: removeAt(c.groups, gi) });
              }}
            />
          </div>
          <div className="mt-2 space-y-2">
            {g.items.map((it, ii) => (
              <div key={ii} className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <TextField
                    value={it.question}
                    onChange={(v) =>
                      onChange({
                        ...c,
                        groups: replaceAt(c.groups, gi, {
                          ...g,
                          items: replaceAt(g.items, ii, { ...it, question: v }),
                        }),
                      })
                    }
                    className="font-serif text-body"
                    placeholder="Question…"
                  />
                  <TextField
                    value={it.detail ?? ""}
                    onChange={(v) => {
                      const next = { ...it };
                      if (v === "") delete next.detail;
                      else next.detail = v;
                      onChange({
                        ...c,
                        groups: replaceAt(c.groups, gi, {
                          ...g,
                          items: replaceAt(g.items, ii, next),
                        }),
                      });
                    }}
                    className="font-serif text-small text-stone"
                    placeholder="Detail (optional)"
                  />
                </div>
                <div className="mt-1">
                  <RowControls
                    index={ii}
                    total={g.items.length}
                    onMove={(d) =>
                      onChange({
                        ...c,
                        groups: replaceAt(c.groups, gi, {
                          ...g,
                          items: moveItem(g.items, ii, ii + d),
                        }),
                      })
                    }
                    onRemove={() => {
                      if (!confirmIf(it.question.length <= 40, "Delete this question?"))
                        return;
                      onChange({
                        ...c,
                        groups: replaceAt(c.groups, gi, {
                          ...g,
                          items: removeAt(g.items, ii),
                        }),
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <AddButton
              label="question"
              onClick={() =>
                onChange({
                  ...c,
                  groups: replaceAt(c.groups, gi, {
                    ...g,
                    items: [...g.items, { question: "" }],
                  }),
                })
              }
            />
          </div>
        </div>
      ))}
      <AddButton
        label="group"
        onClick={() =>
          onChange({ ...c, groups: [...c.groups, { heading: "", items: [] }] })
        }
      />

      <div>
        <TypeChip label="Printable note" tone="bg-stone/15 text-stone" />
        <TextField
          value={c.printable}
          onChange={(v) => onChange({ ...c, printable: v })}
          className="font-serif text-small text-stone"
        />
      </div>
    </div>
  );
}
