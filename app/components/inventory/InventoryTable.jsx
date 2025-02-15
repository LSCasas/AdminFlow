import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import {
  getAllConsumables,
  updateConsumable,
  deleteConsumable,
} from "@/api/api";
import InventoryFilters from "../filters/InventoryFilters";
import ConsumableRow from "../consumables/ConsumableRow";
import Pagination from "../forms/Pagination";

export default function InventoryTable() {
  const [consumables, setConsumables] = useState([]);
  const [displayedConsumables, setDisplayedConsumables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const recordsPerPage = 10;

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
    // Filtrar consumibles por el término de búsqueda
    const filtered = consumables.filter((consumable) =>
      consumable.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Establecer los consumibles que se mostrarán en la página actual
    const startIndex = currentPage * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setDisplayedConsumables(filtered.slice(startIndex, endIndex));
  }, [searchTerm, consumables, currentPage]);

  // Función para manejar la adición de stock
  const handleAddStock = async (id, stock) => {
    const amount = parseInt(prompt("¿Cuántos deseas agregar al stock?"), 10);
    if (!isNaN(amount)) {
      const updatedStock = stock + amount;
      const updates = { stock: updatedStock };

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

  // Función para manejar la reducción de cantidad
  const handleReduceQuantity = async (id, quantity) => {
    const amount = parseInt(
      prompt("¿Cuántos deseas reducir de la cantidad?"),
      10
    );
    if (!isNaN(amount)) {
      const updatedQuantity = (quantity || 0) + amount;
      const updates = { quantity: updatedQuantity };

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

  // Función para manejar el reset de stock y cantidad
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

  // Función para manejar la eliminación de un consumible
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este consumible?"
    );
    if (confirmDelete) {
      try {
        await deleteConsumable(id);
        const newConsumables = consumables.filter(
          (consumable) => consumable._id !== id
        );
        setConsumables(newConsumables);
        toast.success("Consumible eliminado", {
          position: window.innerWidth < 640 ? "top-center" : "bottom-left",
          style: {
            fontSize: "16px",
            padding: "15px",
            maxWidth: "90vw",
            width: "auto",
          },
        });
      } catch (error) {
        console.error("Error al eliminar el consumible:", error.message);
      }
    }
  };

  // Función para asegurarse de que no haya consumibles duplicados
  const mergeConsumables = (consumables) => {
    const merged = [];
    consumables.forEach((consumable) => {
      const existing = merged.find(
        (item) => item.name.toLowerCase() === consumable.name.toLowerCase()
      );
      if (existing) {
        existing.stock += consumable.stock;
        existing.quantity += consumable.quantity;
      } else {
        merged.push({ ...consumable });
      }
    });
    return merged;
  };

  // Filtrar y unificar los consumibles antes de renderizarlos
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
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border-b text-black">Consumible</th>
            <th className="px-4 py-2 border-b text-black">Cantidad</th>
            <th className="px-4 py-2 border-b text-black">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {displayedConsumables.length > 0 ? (
            mergeConsumables(displayedConsumables.reverse()).map(
              (consumable) => (
                <ConsumableRow
                  key={consumable._id}
                  consumable={consumable}
                  handleAddStock={handleAddStock}
                  handleReduceQuantity={handleReduceQuantity}
                  handleReset={handleReset}
                  handleDelete={handleDelete}
                />
              )
            )
          ) : (
            <tr>
              <td colSpan="3" className="px-4 py-2 text-center text-black">
                No hay consumibles disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalRecords={totalRecords}
        recordsPerPage={recordsPerPage}
        handleLoadNext={handleLoadNext}
        handleLoadPrev={handleLoadPrev}
        startIndex={startIndex}
        endIndex={endIndex}
      />
      <Toaster />
    </div>
  );
}
