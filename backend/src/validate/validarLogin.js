import {getRolPermisoService, getRolService} from "../models/RolModel.js"


const MSG = {
    errorRol: "Rol no valido",
    errorCentro: "Centro de trabajo no seleccionado",
    errorSubcentro: "Subcentro de trabajo no seleccionado"
};

export const validarLogin = async (rol, centro, subcentro) => {
    const rol_permiso = await getRolPermisoService();

    const rol_seleccionado = rol_permiso.find(item => item.nombre_rol === rol);

    if(!rol_seleccionado){throw new Error(MSG.errorRol);}
    if(rol_seleccionado.centro_trabajo && !centro){throw new Error(MSG.errorCentro);}
    if(rol_seleccionado.subcentro_trabajo && !subcentro){ throw new Error(MSG.errorSubcentro); }

    return {
        rol, 
        acceso: rol_seleccionado.acceso,
        centro: centro || null,
        subcentro: subcentro || null
    };
};
