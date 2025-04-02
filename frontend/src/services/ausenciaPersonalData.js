import { useCallback } from "react";
import usePostData from "../hooks/usePostData"
import { getTiposAusenciaPersonal, postEmpleado } from "../utils/networkData"
import useFetchData from "../hooks/useFetchData";



const ausenciaPersonalData = () => {
    const {data, error, executePost} = usePostData(postEmpleado);
    const {data: tiposAusencias, error: tiposAusenciasError} = useFetchData(getTiposAusenciaPersonal);


    const handlePostEmpleado = useCallback(async (
        nombre_completo,
        clave
    ) => {
        const result = await executePost(
            nombre_completo,
            clave
        );
        if(result.success){
            return { success: true, empleado: result.data}
        }else{
            return { success: false, error: result.error || error};
        }
    }, [executePost, error]);


    return {
        //POST
        empleado: data,
        empleadoError : error,
        postEmpleado: handlePostEmpleado,
        //GET
        tiposAusencias,
        tiposAusenciasError
    };
};



export default ausenciaPersonalData;