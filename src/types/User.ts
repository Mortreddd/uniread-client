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

type ImmutableAttribute = Omit<
  User,
  "isUser" | "isSuperAdmin" | "isAdmin" | "admin" | "superAdmin" | "user"
>;

export interface AuthorDetail extends ImmutableAttribute {
  followersCount: number;
  followingsCount: number;
  storiesCount: number;
}
