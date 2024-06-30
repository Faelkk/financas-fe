import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { Transaction } from "../../transactions/components/transactionCard/TransactionCard";
import LineChart from "../components/lineChart/LineChart";
import { useStaticsLineController } from "./useStaticsLineController";

const StasticsLine = ({
  filteredTransactions,
  activeMonth,
}: {
  filteredTransactions: Transaction[];
  activeMonth: number;
}) => {
  const {
    data,
    formatCurrencyDespesas,
    formatCurrencyReceitas,
    calculateTotal,
  } = useStaticsLineController(filteredTransactions, activeMonth);

  const totalDespesas = calculateTotal(filteredTransactions, "despesas");
  const totalReceitas = calculateTotal(filteredTransactions, "receitas");

  return (
    <div className="bg-[#1C1B19] flex flex-col p-3 max-w-[90%] md:max-w-[50%] md:max-h-[300px] w-full rounded-md">
      <h2 className="font-poppins font-semibold text-gray-50 mb-3">
        Entradas x Saídas
      </h2>
      <LineChart data={data} />

      <div className="p-3 flex justify-between items-center w-full">
        <div className="flex flex-col items-center">
          <span className="font-inter text-teal-900 font-medium text-[14px]">
            R$ {formatCurrencyReceitas}
          </span>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[12px] pp:text-[16px]">
            Entradas
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-inter text-red-400 font-medium text-[14px]">
            R$ {formatCurrencyDespesas}
          </span>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[12px] pp:text-[16px]">
            Saídas
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-inter text-[#8CA3CD] font-medium text-[14px]">
            R$ {formatCurrency(String(totalReceitas - totalDespesas))}
          </span>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[12px] pp:text-[16px]">
            Saldo
          </span>
        </div>
      </div>
    </div>
  );
};

export default StasticsLine;
