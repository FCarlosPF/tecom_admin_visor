"use client";

import React, { useContext } from "react";
import TopBar from "@/components/topBar";
import NavBar from "@/components/navBar";
import { GlobalContext } from "@/components/globalState";

const Layout = ({ children }) => {
  const { state, dispatch } = useContext(GlobalContext);

 // Maneja el clic en el botón de configuración
   const handleConfigClick = () => {
     window.location.href = "http://localhost:3001";
   };
 

  return (
    <div className="relative w-full h-screen flex flex-col">
      <TopBar handleConfigClick={handleConfigClick} />
      <div className="flex flex-row h-full">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
