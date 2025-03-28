import React from "react";
import Dropdown from "../../Dropdown";

const TiposIncidentesForm = ({tiposIncidentes, handleTipoIncidenteChange}) => {
    const options = tiposIncidentes.map(item => ({
        id: item.id_catincidentes,
        nombre: item.tipo
    }));

    return(
        <div>
            <h4 className="text-2xl font-semibold mb-4">Que reportas?</h4>
            <div>
                <Dropdown
                    label="Selecciona el tipo de incidente" 
                    options={options} 
                    onChange={handleTipoIncidenteChange} 
                />
            </div>
        </div>
    );

};

export default TiposIncidentesForm;

