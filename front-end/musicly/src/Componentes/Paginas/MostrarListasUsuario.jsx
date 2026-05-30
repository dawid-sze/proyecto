import React, { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import { Cancion } from "../Elementos_clave/Cancion.jsx";
import "./MostrarLista.css";

const POR_PAGINA = 10;

const MostrarListasUsuario = ({ onPlay }) => {
    const { user } = useContext(AuthContext);
    const { setLista_id } = useContext(contextoListado);
    const [lista, setLista] = useState("");
    const [pagina, setPagina] = useState(0);

    const handleChange = (e) => {
        const listaId = e.target.value;
        setLista_id(listaId);
        const listaSeleccionada = user?.[0]?.listas?.find(l => l.id == listaId);
        setLista(listaSeleccionada || "");
        setPagina(0);
    };

    const canciones = lista?.canciones || [];
    const totalPaginas = Math.ceil(canciones.length / POR_PAGINA);
    const cancionesPagina = canciones.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);

    return (
        <Fragment>
            <div className="lista-page">
                <div className="lista-card">

                    <div className="lista-card-header">
                        <div className="lista-select-wrap">
                            <i className="ti ti-playlist" aria-hidden="true"></i>
                            <select className="lista-select" onChange={handleChange}>
                                <option value="">Selecciona una lista</option>
                                {user?.[0]?.listas?.map((l) => (
                                    <option key={l.id} value={l.id}>{l.nombre_lista}</option>
                                ))}
                            </select>
                        </div>
                        <div className="lista-titulo">
                            {lista?.nombre_lista || "Selecciona una lista"}
                        </div>
                    </div>

                    <div className="lista-canciones-grid">
                        {cancionesPagina.map((cancion, index) => (
                            <Cancion
                                key={cancion.id}
                                cancion={cancion}
                                portada={cancion.disco?.portada}
                                alHacerClick={() => onPlay(cancionesPagina, index, cancion.disco?.id_genero)}
                            />
                        ))}
                    </div>

                    {totalPaginas > 1 && (
                        <div className="paginacion">
                            <span className="paginacion-info">
                                Página {pagina + 1} de {totalPaginas}
                            </span>
                            <div className="paginacion-btns">
                                <button
                                    className="btn-pag"
                                    onClick={() => setPagina(p => p - 1)}
                                    disabled={pagina === 0}
                                >
                                    <i className="ti ti-chevron-left"></i> Anterior
                                </button>
                                {Array.from({ length: totalPaginas }, (_, i) => (
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
                                    disabled={pagina === totalPaginas - 1}
                                >
                                    Siguiente <i className="ti ti-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export { MostrarListasUsuario };
