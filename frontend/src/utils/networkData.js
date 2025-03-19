import axiosInstance from "./axiosInstance";


async function getRoles() {
    try {
        const response = await axiosInstance.get("/api/roles");
        return { error: false, data: response.data.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al obtener roles"};
    }
}

async function getCentrotrabajo() {
    try {
        const response = await axiosInstance.get("/api/sedeRout/centrotrabajo")
        return { error: false, data: response};
    } catch ( error ) {  
        return { error: true, data: error.response?.data?.msg || "Error al obtener centros de trabajo" };    }
}

async function getSubcentro() {
    try {
        const response = await axiosInstance.get("/api/sedeRout/subcentro")
        return { error: false, data: response.data };
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
        return { error: false, data: response.data };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al iniciar sesión" };    }
    
}

export {
    getRoles,
    getCentrotrabajo,
    getSubcentro,
};