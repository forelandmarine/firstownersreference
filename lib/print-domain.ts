/*
  Print cites a source by its domain only, never a full web address
  (Jack, 14 November 2026). The web edition keeps the full links.

  domainOf("https://wwwcdn.imo.org/localresources/en/…/MSC.337(91).pdf")
    -> "imo.org"
  domainsOnly("Yatco, blog.yatco.com/yacht-depreciation (27 June 2025)")
    -> "Yatco, yatco.com (27 June 2025)"

  Shortening also keeps every printed token narrower than a column. One
  unbreakable address in the sources section was wider than the page and
  made Chrome shrink the whole book to 70 per cent.
*/

/* Second-level labels under a country code, where the registrable domain
   takes three labels: bbc.co.uk, gov.uk services, abc.net.au. */
const SECOND_LEVEL = new Set(["co", "com", "org", "net", "gov", "ac", "ltd", "plc"]);

export function domainOf(url: string): string {
  const host = url
    .trim()
    .replace(/^[a-z]+:\/\//i, "")
    .split(/[/?#]/)[0]
    .replace(/:\d+$/, "")
    .toLowerCase()
    .replace(/^www[a-z0-9]*\./, "");
  const labels = host.split(".").filter(Boolean);
  if (labels.length <= 2) return labels.join(".");
  const take =
    labels[labels.length - 1].length === 2 &&
    SECOND_LEVEL.has(labels[labels.length - 2])
      ? 3
      : 2;
  return labels.slice(-take).join(".");
}

/* A host with a dot and a letters-only TLD, optionally preceded by a scheme
   and followed by a path. Bare hosts with no path and no scheme (as in
   "firstownersreference.com" in running text) are left alone unless they
   carry a subdomain worth dropping. */
const URL_RE =
  /\b(?:[a-z]+:\/\/)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s,;)]*[^\s,;).])?/gi;

export function domainsOnly(text: string): string {
  return text.replace(URL_RE, (m) => {
    // Leave e-mail addresses and plain words like "e.g." untouched.
    if (/@/.test(m)) return m;
    const hasPathOrScheme = m.includes("/");
    const d = domainOf(m);
    if (!hasPathOrScheme && d === m.toLowerCase()) return m;
    return d;
  });
}
