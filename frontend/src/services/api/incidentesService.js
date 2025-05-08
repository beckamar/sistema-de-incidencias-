import axiosInstance from "../axiosInstance";

export async function getIncidentes(){
    try {
        const response = await axiosInstance.get("/v1/incidentes");
        return { error: false, data: response.data.data };                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener la lista de incidentes"};        
    }
}

export async function putStatusIncidente(id_incidente, estado){
    try {
        const response = await axiosInstance.put(`/v1/incidentes/${id_incidente}`,{
            estado: estado
        });
        return {error: false, data: response.data.data};
    } catch (error) {
        return { error: true,  data: error.response?.data?.msg || "Error al actualizar el estado del incidente"};
        
    }
}


export async function getTiposIncidentes(){
    try {
        const response = await axiosInstance.get("/v1/incidentes/tipos");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de incidentes"};        
    }
}

export async function iniciarReporte(id_catincidentes,id_centrotrabajo, id_subcentro){
    try {
        const response = await axiosInstance.post("/v1/incidentes",{
            id_catincidentes,
            id_centrotrabajo,
            id_subcentro
        });
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al iniciar la creacion de un reporte"};          
    }
};





