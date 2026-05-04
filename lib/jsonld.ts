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
      "https://forelandmarine.com",
      "https://www.linkedin.com/in/jack-macnally/",
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
}) {
  const author =
    opts.author === "jack"
      ? [{ "@id": JACK_ID }]
      : opts.author === "daniel"
        ? [{ "@id": DAN_ID }]
        : [{ "@id": JACK_ID }, { "@id": DAN_ID }];

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
    ...(opts.articleSection ? { articleSection: opts.articleSection } : {}),
    ...(opts.wordCount ? { wordCount: opts.wordCount } : {}),
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
  hasDefinedTerm: { url: string; name: string }[];
}) {
  return {
    "@type": "DefinedTermSet",
    "@id": `${opts.url}#termset`,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    hasDefinedTerm: opts.hasDefinedTerm.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      url: t.url,
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

export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function jsonLdString(...nodes: object[]) {
  return JSON.stringify(graph(...nodes));
}
