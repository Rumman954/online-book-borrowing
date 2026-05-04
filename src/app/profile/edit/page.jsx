import Link from "next/link";
import { EditProfileForm } from "./edit-profile-form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Link
        href="/profile"
        className="link link-hover text-sm font-medium opacity-80 hover:opacity-100"
      >
        ← Back to profile
      </Link>
      <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--library-ink)]">
        Update information
      </h1>
      <p className="mt-2 text-sm opacity-80">
        Adjust your display name and avatar image URL.
      </p>
      <div className="mt-8">
        <EditProfileForm
          initialName={session.user.name}
          initialImage={session.user.image ?? ""}
        />
      </div>
    </div>
  );
}
