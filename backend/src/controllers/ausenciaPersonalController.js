import { getTiposAusenciaService } from "../models/ausenciaPersonalModel.js";
import handleResponse from "../middlewares/responseHandler.js";

export const getTiposAusenciaPersonal = async(req, res) => {
    try {
        const tiposAusencias = await getTiposAusenciaService();
        handleResponse(res, 200, "Tipo de ausencias de personal obtenidos correctamente",tiposAusencias);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los tipos de ausencia", { error: error.message});
    }
};
