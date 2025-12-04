export interface PaginatedResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}