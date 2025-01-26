import React, { useState } from "react";
import { createConsumable } from "../api/api"; // Asegúrate de que la ruta sea correcta

export default function AddItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddClick = async () => {
    if (name.trim() && stock > 0) {
      setIsLoading(true);
      setError("");
      try {
        // Llamar a la función para crear el consumible
        const newConsumable = await createConsumable({
          name,
          stock: Number(stock),
        });

        // Notificar al componente padre si es necesario
        if (onAddItem) {
          onAddItem(newConsumable);
        }

        // Limpiar los campos del formulario
        setName("");
        setStock(0);
      } catch (error) {
        // Manejar errores
        setError(error.message || "Hubo un problema al agregar el consumible.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Por favor, completa todos los campos correctamente.");
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
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleAddClick}
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-400" : "bg-green-500"
          } text-white px-4 py-2 rounded w-full sm:w-auto`}
        >
          {isLoading ? "Agregando..." : "Agregar"}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
