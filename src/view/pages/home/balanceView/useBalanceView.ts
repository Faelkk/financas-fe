import { useEffect, useState } from "react";
import { useModal } from "../../../modal/useModal";
import { calculateTotal } from "../../stastics/stasticsLine/useStaticsLineController";
import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { useTransactions } from "../../../../app/hooks/useTransactions";
import { typeTransactionsFilter } from "../../transactions/Transactions";

export function useBalanceView() {
  const [isClosed, setIsClosed] = useState(true);
  const [saldo, setSaldo] = useState<number>(0);
  const [formattedSaldo, setFormattedSaldo] = useState("");
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { isModalOpen, handleToggleModal } = useModal();
  const [filters] = useState<typeTransactionsFilter>({
    month: String(currentMonth),
    year: String(currentYear),
    type: "",
  });
  const { transactions } = useTransactions(filters);

  const totalDespesas = calculateTotal(transactions, "EXPENSE");
  const totalReceitas = calculateTotal(transactions, "INCOME");

  useEffect(() => {
    const savedSaldo = localStorage.getItem("saldo");
    if (savedSaldo !== null && savedSaldo !== String(savedSaldo)) {
      console.log(savedSaldo);

      setSaldo(parseFloat(savedSaldo));
    } else {
      console.log("caiu aqui");

      const newSaldo = totalReceitas - totalDespesas;
      setSaldo(newSaldo);
      localStorage.setItem("saldo", String(newSaldo));
    }
  }, [totalDespesas, totalReceitas, transactions]);

  useEffect(() => {
    setFormattedSaldo(formatCurrency(String(saldo)));
  }, [saldo]);

  return {
    formattedSaldo,
    isModalOpen,
    handleToggleModal,
    isClosed,
    setIsClosed,
    saldo,
    setSaldo,
    setFormattedSaldo,
  };
}
