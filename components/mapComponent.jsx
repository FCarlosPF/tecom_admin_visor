"use client";
import React, { useEffect, useRef, useContext, useState } from "react";
import "ol/ol.css";
import { Feature, Map, View } from "ol";
import { loadAndConfigureLayer } from "@/app/utils/mapUtils";
import {
  areasStyle,
  createCircleStyle,
  empleadoStyle,
  oficinaStyle,
} from "@/app/utils/layerStyles";
import { areas, empleadosTitle, oficinaTitle } from "@/app/utils/layerTitles";
import { getAreas, getEmpleados, getOficina, getTasKToEmployee } from "@/services/index";
import { defaults } from "ol/interaction";
import { defaults as defaultControls } from "ol/control";
import { GlobalContext } from "./GlobalState";
import FormEmpleado from "./FormEmpleado";
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); // Referencia para almacenar el objeto del mapa
  const { state, dispatch } = useContext(GlobalContext);
  const { layers, empleados, idResponsableProyecto } = state;
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeTasks, setEmployeeTasks] = useState([]);

  const styleEmpleadoFunc = (feature) => {
    const style = empleadoStyle.clone();
    if (feature.get("nombre")) {
      const nombre = feature.get("nombre");
      const cantidadTareas = feature.get(
        "cantidad_tareas_pendientes_o_en_progreso"
      );
      style.getText().setText(`${nombre}\n (${cantidadTareas})`);

      // Cambiar el color del punto basado en la cantidad de tareas
      if (feature.get("id_empleado") === state.idResponsableProyecto) {
        style.getImage().getFill().setColor("#FFA500"); // Naranja
      } else if (cantidadTareas != 0) {
        style.getImage().getFill().setColor("#FF0000"); // Rojo
      } else {
        style.getImage().getFill().setColor("#00FF00"); // Verde
      }
    }
    return style;
  };

  const styleAreaFunc = (feature) => {
    const style = areasStyle.clone();
    if (feature.get("nombre")) {
      const nombre = feature.get("nombre");

      // Asegúrate de que el estilo tenga un objeto de texto
      if (!style.getText()) {
        style.setText(new ol.style.Text());
      }

      style.getText().setText(`${nombre}`);

      // Cambiar el color del Stroke basado en el valor del nombre
      if (nombre === "Desarrollo") {
        style.getStroke().setColor("#00FF00"); // Verde
      } else if (nombre === "Construcción") {
        style.getStroke().setColor("red"); // Celeste
      } else if (nombre === "Recursos Humanos") {
        style.getStroke().setColor("#ff00bd"); // Celeste
      }
    }
    return style;
  };

  // Carga las capas y configura el mapa
  useEffect(() => {
    console.log("MapComponent mounted");
    const fetchData = async () => {
      try {
        const map = new Map({
          target: mapRef.current,
          layers: [],
          view: new View({
            center: [0, 0],
            zoom: 2,
          }),
          interactions: defaults({
            dragPan: false,
            mouseWheelZoom: false,
            doubleClickZoom: false,
          }).extend([]),
          controls: defaultControls({ zoom: false }),
        });

        mapInstanceRef.current = map; // Almacenar el objeto del mapa en la referencia

        const layerConfigs = [
          {
            data: getOficina,
            style: oficinaStyle,
            title: oficinaTitle,
            visible: true,
          },
          {
            data: async () => {
              const empleadosData = await getEmpleados();
              dispatch({ type: "SET_EMPLEADOS", payload: empleadosData });
              return empleadosData;
            },
            style: styleEmpleadoFunc,
            title: empleadosTitle,
            visible: true,
          },
          {
            data: getAreas,
            style: styleAreaFunc,
            title: areas,
            visible: true,
          },
        ];

        for (const config of layerConfigs) {
          dispatch({ type: "SET_LOADING_LAYER_NAME", payload: config.title });
          const layer = await loadAndConfigureLayer(
            dispatch,
            config.data,
            config.style,
            config.title,
            config.visible
          );

          map.addLayer(layer);
          console.log(`Layer ${config.title} loaded and added to map`);

          if (config.title === oficinaTitle && config.visible) {
            const extent = layer.getSource().getExtent();
            map.getView().fit(extent, { size: map.getSize(), maxZoom: 23.5 });
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
  }, []); // <-- Asegúrate de incluir todas las dependencias necesarias

  useEffect(() => {
    const filteredEmpleados = state.idProyecto
      ? empleados.filter((empleado) =>
        empleado.proyectos_ids.includes(parseInt(state.idProyecto))
      )
      : empleados;

    const empleadosLayer = layers.find(
      (layer) => layer.get("title") === empleadosTitle
    );

    if (empleadosLayer) {
      const source = empleadosLayer.getSource();
      source.clear();
      filteredEmpleados.forEach((empleado) => {
        const feature = new Feature({
          geometry: new Point(empleado.geom.coordinates),
          nombre: empleado.nombre,
          apellidos: empleado.apellidos,
          cantidad_tareas_pendientes_o_en_progreso: empleado.cantidad_tareas_pendientes_o_en_progreso,
          id_empleado: empleado.id_empleado,
          correo: empleado.correo,
          especialidad: empleado.especialidad,
          sueldo: empleado.sueldo,
          activo: empleado.activo,
          foto: empleado.foto,
          nombre_usuario: empleado.nombre_usuario,
          contrasenia: empleado.contrasenia,
          fecha_contratacion: empleado.fecha_contratacion,
          area_id: empleado.area_id,
          rol_id: empleado.rol_id,
          proyectos_ids: empleado.proyectos_ids,
        });
        feature.setStyle(styleEmpleadoFunc(feature)); // Aplicar el estilo aquí
        source.addFeature(feature);
      });
    }
  }, [state.idProyecto, layers, empleados, state.idResponsableProyecto]);

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
          console.log(
            `Layer ${layer.get && layer.get("title")} removed from map`
          );
        }
      });
    }
  }, [layers]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      const map = mapInstanceRef.current;
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: createCircleStyle(),
        zIndex: 1000, // Establecer un zIndex mayor para que aparezca por encima
      });
      map.addLayer(vectorLayer);

      map.on("singleclick", async (evt) => {
        map.forEachFeatureAtPixel(evt.pixel, async (feature, layer) => {
          if (layer && layer.get("title") === empleadosTitle) {
            const properties = feature.getProperties();
            console.log("Nombre del empleado:", properties);
            setSelectedEmployee(properties); // Establecer el empleado seleccionado

            // Obtener las tareas del empleado
            const tasks = await getTasKToEmployee(properties.id_empleado);
            setEmployeeTasks(tasks);

            // Crear y añadir la feature con el estilo de círculo
            const geometry = feature.getGeometry();
            const coordinates = geometry.getCoordinates();
            const point = new Point(coordinates);
            const circleFeature = new Feature(point);
            vectorSource.clear(); // Limpiar cualquier feature anterior
            vectorSource.addFeature(circleFeature);
          }
        });
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full bg-black"
        style={{ paddingTop: "3rem" }}
      />
      <FormEmpleado
        employee={selectedEmployee}
        tasks={employeeTasks}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
};

export default MapComponent;