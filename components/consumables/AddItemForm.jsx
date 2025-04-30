import React, { useState } from "react";
import { toast, Toaster } from "sonner";
import { createConsumable } from "@/api/api";

export default function AddItemForm({ onAddItem, filterItems }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddClick = async () => {
    if (name.trim() && stock > 0) {
      setIsLoading(true);
      setError("");
      try {
        const newConsumable = await createConsumable({
          name,
          stock: Number(stock),
        });

        if (newConsumable?.success) {
          toast.success("Registro exitoso", {
            position: window.innerWidth < 640 ? "top-center" : "bottom-left",
            style: {
              fontSize: "16px",
              padding: "15px",
              maxWidth: "90vw",
              width: "auto",
            },
          });

          // Recargar la página
          window.location.reload();

          if (onAddItem) {
            onAddItem(newConsumable);
          }

          if (filterItems) {
            filterItems(name);
          }

          setName("");
          setStock(0);
        } else {
          throw new Error("Error al registrar el consumible.");
        }
      } catch (error) {
        // Manejar errores
        setError(error.message || "Hubo un problema al agregar el consumible.");
        toast.error(
          error.message || "Hubo un problema al agregar el consumible.",
          {
            position: window.innerWidth < 640 ? "top-center" : "bottom-left",
            style: {
              fontSize: "16px",
              padding: "15px",
              maxWidth: "90vw",
              width: "auto",
            },
          }
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Por favor, completa todos los campos correctamente.");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">
      <h2 className="text-lg text-zinc-800 font-bold mb-4 text-center sm:text-left">
        Agregar Nuevo Consumible
      </h2>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Input para el nombre */}
        <input
          type="text"
          placeholder="Nombre del consumible"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[150px] text-black"
          style={{ color: "black" }}
        />
        {/* Input para la cantidad */}
        <input
          type="number"
          min="1"
          placeholder="Cantidad"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border p-2 rounded w-24 text-black"
          style={{ color: "black" }}
        />
        {/* Botón para agregar */}
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
      <Toaster />
    </div>
  );
}
