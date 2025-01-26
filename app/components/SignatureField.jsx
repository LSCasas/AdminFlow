import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureField({ setFirma }) {
  const sigCanvas = useRef(null);

  // Función para limpiar el lienzo de la firma
  const handleClear = () => {
    sigCanvas.current.clear();
    setFirma(""); // Limpia la firma almacenada
  };

  // Función para guardar la firma como una imagen en formato base64
  const handleSave = () => {
    const signatureData = sigCanvas.current.toDataURL();
    setFirma(signatureData); // Almacena la firma en el estado padre
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="firma"
        className="block text-sm font-medium text-[#6C0036]"
      >
        Firma
      </label>
      <div className="border border-[#B0005E] rounded-md p-4">
        {/* Componente de firma */}
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 400,
            height: 150,
            className: "sigCanvas",
          }}
        />
        <div className="mt-2 flex justify-between">
          {/* Botón para limpiar la firma */}
          <button
            type="button"
            className="py-1 px-3 bg-gray-300 rounded hover:bg-gray-400"
            onClick={handleClear}
          >
            Limpiar
          </button>
          {/* Botón para guardar la firma */}
          <button
            type="button"
            className="py-1 px-3 bg-[#B0005E] text-white rounded hover:bg-[#6C0036]"
            onClick={handleSave}
          >
            Guardar Firma
          </button>
        </div>
      </div>
    </div>
  );
}
