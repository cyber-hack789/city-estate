// ============================================
// NextAuth Route Handler — /api/v1/auth/[...nextauth]
// ============================================

import NextAuth from "next-auth";
import { authOptions } from "@/config/auth.config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
