// ============================================
// Property Controller — Request/Response Handling
// ============================================

import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { propertyService } from "@/services/property.service";
import { PropertySearchFilters, CreatePropertyDTO } from "@/types/property.types";
import {
  createPropertySchema,
  updatePropertySchema,
  propertySearchSchema,
} from "@/utils/validators";
import {
  successResponse,
  createdResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
} from "@/utils/apiResponse";
import { isValidObjectId } from "@/utils/helpers";
import { logger } from "@/utils/logger";

export class PropertyController {
  /**
   * GET /api/v1/properties
   * Search/list properties with filters
   */
  static async getAll(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);

      // Parse and validate search filters
      const params = Object.fromEntries(searchParams.entries());
      const validation = propertySearchSchema.safeParse(params);

      if (!validation.success) {
        const errors: Record<string, string[]> = {};
        validation.error.issues.forEach((err) => {
          const key = err.path.join(".");
          if (!errors[key]) errors[key] = [];
          errors[key].push(err.message);
        });
        return validationErrorResponse(errors);
      }

      const result = await propertyService.searchProperties(validation.data as PropertySearchFilters);

      logger.request("GET", "/api/v1/properties", 200);
      return successResponse(result.data, "Properties fetched", 200, result.meta);
    } catch (error) {
      logger.error("Failed to fetch properties", "PropertyController.getAll", error);
      return errorResponse("Internal server error", 500);
    }
  }

  /**
   * GET /api/v1/properties/[id]
   * Get single property by ID or slug
   */
  static async getById(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;

      let property;
      if (isValidObjectId(id)) {
        property = await propertyService.findById(id, undefined, "provider");
      } else {
        // Treat as slug
        property = await propertyService.getPropertyBySlug(id);
      }

      if (!property) {
        return notFoundResponse("Property not found");
      }

      logger.request("GET", `/api/v1/properties/${id}`, 200);
      return successResponse(property, "Property fetched");
    } catch (error) {
      logger.error("Failed to fetch property", "PropertyController.getById", error);
      return errorResponse("Internal server error", 500);
    }
  }

  /**
   * POST /api/v1/properties
   * Create a new property (Provider only)
   */
  static async create(req: NextRequest) {
    try {
      // Check auth
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return unauthorizedResponse();
      }

      // Check role
      if (session.user.role !== "provider" && session.user.role !== "admin") {
        return forbiddenResponse("Only providers can create listings");
      }

      const body = await req.json();

      // Validate input
      const validation = createPropertySchema.safeParse(body);
      if (!validation.success) {
        const errors: Record<string, string[]> = {};
        validation.error.issues.forEach((err) => {
          const key = err.path.join(".");
          if (!errors[key]) errors[key] = [];
          errors[key].push(err.message);
        });
        return validationErrorResponse(errors);
      }

      const property = await propertyService.createProperty(
        validation.data as unknown as CreatePropertyDTO,
        session.user.id
      );

      logger.request("POST", "/api/v1/properties", 201);
      return createdResponse(property, "Property created successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create property";
      logger.error(message, "PropertyController.create", error);
      return errorResponse("Internal server error", 500);
    }
  }

  /**
   * PUT /api/v1/properties/[id]
   * Update a property (Owner or Admin)
   */
  static async update(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return unauthorizedResponse();

      const { id } = await params;
      if (!isValidObjectId(id)) return notFoundResponse("Invalid property ID");

      const body = await req.json();
      const validation = updatePropertySchema.safeParse(body);
      if (!validation.success) {
        const errors: Record<string, string[]> = {};
        validation.error.issues.forEach((err) => {
          const key = err.path.join(".");
          if (!errors[key]) errors[key] = [];
          errors[key].push(err.message);
        });
        return validationErrorResponse(errors);
      }

      // Verify ownership or admin role
      const existing = await propertyService.findById(id);
      if (!existing) return notFoundResponse("Property not found");

      if (
        existing.provider.toString() !== session.user.id &&
        session.user.role !== "admin"
      ) {
        return forbiddenResponse("Not authorized to edit this property");
      }

      const updated = await propertyService.update(
        id,
        validation.data as Partial<typeof existing>
      );

      logger.request("PUT", `/api/v1/properties/${id}`, 200);
      return successResponse(updated, "Property updated successfully");
    } catch (error) {
      logger.error("Failed to update property", "PropertyController.update", error);
      return errorResponse("Internal server error", 500);
    }
  }

  /**
   * DELETE /api/v1/properties/[id]
   * Delete a property (Owner or Admin)
   */
  static async delete(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return unauthorizedResponse();

      const { id } = await params;
      if (!isValidObjectId(id)) return notFoundResponse("Invalid property ID");

      const existing = await propertyService.findById(id);
      if (!existing) return notFoundResponse("Property not found");

      if (
        existing.provider.toString() !== session.user.id &&
        session.user.role !== "admin"
      ) {
        return forbiddenResponse("Not authorized to delete this property");
      }

      await propertyService.delete(id);

      logger.request("DELETE", `/api/v1/properties/${id}`, 200);
      return successResponse(null, "Property deleted successfully");
    } catch (error) {
      logger.error("Failed to delete property", "PropertyController.delete", error);
      return errorResponse("Internal server error", 500);
    }
  }

  /**
   * POST /api/v1/properties/[id]/approve (Admin only)
   */
  static async approve(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return unauthorizedResponse();
      if (session.user.role !== "admin") {
        return forbiddenResponse("Admin access required");
      }

      const { id } = await params;
      const property = await propertyService.approveProperty(id);

      logger.request("POST", `/api/v1/properties/${id}/approve`, 200);
      return successResponse(property, `Property ${property?.status === "approved" ? "approved" : "placed on KYC hold"}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Approval failed";
      logger.error(message, "PropertyController.approve", error);
      return errorResponse(message, 400);
    }
  }

  /**
   * POST /api/v1/properties/[id]/reject (Admin only)
   */
  static async reject(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return unauthorizedResponse();
      if (session.user.role !== "admin") {
        return forbiddenResponse("Admin access required");
      }

      const { id } = await params;
      const property = await propertyService.rejectProperty(id);

      logger.request("POST", `/api/v1/properties/${id}/reject`, 200);
      return successResponse(property, "Property rejected");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Rejection failed";
      logger.error(message, "PropertyController.reject", error);
      return errorResponse(message, 400);
    }
  }
}
