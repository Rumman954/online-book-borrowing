import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Missing environment variable: "MONGODB_URI"');
}

const dbName = process.env.MONGODB_DB_NAME ?? "online_book_borrowing";
const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`
  : null;
const trustedOrigins = [
  "http://localhost:3000",
  "https://*.vercel.app",
  process.env.BETTER_AUTH_URL,
  process.env.NEXT_PUBLIC_APP_URL,
  vercelUrl,
]
  .filter(Boolean)
  .map((url) => url.replace(/\/$/, ""));

const mongoClient = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5_000,
  connectTimeoutMS: 5_000,
  socketTimeoutMS: 20_000,
});

const db = mongoClient.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          },
        }
      : {}),
  },
  trustedOrigins,
  plugins: [nextCookies()],
});
