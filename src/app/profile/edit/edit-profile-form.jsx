"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function EditProfileForm({ initialName, initialImage }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name,
        image: image.trim() || undefined,
      });
      if (error) {
        toast.error(error.message ?? "Update failed.");
        return;
      }
      toast.success("Profile updated.");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="space-y-4 rounded-2xl bg-base-100 p-6 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]"
    >
      <label className="form-control w-full">
        <span className="label-text font-medium">Name</span>
        <input
          type="text"
          required
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="form-control w-full">
        <span className="label-text font-medium">Image URL</span>
        <input
          type="url"
          className="input input-bordered w-full"
          placeholder="https://…"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="btn w-full bg-[var(--library-sage)] text-[var(--library-paper)] border-none hover:brightness-95"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          "Update information"
        )}
      </button>
    </form>
  );
}
