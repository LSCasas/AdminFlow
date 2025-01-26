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

//*******USERS******
// CREATE USER
export async function createRecord(data, token) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Error creando usuario");
    }

    return json.data;
  } catch (error) {
    throw error;
  }
}

// GET ALL user
export async function getAlluser(token) {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Error obteniendo usuarios");
    }

    return json.data;
  } catch (error) {
    throw error;
  }
}

// GET USER BY ID
export async function getUserById(id, token) {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Error obteniendo usuario");
    }

    return json.data;
  } catch (error) {
    throw error;
  }
}

// UPDATE USER
export async function updateUserById(id, data, token) {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Incluye el token
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Error actualizando usuario");
    }

    return json.data;
  } catch (error) {
    throw error;
  }
}

// DELETE USER
export async function deleteUserById(id, token) {
  try {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Incluye el token
      },
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || "Error eliminando usuario");
    }

    return json.message; // Mensaje de éxito
  } catch (error) {
    throw error;
  }
}

//*******RECORDS******
// UPDATE Record by ID
export async function updateRecord(id, data) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Error al actualizar el registro");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

// GET Record by ID
export async function getRecordById(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/record/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Error al obtener el registro");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}

//*******CONSUMABLES******
// CREATE Consumable
export async function createConsumable(data) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumable`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// GET All Consumables
export async function getAllConsumables() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumable`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// GET Consumable by ID
export async function getConsumableById(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumable/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al obtener el consumible por ID");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en getConsumableById:", error.message);
    throw error;
  }
}

// UPDATE Consumable
export async function updateConsumable(id, updates) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumable/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al actualizar el consumible");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en updateConsumable:", error.message);
    throw error;
  }
}

// DELETE Consumable
export async function deleteConsumable(id) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/consumable/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al eliminar el consumible");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en deleteConsumable:", error.message);
    throw error;
  }
}
