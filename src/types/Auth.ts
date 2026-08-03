import { Gender } from "@/features/users/types/User";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: Role;
  emailVerified: boolean;
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

export interface LoginResponse {
  iss: string;
  iat: number;
  accessToken: string;
  refreshToken: string;
  success: boolean;
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: Role;
    emailVerified: boolean;
  };
}

export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  password: string;
  confirmPassword: string;
}

export interface InvalidAccessToken {
  message: string;
  details: string;
}

export interface LoginErrorResponse {
  date: string;
  code: number;
  message: string;
  description: string;
}
