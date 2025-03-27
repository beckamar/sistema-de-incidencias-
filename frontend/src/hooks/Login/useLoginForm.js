import { useState } from 'react';
import useLoginData from './useLoginData.js';
import { useNavigate } from 'react-router-dom';


export const useLoginForm = () => {
    const { roles, centros, subcentros, fetchCentros, fetchSubcentros, fetchSubmit } = useLoginData();
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedCentro, setSelectedCentro] = useState(null);
    const [selectedSubcentro, setSelectedSubcentro] = useState(null);
    const navigate = useNavigate();



    const handleRolChange = (e) => {
        const rolId = e.target.value;
        setSelectedRol(rolId);
        setSelectedCentro(null);
        setSelectedSubcentro(null);
        if (rolId !== "1") {
            fetchCentros(rolId);
        }
    };

    const handleCentroChange = (e) => {
        const centroId = e.target.value;
        setSelectedCentro(centroId);
        fetchSubcentros(centroId);
    };

    const handleSubcentroChange = (e) => {
        setSelectedSubcentro(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { success, userData} = await fetchSubmit(selectedRol, selectedCentro, selectedSubcentro);
        if (!success || !userData?.permisos) {
            console.error("Fallo en login o permisos faltantes");
            return;
        }
    
        localStorage.setItem('userData', JSON.stringify(userData));

        if(userData.permisos.acceso_pantallas?.includes('admin')){
            navigate('/admin', { replace: true });
        }else{
            navigate('/reporte', { replace: true });
        }
    };


    const showCentros = selectedRol && selectedRol !== "1";
    const showSubcentros = selectedCentro && subcentros.length > 0;

    return  {
        roles,
        centros,
        subcentros,
        showCentros,
        showSubcentros,
        handleRolChange,
        handleCentroChange,
        handleSubcentroChange,
        handleSubmit,
    };
};

