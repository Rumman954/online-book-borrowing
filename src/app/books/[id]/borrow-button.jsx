"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

function formatDateTime(isoOrDate) {
  const d = new Date(isoOrDate);
  return d.toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BorrowButton({ bookId, initialAvailable }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const borrow = async () => {
    if (isPending) return;
    if (!session?.user) {
      toast.info("Please sign in to borrow this title.");
      router.push(`/login?callbackUrl=${encodeURIComponent(`/books/${bookId}`)}`);
      return;
    }

    try {
      const res = await fetch(`/api/books/${bookId}/borrow`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Could not borrow this book.");
        return;
      }
      const borrowed = data?.borrowInfo?.borrowedAt
        ? formatDateTime(data.borrowInfo.borrowedAt)
        : null;
      const due = data?.borrowInfo?.returnAt
        ? formatDateTime(data.borrowInfo.returnAt)
        : null;

      toast.success(
        borrowed && due
          ? `Borrow confirmed. Borrowed: ${borrowed} | Return by: ${due}`
          : "Borrow confirmed—enjoy your read!",
      );
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    }
  };

  const disabled = initialAvailable <= 0;

  return (
    <button
      type="button"
      className="btn btn-lg w-full bg-[var(--library-accent)] text-[var(--library-paper)] border-none hover:brightness-95 sm:w-auto disabled:opacity-50"
      disabled={disabled}
      onClick={() => void borrow()}
    >
      {disabled ? "Coming Soon" : "Borrow This Book"}
    </button>
  );
}
