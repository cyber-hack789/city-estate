// ============================================
// City Estate - Application Constants & Enums
// ============================================

// --- User Roles ---
export const USER_ROLES = {
  BUYER: "buyer",
  PROVIDER: "provider",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// --- KYC Status ---
export const KYC_STATUS = {
  PENDING: "pending",
  SUBMITTED: "submitted",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;

export type KycStatus = (typeof KYC_STATUS)[keyof typeof KYC_STATUS];

// --- Property Types ---
export const PROPERTY_TYPES = {
  APARTMENT: "apartment",
  HOUSE: "house",
  VILLA: "villa",
  PLOT: "plot",
  COMMERCIAL: "commercial",
  PG: "pg",
} as const;

export type PropertyType =
  (typeof PROPERTY_TYPES)[keyof typeof PROPERTY_TYPES];

// --- Listing Types ---
export const LISTING_TYPES = {
  SALE: "sale",
  RENT: "rent",
} as const;

export type ListingType = (typeof LISTING_TYPES)[keyof typeof LISTING_TYPES];

// --- Property Status (KYC-Gated Workflow) ---
// draft → pending → kyc_hold/approved → sold/rented
//                 → rejected
export const PROPERTY_STATUS = {
  DRAFT: "draft",
  PENDING: "pending",
  KYC_HOLD: "kyc_hold",
  APPROVED: "approved",
  REJECTED: "rejected",
  SOLD: "sold",
  RENTED: "rented",
} as const;

export type PropertyStatus =
  (typeof PROPERTY_STATUS)[keyof typeof PROPERTY_STATUS];

// --- Furnishing Types ---
export const FURNISHING_TYPES = {
  FURNISHED: "furnished",
  SEMI_FURNISHED: "semi-furnished",
  UNFURNISHED: "unfurnished",
} as const;

export type FurnishingType =
  (typeof FURNISHING_TYPES)[keyof typeof FURNISHING_TYPES];

// --- Lead Status ---
export const LEAD_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  INTERESTED: "interested",
  CONVERTED: "converted",
  CLOSED: "closed",
} as const;

export type LeadStatus = (typeof LEAD_STATUS)[keyof typeof LEAD_STATUS];

// --- Notification Types ---
export const NOTIFICATION_TYPES = {
  SYSTEM: "system",
  PRICE_DROP: "price_drop",
  NEW_LEAD: "new_lead",
  PROPERTY_APPROVED: "property_approved",
  PROPERTY_REJECTED: "property_rejected",
  KYC_UPDATE: "kyc_update",
  CHAT_MESSAGE: "chat_message",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

// --- Subscription Plans ---
export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
  ENTERPRISE: "enterprise",
} as const;

export type SubscriptionPlan =
  (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS];

// --- API Version ---
export const API_VERSION = "v1" as const;

// --- Pagination Defaults ---
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  MAX_LIMIT: 100,
} as const;

// --- Amenities List ---
export const AMENITIES = [
  "parking",
  "gym",
  "swimming_pool",
  "garden",
  "security",
  "power_backup",
  "lift",
  "club_house",
  "playground",
  "rainwater_harvesting",
  "gas_pipeline",
  "wifi",
  "ac",
  "water_purifier",
  "intercom",
  "fire_safety",
  "cctv",
  "maintenance_staff",
  "visitor_parking",
  "pet_friendly",
] as const;
