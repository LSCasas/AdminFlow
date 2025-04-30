import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
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
    if (!Array.isArray(data)) return;

    const doc = new jsPDF("p", "mm", "a4");

    // Configurar márgenes mínimos y estilos
    const marginLeft = 5;
    const tableWidth = doc.internal.pageSize.getWidth() - marginLeft - 5;

    doc.autoTable({
      startY: 10,
      head: [["#", "Nombre", "Área", "Consumible", "Cantidad", "Fecha"]],
      body: data.map((record, index) => [
        index + 1,
        record.user_id?.name || "Sin nombre",
        record.area_id?.name || "Sin área",
        record.consumable_id?.name || "Sin consumible",
        record.consumable_id?.quantity || "Sin cantidad",
        new Date(record.date).toLocaleDateString("es-MX", { timeZone: "UTC" }),
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 4,
      },
      headStyles: {
        fillColor: [176, 0, 94], // Magenta
        textColor: [255, 255, 255], // Blanco
      },
      bodyStyles: {
        fillColor: [245, 245, 245], // Gris claro
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Blanco
      },
      margin: { left: marginLeft },
      tableWidth: tableWidth,
      theme: "grid",
    });

    doc.save("registros.pdf");
  };
  // Función para exportar a Excel
  const exportToExcel = () => {
    if (!Array.isArray(data)) return;

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
        className="w-full py-2 px-4 bg-[#EEB345] text-white rounded-md hover:bg-[#936F2B]"
      >
        Exportar a PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="w-full py-2 px-4 bg-[#EEB345] text-white rounded-md hover:bg-[#936F2B]"
      >
        Exportar a Excel
      </button>
    </div>
  );
}
