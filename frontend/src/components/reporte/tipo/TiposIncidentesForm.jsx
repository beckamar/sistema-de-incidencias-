import React from "react";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";
import Header from "../../Header";

const TiposIncidentesForm = ({opcionesIncidentes, handleTipoIncidenteChange, handleSubmitIniciarIncidente, handleBackLogin, error}) => {


    return(
        <div className="relative min-h-screen w-full flex flex-col">

            <Header onBack={handleBackLogin} showBackButton={true}/>

            <main className="flex-1 flex flex-col items-center px-8 sm:px-6 md:px-10 pt-10 sm:pt-16 md:pt-40 pb-8">
                
                <div className="relative flex flex-col items-center mb-10 sm:mb-8 md:mb-10">
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4">Bienvenido</h4>
                    <span className="font-normal text-xs text-gray-500 md:text-sm lg:text-base">Inicia el reporte de un incidente</span>
                </div>

                <form onSubmit={handleSubmitIniciarIncidente} className="w-full max-w-xs sm:max-w-sm md:max-w-md pt-12 sm:pt-10 md:pt-12 flex-1 flex flex-col">
                    <span className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">¿Qué reportas?</span>

                    <Dropdown
                        label="Selecciona el tipo de incidente" 
                        options={opcionesIncidentes} 
                        onChange={handleTipoIncidenteChange} 
                    />
                    <ErrorMessage error={error}/>
                    <div className="flex-1"></div>
                    <Button type="submit">
                        SIGUIENTE
                    </Button>
                    
                </form>

            </main>
            

        </div>

    );

};

export default TiposIncidentesForm;

