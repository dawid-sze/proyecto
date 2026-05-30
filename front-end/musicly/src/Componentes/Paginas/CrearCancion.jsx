import React, {Fragment, useContext} from "react";
import { Formulario_CrearCancion } from "../Formularios/Formulario_insertar_cancion.jsx";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
//PAGINA DE INCIIO QUE LISTA
const CrearCancion = () => {
const { iniciarSesion, token, user } = useContext(AuthContext)
    return (
        <Fragment>
            <Formulario_CrearCancion usuario ={user[0]}></Formulario_CrearCancion>
        </Fragment>
    )
}

export {
    CrearCancion
}