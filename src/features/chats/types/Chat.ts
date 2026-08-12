import { User } from "@/types/User.ts";

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  SYSTEM = "SYSTEM",
}

export interface Conversation {
  id: string;
  name: string;
  avatarPhoto?: string;
  avatarPublicId?: string;
  isGroup: boolean;
  createdAt: string;
}

export interface ConversationDetail {
  conversationId: string;
  name: string;
  avatarPhoto?: string;
  avatarPublicId?: string;
  isMuted: boolean;
  isArchived: boolean;
  isGroup: boolean;

  lastMessageText?: string;
  lastMessageAt?: string;
  lastSenderName?: string;
  lastSenderId?: string;
}

export interface ChatConversationPreview {
  conversationId: string;
  name: string;
  avatarPhoto?: string;
  avatarPublicId?: string;
  isMuted: boolean;
  isArchived: boolean;
  isGroup: boolean;

  unreadCount: number;
  hasNewMessage: boolean;

  lastMessageText?: string;
  lastMessageAt?: string;
  lastSenderName?: string;
  lastSenderId?: string;
}

export enum ParticipantRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}
export interface Participant {
  id: string;
  conversationId: Conversation;
  user: User;
  nickname?: string;
  unreadCount: number;

  role: ParticipantRole;
  addedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  type: MessageType;
  senderName: string;
  message: string;
  createdAt: string;
  deliveredAt: string;
}
