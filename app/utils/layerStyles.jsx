import { Style, Stroke, Text } from "ol/style";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle"
import CircleStyle from "ol/style/Circle";
export const oficinaStyle = new Style({
  stroke: new Stroke({
    color: "#4A90E2", // Azul claro
    width: 3,
  }),
  zIndex: 1, // Establecer un zIndex mayor

});

export const empleadoStyle = new Style({
  image: new Circle({
    radius: 10,
    fill: new Fill({
      color: "#00FF00", // Verde por defecto
    }),
    stroke: new Stroke({
      color: "#black", // Un color de borde llamativo (rojo oscuro)
      width: 2, // Un borde más grueso
    }),
  }),
  text: new Text({
    font: '10px Calibri,sans-serif',
    fill: new Fill({
      color: '#fff', // Color del texto (blanco)
    }),
    stroke: new Stroke({
      color: '#000', // Color del borde del texto (negro)
      width: 3,
    }),
    text: '', // Este valor se establecerá dinámicamente
    offsetX: 25, // Desplazar el texto a la derecha
    offsetY: -15, // Desplazar el texto hacia arriba
  }),
  zIndex: 10, // Establecer un zIndex mayor
});

export const areasStyle = new Style({
  stroke: new Stroke({
    color: "yellow", // Azul claro
    width: 3,
  }),
  text: new Text({
    font: '12px Calibri,sans-serif',
    fill: new Fill({
      color: '#fff',
    }),
    stroke: new Stroke({
      color: '#000',
      width: 3,
    }),
    textBaseline: 'bottom', // Colocar el texto arriba del feature
    textAlign: 'left', // Alinear el texto a la derecha del feature
    offsetY: -31, // Ajustar la posición vertical del texto
    offsetX: 10, // Ajustar la posición horizontal del texto
  }),
  zIndex: 1, // Establecer un zIndex mayor
});

export const createCircleStyle = () => {
  return new Style({
    image: new CircleStyle({
      radius: 20,
      fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' }),
      stroke: new Stroke({ color: 'red', width: 2 }),
    }),
    zIndex: 1000, // Agregar zIndex mayor

  });
};