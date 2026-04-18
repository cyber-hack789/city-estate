// ============================================
// Auth Provider — NextAuth Session Provider Wrapper
// ============================================
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider
      // Ensure session fetching uses the correct path
      basePath="/api/auth"
      // Refetch session every 5 minutes to keep it fresh
      refetchInterval={5 * 60}
      // Refetch when window gains focus
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
