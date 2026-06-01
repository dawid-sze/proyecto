import React, { Fragment, useContext, useState } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas";
import "./Admin.css";

const ListarUsuarios = () => {
    const { listado, borrarGrupo } = useContext(contextoListado);
    const [hoverId, setHoverId] = useState(null);

    return (
        <Fragment>
            <div className="admin-lista">
                {listado?.map((grupo) => (
                    <div
                        className="admin-item"
                        key={grupo.id}
                        onMouseEnter={() => setHoverId(grupo.id)}
                        onMouseLeave={() => setHoverId(null)}
                    >
                        <div className="admin-item-info">
                            <img
                                src={grupo.avatar}
                                alt={grupo.nombre_grupo}
                                className="admin-item-avatar"
                            />
                            <span className="admin-item-nombre">
                                {grupo.nombre_grupo}
                            </span>
                        </div>

                        <button
                            className="btn-delete"
                            onClick={() => {confirm("¿Desea eliminar este grupo?") && borrarGrupo(grupo.id)}}
                            aria-label="Eliminar grupo"
                        >
                            ✕
                        </button>

                        {/* Tooltip desplegable */}
                        {hoverId === grupo.id && (
                            <div className="admin-tooltip">
                                <div className="admin-tooltip-nombre">
                                    {grupo.nombre_grupo}
                                </div>
                                {grupo.discos?.length > 0 ? (
                                    <ul className="admin-tooltip-discos">
                                        {grupo.discos.map((disco) => (
                                            <li key={disco.id} className="admin-tooltip-disco">
                                                <img
                                                    src={disco.portada}
                                                    alt={disco.nombre}
                                                    className="admin-tooltip-portada"
                                                />
                                                <span>{disco.nombre}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="admin-tooltip-empty">Sin discos</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export { ListarUsuarios };
