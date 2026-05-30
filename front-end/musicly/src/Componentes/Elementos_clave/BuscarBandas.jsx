import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import './BuscarBandas.css'
const BuscadorBandas = () => {
  const { listado } = useContext(contextoListado); 
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
console.log(listado)
  // Filtrar bandas según lo que el usuario escribe
  const resultadosFiltrados = busqueda === "" 
    ? [] 
    : listado.filter(banda => 
        banda.nombre_grupo.toLowerCase().includes(busqueda.toLowerCase())
      );

  const manejarSeleccion = (id) => {
    setBusqueda(""); 
    navigate(`/mostrar/${id}`);
  };

  return (
    <div className="buscador-container" style={{ position: "relative" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar banda..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* Desplegable de resultados */}
      {resultadosFiltrados.length > 0 && (
        <ul className="list-group" style={{ 
          position: "absolute", 
          zIndex: 100, 
          width: "100%",
          cursor: "pointer" 
        }}>
          {resultadosFiltrados.map((banda) => (
            <li 
              key={banda.id} 
              className="list-group-item list-group-item-action"
              onClick={() => manejarSeleccion(banda.id)}
            >
              {banda.nombre_grupo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { BuscadorBandas };