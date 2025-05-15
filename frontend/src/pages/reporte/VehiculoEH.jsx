import React from 'react';
import VehiculoERForm from '../../views/reporte/vehiculoEH/VehiculoEHForm';
import { useVehiculoERForm } from '../../views/reporte/vehiculoEH/useVehiculoEHForm';

export const VehiculoEH = () => {
  const form = useVehiculoERForm();

  return (
    <VehiculoERForm {...form}/>
  );
};

export default VehiculoEH;
