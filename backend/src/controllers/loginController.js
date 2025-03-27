import handleResponse from '../middlewares/responseHandler.js';
import { getRolPermisoService } from '../models/RolModel.js';

const MSG = {
    loginExitoso: "Acceso concedido.",
    loginError: "Error en el login"
};

export const login = async(req, res) =>{
    try {
        const { id_rol} = req.body;

        const permisos = await getRolPermisoService(id_rol);
        handleResponse(res, 200, MSG.loginExitoso,  {
            userData: { 
                rol: { id: id_rol },
                permisos
            },
        });

    } catch (error) {
        handleResponse(res, 500, MSG.loginError, {error: error.message});
    }
};