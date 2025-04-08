import React from 'react'
import IncidenteOtroForm from "../../components/reporte/otro/IncidenteOtroForm.jsx";
import {useIncidenteOtroForm} from "../../components/reporte/otro/useIncidenteOtroForm.js";


export const Otro = () => {
  const form = useIncidenteOtroForm();
  return (
    <div>
      <IncidenteOtroForm {...form}/>
    </div>
  );
};


export default Otro;