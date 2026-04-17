// ============================================
// User TypeScript Type Definitions
// ============================================

import { Document, Types } from "mongoose";
import {
  UserRole,
  KycStatus,
  PropertyType,
  ListingType,
} from "@/config/constants";

// --- User Profile ---
export interface IUserProfile {
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  bio?: string;
}

// --- User Preferences (for Buyers) ---
export interface IUserPreferences {
  budgetRange?: {
    min: number;
    max: number;
  };
  preferredCities?: string[];
  propertyTypes?: PropertyType[];
  preferredListingType?: ListingType;
}

// --- KYC Document ---
export interface IKycDocument {
  type: string;
  url: string;
  uploadedAt: Date;
}

// --- Core User Interface ---
export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  kycStatus: KycStatus;
  kycDocuments: IKycDocument[];
  profile: IUserProfile;
  preferences: IUserPreferences;
  subscription?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Document type
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// --- DTOs (Data Transfer Objects) ---
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
}

export interface UpdateUserDTO {
  name?: string;
  phone?: string;
  avatar?: string;
  profile?: Partial<IUserProfile>;
  preferences?: Partial<IUserPreferences>;
}

export interface LoginDTO {
  email: string;
  password: string;
}

// --- Safe User (without password) ---
export type SafeUser = Omit<IUser, "password">;
