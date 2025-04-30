import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Table from "../components/inventory/Table";

export default function HistorialDeRegistros() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#1C2039]">
          Historial de Registros
        </h1>
        <Table />
      </div>
    </div>
  );
}
