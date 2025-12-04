export interface IPaginationParams {
  page?: number;
  pageSize?: number;
  term?: string; // for search functionality
}

export interface IPaginatedResponse<T> {
  items: T[];
  totalCount: number;
}
