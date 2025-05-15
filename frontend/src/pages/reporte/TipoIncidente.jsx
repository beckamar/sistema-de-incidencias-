import React from "react";
import { useTiposIncidentesForm } from "../../views/reporte/tipo/useTiposIncidentesForm.js";
import TiposIncidentesForm from "../../views/reporte/tipo/TiposIncidentesForm.jsx";


const TipoIncidente = () => {
    const form = useTiposIncidentesForm();

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <TiposIncidentesForm {...form} />
        </div>
    );
};

export default TipoIncidente;