import { postOtroTipoIncidenteService } from "../services/otroTipoIncidenteModel.js";
import handleResponse from "../middlewares/responseHandler.js";
import admin from "../utils/firebaseUtils.js";

export const postOtroTpoIncidente = async(req, res) => {
    try {
        const {id_incidente, tipo, descripcion} = req.body;
        const crearReporteOtroTipo = await postOtroTipoIncidenteService(id_incidente, tipo, descripcion);

        const message = {
            notification: {
                title: 'Nuevo reporte',
                body: `${tipo}`,
            },
            topic: 'incidentes', 
        };
        await admin.messaging().send(message);

        handleResponse(res, 200, "Reporte por Ausencia creado", crearReporteOtroTipo);
    } catch (error) {
        handleResponse(res, 500, "Error al crear reporte por ausencia", { error: error.message});
    }
}