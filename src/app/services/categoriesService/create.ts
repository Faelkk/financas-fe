import { httpClient } from "../httpClient";

export interface CreateCategory {}

export async function create(params: CreateCategory) {
  const { data } = await httpClient.post("/categories", params);

  return data;
}
