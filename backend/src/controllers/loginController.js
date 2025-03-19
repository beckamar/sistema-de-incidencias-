import handleResponse from '../middlewares/responseHandler.js';
import { validarLogin } from '../validate/validarLogin.js';


const MSG = {
    loginExitoso: "Acceso concedido.",
    loginError: "Error en el login"
};

export const login = async(req, res) =>{
    try {
        const {rol, centro, subcentro} = req.body;

        const validar = await validarLogin(rol, centro, subcentro);
        handleResponse(res, 200, MSG.loginExitoso, validar);

    } catch (error) {
        handleResponse(res, 500, MSG.loginError, {error: error.message});
    }
};