import React, {Fragment, useContext} from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import { Formulario_CrearLista } from "../Formularios/Formulario_crear_Lista.jsx";
//PAGINA DE INCIIO QUE LISTA
const CrearLista = () => {
const { iniciarSesion, token, user } = useContext(AuthContext)

    return (
        <Fragment>
            <Formulario_CrearLista></Formulario_CrearLista>
        </Fragment>
    )
}

export {
    CrearLista
}