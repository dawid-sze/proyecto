import React, { Fragment, useRef, useState, useContext } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import './formularios.css';

const Formulario_CrearDisco = (props) => {
    const discoInicial = {
        nombre: "",
        portada: "",
        id_grupo: props.usuario.id,
        id_genero: ""
    };

    const [disco, setDisco] = useState(discoInicial);
    const { registrarDisco, errores, generos } = useContext(contextoListado);
    const nombreDiscoRef = useRef(null);
    const portadaDiscoRef = useRef(null);

    const actualizarDato = (evento) => {
        const { name, value, files } = evento.target;
        if (name === "portada") {
            setDisco({ ...disco, portada: files[0] });
        } else {
            setDisco({ ...disco, [name]: value });
        }
    };

    const discoToFormData = (disco) => {
        const formData = new FormData();
        Object.keys(disco).forEach((clave) => {
            formData.append(clave, disco[clave]);
        });
        return formData;
    };

    const limpiarFormulario = () => {
        document.getElementById("formulario_disco").reset();
        setDisco(discoInicial);
    };

    return (
        <Fragment>
            <section className="crear">
                <div className="form-card">
                    <h2>Crear disco</h2>
                    <form id="formulario_disco">

                        <div className="form-row">
                            <label htmlFor="nombre">Nombre del disco</label>
                            <input
                                ref={nombreDiscoRef}
                                type="text"
                                name="nombre"
                                placeholder="Nombre del disco"
                                required
                                value={disco.nombre || ""}
                                onChange={actualizarDato}
                            />
                            <span className="error">{errores.nombre}</span>
                        </div>

                        <div className="form-row">
                            <label htmlFor="portada">Portada</label>
                            <input
                                ref={portadaDiscoRef}
                                type="file"
                                name="portada"
                                required
                                onChange={actualizarDato}
                            />
                            <span className="error">{errores.portada}</span>
                        </div>

                        <div className="form-row">
                            <label htmlFor="genero">Género</label>
                            <select
                                name="id_genero"
                                value={disco.id_genero || ""}
                                onChange={actualizarDato}
                                required
                            >
                                <option value="">Selecciona un género</option>
                                {generos.map((genero, index) => (
                                    <option key={index} value={genero.id}>
                                        {genero.nombre_genero}
                                    </option>
                                ))}
                            </select>
                            <span className="error">{errores.genero}</span>
                        </div>

                        <div style={{ display: "flex", gap: "8px", marginTop: "0.5rem" }}>
                            <input
                                type="button"
                                value="Guardar disco"
                                onClick={() => {
                                    const disco_final = discoToFormData(disco);
                                        registrarDisco(disco_final);
                                }}
                            />
                            <input
                                type="button"
                                value="Limpiar formulario"
                                className="btn-limpiar"
                                onClick={limpiarFormulario}
                            />
                        </div>

                    </form>
                </div>
            </section>
        </Fragment>
    );
};

export { Formulario_CrearDisco };
