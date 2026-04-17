// ============================================
// API Response TypeScript Type Definitions
// ============================================

import { API_VERSION } from "@/config/constants";

// --- Standardized API Response ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  error: string | null;
  message: string;
  version: typeof API_VERSION;
  timestamp: string;
  meta?: PaginationMeta;
}

// --- Pagination Meta ---
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// --- Query Options ---
export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
  select?: string;
  populate?: string | string[];
}

// --- Error Response ---
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}
