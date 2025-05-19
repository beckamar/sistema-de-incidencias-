import pool from "../../database/db.js";


export const getIdCentroTrabajoRolService  = async(id) => {
   const result = await pool.query(`     
      SELECT 
      *
      FROM rol r
      JOIN rol_centrotrabajo rct ON r.id = rct.id_rol
      JOIN centro_trabajo ct ON rct.id_centrotrabajo = ct.id
      WHERE r.id = $1`, 
      [id]
    );
   return result.rows; 
};

export const getCentrosTrabajoService = async() => {
   const result = await pool.query(`
      SELECT * FROM centro_trabajo;
      `);
      return result.rows;
};



