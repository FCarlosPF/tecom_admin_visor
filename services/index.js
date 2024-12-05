export const getOficina = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/oficinas/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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