import React, {Fragment, useContext} from "react";
import { Formulario_CrearDisco } from "../Formularios/Formulario_Crear_Disco.jsx";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
//PAGINA DE INCIIO QUE LISTA
const CrearDisco = () => {
const { iniciarSesion, token, user } = useContext(AuthContext)
    return (
        <Fragment>
            <Formulario_CrearDisco usuario ={user[0]}></Formulario_CrearDisco>
        </Fragment>
    )
}

export {
    CrearDisco
}