import vehiculoEHData from '../../../hooks/reporte/vehiculoEHData';
import { useState } from 'react';
import { useLocation} from 'react-router-dom';


export const useVehiculoERForm = () => {
    const {categoriasVehiculoEH, categoriasVehiculoEHError,  fetchReporteVehiculoEH} = vehiculoEHData();
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [descripcion, setDescripcion] = useState("");
    const [clave, setClaveChange] = useState("");
    const location = useLocation();

    const { id_incidente } = location.state;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState(null);

    const categorias = categoriasVehiculoEH.map(item => ({
        id: item.id,
        nombre: item.nombre
    }));

    const handleCategoriasChange = (e) => {
        setSelectedCategoria(e.target.value);
        setError(null);
    };

    const handleDescripcion = (e) => {
        setDescripcion(e.target.value);
        setError(null);
    };

    const handleClaveChange = (e) =>{
        setClaveChange(e.target.value);
        setError(null);
    }


    const handleSubmitReporteVehiculoEH = async(e) => {
        e.preventDefault();
        setError(null);

        if (!clave || !descripcion || !selectedCategoria) {
            setError("Campos obligatorios vacios");
            return;
        }    

        try {
            setIsSubmitting(true);            

            const {success: reporteSuccess, error: reporteError } = await fetchReporteVehiculoEH(id_incidente, selectedCategoria, clave, descripcion);
            console.log('Respuesta de reporte ReporteVehiculoEH:', { reporteSuccess, reporteError });
            if (!reporteSuccess) throw new Error(reporteError);
            
            setSubmitSuccess(true);

        } catch (error) {
            setError(error.message);             
        }finally {
            setIsSubmitting(false);
        }
        
    };


  
    return{
        categoriasVehiculoEH,
        categoriasVehiculoEHError,

        selectedCategoria,
        categorias,
        handleCategoriasChange,

        descripcion,
        handleDescripcion,

        clave,
        handleClaveChange,

        handleSubmitReporteVehiculoEH,
        isSubmitting,
        submitSuccess,
        error
    };
}
