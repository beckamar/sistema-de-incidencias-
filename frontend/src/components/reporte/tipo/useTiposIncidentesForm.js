import { useState } from 'react';
import useTiposIncidenteData from '../../../services/tiposIncidenteData.js';
import { useNavigate } from 'react-router-dom';

export const useTiposIncidentesForm = () =>{
    const { tiposIncidentes, fetchTiposIncidentes } = useTiposIncidenteData();
    const [selectedtipoIncidente, setSelectedTipoIncidente] = useState(null);
    const navigate = useNavigate();

    const handleTipoIncidenteChange = (e) => {
        setSelectedTipoIncidente(e.target.value);
        //fetchTiposIncidentes(tipoIncidenteId);
    };

    return {
        tiposIncidentes,
        selectedtipoIncidente,
        handleTipoIncidenteChange,
    }
};


