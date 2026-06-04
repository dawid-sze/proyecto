import React, { Fragment, useState, useContext, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { contextoListado } from "../../Contexto/ProveedorBandas";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion";
import './formularios.css';
import './Suscripcion.css';

const CrearSuscripcion = () => {
    const suscripcionInicial = { numero_tarjeta: "", fecha_caducidad: "", cvv: "" };
    const [suscripcion, setSuscripcion] = useState(suscripcionInicial);
    const [procesando, setProcesando] = useState(false);
    const { activarSuscripcion, activarTarjeta, desactivarTarjeta, errores, limpiarErrores } = useContext(contextoListado);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const currentUser = user?.[0] || user;
    const tarjetas = currentUser?.tarjetas || [];

    useEffect(() => {
        limpiarErrores();
    }, []);
    const actualizarDato = (e) => {
        const { name, value } = e.target;
        setSuscripcion({ ...suscripcion, [name]: value });
    };

    const limpiar = () => setSuscripcion(suscripcionInicial);

    const ocultarNumero = (num) => {
        if (!num) return "—";
        const limpio = num.replace(/\D/g, "");
        return limpio.slice(0, 4) + " •••• •••• " + limpio.slice(-4);
    };

    const handleGuardar = async () => {
        setProcesando(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        const datos = await activarSuscripcion(suscripcion);
        setProcesando(false);
        // Solo volvemos al perfil si no hay errores
        if (!datos?.errors && !datos?.error) {
            navigate("/usuario");
        }
    };

    return (
        <Fragment>
            {/* ── Simulación procesando ── */}
            {procesando && (
                <div className="suscripcion-procesando">
                    <div className="suscripcion-spinner"></div>
                    <div className="suscripcion-procesando-texto">Procesando tarjeta...</div>
                </div>
            )}

            {/* ── Lista de tarjetas ── */}
            {tarjetas.length > 0 && (
                <div className="tarjetas-lista">
                    <div className="tarjetas-titulo">Mis tarjetas</div>
                    {tarjetas.map((tarjeta) => {
                        const activa = tarjeta.estado === "activo";
                        return (
                            <div key={tarjeta.id} className={`tarjeta-item${activa ? " tarjeta-activa" : ""}`}>
                                <div className="tarjeta-info">
                                    <i className="ti ti-credit-card tarjeta-icon" aria-hidden="true"></i>
                                    <div>
                                        <div className="tarjeta-numero">{ocultarNumero(tarjeta.numero_tarjeta)}</div>
                                        <div className="tarjeta-caducidad">Caduca: {tarjeta.fecha_caducidad}</div>
                                    </div>
                                </div>
                                <div className="tarjeta-acciones">
                                    {activa ? (
                                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                            <span className="badge-activa">Activa</span>
                                            <button
                                                className="btn-desactivar"
                                                onClick={() => desactivarTarjeta(tarjeta.id)}
                                            >
                                                Desactivar
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="btn-activar"
                                            onClick={() => activarTarjeta(tarjeta.id)}
                                        >
                                            Activar
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Formulario nueva tarjeta ── */}
            <div className="form-card" style={{ marginTop: tarjetas.length > 0 ? "1rem" : 0 }}>
                <h2>Nueva tarjeta</h2>
                <form id="formulario_suscripcion">
                    <div className="form-row">
                        <label>Número de tarjeta</label>
                        <input
                            type="text"
                            name="numero_tarjeta"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            value={suscripcion.numero_tarjeta}
                            onChange={actualizarDato}
                            required
                        />
                        <span className="error">{errores.numero_tarjeta}</span>
                    </div>

                    <div style={{ display: "flex", gap: "12px" }}>
                        <div className="form-row" style={{ flex: 1 }}>
                            <label>Caducidad</label>
                            <input
                                type="text"
                                name="fecha_caducidad"
                                placeholder="MM/AA"
                                maxLength={5}
                                value={suscripcion.fecha_caducidad}
                                onChange={actualizarDato}
                                required
                            />
                            <span className="error">{errores.fecha_caducidad}</span>
                        </div>
                        <div className="form-row" style={{ flex: 1 }}>
                            <label>CVV</label>
                            <input
                                type="password"
                                name="cvv"
                                placeholder="•••"
                                maxLength={4}
                                value={suscripcion.cvv}
                                onChange={actualizarDato}
                                required
                            />
                            <span className="error">{errores.cvv}</span>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "8px", marginTop: "0.5rem" }}>
                        <input
                            type="button"
                            value="Guardar y activar"
                            disabled={procesando}
                            onClick={handleGuardar}
                        />
                        <input
                            type="button"
                            value="Limpiar"
                            className="btn-limpiar"
                            onClick={limpiar}
                            disabled={procesando}
                        />
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export { CrearSuscripcion };
