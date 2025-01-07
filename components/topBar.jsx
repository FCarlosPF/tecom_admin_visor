"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaFileAlt, FaCog } from "react-icons/fa";
import { GlobalContext } from "./globalState";
import { descargarReporteExcel, descargarReportePendienteExcel, getProyectos } from "@/services";

const TopBar = ({ handleConfigClick }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [loadingLayerName, setLoadingLayerName] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [loadingProyectos, setLoadingProyectos] = useState(false);
  const [selectedProyectoId, setSelectedProyectoId] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

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

  const handleReportClick = async (type) => {
    try {
      if (type === "excel") {
        await descargarReporteExcel();
        console.log("Reporte descargado con éxito.");
      } else if (type === "tareasTardes") {
        await descargarReportePendienteExcel();
        console.log("Reporte de tareas tardías descargado con éxito.");
      }
    } catch (error) {
      console.error("Error al descargar el reporte:", error);
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
      <div
        className="relative ml-4"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <button
          className="bg-gray-700 text-white p-3 me-4 mb-1 rounded cursor-pointer text-lg"
          style={{ fontSize: "1.5rem", marginRight: "30px" }}
        >
          <FaFileAlt size={24} />
        </button>
        {isDropdownVisible && (
          <div className="absolute top-full left-0 bg-gray-700 text-white border border-gray-600 rounded-md mt-0 z-10 p-1">
            <p className="text-center text-gray-400 border-b border-gray-600 select-none">Reportes</p>
            <ul className="text-sm">
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer rounded text-center"
                onClick={() => handleReportClick("excel")}
              >
                No entregadas
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer rounded text-center"
                onClick={() => handleReportClick("tareasTardes")}
              >
                Pendientes
              </li>
            </ul>
          </div>
        )}
      </div>
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