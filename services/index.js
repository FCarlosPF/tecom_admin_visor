export const getOficina = async () => {
  try {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODY2MTMxLCJpYXQiOjE3MzU4NDgxMzEsImp0aSI6IjI0NjE4ODZkODdiZDRlNWRhNzkyZGE0OWVlNDkzYjFmIiwidXNlcl9pZCI6MX0.1pnpKqUUDsksERWKewRA_F8Yj4HS52SbSfP0Sg9qif0';
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODY2MTMxLCJpYXQiOjE3MzU4NDgxMzEsImp0aSI6IjI0NjE4ODZkODdiZDRlNWRhNzkyZGE0OWVlNDkzYjFmIiwidXNlcl9pZCI6MX0.1pnpKqUUDsksERWKewRA_F8Yj4HS52SbSfP0Sg9qif0';
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODY2MTMxLCJpYXQiOjE3MzU4NDgxMzEsImp0aSI6IjI0NjE4ODZkODdiZDRlNWRhNzkyZGE0OWVlNDkzYjFmIiwidXNlcl9pZCI6MX0.1pnpKqUUDsksERWKewRA_F8Yj4HS52SbSfP0Sg9qif0';
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
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1ODY2MTMxLCJpYXQiOjE3MzU4NDgxMzEsImp0aSI6IjI0NjE4ODZkODdiZDRlNWRhNzkyZGE0OWVlNDkzYjFmIiwidXNlcl9pZCI6MX0.1pnpKqUUDsksERWKewRA_F8Yj4HS52SbSfP0Sg9qif0';
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