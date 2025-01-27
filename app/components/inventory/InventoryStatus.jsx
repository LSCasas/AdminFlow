import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getRecords } from "@/api/api"; // Asumimos que esta es la misma API que usas

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryStatus = () => {
  const [consumablesData, setConsumablesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsumables = async () => {
      try {
        const response = await getRecords(); // Llamada a la API
        if (response.success) {
          // Aquí deberías procesar los datos de la respuesta para obtener las cantidades
          const consumables = response.data; // Suponiendo que 'response.data' tiene los consumibles

          // Ordenamos los consumibles por cantidad en orden descendente y seleccionamos los 5 más utilizados
          const sortedConsumables = consumables
            .sort((a, b) => b.consumable_id.quantity - a.consumable_id.quantity)
            .slice(0, 5); // Tomamos los 5 más utilizados

          const labels = sortedConsumables.map(
            (record) => record.consumable_id.name
          ); // Obtener nombres de consumibles
          const data = sortedConsumables.map(
            (record) => record.consumable_id.quantity
          ); // Obtener cantidades de consumibles

          setConsumablesData({
            labels,
            datasets: [
              {
                label: "Consumibles más utilizados",
                data,
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#FF5733",
                  "#4CAF50",
                ], // Puedes cambiar estos colores
                hoverBackgroundColor: [
                  "#FF4382",
                  "#2D8CFF",
                  "#FFB83D",
                  "#FF451E",
                  "#42A639",
                ],
              },
            ],
          });
        } else {
          console.error("Error al obtener los consumibles:", response.message);
        }
      } catch (error) {
        console.error("Error al cargar los consumibles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsumables();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-[#6C0036]">
          Estado del Inventario
        </h2>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#6C0036]">
        Estado del Inventario
      </h2>
      <div className="mt-4 md:h-[42vh]">
        <Doughnut data={consumablesData} />
      </div>
    </div>
  );
};

export default InventoryStatus;
