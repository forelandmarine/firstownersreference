import type { MetadataRoute } from "next";
import { sections } from "@/lib/sections";
import { getCase } from "@/lib/cases";
import { getChecklist } from "@/lib/checklists";
import { getGuestOpinions, qaPersonSlug } from "@/lib/guest-opinions";

const BASE_URL = "https://firstownersreference.com";

/**
 * Every URL previously carried `new Date()`, so all forty-eight reported the
 * same build timestamp to the millisecond. A sitemap where everything changed
 * at once is a sitemap crawlers learn to discount, which is a poor trade for a
 * publication that revises between editions.
 *
 * Dates below are the last real content change, not the build.
 */
const SITE_LAST_MODIFIED = "2026-09-09";

const TOOL_DATES: Record<string, string> = {
  "/tools/running-cost-calculator": "2026-09-09",
  "/tools/yacht-vat-2026": "2026-07-27",
  "/tools/captain-and-crew-salary-2026": "2026-05-04",
  "/tools/order-book-tracker": "2026-07-27",
  "/tools/yacht-insurance-cost-2026": "2026-09-09",
  "/tools/yacht-depreciation": "2026-09-09",
  "/09a-questions-to-ask-before-you-buy": "2026-07-28",
};

const STATIC_DATES: Record<string, string> = {
  "/": SITE_LAST_MODIFIED,
  "/glossary": "2026-09-09",
  "/contributors": "2026-09-09",
  "/colophon": "2026-08-13",
  "/press": "2026-08-13",
  "/request-print-edition": "2026-08-13",
  ...TOOL_DATES,
};

const d = (path: string) => new Date(STATIC_DATES[path] ?? SITE_LAST_MODIFIED);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: d("/"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/glossary`, lastModified: d("/glossary"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contributors`, lastModified: d("/contributors"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/colophon`, lastModified: d("/colophon"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/press`, lastModified: d("/press"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/running-cost-calculator`, lastModified: d("/tools/running-cost-calculator"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/yacht-vat-2026`, lastModified: d("/tools/yacht-vat-2026"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/captain-and-crew-salary-2026`, lastModified: d("/tools/captain-and-crew-salary-2026"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/order-book-tracker`, lastModified: d("/tools/order-book-tracker"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/yacht-insurance-cost-2026`, lastModified: d("/tools/yacht-insurance-cost-2026"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/yacht-depreciation`, lastModified: d("/tools/yacht-depreciation"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/09a-questions-to-ask-before-you-buy`, lastModified: d("/09a-questions-to-ask-before-you-buy"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/request-print-edition`, lastModified: d("/request-print-edition"), changeFrequency: "monthly", priority: 0.5 },
  ];

  const chapterRoutes: MetadataRoute.Sitemap = sections.flatMap((section) => {
    const chapterModified = new Date(
      section.dateModified ?? section.datePublished
    );

    const routes: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/${section.slug}`,
        lastModified: chapterModified,
        changeFrequency: "monthly",
        priority: 0.9,
      },
    ];
    if (getCase(section.slug)) {
      routes.push({
        url: `${BASE_URL}/${section.slug}/case`,
        lastModified: chapterModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    for (const opinion of getGuestOpinions(section.slug).filter(
      (g) => g.questions.length > 0
    )) {
      routes.push({
        url: `${BASE_URL}/${section.slug}/qa/${qaPersonSlug(opinion.contributor)}`,
        lastModified: new Date(
          opinion.dateModified ?? opinion.datePublished ?? section.datePublished
        ),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    if (getChecklist(section.slug)) {
      routes.push({
        url: `${BASE_URL}/${section.slug}/checklist`,
        lastModified: chapterModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    return routes;
  });

  return [...staticRoutes, ...chapterRoutes];
}
