import React from "react";

export default function ConsumableRow({
  consumable,
  handleAddStock,
  handleReduceQuantity,
  handleReset,
  handleDelete,
}) {
  return (
    <tr key={consumable._id}>
      <td className="px-4 py-2 border-b text-black">{consumable.name}</td>
      <td className="px-4 py-2 border-b text-black">
        {consumable.stock - (consumable.quantity || 0)}
      </td>
      <td className="px-4 py-2 border-b text-black">
        <button
          onClick={() => handleAddStock(consumable._id, consumable.stock)}
          className="text-blue-500 hover:underline"
        >
          Añadir stock
        </button>
        <button
          onClick={() =>
            handleReduceQuantity(consumable._id, consumable.quantity)
          }
          className="text-yellow-500 hover:underline ml-2"
        >
          Reducir cantidad
        </button>
        <button
          onClick={() => handleReset(consumable._id)}
          className="text-gray-500 hover:underline ml-2"
        >
          Resetear
        </button>
        <button
          onClick={() => handleDelete(consumable._id)}
          className="text-red-500 hover:underline ml-2"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
