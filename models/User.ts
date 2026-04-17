// ============================================
// User Mongoose Model
// ============================================

import mongoose, { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";
import { IUserDocument } from "@/types/user.types";
import {
  USER_ROLES,
  KYC_STATUS,
} from "@/config/constants";

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never return password by default
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian phone number"],
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.BUYER,
    },
    avatar: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    kycStatus: {
      type: String,
      enum: Object.values(KYC_STATUS),
      default: KYC_STATUS.PENDING,
    },
    kycDocuments: [
      {
        type: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    profile: {
      company: { type: String, default: null },
      address: { type: String, default: null },
      city: { type: String, default: null },
      state: { type: String, default: null },
      bio: { type: String, default: null },
    },
    preferences: {
      budgetRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
      },
      preferredCities: [{ type: String }],
      propertyTypes: [{ type: String }],
      preferredListingType: { type: String, default: null },
    },
    subscription: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(_doc: any, ret: any) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// --- Indexes ---
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ phone: 1 }, { sparse: true });
UserSchema.index({ kycStatus: 1 });
UserSchema.index({ isActive: 1, role: 1 });

// --- Pre-save: Hash password ---
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- Instance Method: Compare password ---
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Prevent model recompilation during hot-reloads
const User =
  (models.User as mongoose.Model<IUserDocument>) ||
  model<IUserDocument>("User", UserSchema);

export default User;
