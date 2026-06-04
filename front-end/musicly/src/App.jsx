import { useState } from 'react'
import { BrowserRouter, useLocation } from "react-router-dom";
import './App.css'
import { Cabecera } from "./Componentes/Estructura/Cabecera.jsx"
import { Contenido } from "./Componentes/Estructura/Contenido.jsx"
import { ProveedorBandas } from "./Contexto/ProveedorBandas.jsx"
import { Navegacion } from "./Componentes/Estructura/Navegacion.jsx"
import { AuthProvider } from "./Contexto/ProveedorAutentificacion.jsx"
import { Reproductor } from './Componentes/Estructura/Reprductor.jsx';
import sin_portada from "./assets/imagenes/sin_portada.jpg";
function AppContent({ reproducirLista, colaActual, indiceActual, siguienteCancion, genero, portada }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const rutasSinLayout = ["/login", "/registro"];
  const mostrarLayout = !rutasSinLayout.includes(location.pathname);

  return (
    <div className="app-shell">

      {mostrarLayout && (
        <Navegacion
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-area">
        {mostrarLayout && <Cabecera onToggleSidebar={() => setSidebarOpen(o => !o)} />}

        <main className="page-content">
          <Contenido onPlay={reproducirLista} />
        </main>

        {mostrarLayout && (
          <Reproductor
            cancionActual={colaActual[indiceActual]}
            alTerminar={siguienteCancion}
            genero={genero}
            portada = {portada}
          />
        )}
      </div>

    </div>
  );
}

function App() {
  const [colaActual, setColaActual] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [genero, setGenero] = useState([]);
  const [portada, setPortada] = useState(sin_portada);
  const reproducirLista = (lista, index, genero, portada) => {
    setColaActual(lista);
    setIndiceActual(index);
    setGenero(genero);
    setPortada(portada)
  };

  const siguienteCancion = () => {
    setIndiceActual((prev) =>
      colaActual.length ? (prev + 1) % colaActual.length : 0
    );
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProveedorBandas>
          <AppContent
            reproducirLista={reproducirLista}
            colaActual={colaActual}
            indiceActual={indiceActual}
            siguienteCancion={siguienteCancion}
            genero={genero}
            portada = {portada}
          />
        </ProveedorBandas>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
