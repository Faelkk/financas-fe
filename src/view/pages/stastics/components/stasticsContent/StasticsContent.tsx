import StasticsDoughnut from "../stasticsDoughnut/StasticsDoughnut";
import StasticsLine from "../../stasticsLine/StasticsLine";
import { TransactionResponse } from "../../../../../app/services/transactionsService/getAll";

const StasticsContent = ({
  filteredTransactions,
  activeMonth,
}: {
  filteredTransactions: TransactionResponse;
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
