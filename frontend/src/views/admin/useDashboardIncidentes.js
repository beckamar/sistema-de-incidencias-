import { useState} from 'react';
import dashboardData from '../../hooks/admin/DashboardData';
import { useNavigate } from 'react-router-dom';
import useIncidentesData from '../../hooks/incidente/useIncidentesData';

const useDashboardIncidentes = () => {

  const {centros, subcentros, fetchSubcentros, fetchSearchSubmit} = dashboardData();
  const {listaStatus, statusError} = useIncidentesData();
  
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [selectedSubcentro, setSelectedSubcentro] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [listaIncidentes, setlistaIncidentes] = useState([]);


    const handleCentroChange = (id_centrotrabajo) => {
      const newValue = id_centrotrabajo === selectedCentro ? null : id_centrotrabajo;
      setSelectedCentro(newValue);
      setSelectedSubcentro(null);
      setError(null);
      if (newValue) fetchSubcentros(newValue);
    };

   const handleSubcentroChange = (id_subcentro) => {
      setSelectedSubcentro(id_subcentro === selectedSubcentro ? null : id_subcentro);
      setError(null);
   };

   const handleStatusChange =  (e) => {
    const id_estado = e.target.value;
    setSelectedStatus(id_estado !== "" ? parseInt(id_estado, 10) : null);
    setError(null);
   };



   const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setError(null);

      try {
        console.log("Parametros en handleSearchSUbmit: ", {id_estado: selectedStatus, id_centrotrabajo: selectedCentro,id_subcentro: selectedSubcentro })
        const {error, data} = await fetchSearchSubmit({id_estado: selectedStatus, id_centrotrabajo: selectedCentro,id_subcentro: selectedSubcentro });
        if(!error){
          console.log("setListaIncidentes: ", data)
          setlistaIncidentes(data);
        }
      } catch (error) {
        setError(error.message);      
    }
   };

 
   const handleBackLogin = () => {
    navigate("/login")
  };


    const showSubcentros = selectedCentro && subcentros.length > 0;

    return { 
      centros,
      subcentros,
      showSubcentros,
      selectedCentro,
      selectedSubcentro,
      handleCentroChange,
      handleSubcentroChange,
      handleBackLogin,
      handleSearchSubmit,
      listaIncidentes,
      listaStatus,
      handleStatusChange,
      statusError,

      error
    };

};

export default useDashboardIncidentes;


