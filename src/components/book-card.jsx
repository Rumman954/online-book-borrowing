import Image from "next/image";
import Link from "next/link";

export function BookCard({
  book,
  detailsLabel = "View Details",
  detailsHref,
}) {
  const href = detailsHref ?? `/books/${book.id}`;
  return (
    <div className="card border border-[color-mix(in_oklab,var(--library-ink)_10%,transparent)] bg-base-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <figure className="relative aspect-[2/3] w-full overflow-hidden bg-base-200">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 280px"
        />
      </figure>
      <div className="card-body gap-3 p-4">
        <div>
          <span className="badge badge-outline badge-sm border-[var(--library-sage)] text-[var(--library-ink)]">
            {book.category}
          </span>
          <h2 className="card-title mt-2 line-clamp-2 font-[family-name:var(--font-display)] text-base leading-snug">
            {book.title}
          </h2>
          <p className="text-sm opacity-70">{book.author}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--library-sage)]">
            ৳{book.price}
          </p>
        </div>
        <div className="card-actions mt-auto justify-end">
          <Link href={href} className="btn btn-sm bg-[var(--library-sage)] text-[var(--library-paper)] border-none hover:brightness-95">
            {detailsLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
