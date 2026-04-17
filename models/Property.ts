// ============================================
// Property Mongoose Model
// ============================================

import mongoose, { Schema, models, model } from "mongoose";
import { IPropertyDocument } from "@/types/property.types";
import {
  PROPERTY_TYPES,
  LISTING_TYPES,
  PROPERTY_STATUS,
  FURNISHING_TYPES,
} from "@/config/constants";

const PropertySchema = new Schema<IPropertyDocument>(
  {
    title: {
      type: String,
      required: [true, "Property title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Property description is required"],
      minlength: [20, "Description must be at least 20 characters"],
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: Object.values(PROPERTY_TYPES),
    },
    listingType: {
      type: String,
      required: [true, "Listing type is required"],
      enum: Object.values(LISTING_TYPES),
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    bhk: {
      type: Number,
      required: [true, "BHK is required"],
      min: [1, "BHK must be at least 1"],
      max: [10, "BHK cannot exceed 10"],
    },
    area: {
      type: Number,
      required: [true, "Area (sq ft) is required"],
      min: [1, "Area must be positive"],
    },
    location: {
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        lowercase: true,
      },
      area: {
        type: String,
        required: [true, "Area/locality is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, "Pincode is required"],
        match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      coordinates: {
        lat: { type: Number, default: null },
        lng: { type: Number, default: null },
      },
    },
    amenities: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    media: [
      {
        url: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["image", "video", "document"],
          default: "image",
        },
        caption: {
          type: String,
          default: null,
        },
      },
    ],
    provider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Provider is required"],
    },
    status: {
      type: String,
      enum: Object.values(PROPERTY_STATUS),
      default: PROPERTY_STATUS.DRAFT,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    furnishing: {
      type: String,
      enum: Object.values(FURNISHING_TYPES),
      required: [true, "Furnishing type is required"],
    },
    availableFrom: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform(_doc: any, ret: any) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// --- Compound Indexes for Search Optimization ---

// Primary search filter: city + type + price
PropertySchema.index({
  "location.city": 1,
  propertyType: 1,
  price: 1,
});

// BHK-based search
PropertySchema.index({
  "location.city": 1,
  bhk: 1,
  listingType: 1,
});

// Provider dashboard queries
PropertySchema.index({
  provider: 1,
  status: 1,
});

// Homepage / listing display (featured first, newest first)
PropertySchema.index({
  status: 1,
  isFeatured: -1,
  createdAt: -1,
});

// Slug lookup (unique already creates index, but explicit for clarity)
PropertySchema.index({ slug: 1 }, { unique: true });

// Full-text search on title, description, area
PropertySchema.index({
  title: "text",
  description: "text",
  "location.area": "text",
});

// Price range queries
PropertySchema.index({ price: 1 });

// --- Pre-save: Auto-generate slug ---
PropertySchema.pre("save", function () {
  if (this.isModified("title") || !this.slug) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    // Append a short unique suffix to avoid collisions
    const uniqueSuffix = Date.now().toString(36);
    this.slug = `${baseSlug}-${uniqueSuffix}`;
  }
});

// Prevent model recompilation during hot-reloads
const Property =
  (models.Property as mongoose.Model<IPropertyDocument>) ||
  model<IPropertyDocument>("Property", PropertySchema);

export default Property;
