import { getEmpleadoIdService, getEmpleadosService, postEmpleadoService } from "../models/empleadoModel.js";
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

export const postEmpleado = async (req, res) => {
    try {
        const {
            nombre_completo,
            clave
        } = req.body;

        const crearEmpleado = await postEmpleadoService(nombre_completo, clave);
        handleResponse(res, 200, "Empleado creado para reporte", crearEmpleado)
    } catch (error) {
        handleResponse(res, 500, "Error al crear empleado para reporte", { error: error.message});
    }
};