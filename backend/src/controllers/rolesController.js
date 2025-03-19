import { getRolService } from "../models/RolModel.js";
import handleResponse from "../middlewares/responseHandler.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await getRolService();
        handleResponse(res, 200, "roles obtenidos", roles);   
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los roles", { error: error.message});
    }
};