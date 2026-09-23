import { PaginateParams } from "./Pagination";

type TargetType = "USER" | "BOOK" | "CHAPTER";

// 1. Map each notification type -> its metadata shape
interface NotificationMetadataMap {
  EMAIL_CONFIRMATION: { email: string; token: string };
  EMAIL_UPDATE_CONFIRMATION: {
    oldEmail: string;
    newEmail: string;
    token: string;
  };
  WELCOME: { username: string };
  NEW_FOLLOWER: {
    followerId: string;
    followerUsername: string;
    followerAvatar?: string;
  };
  FOLLOW_REQUEST_ACCEPTED: { userId: string; username: string };
  NEW_BOOK_RELEASED: { bookId: string; authorId: string; coverUrl?: string };
  BOOK_UPDATE: { bookId: string; chapterId?: string; version: string };
  BOOK_RECOMMENDATION: {
    bookId: string;
    reason?: string;
    recommendedBy: string;
  };
  NEW_COMMENT: {
    commentId: string;
    bookId: string;
    chapterId?: string;
    authorId: string;
  };
  NEW_LIKE: { likeId: string; targetId: string; likedBy: string };
  NEW_REVIEW: {
    reviewId: string;
    bookId: string;
    rating: number;
    authorId: string;
  };
  ACHIEVEMENT_UNLOCKED: {
    achievementId: string;
    achievementName: string;
    iconUrl?: string;
  };
  MILESTONE_REACHED: {
    milestoneId: string;
    milestoneName: string;
    value: number;
  };
  SYSTEM_ANNOUNCEMENT: {
    announcementId: string;
    priority: "low" | "medium" | "high";
  };
  MAINTENANCE_ALERT: {
    startsAt: string;
    endsAt: string;
    affectedServices: string[];
  };
  READING_REMINDER: { bookId: string; chapterId?: string; lastReadAt: string };
  EVENT_REMINDER: { eventId: string; eventName: string; startsAt: string };
}

type NotificationType = keyof NotificationMetadataMap;

interface NotificationBase {
  id: string;
  title: string;
  description: string;
  isRead: boolean;
  isClicked: boolean;
  targetId: string;
  targetType: TargetType;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationFilter extends PaginateParams {}

export interface TotalUnreadNotification {
  totalUnreadNotifications: number;
}
export type Notification = {
  [K in NotificationType]: NotificationBase & {
    type: K;
    metadata: NotificationMetadataMap[K];
  };
}[NotificationType];
