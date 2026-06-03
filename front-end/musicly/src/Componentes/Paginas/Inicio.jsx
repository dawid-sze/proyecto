import React, { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import { ListaCanciones_SinDisco } from "../Elementos/ListarCanciones_SinDisco.jsx";
import "./Inicio.css";

const Inicio = ({ onPlay }) => {
    const { listado, cancionesGeneroMasEscuchado, cancionesAleatorias } = useContext(contextoListado);
    const navigate = useNavigate();
    console.log(cancionesAleatorias)
    console.log(cancionesGeneroMasEscuchado)
    const bandasAleatorias = [...listado]
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);
    console.log(cancionesAleatorias)
    console.log(cancionesGeneroMasEscuchado)
    return (
        <Fragment>
            <div className="seccion">
                <div className="seccion-header">
                    <div className="seccion-titulo">
                        <i className="ti ti-flame" aria-hidden="true"></i>
                        Por tu género más escuchado
                    </div>
                </div>
                <div className="canciones-grid">
                    <ListaCanciones_SinDisco canciones={cancionesGeneroMasEscuchado} onPlay={onPlay} />
                </div>
            </div>

            <div className="seccion">
                <div className="seccion-header">
                    <div className="seccion-titulo">
                        <i className="ti ti-sparkles" aria-hidden="true"></i>
                        Canciones aleatorias
                    </div>
                </div>
                <div className="canciones-grid">
                    <ListaCanciones_SinDisco canciones={cancionesAleatorias} onPlay={onPlay} />
                </div>
            </div>

            <div className="seccion">
                <div className="seccion-header">
                    <div className="seccion-titulo">
                        <i className="ti ti-users" aria-hidden="true"></i>
                        Bandas recomendadas
                    </div>
                </div>
                <div className="bandas-grid">
                    {bandasAleatorias.map((banda) => (
                        <div
                            key={banda.id}
                            className="banda-card"
                            onClick={() => navigate(`/mostrar/${banda.id}`)}
                        >
                            <img
                                src={banda.avatar || "/img/default-avatar.png"}
                                alt={banda.nombre_grupo}
                                className="banda-avatar-img"
                            />
                            <div>
                                <div className="banda-nombre">{banda.nombre_grupo}</div>
                                {banda.pais && (
                                    <div className="banda-pais">{banda.pais.nombre_pais}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export { Inicio };
