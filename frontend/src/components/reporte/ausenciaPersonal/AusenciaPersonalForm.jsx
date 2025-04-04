import React from "react";
import Header from "../../Header";
import Dropdown from "../../Dropdown";
import Button from "../../Button";
import ErrorMessage from "../../ErrorMessage";
import { InstructionText } from "../../InstructionText";
import { Input } from "../../Input";
import { InputText } from "../../InputText";


const AusenciaPersonalForm = ({opcionesAusencias, handleTipoAusenciasChange, tiposAusenciasError, descripcion, handleDescripcion, clave, handleClaveChange, nombreCompleto, handleEmpleadoChange, handleSubmitReporteAusencia, isSubmitting, error}) => {

    return (
        <div className="relative min-h-screen w-full flex flex-col">
            <Header label="Ausencia de personal" showBackButton={false}/>
            
            <main className="flex-1 flex flex-col items-center px-8 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8 pb-8">

                <form className="w-full max-w-xs sm:max-w-sm md:max-w-md pt-12 sm:pt-10 md:pt-12 flex-1 flex flex-col" onSubmit={handleSubmitReporteAusencia}>
                    
                    <InstructionText label="Nombre completo"/>
                    <Input value={nombreCompleto} onChange={handleEmpleadoChange} placeholder="Ejemplo: Ana Maria Perez Garcia" className={"mb-4 sm:mb-6 md:mb-8 lg:mb-10"} />

                    <InstructionText label="RPE || RTT"/>
                    <Input value={clave} onChange={handleClaveChange} className={"mb-4 sm:mb-6 md:mb-8 lg:mb-10"}/>

                    <InstructionText label="Tipo de ausencia"/>
                    <Dropdown
                        label="Selecciona el tipo de ausencia" 
                        options={opcionesAusencias} 
                        onChange={handleTipoAusenciasChange} 
                    />
                    <InstructionText label="Descripción || Observación" className={"mt-4 sm:mt-6 md:mt-8 lg:mt-10"}/>
                    <InputText value={descripcion} onChange={handleDescripcion}/>

                    <ErrorMessage error={tiposAusenciasError}/>
                    <div className="flex-1"></div>
                    <Button type="submit">
                        ENVIAR
                    </Button>
                </form>
            </main>
        </div>
    );
};
export default AusenciaPersonalForm;