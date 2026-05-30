import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexto/ProveedorAutentificacion";
import { contextoListado } from "../../Contexto/ProveedorBandas";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const EstadisticasDetalles = () => {
  const { user } = useContext(AuthContext);
  const { obtenerEstadisticas, estadisticas } =
    useContext(contextoListado);

  const [tipoGrafico, setTipoGrafico] = useState("usuario");
  const [datosGrafico, setDatosGrafico] = useState([]);

  // Colores por género
  const coloresGenero = {
    rock: "#ff0000",
    pop: "#0000ff",
    clasica: "#00c853",
  };

  // Cambiar tipo de estadística
  useEffect(() => {
    if (tipoGrafico === "usuario") {
      const datosUsuario = user[0].mas_escuchados.map((genero) => ({
        nombre: genero.nombre_genero,
        reproducciones: genero.pivot.reproducciones,
      }));

      setDatosGrafico(datosUsuario);
    }

    if (tipoGrafico === "general") {
      obtenerEstadisticas();
    }
  }, [tipoGrafico]);

  // Cargar estadísticas generales
  useEffect(() => {
    if (tipoGrafico === "general" && estadisticas?.length > 0) {
      const datosGenerales = estadisticas.map((item) => ({
        nombre: item.genero,
        reproducciones: item.total_reproducciones,
      }));

      setDatosGrafico(datosGenerales);
    }
  }, [estadisticas]);

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">Estadísticas</h2>

      {/* SELECT */}
      <select
        value={tipoGrafico}
        onChange={(e) => setTipoGrafico(e.target.value)}
        className="border p-2 rounded mb-5"
      >
        <option value="usuario">Estadísticas de usuario</option>
        <option value="general">Estadísticas generales</option>
      </select>

      {/* GRÁFICO */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={datosGrafico}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="reproducciones" radius={[6, 6, 0, 0]}>
            {datosGrafico.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={coloresGenero[entry.nombre] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export {
  EstadisticasDetalles,
};