import { getTiposIncidentes } from "../utils/networkData.js";
import useFetchData from "../hooks/useFetchData.js";


const useTiposIncidenteData = () => {
    const {data: tiposIncidentes, error: tiposIncidentesError } = useFetchData(getTiposIncidentes);

    return {
        tiposIncidentes,
        tiposIncidentesError 
    };
};
export default useTiposIncidenteData;
