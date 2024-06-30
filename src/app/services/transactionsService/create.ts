import { httpClient } from "../httpClient";

export interface CreateTransactionsParams {}

export async function create(params: CreateTransactionsParams) {
  const { data } = await httpClient.post("/transactions", params);

  return data;
}
