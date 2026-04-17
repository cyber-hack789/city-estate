// ============================================
// Properties API Route — /api/v1/properties
// ============================================
// Thin route: delegates to PropertyController

import { NextRequest } from "next/server";
import { PropertyController } from "@/controllers/property.controller";

export async function GET(req: NextRequest) {
  return PropertyController.getAll(req);
}

export async function POST(req: NextRequest) {
  return PropertyController.create(req);
}
