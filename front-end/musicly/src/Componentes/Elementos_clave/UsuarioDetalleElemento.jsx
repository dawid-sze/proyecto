import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UsuarioDetalle.css";
import { contextoListado } from "../../Contexto/ProveedorBandas";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion";
import { FormularioModificacion } from "../Formularios/Formulario_Modificar_Usuario";

const UsuarioDetalleElemento = ({ datos }) => {
    const { deleteDisco, deleteCancion } = useContext(contextoListado);
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mostrarEditar, setMostrarEditar] = useState(false);

    const esPremium = datos.suscripcion_real?.estado === "activa";

    return (
        <div className="usuario-card">

            {/* ── Panel izquierdo ── */}
            <div className="usuario-sidebar">
                <img
                    src={datos.avatar || 'https://via.placeholder.com/150'}
                    alt="Avatar"
                    className="usuario-avatar-img"
                />
                <div className="usuario-nombre-grupo">{datos.nombre_grupo}</div>
                <div className="usuario-email">{datos.email}</div>

                <span className={esPremium ? "badge-premium" : "badge-basico"}>
                    {esPremium ? "Premium" : "Básico"}
                </span>

                <button
                    className="btn-suscripcion"
                    onClick={() => navigate("/suscribirse")}
                >
                    <i className="ti ti-credit-card" aria-hidden="true"></i>
                    Gestionar suscripción
                </button>

                <button className="btn-logout" onClick={logOut}>
                    <i className="ti ti-logout" aria-hidden="true"></i>
                    Cerrar sesión
                </button>
            </div>

            {/* ── Panel derecho ── */}
            <div className="usuario-main">
                <div className="usuario-main-header">
                    <div className="usuario-section-title">Datos de la cuenta</div>
                    <button
                        className="btn-editar"
                        onClick={() => setMostrarEditar(v => !v)}
                    >
                        {mostrarEditar ? "Cancelar" : "Editar perfil"}
                    </button>
                </div>

                {mostrarEditar ? (
                    <div className="usuario-editar-wrap">
                        <FormularioModificacion bandaModificar={datos} />
                    </div>
                ) : (
                    <>
                        <div className="usuario-datos">
                            <div className="dato-row">
                                <span className="dato-label">Nombre y Apellidos</span>
                                <span className="dato-value">{datos.nombre} {datos.apellidos}</span>
                            </div>
                            <div className="dato-row">
                                <span className="dato-label">Rol</span>
                                <span className="dato-value">
                                    <span className="badge-rol">{datos.rol}</span>
                                </span>
                            </div>
                            <div className="dato-row">
                                <span className="dato-label">País</span>
                                <span className="dato-value">
                                    {datos.pais?.nombre_pais || "—"}
                                </span>
                            </div>
                        </div>

                        <hr className="usuario-divider" />

                        <div className="discos">
                            {datos.discos?.map((disco) => (
                                <div className="disco" key={disco.id}>
                                    <div className="disco-header">
                                        <div className="disco-info">
                                            <img
                                                src={disco.portada}
                                                alt={disco.nombre}
                                                className="disco-portada"
                                            />
                                            <span className="disco-nombre">{disco.nombre}</span>
                                        </div>
                                        <button
                                            className="btn-delete"
                                            onClick={() => {confirm("¿Desea eliminar este disco?") && deleteDisco(disco.id)}}
                                            aria-label="Eliminar disco"
                                        >✕</button>
                                    </div>
                                    <div className="canciones">
                                        {disco.canciones?.map((cancion) => (
                                            <div className="cancion" key={cancion.id}>
                                                <div className="cancion-info">
                                                    <img
                                                        src={disco.portada}
                                                        alt={cancion.nombre_cancion}
                                                        className="cancion-portada"
                                                    />
                                                    <span className="cancion-nombre">
                                                        {cancion.nombre_cancion}
                                                    </span>
                                                </div>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {confirm("¿Desea eliminar esta cancion?") && deleteCancion(cancion.id)}}
                                                    aria-label="Eliminar canción"
                                                >✕</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export { UsuarioDetalleElemento };
