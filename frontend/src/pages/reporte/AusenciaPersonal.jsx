import React from 'react'
import AusenciaPersonalForm from '../../components/reporte/ausenciaPersonal/AusenciaPersonalForm';
import { useAusenciaPersonalForm } from '../../components/reporte/ausenciaPersonal/useAusenciaPersonalForm';

export const AusenciaPersonal = () => {
  const form = useAusenciaPersonalForm();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <AusenciaPersonalForm {...form}/>
    </div>
  );
};

export default AusenciaPersonal;
