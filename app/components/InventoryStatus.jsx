import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryStatus = () => {
  const data = {
    labels: [
      "Consumibles en uso",
      "Consumibles disponibles",
      "Consumibles vencidos",
    ],
    datasets: [
      {
        label: "Estado del Inventario",
        data: [30, 50, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF4382", "#2D8CFF", "#FFB83D"],
      },
    ],
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#6C0036]">
        Estado del Inventario
      </h2>
      <div className="mt-4 md:h-[42vh]">
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default InventoryStatus;
