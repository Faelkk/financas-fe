import { useEffect, useState } from "react";
import { useTransactions } from "../../../app/hooks/useTransactions";
import FiltersMonthsStatiscs from "./components/filterMonthsStatiscs/FiltersMonthsStatiscs";
import HeaderStatiscs from "./components/headerStatiscs/HeaderStatiscs";
import StasticsContent from "./components/stasticsContent/StasticsContent";
import StasticsEmptyContent from "./components/stasticsEmptyContent/StasticsEmptyContent";
import { useStaticsController } from "./useStaticsController";
import { typeTransactionsFilter } from "../transactions/Transactions";
import Spinner from "../../components/Spinner";

const Stastics = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const [filters, setFilters] = useState<typeTransactionsFilter>({
    month: String(currentMonth),
    year: String(currentYear),
    type: "",
  });

  const { transactions, isLoading, error } = useTransactions(filters);
  const {
    filteredTransactions,
    handleMonthChange,
    activeMonth,
    currentYear: newYear,
  } = useStaticsController(transactions);

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
        <HeaderStatiscs />
        <FiltersMonthsStatiscs
          isLoading={isLoading}
          currentYear={newYear}
          onMonthChange={onMonthChange}
          currentMonth={currentMonth}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <>
            {filteredTransactions.length > 0 ? (
              <StasticsContent
                filteredTransactions={filteredTransactions}
                activeMonth={activeMonth}
              />
            ) : (
              <StasticsEmptyContent />
            )}
          </>
        )}
      </div>
    );
};

export default Stastics;
