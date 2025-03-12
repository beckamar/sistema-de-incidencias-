import pool from "../config/db.js";


export const getRolService = async() => {
   const result = await pool.query('SELECT nombre_rol FROM rol');
   return result.rows;
};