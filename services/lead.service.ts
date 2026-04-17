// ============================================
// Lead Service
// ============================================

import { BaseService } from "./base.service";
import { leadRepository, LeadRepository } from "@/repositories/lead.repository";
import { propertyRepository } from "@/repositories/property.repository";
import { ILeadDocument, CreateLeadDTO } from "@/types/lead.types";
import { PROPERTY_STATUS } from "@/config/constants";
import { logger } from "@/utils/logger";

export class LeadService extends BaseService<ILeadDocument> {
  private leadRepo: LeadRepository;

  constructor() {
    super(leadRepository, "Lead");
    this.leadRepo = leadRepository;
  }

  async createLead(data: CreateLeadDTO, buyerId: string): Promise<ILeadDocument> {
    logger.info(`Creating lead for property ${data.property} by buyer ${buyerId}`, "LeadService");

    // Validate property exists and is approved
    const property = await propertyRepository.findById(data.property);
    if (!property) throw new Error("Property not found");
    if (property.status !== PROPERTY_STATUS.APPROVED) {
      throw new Error("Cannot inquire about unapproved property");
    }

    // Prevent duplicate leads
    const existing = await this.leadRepo.findOne({
      buyer: buyerId,
      property: data.property,
    });
    if (existing) throw new Error("You have already inquired about this property");

    const lead = await this.leadRepo.create({
      ...data,
      buyer: buyerId,
      provider: property.provider.toString(),
      status: "new",
    } as unknown as Partial<ILeadDocument>);

    return lead;
  }

  async getBuyerLeads(buyerId: string, page = 1, limit = 12) {
    return this.leadRepo.findByBuyer(buyerId, page, limit);
  }

  async getProviderLeads(providerId: string, page = 1, limit = 12) {
    return this.leadRepo.findByProvider(providerId, page, limit);
  }

  async updateLeadStatus(leadId: string, status: string): Promise<ILeadDocument | null> {
    return this.update(leadId, { status } as Partial<ILeadDocument>);
  }
}

export const leadService = new LeadService();
