import { redirect } from "next/navigation";
import { sections } from "@/lib/sections";

export function generateStaticParams() {
  return sections.map((s) => ({ slug: s.slug }));
}

export default async function LeadEssayRedirect(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  redirect(`/${slug}`);
}
