import { createAuthClient } from "better-auth/react";

// Same URL on server and client — avoids hydration mismatches if you open 127.0.0.1 vs localhost.
const publicAppUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: publicAppUrl,
});
