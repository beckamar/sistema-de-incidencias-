 import pool from "../config/db.js";


 export const getCentroTrabajoService  = async() => {
    const result = await pool.query('Select id_centrotrabajo, nombre FROM centro_trabajo');
    return result.rows[0]; 
 };

export const getSubcentroService  = async(id) => {
    const result = await pool.query('SELECT id_subcentro, nombre FROM subcentro_trabajo WHERE id_centrotrabajo = $1', [id]);
    return result.rows[0]; 
};