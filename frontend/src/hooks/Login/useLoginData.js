import { useState, useEffect } from "react";
import { getCentrostrabajo, getRoles, getSubcentros, login } from "../../utils/networkData.js";        

const useLoginData = () => {
    const [roles, setRoles] = useState([]);
    const [centros, setCentros] = useState([]);
    const [subcentros, setSubcentros] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const loadRoles = async () => {
            const { error, data } = await getRoles();
            if (!error) setRoles(data);
        };
        loadRoles();
    }, []);

    const fetchCentros = async (rolId) => {
        setCentros([]); 
        setSubcentros([]); 
        const { error, data } = await getCentrostrabajo(rolId);
        if (!error) setCentros(data);
    };

    const fetchSubcentros = async (centroId) => {
        setSubcentros([]);
        const { error, data } = await getSubcentros(centroId);
        if (!error) setSubcentros(data);
    };

    const fetchSubmit = async (selectedRol) =>{
        try {
            const {error: apiError, data} = await login(selectedRol);
           
            console.log("Datos procesados:", {
                apiError,
                userData: data?.userData,
                rawData: data
            });

            if (apiError || !data?.userData) {
                setError(apiError ? data : "Estructura de respuesta inválida");
                return { success: false };
            }

            return {success: true, userData: data.userData};
        } catch (error) {
            setError("Error de conexion");
            return {success:false}; 
        }
    };


    return { roles, centros, subcentros, fetchCentros, fetchSubcentros, fetchSubmit };
};

export default useLoginData;