import React, {Fragment} from "react";
import {Routes, Route, Outlet, Navigate} from "react-router-dom";
import { CrearDisco } from "../Paginas/CrearDisco.jsx";
import { CrearLista } from "../Paginas/CrearLista.jsx";
import {Inicio} from "../Paginas/Inicio.jsx";
import { InicioSesion } from "../Paginas/InicioSesion.jsx";
import { MostrarBanda } from "../Paginas/MostrarBanda.jsx";
import { MostrarListas } from "../Paginas/MostrarLista.jsx";
import {Registro} from "../Paginas/Registro.jsx";
import {Suscribirse} from "../Paginas/Suscribirse.jsx";
import {PrivateRoute} from "../../Contexto/ProteccionRutas.jsx"
import { useContext } from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion.jsx";
import { Error } from "../Paginas/Error.jsx";
import { MostrarUsuario } from "../Paginas/MostrarUsuario.jsx";
import { CrearCancion } from "../Paginas/CrearCancion.jsx";
import { MostrarListasUsuario } from "../Paginas/MostrarListasUsuario.jsx";
import { PaginaAdmin } from "../Paginas/PaginaAdmin.jsx";
import { Estadisticas } from "../Paginas/Estadisticas.jsx";
import { Likes } from "../Paginas/Likes.jsx";
// DEFINIMOS LAS RUTAS DE NUESTRA APLICACIÓN
const AdminRoute = () => {
    const { user } = useContext(AuthContext);
    const currentUser = user?.[0] || user;
    const esAdmin = currentUser?.rol === "admin";
    return esAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

const Rutas = ({ onPlay }) =>{

    return (
        <Fragment>
            <Routes>

                {/* RUTAS PÚBLICAS */}
                <Route path="/login" element={<InicioSesion />} />
                <Route path="/registro" element={<Registro />} />

                {/* RUTAS PROTEGIDAS */}
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Inicio onPlay={onPlay}/>} />
                    <Route path="/mostrar/:identificador" element={<MostrarBanda onPlay={onPlay}/>} />
                    <Route path="/crear" element={<CrearDisco />} />
                    <Route path="/crearCancion" element={<CrearCancion />} />
                    <Route path="/crearLista" element={<CrearLista />} />
                    <Route path="/listar" element={<MostrarListas onPlay={onPlay}/>} />
                    <Route path="/suscribirse" element={<Suscribirse />} />
                    <Route path="/usuario" element = {<MostrarUsuario/>} />
                    <Route path="/listarUsuario" element={<MostrarListasUsuario onPlay={onPlay}/>} />
                    <Route element={<AdminRoute />}>
                        <Route path="/admin" element={<PaginaAdmin />} />
                    </Route>
                    <Route path="/estadisticas" element={<Estadisticas />} />
                    <Route path="/likes" element={<Likes onPlay={onPlay}/>} />
                </Route>

                {/* RUTA DE ERROR */}
                <Route path="/error" element={<Error />} />

            </Routes>
        </Fragment>
    )
}

export{
    Rutas
}