import { createAuthClient } from "better-auth/react";

const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
const fallbackBaseUrl =
  typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: publicAppUrl || fallbackBaseUrl,
});
