import { Gender } from "@/features/users/types/User";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  hasAdminAccess: boolean;
  profile: {
    displayName: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarUrl: string;
    avatarPublicId: string;
    gender: Gender;
  };
}
