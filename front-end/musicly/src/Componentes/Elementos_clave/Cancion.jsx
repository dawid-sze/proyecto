import React, { useContext, useMemo, useState, useEffect, useRef } from "react";
import sin_portada from "../../assets/imagenes/sin_portada.jpg";
import { AniardirCancioLista } from "./Aniadiar_cancion_a_lista";
import { useLocation, useNavigate } from "react-router-dom";
import { contextoListado } from "../../Contexto/ProveedorBandas";
import { likearCancion } from "../../Hooks/likearCancion";
import { deslikearCancion } from "../../Hooks/deslikearCancion";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion";
import { CrearMensaje } from "../Formularios/Formulario_comentarios";
import "./Cancion.css";

const Cancion = ({ cancion, portada, nombre, id_banda, alHacerClick, enLista = false }) => {
    const { borrarCancionLista, lista_id } = useContext(contextoListado);
    const { user, setUser } = useContext(AuthContext);
    const { id, nombre_cancion, comentarios = [] } = cancion;
    const location = useLocation();
    const navegar = useNavigate();
    const currentUser = user?.[0] || user;
    const likes = currentUser?.likes || [];
    console.log(nombre, id_banda);

    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const footerRef = useRef(null);

    // Cierra comentarios si cambia la canción (el slider reutiliza instancias)
    useEffect(() => {
        setMostrarComentarios(false);
    }, [id]);

    const estaLikeada = useMemo(() =>
        likes.some(like => String(like.id) === String(id)),
        [likes, id]
    );

    const manejarLike = async () => {
        try {
            if (estaLikeada) {
                await deslikearCancion(id);
                setUser(prev => {
                    const u = prev?.[0] || prev;
                    const updated = { ...u, likes: (u.likes || []).filter(l => String(l.id) !== String(id)) };
                    return Array.isArray(prev) ? [updated] : updated;
                });
            } else {
                await likearCancion(id);
                setUser(prev => {
                    const u = prev?.[0] || prev;
                    const updated = { ...u, likes: [...(u.likes || []), cancion] };
                    return Array.isArray(prev) ? [updated] : updated;
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <article className="cancion-card">

            <div className="cancion-portada-wrap">
                <img src={portada || sin_portada} alt="Portada" />
                <button className="btn-like" onClick={manejarLike} aria-label="Like">
                    {estaLikeada ? "❤️" : "🤍"}
                </button>
            </div>

            <div className="cancion-body">
                 <div className="cancion-titulo">{nombre_cancion || "Sin título"}</div>
                    {nombre && id_banda && (
                        <div
                            className="cancion-banda"
                            onClick={() => navegar(`/mostrar/${id_banda}`)}
                        >
                            {nombre}
                        </div>
                    )}

                <div className="cancion-actions">
                    <button className="btn-reproducir" onClick={alHacerClick} aria-label="Reproducir">
                        ▶
                    </button>

                    {!enLista && (
                        <AniardirCancioLista cancionId={id} />
                    )}

                    {enLista && (
                        <button
                            className="btn-icon danger"
                            aria-label="Quitar de lista"
                            onClick={() => borrarCancionLista(lista_id, cancion.id)}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            <div className="cancion-footer" ref={footerRef}>
                <button
                    className="btn-comentarios"
                    onClick={() => setMostrarComentarios(v => !v)}
                >
                    <i className="ti ti-message" aria-hidden="true"></i>
                    Comentarios ({comentarios.length})
                </button>

                {mostrarComentarios && (
                    <CrearMensaje
                        cancionId={id}
                        comentarios={comentarios}
                    />
                )}
            </div>

        </article>
    );
};

export { Cancion };
