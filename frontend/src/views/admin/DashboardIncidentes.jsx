import { useState }  from 'react'
import CheckBoxFilter from '../../components/ui/CheckBoxFilter'
import Header from '../../components/ui/Header';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ErrorMessage';
import TablaIncidentes from './TablaIncidentes';
import AnaliticaIncidentes from './AnaliticaIncidentes'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {MdBarChart} from 'react-icons/md';
import { Checkbox } from "@material-tailwind/react";



export const DashboardIncidentes= ({
  centros,
  subcentros,
  selectedCentro,
  selectedSubcentro,
  showSubcentros,
  handleCentroChange,
  handleSubcentroChange,
  handleBackLogin,
  handleStatusChange,
  listaStatus,
  handleSearchSubmit,
  listaIncidentes,
  setlistaIncidentes,
  deshabilitarFiltros,
  handleToggleTodo,
  error,

}) => {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(true);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const togglePanel = () => {
    setFiltrosAbiertos(!filtrosAbiertos);
  };

  const toggleResumen = () => {
    setMostrarResumen(!mostrarResumen);
  };
    return (
    <div className="min-h-screen h-screen overflow-y-auto flex flex-col bg-gray-100">
      <Header
        onBack={handleBackLogin}
        showBackButton={true}
        label="Gestión de incidencias"
      />

      <div className="flex flex-1 overflow-y-auto relative">
        {/* Botón para abrir/cerrar panel de filtros */}
        <button
          onClick={togglePanel}
          className="absolute left-0 top-10 md:top-16 z-10 bg-white border rounded-r-md p-2 shadow-md hover:bg-gray-100 transition"
        >
          {filtrosAbiertos ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        {/* Panel lateral de filtros */}
        {filtrosAbiertos && (
          <form
            className="bg-gray-50 shadow rounded-lg p-6 m-6 w-80 flex flex-col gap-6"
            onSubmit={handleSearchSubmit}
          >

       
            <Checkbox
              label="Todo"
              className="text-sm"
              labelProps={{className: "text-sm text-gray-700 font-medium select-none" }}
              checked={deshabilitarFiltros}
              onChange={handleToggleTodo}
            />

          
            <Dropdown
              label="Status"
              options={listaStatus}
              onChange={handleStatusChange}
              disabled={deshabilitarFiltros}
            />
            <CheckBoxFilter
              label="Centro de trabajo"
              options={centros}
              selectedValue={selectedCentro}
              onChange={handleCentroChange}
            />
            {showSubcentros && (
              <CheckBoxFilter
                label="Zona/Agencia"
                options={subcentros}
                selectedValue={selectedSubcentro}
                onChange={handleSubcentroChange}
                disabled={deshabilitarFiltros}
              />
            )}
            <ErrorMessage error={error} />
            <div className="mb-4"></div>
            <Button type="submit">Buscar</Button>
          </form>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col p-6">
          {/* Botón resumen arriba de la tabla, alineado a la izquierda */}
          <div className="w-full flex justify-start mb-4">
            <button
              onClick={toggleResumen}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg shadow transition font-semibold
                ${mostrarResumen
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border"}
                focus:outline-none focus:ring-2 focus:bg-primary
                text-base
              `}
            >
              <MdBarChart className="text-xl" />
              <span className="hidden sm:inline">Resumen</span>
            </button>
          </div>

          {/* Modal/Pop up del resumen */}
          {mostrarResumen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition overflow-y-auto"
              style={{ backdropFilter: 'blur(2px)' }}
              onClick={toggleResumen}
            >
              <div
                className={`
                  bg-white rounded-xl shadow-2xl relative animate-fade-in
                  w-full max-w-5xl mx-4
                  my-8
                  p-2 sm:p-4 md:p-8
                  flex flex-col
                  max-h-[95vh] 
                  overflow-y-auto
                `}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={toggleResumen}
                  className="absolute top-2 right-2 text-gray-500 hover:text-indigo-600 font-bold text-xl"
                  aria-label="Cerrar resumen"
                >
                  ×
                </button>
                <h3 className=" mb-2 md:mb-6 text-lg md:text-2xl text-lg font-bold text-primary flex items-center gap-2">
                  <MdBarChart className="text-2xl md:text-3xl" />
                  Resumen de incidencias
                </h3>
                <div className="flex-1 overflow-y-auto">
                  <AnaliticaIncidentes listaIncidentes={listaIncidentes} />
                </div>
              </div>
            </div>
          )}

          {/* Tabla de incidentes */}
          <TablaIncidentes
            listaIncidentes={listaIncidentes}
            setlistaIncidentes={setlistaIncidentes}
            listaStatus={listaStatus}
          />
        </div>
      </div>
    </div>
  )
}



//resumen de todo, rpe, opcion de getAll -> StatusOPtion