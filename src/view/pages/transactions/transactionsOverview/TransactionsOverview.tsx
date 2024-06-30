import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { Transaction } from "../components/transactionCard/TransactionCard";

type TransactionType = "despesas" | "receitas";

const TransactionsOverview = ({
  filteredTransactions,
}: {
  filteredTransactions: Transaction[];
}) => {
  const calculateTotal = (
    transactions: Transaction[],
    type: TransactionType
  ): number => {
    const total = transactions
      .filter((transaction) => transaction.transactionType === type)
      .reduce((acc, transaction) => {
        const amount = parseFloat(transaction.transferNumber);
        return acc + amount;
      }, 0);

    return total;
  };

  const totalDespesas = calculateTotal(filteredTransactions, "despesas");
  const totalReceitas = calculateTotal(filteredTransactions, "receitas");

  return (
    <div className="px-3 hidden pp:flex justify-center items-center border-t border-black-300 h-[110px]">
      <div className="p-3 flex justify-between items-center w-[90%]">
        <div className="flex flex-col items-center">
          <span className="font-inter text-red-400 font-medium">
            {formatCurrency(String(totalDespesas))}
          </span>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[14px] pp:text-[16px]">
            despesas
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-inter text-teal-900 font-medium">
            {formatCurrency(String(totalReceitas))}
          </span>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[14px] pp:text-[16px]">
            receitas
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-inter text-[#8CA3CD] font-medium">
            {formatCurrency(String(totalReceitas - totalDespesas))}
          </span>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[14px] pp:text-[16px]">
            Saldo
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionsOverview;
