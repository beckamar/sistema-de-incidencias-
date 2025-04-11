import React from 'react'
import AusenciaPersonalForm from '../../components/reporte/ausenciaPersonal/AusenciaPersonalForm';
import { useAusenciaPersonalForm } from '../../components/reporte/ausenciaPersonal/useAusenciaPersonalForm';

export const AusenciaPersonal = () => {
  const form = useAusenciaPersonalForm();
  return (

      <AusenciaPersonalForm {...form}/>
   
  );
};

export default AusenciaPersonal;
