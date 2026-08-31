import { PaginateParams } from "@/types/Pagination";

export interface GenreTableFilter extends PaginateParams {}

export interface GenreDetail {
  id: string;
  name: string;
  description?: string;
  bookCount: number;
  createdAt: string;
  updatedAt: string;
}
