// ============================================
// Admin Log Mongoose Model (Audit Trail)
// ============================================

import mongoose, { Schema, models, model, Document, Types } from "mongoose";

export interface IAdminLog {
  admin: Types.ObjectId;
  action: string;
  entity: string;
  entityId?: Types.ObjectId;
  details: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: Date;
}

export interface IAdminLogDocument extends IAdminLog, Document {
  _id: Types.ObjectId;
}

const AdminLogSchema = new Schema<IAdminLogDocument>(
  {
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
      // e.g., "APPROVE_PROPERTY", "REJECT_PROPERTY", "BAN_USER", "UPDATE_KYC"
    },
    entity: {
      type: String,
      required: true,
      // e.g., "Property", "User", "Lead"
    },
    entityId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    details: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: null,
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

AdminLogSchema.index({ admin: 1, createdAt: -1 });
AdminLogSchema.index({ entity: 1, entityId: 1 });
AdminLogSchema.index({ action: 1, createdAt: -1 });

const AdminLog =
  (models.AdminLog as mongoose.Model<IAdminLogDocument>) ||
  model<IAdminLogDocument>("AdminLog", AdminLogSchema);

export default AdminLog;
