// ============================================
// User Service
// ============================================

import { BaseService } from "./base.service";
import { userRepository, UserRepository } from "@/repositories/user.repository";
import { propertyService } from "./property.service";
import { IUserDocument } from "@/types/user.types";
import { KYC_STATUS, KycStatus } from "@/config/constants";
import { logger } from "@/utils/logger";

export class UserService extends BaseService<IUserDocument> {
  private userRepo: UserRepository;

  constructor() {
    super(userRepository, "User");
    this.userRepo = userRepository;
  }

  async verifyKyc(userId: string): Promise<IUserDocument | null> {
    logger.info(`Verifying KYC for user: ${userId}`, "UserService");

    const user = await this.userRepo.updateKycStatus(userId, KYC_STATUS.VERIFIED as KycStatus);

    if (user) {
      // Auto-approve all kyc_hold properties
      const count = await propertyService.onProviderKycVerified(userId);
      logger.info(`KYC verified. ${count} properties auto-approved for user: ${userId}`, "UserService");
    }

    return user;
  }

  async rejectKyc(userId: string): Promise<IUserDocument | null> {
    logger.info(`Rejecting KYC for user: ${userId}`, "UserService");
    return this.userRepo.updateKycStatus(userId, KYC_STATUS.REJECTED as KycStatus);
  }

  async getAllProviders(page = 1, limit = 12) {
    return this.userRepo.findByRole("provider", page, limit);
  }

  async deactivateUser(userId: string): Promise<IUserDocument | null> {
    return this.userRepo.deactivate(userId);
  }
}

export const userService = new UserService();
