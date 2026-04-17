// ============================================
// Zod Validation Schemas
// ============================================

import { z } from "zod";
import {
  USER_ROLES,
  PROPERTY_TYPES,
  LISTING_TYPES,
  FURNISHING_TYPES,
} from "@/config/constants";

// --- Auth Schemas ---
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase, one lowercase, and one digit"
    ),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .optional(),
  role: z.enum(["buyer", "provider"]).optional().default("buyer"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// --- Property Schemas ---
export const createPropertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(5000),
  propertyType: z.enum(
    Object.values(PROPERTY_TYPES) as [string, ...string[]]
  ),
  listingType: z.enum(Object.values(LISTING_TYPES) as [string, ...string[]]),
  price: z.number().min(0, "Price cannot be negative"),
  bhk: z.number().int().min(1).max(10),
  area: z.number().min(1, "Area must be positive"),
  location: z.object({
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    state: z.string().min(1, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Invalid 6-digit pincode"),
    address: z.string().min(1, "Address is required"),
    coordinates: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
  }),
  amenities: z.array(z.string()).optional().default([]),
  media: z
    .array(
      z.object({
        url: z.string().url("Invalid media URL"),
        type: z.enum(["image", "video", "document"]).default("image"),
        caption: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  furnishing: z.enum(
    Object.values(FURNISHING_TYPES) as [string, ...string[]]
  ),
  availableFrom: z.string().datetime().optional(),
});

export const updatePropertySchema = createPropertySchema.partial();

export const propertySearchSchema = z.object({
  city: z.string().optional(),
  area: z.string().optional(),
  propertyType: z
    .enum(Object.values(PROPERTY_TYPES) as [string, ...string[]])
    .optional(),
  listingType: z
    .enum(Object.values(LISTING_TYPES) as [string, ...string[]])
    .optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  bhk: z.coerce.number().int().min(1).max(10).optional(),
  furnishing: z
    .enum(Object.values(FURNISHING_TYPES) as [string, ...string[]])
    .optional(),
  query: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

// --- Lead Schemas ---
export const createLeadSchema = z.object({
  property: z.string().min(1, "Property ID is required"),
  message: z.string().min(1).max(1000, "Message cannot exceed 1000 characters"),
  contactPreference: z.enum(["email", "phone", "both"]).default("both"),
});

// --- User Update Schema ---
export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number")
    .optional(),
  profile: z
    .object({
      company: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      bio: z.string().max(500).optional(),
    })
    .optional(),
  preferences: z
    .object({
      budgetRange: z
        .object({
          min: z.number().min(0),
          max: z.number().min(0),
        })
        .optional(),
      preferredCities: z.array(z.string()).optional(),
      propertyTypes: z.array(z.string()).optional(),
      preferredListingType: z.string().optional(),
    })
    .optional(),
});

// --- Type Exports ---
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
export type UpdatePropertyInput = z.infer<typeof updatePropertySchema>;
export type PropertySearchInput = z.infer<typeof propertySearchSchema>;
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
