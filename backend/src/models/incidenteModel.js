import pool from "../config/db.js";

export const getIncidentesService = async () =>  {
    const result = pool.query(`
        SELECT 
        i.id_incidente, 
        i.fecha_reporte, 
        i.hora_reporte, 
        ci.tipo AS tipo_incidente, 
        ct.nombre AS centro_trabajo, 
        sc.nombre AS subcentro_trabajo 
        FROM incidente i 
        JOIN catalogo_incidentes ci ON i.id_catalogoincidentes = ci.id_catincidentes
        JOIN centro_trabajo ct ON i.id_centrotrabajo = ct.id_centrotrabajo
        JOIN subcentro_trabajo sc ON i.id_subcentro = sc.id_subcentro
        ORDER BY 
        i.fecha_reporte DESC`);
    return (await result).rows;
};

export const getIncidenteIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM incidente WHERE id = $1', [id]);
    return result.rows[0];
};


export const crearIncidenteService = async (tipo_incidente,centrotrabajo, subcentro_trabajo) =>  {
    const result = await pool.query(`
        INSERT INTO incidente (
        id_catalogoincidentes, 
        id_centrotrabajo, 
        id_subcentro) 
        VALUES ($1, $2, $3) RETURNING *`, [tipo_incidente, centrotrabajo, subcentro_trabajo]);
    return result.rows;
};



export const actualizarIncidenteService = async (id, estado) =>  {
    const result = await pool.query('UPDATE incidente SET estado = $1 WHERE id=$2 RETURNING *',[id, estado]);
        return result.rows[0];
};