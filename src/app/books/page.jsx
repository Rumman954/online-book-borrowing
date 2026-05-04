import { BooksExplorer } from "./books-explorer";

export default function BooksPage() {
  return (
    <div>
      <div className="border-b border-[color-mix(in_oklab,var(--library-ink)_10%,transparent)] bg-[color-mix(in_oklab,var(--library-sage)_12%,var(--library-paper))] px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold text-[var(--library-ink)]">
            All Books
          </h1>
          <p className="mt-2 max-w-2xl text-sm opacity-80">
            Search the full shelf and refine with the category sidebar—every
            card links to richer details for signed-in readers.
          </p>
        </div>
      </div>
      <BooksExplorer />
    </div>
  );
}
