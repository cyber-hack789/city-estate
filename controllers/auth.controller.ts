// ============================================
// Auth Controller — Request/Response Handling
// ============================================
// Thin layer: parse request → validate → call service → return response

import { NextRequest } from "next/server";
import { authService } from "@/services/auth.service";
import { registerSchema, loginSchema } from "@/utils/validators";
import {
  successResponse,
  createdResponse,
  errorResponse,
  validationErrorResponse,
  unauthorizedResponse,
} from "@/utils/apiResponse";
import { logger } from "@/utils/logger";

export class AuthController {
  /**
   * POST /api/v1/auth/register
   * Register a new user
   */
  static async register(req: NextRequest) {
    try {
      const body = await req.json();

      // Validate input with Zod
      const validation = registerSchema.safeParse(body);
      if (!validation.success) {
        const errors: Record<string, string[]> = {};
        validation.error.issues.forEach((err) => {
          const key = err.path.join(".");
          if (!errors[key]) errors[key] = [];
          errors[key].push(err.message);
        });
        return validationErrorResponse(errors);
      }

      const user = await authService.register(validation.data);

      logger.request("POST", "/api/v1/auth/register", 201);
      return createdResponse(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "User registered successfully"
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";

      if (message === "Email already registered") {
        logger.request("POST", "/api/v1/auth/register", 409);
        return errorResponse(message, 409);
      }

      logger.error(message, "AuthController.register", error);
      logger.request("POST", "/api/v1/auth/register", 500);

      // Surface connection errors in development
      if (process.env.NODE_ENV === "development") {
        return errorResponse(message, 500);
      }
      return errorResponse("Internal server error", 500);
    }
  }

  /**
   * POST /api/v1/auth/login
   * Validate credentials (used outside NextAuth flow if needed)
   */
  static async login(req: NextRequest) {
    try {
      const body = await req.json();

      const validation = loginSchema.safeParse(body);
      if (!validation.success) {
        const errors: Record<string, string[]> = {};
        validation.error.issues.forEach((err) => {
          const key = err.path.join(".");
          if (!errors[key]) errors[key] = [];
          errors[key].push(err.message);
        });
        return validationErrorResponse(errors);
      }

      const user = await authService.login(validation.data);
      if (!user) {
        logger.request("POST", "/api/v1/auth/login", 401);
        return unauthorizedResponse("Invalid email or password");
      }

      logger.request("POST", "/api/v1/auth/login", 200);
      return successResponse(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        "Login successful"
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";

      if (message === "Account has been deactivated") {
        logger.request("POST", "/api/v1/auth/login", 403);
        return errorResponse(message, 403);
      }

      logger.error(message, "AuthController.login", error);
      logger.request("POST", "/api/v1/auth/login", 500);
      return errorResponse("Internal server error", 500);
    }
  }
}
