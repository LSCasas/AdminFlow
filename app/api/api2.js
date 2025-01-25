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
