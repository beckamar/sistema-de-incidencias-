import axiosInstance from "../axiosInstance";



export async function postOtroTipoIncidente(id_incidente, tipo, descripcion){
    try {
        const response = await axiosInstance.post("/api/v1/otrotipo", {
            id_incidente,
            tipo,
            descripcion
        });
        console.log("Respuesta backend otrotpoincidente: ", response);
        return { error: false, data: response.data.data };                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al crear el reporte otroTipo"};                  
    }
}