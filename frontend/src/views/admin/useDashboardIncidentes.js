import { useMemo, useState} from 'react';
import sedeData from '../../hooks/admin/sedeData';
import { useNavigate } from 'react-router-dom';
import incidentes from '../../hooks/incidente/useIncidentesData';

const useDashboardIncidentes = () => {

  const {centros, subcentros, fetchSubcentros} = sedeData();
  
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [selectedSubcentro, setSelectedSubcentro] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



    const handleCentroChange = (centroId) => {
      const newValue = centroId === selectedCentro ? null : centroId;
      setSelectedCentro(newValue);
      setSelectedSubcentro(null);
      setError(null);
      if (newValue) fetchSubcentros(newValue);
    };

   const handleSubcentroChange = (subcentroId) => {
      setSelectedSubcentro(subcentroId === selectedSubcentro ? null : subcentroId);
      setError(null);
   };

   const handleStatusChange =  (e) => {
    setSelectedStatus(e.target.value);
    setError(null);
   };

   const statusOptions = [
    {id: "true", nombre: " Resuelto"},
    {id: "false",nombre: "Pendiente"}
   ];


   const handleBackLogin = () => {
    navigate("/login")
  };


  //Bajo analisis junto con variables pasadas por parametro en la funcion:listaIncidentes, selectedRol, selectedCentro, selectedSubcentro
    /**const permisos = {
        1: () => true,
        2: ({ incidente, centro, subcentro}) =>
          incidente.id_centrotrabajo == centro &&
        (subcentro == null || incidente.id_subcentro == subcentro),
      };

      const filtradoDatos = useMemo(() => 
        listaIncidentes.filter(incidente => 
          permisos[selectedRol]?.({ incidente, centro: selectedCentro, subcentro: selectedSubcentro })
        ),
        [listaIncidentes, selectedRol, selectedCentro, selectedSubcentro]
      );
      */



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
      handleStatusChange,
      statusOptions,

      error
    };

};

export default useDashboardIncidentes;


