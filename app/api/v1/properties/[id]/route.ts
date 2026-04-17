// ============================================
// Property by ID/Slug — /api/v1/properties/[id]
// ============================================

import { NextRequest } from "next/server";
import { PropertyController } from "@/controllers/property.controller";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PropertyController.getById(req, context);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PropertyController.update(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PropertyController.delete(req, context);
}
