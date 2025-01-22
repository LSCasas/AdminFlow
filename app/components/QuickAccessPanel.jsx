import React from "react";

const QuickAccessPanel = () => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg grid grid-cols-2 gap-4">
      <button className="bg-[#B0005E] text-white py-4 rounded-lg hover:bg-[#6C0036]">
        Registrar
      </button>
      <button className="bg-[#B0005E] text-white py-4 rounded-lg hover:bg-[#6C0036]">
        Historial
      </button>
      <button className="bg-[#B0005E] text-white py-4 rounded-lg hover:bg-[#6C0036]">
        Inventario
      </button>
      <button className="bg-[#B0005E] text-white py-4 rounded-lg hover:bg-[#6C0036]">
        Reportes
      </button>
    </div>
  );
};

export default QuickAccessPanel;
