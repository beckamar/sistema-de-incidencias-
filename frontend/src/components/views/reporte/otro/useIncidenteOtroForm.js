import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import otroTipoIncidenteData from '../../../../hooks/reporte/otroTipoIncidenteData';


export const useIncidenteOtroForm = () => {

  const { fetchReporteOtroTipo} = otroTipoIncidenteData();
  const [tipo, setTipoIncidencia] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const location = useLocation();
  const {id_incidente} = location.state;



  const handleTipoIncidente = (e) => {
    setTipoIncidencia(e.target.value);
    setError(null);
  }

  const handleDescripcion = (e) => {
    setDescripcion(e.target.value);
    setError(null);
  }

  const handleSubmitIncidenteOtro = async(e) => {
    e.preventDefault();
    setError(null);

    if(!tipo || !descripcion) {
      setError("Campos obligatorios vacios");
      return;
    }

    try {

      const {success: reporteSuccess, error: reporteError} =  await fetchReporteOtroTipo(id_incidente, tipo, descripcion);
      console.log("Respuest de reporte de otrotipoincidente en useincidenteFOrm");
      if (!reporteSuccess) throw new Error(reporteError);
            
      setSubmitSuccess(true);

    } catch (error) {
      setError(error.message);             
      
    }
  };


  return {
    tipo,
    descripcion,
    handleTipoIncidente,
    handleDescripcion,
    handleSubmitIncidenteOtro,

    submitSuccess,
    error
    
  };
}
