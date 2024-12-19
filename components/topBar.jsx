"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { GlobalContext } from "./globalState";
import { getProyectos } from "@/services";

const TopBar = ({ handleConfigClick }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [loadingLayerName, setLoadingLayerName] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [loadingProyectos, setLoadingProyectos] = useState(false);
  const [selectedProyectoId, setSelectedProyectoId] = useState("");

  useEffect(() => {
    const fetchProyectos = async () => {
      setLoadingProyectos(true);
      try {
        const proyectosData = await getProyectos();
        setProyectos(proyectosData);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        setLoadingProyectos(false);
      }
    };

    fetchProyectos();
  }, []);

  const handleSelectChange = (event) => {
    const selectedProyectoId = event.target.value;
    const selectedProyecto = proyectos.find(proyecto => proyecto.proyecto_id === parseInt(selectedProyectoId));
    setSelectedProyectoId(selectedProyectoId);
    dispatch({ type: "SET_ID_PROYECTO", payload: selectedProyectoId });

    if (selectedProyecto) {
      dispatch({ type: "SET_ID_RESPONSABLE_PROYECTO", payload: selectedProyecto.responsable_id });
      console.log(`Responsable ID: ${selectedProyecto.responsable_id}`);
    } else {
      dispatch({ type: "SET_ID_RESPONSABLE_PROYECTO", payload: null });
    }
  };


  return (
    <div className="w-full bg-gray-800 text-white p-2 flex justify-between items-center z-50 h-[70px]">
      <select
        className="w-52 h-10 bg-gray-700 text-white border border-gray-600 rounded-md p-2"
        onChange={handleSelectChange}
        value={selectedProyectoId}
      >
        <option value="" className="bg-gray-700 text-white">Seleccione un proyecto</option>
        {proyectos.map((proyecto) => (
          <option key={proyecto.proyecto_id} value={proyecto.proyecto_id} className="bg-gray-700 text-white">
            {proyecto.nombre}
          </option>
        ))}
      </select>
      <h1 className="mx-auto font-bold">Oficina TECOM</h1>
      {loading && (
        <div className="absolute right-24 top-3 mt-2 mr-2 flex items-center">
          <div className="loader mr-2"></div>
          <span>Cargando capa: {loadingLayerName}</span>
        </div>
      )}
      <button
        onClick={handleConfigClick}
        className="ml-2 bg-gray-700 text-white p-3 rounded text-lg"
        style={{ fontSize: "1.5rem" }}
      >
        <FaCog size={24} />
      </button>
      <div className="w-10"></div>
    </div>
  );
};

export default TopBar;