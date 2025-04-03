import { Book } from "./Book";
import { Follow } from "./Follow";

export interface User {
  id: string;
  googleUuid?: string;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  image?: string;
  bio?: string;
  roleId?: number;
  email: string;
  emailVerifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  books?: Book[];
  admin: boolean;
  superAdmin: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isUser: boolean;
  fullName: string;
  followings: Follow[];
  followers: Follow[];
  followersCount: number;
  followingsCount: number;
  storiesCount: number;
}
