export interface UserProfileDetails {
  displayName: string;
  firstName: string;
  lastName: string;
  gender: string;
  bio?: string;

  avatarUrl?: string;
  avatarPublicId?: string;

  coverUrl?: string;
  coverPublicId?: string;

}
