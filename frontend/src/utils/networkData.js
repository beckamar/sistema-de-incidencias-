import axios from "axios";
import axiosInstance from "./axiosInstance";


async function getRoles() {
    try {
        const response = await axiosInstance.get("/api/v1/roles");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener roles"};
    }
}

async function getCentrostrabajo(id_rol) {
    try {
        console.log("EL id de id_rol:", id_rol);
        const response = await axiosInstance.get(`/api/v1/sedes/${id_rol}/centros`);
        return { error: false, data: response.data.data};
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener centros de trabajo" };    }
}

async function getSubcentros(id_centro) {
    try {
        const response = await axiosInstance.get(`/api/v1/sedes/${id_centro}/subcentros`);
        console.log("EL de id_centro: ", id_centro);
        return { error: false, data: response.data.data };
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener subcentros" };    }
}

async function login(id_rol) {
    try {
        const response = await axiosInstance.post("/api/v1/login", {id_rol});
        return {
            error: false,
            data: response.data.data
        };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al iniciar sesión" };    
    }  
}

async function getTiposIncidentes(){
    try {
        const response = await axiosInstance.get("/api/v1/incidentes/tipos");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de incidentes"};        
    }
}

async function iniciarReporte(id_catincidentes,id_centrotrabajo, id_subcentro){
    try {
        const response = await axiosInstance.post("/api/v1/incidentes",{
            id_catincidentes,
            id_centrotrabajo,
            id_subcentro
        });
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al iniciar la creacion de un reporte"};          
    }
};

async function postempleado(nombre_completo, clave){
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

async function getTiposAusenciaPersonal() {
    try {
        const response = await axiosInstance.get("/api/v1/ausenciapersonal/tipos");
        return { error: false, data: response.data.data };                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de ausencias de personal"};        
    }
};

async function postReporteAusencia(id_incidente, id_empleado, id_catalogoAusencias, descripcion){
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

async function postOtroTipoIncidente(id_incidente, tipo, descripcion){
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

export {
    getRoles,
    getCentrostrabajo,
    getSubcentros,
    login,
    getTiposIncidentes,
    postempleado,
    getTiposAusenciaPersonal,
    iniciarReporte,
    postReporteAusencia,
    postOtroTipoIncidente
};