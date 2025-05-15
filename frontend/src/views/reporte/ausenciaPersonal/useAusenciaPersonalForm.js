import ausenciaPersonalData from '../../../hooks/reporte/ausenciaPersonalData';
import { useState } from 'react';
import { useLocation} from 'react-router-dom';


export const useAusenciaPersonalForm = () => {
    const { tiposAusencias, tiposAusenciasError, postEmpleado, fetchReporteAusencia, consultarRPEempleado} = ausenciaPersonalData();
    const [selectedTipoAusencia, setSelectedTipoAusencia] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [clave, setClaveChange] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const location = useLocation();


    const { id_incidente } = location.state;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState(null);

    const opcionesAusencias = tiposAusencias.map(item => ({
        id: item.id_ausencia,
        nombre: item.tipo
    }));

    const handleTipoAusenciasChange = (e) => {
        setSelectedTipoAusencia(e.target.value);
        setError(null);
    };

    const handleEmpleadoChange = (e) => {
        setNombreCompleto(e.target.value);
        setError(null);
    };

    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const handleClaveChange = (e) =>{
        const valor = e.target.value;
        setClaveChange(valor.toUpperCase());
        setError(null);
    }



    const handleSubmitReporteAusencia = async(e) => {
        e.preventDefault();
        setError(null);

        if (!nombreCompleto || !selectedTipoAusencia) {
            setError("Campos obligatorios vacios");
            return;
        }    

        try {
            setIsSubmitting(true);            

            const {success: empleadoSuccess, empleado, error: empleadoError} = await postEmpleado(nombreCompleto, clave);
            if (!empleadoSuccess) throw new Error(empleadoError);

            const {success: reporteSuccess  , error: reporteError } = await fetchReporteAusencia(id_incidente, empleado.id_empleado, selectedTipoAusencia, descripcion);
            console.log('Respuesta de reporte:', { reporteSuccess, reporteError });
            if (!reporteSuccess) throw new Error(reporteError);
            
            setSubmitSuccess(true);

        } catch (error) {
            setError(error.message);             
        }finally {
            setIsSubmitting(false);
        }
        
    };


  
    return{
        tiposAusencias,
        tiposAusenciasError,
        selectedTipoAusencia,
        opcionesAusencias,
        handleTipoAusenciasChange,

        descripcion,
        handleDescripcion,

        clave,
        handleClaveChange,

        nombreCompleto,
        handleEmpleadoChange,

        handleSubmitReporteAusencia,
        isSubmitting,
        submitSuccess,
        error
    };
}
