import { User } from "@/types/User.ts";

export enum MessageType {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  SYSTEM = "SYSTEM",
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  participants?: Participant[];
  messages?: Message[];
  createdAt: string;
}

export interface ConversationDetail {
  id: string;
  name: string;
  isMuted: boolean;
  isArchived: boolean;
  isGroup: boolean;
  lastMessage: Message | null;
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
  lastMessage: Message;
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
  conversationId: string;
  senderId: string;
  type: MessageType;
  senderName: string;
  message: string;
  createdAt: string;
  deliveredAt: string;
}
