import { getCentroTrabajoService, getSubcentroService } from '../models/SedeModel.js';
import handleResponse from '../utils/responseHandler.js';



export const getCentroTrabajo = async(req, res) =>{
    try {
        const centrosTrabajo = await getCentroTrabajoService();
        handleResponse(res, 200, "centros obtenidos",centrosTrabajo);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los centros de trabajo", { error: error.message});
    }
};

export const getSubcentro = async(req, res) =>{
    try {
        const subcentro = await getSubcentroService();
        handleResponse(res, 200, "centros obtenidos",subcentro);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los subcentros de trabajo", { error: error.message});
    }
};


