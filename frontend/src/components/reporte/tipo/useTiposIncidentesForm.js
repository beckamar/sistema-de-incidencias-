import { useState } from 'react';
import useTiposIncidenteData from '../../../services/tiposIncidenteData';
import { useLocation, useNavigate } from 'react-router-dom';

export const useTiposIncidentesForm = () =>{
    const { tiposIncidentes, fetchIniciarReporte } = useTiposIncidenteData();
    const [selectedtipoIncidente, setSelectedTipoIncidente] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    const { id_centrotrabajo, id_subcentro } = location.state || {};


    const opcionesIncidentes = tiposIncidentes.map(item => ({
        id: item.id_catincidentes,
        nombre: item.tipo
    }));


    const handleTipoIncidenteChange = (e) =>{
        setSelectedTipoIncidente(Number(e.target.value));
        setError(null);
    };

    const handleBackLogin = () => {
        navigate("/login")
    };


    const handleSubmitIniciarIncidente = async(e) => {
        e.preventDefault();

        if (!selectedtipoIncidente) {
            setError("Selecciona una opción");
            return;
        }

        try {            
            const {success, error: apiError} = await fetchIniciarReporte(selectedtipoIncidente,id_centrotrabajo, id_subcentro);
            
            if (!success) throw new Error(apiError || "Error al crear reporte");
            
            const routes = {
                1: '/ausenciapersonal',
                2: '/equipotrabajo',
                3: '/otro'
            };
            
            if(routes[selectedtipoIncidente]){
                navigate(routes[selectedtipoIncidente], {
                    replace: true,
                    state: {
                        selectedtipoIncidente,
                        id_centrotrabajo,
                        id_subcentro
                    }
                
                });
            }      
        } catch (err) {
            setError(err.message); 
        }
    };


    return {
        tiposIncidentes,
        selectedtipoIncidente,
        opcionesIncidentes,
        handleSubmitIniciarIncidente,
        handleTipoIncidenteChange,
        handleBackLogin,
        error
    }
};


