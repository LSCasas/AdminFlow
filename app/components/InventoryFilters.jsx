// components/InventoryFilters.js
import React, { useState } from "react";

export default function InventoryFilters({ onFilterChange }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onFilterChange(value);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={query}
        onChange={handleChange}
        className="border p-2 rounded flex-1"
      />
    </div>
  );
}
