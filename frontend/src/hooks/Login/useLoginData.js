import { useState, useEffect } from "react";
import { getCentrostrabajo, getRoles, getSubcentros } from "../../utils/networkData.js";        

const useLoginData = () => {
    const [roles, setRoles] = useState([]);
    const [centros, setCentros] = useState([]);
    const [subcentros, setSubcentros] = useState([]);

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


    return { roles, centros, subcentros, fetchCentros, fetchSubcentros };
};

export default useLoginData;