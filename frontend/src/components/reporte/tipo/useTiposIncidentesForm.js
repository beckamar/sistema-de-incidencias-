import { useState } from 'react';
import useTiposIncidenteData from '../../../services/tiposIncidenteData';
import { useNavigate } from 'react-router-dom';

export const useTiposIncidentesForm = () =>{
    const { tiposIncidentes } = useTiposIncidenteData();
    const [selectedtipoIncidente, setSelectedTipoIncidente] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


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


    const handleSubmitIncidente = () => {
        try {
            if(!selectedtipoIncidente) throw new Error("Selecciona una opción");
        
            const routes = {
                1: '/ausenciapersonal',
                2: '/equipotrabajo',
                3: '/otro'
            };
            if(routes[selectedtipoIncidente]){
                navigate(routes[selectedtipoIncidente], {replace: true});
            }      
        } catch (err) {
            setError(err.message); 
        }
    };


    return {
        tiposIncidentes,
        selectedtipoIncidente,
        opcionesIncidentes,
        handleSubmitIncidente,
        handleTipoIncidenteChange,
        handleBackLogin,
        error
    }
};


