export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  gender: string;
  photoUrl: string | null;
  role: Role;
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  admin: boolean;
  superAdmin: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isUser: boolean;
}

export interface SimpleUserInfo extends Pick<
  User,
  "id" | "username" | "fullName" | "firstName" | "lastName"
> {}

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
