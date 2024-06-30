import { httpClient } from "../httpClient";

export interface CreateAccountsParams {}

export async function create(params: CreateAccountsParams) {
  const { data } = await httpClient.post("/bank-accounts", params);

  return data;
}
