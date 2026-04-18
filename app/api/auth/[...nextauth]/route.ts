// ============================================
// NextAuth Route Handler — /api/auth/[...nextauth]
// ============================================
// NextAuth v4 REQUIRES this to be at /api/auth/ (not /api/v1/auth/)
// The v1 versioned auth routes (register, etc.) stay at /api/v1/auth/

import NextAuth from "next-auth";
import { authOptions } from "@/config/auth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
