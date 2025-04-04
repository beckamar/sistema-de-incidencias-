import { getTiposIncidentes, iniciarReporte } from "../utils/networkData.js";
import useFetchData from "../hooks/useFetchData.js";
import { useCallback } from "react";


const useTiposIncidenteData = () => {
    const {data: tiposIncidentes, error: tiposIncidentesError } = useFetchData(getTiposIncidentes);

    const fetchIniciarReporte = useCallback(async(id_catincidentes,id_centrotrabajo, id_subcentro) => {
        try {
            const {error:apiError, data } = await iniciarReporte(id_catincidentes,id_centrotrabajo, id_subcentro);
            return {success: true, data};
        } catch (error) {
            return {success: false, error: "Error al iniciar reporte"};

        }
    }, []);

    return {
        tiposIncidentes,
        tiposIncidentesError,
        fetchIniciarReporte
    };
};
export default useTiposIncidenteData;
