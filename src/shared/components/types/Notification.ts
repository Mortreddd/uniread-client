export interface Notification {
  id: string;
  recipientId: string;

  actorId: string;
  actorName: string;
  actorAvatarUrl: string;

  entityId: string;
  entityType: NotificationEntityType;
  entityName: string;

  message: string;
  isRead: boolean;

  type: NotificationType;
  createdAt: string;
}

export interface NotificationMetadata {
  id: string;
  notificationId: string;
  key: string;
  value: string;
}

export enum NotificationType {
  FOLLOW,
  FOLLOW_BACK,
  BOOK_LIKED,
  BOOK_COMMENT,
  BOOK_PUBLISHED,
  CHAPTER_LIKED,
  CHAPTER_COMMENT,
  COMMENT_LIKED,
  COMMENT_REPLIED,
  COMMENT_ADDED,
  FOLLOWING_PUBLISHED_BOOK,
  COLLABORATE_REQUEST,
}

export enum NotificationEntityType {
  USER,
  BOOK,
  CHAPTER,
  COMMENT,
}
