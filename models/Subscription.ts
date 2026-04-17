// ============================================
// Subscription Mongoose Model
// ============================================

import mongoose, { Schema, models, model, Document, Types } from "mongoose";
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from "@/config/constants";

export interface ISubscription {
  user: Types.ObjectId;
  plan: SubscriptionPlan;
  razorpaySubscriptionId?: string;
  razorpayPaymentId?: string;
  amount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  features: {
    maxListings: number;
    featuredListings: number;
    leadAccess: boolean;
    analytics: boolean;
    prioritySupport: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubscriptionDocument extends ISubscription, Document {
  _id: Types.ObjectId;
}

const SubscriptionSchema = new Schema<ISubscriptionDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      enum: Object.values(SUBSCRIPTION_PLANS),
      required: true,
    },
    razorpaySubscriptionId: {
      type: String,
      default: null,
    },
    razorpayPaymentId: {
      type: String,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    features: {
      maxListings: { type: Number, default: 5 },
      featuredListings: { type: Number, default: 0 },
      leadAccess: { type: Boolean, default: false },
      analytics: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

SubscriptionSchema.index({ user: 1, isActive: 1 });
SubscriptionSchema.index({ endDate: 1, isActive: 1 });

const Subscription =
  (models.Subscription as mongoose.Model<ISubscriptionDocument>) ||
  model<ISubscriptionDocument>("Subscription", SubscriptionSchema);

export default Subscription;
