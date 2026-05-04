import { NextResponse } from "next/server";
import { getBookById } from "@/lib/books";

export async function GET(_request, context) {
  try {
    const { id } = await context.params;
    const book = await getBookById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load book" },
      { status: 500 },
    );
  }
}
