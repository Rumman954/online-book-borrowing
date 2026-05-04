"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

function stars(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

export function ReviewsPanel({ bookId }) {
  const storageKey = useMemo(() => `book_reviews_${bookId}`, [bookId]);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setReviews(parsed);
    } catch {
      // Ignore invalid local storage values.
    }
  }, [storageKey]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error("Please add your name and review.");
      return;
    }
    const next = [
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
      },
      ...reviews,
    ];
    setReviews(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setName("");
    setRating(5);
    setComment("");
    toast.success("Review added.");
  };

  return (
    <section className="mt-12 rounded-2xl bg-base-100 p-6 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
        Reviews
      </h2>
      <p className="mt-1 text-sm opacity-75">
        Share your thoughts about this book.
      </p>

      <form onSubmit={submit} className="mt-6 grid gap-3 md:grid-cols-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="select select-bordered w-full"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>5 - Excellent</option>
          <option value={4}>4 - Good</option>
          <option value={3}>3 - Average</option>
          <option value={2}>2 - Fair</option>
          <option value={1}>1 - Poor</option>
        </select>
        <textarea
          className="textarea textarea-bordered md:col-span-2"
          placeholder="Write your review..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="btn md:col-span-2 bg-[var(--library-sage)] text-[var(--library-paper)] border-none hover:brightness-95"
        >
          Add Review
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {reviews.length === 0 ? (
          <p className="text-sm opacity-70">No reviews yet. Be the first one.</p>
        ) : (
          reviews.map((r) => (
            <article
              key={r.id}
              className="rounded-xl bg-base-200/50 p-4 ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-[var(--library-sage)]">
                  {stars(r.rating)}
                </p>
              </div>
              <p className="mt-2 text-sm opacity-85">{r.comment}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
