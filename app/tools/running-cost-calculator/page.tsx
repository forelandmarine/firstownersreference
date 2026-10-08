"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/* ------------------------------------------------------------------ */
/*  Inline editorial UI                                                */
/* ------------------------------------------------------------------ */

function HorizonLine() {
  return <div aria-hidden="true" className="w-full h-px bg-rule" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="meta-marine mb-3">{children}</p>;
}

function ButtonPrimary({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls =
    "inline-flex items-center justify-center border border-charcoal hover:border-marine hover:text-marine font-serif text-base px-6 py-3 transition-colors";
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type YachtType = "sailing" | "motor";
type Currency = "EUR" | "USD" | "GBP";
type CruisingArea =
  | "west_med"
  | "east_med"
  | "caribbean"
  | "us_east_coast"
  | "southeast_asia"
  | "northern_europe"
  | "arabian_gulf"
  | "south_pacific"
  | "global";
type UseType = "private" | "charter";
type SeasonType = "single" | "dual";
type UsageIntensity = "light" | "moderate" | "heavy";
type AgeBand = "new" | "established" | "older";

interface SubItem {
  label: string;
  amount: number;
}

interface CostBreakdown {
  crew: number;
  insurance: number;
  maintenance: number;
  berths: number;
  fuel: number;
  management: number;
  regulatory: number;
  contingency: number;
  total: number;
  detail: Record<string, SubItem[]>;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const currencyRates: Record<Currency, number> = {
  EUR: 1,
  USD: 1.16,
  GBP: 0.86,
};

const currencyLocales: Record<Currency, string> = {
  EUR: "en-GB",
  USD: "en-US",
  GBP: "en-GB",
};

function fmt(n: number, currency: Currency = "EUR"): string {
  const converted = n * currencyRates[currency];
  return new Intl.NumberFormat(currencyLocales[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(converted);
}

/* ------------------------------------------------------------------ */
/*  TSR OpEx Survey calibration                                        */
/*  The Superyacht Report OpEx Survey, Q2 2026: distribution of        */
/*  annual operating budgets across 28-83m captain-led responses.      */
/* ------------------------------------------------------------------ */

interface TsrBand {
  label: string;
  share: number;
  lowerEUR: number;
  upperEUR: number;
}

const tsrBands: TsrBand[] = [
  { label: "Under €/$2m", share: 38, lowerEUR: 0, upperEUR: 2_000_000 },
  { label: "€/$2 to 4m", share: 23, lowerEUR: 2_000_000, upperEUR: 4_000_000 },
  { label: "€/$4 to 6m", share: 31, lowerEUR: 4_000_000, upperEUR: 6_000_000 },
  { label: "€/$6 to 10m", share: 8, lowerEUR: 6_000_000, upperEUR: 10_000_000 },
];

function tsrBandFor(totalEUR: number): TsrBand {
  for (const b of tsrBands) {
    if (totalEUR < b.upperEUR) return b;
  }
  return tsrBands[tsrBands.length - 1];
}

/* ------------------------------------------------------------------ */
/*  Cost model                                                         */
/*  Calibrated against the Christie Yachts annual budget table for     */
/*  motor yachts of 30 to 100 metres (tonnage, crew, season).          */
/*  Crew numbers and pay are set at each size point; other lines scale */
/*  on a size curve that rises faster than length above 55 metres.     */
/* ------------------------------------------------------------------ */

const sizePoints = [24, 30, 37, 45, 50, 55, 60, 70, 80, 90, 100];

function bySize(length: number, values: number[]) {
  if (length <= sizePoints[0]) return values[0];
  for (let i = 1; i < sizePoints.length; i++) {
    if (length <= sizePoints[i]) {
      const f = (length - sizePoints[i - 1]) / (sizePoints[i] - sizePoints[i - 1]);
      return lerp(values[i - 1], values[i], f);
    }
  }
  return values[values.length - 1];
}

function calculateCosts(
  length: number,
  yachtType: YachtType,
  area: CruisingArea,
  usage: UsageIntensity,
  useType: UseType,
  season: SeasonType,
  age: AgeBand,
): CostBreakdown {
  // Size curve: 0 at 24 m, 1 at 60 m, extended to 100 m
  const t = bySize(length, [0, 0.1, 0.25, 0.45, 0.6, 0.85, 1.1, 1.65, 1.85, 2.1, 2.45]);
  const tc = Math.min(t, 1); // per-head items that stop growing past 60 m
  const isCharter = useType === "charter";
  const isDual = season === "dual";
  const isSail = yachtType === "sailing";
  const charterAdj = (base: number, mult: number) => base * (isCharter ? mult : 1.0);
  const ageMaint = age === "new" ? 0.8 : age === "older" ? 1.35 : 1.0;
  const ageValue = age === "new" ? 1.0 : age === "older" ? 0.55 : 0.75;
  const ageRate = age === "new" ? 0.9 : age === "older" ? 1.3 : 1.0;

  // --- Crew ---
  const crewCount = Math.round(
    bySize(
      length,
      isSail
        ? [4, 4, 5, 7, 8, 9, 10, 13, 16, 19, 22]
        : [4, 5, 7, 10, 11, 13, 14, 19, 23, 28, 33],
    ),
  );
  const payPerHead = bySize(length, [52_000, 56_000, 60_000, 64_000, 67_000, 71_000, 76_000, 82_000, 82_000, 80_000, 80_000]);
  const salaries = crewCount * payPerHead;
  const rotation = isDual ? salaries * 0.15 : 0; // rotational cover across two seasons
  const socialCharges = (salaries + rotation) * 0.18;
  const crewInsurance = crewCount * lerp(1_800, 2_500, tc);
  const travelBase = crewCount * lerp(2_500, 4_000, tc);
  const travel = isDual ? travelBase * 1.6 : travelBase; // more flights between seasons
  const training = crewCount * lerp(1_500, 3_000, tc);
  const uniforms = crewCount * lerp(400, 800, tc);
  const provisions = crewCount * lerp(5_000, 8_000, tc);
  const usageMult = usage === "heavy" ? 1.15 : usage === "moderate" ? 1.05 : 1.0;
  const crewSub = [salaries, rotation, socialCharges, crewInsurance, travel, training, uniforms, provisions];
  const crewRaw = crewSub.reduce((a, b) => a + b, 0) * usageMult;
  const crew = charterAdj(crewRaw, 1.25);

  // --- Insurance ---
  const gt = bySize(length, [100, 200, 300, 400, 500, 750, 900, 1_700, 2_300, 3_000, 3_750]);
  const valueMotor =
    bySize(length, [4_000_000, 9_000_000, 16_000_000, 26_000_000, 34_000_000, 45_000_000, 58_000_000, 90_000_000, 125_000_000, 170_000_000, 220_000_000]) *
    ageValue;
  const value = isSail ? valueMotor * 0.85 : valueMotor;
  const areaInsuranceMult: Record<CruisingArea, number> = {
    west_med: 1.0, east_med: 1.05, caribbean: 1.15, us_east_coast: 1.1,
    southeast_asia: 1.1, northern_europe: 0.95, arabian_gulf: 1.05,
    south_pacific: 1.15, global: 1.25,
  };
  const areaMult = areaInsuranceMult[area];
  const hullRate = isSail ? 0.005 : 0.006;
  const hull = value * hullRate * ageRate * areaMult * (isDual ? 1.15 : 1.0); // wider cruising range
  const pandi = (4_000 + gt * 14) * areaMult * (isDual ? 1.1 : 1.0); // P&I priced on tonnage, not value
  const crewMedical = crewCount * 1_800;
  const warRisk = area === "arabian_gulf" || area === "global" ? value * 0.0005 : 0;
  const insuranceRaw = hull + pandi + crewMedical + warRisk;
  const insurance = charterAdj(insuranceRaw, 1.4);

  // --- Maintenance ---
  const engineService = isSail ? lerp(20_000, 80_000, t) : lerp(35_000, 200_000, t);
  const hullAntifoul = lerp(15_000, 90_000, t);
  const rig = isSail ? lerp(25_000, 120_000, t) : 0;
  const sailInventory = isSail ? lerp(12_000, 80_000, t) : 0;
  const deckHardware = lerp(8_000, 50_000, t);
  const electronics = lerp(6_000, 35_000, t);
  const interiorUpkeep = lerp(8_000, 45_000, t);
  const classReserve = lerp(15_000, 80_000, t);
  const renewalReserve = age === "older" ? lerp(40_000, 300_000, t) : 0; // repaint, equipment renewal
  const maintItems = [engineService, hullAntifoul, rig, sailInventory, deckHardware, electronics, interiorUpkeep, classReserve];
  const maintRaw = maintItems.reduce((a, b) => a + b, 0) * ageMaint + renewalReserve;
  const maintenance = charterAdj(maintRaw, 1.2);

  // --- Berths ---
  const berthMultiplier: Record<CruisingArea, number> = {
    west_med: 1.0, east_med: 0.8, caribbean: 0.7, us_east_coast: 0.9,
    southeast_asia: 0.5, northern_europe: 0.6, arabian_gulf: 0.75,
    south_pacific: 0.55, global: 0.85,
  };
  const homeBerth = lerp(45_000, 280_000, t) * berthMultiplier[area];
  const secondBerth = isDual ? lerp(30_000, 150_000, t) * 0.7 : 0; // winter season berth
  const transitBerths = lerp(12_000, 60_000, t) * berthMultiplier[area] * (isDual ? 1.4 : 1.0);
  const launchHaulout = lerp(5_000, 20_000, t);
  const berths = homeBerth + secondBerth + transitBerths + launchHaulout;

  // --- Fuel & consumables ---
  const fuelOnly = isSail ? lerp(12_000, 60_000, t) : lerp(40_000, 280_000, t);
  const deliveryFuel = isDual
    ? (isSail ? lerp(8_000, 25_000, t) : lerp(20_000, 80_000, t))
    : 0; // transatlantic or long-distance passage fuel
  const lubricants = (fuelOnly + deliveryFuel) * 0.06;
  const waterTreatment = lerp(2_000, 8_000, t);
  const stores = lerp(6_000, 30_000, t);
  const fuelUsageMult = usage === "heavy" ? 1.5 : usage === "moderate" ? 1.0 : 0.7;
  const fuelRaw = (fuelOnly + deliveryFuel + lubricants + waterTreatment + stores) * fuelUsageMult;
  const fuel = charterAdj(fuelRaw, 1.3);

  // --- Management ---
  const baseFee = lerp(3_000, 8_000, t) * 12;
  const accounting = lerp(6_000, 18_000, t);
  const charterAdmin = isCharter ? baseFee * 0.35 : 0;
  const management = baseFee + accounting + charterAdmin;

  // --- Regulatory ---
  const flagState = lerp(3_000, 12_000, t);
  const classSurvey = lerp(5_000, 18_000, t);
  const radioLicensing = lerp(500, 2_000, tc);
  const ismCompliance = isCharter ? lerp(4_000, 15_000, t) : lerp(2_000, 8_000, t);
  const yachtCode = isCharter ? lerp(3_000, 10_000, t) : 0;
  const regulatory = flagState + classSurvey + radioLicensing + ismCompliance + yachtCode;

  // --- Delivery (dual season only) ---
  const deliveryCrew = isDual ? lerp(8_000, 25_000, t) : 0; // delivery skipper + crew costs
  const agentFees = isDual ? lerp(3_000, 10_000, t) : 0; // port agents at each end
  const crewWithDelivery = crew + deliveryCrew + agentFees;

  // --- Detail maps ---
  const charterScale = (items: SubItem[], mult: number): SubItem[] => {
    if (!isCharter) return items;
    const raw = items.reduce((a, b) => a + b.amount, 0);
    return [...items, { label: "Charter uplift", amount: raw * mult - raw }];
  };

  const usageScale = (items: SubItem[], mult: number): SubItem[] => {
    if (mult === 1.0) return items;
    const raw = items.reduce((a, b) => a + b.amount, 0);
    const usageLabel = usage === "heavy" ? "Heavy use adjustment" : "Moderate use adjustment";
    return [...items, { label: usageLabel, amount: raw * mult - raw }];
  };

  const ageScale = (items: SubItem[]): SubItem[] => {
    if (ageMaint === 1.0) return items;
    const raw = items.reduce((a, b) => a + b.amount, 0);
    const ageLabel = age === "new" ? "Warranty period saving" : "Age adjustment";
    return [...items, { label: ageLabel, amount: raw * ageMaint - raw }];
  };

  const detail: Record<string, SubItem[]> = {
    crew: charterScale(usageScale([
      { label: `Salaries (${crewCount} crew)`, amount: salaries },
      ...(isDual ? [{ label: "Rotational crew cover", amount: rotation }] : []),
      { label: "Social charges & tax", amount: socialCharges },
      { label: "Crew insurance", amount: crewInsurance },
      { label: "Travel & repatriation", amount: travel },
      { label: "Training & certs", amount: training },
      { label: "Uniforms", amount: uniforms },
      { label: "Provisions", amount: provisions },
    ], usageMult), 1.25).concat(
      isDual
        ? [
            { label: "Delivery crew", amount: deliveryCrew },
            { label: "Port agent fees", amount: agentFees },
          ]
        : [],
    ),
    insurance: charterScale([
      { label: "Hull & machinery", amount: hull },
      { label: "P&I cover", amount: pandi },
      { label: "Crew medical", amount: crewMedical },
      ...(warRisk > 0 ? [{ label: "War risk", amount: warRisk }] : []),
    ], 1.4),
    maintenance: charterScale([
      ...ageScale([
        { label: "Engine & generator service", amount: engineService },
        { label: "Hull, antifoul & paint", amount: hullAntifoul },
        ...(isSail ? [{ label: "Rig inspection & maintenance", amount: rig }] : []),
        ...(isSail ? [{ label: "Sail inventory", amount: sailInventory }] : []),
        { label: "Deck hardware", amount: deckHardware },
        { label: "Electronics & nav", amount: electronics },
        { label: "Interior upkeep", amount: interiorUpkeep },
        { label: "Class survey reserve", amount: classReserve },
      ]),
      ...(renewalReserve > 0
        ? [{ label: "Repaint & equipment renewal reserve", amount: renewalReserve }]
        : []),
    ], 1.2),
    berths: [
      { label: "Annual home berth", amount: homeBerth },
      ...(isDual ? [{ label: "Second season berth", amount: secondBerth }] : []),
      { label: "Transit & visitor berths", amount: transitBerths },
      { label: "Launch & haulout", amount: launchHaulout },
    ],
    fuel: charterScale(usageScale([
      { label: "Fuel", amount: fuelOnly },
      ...(isDual ? [{ label: "Delivery passage fuel", amount: deliveryFuel }] : []),
      { label: "Lubricants", amount: lubricants },
      { label: "Water treatment", amount: waterTreatment },
      { label: "General stores", amount: stores },
    ], fuelUsageMult), 1.3),
    management: [
      { label: "Management fee", amount: baseFee },
      { label: "Accounting & payroll", amount: accounting },
      ...(isCharter ? [{ label: "Charter administration", amount: charterAdmin }] : []),
    ],
    regulatory: [
      { label: "Flag state fees", amount: flagState },
      { label: "Class society surveys", amount: classSurvey },
      { label: "Radio licensing", amount: radioLicensing },
      { label: "ISM / SMS compliance", amount: ismCompliance },
      ...(isCharter ? [{ label: "Yacht code (REG Yacht Code/PYC)", amount: yachtCode }] : []),
    ],
    contingency: [],
  };

  // Subtotal and contingency
  const subtotal = crewWithDelivery + insurance + maintenance + berths + fuel + management + regulatory;
  const contingency = subtotal * 0.08;
  const total = subtotal + contingency;

  return { crew: crewWithDelivery, insurance, maintenance, berths, fuel, management, regulatory, contingency, total, detail };
}

/* ------------------------------------------------------------------ */
/*  Small UI pieces                                                    */
/* ------------------------------------------------------------------ */

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-4 py-3 font-serif text-sm transition-colors duration-150 ${
            value === o.value
              ? "bg-marine text-paper border border-marine"
              : "text-charcoal-soft border border-rule hover:text-marine hover:border-marine"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CostRow({
  label,
  amount,
  total,
  currency,
  detail,
}: {
  label: string;
  amount: number;
  total: number;
  currency: Currency;
  detail?: SubItem[];
}) {
  const [open, setOpen] = useState(false);
  const pct = (amount / total) * 100;
  const hasDetail = detail && detail.length > 0;

  const Header = (
    <div className="flex justify-between items-baseline mb-1.5">
      <span
        className={`font-serif text-sm ${
          open ? "text-charcoal" : "text-charcoal-soft"
        } transition-colors`}
      >
        {label}
        {hasDetail && (
          <span
            className={`ml-1.5 meta ${
              open ? "text-marine" : "text-stone"
            } transition-colors`}
            aria-hidden="true"
          >
            {open ? "\u2212" : "+"}
          </span>
        )}
      </span>
      <div className="flex items-baseline gap-3">
        <span
          className="meta text-stone"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {pct.toFixed(0)}%
        </span>
        <span
          className="font-mono text-sm text-charcoal"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {fmt(amount, currency)}
        </span>
      </div>
    </div>
  );

  const Bar = (
    <div className="w-full h-1.5 bg-rule overflow-hidden">
      <div
        className="h-full bg-marine transition-all duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );

  const Detail = open && hasDetail && (
    <div className="mt-3 mb-1 ml-1 pl-3 border-l border-rule space-y-1.5">
      {detail.map((sub) => (
        <div
          key={sub.label}
          className="flex justify-between items-baseline"
        >
          <span className="caption">{sub.label}</span>
          <span
            className="font-mono text-xs text-charcoal-soft"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {fmt(sub.amount, currency)}
          </span>
        </div>
      ))}
    </div>
  );

  if (!hasDetail) {
    return (
      <div>
        {Header}
        {Bar}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="block w-full text-left cursor-pointer"
      >
        {Header}
        {Bar}
      </button>
      {Detail}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const areaLabels: Record<CruisingArea, string> = {
  west_med: "Western Mediterranean",
  east_med: "Eastern Mediterranean",
  caribbean: "Caribbean",
  us_east_coast: "US East Coast",
  southeast_asia: "Southeast Asia",
  northern_europe: "Northern Europe",
  arabian_gulf: "Arabian Gulf",
  south_pacific: "South Pacific",
  global: "Global",
};

export default function RunningCostCalculatorPage() {
  const [length, setLength] = useState(35);
  const [yachtType, setYachtType] = useState<YachtType>("motor");
  const [area, setArea] = useState<CruisingArea>("west_med");
  const [useType, setUseType] = useState<UseType>("private");
  const [season, setSeason] = useState<SeasonType>("single");
  const [usage, setUsage] = useState<UsageIntensity>("moderate");
  const [age, setAge] = useState<AgeBand>("established");
  const [currency, setCurrency] = useState<Currency>("EUR");

  const costs = calculateCosts(length, yachtType, area, usage, useType, season, age);

  const breakdown = [
    { label: "Crew", amount: costs.crew, key: "crew" },
    { label: "Insurance", amount: costs.insurance, key: "insurance" },
    { label: "Maintenance & Repair", amount: costs.maintenance, key: "maintenance" },
    { label: "Berths & Marina Fees", amount: costs.berths, key: "berths" },
    { label: "Fuel & Consumables", amount: costs.fuel, key: "fuel" },
    { label: "Management Fees", amount: costs.management, key: "management" },
    { label: "Regulatory & Compliance", amount: costs.regulatory, key: "regulatory" },
    { label: "Contingency (8%)", amount: costs.contingency, key: "contingency" },
  ];

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLength(Number(e.target.value));
    },
    []
  );

  const faqData = [
    {
      question: "Can I afford to run the yacht I am looking at?",
      answer:
        "Annual running costs run from approximately EUR 600,000 for a 24-metre sailing yacht at light use, to EUR 2.3 to 2.8 million for a 50-metre motor yacht at moderate use, to EUR 7 to 8 million for an 80-metre running two seasons a year. The main cost categories are crew (40 to 50 percent of the total), insurance, maintenance, marina berths, fuel, management fees, and regulatory compliance. As a rough guide, expect 12 to 15 percent of purchase price for a new 40 to 50 metre yacht at moderate use, rising to 12 to 20 percent for older or larger vessels and higher again on charter-active programmes. The actual figure depends heavily on vessel type, size, cruising area, age, and use intensity.",
    },
    {
      question: "Is the 10 percent rule a safe budget for a first purchase?",
      answer:
        "The 10% rule is industry shorthand for budgeting roughly 10 percent of the yacht's purchase price each year for running costs. The rule has no traceable origin and is roughly correct only for new, mid-sized, lightly used yachts. Independent practitioner ranges cluster between 8 and 15 percent for the first decade; for yachts over 40 metres, older than seven years, or operating charter, the empirical band runs 12 to 20 percent. The rule is a starting point, not a budget.",
    },
    {
      question: "What should a first-time buyer budget beyond the purchase price?",
      answer:
        "Crew costs are almost always the largest single expense, typically 40 to 50 percent of the annual budget. After crew, the next largest costs are maintenance and repair (including class surveys and periodic refits), insurance (hull, P&I, and crew medical), and marina berths. Fuel costs vary dramatically between sailing and motor yachts. Management fees, regulatory compliance, and a contingency reserve of 8-10% should also be budgeted.",
    },
    {
      question: "How many crew will the yacht need, and what will they cost?",
      answer:
        "Crew costs depend on yacht size and the number of crew required. A 30-metre yacht with 5-7 crew might spend EUR 300,000-450,000 per year on total crew costs. A 50-metre yacht with 11 to 13 crew could spend EUR 1.1 to 1.4 million, more on a dual-season programme with rotational crew. These figures include salaries, social charges, insurance, travel, training, uniforms, and provisions.",
    },
    {
      question: "Will a sailing yacht cost less to run than a motor yacht?",
      answer:
        "Sailing yachts are generally less expensive to run than motor yachts of equivalent size. The main saving is fuel. However, sailing yachts have costs that motor yachts do not, including rig maintenance, sail inventory, and specialist rigging inspections. Overall, a sailing yacht's annual running costs are typically 15-25% lower than a comparable motor yacht.",
    },
    {
      question: "What will insurance cost on a first yacht?",
      answer:
        "Insurance costs depend on the yacht's value, type, age, cruising area, and claims history. Hull and machinery cover typically costs 0.5 to 1 percent of the yacht's insured value per year, at the upper end for older yachts and wider cruising grounds. P&I (Protection and Indemnity) cover is priced on tonnage, crew numbers and trading area rather than on value. Charter yachts require commercial insurance, which can be 30-40% more expensive than private cover.",
    },
  ];

  return (
    <>
      <SiteHeader />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Superyacht Running Cost Calculator",
            url: "https://firstownersreference.com/tools/running-cost-calculator",
            description:
              "Interactive calculator that estimates annual superyacht running costs by crew, insurance, maintenance, berths, fuel, management, and compliance.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
            },
            author: {
              "@type": "Organization",
              name: "Foreland Marine Consultancy",
              url: "https://forelandmarine.com",
            },
            publisher: {
              "@type": "Periodical",
              name: "The First Owner\u2019s Reference",
              url: "https://firstownersreference.com",
            },
          }),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-rule">
        <div className="absolute inset-0">
          <Image
            src="/images/calculator-hero.jpg"
            alt="Superyacht berthed in a Mediterranean marina"
            fill
            sizes="100vw"
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/80" />
        </div>
        <div className="relative z-10 max-w-[80rem] mx-auto px-6 lg:px-12 py-24 lg:py-32 text-paper">
          <h1 className="font-serif font-light text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] tracking-tight max-w-3xl mb-8">
            What will the yacht cost
            <br />
            you each year?
          </h1>
          <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed text-paper/85 max-w-2xl">
            Crew, insurance, maintenance, berths, fuel, management and
            compliance continue for as long as you own the yacht. The
            calculator below estimates each of them for the yacht you are
            considering, using the sources listed at the foot of the page.
          </p>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* INPUTS */}
            <div className="bg-paper-deep border border-rule p-6 sm:p-8 space-y-8">
              <div>
                <SectionLabel>Your yacht</SectionLabel>
                <h2 className="font-serif font-light text-2xl sm:text-3xl tracking-tight text-charcoal">
                  Configure the basics.
                </h2>
              </div>

              {/* Length slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="meta">Yacht length</label>
                  <span
                    className="font-serif text-lg text-charcoal"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {length} m
                  </span>
                </div>
                <input
                  type="range"
                  min={24}
                  max={100}
                  step={1}
                  value={length}
                  onChange={handleSlider}
                  className="w-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--color-marine) ${
                      ((length - 24) / 76) * 100
                    }%, var(--color-rule) ${
                      ((length - 24) / 76) * 100
                    }%)`,
                    height: "4px",
                    borderRadius: "2px",
                    WebkitAppearance: "none",
                    accentColor: "var(--color-marine)",
                  }}
                />
                <div className="flex justify-between meta">
                  <span>24 m</span>
                  <span>100 m</span>
                </div>
              </div>

              {/* Yacht type */}
              <div className="space-y-2.5">
                <label className="meta block">Yacht type</label>
                <ToggleGroup
                  options={[
                    { value: "sailing" as YachtType, label: "Sailing" },
                    { value: "motor" as YachtType, label: "Motor" },
                  ]}
                  value={yachtType}
                  onChange={setYachtType}
                />
              </div>

              {/* Use type */}
              <div className="space-y-2.5">
                <label className="meta block">Use</label>
                <ToggleGroup
                  options={[
                    { value: "private" as UseType, label: "Private" },
                    { value: "charter" as UseType, label: "Charter" },
                  ]}
                  value={useType}
                  onChange={setUseType}
                />
                {useType === "charter" && (
                  <p className="caption pt-1">
                    Charter yachts require commercial insurance, larger crews,
                    REG Yacht Code/PYC compliance, and dedicated charter management.
                  </p>
                )}
              </div>

              {/* Currency */}
              <div className="space-y-2.5">
                <label className="meta block">Currency</label>
                <ToggleGroup
                  options={[
                    { value: "EUR" as Currency, label: "EUR" },
                    { value: "USD" as Currency, label: "USD" },
                    { value: "GBP" as Currency, label: "GBP" },
                  ]}
                  value={currency}
                  onChange={setCurrency}
                />
              </div>

              {/* Cruising area */}
              <div className="space-y-2.5">
                <label className="meta block">Primary operating area</label>
                <ToggleGroup
                  options={[
                    { value: "west_med" as CruisingArea, label: "West Med" },
                    { value: "east_med" as CruisingArea, label: "East Med" },
                    { value: "caribbean" as CruisingArea, label: "Caribbean" },
                    { value: "us_east_coast" as CruisingArea, label: "US East Coast" },
                    { value: "southeast_asia" as CruisingArea, label: "SE Asia" },
                    { value: "northern_europe" as CruisingArea, label: "Northern Europe" },
                    { value: "arabian_gulf" as CruisingArea, label: "Arabian Gulf" },
                    { value: "south_pacific" as CruisingArea, label: "South Pacific" },
                    { value: "global" as CruisingArea, label: "Global" },
                  ]}
                  value={area}
                  onChange={setArea}
                />
              </div>

              {/* Season */}
              <div className="space-y-2.5">
                <label className="meta block">Season</label>
                <ToggleGroup
                  options={[
                    { value: "single" as SeasonType, label: "Single season" },
                    { value: "dual" as SeasonType, label: "Dual season" },
                  ]}
                  value={season}
                  onChange={setSeason}
                />
                {season === "dual" && (
                  <p className="caption pt-1">
                    Dual season (e.g. Med summer, Caribbean winter) adds
                    delivery passage costs, a second berth, additional crew
                    travel, and wider-range insurance cover.
                  </p>
                )}
              </div>

              {/* Usage intensity */}
              <div className="space-y-2.5">
                <label className="meta block">Usage intensity</label>
                <ToggleGroup
                  options={[
                    { value: "light" as UsageIntensity, label: "Light (under 6 wks)" },
                    { value: "moderate" as UsageIntensity, label: "Moderate (6-12 wks)" },
                    { value: "heavy" as UsageIntensity, label: "Heavy (12+ wks)" },
                  ]}
                  value={usage}
                  onChange={setUsage}
                />
                <p className="caption pt-1">
                  The Superyacht Report OpEx Survey, Q2 2026, places average
                  owner time aboard private yachts at 17 weeks per year. The
                  vessel, crew, and cost structure run for all 52.
                </p>
              </div>

              {/* Age */}
              <div className="space-y-2.5">
                <label className="meta block">Age</label>
                <ToggleGroup
                  options={[
                    { value: "new" as AgeBand, label: "Under 5 yrs" },
                    { value: "established" as AgeBand, label: "5 to 15 yrs" },
                    { value: "older" as AgeBand, label: "Over 15 yrs" },
                  ]}
                  value={age}
                  onChange={setAge}
                />
                <p className="caption pt-1">
                  Running costs do not fall with market value. Older yachts
                  carry repaints, equipment renewal and major class surveys,
                  so the budget rises as the yacht ages.
                </p>
              </div>
            </div>

            {/* RESULTS */}
            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              {/* Total card */}
              <div className="bg-paper-deep border border-rule p-6 sm:p-8">
                <p className="meta-marine mb-3">Estimated annual cost</p>
                <p
                  className="font-serif font-light text-4xl sm:text-5xl tracking-tight text-charcoal"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {fmt(costs.total, currency)}
                </p>
                <p className="caption mt-3">
                  {length} m{" "}
                  {yachtType === "motor" ? "motor yacht" : "sailing yacht"},{" "}
                  {useType === "charter" ? "charter" : "private"},{" "}
                  {season === "dual" ? "dual season" : "single season"},{" "}
                  {areaLabels[area]}, {usage} use,{" "}
                  {age === "new" ? "under 5 years old" : age === "older" ? "over 15 years old" : "5 to 15 years old"}
                </p>
              </div>

              {/* Breakdown */}
              <div className="bg-paper-deep border border-rule p-6 sm:p-8 space-y-4">
                <p className="meta-marine mb-2">Cost breakdown</p>
                {breakdown.map((item) => (
                  <CostRow
                    key={item.label}
                    label={item.label}
                    amount={item.amount}
                    total={costs.total}
                    currency={currency}
                    detail={costs.detail[item.key]}
                  />
                ))}
                <div className="pt-3 border-t border-charcoal flex justify-between items-baseline">
                  <span className="font-serif text-base text-charcoal">Total</span>
                  <span
                    className="font-mono text-base text-charcoal"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {fmt(costs.total, currency)}
                  </span>
                </div>
              </div>

              {/* Reality check against TSR OpEx Survey */}
              <div className="bg-paper-deep border border-rule p-6 sm:p-8 space-y-4">
                <p className="meta-marine mb-2">Where this sits in the surveyed fleet</p>
                <p className="caption">
                  The Superyacht Report OpEx Survey, Q2 2026, captures annual
                  operating budgets across the 28 to 83 metre captain-led
                  fleet. Your modelled total sits in the {tsrBandFor(costs.total).label} band, where {tsrBandFor(costs.total).share}% of surveyed yachts report.
                </p>
                <div className="space-y-2">
                  {tsrBands.map((b) => {
                    const active = b === tsrBandFor(costs.total);
                    return (
                      <div key={b.label} className="flex items-baseline gap-3">
                        <span
                          className={`font-serif text-xs w-24 shrink-0 ${
                            active ? "text-marine" : "text-stone"
                          }`}
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {b.label}
                        </span>
                        <div className="flex-1 h-1.5 bg-rule overflow-hidden">
                          <div
                            className={`h-full ${
                              active ? "bg-marine" : "bg-stone/40"
                            }`}
                            style={{ width: `${b.share * 2}%` }}
                          />
                        </div>
                        <span
                          className={`font-mono text-xs w-10 text-right ${
                            active ? "text-marine" : "text-stone"
                          }`}
                          style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                          {b.share}%
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="caption text-stone">
                  Survey covers 28 to 83 metre yachts; results outside that
                  range are extrapolated from the model.
                </p>
              </div>

              {/* Disclaimer + CTA */}
              <div className="bg-paper-deep border border-rule p-6 sm:p-8">
                <p className="caption mb-5">
                  These are indicative estimates against named source
                  assumptions. Every yacht is different. For a tailored
                  budget, write to Foreland Marine, the consultancy that
                  publishes The First Owner’s Reference.
                </p>
                <ButtonPrimary
                  href="https://forelandmarine.com/contact"
                  external
                >
                  Speak with Foreland Marine
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* EDITORIAL SECTION */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionLabel>Understanding the numbers</SectionLabel>
          <h2 className="font-serif font-light text-headline tracking-tight mb-8 text-charcoal">
            What the annual figure is actually made of
          </h2>

          <div className="prose-body text-charcoal-soft">
            <p>
              Crew is almost always the single largest line item in your
              annual budget. A 40 m motor yacht might carry a crew of seven
              or eight, each with salary, insurance, travel, and training
              costs. As the yacht grows, crew numbers increase and so do the
              qualifications required. A captain on a 60 m vessel commands a
              very different salary to one on a 24 m sailing yacht.
            </p>

            <p>
              Insurance and maintenance are the two categories that catch
              first-time owners off guard. Hull and P&amp;I premiums are
              driven by yacht value, cruising range, and claims history.
              Maintenance is not optional. Even a well-built yacht needs
              continuous attention, and deferred maintenance always costs
              more in the long run.
            </p>

            <p>
              Fuel costs vary dramatically between sailing and motor yachts.
              A 50 m motor yacht burning 300 litres per hour at cruising
              speed will spend more on fuel in a single Mediterranean season
              than a similar-sized sailing yacht spends in a year. Usage
              intensity matters too.
            </p>

            <p>
              The best way to avoid budget surprises is to work with an
              experienced management company that provides transparent
              monthly reporting. A good manager will not just pay the bills.
              They will help plan ahead, negotiate contracts, and make
              informed decisions about where to spend and where to save.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            <p className="meta mb-2">Read alongside</p>
            {[
              {
                href: "/01-reality-of-ownership",
                label: "Chapter 01 \u00b7 The reality of ownership",
              },
              {
                href: "/06-refit",
                label: "Chapter 06 \u00b7 Refit",
              },
              {
                href: "/07-operations",
                label: "Chapter 07 \u00b7 Operations",
              },
              {
                href: "/04-acquisition-process",
                label: "Chapter 04 \u00b7 The acquisition process",
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block font-serif text-base text-charcoal-soft hover:text-marine transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HorizonLine />

      {/* FAQ SECTION */}
      <section className="bg-paper-deep py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionLabel>Frequently asked questions</SectionLabel>
          <details className="group">
            <summary className="flex items-center justify-between gap-6 mb-2">
              <h2 className="font-serif font-light text-headline tracking-tight text-charcoal group-hover:text-marine transition-colors">
                Questions first-time buyers ask
              </h2>
              <svg
                className="shrink-0 w-6 h-6 text-stone transition-transform group-open:rotate-180"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path
                  d="M3 6 L8 11 L13 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <p className="meta mt-2 mb-10">{faqData.length} questions</p>
            <div className="space-y-8">
              {faqData.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-serif text-lg text-charcoal mb-3">
                    {faq.question}
                  </h3>
                  <p className="caption leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
            <p className="meta mt-10">
              Last updated October 2026. Figures based on current market data and
              Foreland Marine operational experience.
            </p>
          </details>
        </div>
      </section>

      <HorizonLine />

      {/* SOURCES */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionLabel>Sources</SectionLabel>
          <h2 className="font-serif font-light text-headline tracking-tight mb-6 text-charcoal">
            The sources behind the model
          </h2>
          <p className="prose-body text-charcoal-soft mb-8">
            The cost model behind this calculator is based on published
            industry data, supplemented by Foreland Marine&rsquo;s direct
            experience managing yachts in the 24 to 60 metre range. Crew
            numbers and total budgets from 30 to 100 metres are calibrated
            against the annual budget table published by Christie Yachts.
          </p>
          <ul className="space-y-4">
            {[
              {
                title: "Quay Crew Superyacht Captain Salary & Leave Report 2025/26",
                detail:
                  "Captain, officer, and crew salary ranges by vessel size and type.",
                href: "https://quaygroup.com/blog/superyacht-captain-salary-leave-report-2025-26/",
              },
              {
                title: "YPI Crew Yacht Crew Salary Guide 2026",
                detail: "Senior and junior crew pay bands.",
                href: "https://www.ypicrew.com/yacht-crew-salary-guide",
              },
              {
                title: "Christie Yachts, What it really costs to run a superyacht",
                detail:
                  "Indicative annual budgets for motor yachts of 30 to 100 metres by tonnage, crew and season, and the effect of age on running costs.",
                href: "https://christieyachts.com/insights/what-it-really-costs-to-run-a-superyacht/",
              },
              {
                title: "Pantaenius Yacht Insurance",
                detail:
                  "Hull and machinery insurance rates, P&I cover premiums, and regional risk factors.",
                href: "https://www.pantaenius.com",
              },
              {
                title: "MYBA Charter Market practice",
                detail:
                  "Charter fleet operating costs, commercial insurance premium ranges, and crew benchmarks.",
              },
              {
                title: "The Superyacht Report OpEx Survey, Q2 2026",
                detail:
                  "Captain-led survey across the 28-83 metre fleet: annual operating budget distribution, owner time aboard, yard weeks, and per-charter-week spend.",
                href: "https://www.superyachtnews.com/reports/thesuperyachtreport",
              },
              {
                title: "Red Ensign Group Yacht Code (July 2024 edition)",
                detail:
                  "Commercial compliance survey costs, manning requirements, and flag-state fee schedules.",
                href: "https://www.redensigngroup.org/latest/news/revised-red-ensign-group-yacht-code-published/",
              },
              {
                title: "Foreland Marine operational data",
                detail:
                  "Real-world budget data from yachts under our management, anonymised and aggregated.",
              },
            ].map((source) => (
              <li
                key={source.title}
                className="border-l border-rule pl-4 py-1"
              >
                {source.href ? (
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-base text-charcoal hover:text-marine transition-colors"
                  >
                    {source.title}
                    <span className="meta text-stone ml-1.5">
                      {"\u2197"}
                    </span>
                  </a>
                ) : (
                  <p className="font-serif text-base text-charcoal">
                    {source.title}
                  </p>
                )}
                <p className="caption">{source.detail}</p>
              </li>
            ))}
          </ul>
          <p className="meta mt-8 leading-relaxed max-w-prose">
            Regional multipliers and charter adjustments are derived from a
            combination of these sources and internal benchmarks. Verify
            against current market conditions before making financial
            decisions.
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
