// ============================================
// NextAuth v4 Configuration
// ============================================
// Uses built-in JWT — no jsonwebtoken package needed.
// Credentials provider for email/password login.
//
// IMPORTANT: When using Credentials provider with JWT strategy,
// do NOT use a database adapter. The adapter conflicts with
// Credentials — NextAuth docs explicitly state this.

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authService } from "@/services/auth.service";

export const authOptions: NextAuthOptions = {
  // NO adapter — Credentials + JWT doesn't need one.
  // Our User model handles persistence directly.

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await authService.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!user) return null;

          // Return user object for JWT
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            kycStatus: user.kycStatus,
            avatar: user.avatar || undefined,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  // Use JWT strategy (required for Credentials provider)
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    /**
     * JWT callback — inject custom fields into the token
     */
    async jwt({ token, user, trigger, session }) {
      // On initial sign in, add user data to token
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.kycStatus = user.kycStatus;
        token.avatar = user.avatar;
      }

      // Support updating session from client via update()
      if (trigger === "update" && session) {
        if (session.role) token.role = session.role;
        if (session.kycStatus) token.kycStatus = session.kycStatus;
        if (session.avatar) token.avatar = session.avatar;
      }

      return token;
    },

    /**
     * Session callback — expose token data to the client session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.kycStatus = token.kycStatus;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};
