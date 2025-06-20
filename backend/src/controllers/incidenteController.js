import { putStatusIncidenteService,getIncidentesService, getTiposIncidentesService, postIncidenteService, getStatusServices } from "../services/incidenteModel.js";
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
    try {
        const toNull = v => v === undefined || v === "" ? null : v;
        const params = {
            id_estado: toNull(req.query.id_estado),
            id_centrotrabajo: toNull(req.query.id_centrotrabajo),
            id_subcentro: toNull(req.query.id_subcentro),
        };
        const incidentes = await getIncidentesService(params);
        handleResponse(res, 200, "Incidentes obtenidos", incidentes);
    } catch (err) {
        next(err);
    }
};



export const putStatusIncidente = async (req, res, next) => {
    const {id_estado} = req.body;
    try {
        console.log(`IncidenteController <putStatus> id_incidentes: ${req.params.id_incidente} id_estado: ${id_estado}` )
        const incidenteActualizado = await putStatusIncidenteService(req.params.id_incidente, id_estado);
        if(!incidenteActualizado) return handleResponse(res, 404, "incidente no encontrado");
        handleResponse(res, 200, "Incidente actualizado", incidenteActualizado);
    } catch (error) {
        handleResponse(res, 500, "Error al actualizar el Status del incidente", { error: error.message});
    }
};


export const getStatus = async (req, res) => {
    try {
        const obtenerStatus = await getStatusServices();
        handleResponse(res, 200, "Estados obtenidos correctamente", obtenerStatus);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener el Status del incidente", { error: error.message});
    }
};


export const getTiposIncidentes = async (req, res) => {
    try {
        const tiposIncidentes = await getTiposIncidentesService();
        handleResponse(res, 200, "Tipo de incidentes obtenidos",tiposIncidentes);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los tipos de incidentes", { error: error.message});
    }
};