import pool from "../database/db.js";

export const getIncidentesService = async () =>  {
    const result = await pool.query(`
        SELECT 
        i.id_incidente, 
        ci.tipo AS tipo_incidente, 
        sc.id AS id_subcentro,
        sc.nombre AS subcentro, 
        TO_CHAR(i.fecha_reporte, 'YYYY-MM-DD') AS fecha_reporte,
        TO_CHAR(i.hora_reporte, 'HH24:MI') AS hora_reporte, 
        ct.id AS id_centrotrabajo,
        ct.nombre AS centro_trabajo, 
        CASE WHEN 
        i.estado THEN 'Resuelto' ELSE 'Pendiente' END AS estado_incidente, 
        COALESCE (ca.tipo, io.tipo) AS subtipo, 
        COALESCE (ia.descripcion, io.descripcion) AS detalles, 
        CASE WHEN ia.id_ausencia IS NOT NULL THEN e.nombre_completo ELSE NULL END AS empleado_ausente 
        FROM 
        incidente i JOIN catalogo_incidentes ci ON i.id_catalogoincidentes = ci.id_catincidentes 
        LEFT JOIN 
        subcentro_trabajo sc ON i.id_subcentro = sc.id JOIN centro_trabajo ct ON i.id_centrotrabajo = ct.id 
        LEFT JOIN 
        incidente_ausencia ia ON i.id_incidente = ia.id_incidente 
        LEFT JOIN 
        empleado e ON ia.id_empleado = e.id_empleado 
        LEFT JOIN 
        catalogo_ausencias ca ON ia.id_catausencias = ca.id_ausencia 
        LEFT JOIN incidente_otro io ON i.id_incidente = io.id_incidente 
        ORDER BY 
        i.estado ASC, CASE WHEN i.estado = FALSE THEN i.fecha_reporte end ASC, 
        CASE WHEN 
        i.estado = FALSE THEN i.hora_reporte END ASC, 
        CASE WHEN i.estado = TRUE THEN i.fecha_reporte END DESC, 
        CASE WHEN i.estado = TRUE THEN i.hora_reporte END DESC;
`);
    return result.rows;
};

export const getIncidenteIdService = async (id) =>  {
    const result = await pool.query('SELECT * FROM incidente WHERE id_incidente = $1', [id]);
    return result.rows[0];
};


export const postIncidenteService = async (id_catalogoincidentes,id_centrotrabajo, id_subcentro) =>  {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(`
            INSERT INTO incidente (
            id_catalogoincidentes, 
            id_centrotrabajo, 
            id_subcentro) 
            VALUES ($1, $2, $3) RETURNING *`, [id_catalogoincidentes, id_centrotrabajo, id_subcentro]);
        
        await client.query('COMMIT');
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }finally{
        client.release();
    }
};


export const putStatusIncidenteService = async (id_incidente, estado) =>  {
    const result = await pool.query('UPDATE incidente SET estado = $1 WHERE id_incidente=$2 RETURNING *',[estado, id_incidente]);
        return result.rows[0];
};


export const getTiposIncidentesService = async () => {
    const result = await pool.query(`SELECT
        id_catincidentes,
        tipo
        FROM
        catalogo_incidentes 
        ORDER BY id_catincidentes;
    `);
    return result.rows;
};