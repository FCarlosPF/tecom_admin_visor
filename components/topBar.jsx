"use client";

import React, { useContext } from "react";
import { FaCog } from "react-icons/fa";
import { GlobalContext } from "./globalState";

const TopBar = ({ handleConfigClick }) => {
  const { state } = useContext(GlobalContext);
  const { loading, loadingLayerName } = state;

  return (
    <div className="w-full bg-gray-800 text-white p-2 flex justify-between items-center z-50 h-[70px]">
      <select
        className="ml-2 bg-gray-700 text-white p-1 rounded"
        style={{ width: "200px", height: "40px" }}
      >
        <option value="oficina1">Proyecto 1</option>
        <option value="oficina2">Proyecto 2</option>
        <option value="oficina3">Proyecto 3</option>
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
