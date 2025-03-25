import { useState } from 'react';
import useLoginData from './useLoginData.js';


export const useLoginForm = () => {
    const { roles, centros, subcentros, fetchCentros, fetchSubcentros } = useLoginData();
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedCentro, setSelectedCentro] = useState(null);

    const handleRolChange = (e) => {
        const rolId = e.target.value;
        setSelectedRol(rolId);
        setSelectedCentro(null);
        if (rolId !== "1") {
            fetchCentros(rolId);
        }
    };

    const handleCentroChange = (e) => {
        const centroId = e.target.value;
        setSelectedCentro(centroId);
        fetchSubcentros(centroId);
    };


    const showCentros = selectedRol && selectedRol !== "1" && centros.length > 0;
    const showSubcentros = selectedCentro && subcentros.length > 0;

    return  {
        roles,
        centros,
        subcentros,
        showCentros,
        showSubcentros,
        handleRolChange,
        handleCentroChange
    };
};

