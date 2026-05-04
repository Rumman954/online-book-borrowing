import { NextResponse } from "next/server";
import { listBooks } from "@/lib/books";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limitRaw = searchParams.get("limit");
    const parsed = limitRaw ? parseInt(limitRaw, 10) : NaN;
    const limit =
      Number.isFinite(parsed) && parsed > 0 ? Math.min(50, parsed) : null;
    const validCategories = ["Story", "Tech", "Science"];
    const cat =
      category && validCategories.includes(category) ? category : null;

    const books = await listBooks({
      category: cat,
      search,
      limit,
    });
    return NextResponse.json(books);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load books" },
      { status: 500 },
    );
  }
}
