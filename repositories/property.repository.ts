// ============================================
// Property Repository — Data Access for Properties
// ============================================

import { Types } from "mongoose";
import { BaseRepository } from "./base.repository";
import Property from "@/models/Property";
import { IPropertyDocument } from "@/types/property.types";
import { PropertySearchFilters } from "@/types/property.types";
import { PropertyStatus, PROPERTY_STATUS } from "@/config/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Filter = Record<string, any>;

export class PropertyRepository extends BaseRepository<IPropertyDocument> {
  constructor() {
    super(Property);
  }

  /**
   * Advanced multi-field search with filters and pagination.
   */
  async search(filters: PropertySearchFilters) {
    await this.connect();

    const query: Filter = { status: PROPERTY_STATUS.APPROVED };

    if (filters.city) query["location.city"] = filters.city.toLowerCase();
    if (filters.area) query["location.area"] = { $regex: filters.area, $options: "i" };
    if (filters.propertyType) query.propertyType = filters.propertyType;
    if (filters.listingType) query.listingType = filters.listingType;

    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }

    if (filters.bhk) query.bhk = filters.bhk;
    if (filters.furnishing) query.furnishing = filters.furnishing;

    if (filters.amenities && filters.amenities.length > 0) {
      query.amenities = { $all: filters.amenities };
    }

    if (filters.query) query.$text = { $search: filters.query };

    const sortBy = filters.sortBy || "createdAt";
    const sortOrder = filters.sortOrder === "asc" ? 1 : -1;
    const sort = { [sortBy]: sortOrder as 1 | -1 };

    return this.findMany(query, {
      page: filters.page,
      limit: filters.limit,
      sort,
      populate: "provider",
    });
  }

  async findByProvider(
    providerId: string | Types.ObjectId,
    status?: PropertyStatus,
    page = 1,
    limit = 12
  ) {
    const filter: Filter = {
      provider: new Types.ObjectId(providerId.toString()),
    };
    if (status) filter.status = status;

    return this.findMany(filter, {
      page,
      limit,
      sort: { createdAt: -1 },
    });
  }

  async findFeatured(limit = 8) {
    return this.findMany(
      { status: PROPERTY_STATUS.APPROVED, isFeatured: true },
      { limit, sort: { createdAt: -1 }, populate: "provider" }
    );
  }

  async findBySlug(slug: string): Promise<IPropertyDocument | null> {
    await this.connect();
    return this.model
      .findOne({ slug })
      .populate("provider", "name avatar phone profile.company")
      .lean<IPropertyDocument>()
      .exec();
  }

  async updateStatus(
    propertyId: string,
    status: PropertyStatus,
    isVerified?: boolean
  ): Promise<IPropertyDocument | null> {
    const updateData: Partial<IPropertyDocument> = { status };
    if (isVerified !== undefined) updateData.isVerified = isVerified;
    return this.update(propertyId, updateData);
  }

  async incrementViews(propertyId: string): Promise<void> {
    await this.connect();
    await this.model.findByIdAndUpdate(propertyId, { $inc: { views: 1 } });
  }

  async approveKycHoldProperties(providerId: string): Promise<number> {
    await this.connect();
    const result = await this.model.updateMany(
      {
        provider: new Types.ObjectId(providerId),
        status: PROPERTY_STATUS.KYC_HOLD,
      },
      {
        $set: { status: PROPERTY_STATUS.APPROVED, isVerified: true },
      }
    );
    return result.modifiedCount;
  }

  async findPending(page = 1, limit = 12) {
    return this.findMany(
      { status: PROPERTY_STATUS.PENDING },
      { page, limit, sort: { createdAt: 1 }, populate: "provider" }
    );
  }

  async countByStatus(): Promise<Record<string, number>> {
    await this.connect();
    const results = await this.model.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const counts: Record<string, number> = {};
    results.forEach((r: { _id: string; count: number }) => {
      counts[r._id] = r.count;
    });
    return counts;
  }
}

// Singleton instance
export const propertyRepository = new PropertyRepository();
