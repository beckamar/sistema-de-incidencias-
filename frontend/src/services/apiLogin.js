import { getCentrostrabajo, getRoles, getSubcentros } from "../utils/networkData.js";        

export const fetchRoles = async () => {
    const { error, data } = await getRoles();
    return error ? [] : data;
};

export const fetchCentros = async (roleId) => {
    const { error, data } = await getCentrostrabajo(roleId);
    return error ? [] : data;
};

export const fetchSubcentros = async (centroId) => {
    const { error, data } = await getSubcentros(centroId);
    return error ? [] : data;
};