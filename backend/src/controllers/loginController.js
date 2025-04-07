import handleResponse from '../middlewares/responseHandler.js';
import { getRolPermisoService } from '../services/RolModel.js';


export const login = async(req, res) =>{
    try {
        const { id_rol} = req.body;

        const permisos = await getRolPermisoService(id_rol);
        handleResponse(res, 200,"Acceso concedido.",  {
            userData: { 
                rol: { id: id_rol },
                permisos
            },
        });

    } catch (error) {
        handleResponse(res, 500, "Error en el login", {error: error.message});
    }
};