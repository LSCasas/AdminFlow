// components/ReportTable.js
import React from "react";

export default function ReportTable({ data }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4 mb-6">
      <table className="min-w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Área</th>
            <th className="px-4 py-2 border-b">Consumible</th>
            <th className="px-4 py-2 border-b">Fecha</th>
            <th className="px-4 py-2 border-b">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border-b">{row.area}</td>
              <td className="px-4 py-2 border-b">{row.consumable}</td>
              <td className="px-4 py-2 border-b">{row.date}</td>
              <td className="px-4 py-2 border-b">{row.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
