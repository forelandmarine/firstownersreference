# Recurring Formats — The First Owner's Reference

Status: editorial scaffolds for review. These are the five recurring editorial formats Jack identified. Each one defines what the format is, when it runs, structural template, and what good looks like. Once approved, the formats become real publishing surfaces alongside the nine chapters.

---

## 1. Project Post-Mortem

**What it is.** A documented failure on an anonymous, named-tier project, with the commercial consequences set out and the root causes worked through. Not a blame-placing exercise; a reading of where the structure failed.

**Cadence.** Two per year, tied to print-edition cycles. One concurrent, one historical.

**Length.** 1,500 to 2,500 words.

**Structural template.**
- Standfirst (one paragraph).
- Project context (yacht class, LOA, yard tier, engagement type, year — anonymised to level 4 unless the project record allows higher).
- The setup (what was contracted, against what scope, with what governance).
- The failure (what went wrong, in chronological order, with quantified deltas).
- The recovery (what was salvaged, what was not, what the warranty window did or did not cover).
- The structural reading (which root causes from the schema apply, and what each implies for first-time buyers).
- The lesson, in three bullets.
- Disclosure footer (composite or single-project; review log reference).

**Tone.** Clinical. Specific where the schema and named-firm review allow. Generic otherwise. No moralising. No identification of named individuals or firms in a critical light without their consent.

**First piece (anonymous case, documented failure, real commercial consequences).** The Foreland archive likely has 2 to 3 candidate projects at level-2 anonymisation. Editor-in-chief picks the one with the cleanest documentary record.

---

## 2. Yard Notes

**What it is.** A periodic note on a specific yard or yard cluster. Strengths, weaknesses, recent capacity changes, owner-side observations from the practitioner record.

**Cadence.** Quarterly. Four per year minimum.

**Length.** 600 to 1,000 words per yard.

**Structural template.**
- Yard name and tier.
- Position in the market (size band served, segment strengths, geographic reach).
- Recent capacity changes (acquisitions, expansions, closures, ownership shifts).
- Owner-side observations (practitioner record, with named-firm review where assertions go beyond public record).
- Recent published projects (delivery list with year, named where public).
- Slot availability snapshot at time of writing.
- Source line and review date.

**Tone.** Informational. Equivalent treatment given to all yards covered. Critical findings are paired with addressable counterweights (contract structure, owner-side representation, yard selection criteria) so the format does not read as a yard rating.

**Initial coverage.** Eight yards over year one, two per quarter: MB92, Lürssen Refit / Bläsing, Pendennis, RMK Marine, Astilleros de Mallorca, Lusben, Rybovich, Damen. Two of these can lead the first quarter.

---

## 3. Contract Clause

**What it is.** A clause-by-clause read of a single shipbuilding or refit contract clause, with the buyer-side position, the yard-side position, and the practitioner default. Drawn from the practitioner record and published case law.

**Cadence.** Monthly. Twelve per year.

**Length.** 800 to 1,200 words.

**Structural template.**
- Clause name (e.g., "Stage payment loading").
- The clause as it typically appears in a yard-drafted contract (paraphrased to avoid copyright).
- The buyer-side position at heads of terms.
- The yard-side position.
- The practitioner default (with citation to a published source where one exists).
- The case-law position (with the relevant English court citation).
- The owner-rep negotiating playbook in three to five lines.
- Source line.

**Topic backlog (twelve, one per month).** Stage payment loading; refund guarantee credit quality; liquidated damages cap; force majeure burden; change order procedure; defect notification deadlines; warranty length; cancellation thresholds; title position during construction; dispute forum and seat; pre-delivery title transfer; remedy for late delivery.

**Tone.** Legal-technical, clear language. Practitioner-led, not law-firm marketing. Cited where citable; flagged as practitioner default where not.

---

## 4. Market Signal

**What it is.** A short read of a single market signal or data point that has changed since the last edition. Days-on-market shifts, order-book shifts, regulatory news (EU ETS phase changes, Solent Freeport announcements), insurance market hardening or softening, yard ownership changes, and industry-event takeaways.

**Cadence.** Weekly during the publication's active months (March–November); paused over the winter editorial close. Approximately thirty per year.

**Length.** 300 to 600 words.

**Structural template.**
- Signal headline.
- The data point (with source citation).
- What changed (since when).
- What it implies for a first-time buyer in the next 6 to 12 months.
- One-line action or watch item.
- Source line.

**Topic backlog.** Quay Crew salary updates; BOAT International Global Order Book quarterly; Knight Frank Wealth Report annual release; Italian Sea Group restructuring milestones; new SYBAss member admissions; Pantaenius and AIG insurance commentary; Squircle Capital movements; Ancient/Burgess Q-on-Q; HVO bunker availability shifts; Mediterranean berth pricing seasonality.

**Tone.** Wire-service brief. Calm, dated, sourced.

---

## 5. Operational Error

**What it is.** A specific operational mistake on a real (anonymised) yacht, with the cost in money and crew time, and the disciplines that would have caught it.

**Cadence.** Monthly. Twelve per year.

**Length.** 500 to 900 words.

**Structural template.**
- The error (one paragraph).
- The setup (vessel class and tier, operating area, crew composition at the time, oversight structure).
- The cost (in money, in crew time, in onward operational consequences).
- The disciplines that would have caught it (specific: weekly maintenance log, captain's daily report, milestone inspection, ISM audit, etc.).
- The lesson, in two to four lines.
- Disclosure footer.

**Topic backlog (twelve seed topics).** Cooling system corrosion missed at survey; paint blister cluster traced to humidity logging; fuel polishing skipped, generator failure year three; ISM SMS gaps surfaced at port-state inspection; shaft alignment slip leading to vibration complaint; chartering during a flag-state status change; insurance claim denied for crew non-compliance with rotation; tender-deck modification voiding builder warranty; a class-society dispute over hull thickness measurement; berth-shift error during delivery passage; transponder log gap leading to MCA fine; charter cancellation triggered by undisclosed mechanical condition.

**Tone.** Operational, calm. Crew never named, never blamed. The structural reading is the point.

---

## Annual editorial calendar (one-page summary)

```
Format               Cadence          Annual count       Notes
-------------------- ---------------- ------------------ ------------------------------------
Chapters (lead)      Annual           1 edition × 9      September each year
Project Post-Mortem  Bi-annual        2                  One concurrent, one historical
Yard Notes           Quarterly        4 (covers ~8)      Two yards per quarter
Contract Clause      Monthly          12                 Topic backlog above
Market Signal        Weekly Mar–Nov   ~30                Wire-service cadence
Operational Error    Monthly          12                 Topic backlog above
                                      ----
                                      ~70 pieces/year
```

This puts the publication at roughly one piece every five days outside the print-edition window, plus the annual print release. Sustainable for the editorial team without paid contributors, given each format is short and uses Foreland's standing project archive as the source pool.

---

## Implementation notes (not editorial)

- Each format needs a small number of structural elements in the data layer:
  - new `lib/posts.ts` (or similar) with typed entries per format
  - a `format` enum on the post type
  - a route per format, e.g., `/post-mortem/[slug]`, `/yard-notes/[slug]`, `/contract-clause/[slug]`, `/market-signal/[slug]`, `/operational-error/[slug]`
  - a per-format index page
  - JSON-LD schema appropriate to each (Article for Project Post-Mortem and Operational Error; NewsArticle for Market Signal; Article with `articleSection` for the others)
- The home page should surface the three most recent posts across all formats above the chapter list.
- RSS feed at `/rss.xml` for each format, plus a combined feed.
- Email subscription for Market Signal specifically (highest cadence).

The above is a single development effort; recommend scaffolding the post system once the chapter content is locked, around July 2026, so it ships with first post-mortem and first yard notes alongside the print release in September.
