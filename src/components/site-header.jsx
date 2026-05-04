"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function SiteHeader() {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_oklab,var(--library-ink)_12%,transparent)] bg-[color-mix(in_oklab,var(--library-paper)_92%,white)] backdrop-blur-md">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start w-auto flex-1 gap-2 md:flex-none">
          <Link
            href="/"
            className="btn btn-ghost text-lg font-semibold tracking-tight font-[family-name:var(--font-display)] text-[var(--library-ink)]"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--library-sage)] text-[var(--library-paper)]">
              📚
            </span>
            <span className="hidden sm:inline">Shelves &amp; Stories</span>
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm font-medium">
            <li>
              <Link href="/" className="rounded-btn">
                Home
              </Link>
            </li>
            <li>
              <Link href="/books" className="rounded-btn">
                All Books
              </Link>
            </li>
            <li>
              <Link href="/profile" className="rounded-btn">
                My Profile
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end w-auto flex-1 justify-end gap-2">
          <ul className="menu menu-horizontal md:hidden">
            <li>
              <details className="dropdown dropdown-end">
                <summary className="btn btn-ghost btn-sm">Menu</summary>
                <ul className="dropdown-content menu z-50 mt-2 w-40 rounded-box bg-base-100 p-2 shadow-lg">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/books">All Books</Link>
                  </li>
                  <li>
                    <Link href="/profile">My Profile</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : session?.user ? (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span className="hidden max-w-[10rem] truncate text-sm font-medium sm:inline">
                {session.user.name}
              </span>
              <button
                type="button"
                className="btn btn-outline btn-sm border-[var(--library-sage)] text-[var(--library-ink)]"
                onClick={() => void handleLogout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-sm bg-[var(--library-sage)] text-[var(--library-paper)] border-none hover:brightness-95">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
