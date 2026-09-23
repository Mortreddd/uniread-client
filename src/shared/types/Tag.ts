import { PaginateParams } from "@/shared/types/Pagination";

export interface TagTableFilter extends PaginateParams {}
export interface TagDetail {
  id: string;
  name: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}
