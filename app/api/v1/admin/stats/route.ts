// ============================================
// Admin Stats — /api/v1/admin/stats
// ============================================

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { propertyService } from "@/services/property.service";
import { userService } from "@/services/user.service";
import { leadService } from "@/services/lead.service";
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

    const [propertyStatusCounts, totalUsers, totalLeads] = await Promise.all([
      propertyService.getStatusCounts(),
      userService.count({}),
      leadService.count({}),
    ]);

    return successResponse({
      properties: propertyStatusCounts,
      totalUsers,
      totalLeads,
    }, "Admin stats fetched");
  } catch {
    return errorResponse("Internal server error", 500);
  }
}
