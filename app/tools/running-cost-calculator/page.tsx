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
  USD: 1.09,
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
/*  Cost model                                                         */
/* ------------------------------------------------------------------ */

function calculateCosts(
  length: number,
  yachtType: YachtType,
  area: CruisingArea,
  usage: UsageIntensity,
  useType: UseType,
  season: SeasonType,
): CostBreakdown {
  const t = (length - 24) / (60 - 24);
  const isCharter = useType === "charter";
  const isDual = season === "dual";
  const isSail = yachtType === "sailing";
  const charterAdj = (base: number, mult: number) =>
    base * (isCharter ? mult : 1.0);

  const crewCount = isSail
    ? Math.round(lerp(4, 12, t))
    : Math.round(lerp(5, 14, t));
  const salaries = isSail
    ? lerp(220_000, 520_000, t)
    : lerp(260_000, 620_000, t);
  const socialCharges = salaries * 0.18;
  const crewInsurance = crewCount * lerp(1_800, 2_500, t);
  const travelBase = crewCount * lerp(2_500, 4_000, t);
  const travel = isDual ? travelBase * 1.6 : travelBase;
  const training = crewCount * lerp(1_500, 3_000, t);
  const uniforms = crewCount * lerp(400, 800, t);
  const provisions = crewCount * lerp(5_000, 8_000, t);
  const usageMult = usage === "heavy" ? 1.15 : usage === "moderate" ? 1.05 : 1.0;
  const crewSub = [
    salaries,
    socialCharges,
    crewInsurance,
    travel,
    training,
    uniforms,
    provisions,
  ];
  const crewRaw = crewSub.reduce((a, b) => a + b, 0) * usageMult;
  const crew = charterAdj(crewRaw, 1.25);

  const valueMotor = lerp(3_000_000, 35_000_000, t);
  const value = isSail ? valueMotor * 0.85 : valueMotor;
  const areaInsuranceMult: Record<CruisingArea, number> = {
    west_med: 1.0,
    east_med: 1.05,
    caribbean: 1.15,
    us_east_coast: 1.1,
    southeast_asia: 1.1,
    northern_europe: 0.95,
    arabian_gulf: 1.05,
    south_pacific: 1.15,
    global: 1.25,
  };
  const areaMult = areaInsuranceMult[area];
  const hullRate = isSail ? 0.008 : 0.01;
  const hull = value * hullRate * areaMult * (isDual ? 1.15 : 1.0);
  const pandi =
    value * (isSail ? 0.003 : 0.004) * areaMult * (isDual ? 1.1 : 1.0);
  const crewMedical = crewCount * lerp(1_200, 2_000, t);
  const warRisk =
    area === "arabian_gulf" || area === "global" ? value * 0.001 : 0;
  const insuranceRaw = hull + pandi + crewMedical + warRisk;
  const insurance = charterAdj(insuranceRaw, 1.4);

  const engineService = isSail
    ? lerp(25_000, 80_000, t)
    : lerp(50_000, 200_000, t);
  const hullAntifoul = lerp(20_000, 90_000, t);
  const rig = isSail ? lerp(30_000, 120_000, t) : 0;
  const sailInventory = isSail ? lerp(15_000, 80_000, t) : 0;
  const deckHardware = lerp(10_000, 50_000, t);
  const electronics = lerp(8_000, 35_000, t);
  const interiorUpkeep = lerp(10_000, 45_000, t);
  const classReserve = lerp(20_000, 80_000, t);
  const maintRaw =
    engineService +
    hullAntifoul +
    rig +
    sailInventory +
    deckHardware +
    electronics +
    interiorUpkeep +
    classReserve;
  const maintenance = charterAdj(maintRaw, 1.2);

  const berthMultiplier: Record<CruisingArea, number> = {
    west_med: 1.0,
    east_med: 0.8,
    caribbean: 0.7,
    us_east_coast: 0.9,
    southeast_asia: 0.5,
    northern_europe: 0.6,
    arabian_gulf: 0.75,
    south_pacific: 0.55,
    global: 0.85,
  };
  const homeBerth = lerp(60_000, 280_000, t) * berthMultiplier[area];
  const secondBerth = isDual ? lerp(30_000, 150_000, t) * 0.7 : 0;
  const transitBerths =
    lerp(15_000, 60_000, t) * berthMultiplier[area] * (isDual ? 1.4 : 1.0);
  const launchHaulout = lerp(5_000, 20_000, t);
  const berths = homeBerth + secondBerth + transitBerths + launchHaulout;

  const fuelOnly = isSail
    ? lerp(15_000, 60_000, t)
    : lerp(50_000, 280_000, t);
  const deliveryFuel = isDual
    ? isSail
      ? lerp(8_000, 25_000, t)
      : lerp(20_000, 80_000, t)
    : 0;
  const lubricants = (fuelOnly + deliveryFuel) * 0.06;
  const waterTreatment = lerp(2_000, 8_000, t);
  const stores = lerp(8_000, 30_000, t);
  const fuelUsageMult = usage === "heavy" ? 1.5 : usage === "moderate" ? 1.0 : 0.7;
  const fuelRaw =
    (fuelOnly + deliveryFuel + lubricants + waterTreatment + stores) *
    fuelUsageMult;
  const fuel = charterAdj(fuelRaw, 1.3);

  const baseFee = lerp(3_000, 8_000, t) * 12;
  const accounting = lerp(6_000, 18_000, t);
  const charterAdmin = isCharter ? baseFee * 0.35 : 0;
  const management = baseFee + accounting + charterAdmin;

  const flagState = lerp(3_000, 12_000, t);
  const classSurvey = lerp(5_000, 18_000, t);
  const radioLicensing = lerp(500, 2_000, t);
  const ismCompliance = isCharter
    ? lerp(4_000, 15_000, t)
    : lerp(2_000, 8_000, t);
  const yachtCode = isCharter ? lerp(3_000, 10_000, t) : 0;
  const regulatory =
    flagState + classSurvey + radioLicensing + ismCompliance + yachtCode;

  const deliveryCrew = isDual ? lerp(8_000, 25_000, t) : 0;
  const agentFees = isDual ? lerp(3_000, 10_000, t) : 0;
  const crewWithDelivery = crew + deliveryCrew + agentFees;

  const charterScale = (items: SubItem[], mult: number): SubItem[] => {
    if (!isCharter) return items;
    const raw = items.reduce((a, b) => a + b.amount, 0);
    const scaled = raw * mult;
    const diff = scaled - raw;
    return [...items, { label: "Charter uplift", amount: diff }];
  };

  const usageScale = (items: SubItem[], mult: number): SubItem[] => {
    if (mult === 1.0) return items;
    const raw = items.reduce((a, b) => a + b.amount, 0);
    const scaled = raw * mult;
    const diff = scaled - raw;
    const usageLabel =
      usage === "heavy" ? "Heavy use adjustment" : "Moderate use adjustment";
    return [...items, { label: usageLabel, amount: diff }];
  };

  const detail: Record<string, SubItem[]> = {
    crew: charterScale(
      usageScale(
        [
          { label: "Salaries", amount: salaries },
          { label: "Social charges & tax", amount: socialCharges },
          { label: "Crew insurance", amount: crewInsurance },
          { label: "Travel & repatriation", amount: travel },
          { label: "Training & certs", amount: training },
          { label: "Uniforms", amount: uniforms },
          { label: "Provisions", amount: provisions },
          ...(isDual
            ? [
                { label: "Delivery crew", amount: deliveryCrew },
                { label: "Port agent fees", amount: agentFees },
              ]
            : []),
        ],
        usageMult
      ),
      1.25
    ),
    insurance: charterScale(
      [
        { label: "Hull & machinery", amount: hull },
        { label: "P&I cover", amount: pandi },
        { label: "Crew medical", amount: crewMedical },
        ...(warRisk > 0
          ? [{ label: "War risk", amount: warRisk }]
          : []),
      ],
      1.4
    ),
    maintenance: charterScale(
      [
        { label: "Engine & generator service", amount: engineService },
        { label: "Hull, antifoul & paint", amount: hullAntifoul },
        ...(isSail
          ? [{ label: "Rig inspection & maintenance", amount: rig }]
          : []),
        ...(isSail
          ? [{ label: "Sail inventory", amount: sailInventory }]
          : []),
        { label: "Deck hardware", amount: deckHardware },
        { label: "Electronics & nav", amount: electronics },
        { label: "Interior upkeep", amount: interiorUpkeep },
        { label: "Class survey reserve", amount: classReserve },
      ],
      1.2
    ),
    berths: [
      { label: "Annual home berth", amount: homeBerth },
      ...(isDual
        ? [{ label: "Second season berth", amount: secondBerth }]
        : []),
      { label: "Transit & visitor berths", amount: transitBerths },
      { label: "Launch & haulout", amount: launchHaulout },
    ],
    fuel: charterScale(
      usageScale(
        [
          { label: "Fuel", amount: fuelOnly },
          ...(isDual
            ? [{ label: "Delivery passage fuel", amount: deliveryFuel }]
            : []),
          { label: "Lubricants", amount: lubricants },
          { label: "Water treatment", amount: waterTreatment },
          { label: "General stores", amount: stores },
        ],
        fuelUsageMult
      ),
      1.3
    ),
    management: [
      { label: "Management fee", amount: baseFee },
      { label: "Accounting & payroll", amount: accounting },
      ...(isCharter
        ? [{ label: "Charter administration", amount: charterAdmin }]
        : []),
    ],
    regulatory: [
      { label: "Flag state fees", amount: flagState },
      { label: "Class society surveys", amount: classSurvey },
      { label: "Radio licensing", amount: radioLicensing },
      { label: "ISM / SMS compliance", amount: ismCompliance },
      ...(isCharter
        ? [{ label: "Yacht code (LY3/PYC)", amount: yachtCode }]
        : []),
    ],
    contingency: [],
  };

  const subtotal =
    crewWithDelivery +
    insurance +
    maintenance +
    berths +
    fuel +
    management +
    regulatory;
  const contingency = subtotal * 0.08;
  const total = subtotal + contingency;

  return {
    crew: crewWithDelivery,
    insurance,
    maintenance,
    berths,
    fuel,
    management,
    regulatory,
    contingency,
    total,
    detail,
  };
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
  const [currency, setCurrency] = useState<Currency>("EUR");

  const costs = calculateCosts(length, yachtType, area, usage, useType, season);

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
      question: "How much does it cost to run a superyacht per year?",
      answer:
        "Annual running costs run from approximately EUR 600,000 for a 24-metre sailing yacht at light use, to EUR 4 to 5 million for a 50-metre motor yacht at moderate use, to EUR 8 million and above for an 80-metre operating year-round. The main cost categories are crew (30-40% of the total), insurance, maintenance, marina berths, fuel, management fees, and regulatory compliance. As a rough guide, expect 12 to 15 percent of purchase price for a new 40 to 50 metre yacht at moderate use, rising to 12 to 20 percent for older or larger vessels and higher again on charter-active programmes. The actual figure depends heavily on vessel type, size, cruising area, age, and use intensity.",
    },
    {
      question: "What is the 10% rule for yachts?",
      answer:
        "The 10% rule is industry shorthand for budgeting roughly 10 percent of the yacht's purchase price each year for running costs. The rule has no traceable origin and is roughly correct only for new, mid-sized, lightly used yachts. Independent practitioner ranges cluster between 8 and 15 percent for the first decade; for yachts over 40 metres, older than seven years, or operating charter, the empirical band runs 12 to 20 percent. The rule is a starting point, not a budget.",
    },
    {
      question: "What are the biggest costs of owning a superyacht?",
      answer:
        "Crew costs are almost always the largest single expense, typically 30-40% of the annual budget. After crew, the next largest costs are maintenance and repair (including class surveys and periodic refits), insurance (hull, P&I, and crew medical), and marina berths. Fuel costs vary dramatically between sailing and motor yachts. Management fees, regulatory compliance, and a contingency reserve of 8-10% should also be budgeted.",
    },
    {
      question: "How much does a superyacht crew cost?",
      answer:
        "Crew costs depend on yacht size and the number of crew required. A 30-metre yacht with 5-7 crew might spend EUR 300,000-450,000 per year on total crew costs. A 50-metre yacht with 12-16 crew could spend EUR 900,000-1,400,000. These figures include salaries, social charges, insurance, travel, training, uniforms, and provisions.",
    },
    {
      question: "Is it cheaper to run a sailing yacht or a motor yacht?",
      answer:
        "Sailing yachts are generally less expensive to run than motor yachts of equivalent size. The main saving is fuel. However, sailing yachts have costs that motor yachts do not, including rig maintenance, sail inventory, and specialist rigging inspections. Overall, a sailing yacht's annual running costs are typically 15-25% lower than a comparable motor yacht.",
    },
    {
      question: "How much does superyacht insurance cost?",
      answer:
        "Insurance costs depend on the yacht's value, type, age, cruising area, and claims history. Hull and machinery insurance typically costs 0.8-1.5% of the yacht's insured value per year. P&I (Protection and Indemnity) cover adds another 0.3-0.4%. Charter yachts require commercial insurance, which can be 30-40% more expensive than private cover.",
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
          <p className="meta text-paper/80 mb-6">
            A tool from The First Owner&rsquo;s Reference
          </p>
          <h1 className="font-serif font-light text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.1] tracking-tight max-w-3xl mb-8">
            What does it actually cost
            <br />
            to run a superyacht?
          </h1>
          <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-relaxed text-paper/85 max-w-2xl">
            Ownership is more than the purchase price. The calculator below
            produces a realistic annual running-cost estimate, broken down by
            category, against named source assumptions.
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
                  max={60}
                  step={1}
                  value={length}
                  onChange={handleSlider}
                  className="w-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, var(--color-marine) ${
                      ((length - 24) / 36) * 100
                    }%, var(--color-rule) ${
                      ((length - 24) / 36) * 100
                    }%)`,
                    height: "4px",
                    borderRadius: "2px",
                    WebkitAppearance: "none",
                    accentColor: "var(--color-marine)",
                  }}
                />
                <div className="flex justify-between meta">
                  <span>24 m</span>
                  <span>60 m</span>
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
                    LY3/PYC compliance, and dedicated charter management.
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
                  {areaLabels[area]}, {usage} use
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
            What actually drives the cost of running a superyacht?
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
                Common questions about superyacht running costs
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
              Last updated 2026. Figures based on current market data and
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
            Where do these numbers come from?
          </h2>
          <p className="prose-body text-charcoal-soft mb-8">
            The cost model behind this calculator is based on published
            industry data, supplemented by Foreland Marine&rsquo;s direct
            experience managing yachts in the 24 to 60 metre range.
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
                title: "MCA Large Yacht Code (LY3)",
                detail:
                  "Commercial compliance survey costs, manning requirements, and flag-state fee schedules.",
                href: "https://www.gov.uk/government/collections/large-commercial-yacht-code",
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
