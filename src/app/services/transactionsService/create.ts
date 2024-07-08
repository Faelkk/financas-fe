import { httpClient } from "../httpClient";

export interface CreateTransactionsParams {
  date: string;
  transactionValue: number;
  transactionDescription: string;
  transactionType: "EXPENSE" | "INCOME";
  categoryId: string;
}

export async function create(params: CreateTransactionsParams) {
  const { data } = await httpClient.post("/transactions", params);

  return data;
}
