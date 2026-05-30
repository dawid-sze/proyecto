import React from "react";
import { CrearSuscripcion } from "../Formularios/Formulario_Suscribcion";
import "./Suscripcion.css";

const Suscribirse = () => {
    return (
        <section className="crear">
            <h2 style={{ fontSize: "18px", fontWeight: 500, color: "#3B5278", marginBottom: "1.25rem" }}>
                Gestión de suscripción
            </h2>
            <CrearSuscripcion />
        </section>
    );
};

export { Suscribirse };
