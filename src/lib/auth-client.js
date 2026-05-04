import { createAuthClient } from "better-auth/react";

const publicAppUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
const runtimeBaseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : publicAppUrl || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: runtimeBaseUrl,
});
