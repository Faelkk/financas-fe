import { Doughnut } from "react-chartjs-2";
import { Transaction } from "../../../transactions/components/transactionCard/TransactionCard";
import StaticsCategory from "./StaticsCategory";
import { categories } from "../../../../../mocks/categories";

const StasticsDoughnut = ({
  filteredTransactions,
}: {
  filteredTransactions: Transaction[];
}) => {
  const transactionsDespesas = filteredTransactions.filter(
    (transaction) => transaction.transactionType === "despesas"
  );

  const totalDespesas = transactionsDespesas.reduce((acc, transaction) => {
    return acc + Number(transaction.transferNumber);
  }, 0);

  const despesasByCategory = categories
    .map((category) => {
      const total = transactionsDespesas
        .filter((transaction) => transaction.categoryId === category.id)
        .reduce((acc, transaction) => {
          return acc + Number(transaction.transferNumber);
        }, 0);
      const percentage = totalDespesas > 0 ? (total / totalDespesas) * 100 : 0;
      return { ...category, total, percentage };
    })
    .filter((category) => category.total > 0);

  const data = {
    labels: despesasByCategory.map((category) => category.categoryName),
    datasets: [
      {
        borderColor: "transparent",
        data: despesasByCategory.map((category) => category.total),
        backgroundColor: despesasByCategory.map(
          (category) => category.categoryColor
        ),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      doughnut: {
        borderWidth: 0,
        cutout: "80%",
      },
    },
  };
  return (
    <>
      {despesasByCategory.length > 0 ? (
        <div className="bg-[#1C1B19] flex flex-col p-3 max-w-[90%] md:max-w-[50%] w-full rounded-md overflow-y-auto custom-scrollbar max-h-[350px]">
          <h2 className="font-poppins font-semibold text-gray-50 mb-3">
            Despesas por categorias
          </h2>
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <Doughnut data={data} options={options} />
          </div>

          <div className="flex flex-col gap-2 mt-4 ">
            {despesasByCategory.map((category) => (
              <StaticsCategory key={category.id} category={category} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-[#1C1B19] flex flex-col p-3 max-w-[90%] md:max-w-[50%] w-full rounded-md p-8">
          <h2 className="font-poppins font-semibold text-gray-50 mb-3">
            Despesas por categorias
          </h2>
          <span className="text-[#aaa] font-inter max-w-[200px] text-center pp:max-w-max text-[12px] pp:text-[16px]">
            Nenhum lançamento no período
          </span>
        </div>
      )}
    </>
  );
};

export default StasticsDoughnut;
