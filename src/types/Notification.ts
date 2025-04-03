import { User } from "@/types/User.ts";

export interface Notification {
  id: string;
  user: User;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
