export const loginService = async (username, password) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }), // Actualiza los campos enviados
    });

    if (!response.ok) {
      throw new Error("Error en la autenticación");
    }

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("refreshToken", data.tokens.refresh);
      localStorage.setItem("accessToken", data.tokens.access);
      localStorage.setItem("usuarioLogeado", JSON.stringify(data.empleado));
    }

    return data.empleado;
  } catch (error) {
    console.error("Error en el servicio de login:", error);
    throw error;
  }
};

export const changePasswordService = async (oldPassword, newPassword) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const response = await fetch("http://127.0.0.1:8000/api/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al cambiar la contraseña");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en el servicio de cambio de contraseña:", error);
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    if (!refreshToken || !accessToken) {
      throw new Error("No tokens found");
    }

    // Eliminar tokens del almacenamiento local
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usuarioLogeado");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

export const getOficina = async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTUwMDcwLCJpYXQiOjE3MzU5MzIwNzAsImp0aSI6ImVjZTM2NTVlMWE4ZTQzZTY4ZDA4MWU4MTc2NGI2YTMzIiwidXNlcl9pZCI6MX0.__91ocbduagsx0StPhxaZ_R3IJ2k6LaYaOfpEhWlM6M';
    const response = await fetch(
      `http://127.0.0.1:8000/api/oficinas/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al insertar la oficina");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error en el servicio de eliminar orden de compra:", error);
    throw error;
  }
};

export const getEmpleados = async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTUwMDcwLCJpYXQiOjE3MzU5MzIwNzAsImp0aSI6ImVjZTM2NTVlMWE4ZTQzZTY4ZDA4MWU4MTc2NGI2YTMzIiwidXNlcl9pZCI6MX0.__91ocbduagsx0StPhxaZ_R3IJ2k6LaYaOfpEhWlM6M';
    const response = await fetch(
      `http://127.0.0.1:8000/api/vista-empleados-tareas/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al insertar empleados");
    }

    const data = await response.json();

    
    return data;

  } catch (error) {
    console.error("Error en el servicio de empleados:", error);
    throw error;
  }
};

export const getTasKToEmployee = async (employeeId) => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTUwMDcwLCJpYXQiOjE3MzU5MzIwNzAsImp0aSI6ImVjZTM2NTVlMWE4ZTQzZTY4ZDA4MWU4MTc2NGI2YTMzIiwidXNlcl9pZCI6MX0.__91ocbduagsx0StPhxaZ_R3IJ2k6LaYaOfpEhWlM6M';
    const response = await fetch(
      `http://127.0.0.1:8000/api/tareas/empleado/${employeeId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las tareas del empleado");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error en el servicio de obtener tareas del empleado:",
      error
    );
    throw error;
  }
};

export const getProyectos = async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTUwMDcwLCJpYXQiOjE3MzU5MzIwNzAsImp0aSI6ImVjZTM2NTVlMWE4ZTQzZTY4ZDA4MWU4MTc2NGI2YTMzIiwidXNlcl9pZCI6MX0.__91ocbduagsx0StPhxaZ_R3IJ2k6LaYaOfpEhWlM6M';
    const response = await fetch(`http://127.0.0.1:8000/api/proyectos/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el proyecto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en el servicio de obtener proyectos:", error);
    throw error;
  }
};

export const getAreas= async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTUwMDcwLCJpYXQiOjE3MzU5MzIwNzAsImp0aSI6ImVjZTM2NTVlMWE4ZTQzZTY4ZDA4MWU4MTc2NGI2YTMzIiwidXNlcl9pZCI6MX0.__91ocbduagsx0StPhxaZ_R3IJ2k6LaYaOfpEhWlM6M';
    const response = await fetch(`http://127.0.0.1:8000/api/areas/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las áreas");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en el servicio de obtener proyectos:", error);
    throw error;
  }
};


export const descargarReporteExcel = async () => {

  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTMxMTU4LCJpYXQiOjE3MzU5MTMxNTgsImp0aSI6ImNhOWYwZWQyMzdjYzQ5ZDRiN2ViZWE1YzQzZDI5YWZjIiwidXNlcl9pZCI6MX0.RS5GeV68sTGiJtMFfc6cHP-aOPWGGqMjCgmpGsO-_rE';

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/reporte-tareas-no-entregadas-a-tiempo/",
      {
        method: "GET",
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          Authorization: `Bearer ${accessToken}`, // Incluye el token de acceso en los encabezados
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al descargar el reporte");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-tareas-no-entregadas-a-tiempo.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error("Error al descargar el reporte:", error);
  }
};