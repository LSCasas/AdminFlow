import React from "react";
import Link from "next/link";
export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-[#B0005E] to-[#6C0036] py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/dashboard">
          <img
            src="/logos/logocultura.png"
            alt="Logo Cultura"
            className="h-16 mb-4"
          />
        </Link>
        <div className="sm:flex space-x-6 text-white">
          <Link href="/formularioDeConsumible">
            <button className="hover:text-gray-300">Registrar</button>
          </Link>
          <Link href="/historialDeRegistros">
            <button className="hover:text-gray-300">Historial</button>
          </Link>
          <Link href="/inventario">
            <button className="hover:text-gray-300">Inventario</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
