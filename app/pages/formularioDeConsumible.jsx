import React from "react";
import ConsumibleForm from "@/components/ConsumibleForm"; // Asegúrate de tener el archivo ConsumibleForm.js
import Navbar from "@/components/Navbar"; // Asegúrate de tener el archivo Navbar.js

export default function ConsumibleFormPage() {
  return (
    <div className="min-h-screen bg-white">
      {" "}
      {/* Fondo blanco para toda la página */}
      <Navbar />
      <div className="container mx-auto p-8 bg-white">
        {" "}
        {/* Fondo blanco para el contenedor */}
        <ConsumibleForm />
      </div>
    </div>
  );
}
