import { graph } from "@/lib/jsonld";

export function JsonLd({ nodes }: { nodes: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph(...nodes)) }}
    />
  );
}
