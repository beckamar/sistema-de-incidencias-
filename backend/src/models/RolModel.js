import pool from "../config/db.js";


export const getRolService = async() => {
   const result = await pool.query('SELECT * FROM rol ORDER BY id ASC;');
   return result.rows;
};

export const getRolPermisoService = async(rol_id) => {
   const result = await pool.query('SELECT permisos FROM rol WHERE id = $1;', [rol_id]);
   return result.rows[0].permisos;
};

