import { useState } from 'react';
import loginData from '../../../hooks/auth/loginData';
import { useNavigate } from 'react-router-dom';


export const useLoginForm = () => {
    const { roles, centros, subcentros, fetchCentros, fetchSubcentros, fetchSubmit } = loginData();
    const [selectedRol, setSelectedRol] = useState(null);
    const [selectedCentro, setSelectedCentro] = useState(null);
    const [selectedSubcentro, setSelectedSubcentro] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();



    const handleRolChange = (e) => {
        const rolId = e.target.value;
        setSelectedRol(rolId);
        setSelectedCentro(null);
        setSelectedSubcentro(null);
        setError(null);
        if (rolId !== "1") {
            fetchCentros(rolId);
        }
    };

    const handleCentroChange = (e) => {
        const centroId = e.target.value;
        setSelectedCentro(centroId);
        setError(null);
        fetchSubcentros(centroId);
    };

    const handleSubcentroChange = (e) => {
        setSelectedSubcentro(e.target.value);
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selectedRol) {
            setError("Selecciona un Rol");
            return;
        }


        try {            

            const { success, userData} = await fetchSubmit(selectedRol, selectedCentro, selectedSubcentro);
            if (!success) {
                throw new Error("Error al enviar datos");
            }
            const requiereCentro = (userData.permisos.acceso_pantallas.includes('admin') && userData.permisos.ver_reportes.includes('asignados') )|| 
                                    userData.permisos.ver_reportes.includes('ninguno');
    
            if(requiereCentro && !selectedCentro){
                throw new Error("Campos incompletos");   
            }
            if(userData.permisos.acceso_pantallas.includes('admin') ){
                navigate('/admin', { replace: true, state:{selectedRol, selectedCentro, selectedSubcentro}});  
            }else{
                navigate('/tipoincidente', { replace: true, state:{id_centrotrabajo: selectedCentro,  id_subcentro: selectedSubcentro} });
            }


        } catch (err) {
            setError(err.message);
            
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
        error
    };
};

