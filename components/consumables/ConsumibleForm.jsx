import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import clsx from "clsx";
import FirmaDigital from "../filters/SignatureField";
import { getRecords, createRecord } from "@/api/api";
import { useRouter } from "next/router";
import {
  saveRecordOffline,
  getOfflineRecords,
  syncRecords,
} from "@/utils/indexedDB";
//md:p-2 p-0.5 border
export default function ConsumibleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [firma, setFirma] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [nombresRegistrados, setNombresRegistrados] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [nombresSugeridos, setNombresSugeridos] = useState([]);
  const sigCanvas = useRef(null);
  const router = useRouter();

  const handleFirmaChange = (newFirma) => {
    setFirma(newFirma);
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        if (navigator.onLine) {
          // Si hay conexión, obtener registros de la API
          const response = await getRecords();
          if (Array.isArray(response.data)) {
            setNombresRegistrados(response.data);

            // Guardar registros en IndexedDB para usarlos offline
            for (const record of response.data) {
              await saveRecordOffline(record);
            }
          }
        } else {
          // Si no hay conexión, obtener registros desde IndexedDB
          const offlineRecords = await getOfflineRecords();
          setNombresRegistrados(offlineRecords);
          console.log("Datos cargados offline:", offlineRecords);
        }
      } catch (error) {
        console.error("Error al obtener los consumibles:", error.message);
      }
    };

    const syncOfflineRecords = async () => {
      if (navigator.onLine) {
        try {
          const offlineRecords = await getOfflineRecords(); // Asegúrate de obtener los registros offline
          for (const record of offlineRecords) {
            const token = localStorage.getItem("token");
            if (token) {
              await createRecord(record, token); // Subir cada registro
              await saveRecordOffline({ ...record, synced: true }); // Actualizar como sincronizado en IndexedDB
            }
          }
          console.log("Registros offline sincronizados con éxito.");
        } catch (error) {
          console.error(
            "Error al sincronizar los registros offline:",
            error.message
          );
        }
      }
    };

    // Fetch de registros y sincronización inicial
    fetchRecords();

    // Listener para sincronización automática al volver a estar online
    window.addEventListener("online", syncOfflineRecords);

    // Cleanup del listener
    return () => window.removeEventListener("online", syncOfflineRecords);
  }, []);

  const handleClearFirma = () => {
    setFirma("");
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.closest("#nombre") === null) {
      setNombresSugeridos([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNombreChange = (e) => {
    const nombre = e.target.value;

    const recordsFiltrados = nombresRegistrados.filter(
      (record) =>
        record.user_id &&
        record.user_id.name &&
        record.user_id.name.toLowerCase().includes(nombre.toLowerCase())
    );

    setNombresSugeridos(recordsFiltrados);

    const record = recordsFiltrados.find(
      (record) =>
        record.user_id &&
        record.user_id.name.toLowerCase() === nombre.toLowerCase()
    );
    if (record) {
      setSelectedRecord(record);
      setValue("nombre", record.user_id.name);
      setValue("area", record.area_id?.name);
      setValue("consumible", record.consumable_id?.name);
      setValue("cantidad", record.consumable_id?.quantity);
      setValue("firma", record.user_id?.signature);
      setFirma(record.user_id?.signature);
    }
  };
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = {
      ...data,
      firma: firma,
    };

    if (navigator.onLine && token) {
      // Si hay conexión a Internet, enviar a la API
      try {
        await saveRecordOffline({ ...formData, synced: false }); // Guardar como no sincronizado
        const response = await createRecord(formData, token);
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
          router.push("/historialDeRegistros");
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
      // Si no hay conexión, guardar localmente
      try {
        await saveRecordOffline(formData); // Guardar los datos localmente
        toast.success("Registro guardado para sincronización offline", {
          position: window.innerWidth < 640 ? "top-center" : "bottom-left",
          style: {
            fontSize: "20px",
            padding: "20px",
            maxWidth: "90vw",
            width: "auto",
          },
        });
      } catch (error) {
        console.error("Error al guardar el registro offline:", error);
        toast.error("Error al guardar el registro localmente", {
          position: window.innerWidth < 640 ? "top-center" : "bottom-left",
          style: {
            fontSize: "20px",
            padding: "20px",
            maxWidth: "90vw",
            width: "auto",
          },
        });
      }
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="bg-white rounded-lg shadow-lg md:p-8  md:w-[100vh] p-6 w-full">
        <Toaster />
        <h2 className="mb-4 text-center text-2xl font-bold text-[#1C2039]">
          Registro de Consumibles
        </h2>
        <form
          id="consumibleForm"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          {/* Campo Nombre */}
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-[#1C2039]"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className={clsx(
                "text-black mt-1 block w-full rounded-md md:p-2 p-0.5 border border-[#1C2039] shadow-sm",
                { "border-red-500": errors.nombre }
              )}
              {...register("nombre", { required: "Nombre es requerido" })}
              onChange={handleNombreChange}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
            {/* Lista de sugerencias */}
            {nombresSugeridos.length > 0 && (
              <ul className="mt-2 max-h-48 overflow-y-auto border border-[#1C2039] rounded-md bg-white shadow-lg text-neutral-500">
                {[
                  ...new Map(
                    nombresSugeridos.map((record) => [
                      record.user_id.name,
                      record,
                    ])
                  ).values(),
                ].map((record) => (
                  <li
                    key={record.id}
                    className="cursor-pointer px-4 py-2 hover:bg-[#1C2039] hover:text-white "
                    onClick={() => {
                      setValue("nombre", record.user_id.name);
                      setValue("area", record.area_id.name);
                      setValue("consumible", record.consumable_id.name);
                      setValue("cantidad", record.consumable_id.quantity);
                      setValue("firma", record.user_id.signature);
                      setNombresSugeridos([]);
                    }}
                  >
                    {record.user_id.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Campo Área */}
          <div className="mb-4">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-[#1C2039]"
            >
              Área
            </label>
            <input
              type="text"
              id="area"
              name="area"
              className={clsx(
                "text-black mt-1 block w-full rounded-md  md:p-2 p-0.5 border border-[#1C2039] shadow-sm",
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
              className="block text-sm font-medium   text-[#1C2039]"
            >
              Consumible
            </label>
            <input
              type="text"
              id="consumible"
              name="consumible"
              className={clsx(
                "text-black mt-1 block w-full rounded-md md:p-2 p-0.5 border border-[#1C2039] shadow-sm",
                { "border-red-500": errors.consumible }
              )}
              {...register("consumible", {
                required: "Consumible es requerido",
              })}
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
              className="block text-sm font-medium text-[#1C2039]"
            >
              Cantidad
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              className={clsx(
                "text-black mt-1 block w-full rounded-md md:p-2 p-0.5 border border-[#1C2039] shadow-sm",
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
              className="block text-sm font-medium text-[#1C2039]"
            >
              Fecha
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              defaultValue={new Date().toISOString().split("T")[0]}
              className={clsx(
                "text-black mt-1 block w-full rounded-md border-[#1C2039] shadow-sm",
                { "border-red-500": errors.fecha }
              )}
              {...register("fecha", { required: "Fecha es requerida" })}
              readOnly
            />
            {errors.fecha && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fecha.message}
              </p>
            )}
          </div>

          {/* Campo Firma Digital */}
          <FirmaDigital
            onFirmaChange={handleFirmaChange}
            firmaCargada={firma}
            onClearFirma={handleClearFirma}
          />

          {/* Botón de Enviar */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#EEB345] text-white rounded-md hover:bg-[#936F2B]"
            >
              Registrar Consumible
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
