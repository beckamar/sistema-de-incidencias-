import handleResponse from '../../middlewares/responseHandler.js';
import { getIdCentroTrabajoService } from '../../models/sede/centroModel.js';


export const getIdCentroTrabajo = async(req, res) =>{
    try {
        const IdCentroTrabajo = await getIdCentroTrabajoService(req.params.id_rol);
        handleResponse(res, 200, "centros obtenidos por rol",IdCentroTrabajo);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los centros de trabajo por rol", { error: error.message});
    }
};
