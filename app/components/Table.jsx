import React, { useEffect, useState } from "react";
import { getRecords } from "../api/api";

export default function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getRecords();
        if (response.success) {
          setData(response.data);
        } else {
          console.error("Error al obtener los registros:", response.message);
        }
      } catch (error) {
        console.error("Error al cargar los registros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 text-black">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border-b text-black">Nombre</th>
            <th className="p-3 border-b text-black">Área</th>
            <th className="p-3 border-b text-black">Fecha</th>
            <th className="p-3 border-b text-black">Consumible</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-3 text-center text-black">
                No hay registros disponibles
              </td>
            </tr>
          ) : (
            data.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="p-3 border-b text-black text-left">
                  {record.user_id && record.user_id.name
                    ? record.user_id.name
                    : "Sin nombre"}
                </td>
                <td className="p-3 border-b text-black text-left">
                  {record.area_id && record.area_id.name
                    ? record.area_id.name
                    : "Sin área"}
                </td>
                <td className="p-3 border-b text-black text-left">
                  {new Date(record.date).toLocaleDateString()}
                </td>
                <td className="p-3 border-b text-black text-left">
                  {record.consumable_id && record.consumable_id.name
                    ? record.consumable_id.name
                    : "Sin consumible"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
