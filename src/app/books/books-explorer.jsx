"use client";

import { useEffect, useState } from "react";
import { BookCard } from "@/components/book-card";

const categories = ["All", "Story", "Tech", "Science"];

export function BooksExplorer() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== "All") params.set("category", category);
        if (debounced.trim()) params.set("search", debounced.trim());
        const res = await fetch(`/api/books?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!cancelled) setBooks(data);
      } catch {
        if (!cancelled) setBooks([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [category, debounced]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 lg:flex-row lg:items-start">
      <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-56">
        <div className="rounded-2xl bg-base-100 p-4 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
            Categories
          </h2>
          <p className="mt-1 text-xs opacity-70">
            Filter the catalog—combine with search above.
          </p>
          <ul className="menu rounded-box mt-4 bg-base-200/50 p-0">
            {categories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  className={c === category ? "active font-semibold" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="min-w-0 flex-1 space-y-6">
        <label className="form-control w-full">
          <span className="label-text mb-2 text-sm font-medium">
            Search by title
          </span>
          <input
            type="search"
            placeholder="Type a title…"
            className="input input-bordered input-lg w-full border-[color-mix(in_oklab,var(--library-ink)_15%,transparent)] bg-base-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-[var(--library-sage)]" />
          </div>
        ) : books.length === 0 ? (
          <p className="rounded-box bg-base-200/50 p-8 text-center text-sm opacity-80">
            No books match your filters. Try another category or keyword.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book.id} book={book} detailsLabel="Details" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
