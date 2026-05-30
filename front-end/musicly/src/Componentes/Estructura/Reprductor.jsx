import React, { useContext, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./reproductor.css";
import { contextoListado } from "../../Contexto/ProveedorBandas";
import sin_portada from "../../assets/imagenes/sin_portada.jpg";

const Reproductor = ({ cancionActual, alTerminar, genero }) => {
  const { reproduccionesUsuario, reproduccionesCancion } = useContext(contextoListado);
  const idRegistrado = useRef(null);

  useEffect(() => {
    if (!cancionActual || !cancionActual.id || cancionActual.id === idRegistrado.current) return;
    reproduccionesUsuario(genero);
    reproduccionesCancion(cancionActual.id);
    idRegistrado.current = cancionActual.id;
  }, [cancionActual, genero, reproduccionesUsuario, reproduccionesCancion]);

  return (
    <div className="reproductor-fijo">

      <div className="reproductor-portada-wrap">
        <img
          src={cancionActual?.disco?.portada || cancionActual?.portada || sin_portada}
          alt="Portada"
          className="reproductor-portada"
        />
      </div>

      <div className="reproductor-meta">
        <span className="reproductor-titulo">
          {cancionActual?.nombre_cancion || "Sin canción"}
        </span>
      </div>

      <div className="reproductor-player">
        <AudioPlayer
          autoPlay
          src={cancionActual?.cancion || ""}
          showSkipControls
          onClickNext={alTerminar}
          onEnded={alTerminar}
        />
      </div>

    </div>
  );
};

export { Reproductor };
