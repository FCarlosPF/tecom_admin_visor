export const getOficina = async () => {
  const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/oficinas/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Incluye el token de acceso en los encabezados

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
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/vista-empleados-tareas/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Incluye el token de acceso en los encabezados

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
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/tareas/empleado/${employeeId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Incluye el token de acceso en los encabezados

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
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/proyectos/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Incluye el token de acceso en los encabezados

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