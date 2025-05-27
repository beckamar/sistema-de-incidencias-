import useFetchData from '../useFetchData';
import { getCentros, getSubcentros } from '../../services/api/sedesService';
import { useCallback } from 'react';
import { getIncidentes } from '../../services/api/incidentesService';

const DashboardData = () => {

  const {data:centros, error: centrosError} = useFetchData(getCentros);
  const {data: subcentros, error:subcentrosError, fetchData: fetchSubcentros} = useFetchData(getSubcentros);

  const fetchSearchSubmit = useCallback(async({ id_estado, id_centrotrabajo, id_subcentro }) =>{
      try {
          const {error:apiError, data } = await getIncidentes({id_estado, id_centrotrabajo, id_subcentro});
          
          if(apiError) {
            throw new Error(typeof data === 'string' ? data : "Error al obtener incidentes");
          }
        
        return {success: true, data: data};
        
      } catch (error) {
        return {success: false, error: error.message};
    }
}, []);

    
  return {
    centros,                                                            
    centrosError,
    subcentros,
    subcentrosError,                                                                                                                                                                                                                                  
    fetchSubcentros,
    fetchSearchSubmit
  }                                                                                                       


};

export default DashboardData;
