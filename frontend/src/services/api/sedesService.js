import axiosInstance from "../axiosInstance";


export async function getRoles() {
    try {
        const response = await axiosInstance.get("/v1/roles");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener roles"};
    }
}

export async function getCentrostrabajo(id_rol) {
    try {
        console.log("EL id de id_rol:", id_rol);
        const response = await axiosInstance.get(`/v1/sedes/${id_rol}/centros`);
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