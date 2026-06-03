import React, { Fragment, useContext, useState } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import { ListaCanciones } from "./ListarCanciones.jsx";
import "./MostrarBandaElemento.css";

const MostrarBandaElemento = ({ idBanda, onPlay }) => {
    const { listado } = useContext(contextoListado);
    const [pagina, setPagina] = useState(0);

    const banda = listado?.find(b => b.id == idBanda);

    if (!banda) {
        return <p style={{ color: "#8FA3BC", fontSize: "14px" }}>Buscando información de la banda...</p>;
    }
    const discos = banda.discos || [];
    const total = discos.length;
    const disco = discos[pagina];
    return (
        <Fragment>
            <div className="banda-header">
                <div className="banda-avatar">
                    {banda.avatar
                        ? <img src={banda.avatar} alt={banda.nombre_grupo} className="banda-avatar-img" />
                        : <i className="ti ti-users" aria-hidden="true"></i>
                    }
                </div>
                <h1 className="banda-titulo">{banda.nombre_grupo}</h1>
            </div>

            {total === 0 ? (
                <p style={{ color: "#8FA3BC", fontSize: "14px" }}>
                    Esta banda aún no tiene discos registrados.
                </p>
            ) : (
                <div className="disco-card">
                    <div className="disco-card-header">
                        <img
                            src={disco.portada}
                            alt={disco.nombre}
                            className="disco-thumb"
                        />
                        <div>
                            <div className="disco-nombre">{disco.nombre}</div>
                            <div className="disco-meta">Disco {pagina + 1} de {total}</div>
                        </div>
                    </div>

                    <div className="canciones-row">
                        <ListaCanciones
                            canciones={disco.canciones}
                            onPlay={onPlay}
                            portada={disco.portada}
                            genero={disco.id_genero}
                            nombre = {banda.nombre_grupo}
                            id = {banda.id}
                        />
                    </div>

                    <div className="paginacion">
                        <span className="paginacion-info">
                            Disco {pagina + 1} de {total}
                        </span>
                        <div className="paginacion-btns">
                            <button
                                className="btn-pag"
                                onClick={() => setPagina(p => p - 1)}
                                disabled={pagina === 0}
                            >
                                <i className="ti ti-chevron-left" aria-hidden="true"></i>
                                Anterior
                            </button>

                            {discos.map((_, i) => (
                                <button
                                    key={i}
                                    className={`btn-pag${i === pagina ? " active" : ""}`}
                                    onClick={() => setPagina(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="btn-pag"
                                onClick={() => setPagina(p => p + 1)}
                                disabled={pagina === total - 1}
                            >
                                Siguiente
                                <i className="ti ti-chevron-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export { MostrarBandaElemento };
