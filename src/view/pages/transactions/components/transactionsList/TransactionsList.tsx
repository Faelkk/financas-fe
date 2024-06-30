import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useWindowHeight } from "../../../../../app/hooks/useWindowHeight";
import TransactionCard, {
  Transaction,
} from "../transactionCard/TransactionCard";

const TransactionsList = ({
  filteredTransactions,
}: {
  filteredTransactions: Transaction[];
}) => {
  const width = useWindowWidth();
  const height = useWindowHeight();

  const heightWindow = height - 315;
  const heightMobile = height - 205;

  const groupedTransactions = groupTransactionsByDate(filteredTransactions);

  return (
    <section
      className={`custom-scrollbar flex flex-col gap-4 p-3 overflow-y-auto mb-2 w-full md:flex-1 ${
        width >= 768 ? "max-h-[80%]" : "h-full"
      }`}
      style={{
        height:
          width >= 768
            ? ""
            : width > 350
            ? `${heightWindow}px`
            : `${heightMobile}px`,
      }}
    >
      {Object.keys(groupedTransactions).map((date) => (
        <div key={date}>
          <h2 className="text-[#aaa] font-inter mt-2 max-w-[200px] text-center pp:max-w-max text-[14px] pp:text-[16px]">
            {new Date(date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="flex flex-col gap-3 mt-4">
            {groupedTransactions[date].map(
              (transaction: Transaction, index: number) => (
                <TransactionCard key={index} transaction={transaction} />
              )
            )}
          </div>
          <div className="w-full h-[1px] border border-black-100 mt-4"></div>
        </div>
      ))}
    </section>
  );
};

export default TransactionsList;

const groupTransactionsByDate = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const date = transaction.date.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(transaction);
    return acc;
  }, {});
};
