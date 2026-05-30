import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./ProveedorAutentificacion.jsx";
//Función para determinar permisos a las rutas
const PrivateRoute = () => {
  const { token, user } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (token && !user) {
    return <div>Cargando usuario...</div>;
  }

  return <Outlet />;
};

export {
  PrivateRoute
}