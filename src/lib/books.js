import { getDb } from "@/lib/mongodb";
import { BOOKS_SEED } from "@/lib/books-seed";

const COLLECTION = "books";
const BORROWS = "borrows";
const META = "_app_meta";
const SEED_LOCK_ID = "books_seed_v2";

/** Same logical book can appear twice if concurrent requests seeded before the fix. */
function dedupeBooksById(books) {
  const seen = new Set();
  const out = [];
  for (const b of books) {
    if (!b?.id || seen.has(b.id)) continue;
    seen.add(b.id);
    out.push(b);
  }
  return out;
}

export async function ensureBooksSeeded() {
  const db = await getDb();
  const meta = db.collection(META);
  const col = db.collection(COLLECTION);

  let lockRes;
  try {
    lockRes = await meta.updateOne(
      { _id: SEED_LOCK_ID },
      { $setOnInsert: { createdAt: new Date() } },
      { upsert: true },
    );
  } catch (e) {
    // Concurrent upserts: only one insert wins on this _id.
    if (e?.code !== 11000) throw e;
    lockRes = { upsertedCount: 0 };
  }

  if (lockRes.upsertedCount === 1) {
    try {
      // Keep only the uploaded seed books. Remove anything else, then reinsert exactly 12 records.
      await col.deleteMany({});
      await col.insertMany(BOOKS_SEED.map((b) => ({ ...b })));
    } finally {
      await meta.deleteOne({ _id: SEED_LOCK_ID }).catch(() => {});
    }
    return;
  }

  for (let i = 0; i < 120; i++) {
    if ((await col.countDocuments()) > 0) return;
    await new Promise((r) => setTimeout(r, 50));
  }

  // Another request may have crashed while holding the seed lock; release it so a retry can seed.
  await meta.deleteOne({ _id: SEED_LOCK_ID }).catch(() => {});
}

export async function listBooks(filters = {}) {
  await ensureBooksSeeded();
  const db = await getDb();
  const col = db.collection(COLLECTION);
  const query = {};
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.search?.trim()) {
    query.title = {
      $regex: filters.search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      $options: "i",
    };
  }
  let cursor = col
    .find(query, { projection: { _id: 0 } })
    .sort({ available_quantity: -1, title: 1 });
  if (filters.limit && filters.limit > 0) {
    cursor = cursor.limit(filters.limit);
  }
  return dedupeBooksById(await cursor.toArray());
}

export async function getBookById(id) {
  await ensureBooksSeeded();
  const db = await getDb();
  const col = db.collection(COLLECTION);
  return col.findOne({ id }, { projection: { _id: 0 } });
}

export async function borrowBook(id, user) {
  await ensureBooksSeeded();
  const db = await getDb();
  const col = db.collection(COLLECTION);
  const borrowsCol = db.collection(BORROWS);
  const result = await col.findOneAndUpdate(
    { id, available_quantity: { $gt: 0 } },
    { $inc: { available_quantity: -1 } },
    { returnDocument: "after", projection: { _id: 0 } },
  );
  const book = result ?? null;
  if (!book) {
    const exists = await col.findOne({ id });
    if (!exists) return { ok: false, reason: "not_found" };
    return { ok: false, reason: "unavailable" };
  }

  const borrowedAt = new Date();
  const returnAt = new Date(borrowedAt.getTime() + 14 * 24 * 60 * 60 * 1000);

  if (user?.id) {
    await borrowsCol.insertOne({
      userId: user.id,
      userEmail: user.email ?? null,
      bookId: book.id,
      bookTitle: book.title,
      borrowedAt,
      returnAt,
      returned: false,
    });
  }

  return { ok: true, book, borrowInfo: { borrowedAt, returnAt } };
}
