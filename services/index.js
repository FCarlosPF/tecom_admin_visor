export const getOficina = async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTMxMTU4LCJpYXQiOjE3MzU5MTMxNTgsImp0aSI6ImNhOWYwZWQyMzdjYzQ5ZDRiN2ViZWE1YzQzZDI5YWZjIiwidXNlcl9pZCI6MX0.RS5GeV68sTGiJtMFfc6cHP-aOPWGGqMjCgmpGsO-_rE';
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTMxMTU4LCJpYXQiOjE3MzU5MTMxNTgsImp0aSI6ImNhOWYwZWQyMzdjYzQ5ZDRiN2ViZWE1YzQzZDI5YWZjIiwidXNlcl9pZCI6MX0.RS5GeV68sTGiJtMFfc6cHP-aOPWGGqMjCgmpGsO-_rE';
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTMxMTU4LCJpYXQiOjE3MzU5MTMxNTgsImp0aSI6ImNhOWYwZWQyMzdjYzQ5ZDRiN2ViZWE1YzQzZDI5YWZjIiwidXNlcl9pZCI6MX0.RS5GeV68sTGiJtMFfc6cHP-aOPWGGqMjCgmpGsO-_rE';
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1OTMxMTU4LCJpYXQiOjE3MzU5MTMxNTgsImp0aSI6ImNhOWYwZWQyMzdjYzQ5ZDRiN2ViZWE1YzQzZDI5YWZjIiwidXNlcl9pZCI6MX0.RS5GeV68sTGiJtMFfc6cHP-aOPWGGqMjCgmpGsO-_rE';
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