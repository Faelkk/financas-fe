import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { Transaction } from "../../transactions/components/transactionCard/TransactionCard";
import { generateMonths } from "../useStaticsController";

export function useStaticsLineController(
  filteredTransactions: Transaction[],
  activeMonth: number
) {
  const calculateTotal = (
    transactions: Transaction[],
    type: "despesas" | "receitas"
  ): number => {
    const total = transactions
      .filter((transaction) => transaction.transactionType === type)
      .reduce((acc, transaction) => {
        return acc + transaction.transferNumber;
      }, 0);

    return total;
  };

  const totalDespesas = calculateTotal(filteredTransactions, "despesas");
  const totalReceitas = calculateTotal(filteredTransactions, "receitas");
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
