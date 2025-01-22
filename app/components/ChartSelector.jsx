// components/ChartSelector.js
import React from "react";

export default function ChartSelector({ selected, onSelect }) {
  return (
    <div className="mb-6">
      <button
        onClick={() => onSelect("bar")}
        className={`px-4 py-2 rounded ${
          selected === "bar" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        Barras
      </button>
      <button
        onClick={() => onSelect("pie")}
        className={`px-4 py-2 ml-2 rounded ${
          selected === "pie" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        Pastel
      </button>
    </div>
  );
}
