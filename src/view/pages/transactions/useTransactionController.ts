import { useEffect, useState } from "react";
import { TransactionResponse } from "../../../app/services/transactionsService/getAll";
import { useSwiper } from "swiper/react";

export function useTransactionController(transactions: TransactionResponse) {
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionResponse>([]);
  const [monthlyFilteredTransactions, setMonthlyFilteredTransactions] =
    useState<TransactionResponse>([]);
  const [activeMonth, setActiveMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const swiper = useSwiper();

  useEffect(() => {
    if (
      JSON.stringify(transactions) !==
      JSON.stringify(monthlyFilteredTransactions)
    ) {
      setMonthlyFilteredTransactions(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    const filtered = monthlyFilteredTransactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      if (!isNaN(transactionDate.getTime())) {
        return (
          transactionDate.getMonth() + 1 === activeMonth &&
          transactionDate.getFullYear() === currentYear
        );
      }
      return false;
    });

    setFilteredTransactions(filtered);
  }, [activeMonth, currentYear, monthlyFilteredTransactions]);

  const handleMonthChange = async (monthIndex: number) => {
    if (swiper) {
      swiper.disable();
    }

    if (monthIndex === 13) {
      setActiveMonth(1);

      setCurrentYear(currentYear + 1);
    } else if (monthIndex === 0) {
      setActiveMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setActiveMonth(monthIndex);
    }
    if (swiper) {
      swiper.enable();
    }
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = monthlyFilteredTransactions.filter((transaction) => {
      return (
        transaction.transactionDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.transactionValue.toString().includes(searchTerm)
      );
    });
    setFilteredTransactions(filtered);
  };

  return {
    filteredTransactions,
    handleMonthChange,
    handleSearch,
    currentYear,
    activeMonth,
  };
}
