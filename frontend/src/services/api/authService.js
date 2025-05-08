import axiosInstance from "../axiosInstance";

export async function login(id_rol) {
    try {
        const response = await axiosInstance.post("/v1/login", {id_rol});
        return {
            error: false,
            data: response.data.data
        };
    } catch (error) {
        return { error: true, data: error.response?.data?.msg || "Error al iniciar sesión" };    
    }  
}