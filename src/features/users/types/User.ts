export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface CollaboratorPreview {
  id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  photoUrl: string;
}

export interface UserSearchPreview {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  username: string;
  isEmailVerified: boolean;
}
