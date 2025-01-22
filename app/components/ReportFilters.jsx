// components/ReportFilters.js
import React, { useState } from "react";

export default function ReportFilters({ onFilterChange }) {
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [consumable, setConsumable] = useState("");

  const handleFilter = () => {
    onFilterChange({ area, date, consumable });
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">
      <h2 className="text-lg font-bold mb-4">Filtros de Reportes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Área"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Consumible"
          value={consumable}
          onChange={(e) => setConsumable(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={handleFilter}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Aplicar Filtros
      </button>
    </div>
  );
}
