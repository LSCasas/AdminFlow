import React from "react";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-[#B0005E] to-[#6C0036] py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <img
          src="/logos/logocultura.png"
          alt="Logo Cultura"
          className="h-16 mb-4"
        />
        <div className="sm:flex space-x-6 text-white">
          <button className="hover:text-gray-300">Registrar</button>
          <button className="hover:text-gray-300">Historial</button>
          <button className="hover:text-gray-300">Inventario</button>
        </div>
        <div className="mt-4 sm:mt-0 sm:hidden">
          {" "}
          <button className="hover:text-gray-300">Reportes</button>
        </div>
      </div>
    </div>
  );
}
