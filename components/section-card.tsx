import Link from "next/link";
import Image from "next/image";
import type { Section } from "@/lib/sections";

export function SectionCard({ section }: { section: Section }) {
  return (
    <Link
      href={`/${section.slug}`}
      className="group block border-t border-charcoal pt-6 transition-colors hover:border-marine"
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-serif font-light text-5xl text-marine leading-none">
          {section.number}
        </span>
        <span className="meta">{section.coordinates}</span>
      </div>
      <h3 className="font-serif text-2xl leading-tight tracking-tight mb-3 transition-colors group-hover:text-marine">
        {section.title}
      </h3>
      <p className="caption mb-6 max-w-md leading-relaxed">
        {section.standfirst}
      </p>
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-soft">
        <Image
          src={section.hero}
          alt={`Section ${section.number}: ${section.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-4 flex justify-between items-baseline">
        <span className="meta">Read section</span>
        <span className="meta-marine">&rarr;</span>
      </div>
    </Link>
  );
}
