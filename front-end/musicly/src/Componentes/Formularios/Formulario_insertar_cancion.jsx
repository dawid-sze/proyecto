import React, { Fragment, useRef, useState, useContext, useEffect  } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import './formularios.css';

const Formulario_CrearCancion = (props) => {
    const cancionInicial = {
        nombre_cancion: "",
        cancion: "",
        id_disco: ""
    };

    const [cancion, setCancion] = useState(cancionInicial);
    const { registrarCancion, errores, limpiarErrores } = useContext(contextoListado);
    const { user } = useContext(AuthContext);
    const nombreCancionRef = useRef(null);
    const archivoCancionRef = useRef(null);

    useEffect(() => {
        limpiarErrores();
    }, []);

    const actualizarDato = (evento) => {
        const { name, value, files } = evento.target;
        if (name === "cancion") {
            setCancion({ ...cancion, cancion: files[0] });
        } else {
            setCancion({ ...cancion, [name]: value });
        }
    };

    const cancionToFormData = (cancion) => {
        const formData = new FormData();
        Object.keys(cancion).forEach((clave) => {
            formData.append(clave, cancion[clave]);
        });
        return formData;
    };

    const limpiarFormulario = () => {
        setCancion(cancionInicial);
        nombreCancionRef.current.value = "";
        archivoCancionRef.current.value = "";
    };

    const esPremium = (user) => {
        if (!user?.suscripcion_real) return false;
        const fecha = new Date(user.suscripcion_real.fecha_suscripcion);
        const dias = (new Date() - fecha) / (1000 * 60 * 60 * 24);
        return user.suscripcion_real.estado === "activa" && dias <= 30;
    };

    const contarCanciones = (user) => {
        if (!user?.discos) return 0;
        return user.discos.reduce((total, disco) => total + (disco.canciones?.length || 0), 0);
    };

    const cancionesTotales = contarCanciones(user?.[0]);
    const premium = esPremium(user?.[0]);
    const bloquear = cancionesTotales >= 10 && !premium;

    return (
        <Fragment>
            <section className="crear">
                <div className="form-card">
                    <h2>Crear canción</h2>
                    <form id="formulario_cancion">

                        <div className="form-row">
                            <label>Nombre de la canción</label>
                            <input
                                ref={nombreCancionRef}
                                type="text"
                                name="nombre_cancion"
                                placeholder="Nombre de la canción"
                                value={cancion.nombre_cancion || ""}
                                onChange={actualizarDato}
                            />
                            <span className="error">{errores.nombre_cancion}</span>
                        </div>

                        <div className="form-row">
                            <label>Archivo de la canción</label>
                            <input
                                ref={archivoCancionRef}
                                type="file"
                                name="cancion"
                                onChange={actualizarDato}
                            />
                            <span className="error">{errores.cancion}</span>
                        </div>

                        <div className="form-row">
                            <label>Disco</label>
                            <select
                                name="id_disco"
                                value={cancion.id_disco || ""}
                                onChange={actualizarDato}
                            >
                                <option value="">Selecciona un disco</option>
                                {props.usuario.discos.map((disco, index) => (
                                    <option key={index} value={disco.id}>
                                        {disco.nombre}
                                    </option>
                                ))}
                            </select>
                            <span className="error">{errores.id_disco}</span>
                        </div>

                        {bloquear && (
                            <div className="alert-suscripcion">
                                Los usuarios no suscritos solo pueden subir hasta 10 canciones
                            </div>
                        )}

                        <div style={{ display: "flex", gap: "8px", marginTop: "0.5rem" }}>
                            <input
                                type="button"
                                value="Guardar canción"
                                disabled={bloquear}
                                onClick={() => {
                                    if (bloquear) {
                                        alert("Has alcanzado el límite de 10 canciones. Suscríbete para continuar.");
                                        return;
                                    }
                                    const cancion_final = cancionToFormData(cancion);
                                        registrarCancion(cancion_final);
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

export { Formulario_CrearCancion };
