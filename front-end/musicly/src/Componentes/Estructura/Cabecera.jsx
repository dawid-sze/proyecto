import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BuscadorBandas } from '../Elementos_clave/BuscarBandas.jsx';
import { AuthContext } from '../../Contexto/ProveedorAutentificacion.jsx';
import './Cabecera.css';

const Cabecera = ({ onToggleSidebar }) => {
    const { user } = useContext(AuthContext);
    const currentUser = user?.[0] || user;

    return (
        <header className="cabecera">

            {/* Hamburguesa — solo visible en móvil */}
            <button
                className="cabecera-hamburger"
                aria-label="Abrir menú"
                onClick={onToggleSidebar}
            >
                <i className="ti ti-menu-2"></i>
            </button>

            {/* Buscador */}
            <div className="cabecera-buscador">
                <BuscadorBandas />
            </div>

            {/* Usuario */}
            {currentUser && (
                <div className="cabecera-usuario">
                    <span className="cabecera-nombre">{currentUser.nombre_grupo}</span>
                    <Link to="/usuario">
                        <img
                            src={currentUser.avatar || 'https://via.placeholder.com/150'}
                            alt="Perfil"
                            className="cabecera-avatar"
                        />
                    </Link>
                </div>
            )}

        </header>
    );
};

export { Cabecera };
