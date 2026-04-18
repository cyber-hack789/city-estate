// ============================================
// Login API — /api/v1/auth/login
// ============================================
// Dedicated login endpoint. The frontend calls this via fetch(),
// NOT via NextAuth's signIn() redirect flow.
// This avoids the POST /login → 405 issue on Vercel.

import { NextRequest } from "next/server";
import { AuthController } from "@/controllers/auth.controller";

export async function POST(req: NextRequest) {
  return AuthController.login(req);
}
