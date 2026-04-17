// ============================================
// General Helper Functions
// ============================================

/**
 * Generate a URL-friendly slug from a string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Generate a unique slug with a timestamp suffix
 */
export function uniqueSlug(text: string): string {
  const base = slugify(text);
  const suffix = Date.now().toString(36);
  return `${base}-${suffix}`;
}

/**
 * Format price in INR (Indian Rupees)
 */
export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

/**
 * Format area in square feet
 */
export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString("en-IN")} sq.ft.`;
}

/**
 * Validate MongoDB ObjectId format
 */
export function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

/**
 * Parse pagination params from URL search params
 */
export function parsePagination(searchParams: URLSearchParams): {
  page: number;
  limit: number;
  skip: number;
} {
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit") || "12", 10))
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

/**
 * Parse sort params from URL search params
 */
export function parseSort(searchParams: URLSearchParams): Record<string, 1 | -1> {
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
  return { [sortBy]: sortOrder as 1 | -1 };
}

/**
 * Omit specified keys from an object
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

/**
 * Delay execution (useful for rate limiting / testing)
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
