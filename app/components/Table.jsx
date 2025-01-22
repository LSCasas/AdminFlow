// components/Table.js
import React from "react";

export default function Table({ data }) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="p-3 border-b">Nombre</th>
            <th className="p-3 border-b">Área</th>
            <th className="p-3 border-b">Fecha</th>
            <th className="p-3 border-b">Consumible</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="p-3 border-b">{item.name}</td>
              <td className="p-3 border-b">{item.area}</td>
              <td className="p-3 border-b">{item.date}</td>
              <td className="p-3 border-b">{item.consumable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
