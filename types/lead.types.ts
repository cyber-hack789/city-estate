// ============================================
// Lead / Inquiry TypeScript Type Definitions
// ============================================

import { Document, Types } from "mongoose";
import { LeadStatus } from "@/config/constants";

// --- Core Lead Interface ---
export interface ILead {
  property: Types.ObjectId;
  buyer: Types.ObjectId;
  provider: Types.ObjectId;
  status: LeadStatus;
  message: string;
  contactPreference: "email" | "phone" | "both";
  notes?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Document type
export interface ILeadDocument extends ILead, Document {
  _id: Types.ObjectId;
}

// --- DTOs ---
export interface CreateLeadDTO {
  property: string; // Property ID
  message: string;
  contactPreference: "email" | "phone" | "both";
}

export interface UpdateLeadDTO {
  status?: LeadStatus;
  notes?: string;
}
