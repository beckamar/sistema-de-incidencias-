import { getEmpleadosService, postEmpleadoService } from "../services/empleadoModel.js";
import handleResponse from '../middlewares/responseHandler.js';
import axios from 'axios';


export const getEmpleados = async (req, res, next) => {
    try{
        const empleados = await getEmpleadosService();
        handleResponse(res, 200, "empleados obtenidos",empleados);
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


export const postClave = async (req, res) => {
    try {
        const {rpe} = req.body;

        if(!rpe){
            return handleResponse(res, 400, "Falta el RPE", { error: error.message});
        }

        const url = process.env.EXTERNAL_API_RPE_URL;
        const response = await axios.post(url, { rpe }, {timeout:5000, headers: {'Content-Type': 'application/json',}});


        if (!response?.data?.info) {
            return handleResponse(res, 404, "No se encontró información para el RPE proporcionado");
        }

        handleResponse(res, 200, `Informacion del trabajador con RPE ${rpe} obtenido correctamente`, response.info);


    } catch (error) {        
        handleResponse(res, 500, "Error al consultar API externa:", { error: error.message});
    }
};