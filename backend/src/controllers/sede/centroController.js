import handleResponse from '../../middlewares/responseHandler.js';
import { getCentrosSubcentrosService, getIdCentroTrabajoService } from '../../services/sede/centroModel.js';


export const getIdCentroTrabajo = async(req, res) =>{
    try {
        const IdCentroTrabajo = await getIdCentroTrabajoService(req.params.id_rol);
        handleResponse(res, 200, "centros obtenidos por rol",IdCentroTrabajo);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los centros de trabajo por rol", { error: error.message});
    }
};

export const getCentrosSubcentros = async (req, res) => {
    try {
        const obtenerCentroSubcentros = await getCentrosSubcentrosService();
        handleResponse(res, 200, "Centros y subcentros relacionados obtenidos correctamente", obtenerCentroSubcentros);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los centros y subcentros", {error: error.message});
    }
};
