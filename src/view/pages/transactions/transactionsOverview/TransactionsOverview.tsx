import { TransactionResponse } from "../../../../app/services/transactionsService/getAll";

type TransactionType = "EXPENSE" | "INCOME";

export const formatCurrency = (value: string): string => {
  const number = parseFloat(value);
  if (isNaN(number)) {
    return "Invalid number";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(number);
};

const TransactionsOverview = ({
  filteredTransactions,
}: {
  filteredTransactions: TransactionResponse;
}) => {
  const calculateTotal = (
    transactions: TransactionResponse,
    type: TransactionType
  ): number => {
    const total = transactions
      .filter((transaction) => transaction.transactionType === type)
      .reduce((acc, transaction) => {
        const amount = parseFloat(transaction.transactionValue);

        return acc + amount;
      }, 0);

    return total;
  };

  const totalDespesas = calculateTotal(filteredTransactions, "EXPENSE");
  const totalReceitas = calculateTotal(filteredTransactions, "INCOME");

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
