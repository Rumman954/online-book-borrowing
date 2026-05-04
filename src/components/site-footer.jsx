import Link from "next/link";

const social = [
  { label: "Facebook", href: "https://www.facebook.com/mdabutalha.rumman" },
  { label: "Twitter", href: "https://x.com/MdAbuTalhaRumm1" },
  { label: "Instagram", href: "https://www.instagram.com/rummanmdabutalha/" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[color-mix(in_oklab,var(--library-ink)_12%,transparent)] bg-[color-mix(in_oklab,var(--library-ink)_6%,var(--library-paper))]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--library-ink)]">
            Shelves &amp; Stories
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed opacity-80">
            A calm digital library for curious readers—browse categories, borrow
            in one click, and keep your shelf synced everywhere.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline border-[var(--library-sage)] text-[var(--library-ink)]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-base-100/80 p-6 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]">
          <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Contact us
          </h3>
          <p className="mt-2 text-sm opacity-80">
            Questions about borrowing, memberships, or partnerships? Reach our
            desk anytime.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <a
                className="link link-primary"
                href="mailto:mdabutalharumman@gmail.com"
              >
                mdabutalharumman@gmail.com
              </a>
            </li>
            <li>
              <span className="font-medium">Hours:</span> Sun-Thu 9.00am-5.00pm
            </li>
            <li>
              <Link href="/books" className="link link-hover">
                Browse the catalog →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
