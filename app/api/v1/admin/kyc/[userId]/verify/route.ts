// ============================================
// Admin: KYC Verify — /api/v1/admin/kyc/[userId]/verify
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

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return unauthorizedResponse();
    if (session.user.role !== "admin") return forbiddenResponse();

    const { userId } = await params;
    const user = await userService.verifyKyc(userId);

    if (!user) return errorResponse("User not found", 404);
    return successResponse(user, "KYC verified and properties auto-approved");
  } catch (error) {
    const message = error instanceof Error ? error.message : "KYC verification failed";
    return errorResponse(message, 400);
  }
}
