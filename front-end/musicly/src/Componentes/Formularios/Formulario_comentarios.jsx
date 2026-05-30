import React, { useRef, useState, useContext } from "react";
import { contextoListado } from "../../Contexto/ProveedorBandas";

const CrearMensaje = ({ cancionId, comentarios = [] }) => {
    const mensajeInicial = { contenido: "" };
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const { crearComentario, errores } = useContext(contextoListado);
    const contenidoRef = useRef(null);

    const actualizarDato = (e) => {
        const { name, value } = e.target;
        setMensaje({ ...mensaje, [name]: value });
    };

    const limpiar = () => {
        setMensaje(mensajeInicial);
        contenidoRef.current?.focus();
    };
    console.log(comentarios)

    return (
        <div className="comentarios-panel-wrap">
            <div className="comentarios-lista">
                {comentarios.length === 0 ? (
                    <p className="comentarios-empty">Sin comentarios aún</p>
                ) : (
                    comentarios.map((m) => (
                        <div key={m.id} className="comentario-item">
                            <div className="comentario-autor">
                                {m.emisor?.nombre_grupo || "Usuario"}
                            </div>
                            {m.contenido}
                        </div>
                    ))
                )}
            </div>

            <div className="comentario-form">
                <textarea
                    ref={contenidoRef}
                    className="comentario-input"
                    name="contenido"
                    placeholder="Escribe un comentario..."
                    rows={2}
                    value={mensaje.contenido}
                    onChange={actualizarDato}
                />
                {errores?.contenido && (
                    <span className="error-msg">{errores.contenido}</span>
                )}
                <div className="comentario-form-btns">
                    <button className="btn-limpiar-comentario" onClick={limpiar}>
                        Limpiar
                    </button>
                    <button
                        className="btn-enviar"
                        onClick={() => {
                            crearComentario(mensaje, cancionId);
                            limpiar();
                        }}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export { CrearMensaje };
