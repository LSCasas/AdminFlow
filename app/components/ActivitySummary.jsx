import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRecords } from "../api/api";

const ActivitySummary = () => {
  const [records, setRecords] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getRecords();
        if (response.success) {
          const lastFiveRecords = response.data.slice(-5);
          setRecords(lastFiveRecords);
        } else {
          console.error("Error al obtener los registros:", response.message);
        }
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      }
    };

    fetchRecords();
  }, []);

  const handleRecordClick = () => {
    router.push(`/historialDeRegistros`);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#6C0036]">
        Últimos Registros
      </h2>
      <ul className="mt-4 space-y-4 text-neutral-600">
        {records.length === 0 ? (
          <li>No hay registros disponibles</li>
        ) : (
          records.map((record, index) => (
            <li
              key={index}
              className="border-b pb-2 cursor-pointer hover:text-blue-500"
              onClick={handleRecordClick}
            >
              {record.user_id?.name} -{" "}
              <span className="p-3 border-b  text-left">
                {new Date(record.date).toLocaleDateString("es-MX", {
                  timeZone: "UTC",
                })}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ActivitySummary;
