import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getBookById } from "@/lib/books";
import { BorrowButton } from "./borrow-button";
import { ReviewsPanel } from "./reviews-panel";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({ params }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;
  const book = await getBookById(id);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link
        href="/books"
        className="link link-hover text-sm font-medium opacity-80 hover:opacity-100"
      >
        ← Back to All Books
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-md overflow-hidden rounded-3xl bg-base-200 shadow-xl ring-1 ring-[color-mix(in_oklab,var(--library-ink)_10%,transparent)]">
          <Image
            src={book.image_url}
            alt={book.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:1024px) 100vw, 448px"
          />
        </div>

        <div className="flex flex-col justify-center gap-6">
          <span className="badge badge-outline w-fit border-[var(--library-sage)]">
            {book.category}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-[var(--library-ink)] md:text-5xl">
            {book.title}
          </h1>
          <p className="text-lg font-medium opacity-80">by {book.author}</p>
          <p className="leading-relaxed opacity-85">{book.description}</p>
          <p className="text-lg font-semibold text-[var(--library-sage)]">
            {book.available_quantity > 0
              ? `${book.available_quantity} ${
                  book.available_quantity === 1 ? "copy" : "copies"
                } left`
              : "Coming Soon"}
          </p>
          <BorrowButton bookId={book.id} initialAvailable={book.available_quantity} />
        </div>
      </div>
      <ReviewsPanel bookId={book.id} />
    </div>
  );
}
