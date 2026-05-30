import React, {Fragment, useContext} from "react";
import { UsuarioDetalleElemento } from "../Elementos_clave/UsuarioDetalleElemento.jsx";
import {AuthContext} from "../../Contexto/ProveedorAutentificacion.jsx"
const MostrarUsuario = () =>{
    const {user} = useContext(AuthContext)
    return (
        <UsuarioDetalleElemento datos={user[0]}></UsuarioDetalleElemento>
    )
}

export {
    MostrarUsuario
}