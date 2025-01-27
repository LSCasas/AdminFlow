import { openDB } from "idb";

const dbPromise = openDB("offline-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("data")) {
      db.createObjectStore("data", { keyPath: "id", autoIncrement: true });
    }
  },
});

export async function saveDataOffline(data) {
  const db = await dbPromise;
  await db.put("data", data);
}

export async function getOfflineData() {
  const db = await dbPromise;
  return db.getAll("data");
}
