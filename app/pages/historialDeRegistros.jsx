import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

export default function HistorialDeRegistros() {
  const [data, setData] = useState([
    {
      name: "Registro 1",
      area: "Área A",
      date: "2025-01-01",
      consumable: "Consumible X",
    },
    {
      name: "Registro 2",
      area: "Área B",
      date: "2025-01-05",
      consumable: "Consumible Y",
    },
    {
      name: "Registro 3",
      area: "Área C",
      date: "2025-01-10",
      consumable: "Consumible Z",
    },
  ]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#6C0036]">
          Historial de Registros
        </h1>
        <Table data={data} />
      </div>
    </div>
  );
}
