import React, { useState } from "react";

export default function AddItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleAddClick = () => {
    if (name.trim() && quantity > 0) {
      onAddItem({ name, quantity: Number(quantity) });
      setName("");
      setQuantity(0);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">
      <h2 className="text-lg font-bold mb-4 text-center sm:text-left">
        Agregar Nuevo Consumible
      </h2>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Nombre del consumible"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px]"
        />
        <input
          type="number"
          min="1"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
