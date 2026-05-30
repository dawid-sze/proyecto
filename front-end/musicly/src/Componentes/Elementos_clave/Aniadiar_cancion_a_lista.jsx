import React, { useContext, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Formulario_CrearLista } from "../Formularios/Formulario_crear_Lista";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion";
import { contextoListado } from "../../Contexto/ProveedorBandas";

const AniardirCancioLista = ({ cancionId }) => {
  const { user } = useContext(AuthContext);
  const { insertarCancionLista } = useContext(contextoListado);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const dropRef = useRef(null);

  // Calcula posición del dropdown relativa al botón
  const abrirDropdown = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 8, // sube un poco
        left: rect.left + window.scrollX,
      });
    }
    setOpen(o => !o);
  };

  // Cierra al hacer clic fuera
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        dropRef.current && !dropRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleSelect = (listaId) => {
    insertarCancionLista(listaId, cancionId);
    setOpen(false);
  };

  const dropdown = (
    <div
      ref={dropRef}
      className="lista-dropdown"
      style={{
        position: "absolute",
        top: coords.top,
        left: coords.left,
        transform: "translateY(-100%)",
      }}
    >
      <div className="lista-dropdown-items">
        {user[0]?.listas?.length > 0 ? (
          user[0].listas.map((lista) => (
            <div
              key={lista.id}
              className="lista-dropdown-item"
              onClick={() => handleSelect(lista.id)}
            >
              <i className="ti ti-playlist nav-icon"></i>
              {lista.nombre_lista}
            </div>
          ))
        ) : (
          <p className="lista-dropdown-empty">No tienes listas</p>
        )}
      </div>
      <div className="lista-dropdown-nueva">
        <Formulario_CrearLista />
      </div>
    </div>
  );

  return (
    <div className="lista-dropdown-wrap">
      <button
        ref={btnRef}
        className="btn-icon"
        aria-label="Añadir a lista"
        onClick={abrirDropdown}
        title="Añadir a lista"
      >
        ☰
      </button>

      {open && createPortal(dropdown, document.body)}
    </div>
  );
};

export { AniardirCancioLista };
