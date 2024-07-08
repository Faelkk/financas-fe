import { Category } from "../../entities/Category";
import { httpClient } from "../httpClient";

export type CategoyResponse = Array<Category>;

export async function getAll() {
  const { data } = await httpClient.get<CategoyResponse>("/categories");

  return data;
}
