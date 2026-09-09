// Hand-rolled rather than MetadataRoute.Robots because the generated shape has
// no field for the llms.txt pointer.
export const dynamic = "force-static";

const BASE_URL = "https://firstownersreference.com";

const DISALLOW = ["/api/", "/print", "/print-case", "/print-opener", "/studio"];

export function GET() {
  const body = [
    "User-Agent: *",
    "Allow: /",
    ...DISALLOW.map((path) => `Disallow: ${path}`),
    "",
    `Host: ${BASE_URL}`,
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    `Llms: ${BASE_URL}/llms.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
