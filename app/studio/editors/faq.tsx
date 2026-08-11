"use client";

/* FAQ editor: question and answer pairs per chapter. */

import type { FaqItem } from "@/lib/faqs";
import {
  AddButton,
  RowControls,
  TextField,
  confirmIf,
  moveItem,
  removeAt,
  replaceAt,
} from "./shared";

export default function FaqEditor({
  faqs,
  onChange,
}: {
  faqs: FaqItem[];
  onChange: (f: FaqItem[]) => void;
}) {
  return (
    <div className="space-y-4">
      {faqs.length === 0 && (
        <div className="font-sans text-small text-stone">
          No FAQs for this chapter yet.
        </div>
      )}
      {faqs.map((f, i) => (
        <div key={i} className="rounded-sm border border-rule bg-paper-deep/30 p-3">
          <div className="flex items-start gap-2">
            <TextField
              value={f.question}
              onChange={(v) => onChange(replaceAt(faqs, i, { ...f, question: v }))}
              className="font-serif font-medium text-body"
              placeholder="Question…"
            />
            <RowControls
              index={i}
              total={faqs.length}
              onMove={(d) => onChange(moveItem(faqs, i, i + d))}
              onRemove={() => {
                if (
                  !confirmIf(
                    f.question.length <= 40 && f.answer.length <= 40,
                    "Delete this FAQ?"
                  )
                )
                  return;
                onChange(removeAt(faqs, i));
              }}
            />
          </div>
          <TextField
            value={f.answer}
            onChange={(v) => onChange(replaceAt(faqs, i, { ...f, answer: v }))}
            className="mt-1 font-serif text-body leading-relaxed"
            placeholder="Answer…"
          />
        </div>
      ))}
      <AddButton
        label="FAQ"
        onClick={() => onChange([...faqs, { question: "", answer: "" }])}
      />
    </div>
  );
}
