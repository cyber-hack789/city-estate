// ============================================
// Users API — /api/v1/users (Admin)
// ============================================

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { userService } from "@/services/user.service";
import {
  successResponse,
  errorResponse,
  unauthorizedResponse,
  forbiddenResponse,
} from "@/utils/apiResponse";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return unauthorizedResponse();
    if (session.user.role !== "admin") return forbiddenResponse();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    const result = await userService.findAll({}, { page, limit });
    return successResponse(result.data, "Users fetched", 200, result.meta);
  } catch {
    return errorResponse("Internal server error", 500);
  }
}
