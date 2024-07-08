import { Bar } from "react-chartjs-2";
import "chart.js/auto";

interface LineChartProps {
  data: DataLine;
}

interface DataLine {
  mes: string;
  receitas: string;
  despesas: string;
}

const LineChart = ({ data }: LineChartProps) => {
  const receitasValue = parseFloat(
    data.receitas.replace("R$", "").replace(",", ".")
  );
  const despesasValue = parseFloat(
    data.despesas.replace("R$", "").replace(",", ".")
  );

  const chartData = {
    labels: [data.mes],
    datasets: [
      {
        label: "Receitas",
        backgroundColor: "#087F5B",
        borderColor: "#087F5B",
        borderWidth: 1,
        data: [receitasValue || 0],
      },
      {
        label: "Despesas",
        backgroundColor: "#DF535E",
        borderColor: "#DF535E",
        borderWidth: 1,
        data: [despesasValue || 0],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: data.mes,
          font: {
            size: 16,
          },
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    layout: {
      padding: 0,
    },
  };

  return (
    <div className="flex justify-center max-h-[150px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
