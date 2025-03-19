
import {useState, useEffect} from "react";
import useFetchData from "./useFetchData";
import { getRoles,getCentrotrabajo, getSubcentro } from "../utils/networkData";

const loginFetchData = () => {
    const { data: [roles, centrosTrabajo, subcentros], loading, error } = useFetchData([
        getRoles, 
        getCentrotrabajo, 
        getSubcentro
    ]);
    

    const [selectedRolId, setSelectedIdRol] = useState(null);
    const [selectedIdCentro, setSelectedIdCentro] = useState(null);
    const [selectedIdSubcentro, setSelectedIdSubcentro] = useState(null);

    return {
        roles,
        centrosTrabajo, 
        subcentros,
        loading,
        error,
        selectedRolId,
        setSelectedIdRol,
        selectedIdCentro,
        setSelectedIdCentro,
        selectedIdSubcentro,
        setSelectedIdSubcentro

    };
    
};
export default loginFetchData;