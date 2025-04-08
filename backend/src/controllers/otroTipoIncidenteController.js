import { postOtroTipoIncidenteService } from "../services/otroTipoIncidenteModel.js";
import handleResponse from "../middlewares/responseHandler.js";

export const postOtroTpoIncidente = async(req, res) => {
    try {
        const {id_incidente, tipo, descripcion} = req.body;
        const crearReporteOtroTipo = await postOtroTipoIncidenteService(id_incidente, tipo, descripcion);
        handleResponse(res, 200, "Reporte por Ausencia creado", crearReporteOtroTipo);
    } catch (error) {
        handleResponse(res, 500, "Error al crear reporte por ausencia", { error: error.message});
    }
}