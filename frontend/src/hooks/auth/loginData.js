import { useCallback } from "react";
import { getCentrostrabajoRol,getRoles, getSubcentros } from '../../services/api/sedesService.js';  
import { login } from '../../services/api/authService.js';   
import useFetchData from "../useFetchData.js";

//obtencion de centros y/o subcentro por rol
const loginData = () => {
    const {data: roles, error: rolesError } = useFetchData(getRoles);
    const {data: centros, error: centrosError, fetchData: fetchCentros} = useFetchData(getCentrostrabajoRol, [], false);
    const {data: subcentros, error: subcentrosError, fetchData: fetchSubcentros} = useFetchData(getSubcentros, [], false);

    const fetchSubmit = useCallback (async (selectedRol, selectedCentro, selectedSubcentros) => {
        try {
            const {error:apiError, data } = await login(selectedRol);

            if(apiError || !data?.userData){throw new Error (apiError ? data : "Estrcutura de respuesta invalida"); }
            return {success: true, userData: data.userData};
        
        }catch (error) {
            return {success: false, error: "Error de conexion"};

        }
    }, []);
    return {
        roles, 
        rolesError, 
        centros, 
        centrosError, 
        subcentros, 
        subcentrosError,  
        fetchCentros, 
        fetchSubcentros, 
        fetchSubmit 
    };
};
export default loginData;
