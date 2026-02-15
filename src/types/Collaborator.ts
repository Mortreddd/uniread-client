import { Book } from "./Book";
import { User } from "./User";

export enum CollaboratorPermission {
  ADMINISTRATOR = "ADMINISTRATOR",
  // book section
  PUBLISH_BOOK = "PUBLISH_BOOK",
  EDIT_BOOK = "EDIT_BOOK",
  DELETE_BOOK = "DELETE_BOOK",
  // book section
  ADD_CHAPTER = "ADD_CHAPTER",
  EDIT_CHAPTER = "EDIT_CHAPTER",
  PUBLISH_CHAPTER = "PUBLISH_CHAPTER",
  // collaborator sections
  ADD_COLLABORATOR = "ADD_COLLABORATOR",
  MODIFY_PERMISSIONS = "MODIFY_PERMISSIONS",
}

export interface Collaborator {
  id: string;
  user: User;
  book: Book;
  bannedAt: string | null;
  unbannedAt: string | null;
  isAdmin: boolean;
  canEditBook: boolean;
  canDeleteBook: boolean;
  canPublishBook: boolean;

  canAddChapter: boolean;
  canEditChapter: boolean;
  canPublishChapter: boolean;

  canAddCollaborator: boolean;
  canModifyPermissions: boolean;

  createdAt: string;
  updatedAt: string;
}

export enum CollaboratorRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface CollaboratorRequest
  extends Pick<
    Collaborator,
    "id" | "user" | "book" | "createdAt" | "updatedAt"
  > {
  message: string;
  status: CollaboratorRequestStatus;
}
