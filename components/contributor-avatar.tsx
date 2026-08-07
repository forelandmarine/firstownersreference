import Image from "next/image";

const TITLE_PREFIX = /^(Capt\.?|Dr\.?|Mr\.?|Mrs\.?|Ms\.?)\s+/i;

function initials(name: string): string {
  const cleaned = name.replace(TITLE_PREFIX, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function ContributorAvatar({
  name,
  avatar,
  size = 72,
}: {
  name: string;
  avatar?: string;
  size?: number;
}) {
  if (avatar) {
    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-full bg-stone-soft"
        style={{ width: size, height: size }}
      >
        <Image
          src={avatar}
          alt={name}
          fill
          sizes={`${size}px`}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center rounded-full border border-rule bg-paper-deep"
      style={{ width: size, height: size }}
    >
      <span
        className="font-serif font-light tracking-tight text-charcoal-soft"
        style={{ fontSize: Math.round(size * 0.34) }}
      >
        {initials(name)}
      </span>
    </div>
  );
}
