// ============================================
// Property Service — Property Business Logic
// ============================================
// Enforces KYC-gated approval workflow:
// - draft → pending → (kyc_hold | approved) → sold/rented
// - Admin approves: if provider KYC verified → approved, else → kyc_hold
// - When provider KYC verified later → auto-approve all kyc_hold listings

import { BaseService } from "./base.service";
import {
  propertyRepository,
  PropertyRepository,
} from "@/repositories/property.repository";
import { userRepository } from "@/repositories/user.repository";
import { IPropertyDocument, PropertySearchFilters, CreatePropertyDTO } from "@/types/property.types";
import { PROPERTY_STATUS, KYC_STATUS, PropertyStatus } from "@/config/constants";
import { uniqueSlug } from "@/utils/helpers";
import { logger } from "@/utils/logger";

export class PropertyService extends BaseService<IPropertyDocument> {
  private propertyRepo: PropertyRepository;

  constructor() {
    super(propertyRepository, "Property");
    this.propertyRepo = propertyRepository;
  }

  /**
   * Create a new property listing
   * - Auto-generates slug
   * - Sets initial status to "draft"
   */
  async createProperty(
    data: CreatePropertyDTO,
    providerId: string
  ): Promise<IPropertyDocument> {
    logger.info(
      `Creating property: "${data.title}" by provider ${providerId}`,
      "PropertyService"
    );

    const property = await this.propertyRepo.create({
      ...data,
      slug: uniqueSlug(data.title),
      provider: providerId,
      status: PROPERTY_STATUS.DRAFT,
      isVerified: false,
      isFeatured: false,
      views: 0,
    } as unknown as Partial<IPropertyDocument>);

    logger.info(
      `Property created: ${property._id} (slug: ${property.slug})`,
      "PropertyService"
    );
    return property;
  }

  /**
   * Submit a draft property for admin review
   * Transitions: draft → pending
   */
  async submitForReview(
    propertyId: string,
    providerId: string
  ): Promise<IPropertyDocument | null> {
    const property = await this.propertyRepo.findById(propertyId);

    if (!property) throw new Error("Property not found");
    if (property.provider.toString() !== providerId) {
      throw new Error("Not authorized to submit this property");
    }
    if (property.status !== PROPERTY_STATUS.DRAFT) {
      throw new Error(`Cannot submit property with status: ${property.status}`);
    }

    logger.info(
      `Property submitted for review: ${propertyId}`,
      "PropertyService"
    );
    return this.propertyRepo.updateStatus(propertyId, PROPERTY_STATUS.PENDING);
  }

  /**
   * Admin approves a pending property
   * KYC-GATED RULE:
   * - If provider KYC is verified → status = "approved"
   * - If provider KYC is NOT verified → status = "kyc_hold"
   */
  async approveProperty(propertyId: string): Promise<IPropertyDocument | null> {
    const property = await this.propertyRepo.findById(
      propertyId,
      undefined,
      "provider"
    );

    if (!property) throw new Error("Property not found");
    if (property.status !== PROPERTY_STATUS.PENDING) {
      throw new Error(`Cannot approve property with status: ${property.status}`);
    }

    // Check provider's KYC status
    const provider = await userRepository.findById(
      property.provider.toString()
    );

    if (!provider) throw new Error("Provider not found");

    let newStatus: PropertyStatus;
    let isVerified: boolean;

    if (provider.kycStatus === KYC_STATUS.VERIFIED) {
      newStatus = PROPERTY_STATUS.APPROVED;
      isVerified = true;
      logger.info(
        `Property ${propertyId} approved (provider KYC verified)`,
        "PropertyService"
      );
    } else {
      newStatus = PROPERTY_STATUS.KYC_HOLD;
      isVerified = false;
      logger.info(
        `Property ${propertyId} placed on KYC hold (provider KYC: ${provider.kycStatus})`,
        "PropertyService"
      );
    }

    return this.propertyRepo.updateStatus(propertyId, newStatus, isVerified);
  }

  /**
   * Admin rejects a pending property
   * Transitions: pending → rejected
   */
  async rejectProperty(propertyId: string): Promise<IPropertyDocument | null> {
    const property = await this.propertyRepo.findById(propertyId);

    if (!property) throw new Error("Property not found");
    if (property.status !== PROPERTY_STATUS.PENDING) {
      throw new Error(`Cannot reject property with status: ${property.status}`);
    }

    logger.info(`Property ${propertyId} rejected`, "PropertyService");
    return this.propertyRepo.updateStatus(
      propertyId,
      PROPERTY_STATUS.REJECTED,
      false
    );
  }

  /**
   * Auto-approve all kyc_hold properties when provider's KYC is verified
   * Called when admin verifies a provider's KYC
   */
  async onProviderKycVerified(providerId: string): Promise<number> {
    logger.info(
      `Auto-approving kyc_hold properties for provider: ${providerId}`,
      "PropertyService"
    );
    const count =
      await this.propertyRepo.approveKycHoldProperties(providerId);
    logger.info(
      `${count} properties auto-approved for provider: ${providerId}`,
      "PropertyService"
    );
    return count;
  }

  /**
   * Search properties with filters (public endpoint)
   */
  async searchProperties(filters: PropertySearchFilters) {
    logger.debug("Property search", "PropertyService", filters);
    return this.propertyRepo.search(filters);
  }

  /**
   * Get property by slug with view increment (public detail page)
   */
  async getPropertyBySlug(slug: string): Promise<IPropertyDocument | null> {
    const property = await this.propertyRepo.findBySlug(slug);
    if (property) {
      // Increment views asynchronously (fire and forget)
      this.propertyRepo.incrementViews(property._id.toString()).catch(() => {});
    }
    return property;
  }

  /**
   * Get provider's own properties (dashboard)
   */
  async getProviderProperties(
    providerId: string,
    status?: PropertyStatus,
    page = 1,
    limit = 12
  ) {
    return this.propertyRepo.findByProvider(providerId, status, page, limit);
  }

  /**
   * Get featured properties (homepage)
   */
  async getFeaturedProperties(limit = 8) {
    return this.propertyRepo.findFeatured(limit);
  }

  /**
   * Get pending properties for admin approval queue
   */
  async getPendingProperties(page = 1, limit = 12) {
    return this.propertyRepo.findPending(page, limit);
  }

  /**
   * Get property count by status (admin analytics)
   */
  async getStatusCounts() {
    return this.propertyRepo.countByStatus();
  }

  /**
   * Mark property as sold
   */
  async markAsSold(propertyId: string): Promise<IPropertyDocument | null> {
    return this.propertyRepo.updateStatus(
      propertyId,
      PROPERTY_STATUS.SOLD
    );
  }

  /**
   * Mark property as rented
   */
  async markAsRented(propertyId: string): Promise<IPropertyDocument | null> {
    return this.propertyRepo.updateStatus(
      propertyId,
      PROPERTY_STATUS.RENTED
    );
  }
}

// Singleton instance
export const propertyService = new PropertyService();
