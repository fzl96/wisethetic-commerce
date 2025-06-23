import { createAuthClient } from "better-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: BASE_URL,
});
