"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export function LoginForm({ callbackUrl }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = callbackUrl?.startsWith("/") ? callbackUrl : "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: redirectTo,
      });
      if (error) {
        toast.error(error.message ?? "Invalid email or password.");
        return;
      }
      toast.success("Signed in successfully.");
      router.push(redirectTo);
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
      <form onSubmit={(e) => void onSubmit(e)} className="space-y-4 rounded-2xl bg-base-100 p-6 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]">
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
          <span className="label-text font-medium">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
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
            "Login"
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
