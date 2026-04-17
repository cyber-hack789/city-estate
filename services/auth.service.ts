// ============================================
// Auth Service — Authentication Business Logic
// ============================================
// Uses NextAuth's built-in JWT — no jsonwebtoken package.

import { userRepository, UserRepository } from "@/repositories/user.repository";
import { CreateUserDTO, LoginDTO, IUserDocument } from "@/types/user.types";
import { KYC_STATUS, USER_ROLES } from "@/config/constants";
import { logger } from "@/utils/logger";

export class AuthService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = userRepository;
  }

  /**
   * Register a new user
   * - Validates that email is unique
   * - Creates user with hashed password (handled by User model pre-save hook)
   */
  async register(data: CreateUserDTO): Promise<IUserDocument> {
    logger.info(`Registration attempt: ${data.email}`, "AuthService");

    // Check if email already exists
    const exists = await this.userRepo.emailExists(data.email);
    if (exists) {
      throw new Error("Email already registered");
    }

    // Create user with default role and KYC status
    const user = await this.userRepo.create({
      ...data,
      role: data.role || USER_ROLES.BUYER,
      kycStatus: KYC_STATUS.PENDING,
      isVerified: false,
      isActive: true,
    } as Partial<IUserDocument>);

    logger.info(`User registered successfully: ${data.email}`, "AuthService");
    return user;
  }

  /**
   * Login — Validate credentials
   * Called by NextAuth's authorize callback in the Credentials provider.
   * Returns the user object if credentials are valid, null otherwise.
   */
  async login(data: LoginDTO): Promise<IUserDocument | null> {
    logger.info(`Login attempt: ${data.email}`, "AuthService");

    // Find user with password field included
    const user = await this.userRepo.findByEmail(data.email);

    if (!user) {
      logger.warn(`Login failed — user not found: ${data.email}`, "AuthService");
      return null;
    }

    // Check if account is active
    if (!user.isActive) {
      logger.warn(`Login failed — account deactivated: ${data.email}`, "AuthService");
      throw new Error("Account has been deactivated");
    }

    // Compare passwords
    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      logger.warn(`Login failed — invalid password: ${data.email}`, "AuthService");
      return null;
    }

    logger.info(`Login successful: ${data.email}`, "AuthService");
    return user;
  }

  /**
   * Get user by ID (for session validation)
   */
  async getUserById(userId: string): Promise<IUserDocument | null> {
    return this.userRepo.findById(userId);
  }

  /**
   * Get user by email (safe — no password)
   */
  async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return this.userRepo.findByEmailSafe(email);
  }
}

// Singleton instance
export const authService = new AuthService();
