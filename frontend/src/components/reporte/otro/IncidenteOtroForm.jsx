import React from 'react'
import Header from '../../ui/Header'
import { InstructionText } from '../../ui/InstructionText';
import { Input } from '../../ui/Input';
import { InputText } from '../../ui/InputText';
import useSubmitSuccess from '../../../hooks/useSubmitSuccess';
import ErrorMessage from "../../ErrorMessage";
import Button from "../../ui/Button";


const IncidenteOtroForm = ({tipo, descripcion, handleTipoIncidente, handleDescripcion, handleSubmitIncidenteOtro, submitSuccess, error}) => {
  
  useSubmitSuccess(submitSuccess, "/login");

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Header label="Otro"/>
      <main className="flex-1 flex flex-col items-center px-8 sm:px-6 md:px-10 pt-4 sm:pt-6 md:pt-8 pb-8">
        <form className="w-full max-w-xs sm:max-w-sm md:max-w-md pt-12 sm:pt-10 md:pt-12 flex-1 flex flex-col" onSubmit={handleSubmitIncidenteOtro}>
          
          <InstructionText label="Tipo de incidencia"/>
          <Input value={tipo} onChange={handleTipoIncidente} className={"mb-4 sm:mb-6 md:mb-8 lg:mb-10"}/>

          <InstructionText label="Descripción || Observación" className={"mt-4 sm:mt-6 md:mt-8 lg:mt-10"}/>
          <InputText value={descripcion} onChange={handleDescripcion}/>

          <ErrorMessage error={error}/>
          <div className="flex-1"></div>
          <Button type="submit">
              ENVIAR
          </Button>

        </form>
      </main>
    </div>
  );
};
export default IncidenteOtroForm;