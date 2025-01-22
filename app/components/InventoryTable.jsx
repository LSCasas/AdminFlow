// components/InventoryTable.js
import React, { useState } from "react";

export default function InventoryTable({ items, onUpdateStock, onDeleteItem }) {
  const [editingItem, setEditingItem] = useState(null);
  const [editQuantity, setEditQuantity] = useState(0);

  const handleEditClick = (item, action) => {
    setEditingItem({ ...item, action });
    setEditQuantity(0);
  };

  const handleSaveClick = () => {
    onUpdateStock(editingItem, editingItem.action, editQuantity);
    setEditingItem(null);
    setEditQuantity(0);
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Consumible</th>
            <th className="px-4 py-2 border-b">Cantidad</th>
            <th className="px-4 py-2 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{item.name}</td>
              <td className="px-4 py-2 border-b">{item.quantity}</td>
              <td className="px-4 py-2 border-b">
                {editingItem && editingItem.name === item.name ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(Number(e.target.value))}
                      className="border p-1 rounded w-20"
                    />
                    <button
                      onClick={handleSaveClick}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingItem(null)}
                      className="bg-gray-300 text-black px-4 py-2 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditClick(item, "add")}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Añadir
                    </button>
                    <button
                      onClick={() => handleEditClick(item, "reduce")}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Reducir
                    </button>
                    <button
                      onClick={() => onDeleteItem(item)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
