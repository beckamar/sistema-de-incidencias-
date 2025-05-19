import React, { useState }  from 'react'
import RadioFilter from '../../components/ui/RadioFilter'
import Header from '../../components/ui/Header';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';




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
  statusOptions,
  error,

}) => {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(true);

  const togglePanel = () => {
    setFiltrosAbiertos(!filtrosAbiertos);
  };

  return (
    <div className='min-h-screen h-screen overflow-y-auto flex flex-col'>
    <Header onBack={handleBackLogin} showBackButton={true} label="Gestión de incidencias"/>

    <div className="flex flex-1 overflow-y-auto">

    <button onClick={togglePanel} className="absolute left-0 top-16 z-10 bg-white border rounded-r-md p-2 shadow-md hover:bg-gray-100 transition" >
          {filtrosAbiertos ? <FaChevronLeft /> : <FaChevronRight />}
    </button>

    {
      filtrosAbiertos &&(
        <div className="bg-gray-50 shadow rounded-lg p-6 m-6 w-80 flex flex-col gap-6 ">
        <Dropdown
          label="Status"
          options={statusOptions}
          onChange={handleStatusChange}
        />
        <RadioFilter
          options={centros}
          selectedValue={selectedCentro}
          onChange={handleCentroChange}
          label="Centro de trabajo"
        />
        {showSubcentros && (
          <RadioFilter
            options={subcentros}
            selectedValue={selectedSubcentro}
            onChange={handleSubcentroChange}
            label="Zona/Agencia"
          />
        )}
        <Button type="submit">Buscar</Button>
      </div>

      )
    }


      <div className="flex-1 p-6">
        {/* ...Contenido de la tabla o lista de resultados... */}
      </div>

      
    </div>
  </div>
    
  );

}
