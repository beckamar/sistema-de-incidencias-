import pool from "../config/db.js";


export const getRolService = async() => {
   const result = await pool.query('SELECT * FROM rol');
   return result.rows;
};

export const getRolPermisoService = async() => {
   const result = await pool.query('SELECT rolp. *, r.nombre_rol FROM rol_permisos rolp INNER JOIN rol r ON rolp.id_rol = r.id_rol');
   return result.rows;
};

