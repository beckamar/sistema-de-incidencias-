//Response function

import { actualizarIncidenteService, crearIncidenteService, getIncidenteIdService, getIncidentesService } from "../models/incidenteModel.js";
import handleResponse from '../middlewares/responseHandler.js';
import { incidenteContext } from "../strategies/incidenteContext.js";


export const crearIncidente = async (req, res, next) => {
    const {id_catincidentes, id_centrotrabajo, id_subcentro, datosEspecificos} = req.body;
    try{     
        if (!id_catincidentes || !id_centrotrabajo) { return handleResponse(res, 400, "Faltan campos obligatorios");}

        const nuevoIncidente = await crearIncidenteService (id_catincidentes, id_subcentro, id_centrotrabajo);

        const contexto = new incidenteContext(id_catincidentes);
        await contexto.crearIncidente({id_incidente: nuevoIncidente.id_incidente, ...datosEspecificos});
        handleResponse(res, 201, "Incidente creado",nuevoIncidente);
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

export const getIncidenteId = async (req, res, next) => {
    try{
        const incidente = await getIncidenteIdService(req.params.id);
        if(!incidente) return handleResponse(res, 404, "incidente no encontrado");
        handleResponse(res, 200, "Incidente encontrado",incidente);
    }catch(err){
        next(err);
    }
};

export const actualizarIncidente = async (req, res, next) => {
    const {estado} = req.body;
    try {
        const incidenteActualizado = await actualizarIncidenteService(req.params.id, estado);
        if(!incidente) return handleResponse(res, 404, "incidente no encontrado");
        handleResponse(res, 200, "Incidente actualizado", incidenteActualizado);
    } catch (error) {
        next(err);
    }
}