import Link from "next/link";
import Image from "next/image";
import { listBooks } from "@/lib/books";
import { BookCard } from "@/components/book-card";
import { HomeMarquee } from "@/components/home-marquee";
import { HomeSwiper } from "@/components/home-swiper";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let catalogPreview = [];
  try {
    catalogPreview = await listBooks({ limit: 6 });
  } catch {
    // MongoDB not running or unreachable — still ship the page shell quickly.
  }
  const featured = catalogPreview.slice(0, 4);
  const carouselSource = catalogPreview;
  const marqueeTitles = featured.map((b) => b.title);

  return (
    <div>
      <section className="relative overflow-hidden bg-[color-mix(in_oklab,var(--library-sage)_18%,var(--library-paper))]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,var(--library-ink)_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 md:flex-row md:items-center md:py-28">
          <div className="flex-1 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--library-sage)]">
              Online borrowing · Always open
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-[var(--library-ink)] md:text-5xl lg:text-6xl">
              Find Your Next Read
            </h1>
            <p className="max-w-xl text-lg leading-relaxed opacity-85">
              Wander curated stacks in Story, Tech, and Science. Borrow in one
              tap, track your profile, and read on your own timeline.
            </p>
            <Link
              href="/books"
              className="btn btn-lg w-full bg-[var(--library-accent)] text-[var(--library-paper)] border-none hover:brightness-95 sm:w-auto"
            >
              Browse Now
            </Link>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="relative h-64 w-full max-w-md rotate-1 rounded-3xl bg-base-100 p-6 shadow-xl ring-1 ring-[color-mix(in_oklab,var(--library-ink)_12%,transparent)] md:h-80">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase text-[var(--library-sage)]">
                    Live shelf
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold">
                    {featured[0]?.title ?? "Your queue awaits"}
                  </p>
                </div>
                <div className="relative mx-auto my-2 h-40 w-full max-w-[340px]">
                  <Image
                    src="/images/Shelves & Stories.png"
                    alt="Shelves & Stories"
                    fill
                    className="object-contain"
                    sizes="340px"
                    priority
                  />
                </div>
                <p className="text-sm opacity-70">
                  {featured[0]?.author ?? "Browse All Books to start borrowing."}
                </p>
                <p className="text-sm font-semibold text-[var(--library-sage)]">
                  {featured[0]?.price ? `৳${featured[0].price}` : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeMarquee titles={marqueeTitles} />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--library-ink)]">
              Featured books
            </h2>
            <p className="mt-2 max-w-xl text-sm opacity-80">
              Top titles with healthy availability—hand-picked from our catalog.
            </p>
          </div>
          <Link href="/books" className="link link-hover text-sm font-medium">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <HomeSwiper books={carouselSource} />

      <section className="border-t border-[color-mix(in_oklab,var(--library-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--library-ink)_4%,var(--library-paper))] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--library-ink)]">
            How digital borrowing works
          </h2>
          <p className="mt-2 max-w-2xl text-sm opacity-80">
            Three calm steps from discovery to your reading nook—no late fees,
            just mindful returns.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Explore & filter",
                body: "Search by title or narrow the left sidebar by Story, Tech, or Science.",
              },
              {
                step: "02",
                title: "Open details",
                body: "Signed-in readers unlock full blurbs, cover art, and live copy counts.",
              },
              {
                step: "03",
                title: "Borrow instantly",
                body: "One confirmation updates availability so the next reader sees truth.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl bg-base-100 p-6 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]"
              >
                <p className="text-sm font-bold text-[var(--library-sage)]">
                  {item.step}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed opacity-80">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
