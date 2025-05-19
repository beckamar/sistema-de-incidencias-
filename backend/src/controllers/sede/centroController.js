import handleResponse from '../../middlewares/responseHandler.js';
import { getCentrosTrabajoService, getIdCentroTrabajoRolService } from '../../services/sede/centroModel.js';


export const getIdCentroTrabajoRol = async(req, res) =>{
    try {
        const IdCentroTrabajo = await getIdCentroTrabajoRolService(req.params.id_rol);
        handleResponse(res, 200, "centros obtenidos por rol",IdCentroTrabajo);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los centros de trabajo por rol", { error: error.message});
    }
};

export const getCentrosTrabajo = async (req, res) => {
    try {
        const obtenerCentros = await getCentrosTrabajoService();
        handleResponse(res, 200, "Centros obtenidos correctamente", obtenerCentros);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los centros", {error: error.message});
    }
};
