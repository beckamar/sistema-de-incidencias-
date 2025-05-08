import { getCategoriasVehiculoEHService, postReporteVehiculoEHService } from "../services/vehiculoEHModel.js";
import handleResponse from "../middlewares/responseHandler.js";
import admin from "../utils/firebaseUtils.js";



export const getCategoriasVehiculoEH = async(req, res) => {
    try {
        const categoriasVehiculoEH = await getCategoriasVehiculoEHService();
        handleResponse(res, 200, "Categorías en incidente por vehiculo o EH obtenidos correctamente",categoriasVehiculoEH);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener categorías en incidente por vehiculo o EH", { error: error.message});
    }
};


export const postReporteVehiculoEH = async (req, res) => {
    try {
        const {
            id_incidente,
            id_categoria, 
            clave, 
            descripcion
        } = req.body;

        const crearReporteVehiculoEH = await postReporteVehiculoEHService(id_incidente, id_categoria, clave, descripcion);

        const message = {
            notification: {
                title: 'Nuevo reporte',
                body: `Vehículo o EH`,
            },
            topic: 'incidentes', 
        };
        await admin.messaging().send(message);

        handleResponse(res, 200, "Reporte por Vehículo o EH creado correctamente", crearReporteVehiculoEH);
    
    } catch (error) {
        handleResponse(res, 500, "Error al crear reporte por Vehículo o EH", { error: error.message});        
    }
};