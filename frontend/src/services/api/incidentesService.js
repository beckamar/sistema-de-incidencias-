import { data } from "react-router-dom";
import axiosInstance from "../axiosInstance";

export async function getIncidentes({ id_estado, id_centrotrabajo, id_subcentro } = {}){
    try {
        const params = {};
        if (id_estado !== undefined && id_estado !== null) params.id_estado = id_estado;
        if (id_centrotrabajo) params.id_centrotrabajo = id_centrotrabajo;
        if (id_subcentro) params.id_subcentro = id_subcentro;

        const response = await axiosInstance.get("/v1/incidentes", { params });
        return { error: false, data: response.data.data};                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener la lista de incidentes"};        
    }
}   

export async function putStatusIncidente(id_incidente, id_estado){
    try {
        const response = await axiosInstance.put(`/v1/incidentes/${id_incidente}`,{
            id_estado
        });
        return {error: false, data: response.data.data};
    } catch (error) {
        return { error: true,  data: error.response?.data?.msg || "Error al actualizar el estado del incidente"};
        
    }
}

export async function getStatus(){
    try {
        const response = await axiosInstance.get('/v1/incidentes/status');
        console.log("status obtenidos en api: ", response.data.data)
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener el catalogo de status"};                
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





