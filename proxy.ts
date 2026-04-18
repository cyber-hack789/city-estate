// ============================================
// proxy.ts — Next.js 16 Proxy (replaces middleware.ts)
// ============================================
// Runs at the Edge before routes/layouts are executed.
// Handles auth checks, role-based redirects, and path protection.
// IMPORTANT: No Mongoose here — Edge Runtime only.

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Define protected route patterns and their required roles
const protectedRoutes: Record<string, string[]> = {
  "/dashboard/admin": ["admin"],
  "/dashboard/provider": ["provider", "admin"],
  "/dashboard/buyer": ["buyer", "provider", "admin"],
};

// Public routes that don't need auth
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/properties",
  "/search",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, images, and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Skip public API routes that don't need auth
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/v1/auth") ||
    pathname === "/api/v1/properties" ||
    (pathname.startsWith("/api/v1/properties/") && request.method === "GET")
  ) {
    return NextResponse.next();
  }

  // Check if route is public
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Get JWT token from NextAuth (Edge-compatible)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect authenticated users away from auth pages
  if (token && (pathname === "/login" || pathname === "/register")) {
    const dashboardUrl = getDashboardUrl(token.role as string);
    return NextResponse.redirect(new URL(dashboardUrl, request.url));
  }

  // Allow public routes
  if (isPublic) {
    return NextResponse.next();
  }

  // Require auth for protected routes
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    const userRole = token.role as string;

    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole)) {
          // Redirect to their own dashboard
          const correctDashboard = getDashboardUrl(userRole);
          return NextResponse.redirect(new URL(correctDashboard, request.url));
        }
        break;
      }
    }
  }

  // Require auth for all API routes (except public ones handled above)
  if (pathname.startsWith("/api/v1/") && !token) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
        message: "Authentication required",
        version: "v1",
        timestamp: new Date().toISOString(),
        data: null,
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

/**
 * Get the appropriate dashboard URL based on user role
 */
function getDashboardUrl(role: string): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "provider":
      return "/dashboard/provider";
    default:
      return "/dashboard/buyer";
  }
}

export const config = {
  matcher: [
    // Match all routes except static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
