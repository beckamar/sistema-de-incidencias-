import { getTiposAusenciaService, postReporteAusenciaService } from "../services/ausenciaPersonalModel.js";
import handleResponse from "../middlewares/responseHandler.js";
import admin from "../utils/firebaseUtils.js";



export const getTiposAusenciaPersonal = async(req, res) => {
    try {
        const tiposAusencias = await getTiposAusenciaService();
        handleResponse(res, 200, "Tipo de ausencias de personal obtenidos correctamente",tiposAusencias);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los tipos de ausencia", { error: error.message});
    }
};


export const postReporteAusencia = async(req, res) => {
    try {
        const {
            id_incidente,
            id_empleado,
            id_catalogoAusencias,
            descripcion, 
        } = req.body;

        const crearReporteAusencia = await postReporteAusenciaService(id_incidente, id_empleado, id_catalogoAusencias, descripcion);

        const message = {
            notification: {
                title: 'Nuevo reporte',
                body: `Ausencia de personal`,
            },
            topic: 'incidentes', 
        };
        await admin.messaging().send(message);

        handleResponse(res, 200, "Reporte por Ausencia creado", crearReporteAusencia);


    } catch (error){
        handleResponse(res, 500, "Error al crear reporte por ausencia", { error: error.message});
    }
};