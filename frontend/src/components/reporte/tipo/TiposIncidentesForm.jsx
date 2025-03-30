import React from "react";
import Dropdown from "../../Dropdown";

const TiposIncidentesForm = ({opcionesIncidentes, handleTipoIncidenteChange, handleSubmitIncidente, error}) => {


    return(
        <div>
            <h4 className="text-2xl font-semibold mb-4">Que reportas?</h4>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitIncidente(); }} className="flex flex-col gap-3">
                <Dropdown
                    label="Selecciona el tipo de incidente" 
                    options={opcionesIncidentes} 
                    onChange={handleTipoIncidenteChange} 
                />
                {error && (
                <div className="mb-2 text-xs text-red-400">
                    {error}
                </div>
                )}
                <button type="submit" className="btn-primary w-full mt-5 h-7 text-xs font-semibold flex items-center justify-center active:bg-green-400 transition-colors duration-200">
                    SIGUIENTE
                </button>
            </form>
        </div>
    );

};

export default TiposIncidentesForm;

