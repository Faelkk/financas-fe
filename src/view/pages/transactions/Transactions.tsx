import { useEffect, useState } from "react";
import { useTransactions } from "../../../app/hooks/useTransactions";
import FiltersMonthsTransactions from "./components/filterMonthsTransaction/FiltersMonthsTransactions";
import HeaderFilterTransactions from "./components/headerFilterTransactions/HeaderFilterTransactions";
import TransactionContent from "./components/transactionContent/TransactionContent";
import TransactionEmptyContent from "./components/transactionEmptyContent/TransactionEmptyContent";
import { useTransactionController } from "./useTransactionController";
import Spinner from "../../components/Spinner";

export type typeTransactionsFilter = {
  month: string;
  year: string;
  type: "" | "EXPENSE" | "INCOME";
};

const Transactions = () => {
  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();
  const [filters, setFilters] = useState<typeTransactionsFilter>({
    month: String(currentMonth),
    year: String(currentYear),
    type: "",
  });

  const { transactions, isLoading, error } = useTransactions(filters);
  const {
    handleSearch,
    filteredTransactions,
    handleMonthChange,
    currentYear: newYear,
    activeMonth,
  } = useTransactionController(transactions);

  const onMonthChange = async (monthIndex: number) => {
    if (!isLoading) {
      await handleMonthChange(monthIndex);
    }
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      year: String(newYear),
      month: String(activeMonth === 13 ? 1 : activeMonth),
    }));
  }, [newYear, activeMonth]);

  if (error) return <h2>Erro....</h2>;
  if (filteredTransactions)
    return (
      <div className="flex flex-col h-full flex-1">
        <HeaderFilterTransactions onSearch={handleSearch} />
        <FiltersMonthsTransactions
          isLoading={isLoading}
          onMonthChange={onMonthChange}
          currentMonth={currentMonth}
          currentYear={newYear}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {filteredTransactions.length > 0 ? (
              <TransactionContent filteredTransactions={filteredTransactions} />
            ) : (
              <TransactionEmptyContent />
            )}
          </>
        )}
      </div>
    );
};

export default Transactions;
