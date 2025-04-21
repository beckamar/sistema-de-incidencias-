import { useCallback } from "react";
import usePostData from "../usePostData"
import { getTiposAusenciaPersonal, postempleado, postReporteAusencia } from './../../services/api/ausenciaPersonalService.js'
import useFetchData from "../useFetchData";



const ausenciaPersonalData = () => {
    const {data, error, executePost} = usePostData(postempleado);
    const {data: tiposAusencias, error: tiposAusenciasError} = useFetchData(getTiposAusenciaPersonal);


    const postEmpleado = useCallback(async (nombre_completo, clave) => {
        console.log("Datos enviados a postEmpleado:", {nombre_completo, clave}); 
        const result = await executePost(nombre_completo,clave);
        console.log("Resultado de postEmpleado:", result); 
        if(result.success){
            return { success: true, empleado: result.data}
        }else{
            return { success: false, error: result.error || error};
        }
    }, [executePost, error]);



    const fetchReporteAusencia = useCallback(async(id_incidente, id_empleado, id_catalogoAusencias, descripcion) => {
        try {
            const {error:apiError, data } = await postReporteAusencia(id_incidente, id_empleado, id_catalogoAusencias, descripcion);
            if(apiError || !data){throw new Error (apiError ? data : "Api Error"); }
            return {success: true, userData: data};
            
        } catch (error) {
            return {success: false, error: "Error en Service Data"};            
        }
    }, []);


    return {
        empleado: data,
        empleadoError : error,
        postEmpleado,

        tiposAusencias,
        tiposAusenciasError,

        fetchReporteAusencia,
    };
};



export default ausenciaPersonalData;