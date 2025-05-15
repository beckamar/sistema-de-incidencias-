import React from "react";
import Dropdown from "../../../components/ui/Dropdown";
import Header from '../../../components/ui/Header';
import Button from "../../../components/ui/Button";
import { InstructionText } from '../../../components/ui/InstructionText';
import { Input } from '../../../components/ui/Input';
import { InputText } from '../../../components/ui/InputText';

import useSubmitSuccess from '../../../hooks/useSubmitSuccess';
import ErrorMessage from "../../../components/ErrorMessage";


const VehiculoERForm = ({categorias, handleCategoriasChange, submitSuccess, descripcion, handleDescripcion, clave, handleClaveChange, handleSubmitReporteVehiculoEH, error}) => {

    useSubmitSuccess(submitSuccess, "/login");
    
    return (
        <div className="relative min-h-screen w-full flex flex-col">
            <Header label="Vehículo o Equipo Hidráulico" showBackButton={false}/>
            
            <main className="flex flex-col items-center px-8 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-7 pb-8 overflow-y-auto">

                <form className="w-full max-w-xs sm:max-w-sm md:max-w-md pt-10 pb-6 flex flex-col" onSubmit={handleSubmitReporteVehiculoEH}>
                    
                    <InstructionText label="Categoría"/>
                    <Dropdown
                        label="Selecciona el tipo de incidente" 
                        options={categorias} 
                        onChange={handleCategoriasChange} 
                    />

                    <InstructionText label="Económico"  className={"mt-4"}/>
                    <Input value={clave} onChange={handleClaveChange} className={"mb-4 sm:mb-6 md:mb-8 lg:mb-10"}/>

                    <InstructionText label="Descripción || Observación" className={"mt-4 sm:mt-6 md:mt-8 lg:mt-10"}/>
                    <InputText value={descripcion} onChange={handleDescripcion}/>

                    <ErrorMessage error={error}/>
                    <div className="mb-4"></div>
                    <Button type="submit">
                        ENVIAR
                    </Button>
                </form>
            </main>
        </div>
    );
};

export default VehiculoERForm;