import React, { useState } from "react";
import { ListarUsuarios } from "../Elementos_clave/ListarUsuarios";
import { ListarDiscos } from "../Elementos_clave/ListarDiscos";
import "./Admin.css";

const PaginaAdmin = () => {
    const [vista, setVista] = useState("usuarios");

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="admin-tabs">
                    <button
                        className={`admin-tab${vista === "usuarios" ? " active" : ""}`}
                        onClick={() => setVista("usuarios")}
                    >
                        <i className="ti ti-users" aria-hidden="true"></i>
                        Usuarios
                    </button>
                    <button
                        className={`admin-tab${vista === "discos" ? " active" : ""}`}
                        onClick={() => setVista("discos")}
                    >
                        <i className="ti ti-disc" aria-hidden="true"></i>
                        Discos
                    </button>
                </div>
            </div>

            <div className="admin-content">
                {vista === "usuarios" && <ListarUsuarios />}
                {vista === "discos" && <ListarDiscos />}
            </div>
        </div>
    );
};

export { PaginaAdmin };
