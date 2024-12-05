"use client";

import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

// Define initial state
const initialState = {
  loading: true,
  loadingLayerName: "",
  layers: [],
};

// Define reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_LOADING_LAYER_NAME":
      return { ...state, loadingLayerName: action.payload };
    case "SET_LAYERS":
      return { ...state, layers: action.payload(state.layers) };
    case "TOGGLE_LAYER_VISIBILITY":
      return {
        ...state,
        layers: state.layers.map(layer => {
          if (layer.get("title") === action.payload.layerTitle) {
            layer.setVisible(action.payload.visibility);
          }
          return layer;
        })
      };
    default:
      return state;
  }
};

// Create context
export const GlobalContext = createContext();

// Create provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};