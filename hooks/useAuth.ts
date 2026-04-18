// ============================================
// useAuth Hook — Authentication utilities
// ============================================
// 
// KEY DESIGN: Login uses signIn("credentials", { redirect: false })
// which POSTs to /api/auth/callback/credentials (NOT to /login).
// The redirect: false prevents NextAuth from doing a full-page
// POST redirect to pages.signIn, which would cause 405 on Vercel
// because static pages only accept GET.
//
"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useAuth() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user ?? null;

  /**
   * Login via NextAuth Credentials provider.
   * Uses signIn() with redirect: false → POSTs to /api/auth/callback/credentials.
   * NEVER POSTs to /login (that would cause 405 on Vercel).
   */
  const login = useCallback(
    async (email: string, password: string) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,  // ← CRITICAL: prevents POST to /login
        callbackUrl: "/",  // ← Only used if redirect were true (it's not)
      });

      if (result?.error) {
        // NextAuth returns generic "CredentialsSignin" for bad credentials
        if (result.error === "CredentialsSignin") {
          throw new Error("Invalid email or password");
        }
        throw new Error(result.error);
      }

      if (!result?.ok) {
        throw new Error("Login failed. Please try again.");
      }

      // Refresh to get updated session data
      router.refresh();
      return result;
    },
    [router]
  );

  /**
   * Logout and redirect to homepage
   */
  const logout = useCallback(async () => {
    await signOut({ callbackUrl: "/" });
  }, []);

  /**
   * Register via our API, then auto-login via NextAuth signIn().
   * Flow: POST /api/v1/auth/register → signIn("credentials") → JWT
   */
  const register = useCallback(
    async (data: { name: string; email: string; password: string; phone?: string; role?: string }) => {
      // Step 1: Create user via our API
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || result.message || "Registration failed");
      }

      // Step 2: Auto-login via NextAuth (creates JWT token)
      await login(data.email, data.password);

      return result;
    },
    [login]
  );

  return {
    user,
    session,
    status,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateSession: update,
  };
}
