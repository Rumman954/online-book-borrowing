import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}
const mongoUri = uri;

const dbName = process.env.MONGODB_DB_NAME ?? "online_book_borrowing";

const globalForMongo = globalThis;

function getClient() {
  if (!globalForMongo.__mongoClient) {
    globalForMongo.__mongoClient = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5_000,
      connectTimeoutMS: 5_000,
      socketTimeoutMS: 20_000,
    });
  }
  return globalForMongo.__mongoClient;
}

let connectPromise;

export async function getDb() {
  const client = getClient();
  if (!connectPromise) {
    connectPromise = client.connect().catch((err) => {
      connectPromise = undefined;
      throw err;
    });
  }
  await connectPromise;
  return client.db(dbName);
}
