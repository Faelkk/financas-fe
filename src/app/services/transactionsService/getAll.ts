import { Transaction } from "../../entities/Transactions";
import { typeTransactionsFilter } from "../../hooks/useTransactions";
import { httpClient } from "../httpClient";

export type TransactionResponse = Array<Transaction>;

export async function getAll(filters: typeTransactionsFilter) {
  const { data } = await httpClient.get<TransactionResponse>(
    `/transactions?type=${filters.type}&month=${filters.month}&year=${filters.year}`
  );

  return data;
}
