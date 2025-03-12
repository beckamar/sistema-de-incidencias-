import { getEmpleadoIdService, getEmpleadosService } from "../models/empleadoModel.js";
import handleResponse from '../middlewares/responseHandler.js';


export const getEmpleados = async (req, res, next) => {
    try{
        const empleados = await getEmpleadosService();
        handleResponse(res, 200, "empleados obtenidos",empleados);
    }catch(err){
        next(err);
    }
};

export const getEmpleadoId = async (req, res, next) => {
    try{
        const empleado = await getEmpleadoIdService(req.params.id);
        if(!incidente) return handleResponse(res, 404, "empleado no encontrado");
        handleResponse(res, 200, "empleado encontrado", empleado);
    }catch(err){
        next(err);
    }
};