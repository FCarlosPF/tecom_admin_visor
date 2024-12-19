import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

export const loadLayer = async (getData, style, title, visible = true) => {
  const response = await getData();

  let features;
  if (response.type === "FeatureCollection" && Array.isArray(response.features)) {
    features = response.features;
  } else if (Array.isArray(response)) {
    // Transformar el array de objetos en features de GeoJSON
    features = response.map((item) => ({
      type: "Feature",
      geometry: item.geom,
      properties: { ...item },
    }));
  } else {
    throw new Error("La respuesta de la API no es un vector válido");
  }

  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(
      {
        type: "FeatureCollection",
        features: features,
      },
      {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:4326",
      }
    ),
  });

  return new VectorLayer({
    source: vectorSource,
    style: style,
    title: title,
    visible: visible,
  });
};

export const loadAndConfigureLayer = async (dispatch, getLayerFunc, style, title, visible) => {
  dispatch({ type: "SET_LOADING_LAYER_NAME", payload: title });
  const layer = await loadLayer(getLayerFunc, style, title, visible);
  layer.set("title", title);
  return layer;
};