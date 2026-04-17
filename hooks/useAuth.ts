// ============================================
// useAuth Hook — Authentication utilities
// ============================================
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

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect based on role
      if (result?.ok) {
        router.refresh();
      }

      return result;
    },
    [router]
  );

  const logout = useCallback(async () => {
    await signOut({ callbackUrl: "/login" });
  }, []);

  const register = useCallback(
    async (data: { name: string; email: string; password: string; phone?: string; role?: string }) => {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || "Registration failed");
      }

      // Auto-login after registration
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
