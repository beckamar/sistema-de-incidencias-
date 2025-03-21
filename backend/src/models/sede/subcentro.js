import pool from "../../config/db.js";


export const getIdSubcentroService  = async(id) => {
   const result = await pool.query(
   `SELECT 
      *
  FROM subcentro_trabajo st
  WHERE st.id_centrotrabajo = $1;`,
   [id]
    );
   return result.rows; 
};