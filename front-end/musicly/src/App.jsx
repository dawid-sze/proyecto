import { useState } from 'react'
import { BrowserRouter, useLocation } from "react-router-dom";
import './App.css'
import { Cabecera } from "./Componentes/Estructura/Cabecera.jsx"
import { Contenido } from "./Componentes/Estructura/Contenido.jsx"
import { ProveedorBandas } from "./Contexto/ProveedorBandas.jsx"
import { Navegacion } from "./Componentes/Estructura/Navegacion.jsx"
import { AuthProvider } from "./Contexto/ProveedorAutentificacion.jsx"
import { Reproductor } from './Componentes/Estructura/Reprductor.jsx';

function AppContent({ reproducirLista, colaActual, indiceActual, siguienteCancion, genero }) {
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

  const reproducirLista = (lista, index, genero) => {
    setColaActual(lista);
    setIndiceActual(index);
    setGenero(genero);
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
          />
        </ProveedorBandas>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
