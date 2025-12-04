import { PaginatedResponse } from "@/intefaces/paginatedResponse";

export async function getProductsPaginated(
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedResponse> {
  const skip = (page - 1) * pageSize;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
export async function searchProducts(
  key: string,
): Promise<PaginatedResponse> {

  const res = await fetch(
    `https://dummyjson.com/products/search?q=${key}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}