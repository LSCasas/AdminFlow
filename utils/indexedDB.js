import { openDB } from "idb";

// Verificar si estamos en el cliente
const isClient = typeof window !== "undefined";

// Inicializar la base de datos (solo en el cliente)
const dbPromise = isClient
  ? openDB("offline-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("records")) {
          db.createObjectStore("records", {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    })
  : null;

// Función para guardar un registro
export const saveRecordOffline = async (record) => {
  if (!isClient) return; // Prevenir ejecución en el servidor
  try {
    const db = await dbPromise;
    await db.add("records", record);
    //console.log("Registro guardado en IndexedDB:", record);
  } catch (error) {
    //console.error("Error al guardar el registro en IndexedDB:", error.message);
  }
};

// Función para obtener todos los registros
export const getOfflineRecords = async () => {
  if (!isClient) return []; // Prevenir ejecución en el servidor
  try {
    const db = await dbPromise;
    const records = await db.getAll("records");
    //console.log("Registros obtenidos desde IndexedDB:", records);
    return records;
  } catch (error) {
    //console.error("Error al obtener registros de IndexedDB:", error.message);
    return [];
  }
};

// Función para sincronizar registros
export const syncRecords = async (syncCallback) => {
  if (!isClient) return; // Prevenir ejecución en el servidor
  try {
    const records = await getOfflineRecords();
    for (const record of records) {
      await syncCallback(record);
    }
    //console.log("Sincronización completada.");
  } catch (error) {
    console.error(
      "Error durante la sincronización de registros:",
      error.message
    );
  }
};

// Función para eliminar todos los registros
export const clearOfflineRecords = async () => {
  if (!isClient) return; // Prevenir ejecución en el servidor
  try {
    const db = await dbPromise;
    await db.clear("records");
    //console.log("Todos los registros offline fueron eliminados.");
  } catch (error) {
    //console.error("Error al eliminar registros de IndexedDB:", error.message);
  }
};
