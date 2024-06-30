import { httpClient } from "../httpClient";

export interface UpdateTransactionsParams {
  id: string;
}

export async function update({ id, ...params }: UpdateTransactionsParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
