import React from "react";

export default function InventoryFilters() {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre"
        className="border p-2 rounded flex-1 text-black"
      />
    </div>
  );
}
