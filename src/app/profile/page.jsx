import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const u = session.user;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--library-ink)]">
        My Profile
      </h1>
      <p className="mt-2 text-sm opacity-80">
        Your borrowing identity—kept in sync with Better Auth.
      </p>

      <div className="mt-10 flex flex-col gap-8 rounded-2xl bg-base-100 p-8 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)] md:flex-row md:items-start">
        <div className="relative mx-auto h-32 w-32 shrink-0 overflow-hidden rounded-full bg-base-200 ring-2 ring-[var(--library-sage)]">
          {u.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={u.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-3xl">📖</div>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-3 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
              Name
            </p>
            <p className="text-lg font-semibold">{u.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
              Email
            </p>
            <p className="break-all">{u.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
              User ID
            </p>
            <p className="break-all font-mono text-xs opacity-80">{u.id}</p>
          </div>
          <div className="pt-4">
            <Link
              href="/profile/edit"
              className="btn bg-[var(--library-accent)] text-[var(--library-paper)] border-none hover:brightness-95"
            >
              Update information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
