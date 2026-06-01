import React, { Fragment, useRef, useState, useContext } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import './formularios.css';
//FORMULARIO DE INSERCIÓN DE LIBROS 
const FormularioCreacion = () => {
    let bandaInicial = {
        "nombre_grupo": "",
        "nombre": "",
        "apellidos": "",
        "password": "",
        "email": "",
        "avatar": "",
        "id_pais": ""
    }
    const [banda, setBanda] = useState(bandaInicial);



    const { registrarUsuario, errores, paises } = useContext(contextoListado);

    const nombreGrupoRef = useRef(null);
    const nombreRef = useRef(null);
    const apellidosRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const avatarRef = useRef(null);

    let referencias = [];
    referencias.push(nombreGrupoRef, nombreRef, apellidosRef, passwordRef, emailRef, avatarRef);

    const actualizarDato = (evento) => {
        const { name, value, files } = evento.target;
        if (name == "avatar") {
            setBanda({ ...banda, avatar: files[0] });
        } else {
            setBanda({ ...banda, [name]: value });
        }
    }

    const bandaToFormData = (banda) => {
        const formData = new FormData();

        Object.keys(banda).forEach((clave) => {
            formData.append(clave, banda[clave]);
        });

        return formData;
    };

    const limpiarFormulario = () => {
        document.getElementById("formulario_1").reset();
        let campos_de_texto = document.getElementById("formulario_1").querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        campos_de_texto.forEach(campo => {
            campo.value = '';
        });
        setBanda({
            nombre_grupo: "",
            nombre: "",
            apellidos: "",
            password: "",
            email: "",
            id_pais: "",
            avatar: null
        });
    }

    return (
        <Fragment>
            <section className="crear">
                <h2>Registrar Banda</h2>
                <div className="form-card">
                    <form action="" id="formulario_1">
                        <div>
                            <label htmlFor="nombre_grupo">Nombre del grupo</label>
                            <input
                                ref={nombreGrupoRef}
                                type="text"
                                name="nombre_grupo"
                                placeholder="Escribe el nombre del grupo"
                                required
                                value={banda.nombre_grupo || ""}
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                            />
                            <span className="error">{errores.nombre_grupo}</span>
                        </div>

                        <div>
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                ref={nombreRef}
                                type="text"
                                name="nombre"
                                placeholder="Escribe tu nombre"
                                required
                                value={banda.nombre || ""}
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                            />
                            <span className="error">{errores.nombre}</span>
                        </div>

                        <div>
                            <label htmlFor="apellidos">Apellidos</label>
                            <input
                                ref={apellidosRef}
                                type="text"
                                name="apellidos"
                                placeholder="Escribe tus apellidos"
                                required
                                value={banda.apellidos || ""}
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                            />
                            <span className="error">{errores.apellidos}</span>
                        </div>

                        <div>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                required
                                value={banda.password || ""}
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                            />
                            <span className="error">{errores.password}</span>
                        </div>

                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="Escribe tu email"
                                required
                                value={banda.email || ""}
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                            />
                            <span className="error">{errores.email}</span>
                        </div>

                        <div>
                            <label htmlFor="avatar">Avatar</label>
                            <input
                                ref={avatarRef}
                                type="file"
                                name="avatar"
                                placeholder="URL del avatar"
                                required
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                            />
                            <span className="error">{errores.avatar}</span>
                        </div>
                        <div>
                            <label htmlFor="pais">País</label>
                            <select
                                name="id_pais"
                                value={banda.id_pais}
                                onChange={(evento) => {
                                    actualizarDato(evento);
                                }}
                                required
                            >
                                <option value="">Selecciona un país</option>
                                {paises.map((pais, index) => (
                                    <option key={index} value={String(pais.id)}>
                                        {pais.nombre_pais}
                                    </option>
                                ))}
                            </select>
                            <span className="error">{errores.pais}</span>
                        </div>

                        <div>
                            <input
                                type="button"
                                id="enviar"
                                value="Guardar banda"
                                onClick={(evento) => {
                                    let banda_final = bandaToFormData(banda)
                                        registrarUsuario(banda_final);
                                }}
                            />
                        </div>
                        <div><br />
                            <input
                                type="button"
                                value="Limpiar formulario"
                                onClick={(evento) => {
                                    limpiarFormulario();
                                }}
                            />
                        </div>
                    </form>
                </div>
            </section>
        </Fragment>
    )
}

export {
    FormularioCreacion
}
