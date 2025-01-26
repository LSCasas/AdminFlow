import React, { useEffect, useState } from "react";
import { getRecords, deleteRecord } from "../api/api";
import { toast, Toaster } from "sonner";

import Filters from "./Filters";
import ExportButtons from "./ExportButtons";

export default function Table() {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({
    name: "",
    area: "",
    date: "",
    consumable: "",
  });
  const recordsPerPage = 20;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getRecords();
        if (response.success) {
          const reversedData = response.data.reverse(); // Invertir el orden de los registros
          setData(reversedData);
          setFilteredData(reversedData);
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

  useEffect(() => {
    let filtered = data;

    if (filters.name) {
      filtered = filtered.filter((record) =>
        record.user_id?.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.area) {
      filtered = filtered.filter((record) =>
        record.area_id?.name.toLowerCase().includes(filters.area.toLowerCase())
      );
    }

    if (filters.date) {
      const formattedFilterDate = new Date(filters.date)
        .toISOString()
        .split("T")[0];

      filtered = filtered.filter((record) => {
        const formattedRecordDate = new Date(record.date)
          .toISOString()
          .split("T")[0];

        return formattedRecordDate === formattedFilterDate;
      });
    }

    if (filters.consumable) {
      filtered = filtered.filter((record) =>
        record.consumable_id?.name
          .toLowerCase()
          .includes(filters.consumable.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setCurrentPage(0);
  }, [filters, data]);

  useEffect(() => {
    const startIndex = currentPage * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setDisplayedData(filteredData.slice(startIndex, endIndex));
  }, [currentPage, filteredData]);

  const handleLoadNext = () => {
    if ((currentPage + 1) * recordsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLoadPrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este registro?"
    );
    if (confirmDelete) {
      try {
        await deleteRecord(id);
        setData((prevData) => prevData.filter((record) => record._id !== id));
        setFilteredData((prevFiltered) =>
          prevFiltered.filter((record) => record._id !== id)
        );
        toast.success("Registro eliminado exitosamente", {
          position: window.innerWidth < 640 ? "top-center" : "bottom-left",
          style: {
            fontSize: "16px",
            padding: "15px",
            maxWidth: "90vw",
            width: "auto",
          },
        });
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
        alert("Hubo un error al intentar eliminar el registro");
      }
    }
  };

  const totalRecords = filteredData.length;
  const startIndex = currentPage * recordsPerPage + 1;
  const endIndex = Math.min(startIndex + recordsPerPage - 1, totalRecords);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-6">
      <Filters onFilterChange={setFilters} />
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b text-black">#</th>
              <th className="p-3 border-b text-black">Nombre</th>
              <th className="p-3 border-b text-black">Área</th>
              <th className="p-3 border-b text-black">Consumible</th>
              <th className="p-3 border-b text-black">Cantidad</th>
              <th className="p-3 border-b text-black">Fecha</th>
              <th className="p-3 border-b text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-3 text-center text-black">
                  No hay registros disponibles
                </td>
              </tr>
            ) : (
              displayedData.map((record, index) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b text-black text-left">
                    {startIndex + index}
                  </td>
                  <td className="p-3 border-b text-black text-left">
                    {record.user_id?.name || "Sin nombre"}
                  </td>
                  <td className="p-3 border-b text-black text-left">
                    {record.area_id?.name || "Sin área"}
                  </td>
                  <td className="p-3 border-b text-black text-left">
                    {record.consumable_id?.name || "Sin consumible"}
                  </td>
                  <td className="p-3 border-b text-black text-left">
                    {record.consumable_id?.quantity || "Sin consumible"}
                  </td>
                  <td className="p-3 border-b text-black text-left">
                    {new Date(record.date).toLocaleDateString("es-MX", {
                      timeZone: "UTC",
                    })}
                  </td>
                  <td className="p-3 border-b text-black text-left">
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <img
                        src="icon/remove-icon.png"
                        alt="Eliminar"
                        className="w-5 h-5"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between">
        <button
          onClick={handleLoadPrev}
          disabled={currentPage === 0}
          className={`${
            currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img
            src="icon/left-arrow-icon.png"
            alt="Retroceder"
            className="h-6 w-6"
          />
        </button>
        <span className="text-gray-600">
          {startIndex}–{endIndex} de {totalRecords}
        </span>
        <button
          onClick={handleLoadNext}
          disabled={endIndex === totalRecords}
          className={`${
            endIndex === totalRecords ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img
            src="icon/right-arrow-icon.png"
            alt="Avanzar"
            className="h-6 w-6"
          />
        </button>
      </div>
      <div className="mt-3 flex justify-center">
        <div className="w-full">
          <ExportButtons data={displayedData} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
