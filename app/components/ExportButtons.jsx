import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Importar el plugin para autoTable
import * as XLSX from "xlsx";

export default function ExportButtons({ data }) {
  const handleExport = (type) => {
    if (type === "PDF") {
      exportToPDF();
    } else if (type === "Excel") {
      exportToExcel();
    }
  };

  // Función para exportar a PDF
  const exportToPDF = () => {
    if (!Array.isArray(data)) return; // Verificar si data es un arreglo

    const doc = new jsPDF("p", "mm", "a4"); // Asegurar orientación vertical y tamaño A4

    // Configurar márgenes mínimos y estilos
    const marginLeft = 5; // Márgenes ajustados para pegar más a la izquierda
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5; // Ajuste para mantener un pequeño margen derecho

    doc.autoTable({
      startY: 10, // Espacio inicial para la tabla
      head: [["#", "Nombre", "Área", "Consumible", "Cantidad", "Fecha"]],
      body: data.map((record, index) => [
        index + 1,
        record.user_id?.name || "Sin nombre",
        record.area_id?.name || "Sin área",
        record.consumable_id?.name || "Sin consumible",
        record.consumable_id?.quantity || "Sin consumible",
        new Date(record.date).toLocaleDateString("es-MX", { timeZone: "UTC" }),
      ]),
      styles: {
        fontSize: 10, // Tamaño de fuente
        cellPadding: 4, // Espacio dentro de las celdas
      },
      margin: { left: marginLeft }, // Márgenes para alinear
      tableWidth: tableWidth, // Ancho de la tabla
      theme: "grid", // Tema de tabla
    });

    doc.save("registros.pdf");
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    if (!Array.isArray(data)) return; // Verificar si data es un arreglo

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((record, index) => ({
        "#": index + 1,
        Nombre: record.user_id?.name || "Sin nombre",
        Área: record.area_id?.name || "Sin área",
        Consumible: record.consumable_id?.name || "Sin consumible",
        Cantidad: record.consumable_id?.quantity || "Sin cantidad",
        Fecha: new Date(record.date).toLocaleDateString("es-MX", {
          timeZone: "UTC",
        }),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registros");
    XLSX.writeFile(workbook, "registros.xlsx");
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={() => handleExport("PDF")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar a PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
      >
        Exportar a Excel
      </button>
    </div>
  );
}
