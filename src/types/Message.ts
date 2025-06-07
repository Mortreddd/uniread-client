import { User } from "@/types/User.ts";

export interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  participants?: Participant[];
  messages?: Message[];
  createdAt: string;
}

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

export interface CreateMessageRequest {
  senderId: string;
  receiverId: string[];
  message: string;
}

export interface CreateConversationRequest {}
