import Link from "next/link";
import { LoginForm } from "./login-form";

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 px-4 py-16">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--library-ink)]">
          Login
        </h1>
        <p className="mt-2 text-sm opacity-80">
          Welcome back—sign in to unlock book details and borrowing.
        </p>
      </div>
      <LoginForm callbackUrl={callbackUrl} />
      <p className="text-center text-sm">
        New here?{" "}
        <Link href="/register" className="link font-semibold text-[var(--library-sage)]">
          Create an account
        </Link>
      </p>
    </div>
  );
}
