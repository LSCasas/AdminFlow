import React, { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ReportCharts({ data, type }) {
  const chartData = {
    labels: data.map((d) => d.consumable),
    datasets: [
      {
        label: "Cantidad",
        data: data.map((d) => d.quantity),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="bg-white shadow rounded p-4">
      {type === "bar" && <Bar data={chartData} />}
      {type === "pie" && <Pie data={chartData} />}
    </div>
  );
}
