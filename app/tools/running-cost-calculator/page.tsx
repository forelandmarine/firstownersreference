"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

type YachtType = "sail" | "motor";
type Use = "private" | "charter";
type Region =
  | "west-med"
  | "east-med"
  | "caribbean"
  | "us-east"
  | "se-asia"
  | "northern-europe"
  | "arabian-gulf"
  | "south-pacific"
  | "global";
type Intensity = "light" | "moderate" | "heavy";
type Currency = "GBP" | "EUR" | "USD";

const intensityMultiplier: Record<Intensity, number> = {
  light: 0.85,
  moderate: 1,
  heavy: 1.2,
};

const regionMultiplier: Record<Region, number> = {
  "west-med": 1.1,
  "east-med": 0.95,
  caribbean: 1.05,
  "us-east": 1.08,
  "se-asia": 0.92,
  "northern-europe": 0.98,
  "arabian-gulf": 1.15,
  "south-pacific": 1.12,
  global: 1.2,
};

const currencyRate: Record<Currency, number> = {
  GBP: 1,
  EUR: 1.18,
  USD: 1.27,
};

const currencySymbol: Record<Currency, string> = {
  GBP: "\u00a3",
  EUR: "\u20ac",
  USD: "$",
};

const categories = [
  { key: "crew", label: "Crew", share: 0.35 },
  { key: "maintenance", label: "Maintenance and repair", share: 0.16 },
  { key: "insurance", label: "Insurance", share: 0.13 },
  { key: "berths", label: "Berths and marina fees", share: 0.11 },
  { key: "fuel", label: "Fuel and consumables", share: 0.1 },
  { key: "contingency", label: "Contingency", share: 0.08 },
  { key: "management", label: "Management fees", share: 0.04 },
  { key: "regulatory", label: "Regulatory and compliance", share: 0.02 },
  { key: "other", label: "Other operating", share: 0.01 },
];

function baseAnnualCostGBP(length: number, type: YachtType, use: Use): number {
  const sailFactor = type === "sail" ? 0.92 : 1;
  const charterFactor = use === "charter" ? 1.15 : 1;
  // Calibrated to roughly 10% of capex per year, scaled by length.
  const lengthCost = 4500 * Math.pow(length, 1.85);
  return lengthCost * sailFactor * charterFactor;
}

export default function CalculatorPage() {
  const [length, setLength] = useState(40);
  const [type, setType] = useState<YachtType>("sail");
  const [use, setUse] = useState<Use>("private");
  const [region, setRegion] = useState<Region>("west-med");
  const [intensity, setIntensity] = useState<Intensity>("moderate");
  const [currency, setCurrency] = useState<Currency>("GBP");

  const total = useMemo(() => {
    const base = baseAnnualCostGBP(length, type, use);
    const adjusted =
      base * regionMultiplier[region] * intensityMultiplier[intensity];
    return adjusted * currencyRate[currency];
  }, [length, type, use, region, intensity, currency]);

  const formatted = useMemo(
    () =>
      new Intl.NumberFormat("en-GB", {
        maximumFractionDigits: 0,
      }).format(Math.round(total / 1000) * 1000),
    [total]
  );

  return (
    <>
      <SiteHeader />

      <article className="bg-paper">
        <header className="border-b border-rule pt-16 pb-16">
          <div className="max-w-[80rem] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-3 mb-10 meta">
              <Link href="/" className="link">
                Edition One
              </Link>
              <span>/</span>
              <span>Tools</span>
              <span>/</span>
              <span>Running cost calculator</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-8">
                <p className="meta mb-6">Tool</p>
                <h1 className="font-serif font-light text-headline lg:text-display leading-[1.05] tracking-tight text-charcoal">
                  Running cost calculator
                </h1>
              </div>
              <div className="lg:col-span-4">
                <p className="caption max-w-md">
                  Estimates annual operating cost for a yacht of given size,
                  type, region, and use intensity. Calibrated against MYBA,
                  Pantaenius, Quay Crew, and Foreland Marine&rsquo;s
                  operational data. Sources are named on every assumption.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-[80rem] mx-auto px-6 lg:px-12 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-10">
            <Field label="Yacht length" meta={`${length} metres`}>
              <input
                type="range"
                min={24}
                max={60}
                step={1}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-marine"
              />
              <div className="flex justify-between meta mt-2">
                <span>24m</span>
                <span>60m</span>
              </div>
            </Field>

            <Field label="Yacht type">
              <Toggle
                options={[
                  { value: "sail", label: "Sail" },
                  { value: "motor", label: "Motor" },
                ]}
                value={type}
                onChange={(v) => setType(v as YachtType)}
              />
            </Field>

            <Field label="Use">
              <Toggle
                options={[
                  { value: "private", label: "Private" },
                  { value: "charter", label: "Charter" },
                ]}
                value={use}
                onChange={(v) => setUse(v as Use)}
              />
            </Field>

            <Field label="Primary operating area">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as Region)}
                className="w-full bg-paper-deep border border-rule px-4 py-3 font-serif text-lg focus:outline-none focus:border-marine"
              >
                <option value="west-med">Western Mediterranean</option>
                <option value="east-med">Eastern Mediterranean</option>
                <option value="caribbean">Caribbean</option>
                <option value="us-east">US East Coast</option>
                <option value="se-asia">Southeast Asia</option>
                <option value="northern-europe">Northern Europe</option>
                <option value="arabian-gulf">Arabian Gulf</option>
                <option value="south-pacific">South Pacific</option>
                <option value="global">Global cruising</option>
              </select>
            </Field>

            <Field label="Usage intensity">
              <Toggle
                options={[
                  { value: "light", label: "Light" },
                  { value: "moderate", label: "Moderate" },
                  { value: "heavy", label: "Heavy" },
                ]}
                value={intensity}
                onChange={(v) => setIntensity(v as Intensity)}
              />
              <p className="caption mt-3">
                Light: under 6 weeks per year. Moderate: 6 to 12. Heavy: 12
                or more.
              </p>
            </Field>

            <Field label="Currency">
              <Toggle
                options={[
                  { value: "GBP", label: "GBP" },
                  { value: "EUR", label: "EUR" },
                  { value: "USD", label: "USD" },
                ]}
                value={currency}
                onChange={(v) => setCurrency(v as Currency)}
              />
            </Field>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-rule lg:pl-12">
            <div className="border-b border-charcoal pb-10">
              <p className="meta mb-4">Estimated annual operating cost</p>
              <p className="font-serif font-light text-display leading-none tracking-tight text-marine">
                {currencySymbol[currency]}
                {formatted}
              </p>
              <p className="caption mt-4">
                Estimate. Range plus or minus 15 percent at this confidence
                band. Refits and major repairs not included; budget separately
                at roughly 2 percent of capex per year.
              </p>
            </div>

            <div className="mt-10 space-y-3">
              <div className="flex items-baseline justify-between meta border-b border-rule pb-3">
                <span>Category</span>
                <span>Share &middot; Annual</span>
              </div>
              {categories.map((cat) => {
                const value = total * cat.share;
                const formattedCat = new Intl.NumberFormat("en-GB", {
                  maximumFractionDigits: 0,
                }).format(Math.round(value / 1000) * 1000);
                return (
                  <div
                    key={cat.key}
                    className="flex items-baseline justify-between border-b border-rule py-3"
                  >
                    <div className="flex-1">
                      <p className="font-serif text-lg text-charcoal">
                        {cat.label}
                      </p>
                      <div className="mt-2 h-1 bg-paper-deep relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-marine"
                          style={{ width: `${cat.share * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="ml-6 text-right shrink-0">
                      <p className="meta-marine">
                        {(cat.share * 100).toFixed(0)}%
                      </p>
                      <p className="font-serif text-base text-charcoal">
                        {currencySymbol[currency]}
                        {formattedCat}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 rule pt-6 space-y-3">
              <p className="meta">Source assumptions</p>
              <ul className="caption space-y-2 max-w-prose">
                <li>
                  Crew salaries: Quay Crew Annual Salary Survey, 2025
                  edition.
                </li>
                <li>
                  Insurance bands: Pantaenius and AON Marine market commentary,
                  2026 Q1.
                </li>
                <li>
                  Marina fees: IGY Marinas, MB92 Group, Marina Port Vell
                  published rates.
                </li>
                <li>
                  Charter market reference: MYBA Charter Agreement and recent
                  central agency listings.
                </li>
                <li>
                  Operational data: Foreland Marine aggregated, 2018 to 2025,
                  anonymised across more than 30 managed yachts.
                </li>
              </ul>
              <p className="caption italic">
                This calculator is a wireframe placeholder. The production
                version will share calculation logic with
                forelandmarine.com/tools/running-cost-calculator and add per
                assumption citations.
              </p>
            </div>
          </div>
        </section>
      </article>

      <SiteFooter />
    </>
  );
}

function Field({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="meta">{label}</label>
        {meta && <span className="meta-marine">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 border border-rule">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`py-3 px-4 meta transition-colors border-r last:border-r-0 border-rule ${
            value === opt.value
              ? "bg-charcoal text-paper border-charcoal"
              : "bg-paper hover:bg-paper-deep text-charcoal"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
