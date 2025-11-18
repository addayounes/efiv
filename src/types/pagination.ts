export interface IPaginationParams {
  page?: number;
  pageSize?: number;
}

export interface IPaginatedResponse<T> {
  items: T[];
  totalCount: number;
}
