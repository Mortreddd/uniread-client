import { BookStatus, Genre } from "@/features/books/types/Book";

export interface AuthorRecentWorkBookDetails {
  id: string;
  title: string;
  description: string;
  averageRating: number;
  readCount: number;
  coverPhoto: string;
  totalLikes: number;
  totalChapters: number;
  status: BookStatus;
  completed: boolean;
  matured: boolean;
  genres: Genre[];
  createdAt: string;
  lastModifiedAt: string;
}

export interface CreateBookRequest {
  title: string;
  description: string;
  coverPhoto: File | null;
  matured: boolean;
  genres: Genre[];
  tags: string[];

  collaboratorIds: string[];
}
