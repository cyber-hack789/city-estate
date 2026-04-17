// ============================================
// User Repository — Data Access for Users
// ============================================

import { Types } from "mongoose";
import { BaseRepository } from "./base.repository";
import User from "@/models/User";
import { IUserDocument } from "@/types/user.types";
import { UserRole, KycStatus } from "@/config/constants";

export class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(User);
  }

  /**
   * Find user by email — includes password field for auth
   */
  async findByEmail(email: string): Promise<IUserDocument | null> {
    await this.connect();
    return this.model.findOne({ email }).select("+password").exec();
  }

  /**
   * Find user by email — safe (no password)
   */
  async findByEmailSafe(email: string): Promise<IUserDocument | null> {
    return this.findOne({ email });
  }

  /**
   * Find users by role with pagination
   */
  async findByRole(role: UserRole, page = 1, limit = 12) {
    return this.findMany({ role }, { page, limit });
  }

  /**
   * Update user's KYC status
   */
  async updateKycStatus(
    userId: string,
    kycStatus: KycStatus
  ): Promise<IUserDocument | null> {
    return this.update(userId, { kycStatus } as Partial<IUserDocument>);
  }

  /**
   * Find all providers with a specific KYC status
   */
  async findProvidersByKycStatus(kycStatus: KycStatus) {
    return this.findMany({ role: "provider", kycStatus });
  }

  /**
   * Deactivate a user account
   */
  async deactivate(userId: string): Promise<IUserDocument | null> {
    return this.update(userId, { isActive: false } as Partial<IUserDocument>);
  }

  /**
   * Check if email is already registered
   */
  async emailExists(email: string): Promise<boolean> {
    return this.exists({ email });
  }
}

// Singleton instance
export const userRepository = new UserRepository();
