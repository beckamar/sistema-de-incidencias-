import React from 'react'
import AusenciaPersonalForm from '../../components/views/reporte/ausenciaPersonal/AusenciaPersonalForm';
import { useAusenciaPersonalForm } from '../../components/views/reporte/ausenciaPersonal/useAusenciaPersonalForm';

export const AusenciaPersonal = () => {
  const form = useAusenciaPersonalForm();
  return (

      <AusenciaPersonalForm {...form}/>
   
  );
};

export default AusenciaPersonal;
