/* eslint-disable @typescript-eslint/no-explicit-any */
import { TransactionResponse } from "../../../../app/services/transactionsService/getAll";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { generateMonths } from "../useStaticsController";

export const calculateTotal = (
  transactions: TransactionResponse,
  type: "EXPENSE" | "INCOME"
): number => {
  const total = transactions
    .filter((transaction) => transaction.transactionType === type)
    .reduce((acc, transaction: any) => {
      return acc + transaction.transactionValue;
    }, 0);

  return total;
};

export function useStaticsLineController(
  filteredTransactions: TransactionResponse,
  activeMonth: number
) {
  const totalDespesas = calculateTotal(filteredTransactions, "EXPENSE");
  const totalReceitas = calculateTotal(filteredTransactions, "INCOME");
  const formatCurrencyReceitas = formatCurrency(String(totalReceitas));
  const formatCurrencyDespesas = formatCurrency(String(totalDespesas));
  const months = generateMonths();
  const month = months[activeMonth];

  const data = {
    receitas: formatCurrencyReceitas,
    despesas: formatCurrencyDespesas,
    mes: month,
  };

  return {
    data,
    formatCurrencyReceitas,
    formatCurrencyDespesas,
    calculateTotal,
  };
}
