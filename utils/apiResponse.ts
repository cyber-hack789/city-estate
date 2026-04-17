// ============================================
// Standardized API Response Builder (Versioned)
// ============================================

import { NextResponse } from "next/server";
import { ApiResponse, PaginationMeta } from "@/types/api.types";
import { API_VERSION } from "@/config/constants";

/**
 * Build a standardized API response with version tag.
 */
function buildResponse<T>(
  data: T | null,
  message: string,
  success: boolean,
  meta?: PaginationMeta
): ApiResponse<T> {
  return {
    success,
    data,
    error: success ? null : message,
    message,
    version: API_VERSION,
    timestamp: new Date().toISOString(),
    ...(meta && { meta }),
  };
}

/**
 * Success response — 200 OK
 */
export function successResponse<T>(
  data: T,
  message = "Success",
  status = 200,
  meta?: PaginationMeta
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(buildResponse(data, message, true, meta), {
    status,
  });
}

/**
 * Created response — 201 Created
 */
export function createdResponse<T>(
  data: T,
  message = "Created successfully"
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(buildResponse(data, message, true), {
    status: 201,
  });
}

/**
 * Error response — dynamic status code
 */
export function errorResponse(
  message: string,
  status = 500,
  errors?: Record<string, string[]>
): NextResponse<ApiResponse<null>> {
  const response = buildResponse<null>(null, message, false);
  if (errors) {
    (response as ApiResponse<null> & { errors?: Record<string, string[]> }).errors = errors;
  }
  return NextResponse.json(response, { status });
}

/**
 * Validation error response — 400 Bad Request
 */
export function validationErrorResponse(
  errors: Record<string, string[]>
): NextResponse<ApiResponse<null>> {
  return errorResponse("Validation failed", 400, errors);
}

/**
 * Unauthorized response — 401
 */
export function unauthorizedResponse(
  message = "Unauthorized"
): NextResponse<ApiResponse<null>> {
  return errorResponse(message, 401);
}

/**
 * Forbidden response — 403
 */
export function forbiddenResponse(
  message = "Forbidden: Insufficient permissions"
): NextResponse<ApiResponse<null>> {
  return errorResponse(message, 403);
}

/**
 * Not found response — 404
 */
export function notFoundResponse(
  message = "Resource not found"
): NextResponse<ApiResponse<null>> {
  return errorResponse(message, 404);
}
