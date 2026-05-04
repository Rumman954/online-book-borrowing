import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { borrowBook } from "@/lib/books";

export async function POST(request, context) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const result = await borrowBook(id);
    if (!result.ok) {
      if (result.reason === "not_found") {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
      }
      return NextResponse.json(
        { error: "No copies available" },
        { status: 409 },
      );
    }
    return NextResponse.json({ book: result.book });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Borrow failed" },
      { status: 500 },
    );
  }
}
