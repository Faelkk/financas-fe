import React from "react";
import { cn } from "../../../../../app/utils/cn";
import { useModal } from "../../../../modal/useModal";
import EditTransaction from "../../../../components/editTransaction/EditTransaction";
import { BackpackIcon } from "@radix-ui/react-icons";
import { Transaction } from "../../../../../app/entities/Transactions";
import { useCategories } from "../../../../../app/hooks/useCategories";

type TransactionCardProps = {
  transaction: Transaction;
};

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

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const isLower = transaction.transactionType === "EXPENSE" ? true : false;
  const { isModalOpen, handleToggleModal } = useModal();
  const { categories } = useCategories();

  const category = categories.find((cat) => cat.id === transaction.categoryId);

  return (
    <>
      <div
        className="flex justify-between w-full mt-2 cursor-pointer"
        onClick={handleToggleModal}
      >
        <div className="flex gap-3 w-full justify-between">
          <div className="flex gap-5 flex-1">
            <button
              className="rounded-full max-w-12 max-h-12 w-full flex items-center justify-center"
              style={{ backgroundColor: category?.categoryColor }}
            >
              <BackpackIcon height="20" width="20" color="#FFF" />
            </button>
            <div className="flex flex-col">
              <h2 className="font-inter text-gray-50">
                {transaction.transactionDescription}
              </h2>
              <span className="text-[#aaa] font-inter mt-1 text-[14px] max-w-[180px]">
                Conta inicial
              </span>
            </div>
          </div>
          <div>
            <h2
              className={cn(
                "font-inter ",
                isLower ? "text-red-400" : "text-teal-900"
              )}
            >
              {isLower ? "-" : "+"}
              {formatCurrency(String(transaction.transactionValue))}
            </h2>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <EditTransaction
          transaction={transaction}
          IsTransactionModalOpen={isModalOpen}
          handleToggleTransactionModal={handleToggleModal}
        />
      )}
    </>
  );
};

export default TransactionCard;
