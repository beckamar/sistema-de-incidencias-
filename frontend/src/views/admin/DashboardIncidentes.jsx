import { useState }  from 'react'
import CheckBoxFilter from '../../components/ui/CheckBoxFilter'
import Header from '../../components/ui/Header';
import Dropdown from '../../components/ui/Dropdown';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ErrorMessage';
import TablaIncidentes from './TablaIncidentes';
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
  listaStatus,
  handleSearchSubmit,
  listaIncidentes,
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
        <form 
        className="bg-gray-50 shadow rounded-lg p-6 m-6 w-80 flex flex-col gap-6"
        onSubmit={handleSearchSubmit}>

        <Dropdown
          label="Status"
          options={listaStatus}
          onChange={handleStatusChange}
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
          />
        )}

        <ErrorMessage error={error}/>
        <div className="mb-4"></div>
        <Button type="submit">Buscar</Button>
        </form>
      )
    }


      <div className="flex-1 p-6">
        <TablaIncidentes listaIncidentes={listaIncidentes}  />
      </div>
    </div>
  </div>
  );
}



//resumen de todo, rpe, agregar estado en proceso, opcion de getAll -> StatusOPtions





































































































































