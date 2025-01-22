import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LowStockAlerts from "../components/LowStockAlerts";
import InventoryTable from "../components/InventoryTable";
import InventoryFilters from "../components/InventoryFilters";
import AddItemForm from "../components/AddItemForm";

export default function Inventario() {
  const [items, setItems] = useState([
    { name: "Papel", quantity: 5 },
    { name: "Tinta", quantity: 15 },
    { name: "Marcadores", quantity: 8 },
    { name: "Cuadernos", quantity: 20 },
  ]);

  const [filteredItems, setFilteredItems] = useState(items);

  const handleFilterChange = (query) => {
    setFilteredItems(
      query === ""
        ? items
        : items.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
    );
  };

  const handleUpdateStock = (item, action, amount) => {
    const updatedItems = items.map((i) =>
      i.name === item.name
        ? {
            ...i,
            quantity:
              action === "add"
                ? i.quantity + amount
                : Math.max(0, i.quantity - amount),
          }
        : i
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
    setFilteredItems([...items, newItem]);
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedItems = items.filter(
      (item) => item.name !== itemToDelete.name
    );
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
          Inventario de Consumibles
        </h1>
        <LowStockAlerts items={items} />
        <AddItemForm onAddItem={handleAddItem} />
        <InventoryFilters onFilterChange={handleFilterChange} />
        <InventoryTable
          items={filteredItems}
          onUpdateStock={handleUpdateStock}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
}
