import { useEffect, useState } from "react";
import { Transaction } from "../transactions/components/transactionCard/TransactionCard";

export const generateMonths = () => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return months;
};

export function useStaticsController(transactions: Transaction[]) {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const [activeMonth, setActiveMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      return transaction.date.getMonth() === activeMonth;
    });
    setFilteredTransactions(filtered);
  }, [activeMonth]);

  const handleMonthChange = (monthIndex: number) => {
    setActiveMonth(monthIndex);
    const filtered = transactions.filter((transaction) => {
      return transaction.date.getMonth() === monthIndex;
    });
    setFilteredTransactions(filtered);
  };

  return {
    filteredTransactions,
    handleMonthChange,
    activeMonth,
  };
}
