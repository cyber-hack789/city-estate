// ============================================
// Lead / Inquiry Mongoose Model
// ============================================

import mongoose, { Schema, models, model } from "mongoose";
import { ILeadDocument } from "@/types/lead.types";
import { LEAD_STATUS } from "@/config/constants";

const LeadSchema = new Schema<ILeadDocument>(
  {
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Property reference is required"],
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Buyer reference is required"],
    },
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider reference is required"],
    },
    status: {
      type: String,
      enum: Object.values(LEAD_STATUS),
      default: LEAD_STATUS.NEW,
    },
    message: {
      type: String,
      required: [true, "Inquiry message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    contactPreference: {
      type: String,
      enum: ["email", "phone", "both"],
      default: "both",
    },
    notes: {
      type: String,
      default: null,
    },
    respondedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// --- Indexes ---
LeadSchema.index({ provider: 1, status: 1 });
LeadSchema.index({ buyer: 1, createdAt: -1 });
LeadSchema.index({ property: 1 });
// Prevent duplicate leads from same buyer for same property
LeadSchema.index({ buyer: 1, property: 1 }, { unique: true });

const Lead =
  (models.Lead as mongoose.Model<ILeadDocument>) ||
  model<ILeadDocument>("Lead", LeadSchema);

export default Lead;
