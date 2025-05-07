import React from 'react';
import VehiculoERForm from '../../components/views/reporte/vehiculoEH/VehiculoEHForm';
import { useVehiculoERForm } from '../../components/views/reporte/vehiculoEH/useVehiculoEH';

export const VehiculoEH = () => {
  const form = useVehiculoERForm();

  return (
    <VehiculoERForm {...form}/>
  );
};

export default VehiculoEH;
