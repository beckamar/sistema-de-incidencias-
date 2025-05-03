import { putStatusIncidenteService, getIncidenteIdService, getIncidentesService, getTiposIncidentesService, postIncidenteService } from "../services/incidenteModel.js";
import handleResponse from '../middlewares/responseHandler.js';


export const postIncidente = async (req, res, next) => {
    const {id_catincidentes, id_centrotrabajo, id_subcentro} = req.body;
    try{     
        if (!id_catincidentes || !id_centrotrabajo) { return handleResponse(res, 400, "Faltan campos obligatorios");}

        const nuevoIncidente = await postIncidenteService(id_catincidentes, id_centrotrabajo, id_subcentro);

        return res.status(201).json({
            message: 'saved',
            data:{
                id_incidente: nuevoIncidente[0].id_incidente
            }
        })

    }catch(err){
        next(err);
    }
};

export const getIncidentes = async (req, res, next) => {
    try{
        const incidentes = await getIncidentesService()
        handleResponse(res, 200, "Incidentes obtenidos",incidentes);
    }catch(err){
        next(err);
    }
};


export const putStatusIncidente = async (req, res, next) => {
    const {estado} = req.body;
    try {
        const incidenteActualizado = await putStatusIncidenteService(req.params.id_incidente, estado);
        if(!incidenteActualizado) return handleResponse(res, 404, "incidente no encontrado");
        handleResponse(res, 200, "Incidente actualizado", incidenteActualizado);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener el Status del incidente", { error: error.message});
    }
};


export const getTiposIncidentes = async (req, res, next) => {
    try {
        const tiposIncidentes = await getTiposIncidentesService();
        handleResponse(res, 200, "Tipo de incidentes obtenidos",tiposIncidentes);
    } catch (error) {
        next(err);
    }
};