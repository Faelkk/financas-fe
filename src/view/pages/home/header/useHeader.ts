import { useState } from "react";
import { useModal } from "../../../modal/useModal";
import { calculateTotal } from "../../stastics/stasticsLine/useStaticsLineController";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { useTransactions } from "../../../../app/hooks/useTransactions";
import { typeTransactionsFilter } from "../../transactions/Transactions";
import { useAuth } from "../../../../app/hooks/useAuth";

export function useHeader() {
  const { user } = useAuth();

  const { isModalOpen, handleToggleModal } = useModal();
  const {
    isModalOpen: isTransactionModalOpen,
    handleToggleModal: handleToggleTransactionModal,
  } = useModal();
  const [transactionType, setIsTransactionType] = useState("despesa");

  const handleChangeTransactionType = (type: string) => {
    setIsTransactionType(type);
    handleToggleTransactionModal();
  };

  const currentMonth = new Date().getMonth() + 1;

  const currentYear = new Date().getFullYear();
  const [filters] = useState<typeTransactionsFilter>({
    month: String(currentMonth),
    year: String(currentYear),
    type: "",
  });
  const { transactions } = useTransactions(filters);

  const totalDespesas = calculateTotal(transactions, "EXPENSE");
  const totalReceitas = calculateTotal(transactions, "INCOME");

  const formattedDespesa = formatCurrency(String(totalDespesas));
  const formattedReceita = formatCurrency(String(totalReceitas));
  return {
    user,
    transactionType,
    handleChangeTransactionType,
    isTransactionModalOpen,
    formattedDespesa,
    isModalOpen,
    handleToggleModal,
    formattedReceita,
    handleToggleTransactionModal,
  };
}
