import React, { useContext, useState } from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import { ListaCanciones_SinDisco } from "../Elementos/ListarCanciones_SinDisco.jsx";
import "./MostrarLista.css";

const POR_PAGINA = 10;

const MostrarLikes = ({ onPlay }) => {
    const { user } = useContext(AuthContext);
    const [pagina, setPagina] = useState(0);
    console.log(user)
    const currentUser = user?.[0] || user;
    const likes = currentUser?.likes || [];

    const totalPaginas = Math.ceil(likes.length / POR_PAGINA);
    const likesPagina = likes.slice(pagina * POR_PAGINA, (pagina + 1) * POR_PAGINA);

    return (
        <div className="lista-page">
            <div className="lista-card">

                <div className="lista-card-header">
                    <div className="lista-select-wrap">
                        <i className="ti ti-heart" aria-hidden="true" style={{ color: "#E05C68" }}></i>
                        <span className="lista-titulo">Canciones que me gustan</span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#8FA3BC" }}>
                        {likes.length} {likes.length === 1 ? "canción" : "canciones"}
                    </span>
                </div>

                {likes.length === 0 ? (
                    <div style={{ padding: "2rem", textAlign: "center", color: "#8FA3BC", fontSize: "13px" }}>
                        Aún no has dado like a ninguna canción
                    </div>
                ) : (
                    <div className="lista-canciones-grid">
                        <ListaCanciones_SinDisco
                            canciones={likesPagina}
                            onPlay={onPlay}
                        />
                    </div>
                )}

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
    );
};

export { MostrarLikes };
