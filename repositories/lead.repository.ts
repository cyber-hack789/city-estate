// ============================================
// Lead Repository
// ============================================

import { Types } from "mongoose";
import { BaseRepository } from "./base.repository";
import Lead from "@/models/Lead";
import { ILeadDocument } from "@/types/lead.types";

export class LeadRepository extends BaseRepository<ILeadDocument> {
  constructor() {
    super(Lead);
  }

  async findByBuyer(buyerId: string, page = 1, limit = 12) {
    return this.findMany(
      { buyer: new Types.ObjectId(buyerId) },
      { page, limit, sort: { createdAt: -1 }, populate: ["property", "provider"] }
    );
  }

  async findByProvider(providerId: string, page = 1, limit = 12) {
    return this.findMany(
      { provider: new Types.ObjectId(providerId) },
      { page, limit, sort: { createdAt: -1 }, populate: ["property", "buyer"] }
    );
  }

  async findByProperty(propertyId: string, page = 1, limit = 12) {
    return this.findMany(
      { property: new Types.ObjectId(propertyId) },
      { page, limit, sort: { createdAt: -1 }, populate: ["buyer"] }
    );
  }
}

export const leadRepository = new LeadRepository();
