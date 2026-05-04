import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-8 px-4 py-16">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--library-ink)]">
          Register
        </h1>
        <p className="mt-2 text-sm opacity-80">
          Create your reader profile—photo URL helps us personalize your shelf.
        </p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="link font-semibold text-[var(--library-sage)]">
          Login
        </Link>
      </p>
    </div>
  );
}
