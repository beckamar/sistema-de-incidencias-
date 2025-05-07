import axiosInstance from "../axiosInstance";

export async function getCategoriasVehiculoEH () {
    try {
        const response = await axiosInstance.get("/v1/vehiculoer/categorias");
        return { error: false, data: response.data.data };                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de ausencias de personal"};        
    }
};

export async function postReporteVehiculoEH(id_incidente, id_categoria, clave, descripcion){
    try {
        const response = await axiosInstance.post("/v1/vehiculoer", {
            id_incidente,
            id_categoria,
            clave,
            descripcion
        });
        console.log("Respuesta del backend reporteVehiculoEH:", response.data.data);
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al crear el reporte por VehiculoEH"};          
    }
}