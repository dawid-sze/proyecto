import React, { Fragment, useContext } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas";
import "./canciones.css";

const ListarDiscos = () => {
    const { listado, deleteDisco } = useContext(contextoListado);

    return (
        <Fragment>
            <div className="usuarios">
                {listado?.map((usuario) => (
                    <div className="usuario" key={usuario.id}>

                       
                        <h3 className="usuario-nombre">
                            {usuario.nombre_usuario}
                        </h3>

               
                        <div className="canciones">
                            {usuario.discos?.map((disco) => (
                                <div className="cancion" key={disco.id}>

                                    <div className="cancion-info">
                                        <img
                                            src={disco.portada}
                                            alt={disco.nombre}
                                            className="cancion-portada"
                                        />

                                        <span className="cancion-nombre">
                                            {disco.nombre}
                                        </span>
                                    </div>

                                    <button
                                        className="btn-delete small"
                                        onClick={() => {confirm("¿Desea eliminar este grupo?") && deleteDisco(disco.id)}}
                                    >
                                        ✕
                                    </button>

                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </Fragment>
    );
};

export {
    ListarDiscos
};