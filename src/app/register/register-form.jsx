"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoUrl.trim() || undefined,
      });
      if (error) {
        toast.error(error.message ?? "Registration failed.");
        return;
      }
      await authClient.signOut();
      toast.success("Account created. Please sign in.");
      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error(
        "Google sign-in is not available. Check Google OAuth environment variables.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => void onSubmit(e)}
        className="space-y-4 rounded-2xl bg-base-100 p-6 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]"
      >
        <label className="form-control w-full">
          <span className="label-text font-medium">Name</span>
          <input
            type="text"
            required
            autoComplete="name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-medium">Photo URL</span>
          <input
            type="url"
            placeholder="https://…"
            className="input input-bordered w-full"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <span className="label-text font-medium">Password</span>
          <input
            type="password"
            required
            autoComplete="new-password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            "Register"
          )}
        </button>
      </form>

      <button
        type="button"
        className="btn btn-outline w-full border-[color-mix(in_oklab,var(--library-ink)_20%,transparent)]"
        onClick={() => void google()}
      >
        Continue with Google
      </button>
    </div>
  );
}
