// ============================================
// NextAuth Type Augmentation
// ============================================
// Extends NextAuth's default types to include
// custom fields (role, kycStatus) in JWT & session.

import { UserRole, KycStatus } from "@/config/constants";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      kycStatus: KycStatus;
      avatar?: string;
      image?: string;
    };
  }

  interface User {
    id: string;
    role: UserRole;
    kycStatus: KycStatus;
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    kycStatus: KycStatus;
    avatar?: string;
  }
}
