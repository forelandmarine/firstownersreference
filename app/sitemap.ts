import type { MetadataRoute } from "next";
import { sections } from "@/lib/sections";
import { getCase } from "@/lib/cases";
import { getChecklist } from "@/lib/checklists";
import { glossaryEntries } from "@/lib/glossary";

const BASE_URL = "https://firstownersreference.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/glossary`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contributors`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/colophon`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/tools/running-cost-calculator`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/yacht-vat-2026`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tools/captain-and-crew-salary-2026`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/request-print-edition`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];

  const chapterRoutes: MetadataRoute.Sitemap = sections.flatMap((section) => {
    const routes: MetadataRoute.Sitemap = [
      {
        url: `${BASE_URL}/${section.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.9,
      },
    ];
    if (getCase(section.slug)) {
      routes.push({
        url: `${BASE_URL}/${section.slug}/case`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    if (getChecklist(section.slug)) {
      routes.push({
        url: `${BASE_URL}/${section.slug}/checklist`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    return routes;
  });

  const glossaryRoutes: MetadataRoute.Sitemap = glossaryEntries.map((entry) => ({
    url: `${BASE_URL}/glossary/${entry.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...chapterRoutes, ...glossaryRoutes];
}
