import React, {Fragment} from "react";
import {Rutas} from "./Rutas.jsx";

// DEFINIMOS EL CONTENIDO DE NUESTRA APLICACIÓN
const Contenido = ({ onPlay }) =>{

    return (
        <Fragment>
            <main>
                <Rutas  onPlay={onPlay}/>
            </main>
        </Fragment>
    )
}

export {
    Contenido
}