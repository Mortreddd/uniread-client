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