import { httpClient } from "../httpClient";

export interface CreateCategory {
  image: string;
  categoryName: string;
  categoryType: string;
  categoryColor: string;
}

export async function create(params: CreateCategory) {
  const { data } = await httpClient.post("/categories", params);

  return data;
}
