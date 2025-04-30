import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getRecords } from "@/api/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryStatus = () => {
  const [consumablesData, setConsumablesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsumables = async () => {
      try {
        const response = await getRecords();
        if (response.success) {
          const consumables = response.data;

          // Agrupar consumibles por nombre y sumar las cantidades
          const groupedConsumables = consumables.reduce((acc, record) => {
            // Verificar si consumable_id existe antes de acceder a sus propiedades
            const consumable = record.consumable_id;
            if (consumable && consumable.name) {
              const name = consumable.name.toLowerCase();
              if (acc[name]) {
                acc[name].quantity += consumable.quantity;
              } else {
                acc[name] = {
                  name: consumable.name,
                  quantity: consumable.quantity,
                };
              }
            }
            return acc;
          }, {});

          // Convertir el objeto agrupado en un array
          const consumablesArray = Object.values(groupedConsumables);

          // Ordenamos los consumibles por cantidad en orden descendente y seleccionamos los 5 más utilizados
          const sortedConsumables = consumablesArray
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

          const labels = sortedConsumables.map((record) => record.name);
          const data = sortedConsumables.map((record) => record.quantity);

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
                ],
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
        <h2 className="text-xl font-semibold text-[#1C2039]">
          Estado del Inventario
        </h2>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-[#1C2039]">
        Estado del Inventario
      </h2>
      <div className="mt-4 md:h-[42vh]">
        <Doughnut data={consumablesData} />
      </div>
    </div>
  );
};

export default InventoryStatus;
