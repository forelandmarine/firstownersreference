# Data Intake Schema — The First Owner's Reference

Status: editorial draft for review. This is the schema against which the 30-project Foreland archive will be retrospectively structured, and against which all future intake will be captured. The refit cost index sits on top of this schema as the first proprietary data product.

Get this right before building. The schema shapes what the publication can credibly assert across editions.

---

## Project record

Each project is one row. Composite cases (used in chapter cases.ts) are derived from one or more underlying project records.

```ts
type Project = {
  // Identity (private; not exposed)
  id: string;                          // internal Foreland project ID
  ownerCounsel?: string;               // engaging law firm; for context only
  enteredAt: string;                   // ISO date when Foreland engaged

  // Vessel
  vesselClass: VesselClass;
  loa: number;                         // length overall, metres
  beam?: number;                       // metres
  draught?: number;                    // metres
  grossTonnage?: number;               // GT
  hullMaterial: HullMaterial;
  yearBuilt?: number;
  buildYard: string;                   // for refit/operations records; for new build records, this is the contracting yard
  buildYardTier?: YardTier;

  // Engagement
  engagementType: EngagementType;
  engagementStartedAt: string;         // ISO date
  engagementEndedAt?: string;          // ISO date when engagement closed; null if ongoing
  engagementScope: EngagementScope[];
  ownerRepInvolvement: OwnerRepInvolvement;

  // Financials (anonymised band, not exact)
  contractValue?: NumericBand;         // EUR
  finalDeliveredCost?: NumericBand;    // EUR
  costDeltaPct?: number;               // percentage delta from original contract
  durationContractedDays?: number;
  durationDeliveredDays?: number;
  durationDeltaPct?: number;

  // Outcomes
  rootCauses: RootCause[];
  insuranceClaims: InsuranceClaim[];
  punchListItemsAtDelivery?: NumericBand;
  warrantyClaimValue?: NumericBand;    // EUR

  // Counterparties (anonymised band, not exact)
  managementCompany?: ManagementCompanyTier;
  brokeragesInvolved?: BrokerageTier[];
  surveyor?: SurveyorTier;
  paintContractor?: ContractorTier;

  // Editorial
  publishedReferences: PublishedReference[];   // where this project supports a chapter claim
  anonymisationLevel: AnonymisationLevel;
  reviewedBy: string[];                        // initials of editor(s) who reviewed for publication readiness
};

type VesselClass =
  | "motor-displacement"
  | "motor-semi-displacement"
  | "motor-planing"
  | "sail-cruising"
  | "sail-racing"
  | "sail-cruiser-racer"
  | "explorer"
  | "hybrid";

type HullMaterial = "steel" | "aluminium" | "composite" | "wood" | "mixed";
type YardTier = "tier-1-custom" | "tier-1-semi-custom" | "tier-2-volume" | "tier-3-regional";

type EngagementType =
  | "new-build-owner-rep"
  | "new-build-pm"
  | "refit-owner-rep"
  | "refit-pm"
  | "brokerage-acquisition-advisor"
  | "ongoing-management-oversight"
  | "warranty-claim-prosecution"
  | "delivery-acceptance-only";

type EngagementScope =
  | "yard-selection"
  | "contract-drafting"
  | "build-supervision"
  | "milestone-inspection"
  | "snag-list-management"
  | "sea-trial"
  | "delivery-acceptance"
  | "warranty-management"
  | "specification"
  | "fit-out-supervision"
  | "paint-supervision"
  | "vibration-acoustic"
  | "mechanical-propulsion"
  | "electrical-compliance";

type OwnerRepInvolvement =
  | "foreland-owner-rep"
  | "foreland-pm-only"
  | "foreland-late-stage-only"
  | "no-owner-rep"
  | "broker-acted-as-rep"
  | "family-office-deputised"
  | "naval-architect-acted-as-rep"
  | "yacht-management-acted-as-rep";

type NumericBand = {
  // Bands instead of exact values for anonymisation. Bands are tightened
  // only where the chapter requires it AND named-firm review has cleared.
  band: "0-1m" | "1-3m" | "3-5m" | "5-10m" | "10-20m" | "20-50m" | "50-100m" | "100m+";
  exact?: number;                      // private; only used where editor has cleared exposure
};

type RootCause =
  | "scope-loose-at-contract"
  | "no-defined-change-order-procedure"
  | "milestone-payments-tied-to-calendar-not-deliverables"
  | "weak-or-absent-owner-rep"
  | "yard-financial-distress-mid-build"
  | "refund-guarantee-credit-quality-inadequate"
  | "sub-contractor-failure"
  | "specification-incomplete"
  | "paint-failure"
  | "vibration-acoustic-failure"
  | "mechanical-failure"
  | "weather-or-force-majeure"
  | "flag-state-or-class-issue"
  | "owner-driven-late-changes";

type InsuranceClaim = {
  type: "builder-risk" | "hull" | "p-and-i" | "warranty" | "professional-indemnity";
  insurerTier?: "lloyds" | "international" | "regional";
  outcome: "paid-in-full" | "paid-in-part" | "denied" | "settled";
  valueBand?: NumericBand;
};

type ManagementCompanyTier =
  | "top-tier-international"
  | "regional"
  | "boutique-independent"
  | "self-managed";

type BrokerageTier =
  | "top-tier-international"
  | "regional"
  | "founder-led-boutique";

type SurveyorTier =
  | "tier-1-international"
  | "regional-specialist"
  | "class-society-only"
  | "broker-introduced";

type ContractorTier =
  | "tier-1-specialist"
  | "regional"
  | "yard-in-house";

type PublishedReference = {
  publication: "first-owners-reference" | "press-citation" | "internal-only";
  edition?: string;                    // e.g. "1st Edition, 2026"
  chapter?: string;                    // e.g. "05"
  format: "lead-essay" | "case" | "data-spread" | "faq" | "checklist" | "glossary";
  sourceLine: string;                  // anonymised reference line as published
  reviewedAt: string;                  // ISO date of named-firm review
};

type AnonymisationLevel =
  | "level-1-fully-identified"          // Foreland-internal only
  | "level-2-tier-and-region"           // tier and region disclosed; name suppressed
  | "level-3-tier-only"                 // only tier disclosed
  | "level-4-illustrative-pattern";     // pattern-only; no firm-level data
```

---

## Anonymisation protocol

Default level for any project in the archive: **level 2**. Higher levels (3, 4) for any project that supports a publication-facing assertion involving a named third-party firm.

Promotion to level 1 requires:
- A specific editorial need (e.g., a guest contributor's own firm being named in their own contribution)
- Written consent from the firm in question
- Editor-in-chief sign-off

Demotion to level 4 (pattern-only) is the default for any case where the underlying project would be identifiable from a combination of size, year, and yard. Composite cases in cases.ts must be at level 4 with the disclosure footer reflecting that no specific firm is named.

---

## Named-firm review standard

A named-firm review is required before any project record at level 1, 2, or 3 supports a published assertion that:

1. names a specific firm; AND
2. characterises that firm's conduct, motives, judgement, financial condition, or commercial relationships in a way that could be perceived as critical, even if factually defensible.

Review steps:
- The relevant chapter passage is drafted in full.
- The editor-in-chief reviews against:
  (a) the underlying project record;
  (b) public-record sources for any factual claim;
  (c) the editorial-stance memory (informational, not blame-placing).
- Where the assertion survives, the firm is named and the source line cites the public-record evidence.
- Where it does not, the assertion is rephrased generically (tier and region only) or removed.
- The reviewedAt date is recorded on the project record.

Pattern-only assertions ("the practice is industry-wide") do not require a named-firm review.

---

## Refit cost index — first data product

Built on the schema above by aggregating across all `engagementType: refit-*` records in the archive. Outputs:

- Median cost overrun band, by yard tier and yard region
- Median duration overrun band, by yard tier and yard region
- Most common root causes, ranked by frequency
- Owner-rep-presence vs absence, comparison of overrun bands
- Year-over-year shift in any of the above

Refresh cadence: annual, aligned with the publication's edition cycle.

Publication scope: aggregate-only, no firm-level disclosure. Supports chapter 06 lead essay and a future "yard notes" recurring format.

---

## Yard capacity tracker — second data product

Built on a new feed (not the project archive). Sources:
- Publicly announced yard capacity additions
- Slot availability scraped from yard websites or asked of yards directly
- Published refit and new build slot bookings (BOAT International order book)

Refresh cadence: quarterly. Lives behind a future `/intelligence/yard-capacity` route, not in the chapter narrative.

---

## Implementation notes (not part of the schema)

- The TypeScript types above are the canonical schema. Implement under `lib/intelligence/schema.ts` once approved.
- The 30-project archive should be entered against the schema in a private repo or Foreland-internal store, not in the public firstownersreference.com codebase. The published edition pulls aggregate-only summaries.
- Anonymisation level is a runtime check before any record contributes to a published chart or table.
- The named-firm review log is a separate ledger; suggest a simple `docs/firm-review-log.md` initially.
