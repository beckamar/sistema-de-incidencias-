import handleResponse from '../middlewares/responseHandler.js';
import { getRolService } from '../models/RolModel.js';


const rolesConfig = {
    "Superintendente": {acceso: "todo"},
    "Jefe zona/agencia": {acceso: "centro", necesitaCentro: true},
    "Empleado": {acceso: "subcentro", necesitaCentro: true, necesitaSubcentro: true}
};



export const login = async(req, res) =>{
    try {
        const {rol, centro, subcentro} = req.body;


        const roles = await getRolService();

        const roles_permisos = roles.map(rolItem => ({
            nombre: rolItem.nombre_rol,
            ...rolesConfig[rolItem.nombre_rol]
        }));

        const rolEncontrado = roles_permisos.find(item => item.nombre === rol);

        if (rolEncontrado.necesitaCentro && !centro) {
            return handleResponse(res, 400, "Debes seleccionar un centro");
        }

        if (rolEncontrado.necesitaSubcentro && !subcentro) {
            return handleResponse(res, 400, "Debes seleccionar un subcentro");
        }
        
        return handleResponse(res, 200, "Acceso concedido", {
            rol,
            acceso: roles_permisos.acceso,
            centro: centro || null,
            subcentro: subcentro || null
        });   
    } catch (error) {
        handleResponse(res, 500, "Error en el login", {error: error.message});
    }
};