import { SimpleUserInfo, User } from "@/types/User.ts";

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  isGroup: boolean;
  participants?: Participant[];
  messages?: Message[];
  createdAt: string;
}

export interface ConversationDetail extends Omit<
  Conversation,
  "participants" | "messages" | "id"
> {
  conversationId: string;
  unreadCount: number;
  hasNewMessage: boolean;
  isMuted: boolean;
  lastMessage: string;
  lastMessageAt: string;
}

export interface ConversationInfo extends Pick<Conversation, "id" | "name"> {}

export interface Participant {
  id: string;
  conversationId: string;
  user: User;
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

export interface ConversationMessage extends Omit<Message, "sender"> {
  sender: SimpleUserInfo;
}

export interface ReaderParticipant {
  participantId: string;
  lastReadAt: string;
}
