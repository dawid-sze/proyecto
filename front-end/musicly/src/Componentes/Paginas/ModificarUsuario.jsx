import React, {Fragment, useContext} from "react";
import { FormularioModificacion } from "../Formularios/Formulario_Modificar_Usuario.jsx";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
//PAGINA DE INCIIO QUE LISTA
const ModificarUsuario = () => {
const { iniciarSesion, token, user } = useContext(AuthContext)
    return (
        <Fragment>
            <FormularioModificacion bandaModificar = {user[0]}></FormularioModificacion>
        </Fragment>
    )
}

export {
    ModificarUsuario
}