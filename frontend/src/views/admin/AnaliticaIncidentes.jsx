import React, { useMemo, useState } from "react";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

// Tarjeta resumen responsiva
function TarjetaResumen({ titulo, cantidad, color, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center min-w-[110px] px-4 py-3 rounded-xl
        transition border
        ${selected ? "ring-2 ring-indigo-600 shadow-lg" : "shadow"}
        `}
      style={{
        background: color,
        color: "#222",
        fontWeight: 600,
        fontSize: 16,
        outline: "none",
      }}
    >
      <div className="text-2xl font-bold">{cantidad}</div>
      <div className="truncate">{titulo}</div>
    </button>
  );
}

const estadoColors = {
  Pendiente: "#ffcdd2",
  "En Proceso": "#90caf9",
  Resuelto: "#a5d6a7"
};

export default function AnaliticaIncidentes({ listaIncidentes }) {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

  // ------------ KPIs Y RESUMENES -------------
  const resumen = useMemo(() => {
    const estados = ["Pendiente", "En Proceso", "Resuelto"];
    return estados.map((estado) => ({
      estado,
      value: listaIncidentes.filter((i) => i.estado_incidente === estado).length,
      color: estadoColors[estado]
    }));
  }, [listaIncidentes]);

  const total = listaIncidentes.length;

  // Agrupados por centro de trabajo para el estado seleccionado
  const centrosPorEstado = useMemo(() => {
    if (!estadoSeleccionado) return [];
    const filtrados = listaIncidentes.filter(i => i.estado_incidente === estadoSeleccionado);
    const agrupados = {};
    filtrados.forEach(i => {
      agrupados[i.centro_trabajo] = (agrupados[i.centro_trabajo] || 0) + 1;
    });
    return Object.entries(agrupados).map(([centro, cantidad]) => ({ centro, cantidad }));
  }, [listaIncidentes, estadoSeleccionado]);

  // Incidentes agrupados por fecha_reporte
  const incidentesPorDia = useMemo(() => {
    const agrupados = {};
    listaIncidentes.forEach((i) => {
      agrupados[i.fecha_reporte] = (agrupados[i.fecha_reporte] || 0) + 1;
    });
    return Object.entries(agrupados)
      .map(([fecha, value]) => ({ fecha, value }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }, [listaIncidentes]);

  // Incidentes agrupados por tipo y subtipo
  const incidentesPorTipo = useMemo(() => {
    const agrupados = {};
    listaIncidentes.forEach((i) => {
      agrupados[i.tipo_incidente] = (agrupados[i.tipo_incidente] || 0) + 1;
    });
    return Object.entries(agrupados).map(([tipo, value]) => ({ tipo, value }));
  }, [listaIncidentes]);
  const incidentesPorSubtipo = useMemo(() => {
    const agrupados = {};
    listaIncidentes.forEach((i) => {
      agrupados[i.subtipo] = (agrupados[i.subtipo] || 0) + 1;
    });
    return Object.entries(agrupados).map(([subtipo, value]) => ({ subtipo, value }));
  }, [listaIncidentes]);
  // Incidentes por centro
  const incidentesPorCentro = useMemo(() => {
    const agrupados = {};
    listaIncidentes.forEach((i) => {
      agrupados[i.centro_trabajo] = (agrupados[i.centro_trabajo] || 0) + 1;
    });
    return Object.entries(agrupados).map(([centro, value]) => ({ centro, value }));
  }, [listaIncidentes]);

  return (
    <div className="px-2 py-2 md:px-8 md:py-6 font-sans w-full">

      {/* KPIs */}
      <div className="flex flex-wrap gap-2 md:gap-6 mb-4">
        <TarjetaResumen
          titulo="Total"
          cantidad={total}
          color="#f5f5f5"
          onClick={() => setEstadoSeleccionado(null)}
          selected={estadoSeleccionado === null}
        />
        {resumen.map((r) => (
          <TarjetaResumen
            key={r.estado}
            titulo={r.estado}
            cantidad={r.value}
            color={r.color}
            onClick={() => setEstadoSeleccionado(r.estado)}
            selected={estadoSeleccionado === r.estado}
          />
        ))}
      </div>

      {/* Desglose por centro de trabajo si hay estado seleccionado */}
      {estadoSeleccionado && (
        <div className="mb-4 border border-gray-200 p-4 rounded-md bg-gray-50 max-w-full md:max-w-md">
          <strong>
            {`Centros de trabajo con incidencias "${estadoSeleccionado}":`}
          </strong>
          <ul className="list-disc pl-6">
            {centrosPorEstado.length === 0 ? (
              <li>No hay incidencias en este estado.</li>
            ) : (
              centrosPorEstado.map(({ centro, cantidad }) => (
                <li key={centro}>{centro}: {cantidad}</li>
              ))
            )}
          </ul>
        </div>
      )}

      {/* GRÁFICAS */}
      <div className="flex flex-col lg:flex-row flex-wrap gap-6 justify-start items-start w-full">
        {/* Pie Chart por estado */}
        <div className="w-full sm:w-64 md:w-72 flex flex-col items-center bg-white rounded-xl shadow p-4">
          <h4 className="mb-2 text-center font-semibold text-gray-800">Incidencias por Status</h4>
          <PieChart width={220} height={200}>
            <Pie
              data={resumen}
              dataKey="value"
              nameKey="estado"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {resumen.map((entry, idx) => (
                <Cell key={`cell-state-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart por centro */}
        <div className="w-full sm:w-80 md:w-[400px] flex flex-col items-center bg-white rounded-xl shadow p-4">
          <h4 className="mb-2 text-center font-semibold text-gray-800">Incidentes por Centro de Trabajo</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incidentesPorCentro}>
              <XAxis dataKey="centro" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="value" fill="#ffb300" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart por tipo */}
        <div className="w-full sm:w-64 md:w-72 flex flex-col items-center bg-white rounded-xl shadow p-4">
          <h4 className="mb-2 text-center font-semibold text-gray-800">Por Tipo de Incidente</h4>
          <PieChart width={220} height={200}>
            <Pie
              data={incidentesPorTipo}
              dataKey="value"
              nameKey="tipo"
              cx="50%"
              cy="50%"
              outerRadius={70}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {incidentesPorTipo.map((entry, idx) => (
                <Cell key={`cell-tipo-${idx}`} fill={["#90caf9", "#ffe082", "#a5d6a7", "#ffccbc", "#f5f5f5"][idx % 5]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}