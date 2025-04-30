import React from "react";
import Navbar from "../components/layout/Navbar";
import InventoryTable from "../components/inventory/InventoryTable";
import AddItemForm from "../components/consumables/AddItemForm";

export default function Inventario() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
          Inventario de Consumibles
        </h1>
        <AddItemForm />
        <InventoryTable />
      </div>
    </div>
  );
}
