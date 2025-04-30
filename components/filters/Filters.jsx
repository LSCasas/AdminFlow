import React, { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    name: "",
    area: "",
    date: "",
    consumable: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 rounded-md text-black">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Buscar por nombre"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="text"
        name="area"
        value={filters.area}
        onChange={handleChange}
        placeholder="Buscar por área"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
      <input
        type="text"
        name="consumable"
        value={filters.consumable}
        onChange={handleChange}
        placeholder="Buscar por consumible"
        className="flex-1 min-w-[150px] p-2 border rounded"
      />
    </div>
  );
}
