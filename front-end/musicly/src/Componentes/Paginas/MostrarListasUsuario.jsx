import React, { Fragment, useContext, useState } from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import { ListaCanciones_SinDisco } from "../Elementos/ListarCanciones_SinDisco.jsx";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import "./MostrarLista.css";

const MostrarListasUsuario = ({ onPlay }) => {
    const { user } = useContext(AuthContext);
    const { setLista_id } = useContext(contextoListado);
    const [lista, setLista] = useState("");

    const handleChange = (e) => {
        const listaId = e.target.value;
        setLista_id(listaId);
        const listaSeleccionada = user?.[0]?.listas?.find(l => l.id == listaId);
        setLista(listaSeleccionada || "");
        console.log("lista_id seteado:", listaId);

    };

    return (
        <div className="lista-page">
            <div className="lista-card">
                <div className="lista-card-header">
                    <div className="lista-select-wrap">
                        <i className="ti ti-playlist" aria-hidden="true"></i>
                        <select className="lista-select" onChange={handleChange}>
                            <option value="">Selecciona una lista</option>
                            {user?.[0]?.listas?.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.nombre_lista} ({l.canciones?.length || 0})
                                </option>
                            ))}
                        </select>
                    </div>
                    {lista && (
                        <span style={{ fontSize: "12px", color: "#8FA3BC" }}>
                            {lista.canciones?.length || 0} canciones
                        </span>
                    )}
                </div>

                {!lista ? (
                    <div style={{ padding: "2rem", textAlign: "center", color: "#8FA3BC", fontSize: "13px" }}>
                        Selecciona una lista para ver sus canciones
                    </div>
                ) : lista.canciones?.length === 0 ? (
                    <div style={{ padding: "2rem", textAlign: "center", color: "#8FA3BC", fontSize: "13px" }}>
                        Esta lista no tiene canciones
                    </div>
                ) : (
                    <div className="lista-canciones-grid">
                        <ListaCanciones_SinDisco
                            canciones={lista.canciones || []}
                            onPlay={onPlay}
                            enLista={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export { MostrarListasUsuario };
