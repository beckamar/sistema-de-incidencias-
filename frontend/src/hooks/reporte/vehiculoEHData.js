import { useCallback } from "react";
import { getCategoriasVehiculoEH, postReporteVehiculoEH } from "../../services/api/vehiculoEHService"; 
import useFetchData from "../useFetchData";
import usePostData from "../usePostData";




const VehiculoEHData = () => {

    const {data: categoriasVehiculoEH, error: categoriasVehiculoEHError} = useFetchData(getCategoriasVehiculoEH);
    const {error: postError, executePost} = usePostData(postReporteVehiculoEH);


    const fetchReporteVehiculoEH = useCallback(async(id_incidente, id_categoria, clave, descripcion) => {
        const result = await executePost(id_incidente, id_categoria, clave, descripcion);
        console.log("Resultado de postReporteVehiculoEH: ", result); 
        if(result.success){
            return { success: true}
        }else{
            return { success: false, error: result.error || error};
        }

    }, [executePost, postError]);

    

    return {
        categoriasVehiculoEH,
        categoriasVehiculoEHError,

        fetchReporteVehiculoEH  

        
    };
};


export default VehiculoEHData;