"use client"
import React, { useEffect, useRef, useContext } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { loadAndConfigureLayer } from "@/app/utils/mapUtils";
import { oficina2Style, oficina3Style, oficina4Style, oficinaStyle } from "@/app/utils/layerStyles";
import { oficinaTitle, oficinaTitle2, oficinaTitle3, oficinaTitle4 } from "@/app/utils/layerTitles";
import { getOficina } from "@/services/index";
import { defaults as defaultInteractions } from "ol/interaction";
import { defaults as defaultControls } from "ol/control";
import TopBar from "./TopBar";
import NavBar from "./NavBar";
import { GlobalContext } from "./globalState";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // Referencia para almacenar el objeto del mapa
  const { state, dispatch } = useContext(GlobalContext);
  const { layers } = state;

  // Maneja el clic en el botón de configuración
  const handleConfigClick = () => {
    window.location.href = "http://localhost:3001/";
  };

  // Carga las capas y configura el mapa
  useEffect(() => {
    const fetchData = async () => {
      try {
        const map = new Map({
          target: mapRef.current,
          layers: [],
          view: new View({
            center: [0, 0],
            zoom: 2,
          }),
          interactions: defaultInteractions({
            dragPan: false,
            mouseWheelZoom: false,
          }).extend([]),
          controls: defaultControls({ zoom: false }),
        });

        mapInstanceRef.current = map; // Almacenar el objeto del mapa en la referencia

        const layerConfigs = [
          { data: getOficina,style: oficinaStyle, title: oficinaTitle, visible: true },
          { data: getOficina, style: oficina2Style, title: oficinaTitle2, visible: false },
          { data: getOficina, style: oficina3Style, title: oficinaTitle3, visible: true },
          { data: getOficina, style: oficina4Style, title: oficinaTitle4, visible: false },
        ];

        for (const config of layerConfigs) {
          dispatch({ type: "SET_LOADING_LAYER_NAME", payload: config.title });
          const layer = await loadAndConfigureLayer(dispatch, config.data, config.style, config.title, config.visible);
          map.addLayer(layer);
          console.log(`Layer ${config.title} loaded and added to map`);

          if (config.visible) {
            const extent = layer.getSource().getExtent();
            map.getView().fit(extent, { size: map.getSize(), maxZoom: 23 });
          }

          dispatch({
            type: "SET_LAYERS",
            payload: (prevLayers) => [...prevLayers, layer],
          });

          console.log("Updated layers:", [...layers, layer]);
        }

        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_LOADING_LAYER_NAME", payload: "" });

        return () => map.setTarget(null);
      } catch (error) {
        console.error("Error al obtener las oficinas:", error);
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch({ type: "SET_LOADING_LAYER_NAME", payload: "" });
      }
    };

    fetchData();
  }, [dispatch]);

  // Actualiza las capas en el mapa cuando cambian
  useEffect(() => {
    if (mapInstanceRef.current && Array.isArray(layers)) {
      const map = mapInstanceRef.current;
      layers.forEach((layer) => {
        const isLayerInMap = map.getLayers().getArray().includes(layer);
        if (layer.get && layer.getVisible() && !isLayerInMap) {
          map.addLayer(layer);
          console.log(`Layer ${layer.get("title")} added to map`);
        } else if (layer.get && !layer.getVisible() && isLayerInMap) {
          map.removeLayer(layer);
          console.log(`Layer ${layer.get && layer.get("title")} removed from map`);
        }
      });
    }
  }, [layers]);

  return (
    <div className="relative w-full h-screen flex flex-col">
      <TopBar handleConfigClick={handleConfigClick} />
      <div className="flex flex-row h-full">
        <NavBar />
        <div className="relative w-full h-full">
          <div
            ref={mapRef}
            className="w-full h-full bg-black"
            style={{ paddingTop: "3rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;