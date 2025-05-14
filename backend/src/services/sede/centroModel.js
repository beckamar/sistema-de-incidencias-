import pool from "../../database/db.js";


export const getIdCentroTrabajoService  = async(id) => {
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

export const getCentrosSubcentrosService = async () => {
   const result = await pool.query(`
      SELECT 
      ct.id AS centro_id,
      ct.nombre AS centro_nombre,
      (SELECT json_agg(
         json_build_object (
            'id', sct.id,
            'nombre', sct.nombre
            )
         )
      FROM subcentro_trabajo AS sct WHERE sct.id_centrotrabajo = ct.id
      )
      AS subcentros 
      FROM centro_trabajo ct
      ORDER BY ct.nombre;
      `
   );
   return result.rows;
};
