import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#B0005E] to-[#6C0036] py-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/dashboard">
          <img src="/icon/home-icon.png" alt="home" className="h-16 mb-4" />
        </Link>
        <div className="sm:flex space-x-6 text-white">
          {isAuthenticated && (
            <>
              <Link href="/formularioDeConsumible">
                <button className="hover:text-gray-300">Registrar</button>
              </Link>
              <Link href="/historialDeRegistros">
                <button className="hover:text-gray-300">Historial</button>
              </Link>
              <Link href="/inventario">
                <button className="hover:text-gray-300">Inventario</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
