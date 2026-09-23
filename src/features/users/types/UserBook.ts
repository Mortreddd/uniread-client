import { PaginateParams } from "@/shared/types/Pagination";

export interface UserBookFilter extends PaginateParams {}

export interface UserBook {
  id: string;
  title: string;
  description: string;
  averageRating: number;
  totalRating: number;
  readCount: number;
  coverUrl: string;
  totalLikes: number;
  totalChapters: number;
  status: string;
  completed: boolean;
  matured: boolean;
  isCollaborate: boolean;
  genres: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
