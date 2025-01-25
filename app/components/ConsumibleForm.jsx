import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import clsx from "clsx";
import SignatureCanvas from "react-signature-canvas";
import { createRecord } from "../api/api";

export default function ConsumibleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [firma, setFirma] = useState("");
  const sigCanvas = useRef(null);

  const onSubmit = async (data) => {
    console.log("Form data", data);

    const token = localStorage.getItem("token");
    if (token) {
      const formData = {
        ...data,
        firma: firma,
      };

      try {
        const response = await createRecord(formData, ` ${token}`);

        if (response.success) {
          toast.success("Registro exitoso", {
            position: window.innerWidth < 640 ? "top-center" : "bottom-left",
            style: {
              fontSize: "20px",
              padding: "20px",
              maxWidth: "90vw",
              width: "auto",
            },
          });
        } else {
          toast.error("Error al registrar el consumible", {
            position: window.innerWidth < 640 ? "top-center" : "bottom-left",
            style: {
              fontSize: "20px",
              padding: "20px",
              maxWidth: "90vw",
              width: "auto",
            },
          });
        }
      } catch (error) {
        console.error("Error al registrar el consumible:", error);
        toast.error("Hubo un error al registrar el consumible", {
          position: window.innerWidth < 640 ? "top-center" : "bottom-left",
          style: {
            fontSize: "20px",
            padding: "20px",
            maxWidth: "90vw",
            width: "auto",
          },
        });
      }
    } else {
      console.error("Token no encontrado");
      toast.error("Token no encontrado en el localStorage", {
        position: window.innerWidth < 640 ? "top-center" : "bottom-left",
        style: {
          fontSize: "20px",
          padding: "20px",
          maxWidth: "90vw",
          width: "auto",
        },
      });
    }
  };

  const handleClearSignature = () => {
    sigCanvas.current.clear();
    setFirma("");
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full">
      <Toaster />
      <h2 className="mb-4 text-center text-2xl font-bold text-[#B0005E]">
        Registro de Consumibles
      </h2>
      <form id="consumibleForm" onSubmit={handleSubmit(onSubmit)} method="POST">
        {/* Campo Nombre */}
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.nombre }
            )}
            {...register("nombre", { required: "Nombre es requerido" })}
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* Campo Área */}
        <div className="mb-4">
          <label
            htmlFor="area"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Área
          </label>
          <input
            type="text"
            id="area"
            name="area"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.area }
            )}
            {...register("area", { required: "Área es requerida" })}
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
          )}
        </div>

        {/* Campo Consumible */}
        <div className="mb-4">
          <label
            htmlFor="consumible"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Consumible
          </label>
          <input
            type="text"
            id="consumible"
            name="consumible"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.consumible }
            )}
            {...register("consumible", { required: "Consumible es requerido" })}
          />
          {errors.consumible && (
            <p className="text-red-500 text-sm mt-1">
              {errors.consumible.message}
            </p>
          )}
        </div>

        {/* Campo Cantidad */}
        <div className="mb-4">
          <label
            htmlFor="cantidad"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Cantidad
          </label>
          <input
            type="number"
            id="cantidad"
            name="cantidad"
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.cantidad }
            )}
            {...register("cantidad", { required: "Cantidad es requerida" })}
          />
          {errors.cantidad && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cantidad.message}
            </p>
          )}
        </div>

        {/* Campo Fecha */}
        <div className="mb-4">
          <label
            htmlFor="fecha"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            defaultValue={new Date().toISOString().split("T")[0]} // Fecha de hoy en formato YYYY-MM-DD
            className={clsx(
              "text-black mt-1 block w-full rounded-md border-[#B0005E] shadow-sm",
              { "border-red-500": errors.fecha }
            )}
            {...register("fecha", { required: "Fecha es requerida" })}
            readOnly // Hace que el campo sea no editable
          />
          {errors.fecha && (
            <p className="text-red-500 text-sm mt-1">{errors.fecha.message}</p>
          )}
        </div>

        {/* Campo Firma Digital */}
        <div className="mb-4">
          <label
            htmlFor="firma"
            className="block text-sm font-medium text-[#6C0036]"
          >
            Firma
          </label>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ className: "w-full h-32 border p-2 rounded" }}
            onEnd={() =>
              setFirma(sigCanvas.current.getTrimmedCanvas().toDataURL())
            }
          />
          <button
            type="button"
            onClick={handleClearSignature}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Limpiar Firma
          </button>
        </div>

        {/* Botón de Enviar */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#B0005E] text-white rounded-md hover:bg-[#6C0036]"
          >
            Registrar Consumible
          </button>
        </div>
      </form>
    </div>
  );
}
