import axiosInstance from '../axiosInstance';



export async function postempleado(nombre_completo, clave){
    try {
        const response = await axiosInstance.post("/api/v1/empleados", {
            nombre_completo,
            clave
        });
        console.log("Respuesta del backend: ", response.data.data);
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al crear empleado"};        
    }
};

export async function getTiposAusenciaPersonal() {
    try {
        const response = await axiosInstance.get("/api/v1/ausenciapersonal/tipos");
        return { error: false, data: response.data.data };                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de ausencias de personal"};        
    }
};

export async function postReporteAusencia(id_incidente, id_empleado, id_catalogoAusencias, descripcion){
    try {
        const response = await axiosInstance.post("/api/v1/ausenciapersonal", {
            id_incidente,
            id_empleado,
            id_catalogoAusencias,
            descripcion
        });
        console.log("Respuesta del backend reporteAUsencia:", response.data.data);
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al crear el reporte por ausencia"};          
    }
}