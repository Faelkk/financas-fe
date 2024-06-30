import { useWindowHeight } from "../../../../../app/hooks/useWindowHeight";
import NewTransaction from "../../../../components/newTransaction/NewTransaction";
import { useModal } from "../../../../modal/useModal";
import TransactionsOverview from "../../transactionsOverview/TransactionsOverview";
import { Transaction } from "../transactionCard/TransactionCard";
import TransactionsList from "../transactionsList/TransactionsList";

const TransactionContent = ({
  filteredTransactions,
}: {
  filteredTransactions: Transaction[];
}) => {
  const { isModalOpen, handleToggleModal } = useModal();
  const height = useWindowHeight();
  const heightDesktop = height - 197;
  return (
    <>
      <div
        className="flex  justify-center w-full"
        style={{ height: `${heightDesktop}px` }}
      >
        <div className=" md:mt-10 flex flex-col md:gap-10 w-full md:max-w-[80%] md:w-[80%] relative">
          <TransactionsList filteredTransactions={filteredTransactions} />
          <TransactionsOverview filteredTransactions={filteredTransactions} />
        </div>
      </div>

      {isModalOpen && (
        <NewTransaction
          IsTransactionModalOpen={isModalOpen}
          handleToggleTransactionModal={handleToggleModal}
        />
      )}
    </>
  );
};

export default TransactionContent;
