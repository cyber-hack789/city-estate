// ============================================
// Property TypeScript Type Definitions
// ============================================

import { Document, Types } from "mongoose";
import {
  PropertyType,
  ListingType,
  PropertyStatus,
  FurnishingType,
} from "@/config/constants";

// --- Location ---
export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface ILocation {
  city: string;
  area: string;
  state: string;
  pincode: string;
  address: string;
  coordinates?: ICoordinates;
}

// --- Media (ImageKit) ---
export interface IMedia {
  url: string;
  type: "image" | "video" | "document";
  caption?: string;
}

// --- Core Property Interface ---
export interface IProperty {
  title: string;
  slug: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  bhk: number;
  area: number;
  location: ILocation;
  amenities: string[];
  media: IMedia[];
  provider: Types.ObjectId;
  status: PropertyStatus;
  isVerified: boolean;
  isFeatured: boolean;
  views: number;
  furnishing: FurnishingType;
  availableFrom?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Document type
export interface IPropertyDocument extends IProperty, Document {
  _id: Types.ObjectId;
}

// --- DTOs ---
export interface CreatePropertyDTO {
  title: string;
  description: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  bhk: number;
  area: number;
  location: Omit<ILocation, "coordinates"> & { coordinates?: ICoordinates };
  amenities?: string[];
  media?: IMedia[];
  furnishing: FurnishingType;
  availableFrom?: Date;
}

export interface UpdatePropertyDTO {
  title?: string;
  description?: string;
  propertyType?: PropertyType;
  listingType?: ListingType;
  price?: number;
  bhk?: number;
  area?: number;
  location?: Partial<ILocation>;
  amenities?: string[];
  media?: IMedia[];
  furnishing?: FurnishingType;
  availableFrom?: Date;
  isFeatured?: boolean;
}

// --- Search Filters ---
export interface PropertySearchFilters {
  city?: string;
  area?: string;
  propertyType?: PropertyType;
  listingType?: ListingType;
  minPrice?: number;
  maxPrice?: number;
  bhk?: number;
  furnishing?: FurnishingType;
  amenities?: string[];
  query?: string; // text search
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
