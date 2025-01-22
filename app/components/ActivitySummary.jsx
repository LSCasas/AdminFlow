import React from "react";

const ActivitySummary = () => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#6C0036]">
        Últimos Registros
      </h2>
      <ul className="mt-4 space-y-4">
        <li className="border-b pb-2">Registro 1 - 20 de enero</li>
        <li className="border-b pb-2">Registro 2 - 18 de enero</li>
        <li className="border-b pb-2">Registro 3 - 15 de enero</li>
      </ul>
    </div>
  );
};

export default ActivitySummary;
