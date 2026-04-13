import { User } from "@/types/User.ts";

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  participants?: Participant[];
  messages?: Message[];
  createdAt: string;
}

export interface ChatConversationPreview extends Omit<
  Conversation,
  "participants" | "messages" | "id"
> {
  conversationId: string;
  unreadCount: number;
  hasNewMessage: boolean;
  isMuted: boolean;
  isArchived: boolean;
  isGroup: boolean;
  lastMessage: string;
  lastMessageAt: string;
}

export interface ConversationDetail extends Omit<
  ChatConversationPreview,
  "lastMessage" | "lastMessageAt"
> {}

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
  sender: User;
  conversationId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationInfo {
  id: string;
}

export interface ExistingConversation {
  isGroup: boolean;
}
