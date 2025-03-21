import { getIdSubcentroService } from '../../models/sede/subcentro.js';
import handleResponse from '../../middlewares/responseHandler.js';


export const getIdSubcentros= async(req, res) =>{
    try {
        const IdSubcentros= await getIdSubcentroService(req.params.id_centro);
        handleResponse(res, 200, "Subcentros obtenidos por rol", IdSubcentros);
    } catch (error) {
        handleResponse(res, 500, "Error al obtener los Subcentros de trabajo por centro", { error: error.message});
    }
};