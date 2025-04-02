import React from 'react'
import ausenciaPersonalData from '../../../services/ausenciaPersonalData';
import { useState } from 'react';

export const useAusenciaPersonalForm = () => {
    const { tiposAusencias, tiposAusenciasError, postEmpleado, empleadoError} = ausenciaPersonalData();
    const [selectedTipoAusencia, setSelectedTipoAusencia] = useState(null);
    const [useDescripcion, setDescripcion] = useState("");
    const [useClaveChange, setClaveChange] = useState("");
    const [empleadoData, setEmpleadoData] = useState({
        nombre_completo: '',
        clave:''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState(null);

    const opcionesAusencias = tiposAusencias.map(item => ({
        id: item.id_ausencia,
        nombre: item.tipo
    }));

    const handleTipoAusenciasChange = (e) => {
        setSelectedTipoAusencia(Number(e.target.value));
        setError(null);
    };

    const handleEmpleadoChange = (e) => {
        const {name, value} = e.target.value;
        setEmpleadoData(prev=>({
            ...prev,
            [name]: value
        }));
    };

    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const handleClaveChange = (e) =>{
        const valor = e.target.value;
        setClaveChange(valor.toUpperCase());
    }


  


    return{
        tiposAusencias,
        tiposAusenciasError,
        selectedTipoAusencia,
        opcionesAusencias,
        handleTipoAusenciasChange,

        handleEmpleadoChange,
        empleadoData,

        useDescripcion,
        handleDescripcion,

        useClaveChange,
        handleClaveChange
    };
}
