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

async function login(rol, centrotrabajo, subcentro) {
    try {
        const response = await axiosInstance.post("/api/login", {
            rol,
            centrotrabajo,
            subcentro,
        });
        return { error: false, data: response.data, redirectTo: response.data.data.redirectTo };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al iniciar sesión" };    }
    
}

export {
    getRoles,
    getCentrostrabajo,
    getSubcentros,
    login
};