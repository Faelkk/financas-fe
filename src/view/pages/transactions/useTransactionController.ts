import { useEffect, useState } from "react";
import { Transaction } from "./components/transactionCard/TransactionCard";

export function useTransactionController(transactions: Transaction[]) {
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [monthlyFilteredTransactions, setMonthlyFilteredTransactions] =
    useState<Transaction[]>([]);
  const [activeMonth, setActiveMonth] = useState<number>(new Date().getMonth());

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      return transaction.date.getMonth() === activeMonth;
    });
    setFilteredTransactions(filtered);
    setMonthlyFilteredTransactions(filtered);
  }, [activeMonth]);

  const handleSearch = (searchTerm: string) => {
    const filtered = monthlyFilteredTransactions.filter((transaction) => {
      return (
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.transferNumber.toString().includes(searchTerm)
      );
    });
    setFilteredTransactions(filtered);
  };

  const handleMonthChange = (monthIndex: number) => {
    setActiveMonth(monthIndex);
    const filtered = transactions.filter((transaction) => {
      return transaction.date.getMonth() === monthIndex;
    });
    setFilteredTransactions(filtered);
    setMonthlyFilteredTransactions(filtered);
  };

  return { filteredTransactions, handleMonthChange, handleSearch };
}
