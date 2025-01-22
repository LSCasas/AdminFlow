// pages/reportes.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ReportFilters from "../components/ReportFilters";
import ReportTable from "../components/ReportTable";
import ChartSelector from "../components/ChartSelector";
import ReportCharts from "../components/ReportCharts";
import ExportButtons from "../components/ExportButtons";

export default function Reportes() {
  const [filters, setFilters] = useState({});
  const [chartType, setChartType] = useState("bar");
  const [reportData, setReportData] = useState([
    { area: "Oficina", consumable: "Papel", date: "2025-01-20", quantity: 10 },
    { area: "Almacén", consumable: "Tinta", date: "2025-01-21", quantity: 5 },
    {
      area: "Oficina",
      consumable: "Marcadores",
      date: "2025-01-22",
      quantity: 8,
    },
  ]);

  const handleFilterChange = (filters) => {
    setFilters(filters);
    // Aquí puedes implementar la lógica para filtrar los datos reales
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
          Reportes Personalizados
        </h1>
        <ReportFilters onFilterChange={handleFilterChange} />
        <ExportButtons />
        <ChartSelector selected={chartType} onSelect={setChartType} />
        <ReportCharts data={reportData} type={chartType} />
        <ReportTable data={reportData} />
      </div>
    </div>
  );
}
