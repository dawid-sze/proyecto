import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../Hooks/login.js";
import { obtenerUsuario } from "../Hooks/obtenerUsuario.js";
//Función para manejar la autentificación a la página
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [cargando, setCargando] = useState(true); // ✅ Añadido estado de carga
  const navigate = useNavigate();

  const iniciarSesion = async (credenciales) => {
    const sesion = await loginAction(credenciales);
    
    if (sesion && !sesion.error) {
      // Ajusta 'sesion.token' según cómo responda tu API
      const tokenRecibido = sesion.token || sesion; 
      
      setToken(tokenRecibido);
      localStorage.setItem("site", tokenRecibido);
      
      const datosDelUsuario = await obtenerUsuario(tokenRecibido);
      setUser(datosDelUsuario);
      console.log(user)
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/InicioSesion");
  };

  useEffect(() => {
    const cargarUsuarioPersistente = async () => {
      const tokenAlmacenado = localStorage.getItem("site");

      if (tokenAlmacenado) {
        try {
          const datos = await obtenerUsuario(tokenAlmacenado);
          
          if (datos && !datos.error) {
            setUser(datos);
            setToken(tokenAlmacenado);
          } else {
            logOut();
          }
        } catch (error) {
          console.error("Error recuperando sesión:", error);
          logOut();
        }
      }
      
      setCargando(false); // ✅ Ahora sí funcionará
    };

    cargarUsuarioPersistente();
  }, []);

  const exportacion = {
    token,
    user,
    cargando, // ✅ Exportamos cargando por si quieres mostrar un spinner
    iniciarSesion,
    logOut,
    setUser
  };

  return (
    <AuthContext.Provider value={exportacion}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };