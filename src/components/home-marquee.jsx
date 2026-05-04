export function HomeMarquee({ titles }) {
  const snippet = titles.length
    ? titles.join(" · ")
    : "The Midnight Library · Clean Code · Sapiens";
  const text = `New Arrivals: ${snippet} | Special Discount on Memberships | Reserve Your Next Read Today | Quiet Reading Rooms Open Late`;

  return (
    <div className="relative overflow-hidden border-y border-[color-mix(in_oklab,var(--library-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--library-sage)_15%,var(--library-paper))] py-2">
      <div className="flex overflow-hidden">
        <div className="marquee-wrap flex shrink-0 gap-16 pr-16">
          <span className="whitespace-nowrap text-sm font-medium tracking-wide text-[var(--library-ink)]">
            {text}
          </span>
          <span
            className="whitespace-nowrap text-sm font-medium tracking-wide text-[var(--library-ink)]"
            aria-hidden
          >
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}
