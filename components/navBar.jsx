import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./globalState";

const NavBar = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { layers } = state;
  const [visibleLayers, setVisibleLayers] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true); // Controla el desplegable de "Oficina"

  const toggleLayerVisibility = (layerTitle, visibility) => {
    dispatch({ type: "TOGGLE_LAYER_VISIBILITY", payload: { layerTitle, visibility } });
  };

  useEffect(() => {
    setVisibleLayers(layers);
  }, [layers]);

  return (
    <div className="bg-white text-gray-900 p-4 flex flex-col w-64 h-full shadow-md border border-gray-200">
      {/* Título con icono */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* Ícono de capas */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-gray-700 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9l7.5 4.5 7.5-4.5M3.75 15l7.5 4.5 7.5-4.5m-15-12l7.5 4.5 7.5-4.5"
            />
          </svg>
          <h2 className="text-lg font-bold text-gray-700">Capas</h2>
        </div>
      </div>
      {/* Subrayado decorativo */}
      <div className="h-px bg-gray-300 mb-4"></div>

      {/* Oficina - Desplegable */}
      <div>
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="cursor-pointer flex items-center justify-between mb-2"
        >
          <h3 className="text-sm font-semibold text-gray-700">Infraestructura</h3>
          <span className="text-gray-500">
            {isExpanded ? "▾" : "▸"}
          </span>
        </div>
        {isExpanded && (
          <div className="ml-4">
            {visibleLayers.map((layer) => (
              <div key={layer.get ? layer.get("title") : "unknown"} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={layer.getVisible ? layer.getVisible() : false}
                  onChange={(e) => toggleLayerVisibility(layer.get("title"), e.target.checked)}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm">{layer.get("title")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;