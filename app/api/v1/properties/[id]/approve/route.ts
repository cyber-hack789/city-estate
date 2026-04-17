// ============================================
// Admin: Property Approve — /api/v1/properties/[id]/approve
// ============================================

import { NextRequest } from "next/server";
import { PropertyController } from "@/controllers/property.controller";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PropertyController.approve(req, context);
}
