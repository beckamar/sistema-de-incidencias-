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
        setSelectedTipoIncidente(e.target.value);
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
            const response = await fetchIniciarReporte(selectedtipoIncidente,id_centrotrabajo, id_subcentro);
                        
            const routes = {
                1: '/ausenciapersonal',
                2: '/equipotrabajo',
                3: '/otro'
            };

            console.log("Ide incidente desde useTiposINcidentesFOrm: ", response.data.id_incidente);

            
            if(routes[selectedtipoIncidente]){
                navigate(routes[selectedtipoIncidente], {
                    replace: true,
                    state: {
                        id_incidente: response.id_incidente
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


