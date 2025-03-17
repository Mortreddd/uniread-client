import { User } from "@/types/User.ts";

export interface Notification {
  id: string;
  user: User;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
