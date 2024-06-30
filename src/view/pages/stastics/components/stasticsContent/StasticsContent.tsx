import StasticsDoughnut from "../stasticsDoughnut/StasticsDoughnut";
import StasticsLine from "../../stasticsLine/StasticsLine";
import { Transaction } from "../../../transactions/components/transactionCard/TransactionCard";

const StasticsContent = ({
  filteredTransactions,
  activeMonth,
}: {
  filteredTransactions: Transaction[];
  activeMonth: number;
}) => {
  return (
    <section className="mt-10 flex flex-col gap-3 items-center justify-center w-full">
      <StasticsLine
        filteredTransactions={filteredTransactions}
        activeMonth={activeMonth}
      />
      <StasticsDoughnut filteredTransactions={filteredTransactions} />
    </section>
  );
};

export default StasticsContent;
