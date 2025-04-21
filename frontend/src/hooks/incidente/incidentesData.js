import useFetchData from '../useFetchData'
import { getIncidentes, putStatusIncidente } from '../../services/api/incidentesService'
import useUpdateData from '../useUpdateData';

const incidentesData = () => {
    const {data: listaIncidentes, error: fetchError, fetchData} = useFetchData(getIncidentes);
    const {isUpdating, error: updateError, updateData} = useUpdateData(putStatusIncidente);

    const updateStatus = async (id_incidente, estado) => {
        const result = await updateData(id_incidente, estado);
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
        updateStatus
    };

};

export default incidentesData;
