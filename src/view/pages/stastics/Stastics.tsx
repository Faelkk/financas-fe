import { transactions } from "../../../mocks/transactions";
import FiltersMonthsStatiscs from "./components/filterMonthsStatiscs/FiltersMonthsStatiscs";
import HeaderStatiscs from "./components/headerStatiscs/HeaderStatiscs";
import StasticsContent from "./components/stasticsContent/StasticsContent";
import StasticsEmptyContent from "./components/stasticsEmptyContent/StasticsEmptyContent";
import { useStaticsController } from "./useStaticsController";

const Stastics = () => {
  const transactionsData = transactions;
  const { filteredTransactions, handleMonthChange, activeMonth } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useStaticsController(transactionsData as any);

  return (
    <div className="flex flex-col h-full flex-1">
      <HeaderStatiscs />
      <FiltersMonthsStatiscs onMonthChange={handleMonthChange} />
      {filteredTransactions.length > 0 ? (
        <StasticsContent
          filteredTransactions={filteredTransactions}
          activeMonth={activeMonth}
        />
      ) : (
        <StasticsEmptyContent />
      )}
    </div>
  );
};

export default Stastics;
