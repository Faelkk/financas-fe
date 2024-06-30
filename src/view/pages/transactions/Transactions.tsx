import { transactions } from "../../../mocks/transactions";
import FiltersMonthsTransactions from "./components/filterMonthsTransaction/FiltersMonthsTransactions";
import HeaderFilterTransactions from "./components/headerFilterTransactions/HeaderFilterTransactions";
import TransactionContent from "./components/transactionContent/TransactionContent";
import TransactionEmptyContent from "./components/transactionEmptyContent/TransactionEmptyContent";
import { useTransactionController } from "./useTransactionController";

const Transactions = () => {
  const transactionsData = transactions;
  const { handleSearch, filteredTransactions, handleMonthChange } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useTransactionController(transactionsData as any);

  return (
    <div className="flex flex-col h-full flex-1">
      <HeaderFilterTransactions onSearch={handleSearch} />
      <FiltersMonthsTransactions onMonthChange={handleMonthChange} />
      {filteredTransactions.length > 0 ? (
        <TransactionContent filteredTransactions={filteredTransactions} />
      ) : (
        <TransactionEmptyContent />
      )}
    </div>
  );
};

export default Transactions;
