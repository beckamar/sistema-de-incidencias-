import handleResponse from '../middlewares/responseHandler.js';
import { getRolPermisoService } from '../models/RolModel.js';

const MSG = {
    loginExitoso: "Acceso concedido.",
    loginError: "Error en el login"
};

export const login = async(req, res) =>{
    try {
        const { rol, centro, subcentro } = req.body;

        const permisos = await getRolPermisoService(rol.id);
        handleResponse(res, 200, MSG.loginExitoso, {userData: {rol: {id: rol.id, nombre: rol.nombre },
                centro: centro?.id || null,
                subcentro: subcentro?.id || null,
                permisos
            }
        });

    } catch (error) {
        handleResponse(res, 500, MSG.loginError, {error: error.message});
    }
};