import useFetchData from '../useFetchData'
import { getIncidentes, getStatus, putStatusIncidente } from '../../services/api/incidentesService'
import useUpdateData from '../useUpdateData';

const useIncidentesData = () => {
    const {data: listaIncidentes, error: fetchError, fetchData} = useFetchData(getIncidentes);
    const {data: listaStatus, error: statusError} = useFetchData(getStatus);
    const {isUpdating, error: updateError, updateData} = useUpdateData(putStatusIncidente);

    const updateStatus = async (id_incidente, id_estado) => {
        const result = await updateData(id_incidente, id_estado);
        if(result.success){
            await fetchData();
        }
        return result;
    };
  

    return {
        listaIncidentes,
        fetchError,
        isUpdatingStatus: isUpdating,
        updateError,
        listaStatus,
        statusError,
        updateStatus
    };

};

export default useIncidentesData;
