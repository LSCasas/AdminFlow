import React, { useEffect, useState } from "react";
import { getAllConsumables, updateConsumable } from "../api/api";

export default function InventoryTable() {
  const [consumables, setConsumables] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConsumables = async () => {
      try {
        const response = await getAllConsumables();

        if (Array.isArray(response.data)) {
          setConsumables(response.data);
        } else {
          console.error("La propiedad 'data' no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener los consumibles:", error.message);
      }
    };

    fetchConsumables();
  }, []);

  const handleAddQuantity = async (id, stock, currentQuantity) => {
    const amount = parseInt(prompt("¿Cuántos deseas agregar al stock?"), 10);
    if (!isNaN(amount)) {
      const updatedQuantity = currentQuantity + amount; // Sumar la cantidad ingresada
      const updates = {
        quantity: updatedQuantity,
      };

      try {
        await updateConsumable(id, updates);
        const newConsumables = consumables.map((consumable) =>
          consumable._id === id
            ? { ...consumable, quantity: updatedQuantity }
            : consumable
        );
        setConsumables(newConsumables);
      } catch (error) {
        console.error("Error al actualizar el consumible:", error.message);
      }
    }
  };

  const handleReduceQuantity = async (id, stock, currentQuantity) => {
    const amount = parseInt(
      prompt("¿Cuántos deseas reducir de la cantidad?"),
      10
    );
    if (!isNaN(amount)) {
      const updatedQuantity = currentQuantity - amount; // Restar la cantidad ingresada
      const updates = {
        quantity: updatedQuantity,
      };

      try {
        await updateConsumable(id, updates);
        const newConsumables = consumables.map((consumable) =>
          consumable._id === id
            ? { ...consumable, quantity: updatedQuantity }
            : consumable
        );
        setConsumables(newConsumables);
      } catch (error) {
        console.error("Error al actualizar el consumible:", error.message);
      }
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-black">Consumible</th>
            <th className="px-4 py-2 border-b text-black">Cantidad</th>
            <th className="px-4 py-2 border-b text-black">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {consumables.length > 0 ? (
            consumables.map((consumable) => (
              <tr key={consumable._id}>
                <td className="px-4 py-2 border-b text-black">
                  {consumable.name}
                </td>
                <td className="px-4 py-2 border-b text-black">
                  {consumable.quantity || consumable.stock}
                </td>
                <td className="px-4 py-2 border-b text-black">
                  <div className="flex items-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={() =>
                        handleAddQuantity(
                          consumable._id,
                          consumable.stock,
                          consumable.quantity || consumable.stock
                        )
                      }
                    >
                      Añadir
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() =>
                        handleReduceQuantity(
                          consumable._id,
                          consumable.stock,
                          consumable.quantity || consumable.stock
                        )
                      }
                    >
                      Reducir
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-4 py-2 border-b text-center text-black"
              >
                No hay consumibles disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
