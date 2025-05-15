import React from 'react'
import IncidenteOtroForm from "../../views/reporte/otro/IncidenteOtroForm.jsx";
import {useIncidenteOtroForm} from "../../views/reporte/otro/useIncidenteOtroForm.js";


export const Otro = () => {
  const form = useIncidenteOtroForm();
  return (
    <div>
      <IncidenteOtroForm {...form}/>
    </div>
  );
};


export default Otro;