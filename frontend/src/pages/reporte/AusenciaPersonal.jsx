import React from 'react'
import AusenciaPersonalForm from '../../views/reporte/ausenciaPersonal/AusenciaPersonalForm';
import { useAusenciaPersonalForm } from '../../views/reporte/ausenciaPersonal/useAusenciaPersonalForm';

export const AusenciaPersonal = () => {
  const form = useAusenciaPersonalForm();
  return (

      <AusenciaPersonalForm {...form}/>
   
  );
};

export default AusenciaPersonal;
