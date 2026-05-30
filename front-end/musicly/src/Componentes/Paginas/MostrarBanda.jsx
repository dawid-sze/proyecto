import React from "react";
import { useParams } from "react-router-dom";
import { MostrarBandaElemento } from "../Elementos/MostrarBandasElemento";

const MostrarBanda = ({ onPlay }) => {
  // Extraemos el "identificador" que definiste en Rutas.jsx
  const { identificador } = useParams();

  return (
    <div className="container mt-4">
      {/* Pasamos el id como prop al componente hijo */}
      <MostrarBandaElemento idBanda={identificador} 
      onPlay={onPlay}/>
    </div>
  );
};

export { MostrarBanda };