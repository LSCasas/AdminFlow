import React from "react";

export default function LowStockAlerts({ items }) {
  const lowStockItems = items.filter((item) => item.quantity < 10);

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded mb-6">
      <h2 className="font-bold">Alertas de Bajo Stock:</h2>
      {lowStockItems.length > 0 ? (
        <ul>
          {lowStockItems.map((item, index) => (
            <li key={index}>
              {item.name}: Quedan {item.quantity} unidades.
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay consumibles con bajo stock.</p>
      )}
    </div>
  );
}
