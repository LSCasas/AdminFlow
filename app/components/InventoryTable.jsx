import React, { useEffect, useState } from "react";
import {
  getAllConsumables,
  updateConsumable,
  deleteConsumable,
} from "../api/api";

function InventoryFilters({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded mb-6">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded flex-1 text-black"
      />
    </div>
  );
}

export default function InventoryTable() {
  const [consumables, setConsumables] = useState([]);
  const [displayedConsumables, setDisplayedConsumables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10; // Número de registros por página

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

  useEffect(() => {
    const filtered = consumables.filter((consumable) =>
      consumable.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = currentPage * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setDisplayedConsumables(filtered.slice(startIndex, endIndex));
  }, [searchTerm, consumables, currentPage]);

  const handleAddStock = async (id, stock) => {
    const amount = parseInt(prompt("¿Cuántos deseas agregar al stock?"), 10);
    if (!isNaN(amount)) {
      const updatedStock = stock + amount;
      const updates = {
        stock: updatedStock,
      };

      try {
        await updateConsumable(id, updates);
        const newConsumables = consumables.map((consumable) =>
          consumable._id === id
            ? { ...consumable, stock: updatedStock }
            : consumable
        );
        setConsumables(newConsumables);
      } catch (error) {
        console.error("Error al actualizar el consumible:", error.message);
      }
    }
  };

  const handleReduceQuantity = async (id, quantity) => {
    const amount = parseInt(
      prompt("¿Cuántos deseas reducir de la cantidad?"),
      10
    );
    if (!isNaN(amount)) {
      const updatedQuantity = (quantity || 0) + amount;

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

  const handleReset = async (id) => {
    const updates = { stock: 0, quantity: 0 };
    try {
      await updateConsumable(id, updates);

      const newConsumables = consumables.map((consumable) =>
        consumable._id === id
          ? { ...consumable, stock: 0, quantity: 0 }
          : consumable
      );
      setConsumables(newConsumables);
    } catch (error) {
      console.error("Error al resetear el consumible:", error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este consumible?, Algunas personas podrían estar relacionadas a este consumible."
    );
    if (confirmDelete) {
      try {
        await deleteConsumable(id);
        const newConsumables = consumables.filter(
          (consumable) => consumable._id !== id
        );
        setConsumables(newConsumables);
      } catch (error) {
        console.error("Error al eliminar el consumible:", error.message);
      }
    }
  };

  const totalRecords = consumables.filter((consumable) =>
    consumable.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;
  const startIndex = currentPage * recordsPerPage + 1;
  const endIndex = Math.min(startIndex + recordsPerPage - 1, totalRecords);

  const handleLoadNext = () => {
    if ((currentPage + 1) * recordsPerPage < totalRecords) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLoadPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <InventoryFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-black">Consumible</th>
            <th className="px-4 py-2 border-b text-black">Cantidad</th>
            <th className="px-4 py-2 border-b text-black">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayedConsumables.length > 0 ? (
            displayedConsumables.map((consumable) => (
              <tr key={consumable._id}>
                <td className="px-4 py-2 border-b text-black">
                  {consumable.name}
                </td>
                <td className="px-4 py-2 border-b text-black">
                  {consumable.stock - (consumable.quantity || 0)}
                </td>
                <td className="px-4 py-2 border-b text-black">
                  <button
                    onClick={() =>
                      handleAddStock(consumable._id, consumable.stock)
                    }
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
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center text-black">
                No hay consumibles disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handleLoadPrev}
          disabled={currentPage === 0}
          className={`${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img
            src="icon/left-arrow-icon.png"
            alt="Retroceder"
            className="h-6 w-6"
          />
        </button>
        <span className="text-gray-600">
          {startIndex}–{endIndex} de {totalRecords}
        </span>
        <button
          onClick={handleLoadNext}
          disabled={(currentPage + 1) * recordsPerPage >= totalRecords}
          className={`${
            (currentPage + 1) * recordsPerPage >= totalRecords
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <img
            src="icon/right-arrow-icon.png"
            alt="Avanzar"
            className="h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
}
