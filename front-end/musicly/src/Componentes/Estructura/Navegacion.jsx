import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import './Navegacion.css';
import logo from '../../assets/imagenes/musicly-logo.png';

const Navegacion = ({ open, onClose }) => {
    const { user } = useContext(AuthContext);
    const currentUser = user?.[0] || user;
    const esAdmin = currentUser?.rol === "admin";

    const link = (to, icon, label) => (
        <li key={to}>
            <NavLink
                to={to}
                onClick={onClose}
                className={({ isActive }) =>
                    isActive ? "menu_link menu_link--active" : "menu_link"
                }
            >
                <i className={`ti ${icon} nav-icon`} aria-hidden="true"></i>
                {label}
            </NavLink>
        </li>
    );

    return (
        <>
            {open && <div className="sidebar-overlay" onClick={onClose} />}

            <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
                <div className="sidebar-logo">
                    <div className="logo-icon">
                        <img src={logo} alt="Musicly" />
                    </div>
                    <span className="logo-text">Musicly</span>
                </div>

                <nav className="sidebar-nav">
                    <span className="nav-section-label">Principal</span>
                    <ul>
                        {link("/", "ti-home", "Inicio")}
                        {link("/crear", "ti-disc", "Crear disco")}
                        {link("/crearLista", "ti-playlist", "Crear lista")}
                        {link("/crearCancion", "ti-music", "Crear canción")}
                    </ul>

                    <span className="nav-section-label">Explorar</span>
                    <ul>
                        {link("/listarUsuario", "ti-playlist", "Mis listas")}
                        {link("/likes", "ti-heart", "Mis likes")}
                        {link("/listar", "ti-stack", "Listas por géneros")}
                        {link("/estadisticas", "ti-chart-bar", "Estadísticas")}
                        {esAdmin && link("/admin", "ti-settings", "Admin")}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export { Navegacion };
