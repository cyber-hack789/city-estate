// ============================================
// Admin: Property Reject — /api/v1/properties/[id]/reject
// ============================================

import { NextRequest } from "next/server";
import { PropertyController } from "@/controllers/property.controller";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PropertyController.reject(req, context);
}
