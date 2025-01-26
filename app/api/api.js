const API_URL = "http://localhost:5500";

// REGISTER
export async function createAdmin(data) {
  const res = await fetch(`${API_URL}/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

// LOGIN
export async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Error al iniciar sesión");
    }

    return json.data;
  } catch (error) {
    throw error;
  }
}

//CREATE RECORD
export async function createRecord(formData, token) {
  try {
    const response = await fetch(`${API_URL}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },

      body: JSON.stringify({
        userName: formData.nombre,
        consumableName: formData.consumible,
        areaName: formData.area,
        consumableQuantity: formData.cantidad,
        date: formData.fecha,
        userSignature: formData.firma,
      }),
    });

    const json = await response.json();
    if (!response.ok) {
      console.error("Error en la respuesta de la API:", json);
      throw new Error(json.error || "Error al procesar la solicitud");
    }

    return json;
  } catch (error) {
    console.error("Error en la función createRecord:", error.message);
    throw error;
  }
}

// GET All Records
export async function getRecords(filter = {}) {
  try {
    const token = localStorage.getItem("token");
    const queryParams = new URLSearchParams(filter).toString();

    const res = await fetch(`${API_URL}/record${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los registros");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

// DELETE Record by ID
export async function deleteRecord(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/record/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al eliminar el registro");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

// CREATE Consumable
export async function createConsumable(data) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al crear el consumible");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en createConsumable:", error.message);
    throw error;
  }
}

//GET ALL CONSUMABLES
export async function getAllConsumables() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumables`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener los consumibles");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en getAllConsumables:", error.message);
    throw error;
  }
}
