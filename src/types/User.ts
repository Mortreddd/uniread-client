export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  email: string;
  username: string;
  
  role: Role;
  emailVerifiedAt?: string | null;
  bannedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  gender: string;
  photoUrl: string | null;
}

export interface SimpleUserInfo extends Pick<
  UserProfile,
  "id" | "username" | "fullName" | "firstName" | "lastName" | "photoUrl"
> {
  userId: string;
}

type ImmutableAttribute = Omit<
  User,
  "isUser" | "isSuperAdmin" | "isAdmin" | "admin" | "superAdmin" | "user"
>;

export interface AuthorDetail extends ImmutableAttribute {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  photoUrl: string | null;
  followersCount: number;
  followingsCount: number;
  publishedStoriesCount: number;
  isFollowing: boolean;
  isFollower: boolean;
  isMutualFollowing: boolean;
}

export interface UserDashboard {
  totalCreatedBooks: number;
  totalPublishedBooks: number;
  totalDraftBooks: number;
  totalLikes: number;
  totalReads: number;
  totalFollowers: number;
  totalFollowings: number;
}
