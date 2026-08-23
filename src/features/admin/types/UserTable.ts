import { Gender } from "@/features/users/types/User";
import { PaginateParams } from "@/types/Pagination";

export interface UserTableDetail {
  id: string;
  username: string;
  email: string;
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  bannedAt: string;
  unbannedAt: string;
  deletedAt: string;
  isEmailVerified: boolean;
  profile: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    displayName: string;
    gender: Gender;
    bio?: string;

    avatarUrl?: string;
    avatarPublicId?: string;

    coverUrl?: string;
    coverPublicId?: string;
  };
}

export interface UserMonitoringFilter extends PaginateParams {
  roleIds?: string[];
  registeredAt?: string;
}
