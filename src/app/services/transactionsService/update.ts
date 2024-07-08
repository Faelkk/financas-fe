import { httpClient } from "../httpClient";

export interface UpdateTransactionsParams {
  id: string;
  date: string;
  transactionValue: number;
  transactionDescription: string;
  transactionType: "EXPENSE" | "INCOME";
  categoryId: string;
}

export async function update(
  transactionId: string,
  transactionData: UpdateTransactionsParams
) {
  const { data } = await httpClient.patch(
    `/transactions/${transactionId}`,
    transactionData
  );

  return data;
}
