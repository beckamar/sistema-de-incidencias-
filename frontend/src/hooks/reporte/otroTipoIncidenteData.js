import { useCallback } from "react";
import usePostData from "../usePostData";
import { postOtroTipoIncidente } from '../../services/api/otroTipoIncidenteService.js';

const otroTipoIncidenteData = () => {
    const {error, executePost} = usePostData(postOtroTipoIncidente);

    const fetchReporteOtroTipo = useCallback(async(id_incidente, tipo, descripcion) => {
        
        const result = await executePost(id_incidente, tipo, descripcion);
        console.log("Resultado de postOtroTipoIncidente:", result); 
        if(result.success){
            return { success: true}
        }else{
            return { success: false, error: result.error || error};
        }

    }, [executePost, error]);


    return {
        fetchReporteOtroTipo
    };

};

export default otroTipoIncidenteData;