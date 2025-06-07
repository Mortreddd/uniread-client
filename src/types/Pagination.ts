export interface Paginate<T> {
  content: T;
  size: number;
  totalPages: number;
  totalElements: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };

  empty: boolean;
}

export interface PaginateParams {
  pageNo?: number;
  pageSize?: number;
  query?: string;
  sortBy?: string; // e.g., "asc" or "desc"
  status?: string; // e.g., "PUBLISHED", "DRAFT", etc.
  orderBy?: string; // e.g., "createdAt", "updatedAt"
  startDate?: string; // Format: "YYYY-MM-DD"
  endDate?: string; // Format: "YYYY-MM-DD"
}

export interface RequestState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}
