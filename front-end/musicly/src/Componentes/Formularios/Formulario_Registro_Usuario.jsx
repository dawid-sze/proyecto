import React, { Fragment, useRef, useState, useContext, useEffect  } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import logo from '../../assets/imagenes/musicly-logo.png';
import { Link } from "react-router-dom";
import './formularios.css';

const FormularioCreacion = () => {
    let bandaInicial = {
        nombre_grupo: "", nombre: "", apellidos: "",
        password: "", email: "", avatar: "", id_pais: ""
    };
    const [banda, setBanda] = useState(bandaInicial);
    const { registrarUsuario, errores, paises, limpiarErrores } = useContext(contextoListado);
    useEffect(() => {
        limpiarErrores();
    }, []);
    const actualizarDato = (evento) => {
        const { name, value, files } = evento.target;
        if (name === "avatar") {
            setBanda({ ...banda, avatar: files[0] });
        } else {
            setBanda({ ...banda, [name]: value });
        }
    };

    const bandaToFormData = (banda) => {
        const formData = new FormData();
        Object.keys(banda).forEach((clave) => formData.append(clave, banda[clave]));
        return formData;
    };

    const limpiarFormulario = () => {
        document.getElementById("formulario_1").reset();
        setBanda({ nombre_grupo: "", nombre: "", apellidos: "", password: "", email: "", id_pais: "", avatar: null });
    };

    return (
        <Fragment>
            <section className="login-page">
                <div className="form-card login-card registro-card">

                    <div className="login-logo">
                        <img src={logo} alt="Musicly" />
                    </div>

                    <h2>Crear cuenta</h2>
                    <p className="login-subtitle">Únete a Musicly</p>

                    <form id="formulario_1">

                        {/* Fila 1: nombre grupo + país */}
                        <div className="form-grid-2">
                            <div className="form-row">
                                <label>Nombre del grupo</label>
                                <input type="text" name="nombre_grupo" placeholder="Nombre del grupo"
                                    value={banda.nombre_grupo || ""} onChange={actualizarDato} required />
                                <span className="error">{errores.nombre_grupo}</span>
                            </div>
                            <div className="form-row">
                                <label>País</label>
                                <select name="id_pais" value={banda.id_pais} onChange={actualizarDato} required>
                                    <option value="">Selecciona un país</option>
                                    {paises.map((pais, index) => (
                                        <option key={index} value={String(pais.id)}>{pais.nombre_pais}</option>
                                    ))}
                                </select>
                                <span className="error">{errores.pais}</span>
                            </div>
                        </div>

                        {/* Fila 2: nombre + apellidos */}
                        <div className="form-grid-2">
                            <div className="form-row">
                                <label>Nombre</label>
                                <input type="text" name="nombre" placeholder="Tu nombre"
                                    value={banda.nombre || ""} onChange={actualizarDato} required />
                                <span className="error">{errores.nombre}</span>
                            </div>
                            <div className="form-row">
                                <label>Apellidos</label>
                                <input type="text" name="apellidos" placeholder="Tus apellidos"
                                    value={banda.apellidos || ""} onChange={actualizarDato} required />
                                <span className="error">{errores.apellidos}</span>
                            </div>
                        </div>

                        {/* Fila 3: email + password */}
                        <div className="form-grid-2">
                            <div className="form-row">
                                <label>Email</label>
                                <input type="email" name="email" placeholder="tu@email.com"
                                    value={banda.email || ""} onChange={actualizarDato} required />
                                <span className="error">{errores.email}</span>
                            </div>
                            <div className="form-row">
                                <label>Contraseña</label>
                                <input type="password" name="password" placeholder="••••••••"
                                    value={banda.password || ""} onChange={actualizarDato} required />
                                <span className="error">{errores.password}</span>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="form-row">
                            <label>Avatar</label>
                            <label className="file-label">
                                <input type="file" name="avatar" onChange={actualizarDato} style={{ display: "none" }} />
                                <span className="file-btn">
                                    <i className="ti ti-upload" aria-hidden="true"></i>
                                    {banda.avatar ? banda.avatar.name : "Seleccionar imagen"}
                                </span>
                            </label>
                            <span className="error">{errores.avatar}</span>
                        </div>

                        {/* Botones */}
                        <div className="form-grid-2" style={{ marginTop: "0.5rem" }}>
                            <input type="button" value="Crear cuenta"
                                onClick={() => registrarUsuario(bandaToFormData(banda))} />
                            <input type="button" value="Limpiar" className="btn-limpiar"
                                onClick={limpiarFormulario} />
                        </div>

                        <p className="login-registro">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/login">Inicia sesión</Link>
                        </p>

                    </form>
                </div>
            </section>
        </Fragment>
    );
};

export { FormularioCreacion };
