export const SITE_URL = "https://firstownersreference.com";
export const SITE_NAME = "The First Owner's Reference";

const ORG_ID = `${SITE_URL}#publisher`;
const SITE_ID = `${SITE_URL}#website`;
const JACK_ID = `${SITE_URL}#jack-macnally`;
const DAN_ID = `${SITE_URL}#daniel-marks`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Foreland Marine",
    url: "https://forelandmarine.com",
    sameAs: [
      "https://forelandmarine.com",
      "https://www.linkedin.com/company/foreland-marine/",
    ],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/foreland-lighthouse-charcoal.svg`,
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-GB",
  };
}

export function jackPersonSchema() {
  return {
    "@type": "Person",
    "@id": JACK_ID,
    name: "Jack MacNally",
    jobTitle: "Co-editor in Chief, The First Owner's Reference; Director, Foreland Marine",
    worksFor: { "@id": ORG_ID },
    sameAs: [
      "https://www.forelandmarine.com",
      "https://www.forelandmarine.com/#jack-macnally",
      "https://www.linkedin.com/in/jmacnally/",
    ],
  };
}

export function danPersonSchema() {
  return {
    "@type": "Person",
    "@id": DAN_ID,
    name: "Daniel Marks",
    jobTitle: "Co-editor in Chief, The First Owner's Reference",
    worksFor: { "@id": ORG_ID },
    sameAs: [
      "https://www.forelandmarine.com",
      "https://www.forelandmarine.com/#daniel-marks",
      "https://www.linkedin.com/in/daniel-marks-0a0a4b6b/",
    ],
  };
}

/** Stable @id for a named contributor, so one person is one node sitewide. */
export function contributorId(name: string) {
  return `${SITE_URL}#${name
    .toLowerCase()
    .replace(/^(capt\.|captain|mr|ms|mrs|dr)\s+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

/**
 * The named practitioners on the record are the publication's strongest
 * credibility signal and appeared in no structured data at all: the Q&A
 * articles listed only the two editors as authors.
 */
export function contributorPersonSchema(opts: {
  name: string;
  jobTitle?: string;
  description?: string;
  linkedIn?: string;
  image?: string;
}) {
  return {
    "@type": "Person",
    "@id": contributorId(opts.name),
    name: opts.name,
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: `${SITE_URL}${opts.image}` } : {}),
    ...(opts.linkedIn ? { sameAs: [opts.linkedIn] } : {}),
  };
}

export type ArticleAuthor = "jack" | "daniel" | "both";

export function articleSchema(opts: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author?: ArticleAuthor;
  image?: string;
  articleSection?: string;
  wordCount?: number;
  chapterNumber?: string;
  chapterTitle?: string;
  /** @ids of people the piece is about, e.g. the interviewee on a Q&A. */
  about?: string[];
}) {
  const author =
    opts.author === "jack"
      ? [{ "@id": JACK_ID }]
      : opts.author === "daniel"
        ? [{ "@id": DAN_ID }]
        : [{ "@id": JACK_ID }, { "@id": DAN_ID }];

  const suggestedCitation = opts.chapterTitle
    ? `Foreland Marine, "${opts.chapterTitle}," in The First Owner's Reference, 1st Edition (2026)${opts.chapterNumber ? `, Chapter ${opts.chapterNumber}` : ""}, ${opts.url}.`
    : undefined;

  return {
    "@type": "Article",
    "@id": `${opts.url}#article`,
    isPartOf: { "@id": SITE_ID },
    mainEntityOfPage: { "@id": opts.url },
    url: opts.url,
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
    ...(opts.image
      ? {
          image: {
            "@type": "ImageObject",
            url: opts.image,
          },
        }
      : {}),
    ...(opts.about?.length
      ? {
          about: opts.about.map((id) => ({ "@id": id })),
          mentions: opts.about.map((id) => ({ "@id": id })),
        }
      : {}),
    ...(opts.articleSection ? { articleSection: opts.articleSection } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
    ...(suggestedCitation ? { citation: suggestedCitation } : {}),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function definedTermSchema(opts: {
  url: string;
  termSetUrl: string;
  name: string;
  description: string;
  source?: { name: string; url: string };
}) {
  return {
    "@type": "DefinedTerm",
    "@id": `${opts.url}#term`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inDefinedTermSet: opts.termSetUrl,
    ...(opts.source
      ? {
          isBasedOn: {
            "@type": "CreativeWork",
            name: opts.source.name,
            url: opts.source.url,
          },
        }
      : {}),
  };
}

export function definedTermSetSchema(opts: {
  url: string;
  name: string;
  description: string;
  hasDefinedTerm: {
    url: string;
    name: string;
    description: string;
    source?: { name: string; url: string };
  }[];
}) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${opts.url}#termset`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    // The terms carried name and url only. Every definition on the page,
    // including the regulatory citations, was invisible to structured data.
    hasDefinedTerm: opts.hasDefinedTerm.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${t.url.split("#")[0]}#${t.url.split("#")[1] ?? ""}-term`,
      name: t.name,
      url: t.url,
      description: t.description,
      inDefinedTermSet: `${opts.url}#termset`,
      ...(t.source
        ? {
            isBasedOn: {
              "@type": "CreativeWork",
              name: t.source.name,
              url: t.source.url,
            },
          }
        : {}),
    })),
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationSchema(opts: {
  url: string;
  name: string;
  description: string;
  applicationCategory?: string;
}) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${opts.url}#app`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    applicationCategory: opts.applicationCategory ?? "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    publisher: { "@id": ORG_ID },
  };
}

export function datasetSchema(opts: {
  url: string;
  name: string;
  description: string;
  dateModified: string;
  temporalCoverage: string;
  basedOn?: { name: string; url: string }[];
  variablesMeasured?: string[];
}) {
  return {
    "@type": "Dataset",
    "@id": `${opts.url}#dataset`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    dateModified: opts.dateModified,
    temporalCoverage: opts.temporalCoverage,
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    ...(opts.basedOn
      ? {
          isBasedOn: opts.basedOn.map((s) => ({
            "@type": "CreativeWork",
            name: s.name,
            url: s.url,
          })),
        }
      : {}),
    ...(opts.variablesMeasured
      ? { variableMeasured: opts.variablesMeasured }
      : {}),
  };
}

export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function jsonLdString(...nodes: object[]) {
  return JSON.stringify(graph(...nodes));
}
