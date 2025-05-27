import axiosInstance from "../axiosInstance";


export async function getRoles() {
    try {
        const response = await axiosInstance.get("/v1/roles");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener roles"};
    }
}

export async function getCentrostrabajoRol(id_rol) {
    try {
        const response = await axiosInstance.get(`/v1/sedes/${id_rol}/centros`);
        console.log("EL id de id_rol:",response.data.data );
        return { error: false, data: response.data.data};
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener centros de trabajo" };    }
}

export async function getSubcentros(id_centro) {
    try {
        const response = await axiosInstance.get(`/v1/sedes/${id_centro}/subcentros`);
        console.log("EL de id_centro: ", id_centro);
        return { error: false, data: response.data.data };
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener subcentros" };    }
}


export async function getCentros() {
    try {
        const response = await axiosInstance.get("v1/sedes/centros");
        return {error:false, data: response.data.data};
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener los centros relacionados" };       
    }
}