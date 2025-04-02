import axiosInstance from "./axiosInstance";


async function getRoles() {
    try {
        const response = await axiosInstance.get("/api/roles");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener roles"};
    }
}

async function getCentrostrabajo(id_rol) {
    try {
        console.log("EL id de id_rol:", id_rol);
        const response = await axiosInstance.get(`/api/${id_rol}/centros`);
        return { error: false, data: response.data.data};
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener centros de trabajo" };    }
}

async function getSubcentros(id_centro) {
    try {
        const response = await axiosInstance.get(`/api/centros/${id_centro}/subcentro`);
        console.log("EL de id_centro: ", id_centro);
        return { error: false, data: response.data.data };
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener subcentros" };    }
}

async function login(idRol) {
    try {
        const response = await axiosInstance.post("/api/login", {id_rol: idRol});

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
        const response = await axiosInstance.get("/api/incidente/tipos");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de incidentes"};        
    }
}

async function iniciarReporte(){

}

async function postReporteAusencia(idTipoIncidente){}

async function postEmpleado(nombre_completo, clave){
    try {
        const response = await axiosInstance.post("/api/empleado/crear", {
            nombre_completo,
            clave
        });
        return { error: false, data: response.data.data };        
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al crear empleado"};        
    }
};

async function getTiposAusenciaPersonal() {
    try {
        const response = await axiosInstance.get("/api/ausencia/tipos");
        return { error: false, data: response.data.data };                
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los tipos de ausencias de personal"};        
    }
};

export {
    getRoles,
    getCentrostrabajo,
    getSubcentros,
    login,
    getTiposIncidentes,
    postEmpleado,
    getTiposAusenciaPersonal
};