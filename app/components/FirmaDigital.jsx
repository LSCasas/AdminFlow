import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

const FirmaDigital = ({ onFirmaChange, firmaCargada, clearCanvas }) => {
  const [firma, setFirma] = useState(firmaCargada || ""); // Inicializa la firma con el valor cargado
  const sigCanvas = useRef(null);

  useEffect(() => {
    if (firmaCargada) {
      setFirma(firmaCargada); // Si la firmaCargada cambia, actualiza el estado
    }
  }, [firmaCargada]);

  useEffect(() => {
    if (clearCanvas) {
      // Si se activa clearCanvas, limpiamos la firma
      sigCanvas.current.clear();
      setFirma(""); // Limpia el estado de la firma
      onFirmaChange(""); // Notifica al componente padre que se borró la firma
    }
  }, [clearCanvas, onFirmaChange]);

  const handleSignatureEnd = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL(); // Obtén la firma en formato base64
      setFirma(signatureData);
      onFirmaChange(signatureData); // Notifica al componente padre sobre la nueva firma
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="firma"
        className="block text-sm font-medium text-[#6C0036]"
      >
        Firma
      </label>

      {/* Si la firma existe y es un formato base64, renderízala como una imagen */}
      {firma && firma.startsWith("data:image/png;base64") ? (
        <img
          src={firma} // Usa el base64 como fuente de la imagen
          alt="Firma Digital"
          className="w-full h-32 border p-2 rounded"
        />
      ) : (
        // Si no hay firma, muestra el canvas para dibujarla
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            className: "w-full h-32 border p-2 rounded",
            style: { borderColor: "#B0005E", width: "100%", height: "100%" },
          }}
          onEnd={handleSignatureEnd}
        />
      )}

      {/* Verifica si clearCanvas es una función antes de llamarla */}
      <button
        type="button"
        onClick={() => typeof clearCanvas === "function" && clearCanvas()}
        className="mt-2 text-red-500 hover:text-red-700"
      >
        Limpiar Firma
      </button>
    </div>
  );
};

export default FirmaDigital;
