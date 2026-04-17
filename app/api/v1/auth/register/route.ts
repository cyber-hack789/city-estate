// ============================================
// Auth Register API Route — /api/v1/auth/register
// ============================================

import { NextRequest } from "next/server";
import { AuthController } from "@/controllers/auth.controller";

export async function POST(req: NextRequest) {
  return AuthController.register(req);
}
