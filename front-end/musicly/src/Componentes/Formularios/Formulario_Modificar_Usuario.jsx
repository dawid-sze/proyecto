import React, { Fragment, useState, useContext, useEffect  } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas.jsx";
import './formularios.css';

const FormularioModificacion = (props) => {
    const [banda, setBanda] = useState(props.bandaModificar);
    const { errores, modificarUsuario, limpiarErrores } = useContext(contextoListado);
    const { nombre_grupo, password } = banda;

    useEffect(() => {
        limpiarErrores();
    }, []);
    const actualizarDato = (evento) => {
        const { name, value, type, files } = evento.target;
        if (type === "file") {
            setBanda({ ...banda, [name]: files[0] });
        } else {
            setBanda({ ...banda, [name]: value });
        }
    };

    const bandaToFormData = (banda) => {
        const formData = new FormData();
        formData.append('id', props.bandaModificar.id);
        if (banda.password && banda.password.length > 0) {
            formData.append('password', banda.password);
        }
        if (banda.avatar instanceof File) {
            formData.append('avatar', banda.avatar);
        }
        formData.append("nombre_grupo", banda.nombre_grupo);
        formData.append('_method', 'PUT');
        return formData;
    };

    return (
        <Fragment>
            <section className="crear">
                <div className="form-card">
                    <h2>Modificar perfil</h2>
                    <form id="formulario_1">

                        <div className="form-row">
                            <label style={{ display: "block", textAlign: "left" }}>Nombre del grupo</label>
                            <input
                                type="text"
                                name="nombre_grupo"
                                value={nombre_grupo || ""}
                                onChange={actualizarDato}
                            />
                            <span className="error">{errores.nombre_grupo}</span>
                        </div>

                        <div className="form-row">
                            <label style={{ display: "block", textAlign: "left" }}>
                                Nueva contraseña{" "}
                                <span style={{ color: "#8FA3BC", fontWeight: 400 }}>(opcional)</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Dejar en blanco para mantener"
                                value={password || ""}
                                onChange={actualizarDato}
                            />
                        </div>

                       <div className="form-row">
    <label>Avatar</label>
    <label className="file-label">
        <input
            type="file"
            name="avatar"
            onChange={actualizarDato}
            style={{ display: "none" }}
        />
        <span className="file-btn">
            <i className="ti ti-upload" aria-hidden="true"></i>
            {banda.avatar instanceof File ? banda.avatar.name : "Avatar"}
        </span>
    </label>
    <span className="error">{errores.avatar}</span>
</div>

                        <div style={{ marginTop: "0.5rem" }}>
                            <button
                                className="btn-editar"
                                onClick={() => {
                                    const banda_final = bandaToFormData(banda);
                                    modificarUsuario(banda_final);
                                }}
                            >
                                <i className="ti ti-device-floppy" aria-hidden="true"></i>
                                Guardar cambios
                            </button>
                        </div>

                    </form>
                </div>
            </section>
        </Fragment>
    );
};

export { FormularioModificacion };
