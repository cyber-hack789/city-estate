// ============================================
// Leads API — /api/v1/leads
// ============================================

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { leadService } from "@/services/lead.service";
import { createLeadSchema } from "@/utils/validators";
import {
  successResponse,
  createdResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
} from "@/utils/apiResponse";
import { CreateLeadDTO } from "@/types/lead.types";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return unauthorizedResponse();

    const body = await req.json();
    const validation = createLeadSchema.safeParse(body);
    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.issues.forEach((err) => {
        const key = err.path.join(".");
        if (!errors[key]) errors[key] = [];
        errors[key].push(err.message);
      });
      return validationErrorResponse(errors);
    }

    const lead = await leadService.createLead(
      validation.data as unknown as CreateLeadDTO,
      session.user.id
    );
    return createdResponse(lead, "Inquiry sent successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create inquiry";
    if (message.includes("already") || message.includes("not found") || message.includes("unapproved")) {
      return errorResponse(message, 400);
    }
    return errorResponse("Internal server error", 500);
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return unauthorizedResponse();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    let result;
    if (session.user.role === "provider" || session.user.role === "admin") {
      result = await leadService.getProviderLeads(session.user.id, page, limit);
    } else {
      result = await leadService.getBuyerLeads(session.user.id, page, limit);
    }

    return successResponse(result.data, "Leads fetched", 200, result.meta);
  } catch {
    return errorResponse("Internal server error", 500);
  }
}
